# オブジェクト指向を始めよう

> 提出ブランチ：`feature/15-oop-start`（PRのbase：`main`）

この章は「オブジェクト指向って結局なに？」を最短でつかむための導入です。
暗記は不要で、次章以降と制作物（ToDo管理）で何度も使います。

## ゴール

- クラス/インスタンス/フィールド/メソッドの役割を説明できる
- 「手続き型のコードが辛くなる理由」を説明できる
- 自分のToDo管理のコードで、クラス分割の案を出せる

## ざっくり定義（最小）

- オブジェクト指向：**データ（状態）と処理（振る舞い）をセットで扱う**考え方
- クラス：設計図
- インスタンス：設計図から作った実体
- フィールド：状態（持っているデータ）
- メソッド：振る舞い（できること）

## 最小例（ToDoの1件）

`Task.java`（例）

```java
public class Task {
    private final long id;
    private String title;
    private boolean completed;

    public Task(long id, String title) {
        this.id = id;
        this.title = title;
        this.completed = false;
    }

    public long getId() {
        return id;
    }

    public String getTitle() {
        return title;
    }

    public boolean isCompleted() {
        return completed;
    }

    public void rename(String title) {
        this.title = title;
    }

    public void complete() {
        this.completed = true;
    }

    @Override
    public String toString() {
        return "[" + (completed ? "x" : " ") + "] " + id + ": " + title;
    }
}
```

`Main.java`（例）

```java
public class Main {
    public static void main(String[] args) {
        Task task = new Task(1, "buy milk");
        System.out.println(task);

        task.complete();
        task.rename("buy milk and bread");
        System.out.println(task);
    }
}
```

## 練習問題

### 練習問題1：Taskクラスを作る

上の例を参考に、次を満たす `Task` クラスを作ってください。

- `id`/`title`/`completed` を持つ
- `rename` と `complete` を持つ
- `toString()` で「完了/未完了」「id」「title」が分かる文字列を返す

### 練習問題2：責務分割を考える（制作物の準備）

今のToDo管理（コンソール版）のコードを見て、次を箇条書きにしてください（短くてOK）。

- 入力（ユーザー操作）
- 表示（コンソール出力）
- データ（Taskの集まり）
- ルール（例：空タイトルはNG、存在しないIDはエラー）

このメモを次章以降と制作物（オブジェクト指向リファクタ）で使います。

## AIに質問する（この章の例）

次の例をそのままAIに投げてOKです（必要なら自分のコード/エラーに置き換えてください）。

```text
「『オブジェクト指向を始めよう』を初心者向けに、たとえ話つきで説明して。最後に要点を3つにまとめて」
「この章の内容で理解確認クイズを5問作って（解答は最後にまとめて）」
「この章の練習問題で詰まった。答えを丸ごとではなく、方針→ヒント→確認質問の順で教えて」
「OOPの目的（何が嬉しいか）を、ToDo管理の例で説明して」
```

---

## 課題提出

この章には提出課題があります。

1. 上記の練習問題を完了する
2. GitHub で `feature/15-oop-start` ブランチを作成し、PRを作成
3. [AI総合レビューツール](https://ai.studio/apps/drive/1AMqIqU4Bio4te7AWh5dly1Qzp7CesqP9?fullscreenApplet=true) でレビューを実行
4. 問題がなければ、スプレッドシートに **PR URL** と **完了日** を記入
