# リポジトリ運用ガイドライン

## プロジェクト構成とモジュールの整理
- `index.json` はカリキュラムのナビゲーション（Unit/lesson のメタデータ）を定義します。
- `chapters/*.md` には、利用側アプリでそのままレンダリングされるレッスン本文が入ります。
- `scripts/validate-index.mjs` は `index.json` と `chapters/` の整合性（パス存在・タイトル一致など）を検証します。
- `AGENTS.md` には編集・PR のルールが書かれています（このファイル）。

## ビルド／テスト／開発コマンド
このリポジトリは教材コンテンツのみで、ビルド工程はありません。PR 前に以下を実行してください。
- `node scripts/validate-index.mjs`: `index.json` の構文、参照しているレッスンパス、`title` ↔ 先頭 H1 の整合性、H1 が 1 つであることを検証します。
- `node -e "JSON.parse(require('fs').readFileSync('index.json','utf8'))"`: JSON の構文を素早くチェックします。
- `rg "keyword" chapters`: レッスン本文を横断検索します。

## コーディングスタイルと命名規則
- Markdown: 各レッスンは先頭行を単一の H1（`# ...`）から開始し、対応する `index.json` の項目 `title` と一致させます。見出しは `##`/`###`、コードブロックは言語タグ付き（例: `bash`, `json`）を使います。
- ファイル名: `chapters/NN-topic-slug.md`（例: `chapters/00-ai-learning.md`）。公開後は極力変更しません。
- ID: `kebab-case` で、カリキュラム内で一意かつ不変（例: `web-service-technology-roles-overview`）。
- JSON: 厳密な JSON のみ（コメント不可、末尾カンマ不可）。インデントは 2 スペース、文字列はダブルクォートを推奨します。

## テスト指針
このリポジトリにはユニットテスト一式がありません。`node scripts/validate-index.mjs` を PR 前の必須チェックとして扱ってください。レッスンを追加／削除する場合は、`index.json` と `chapters/`（パス、タイトル、ID）を同期してください。

## コミット／プルリクエストの指針
- コミット: 履歴に合わせて、短い命令形のメッセージを使います（例: `Add ...`, `Fix ...`, `Rename ...`）。
- PR: サマリ、変更したレッスンパスの一覧、`index.json` のナビゲーション変更点を記載します。`id`/`path` 変更がある場合は理由と影響範囲も明記してください。
