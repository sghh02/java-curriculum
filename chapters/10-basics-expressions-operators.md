# 式と演算子

> 提出ブランチ：`feature/10-basics-expressions-operators`（PRのbase：`develop`）

## ゴール

- この章の課題（練習問題/ハンズオン）を完了できる
- 章で扱ったテーマを、自分の言葉で3行で説明できる
- 作業ブランチ `feature/10-basics-expressions-operators` で作業し、PRで提出できる

## 課題：chapter 2 式と演算子

この章を学習したら、以下の練習問題に取り組んでください。

## 練習問題1

以下の内容のプログラムを作成してください。

1. 画面に「ようこそ占いの館へ」と表示します。
2. 画面に「あなたの名前を入力してください」と表示します。
3. キーボードから 1行の文字入力を受け付け、String 型の変数 nameに納します。
4. 画面に「あなたの年齢を入力してください」と表示します。
5. キーボードから1行の文字入力を受け付け、String 型の変数 ageString に格納します。
6. 変数ageString の内容をint型に変換し、int型の変数ageに代入します。
7. 0から3までの乱数を生成し、int型の変数 fortune に代入します。
8. fortune の数値をインクリメント演算子で1増やし、1から4の乱数にします。
9. 画面に「占いの結果が出ました！」と表示します。
10. 1画面に「（年齢）歳の（名前）さん、あなたの運気番号は（乱数）です」と表示します。
その際に（年齢）には変数ageを、（名前）には変数 nameを、そして（乱数）には⑧で作った数を表示します。
11. 画面に「1：大吉 2：中吉 3：吉 4：凶」と表示します。

## 練習問題2

以下のJavaプログラムはエラーとなってしまいます。
各問題に対して修正を行い、正しい出力が得られるようにしてください。

```java
public class ModificationTask {

    public static void main(String[] args) {
        // 問題1:
        int operand1 = 8;
        int operand2 = 4;
        int result = operand1 - operand2;

        System.out.println("問題1: 修正後の式の結果 =  + result);

        // 問題2:
        double decimalValue = 12.75;
        int intValue = decimalValue;

        System.out.println("問題2: 追加した型変換後の整数値 = " + intValue);
    }
}
```

## AIに質問する（この章の例）

次の例をそのままAIに投げてOKです（必要なら自分のコード/エラーに置き換えてください）。

```text
「『式と演算子』を初心者向けに、たとえ話つきで説明して。最後に要点を3つにまとめて」
「この章の内容で理解確認クイズを5問作って（解答は最後にまとめて）」
「この章の練習問題で詰まった。答えを丸ごとではなく、方針→ヒント→確認質問の順で教えて」
「演算子の優先順位で間違えやすい例を3つ出して、なぜそうなるか説明して」
```

## 完了条件（チェックリスト）

- [ ] 課題（練習問題/ハンズオン）の要件を満たした
- [ ] 自分で動作確認できた（実行結果/スクショ/ログのいずれか）
- [ ] `feature/10-basics-expressions-operators` で作業し、コミットしてpushした
- [ ] `feature/10-basics-expressions-operators` → `develop` のPRを作成した
- [ ] AI総合レビューツールでレビューし、指摘を反映した（または理由を説明できる）

---

## 課題提出

この章には提出課題があります。

1. 上記の練習問題を完了する
2. GitHub で `feature/10-basics-expressions-operators` ブランチを作成し、PRを作成
3. [AI総合レビューツール](https://ai.studio/apps/drive/1AMqIqU4Bio4te7AWh5dly1Qzp7CesqP9?fullscreenApplet=true) でレビューを実行
4. 問題がなければ、スプレッドシートに **PR URL** と **完了日** を記入
