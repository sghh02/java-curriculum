# カプセル化


## 課題：chapter 13 カプセル化

[https://forms.gle/5g7ovoE552ZhREaS6](https://forms.gle/5g7ovoE552ZhREaS6)

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
