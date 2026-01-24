import fs from "node:fs/promises";
import path from "node:path";

function normalizeNewlines(text) {
  return text.replace(/\r\n/g, "\n");
}

function shouldSkipItem(item) {
  return new Set(["ai-learning", "basics-curriculum-guide"]).has(item.id);
}

function buildPrompts({ id, title }) {
  const prompts = [];

  prompts.push(`「『${title}』を初心者向けに、たとえ話つきで説明して。最後に要点を3つにまとめて」`);
  prompts.push(`「この章の内容で理解確認クイズを5問作って（解答は最後にまとめて）」`);

  if (id.startsWith("project-") || id.startsWith("springboot-")) {
    prompts.push(
      "「自分の実装を貼るのでレビューして。バグ/設計の危険箇所だけ指摘して、直し方はヒントで」",
    );
  } else {
    prompts.push(
      "「この章の練習問題で詰まった。答えを丸ごとではなく、方針→ヒント→確認質問の順で教えて」",
    );
  }

  const topic =
    title.includes("環境構築") ? "「Javaのインストール確認（`java -version`）結果から、次に見るべき設定を教えて」"
    : title.includes("プログラムの書き方") ? "「`main`メソッドの役割と、実行の流れを図解して」"
    : title.includes("式と演算子") ? "「演算子の優先順位で間違えやすい例を3つ出して、なぜそうなるか説明して」"
    : title.includes("条件分岐") ? "「if/switch/for/whileの使い分けを、具体例（入力→出力）で教えて」"
    : title.includes("配列") ? "「配列の添字ミス（off-by-one）を防ぐ考え方とチェック方法を教えて」"
    : title.includes("メソッド") ? "「メソッドに切り出す判断基準を、例（before/afterの考え方）で教えて」"
    : title.includes("複数クラス") ? "「責務分割の観点で、どのクラスに何を置くべきかレビューして」"
    : title.includes("オブジェクト指向") ? "「OOPの目的（何が嬉しいか）を、ToDo管理の例で説明して」"
    : title.includes("インスタンス") ? "「インスタンス生成（new）と参照の動きを、図で説明して」"
    : title.includes("継承") ? "「overrideのルールと、`super` を使うタイミングを例で教えて」"
    : title.includes("多様性") ? "「ポリモーフィズムを、インタフェースの例で説明して」"
    : title.includes("カプセル化") ? "「`private` と getter/setter の目的を、バグ例つきで説明して」"
    : title.includes("文字列") ? "「`String` の比較（`==` と `equals`）の違いを、バグ例つきで説明して」"
    : title.includes("日付") ? "「`java.time` の基本（LocalDate/LocalDateTime）を、よくある用途で説明して」"
    : title.includes("コレクション") ? "「List/Map/Setの使い分けを、ToDo管理の例で教えて」"
    : title.includes("例外") ? "「例外を投げる/握りつぶすの判断を、境界（UI/Service）で説明して」"
    : title.includes("ラムダ") ? "「ラムダ式が『何の省略』なのか、匿名クラスとの対応で説明して」"
    : title.includes("リフレクション") ? "「リフレクションは何が危険で、いつ使うべきかを具体例で教えて」"
    : title.includes("ライブラリ") ? "「外部ライブラリ導入時に確認すべき点（ライセンス/バージョン/依存関係）を教えて」"
    : title.includes("ファイルの操作") ? "「try-with-resourcesの意味と、例外時にリソースが閉じる流れを説明して」"
    : title.includes("ファイル形式") ? "「CSV/JSONの読み書きでハマる点（文字コード/改行/エスケープ）を教えて」"
    : title.includes("ネットワークアクセス") ? "「HTTPステータスコード（200/400/404/500）の意味を、API例で説明して」"
    : title.includes("データベースアクセス") ? "「SQLインジェクションを、悪い例→良い例（PreparedStatement）で説明して」"
    : title.includes("開発ツール") ? "「Maven（`mvnw`）でよく使うコマンドと、詰まったときの確認順を教えて」"
    : title.includes("単体テスト") ? "「テストケースを増やす観点（正常/境界/異常）を、この章の題材で整理して」"
    : title.includes("リファクタリング") ? "「このコードの重複/臭いを指摘して、壊さずに直す手順を提案して」"
    : title.includes("ソースコードの管理") ? "「gitで安全に作業する手順（branch/commit/push）を、この課題向けに説明して」"
    : title.includes("アジャイル") ? "「プランニングポーカーのやり方を、例（見積もりの会話）で教えて」"
    : title.includes("デザインパターン") ? "「この章のパターンを、ToDo管理APIに当てはめるとしたらどこ？理由つきで」"
    : title.includes("スレッド") ? "「競合状態（race condition）の起き方を、簡単な例で説明して」"
    : title.includes("ユーザーインタフェース") ? "「Swingでイベントハンドラを書く基本形を、最小例で教えて」"
    : title.includes("Spring Boot") ? "「この章の手順で詰まった。エラー文から原因候補と確認順を教えて」"
    : "「この章の内容を、制作物（ToDo管理）にどう活かすか提案して」";

  prompts.push(topic);
  return prompts;
}

function buildSection({ id, title }) {
  const prompts = buildPrompts({ id, title });
  const lines = [];

  lines.push("## AIに質問する（この章の例）");
  lines.push("");
  lines.push("次の例をそのままAIに投げてOKです（必要なら自分のコード/エラーに置き換えてください）。");
  lines.push("");
  for (const prompt of prompts) lines.push(`- ${prompt}`);

  return lines.join("\n");
}

async function main() {
  const repoRoot = process.cwd();
  const indexPath = path.join(repoRoot, "index.json");
  const indexJson = JSON.parse(await fs.readFile(indexPath, "utf8"));

  const items = [];
  for (const unit of indexJson.chapters ?? []) {
    for (const item of unit.items ?? []) items.push(item);
  }

  const marker = "## AIに質問する（この章の例）";
  const changed = [];

  for (const item of items) {
    if (shouldSkipItem(item)) continue;
    if (typeof item.path !== "string" || !item.path.endsWith(".md")) continue;

    const filePath = path.join(repoRoot, item.path);
    const original = normalizeNewlines(await fs.readFile(filePath, "utf8"));

    if (original.includes(marker)) continue;

    const section = buildSection({ id: item.id, title: item.title });
    const next = original.replace(/\s*$/, "\n\n" + section + "\n");
    await fs.writeFile(filePath, next, "utf8");
    changed.push(item.path);
  }

  console.log(`Updated ${changed.length} file(s).`);
  for (const filePath of changed) console.log(`- ${filePath}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
