# 制作物：ToDo管理（コンソール版）にコレクション・例外・日時を導入する

この章は、Unit 4（標準API活用）までに学んだ「コレクション・例外・文字列/日付」などを、制作物に反映するチェックポイントです。

## 前提

- 前章の「オブジェクト指向版ToDo」が動いていること
- この章では、配列ベースの実装を `ArrayList` ベースに置き換えます

## ゴール

- 配列を `ArrayList` に置き換えられる
- 入力チェックや「見つからない」を例外で表現できる
- `createdAt` / `updatedAt` を持つToDoに進化させる

## 仕様（追加）

- ToDoに次の情報を追加する
  - `createdAt`（作成日時）
  - `updatedAt`（更新日時）
- タイトルは「空文字/空白のみ」を禁止する（エラーにする）

## 実装例（動く最小）

ここでは、配列を `ArrayList` に置き換え、例外と日時を導入した「動く最小」の例を載せます。

### `Task.java`

```java
package com.example.todo;

import java.time.LocalDateTime;

public class Task {
    private Long id;
    private String title;
    private boolean done;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    public Task() {
    }

    public Task(String title) {
        this.title = title;
        this.done = false;
        this.createdAt = LocalDateTime.now();
        this.updatedAt = this.createdAt;
    }

    public Long getId() {
        return id;
    }

    public String getTitle() {
        return title;
    }

    public boolean isDone() {
        return done;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public void setDone(boolean done) {
        this.done = done;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public void setUpdatedAt(LocalDateTime updatedAt) {
        this.updatedAt = updatedAt;
    }

    public void touch() {
        this.updatedAt = LocalDateTime.now();
    }
}
```

### 独自例外

`InvalidTaskTitleException.java`

```java
package com.example.todo;

public class InvalidTaskTitleException extends RuntimeException {
    public InvalidTaskTitleException() {
        super("title は必須です");
    }
}
```

`TaskNotFoundException.java`

```java
package com.example.todo;

public class TaskNotFoundException extends RuntimeException {
    public TaskNotFoundException(long id) {
        super("存在しないidです: " + id);
    }
}
```

### `TaskStore.java`（ArrayListで保存）

```java
package com.example.todo;

import java.util.ArrayList;
import java.util.List;

public class TaskStore {
    private final List<Task> tasks = new ArrayList<>();
    private long nextId = 1;

    public Task add(String title) {
        Task task = new Task(title);
        task.setId(nextId);
        nextId++;
        tasks.add(task);
        return task;
    }

    public List<Task> findAll() {
        return new ArrayList<>(tasks);
    }

    public Task findById(long id) {
        for (Task task : tasks) {
            if (task.getId() != null && task.getId() == id) {
                return task;
            }
        }
        return null;
    }

    public boolean deleteById(long id) {
        for (int i = 0; i < tasks.size(); i++) {
            if (tasks.get(i).getId() != null && tasks.get(i).getId() == id) {
                tasks.remove(i);
                return true;
            }
        }
        return false;
    }
}
```

### `TodoService.java`（入力チェック＋例外）

```java
package com.example.todo;

import java.util.List;

public class TodoService {
    private final TaskStore taskStore;

    public TodoService(TaskStore taskStore) {
        this.taskStore = taskStore;
    }

    public Task add(String title) {
        if (title == null || title.trim().isEmpty()) {
            throw new InvalidTaskTitleException();
        }
        return taskStore.add(title.trim());
    }

    public List<Task> list() {
        return taskStore.findAll();
    }

    public Task done(long id) {
        Task task = taskStore.findById(id);
        if (task == null) {
            throw new TaskNotFoundException(id);
        }
        task.setDone(true);
        task.touch();
        return task;
    }

    public void delete(long id) {
        boolean deleted = taskStore.deleteById(id);
        if (!deleted) {
            throw new TaskNotFoundException(id);
        }
    }
}
```

### `TodoCli.java`（例外をキャッチして継続）

```java
package com.example.todo;

import java.util.List;
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
            try {
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
            } catch (InvalidTaskTitleException | TaskNotFoundException e) {
                System.out.println(e.getMessage());
            }
        }
    }

    private void add() {
        System.out.print("title > ");
        String title = scanner.nextLine();
        Task created = todoService.add(title);
        System.out.println("added: id=" + created.getId());
    }

    private void list() {
        List<Task> tasks = todoService.list();
        if (tasks.isEmpty()) {
            System.out.println("(empty)");
            return;
        }
        for (Task task : tasks) {
            String mark = task.isDone() ? "x" : " ";
            System.out.println("[" + task.getId() + "] (" + mark + ") " + task.getTitle()
                    + " createdAt=" + task.getCreatedAt()
                    + " updatedAt=" + task.getUpdatedAt());
        }
    }

    private void done() {
        Long id = readLong("done id > ");
        if (id == null) {
            return;
        }
        todoService.done(id);
        System.out.println("done: id=" + id);
    }

    private void delete() {
        Long id = readLong("delete id > ");
        if (id == null) {
            return;
        }
        todoService.delete(id);
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

### 練習問題1：Taskの拡張

`Task` に次のフィールドを追加してください。

- `createdAt` と `updatedAt`（`java.time.LocalDateTime` を推奨）

また、完了にする/タイトルを更新する処理で `updatedAt` を更新してください。

### 練習問題2：保存先をArrayListに変更する

`TaskStore` の内部実装を、配列から `ArrayList<Task>` に置き換えてください。

- 追加や削除で「詰める処理」が不要になります

### 練習問題3：独自例外を用意する

次のような独自例外を作成し、`TodoService` から投げるようにしてください。

- `InvalidTaskTitleException`
- `TaskNotFoundException`

例外は `RuntimeException` を継承してOKです。

### 練習問題4：CLIで例外をハンドリングする

`TodoCli` で例外をキャッチして、ユーザーが次に何をすればよいか分かるメッセージを表示してください。

### 練習問題5：手動テストをする

- タイトルが空のときに追加できない（メッセージが出て継続できる）
- 存在しないIDで `done/delete` しても落ちない（メッセージが出て継続できる）
- `list` に `createdAt/updatedAt` が表示される

## 完了条件（チェックリスト）

- 配列が `ArrayList` に置き換わっている
- 空のタイトルが追加できない（エラーになる）
- 存在しないIDの操作で落ちず、メッセージを出して続行できる
- `createdAt` / `updatedAt` が表示できる

## AIに質問する（この章の例）

次の例をそのままAIに投げてOKです（必要なら自分のコード/エラーに置き換えてください）。

- 「『制作物：ToDo管理（コンソール版）にコレクション・例外・日時を導入する』を初心者向けに、たとえ話つきで説明して。最後に要点を3つにまとめて」
- 「この章の内容で理解確認クイズを5問作って（解答は最後にまとめて）」
- 「自分の実装を貼るのでレビューして。バグ/設計の危険箇所だけ指摘して、直し方はヒントで」
- 「List/Map/Setの使い分けを、ToDo管理の例で教えて」
