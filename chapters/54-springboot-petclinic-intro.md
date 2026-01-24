# Spring Boot実践：Spring Petclinicを動かして構造を理解する

この章では、既存のSpring Bootアプリ（Spring Petclinic）を題材に「起動できる」「構造を追える」状態を作ります。
次の章で、実際に機能追加とテスト追加を行います。

## ゴール

- リポジトリをforkしてローカルで起動できる
- `./mvnw test` が実行できる
- `Owner` / `Pet` 周りの入口（Controller/Service/Repository/Entity）を特定できる
- 課題用の作業ブランチを切れている

## 準備

- GitHubアカウント
- Java 17（推奨）
- Git
- IDE（Eclipse / IntelliJ IDEA / VS Code など、使い慣れたものでOK）

## 1. リポジトリを準備する

元リポジトリ：`https://github.com/spring-projects/spring-petclinic`

1. 上記リポジトリをforkする
2. 自分のforkをcloneする

```bash
git clone <あなたのforkのURL>
cd spring-petclinic
git checkout -b feature/owner-count
```

## 2. テストを実行する

最初にテストを実行して「いま動いている」を確認します。

```bash
./mvnw test
```

## 3. 起動して動作確認する

```bash
./mvnw spring-boot:run
```

ブラウザで `http://localhost:8080` を開いて、画面が表示されることを確認してください。

## 4. コードの入口を探す（検索のコツ）

既存コード改修は、ファイル名を覚えるより **検索** が重要です。次をIDEの検索で探してください。

- `@SpringBootApplication`（アプリの起点）
- `@Controller` / `@RestController`（HTTPの入口）
- `@Service`（業務ロジック）
- `@Repository`（DBアクセス）
- `@Entity`（永続化されるデータ）

### Owner/Pet周りで見つけたいもの（例）

※パッケージやクラス名が変わってもOKです。検索で辿ってください。

- `Owner`（オーナーのエンティティ）
- `Pet`（ペットのエンティティ）
- `OwnerRepository`（オーナーのRepository）
- `OwnerController`（オーナー関連のController）
- ホーム画面を返すControllerとテンプレート（`home.html` など）

## 5. DBと初期データを確認する（任意）

Petclinicは、ローカル用にH2を使っていたり、初期データをSQLで投入していることがあります。
次のどれかを探して「どこでデータが入るか」を把握しておくと、次章のテストが書きやすくなります。

- `src/main/resources/data.sql`
- `src/main/resources/import.sql`
- `src/main/resources/application.properties`（DB設定）

## 完了条件（チェックリスト）

- `./mvnw test` が通る
- `./mvnw spring-boot:run` で起動し、`http://localhost:8080` が見える
- `Owner` / `Pet` / `OwnerRepository` / `OwnerController` の場所（ファイル）を特定できた
- 作業ブランチ `feature/owner-count` が作れている

## AIに質問する（この章の例）

次の例をそのままAIに投げてOKです（必要なら自分の状況に置き換えてください）。

- 「Spring Petclinicのコードを読みたい。`Owner` に関連するHTTP→Service→Repository→DBの流れを追うために、IDE検索で探すべきキーワードを順番に教えて」
- 「`@Controller` と `@RestController` が混乱してる。Petclinic（画面あり）を例に、役割の違いを説明して」
- 「`./mvnw test` が失敗した。エラー全文を貼るので、原因候補と確認手順を優先度順に出して（まずはヒントから）」
- 「次章で `/api/owners/count` を作りたい。どの層に何を足すべきか（Repository/Service/Controller）を、最小構成で提案して」
