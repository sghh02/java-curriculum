# 制作物：ToDo管理（コンソール版）をJUnitでテストする

> 提出ブランチ：`feature/47-project-todo-testing`（PRのbase：`develop`）

この章は、Unit 7（単体テストとアサーション）を制作物に反映するチェックポイントです。

## ゴール

- 主要ロジック（Service層）をJUnitでテストできる
- 仕様変更に強い形にリファクタできる

## 前提

- `TodoService` が `TaskRepository` に依存する形になっている（前章のDB対応で導入）
- DBを使うテストは準備が重いので、まずは `InMemoryTaskRepository` を使って Service をテストします

## 方針

- テスト対象：`TodoService`（入力チェック、例外、状態変更）
- 依存：`InMemoryTaskRepository`（メモリ実装）
- ここでの狙い：DBやCLIに引っ張られず、ロジックが壊れていないことを素早く確認できるようにする

## 練習問題

### 練習問題1：TodoServiceのテストを書く

`TodoService` の振る舞いを、JUnitでテストしてください。

- 正常系：追加できる、一覧に出る、完了にできる、削除できる
- 異常系：空タイトルはエラー、存在しないIDはエラー

※JUnit 5 の基本形（`@Test` と `assert...`）は、前章「単体テストとアサーション」を参照してください。

## 実装例（JUnit 5）

`src/test/java/com/example/todo/TodoServiceTest.java`（例）

```java
package com.example.todo;

import org.junit.jupiter.api.Test;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

class TodoServiceTest {

    @Test
    void add_creates_task() {
        TaskRepository repo = new InMemoryTaskRepository();
        TodoService service = new TodoService(repo);

        Task created = service.add("buy milk");

        assertNotNull(created.getId());
        assertEquals("buy milk", created.getTitle());
        assertFalse(created.isDone());
        assertNotNull(created.getCreatedAt());
        assertNotNull(created.getUpdatedAt());

        List<Task> tasks = service.list();
        assertEquals(1, tasks.size());
    }

    @Test
    void add_throws_when_title_blank() {
        TaskRepository repo = new InMemoryTaskRepository();
        TodoService service = new TodoService(repo);

        assertThrows(InvalidTaskTitleException.class, () -> service.add("   "));
    }

    @Test
    void done_marks_task_done() {
        TaskRepository repo = new InMemoryTaskRepository();
        TodoService service = new TodoService(repo);

        Task created = service.add("write code");
        long id = created.getId();

        Task updated = service.done(id);

        assertTrue(updated.isDone());
        assertEquals(id, updated.getId());
    }

    @Test
    void done_throws_when_task_missing() {
        TaskRepository repo = new InMemoryTaskRepository();
        TodoService service = new TodoService(repo);

        assertThrows(TaskNotFoundException.class, () -> service.done(999));
    }

    @Test
    void delete_removes_task() {
        TaskRepository repo = new InMemoryTaskRepository();
        TodoService service = new TodoService(repo);

        Task created = service.add("delete me");
        long id = created.getId();

        service.delete(id);

        assertEquals(0, service.list().size());
        assertThrows(TaskNotFoundException.class, () -> service.done(id));
    }
}
```

### 練習問題2：依存を差し替えられるようにする

DB（JDBC）に依存したテストは準備が大変になりがちです。まずは `TaskRepository` を差し替えられるようにして、
テストでは「メモリ実装」や「スタブ実装」を使えるようにしてください。

### 練習問題3：テストを実行する

Mavenプロジェクトの場合は `mvn test`（または `./mvnw test`）、Gradleの場合は `gradle test` で実行できます。
IDEからテストクラスを実行してもOKです（やり方はIDEにより異なります）。

## 完了条件（チェックリスト）

- 主要な仕様がテストで守られている
- 失敗したときに、何が壊れたか分かるテスト名/アサーションになっている
- テストが通る状態でリファクタしても、機能が壊れない

## AIに質問する（この章の例）

次の例をそのままAIに投げてOKです（必要なら自分のコード/エラーに置き換えてください）。

```text
「『制作物：ToDo管理（コンソール版）をJUnitでテストする』を初心者向けに、たとえ話つきで説明して。最後に要点を3つにまとめて」
「この章の内容で理解確認クイズを5問作って（解答は最後にまとめて）」
「自分の実装を貼るのでレビューして。バグ/設計の危険箇所だけ指摘して、直し方はヒントで」
「この章の内容を、制作物（ToDo管理）にどう活かすか提案して」
```

---

## 課題提出

この章には提出課題があります。

1. 上記の制作物を完成させる
2. GitHub で `feature/47-project-todo-testing` ブランチを作成し、PRを作成
3. [AI総合レビューツール](https://ai.studio/apps/drive/1AMqIqU4Bio4te7AWh5dly1Qzp7CesqP9?fullscreenApplet=true) でレビューを実行
4. 問題がなければ、スプレッドシートに **PR URL** と **完了日** を記入
