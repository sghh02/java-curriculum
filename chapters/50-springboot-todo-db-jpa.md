# Spring Boot：ToDo管理APIのDB（JPA）対応

この章では、メモリ実装をDB実装に置き換えます。Spring Data JPAとH2を使うと、最小構成で進められます。

## ゴール

- `@Entity` と `JpaRepository` で永続化できる
- APIがDBに対してCRUDできる

## 練習問題

### 練習問題1：Task を `@Entity` にする

前章で作成した `Task` を、JPAのEntityにします。

`src/main/java/com/example/todo/domain/Task.java` を次のように修正してください（例）。

```java
package com.example.todo.domain;

import jakarta.persistence.*;

@Entity
@Table(name = "tasks")
public class Task {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 100)
    private String title;

    @Column(nullable = false)
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

### 練習問題2：RepositoryをSpring Data JPAに置き換える

前章で作成した `TaskRepository` を、Spring Data JPAのRepositoryに置き換えます。

`src/main/java/com/example/todo/repository/TaskRepository.java` を次のように修正してください。

```java
package com.example.todo.repository;

import com.example.todo.domain.Task;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TaskRepository extends JpaRepository<Task, Long> {
}
```

そして、メモリ実装は不要になるので `InMemoryTaskRepository` を削除してください。

※前章の `TaskService` / `TaskController` は、基本的にそのままで動きます（Repositoryの実体がDBに置き換わるだけです）。

### 練習問題3：`application.yml` を設定する

`src/main/resources/application.yml` にH2/JPAの設定を追加してください（例）。

```yaml
spring:
  datasource:
    url: jdbc:h2:mem:todo;DB_CLOSE_DELAY=-1
    username: sa
    password:
  h2:
    console:
      enabled: true
  jpa:
    open-in-view: false
    hibernate:
      ddl-auto: update
```

再起動後もデータを残したい場合は、URLをファイルモードにします（例）。

```yaml
spring:
  datasource:
    url: jdbc:h2:file:./data/todo
```

### 練習問題4：動作確認する

- `POST /tasks` で作成できる
- アプリ再起動後も、データが残る（ファイルモードの場合）
- H2コンソール（`/h2-console`）で `tasks` テーブルが確認できる

## 完了条件（チェックリスト）

- 再起動しても（H2をファイルモードにすれば）データが残る
- CRUDがDBに対して動く

## AIに質問する（この章の例）

次の例をそのままAIに投げてOKです（必要なら自分のコード/エラーに置き換えてください）。

- 「『Spring Boot：ToDo管理APIのDB（JPA）対応』を初心者向けに、たとえ話つきで説明して。最後に要点を3つにまとめて」
- 「この章の内容で理解確認クイズを5問作って（解答は最後にまとめて）」
- 「自分の実装を貼るのでレビューして。バグ/設計の危険箇所だけ指摘して、直し方はヒントで」
- 「この章の手順で詰まった。エラー文から原因候補と確認順を教えて」
