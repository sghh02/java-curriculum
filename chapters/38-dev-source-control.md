# ソースコードの管理と共有

> 提出ブランチ：`feature/38-dev-source-control`（PRのbase：`develop`）

この章では、課題提出で必要な「gitの最小セット」を扱います。
細かいコマンド暗記は不要で、困ったらAIにエラーと状況を貼ってOKです。

## ゴール

- 変更を安全に残す（commit）
- 間違っても戻せる（log / diff）
- ブランチで作業する（branch）
- GitHubにpushしてURLで提出する（push）
- PR（Pull Request）で差分を説明できる（任意）

## 最小ワークフロー（これだけでOK）

### 1. 状態確認

```bash
git status
git diff
```

### 2. 変更を記録（commit）

```bash
git add .
git commit -m "Describe change"
```

### 3. ブランチで作業（推奨）

```bash
git checkout -b feature/38-dev-source-control
```

### 4. GitHubへpush

```bash
git push -u origin feature/38-dev-source-control
```

## よくあるつまずき（最小の対処）

- `fatal: not a git repository` → プロジェクトのルートで実行しているか確認
- `nothing to commit` → 変更が保存されているか、`git status` で確認
- `rejected` / `fetch first` → まず `git pull`（不安ならAIに状況を貼って確認）

## 練習問題

### 練習問題1：制作物をGitHubで管理する

制作物（ToDo管理）のリポジトリで次を実施してください。

- 作業ブランチを作る
- 変更をcommitする
- GitHubへpushする

### 練習問題2：（任意）PRを作る

GitHub上でPRを作り、本文に次を書いてください。

- 何を変えたか（要点3つ）
- 動作確認手順（例：実行コマンド、テストコマンド）

## AIに質問する（この章の例）

次の例をそのままAIに投げてOKです（必要なら自分のコード/エラーに置き換えてください）。

```text
「『ソースコードの管理と共有』を初心者向けに、たとえ話つきで説明して。最後に要点を3つにまとめて」
「この章の内容で理解確認クイズを5問作って（解答は最後にまとめて）」
「この章の練習問題で詰まった。答えを丸ごとではなく、方針→ヒント→確認質問の順で教えて」
「gitで安全に作業する手順（branch/commit/push）を、この課題向けに説明して」
```

## 完了条件（チェックリスト）

- [ ] 課題（練習問題/ハンズオン）の要件を満たした
- [ ] 自分で動作確認できた（実行結果/スクショ/ログのいずれか）
- [ ] `feature/38-dev-source-control` で作業し、コミットしてpushした
- [ ] `feature/38-dev-source-control` → `develop` のPRを作成した
- [ ] AI総合レビューツールでレビューし、指摘を反映した（または理由を説明できる）

---

## 課題提出

この章には提出課題があります。

1. 上記の練習問題を完了する
2. GitHub で `feature/38-dev-source-control` ブランチを作成し、PRを作成
3. [AI総合レビューツール](https://ai.studio/apps/drive/1AMqIqU4Bio4te7AWh5dly1Qzp7CesqP9?fullscreenApplet=true) でレビューを実行
4. 問題がなければ、スプレッドシートに **PR URL** と **完了日** を記入
