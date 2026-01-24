# 制作物：ToDo管理（コンソール版）を作る

この章は、Unit 2 までに学んだ「変数・条件分岐・繰り返し・配列・メソッド・複数クラス」を使って、1つの制作物を作るチェックポイントです。

## 前提

- 以降の「コンソール版ToDo」は、1つのEclipseプロジェクトを育てていきます（この章で作ったものを次の章でも使います）
- プロジェクト名は任意です（例：`todo-console`）
- パッケージは `com.example.todo` を使用します

## ゴール

- コマンド操作でToDoを追加/一覧/完了/削除できる
- 「動く」状態を作り、以降のUnitで育てていく土台にする

## 仕様（最小）

- ToDoは最大100件まで扱える
- ToDoは `title`（文字列）と `done`（完了フラグ）を持つ
- メニューは次の通り
  - `1:add`（追加）
  - `2:list`（一覧）
  - `3:done`（完了）
  - `4:delete`（削除）
  - `0:exit`（終了）

※この章では、ToDoのIDとして「配列の添字（0から始まる番号）」を使います（次章で改善します）。

## 動作イメージ

```text
[menu] 1:add 2:list 3:done 4:delete 0:exit > 1
title > buy milk
added: id=0

[menu] 1:add 2:list 3:done 4:delete 0:exit > 2
[0] ( ) buy milk

[menu] 1:add 2:list 3:done 4:delete 0:exit > 3
done id > 0
done: id=0

[menu] 1:add 2:list 3:done 4:delete 0:exit > 2
[0] (x) buy milk
```

## 実装の方針

- 配列で状態を持つ（後の章でコレクションやDBに置き換えます）
- 入出力は `Scanner` を使う
- メニュー処理は `while` と `switch` を使う
- 1コマンド1メソッドで分割する

## 練習問題

### 練習問題1：プロジェクトを用意する

Eclipseで Javaプロジェクトを作成し、次のクラスを作成してください。

- パッケージ：`com.example.todo`
- クラス：`Main`

### 練習問題2：最小実装を貼り付けて起動する

`Main.java` を次の内容にしてください（まずは動く状態を作ります）。

```java
package com.example.todo;

import java.util.Scanner;

public class Main {

    private static final int MAX_TASKS = 100;

    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        String[] titles = new String[MAX_TASKS];
        boolean[] done = new boolean[MAX_TASKS];
        int size = 0;

        while (true) {
            System.out.print("[menu] 1:add 2:list 3:done 4:delete 0:exit > ");
            String input = scanner.nextLine();

            switch (input) {
                case "1":
                    size = handleAdd(scanner, titles, done, size);
                    break;
                case "2":
                    handleList(titles, done, size);
                    break;
                case "3":
                    handleDone(scanner, done, size);
                    break;
                case "4":
                    size = handleDelete(scanner, titles, done, size);
                    break;
                case "0":
                    System.out.println("bye");
                    return;
                default:
                    System.out.println("unknown command");
            }
        }
    }

    private static int handleAdd(Scanner scanner, String[] titles, boolean[] done, int size) {
        if (size >= titles.length) {
            System.out.println("これ以上追加できません");
            return size;
        }

        System.out.print("title > ");
        String title = scanner.nextLine();
        if (title.trim().isEmpty()) {
            System.out.println("title は必須です");
            return size;
        }

        titles[size] = title;
        done[size] = false;
        System.out.println("added: id=" + size);
        return size + 1;
    }

    private static void handleList(String[] titles, boolean[] done, int size) {
        if (size == 0) {
            System.out.println("(empty)");
            return;
        }
        for (int i = 0; i < size; i++) {
            String mark = done[i] ? "x" : " ";
            System.out.println("[" + i + "] (" + mark + ") " + titles[i]);
        }
    }

    private static void handleDone(Scanner scanner, boolean[] done, int size) {
        Integer index = readInt(scanner, "done id > ");
        if (index == null) {
            return;
        }
        if (index < 0 || index >= size) {
            System.out.println("存在しないidです");
            return;
        }
        done[index] = true;
        System.out.println("done: id=" + index);
    }

    private static int handleDelete(Scanner scanner, String[] titles, boolean[] done, int size) {
        Integer index = readInt(scanner, "delete id > ");
        if (index == null) {
            return size;
        }
        if (index < 0 || index >= size) {
            System.out.println("存在しないidです");
            return size;
        }

        for (int i = index; i < size - 1; i++) {
            titles[i] = titles[i + 1];
            done[i] = done[i + 1];
        }
        titles[size - 1] = null;
        done[size - 1] = false;

        System.out.println("deleted: id=" + index);
        return size - 1;
    }

    private static Integer readInt(Scanner scanner, String prompt) {
        System.out.print(prompt);
        String input = scanner.nextLine();
        try {
            return Integer.parseInt(input);
        } catch (NumberFormatException e) {
            System.out.println("数値を入力してください");
            return null;
        }
    }
}
```

### 練習問題3：手動テストをする

次の順で操作し、期待通りの表示になることを確認してください。

- `add` を2回行い、`list` で2件表示される
- `done` で1件完了にし、`list` で `(x)` になっている
- `delete` で1件削除し、`list` で件数が減っている
- `exit` で終了できる

### 練習問題4：（発展）表示と操作性を改善する

余裕があれば、次のどれかを実装してください。

- `list` のときに件数も表示する（例：`total=3`）
- `done` 済みのものをもう一度 `done` しても落ちないようにする
- `unknown command` のときにメニューを再表示する以外の案内も出す

## 完了条件（チェックリスト）

- 追加/一覧/完了/削除が一通り動く
- 存在しない番号を入力しても例外で落ちない（メッセージを出してメニューに戻る）
- `Main` が読める長さになっている（メソッドに分割できている）

## よくある詰まり

- 数値入力で `NumberFormatException` が出る → `Integer.parseInt` を `try-catch` で囲む
- `delete` の左詰めが分からない → `for (int i = index; i < size - 1; i++) { ... }` の形にする

## AIに質問する（この章の例）

次の例をそのままAIに投げてOKです（必要なら自分のコード/エラーに置き換えてください）。

- 「『制作物：ToDo管理（コンソール版）を作る』を初心者向けに、たとえ話つきで説明して。最後に要点を3つにまとめて」
- 「この章の内容で理解確認クイズを5問作って（解答は最後にまとめて）」
- 「自分の実装を貼るのでレビューして。バグ/設計の危険箇所だけ指摘して、直し方はヒントで」
- 「この章の内容を、制作物（ToDo管理）にどう活かすか提案して」
