# 単体テストとアサーション

このカリキュラムでは、制作物（ToDo管理）を育てながら学びます。
単体テストは「変更しても壊れていない」ことを速く確認するための仕組みです。

## ゴール

- JUnit 5でテストを実行できる
- `assertEquals` / `assertTrue` / `assertThrows` を使える
- 正常/異常/境界の観点でテストを書ける

## 前提

- `mvn test` または `./mvnw test` が実行できる（前章「基本的な開発ツール」）
- IDEからテストを実行してもOK（やり方はIDEにより異なります）

## 単体テストで守る範囲

まずは「ロジック（計算/判断/状態変更）」をテストします。

- テストしやすい：Service/Validator/ドメインのメソッド
- 後回しでOK：CLI入出力、DB、HTTP（外部依存が重い）

外部依存を切り離して、ロジックだけを速く回せるようにするのがコツです。

## テストの形（Arrange → Act → Assert）

1. Arrange：準備（入力/依存/初期状態）
2. Act：実行（メソッド呼び出し）
3. Assert：検証（戻り値/例外/状態）

## JUnit 5の最小形

```java
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class SampleTest {
    @Test
    void example() {
        assertEquals(2, 1 + 1);
    }
}
```

## よく使うアサーション

```java
assertEquals("buy milk", actualTitle);
assertTrue(task.isDone());
assertFalse(task.isDone());
assertNotNull(task.getId());
assertThrows(IllegalArgumentException.class, () -> validator.normalize("   "));
```

## 練習問題（ToDo題材）

### 練習問題1：タイトルの正規化をテストする

ToDoの `title` は、入力ミスが一番多い場所です。
タイトルのルールを「テストで固定」できるように、次を作ってください。

1. `TaskTitleNormalizer`（例）を作る
2. `TaskTitleNormalizerTest` を作る

仕様（例）：

- `null` / 空文字 / 空白だけ → 例外
- 前後の空白は `trim()` して返す
- 100文字を超える → 例外

テストケース（最低限）：

- `" buy milk "` → `"buy milk"` になる
- `""` / `"   "` → 例外になる
- 100文字ちょうど → OK
- 101文字 → 例外

### 練習問題2：例外の種類を仕様にする（任意）

例外を `IllegalArgumentException` ではなく、制作物で使っている `InvalidTaskTitleException` に揃えるのもOKです。
「どの例外を投げるか」も仕様なので、テストで守れます。

### 練習問題3：次の章でServiceをテストする

次の章「制作物：ToDo管理（コンソール版）をJUnitでテストする」では、
ここで覚えた形を使って `TodoService` の単体テストを書きます。

## 完了条件（チェックリスト）

- `mvn test`（または `./mvnw test`）が通る
- テスト名から「何を守っているか」が分かる
- 失敗したときに原因が追える（アサーションが具体的）

## AIに質問する（この章の例）

次の例をそのままAIに投げてOKです（必要なら自分のコード/エラーに置き換えてください）。

```text
「『単体テストとアサーション』を初心者向けに、たとえ話つきで説明して。最後に要点を3つにまとめて」
「この章の内容で理解確認クイズを5問作って（解答は最後にまとめて）」
「`TaskTitleNormalizer` の仕様（空白/長さ/例外）から、必要なテストケースを10個列挙して（答えのコードは書かずに）」
「自分のテストを貼るのでレビューして。弱いアサーション/冗長なテスト/見落としているケースだけ指摘して」
「`assertThrows` の書き方が分からない。自分の例外（ここに貼る）で、最小例を1つだけ出して」
```

---

## 課題提出

この章には提出課題があります。

1. 上記の練習問題を完了する
2. GitHub で `feature/36-dev-unit-testing` ブランチを作成し、PRを作成
3. [AI総合レビューツール](https://ai.studio/apps/drive/1AMqIqU4Bio4te7AWh5dly1Qzp7CesqP9?fullscreenApplet=true) でレビューを実行
4. 問題がなければ、スプレッドシートに **PR URL** と **完了日** を記入
