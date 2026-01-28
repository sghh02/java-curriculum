# Spring Boot実践：Petclinicに機能追加（API/バリデーション/テスト）

この章では、既存のSpring Bootアプリ（Spring Petclinic）に「小さな機能追加」を行い、テストで守ってPRとして提出します。

## 前提

- 前章の手順でPetclinicが起動できている
- 作業ブランチで作業している（例：`feature/owner-count`）

## ゴール

- `GET /api/owners/count` がJSONでオーナー数を返す
- `Pet.name` に「3文字以上、50文字以内」のバリデーションが付いている
- 追加した機能がテストで守られている（Repository / Service / Controller）
- PRを作成して提出できる

## 課題1：`/api/owners/count` を追加する（REST）

### 要件

- エンドポイント `GET /api/owners/count` を追加する
- レスポンスはJSON（例：`{ "count": 10 }`）

### 実装の考え方（最小）

- Repository：件数を返す
- Service：件数取得のユースケースを1つ作る
- REST Controller：`/api/owners/count` を返す

Repositoryは、Spring Dataの `count()` が使える場合はそれを使ってOKです。
使えない場合は、`@Query` などで件数取得メソッドを追加してください。

## 課題2：`Pet.name` にバリデーションを追加する

### 要件

- `Pet` エンティティの `name` に「3文字以上、50文字以内」を追加する

### ヒント

- `@Size(min = 3, max = 50)` を検討する
- すでに `@NotEmpty` / `@NotBlank` が付いている場合は、併用するか見直す
- どこでバリデーションが動いているかは、`@Valid` が付いているControllerを探すと追いやすい

## 課題3：テストを追加する

### 要件

次のテストを追加して、「追加した仕様」が壊れないようにしてください。

1. Repositoryのテスト：オーナー数を取得できる
2. Serviceのテスト：Repositoryを呼び出して件数を返す
3. Controllerのテスト：`GET /api/owners/count` が期待したJSONを返す

### おすすめの書き方（例）

- Repository：`@DataJpaTest`（DB込みで確認）
- Service：MockitoでRepositoryをモックしてUnit Test
- Controller：`@WebMvcTest` か `@SpringBootTest` + `@AutoConfigureMockMvc`

## （任意）課題4：ホーム画面にオーナー数を表示する

APIだけでOKならスキップして構いません。余力があればやってみてください。

- ホーム画面を返しているControllerを探し、Modelにオーナー数を積む
- テンプレート（`home.html` など）に表示を追加する

## 提出方法

1. 変更をコミットしてpushする
2. GitHubでPull Requestを作る
3. PR本文に次を含める
   - 何を追加したか（API/バリデーション/テスト）
   - 動作確認手順（例：`./mvnw test`、`curl`）

## 評価基準（チェックリスト）

- 仕様を満たしている（`/api/owners/count` / バリデーション）
- コードが読みやすく、責務が分離されている
- テストが意味のある形で追加されている
- PRの説明が分かりやすい

## AIに質問する（この章の例）

次の例をそのままAIに投げてOKです（必要なら自分のコード/エラーに置き換えてください）。

```text
「Petclinicで `OwnerRepository` はどんな型（`JpaRepository` など）を継承してる？件数取得は `count()` で良い？確認ポイントを教えて」
「`GET /api/owners/count` の設計を相談したい。どの層（Repository/Service/Controller）に何を置くのが最小で、テストしやすい？」
「`Pet.name` に `@Size(min=3,max=50)` を付けた。どこで `@Valid` が効いて、どの入力でエラーになるかを確認する手順を教えて」
「MockMvcで `/api/owners/count` をテストしたい。`@WebMvcTest` と `@SpringBootTest` の使い分けを、今回の課題に合わせて提案して」
```

---

## 課題提出

この章には提出課題があります。

1. 上記のハンズオン課題を完了する
2. GitHub で `feature/55-springboot-petclinic-feature-add` ブランチを作成し、PRを作成
3. [AI総合レビューツール](https://ai.studio/apps/drive/1AMqIqU4Bio4te7AWh5dly1Qzp7CesqP9?fullscreenApplet=true) でレビューを実行
4. 問題がなければ、スプレッドシートに **PR URL** と **完了日** を記入
