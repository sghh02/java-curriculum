# カプセル化

> 提出ブランチ：`feature/21-oop-encapsulation`（PRのbase：`develop`）

## 課題：chapter 13 カプセル化

この章を学習したら、以下の練習問題に取り組んでください。

## 練習問題1

次のBookクラスをカプセル化してください。

```java
public class Book {
    String title;
    int price;

    void show() {
        System.out.println("この本のタイトルは" + this.title + "で、値段は" + this.price+ "です。");
    }
}
```

## 練習問題2

練習問題1で作成したBook.javaで不正な値を防ぐ処理を追加したBook2.javaを作成してください。

**変更仕様**
価格について負の値が入力された場合は「0」を設定する処理をpriceのセッターメソッドに追加する。
不正な値の場合は以下のメッセージを画面に出力する。
「設定する値が-Xのため、価格は0を設定しました。」
※「-X」は引数の値を出力するためその都度変わります。

## AIに質問する（この章の例）

次の例をそのままAIに投げてOKです（必要なら自分のコード/エラーに置き換えてください）。

```text
「『カプセル化』を初心者向けに、たとえ話つきで説明して。最後に要点を3つにまとめて」
「この章の内容で理解確認クイズを5問作って（解答は最後にまとめて）」
「この章の練習問題で詰まった。答えを丸ごとではなく、方針→ヒント→確認質問の順で教えて」
「`private` と getter/setter の目的を、バグ例つきで説明して」
```

---

## 課題提出

この章には提出課題があります。

1. 上記の練習問題を完了する
2. GitHub で `feature/21-oop-encapsulation` ブランチを作成し、PRを作成
3. [AI総合レビューツール](https://ai.studio/apps/drive/1AMqIqU4Bio4te7AWh5dly1Qzp7CesqP9?fullscreenApplet=true) でレビューを実行
4. 問題がなければ、スプレッドシートに **PR URL** と **完了日** を記入
