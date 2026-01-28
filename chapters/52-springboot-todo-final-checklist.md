# Spring Boot：ToDo管理APIの完成チェックリスト

この章は、提出前に「要件を満たしているか」を確認するためのチェックリストです。

## 必須要件（CRUD API＋DB＋テスト）

- `GET /tasks` が一覧を返す
- `POST /tasks` が作成できる
- `GET /tasks/{id}` が取得できる（無ければ404）
- `PUT /tasks/{id}` が更新できる（無ければ404）
- `DELETE /tasks/{id}` が削除できる（無ければ404）
- DBに保存されている（再起動後の扱いは設定による）
- テストがあり、主要な仕様が守られている

## 任意（できたら強い）

- ページング/ソート
- 例外ハンドリングの統一（エラーレスポンス形式）
- OpenAPI（Swagger）でAPI仕様を見える化

## 最終確認（例）

### 1. テストを実行する

```bash
./mvnw test
```

### 2. 起動してAPIを確認する

```bash
./mvnw spring-boot:run
```

```bash
curl -i -X POST http://localhost:8080/tasks \
  -H 'Content-Type: application/json' \
  -d '{ "title": "buy milk" }'

curl -i http://localhost:8080/tasks
```

### 3. （任意）DBを確認する

- H2コンソール：`http://localhost:8080/h2-console`
- JDBC URL：`application.yml` の `spring.datasource.url` と同じ値

## AIに質問する（この章の例）

次の例をそのままAIに投げてOKです（必要なら自分のコード/エラーに置き換えてください）。

```text
「『Spring Boot：ToDo管理APIの完成チェックリスト』を初心者向けに、たとえ話つきで説明して。最後に要点を3つにまとめて」
「この章の内容で理解確認クイズを5問作って（解答は最後にまとめて）」
「自分の実装を貼るのでレビューして。バグ/設計の危険箇所だけ指摘して、直し方はヒントで」
「この章の手順で詰まった。エラー文から原因候補と確認順を教えて」
```

---

## 完了記録

この章には提出課題はありません。
学習が完了したら、スプレッドシートに **完了日** のみ記入してください。
