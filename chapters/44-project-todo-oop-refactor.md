# 制作物：ToDo管理（コンソール版）をオブジェクト指向でリファクタする

この章は、Unit 3（オブジェクト指向）までに学んだ内容を、制作物に反映するチェックポイントです。

## 前提

- 前章の「コンソール版ToDo」が動いていること
- この章は「機能を増やす」よりも「設計を整える」ことが目的です

## ゴール

- 「データ」と「処理」と「入出力」を分離できる
- `Main` を薄くして、役割ごとにクラスを分けられる

## 仕様

- 基本の機能は前章（コンソール版ToDo）と同じでOKです
- ただし、この章では「削除しても番号が変わりにくい」ように、ToDoのIDを `1` から採番して `Task` に持たせます

## クラス構成（例）

次のような役割分担を目指してください（名前は好みでOKです）。まずは1パッケージでOKです。

```text
com.example.todo
  Main            起動・配線だけ
  TodoCli         入力/表示（CLI）
  TodoService     追加/一覧/完了/削除のロジック
  TaskStore       配列などの保存先（今はメモリ）
  Task            1件分のデータ
```

## 実装例（動く最小）

ここでは、最低限動く構成の例を載せます。まずはコピペで動かし、その後「なぜこの分け方にするのか」を説明できるようにしてください。

### `Task.java`

```java
package com.example.todo;

public class Task {
    private long id;
    private String title;
    private boolean done;

    public Task(long id, String title) {
        this.id = id;
        this.title = title;
        this.done = false;
    }

    public long getId() {
        return id;
    }

    public String getTitle() {
        return title;
    }

    public boolean isDone() {
        return done;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public void setDone(boolean done) {
        this.done = done;
    }
}
```

### `TaskStore.java`（配列で保存）

```java
package com.example.todo;

public class TaskStore {
    private final Task[] tasks = new Task[100];
    private int size = 0;
    private long nextId = 1;

    public Task add(String title) {
        if (size >= tasks.length) {
            throw new IllegalStateException("これ以上追加できません");
        }
        Task task = new Task(nextId, title);
        nextId++;
        tasks[size] = task;
        size++;
        return task;
    }

    public Task[] findAll() {
        Task[] result = new Task[size];
        System.arraycopy(tasks, 0, result, 0, size);
        return result;
    }

    public Task findById(long id) {
        for (int i = 0; i < size; i++) {
            Task task = tasks[i];
            if (task.getId() == id) {
                return task;
            }
        }
        return null;
    }

    public boolean deleteById(long id) {
        for (int i = 0; i < size; i++) {
            if (tasks[i].getId() == id) {
                for (int j = i; j < size - 1; j++) {
                    tasks[j] = tasks[j + 1];
                }
                tasks[size - 1] = null;
                size--;
                return true;
            }
        }
        return false;
    }
}
```

### `TodoService.java`

```java
package com.example.todo;

public class TodoService {
    private final TaskStore taskStore;

    public TodoService(TaskStore taskStore) {
        this.taskStore = taskStore;
    }

    public Task add(String title) {
        return taskStore.add(title);
    }

    public Task[] list() {
        return taskStore.findAll();
    }

    public Task done(long id) {
        Task task = taskStore.findById(id);
        if (task == null) {
            return null;
        }
        task.setDone(true);
        return task;
    }

    public boolean delete(long id) {
        return taskStore.deleteById(id);
    }
}
```

### `TodoCli.java`

```java
package com.example.todo;

import java.util.Scanner;

public class TodoCli {
    private final TodoService todoService;
    private final Scanner scanner;

    public TodoCli(TodoService todoService, Scanner scanner) {
        this.todoService = todoService;
        this.scanner = scanner;
    }

    public void run() {
        while (true) {
            System.out.print("[menu] 1:add 2:list 3:done 4:delete 0:exit > ");
            String input = scanner.nextLine();

            switch (input) {
                case "1":
                    add();
                    break;
                case "2":
                    list();
                    break;
                case "3":
                    done();
                    break;
                case "4":
                    delete();
                    break;
                case "0":
                    System.out.println("bye");
                    return;
                default:
                    System.out.println("unknown command");
            }
        }
    }

    private void add() {
        System.out.print("title > ");
        String title = scanner.nextLine();
        if (title.trim().isEmpty()) {
            System.out.println("title は必須です");
            return;
        }

        Task created = todoService.add(title);
        System.out.println("added: id=" + created.getId());
    }

    private void list() {
        Task[] tasks = todoService.list();
        if (tasks.length == 0) {
            System.out.println("(empty)");
            return;
        }
        for (Task task : tasks) {
            String mark = task.isDone() ? "x" : " ";
            System.out.println("[" + task.getId() + "] (" + mark + ") " + task.getTitle());
        }
    }

    private void done() {
        Long id = readLong("done id > ");
        if (id == null) {
            return;
        }
        Task updated = todoService.done(id);
        if (updated == null) {
            System.out.println("存在しないidです");
            return;
        }
        System.out.println("done: id=" + id);
    }

    private void delete() {
        Long id = readLong("delete id > ");
        if (id == null) {
            return;
        }
        boolean deleted = todoService.delete(id);
        if (!deleted) {
            System.out.println("存在しないidです");
            return;
        }
        System.out.println("deleted: id=" + id);
    }

    private Long readLong(String prompt) {
        System.out.print(prompt);
        String input = scanner.nextLine();
        try {
            return Long.parseLong(input);
        } catch (NumberFormatException e) {
            System.out.println("数値を入力してください");
            return null;
        }
    }
}
```

### `Main.java`

```java
package com.example.todo;

import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        TaskStore taskStore = new TaskStore();
        TodoService todoService = new TodoService(taskStore);
        Scanner scanner = new Scanner(System.in);

        TodoCli cli = new TodoCli(todoService, scanner);
        cli.run();
    }
}
```

## 練習問題

### 練習問題1：構造を整えて動作確認する

- `Main` / `TodoCli` / `TodoService` / `TaskStore` / `Task` を作成し、上の実装例と同じように動かしてください
- 前章と同じ操作（追加/一覧/完了/削除）ができることを確認してください

### 練習問題2：責務を説明できるようにする

次の質問に1〜2行で答えてください。

- `Main` が「薄い」とはどういう状態？
- `TodoCli` と `TodoService` を分けるメリットは何？

## 完了条件（チェックリスト）

- `Main` に配列やロジックが残っていない
- `TaskStore` の外から配列に触れない
- 追加/一覧/完了/削除が前章と同じように動く

## AIに質問する（この章の例）

次の例をそのままAIに投げてOKです（必要なら自分のコード/エラーに置き換えてください）。

```text
「『制作物：ToDo管理（コンソール版）をオブジェクト指向でリファクタする』を初心者向けに、たとえ話つきで説明して。最後に要点を3つにまとめて」
「この章の内容で理解確認クイズを5問作って（解答は最後にまとめて）」
「自分の実装を貼るのでレビューして。バグ/設計の危険箇所だけ指摘して、直し方はヒントで」
「OOPの目的（何が嬉しいか）を、ToDo管理の例で説明して」
```

---

## 課題提出

この章には提出課題があります。

1. 上記の制作物を完成させる
2. GitHub で `feature/44-project-todo-oop-refactor` ブランチを作成し、PRを作成
3. [AI総合レビューツール](https://ai.studio/apps/drive/1AMqIqU4Bio4te7AWh5dly1Qzp7CesqP9?fullscreenApplet=true) でレビューを実行
4. 問題がなければ、スプレッドシートに **PR URL** と **完了日** を記入
