# 基本的な開発ツール

この章では「動く」「テストが回る」「依存関係を追加できる」状態を作ります。
細かい暗記は不要で、困ったらコマンド結果やエラーをAIに貼ってOKです。

## ゴール

- Maven（`mvnw`）で起動/テストできる
- `pom.xml` を読んで、依存関係を追加できる
- つまずいたら「状況＋エラー＋試したこと」を出せる

## 最小コマンド（Maven）

Spring Boot（Unit 9）では Maven を使います。

```bash
# Maven wrapper の確認
./mvnw -v

# テスト
./mvnw test

# 起動
./mvnw spring-boot:run

# ビルド（テストなし）
./mvnw -DskipTests package
```

Windowsの場合は `./mvnw` の代わりに `mvnw.cmd` を使ってください。

## 依存関係（`pom.xml`）の最小理解

`pom.xml` の `<dependencies>` が「使うライブラリの一覧」です。
エラーで詰まったら、次の2つをAIに貼って相談すると解決が早いです。

- `pom.xml` の該当部分（dependencies周り）
- 実行したコマンドとエラー全文

## 練習問題

### 練習問題1：Spring Bootプロジェクトでコマンドを動かす

Unit 9 で作った `todo-api` プロジェクトで、次を実行してください。

- `./mvnw test`
- `./mvnw spring-boot:run`

### 練習問題2：依存関係を1つ追加して動作確認する（任意）

Spring Initializr で追加し忘れた依存があれば、`pom.xml` に追加して `./mvnw test` が通ることを確認してください。
（例：`spring-boot-starter-validation`、`spring-boot-starter-data-jpa` など）

## AIに質問する（この章の例）

次の例をそのままAIに投げてOKです（必要なら自分のコード/エラーに置き換えてください）。

- 「『基本的な開発ツール』を初心者向けに、たとえ話つきで説明して。最後に要点を3つにまとめて」
- 「この章の内容で理解確認クイズを5問作って（解答は最後にまとめて）」
- 「この章の練習問題で詰まった。答えを丸ごとではなく、方針→ヒント→確認質問の順で教えて」
- 「`./mvnw test` が失敗した。エラー全文を貼るので、原因候補と確認手順を優先度順に教えて」
