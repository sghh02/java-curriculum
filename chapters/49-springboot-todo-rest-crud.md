# Spring Boot：ToDo管理APIのCRUDエンドポイント

> 提出ブランチ：`feature/49-springboot-todo-rest-crud`（PRのbase：`develop`）

この章では、DBの前に「HTTP/JSONでCRUDができる」状態を作ります（保存先は一旦メモリでもOK）。

## 設計の方針（最小）

- Controller：HTTP/JSON（入出力）だけを担当する
- Service：業務ロジック（作成/更新/削除）を担当する
- Repository：保存先（今はメモリ、次の章でDB）を担当する

## ゴール

- `GET/POST/PUT/DELETE` のCRUDエンドポイントを作れる
- リクエスト/レスポンスをDTOで表現できる
- バリデーションで不正入力を弾ける

## API仕様（例）

- `GET /tasks`：一覧
- `POST /tasks`：作成
- `GET /tasks/{id}`：取得
- `PUT /tasks/{id}`：更新
- `DELETE /tasks/{id}`：削除

### リクエスト例（作成）

```json
{ "title": "buy milk" }
```

## 練習問題

### 練習問題1：DTOを作る

`src/main/java/com/example/todo/dto/` に、次のDTOを作成してください。

※ `record` は Java 17 で使える「簡潔に書けるデータ用クラス」です。通常のクラスで書いてもOKです。

`CreateTaskRequest.java`

```java
package com.example.todo.dto;

import jakarta.validation.constraints.NotBlank;

public record CreateTaskRequest(
        @NotBlank String title
) {}
```

`UpdateTaskRequest.java`

```java
package com.example.todo.dto;

import jakarta.validation.constraints.NotBlank;

public record UpdateTaskRequest(
        @NotBlank String title,
        boolean completed
) {}
```

`TaskResponse.java`

```java
package com.example.todo.dto;

public record TaskResponse(
        Long id,
        String title,
        boolean completed
) {}
```

### 練習問題2：Task（データ）を作る

`src/main/java/com/example/todo/domain/Task.java` を作成してください。

```java
package com.example.todo.domain;

public class Task {
    private Long id;
    private String title;
    private boolean completed;

    public Task() {
    }

    public Task(Long id, String title, boolean completed) {
        this.id = id;
        this.title = title;
        this.completed = completed;
    }

    public Long getId() {
        return id;
    }

    public String getTitle() {
        return title;
    }

    public boolean isCompleted() {
        return completed;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public void setCompleted(boolean completed) {
        this.completed = completed;
    }
}
```

### 練習問題3：Repository（メモリ実装）を作る

次の章でDBに置き換えるので、Repositoryは「後で差し替えやすい形」にしておきます。

`src/main/java/com/example/todo/repository/TaskRepository.java`

```java
package com.example.todo.repository;

import com.example.todo.domain.Task;

import java.util.List;
import java.util.Optional;

public interface TaskRepository {
    List<Task> findAll();

    Optional<Task> findById(Long id);

    Task save(Task task);

    void deleteById(Long id);

    boolean existsById(Long id);
}
```

`src/main/java/com/example/todo/repository/InMemoryTaskRepository.java`

```java
package com.example.todo.repository;

import com.example.todo.domain.Task;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.concurrent.atomic.AtomicLong;

@Repository
public class InMemoryTaskRepository implements TaskRepository {

    private final Map<Long, Task> tasks = new LinkedHashMap<>();
    private final AtomicLong sequence = new AtomicLong(0);

    @Override
    public List<Task> findAll() {
        return new ArrayList<>(tasks.values());
    }

    @Override
    public Optional<Task> findById(Long id) {
        return Optional.ofNullable(tasks.get(id));
    }

    @Override
    public Task save(Task task) {
        if (task.getId() == null) {
            task.setId(sequence.incrementAndGet());
        }
        tasks.put(task.getId(), task);
        return task;
    }

    @Override
    public void deleteById(Long id) {
        tasks.remove(id);
    }

    @Override
    public boolean existsById(Long id) {
        return tasks.containsKey(id);
    }
}
```

### 練習問題4：Serviceを作る（404を扱う）

`src/main/java/com/example/todo/exception/TaskNotFoundException.java`

```java
package com.example.todo.exception;

public class TaskNotFoundException extends RuntimeException {
    public TaskNotFoundException(Long id) {
        super("Task not found: id=" + id);
    }
}
```

`src/main/java/com/example/todo/service/TaskService.java`

```java
package com.example.todo.service;

import com.example.todo.domain.Task;
import com.example.todo.exception.TaskNotFoundException;
import com.example.todo.repository.TaskRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TaskService {
    private final TaskRepository taskRepository;

    public TaskService(TaskRepository taskRepository) {
        this.taskRepository = taskRepository;
    }

    public List<Task> list() {
        return taskRepository.findAll();
    }

    public Task create(String title) {
        Task task = new Task(null, title, false);
        return taskRepository.save(task);
    }

    public Task get(Long id) {
        Task task = taskRepository.findById(id).orElse(null);
        if (task == null) {
            throw new TaskNotFoundException(id);
        }
        return task;
    }

    public Task update(Long id, String title, boolean completed) {
        Task task = get(id);
        task.setTitle(title);
        task.setCompleted(completed);
        return taskRepository.save(task);
    }

    public void delete(Long id) {
        if (!taskRepository.existsById(id)) {
            throw new TaskNotFoundException(id);
        }
        taskRepository.deleteById(id);
    }
}
```

`src/main/java/com/example/todo/exception/ApiExceptionHandler.java`

```java
package com.example.todo.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.Map;

@RestControllerAdvice
public class ApiExceptionHandler {

    @ExceptionHandler(TaskNotFoundException.class)
    public ResponseEntity<Map<String, String>> handle(TaskNotFoundException ex) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND)
                .body(Map.of("message", ex.getMessage()));
    }
}
```

### 練習問題5：Controllerを作る

`src/main/java/com/example/todo/controller/TaskController.java` を作成して、CRUDエンドポイントを実装してください。

```java
package com.example.todo.controller;

import com.example.todo.domain.Task;
import com.example.todo.dto.CreateTaskRequest;
import com.example.todo.dto.TaskResponse;
import com.example.todo.dto.UpdateTaskRequest;
import com.example.todo.service.TaskService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/tasks")
public class TaskController {
    private final TaskService taskService;

    public TaskController(TaskService taskService) {
        this.taskService = taskService;
    }

    @GetMapping
    public List<TaskResponse> list() {
        List<TaskResponse> responses = new ArrayList<>();
        for (Task task : taskService.list()) {
            responses.add(toResponse(task));
        }
        return responses;
    }

    @PostMapping
    public ResponseEntity<TaskResponse> create(@Valid @RequestBody CreateTaskRequest request) {
        Task created = taskService.create(request.title());
        URI location = URI.create("/tasks/" + created.getId());
        return ResponseEntity.created(location).body(toResponse(created));
    }

    @GetMapping("/{id}")
    public TaskResponse get(@PathVariable Long id) {
        return toResponse(taskService.get(id));
    }

    @PutMapping("/{id}")
    public TaskResponse update(@PathVariable Long id, @Valid @RequestBody UpdateTaskRequest request) {
        return toResponse(taskService.update(id, request.title(), request.completed()));
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable Long id) {
        taskService.delete(id);
    }

    private static TaskResponse toResponse(Task task) {
        return new TaskResponse(task.getId(), task.getTitle(), task.isCompleted());
    }
}
```

### 練習問題6：curlで動作確認する

```bash
# 作成（201）
curl -i -X POST http://localhost:8080/tasks \\
  -H 'Content-Type: application/json' \\
  -d '{ "title": "buy milk" }'

# 一覧（200）
curl -i http://localhost:8080/tasks

# 取得（200）
curl -i http://localhost:8080/tasks/1

# 更新（200）
curl -i -X PUT http://localhost:8080/tasks/1 \\
  -H 'Content-Type: application/json' \\
  -d '{ "title": "buy milk", "completed": true }'

# 削除（204）
curl -i -X DELETE http://localhost:8080/tasks/1

# 404（存在しないID）
curl -i http://localhost:8080/tasks/999
```

## 完了条件（チェックリスト）

- curlでCRUDが一通りできる
- タイトルが空なら `400 Bad Request` になる
- 存在しないIDは `404 Not Found` になる

## AIに質問する（この章の例）

次の例をそのままAIに投げてOKです（必要なら自分のコード/エラーに置き換えてください）。

```text
「『Spring Boot：ToDo管理APIのCRUDエンドポイント』を初心者向けに、たとえ話つきで説明して。最後に要点を3つにまとめて」
「この章の内容で理解確認クイズを5問作って（解答は最後にまとめて）」
「自分の実装を貼るのでレビューして。バグ/設計の危険箇所だけ指摘して、直し方はヒントで」
「この章の手順で詰まった。エラー文から原因候補と確認順を教えて」
```

---

## 課題提出

この章には提出課題があります。

1. 上記のハンズオン課題を完了する
2. GitHub で `feature/49-springboot-todo-rest-crud` ブランチを作成し、PRを作成
3. [AI総合レビューツール](https://ai.studio/apps/drive/1AMqIqU4Bio4te7AWh5dly1Qzp7CesqP9?fullscreenApplet=true) でレビューを実行
4. 問題がなければ、スプレッドシートに **PR URL** と **完了日** を記入
