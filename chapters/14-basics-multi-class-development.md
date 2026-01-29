# 複数クラスを用いた開発

> 提出ブランチ：`feature/14-basics-multi-class-development`（PRのbase：`develop`）

## 課題：chapter 6 複数クラスを用いた開発

この章を学習したら、以下の練習問題に取り組んでください。

## 練習問題1

次のソースコードを分解してください。

```java
public class Main {
    public static void main(String[] args) {
	    	displayStart();
        displaySum(5, 3);
        displayProduct(4, 6);
    }

    // 文字を表示するメソッド
    public static void displayStart() {
    	System.out.println("足し算と掛け算を行います！");
    }

    // 足し算の結果を表示するメソッド
    public static void displaySum(int a, int b) {
        int sum = addNumbers(a, b);
        System.out.println("Sum: " + sum);
    }

    // 掛け算の結果を表示するメソッド
    public static void displayProduct(int x, int y) {
        int product = multiplyNumbers(x, y);
        System.out.println("Product: " + product);
    }

    // 足し算をするメソッド
    public static int addNumbers(int num1, int num2) {
        return num1 + num2;
    }

    // 掛け算するメソッド
    public static int multiplyNumbers(int num1, int num2) {
        return num1 * num2;
    }
}
```

## 練習問題2

練習問題1で分割したクラスのパッケージを作成してそのパッケージに移動させてください。

## 練習問題3

[APIリファレンス](https://docs.oracle.com/javase/jp/21/docs/api/)でRandomクラスを調べ、1 ~ 100の数値をランダムに生成するメソッドを作成してください。
上記で作成したメソッドの値をmultiplyNumbersメソッドの第二引数として渡すようにして、multiplyNumbersの返り値が100を超えたら、”掛け算の値が100を超えました”と表示してください。

## AIに質問する（この章の例）

次の例をそのままAIに投げてOKです（必要なら自分のコード/エラーに置き換えてください）。

```text
「『複数クラスを用いた開発』を初心者向けに、たとえ話つきで説明して。最後に要点を3つにまとめて」
「この章の内容で理解確認クイズを5問作って（解答は最後にまとめて）」
「この章の練習問題で詰まった。答えを丸ごとではなく、方針→ヒント→確認質問の順で教えて」
「責務分割の観点で、どのクラスに何を置くべきかレビューして」
```

---

## 課題提出

この章には提出課題があります。

1. 上記の練習問題を完了する
2. GitHub で `feature/14-basics-multi-class-development` ブランチを作成し、PRを作成
3. [AI総合レビューツール](https://ai.studio/apps/drive/1AMqIqU4Bio4te7AWh5dly1Qzp7CesqP9?fullscreenApplet=true) でレビューを実行
4. 問題がなければ、スプレッドシートに **PR URL** と **完了日** を記入
