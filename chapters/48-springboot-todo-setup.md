# Spring Boot：ToDo管理APIのプロジェクト作成

この章から、制作物を「Spring BootのREST API」として作り直します。最終ゴールは「CRUD API＋DB＋テスト」です。

## 前提

- Java 17 がインストールされている（`java -version` で確認）
- 以降のコマンド例は macOS/Linux を想定しています（Windowsの場合は `mvnw.cmd` を使ってください）

## ゴール

- Spring Bootプロジェクトを作成して起動できる
- REST API開発の土台（依存関係/設定）を用意できる

## 練習問題

### 練習問題1：Spring Initializrでプロジェクトを作る

Spring Initializrで次の内容のプロジェクトを作成してください（Maven推奨）。

- Project: Maven
- Language: Java
- Spring Boot: 3.x
- Java: 17（推奨）
- Group: `com.example`
- Artifact: `todo-api`
- Packaging: Jar
- Package name: `com.example.todo`
- Dependencies:
  - Spring Web
  - Validation
  - Spring Data JPA
  - H2 Database
  - Spring Boot DevTools（任意）

### 練習問題2：IDEに取り込む

zipを解凍し、IDEでプロジェクトフォルダを開きます（Mavenプロジェクトとして認識させます）。
手順はIDEにより違うので、困ったら「IDE名」と「今の状態（画面/エラー）」をAIに貼って聞いてOKです。

- IntelliJ IDEA：解凍したフォルダを `Open`
- Eclipse：`Import` → `Maven` → `Existing Maven Projects`

### 練習問題3：起動して動作確認する

プロジェクトを起動し、`/health` のような簡単なエンドポイントを追加して、ブラウザやcurlで確認してください。

#### 1. 起動する

```bash
./mvnw spring-boot:run
```

#### 2. `HealthController` を追加する

`src/main/java/com/example/todo/HealthController.java` を作成し、次のコードを追加してください。

```java
package com.example.todo;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HealthController {
    @GetMapping("/health")
    public String health() {
        return "ok";
    }
}
```

#### 3. curlで確認する

```bash
curl -i http://localhost:8080/health
```

### 練習問題4：（任意）`application.yml` を用意する

後の章でDBを使うので、H2コンソールだけ有効にしておくと便利です。

`src/main/resources/application.yml` を作成し、次の設定を追加してください。

```yaml
spring:
  h2:
    console:
      enabled: true
```

## 完了条件（チェックリスト）

- アプリが起動できる
- `GET /health` が `ok` を返す

## AIに質問する（この章の例）

次の例をそのままAIに投げてOKです（必要なら自分のコード/エラーに置き換えてください）。

```text
「『Spring Boot：ToDo管理APIのプロジェクト作成』を初心者向けに、たとえ話つきで説明して。最後に要点を3つにまとめて」
「この章の内容で理解確認クイズを5問作って（解答は最後にまとめて）」
「自分の実装を貼るのでレビューして。バグ/設計の危険箇所だけ指摘して、直し方はヒントで」
「この章の手順で詰まった。エラー文から原因候補と確認順を教えて」
```

---

## 課題提出

この章には提出課題があります。

1. 上記のハンズオン課題を完了する
2. GitHub で `feature/48-springboot-todo-setup` ブランチを作成し、PRを作成
3. [AI総合レビューツール](https://ai.studio/apps/drive/1AMqIqU4Bio4te7AWh5dly1Qzp7CesqP9?fullscreenApplet=true) でレビューを実行
4. 問題がなければ、スプレッドシートに **PR URL** と **完了日** を記入
