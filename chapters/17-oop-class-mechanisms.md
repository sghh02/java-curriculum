# さまざまなクラス機構


## 課題：chapter 9 さまざまなクラス機構

[https://forms.gle/t9ECjpvhKKYucqzH8](https://forms.gle/t9ECjpvhKKYucqzH8)

## 練習問題1

次の仕様に基づきItemクラスを作成してください。
提供コードのMain.javaをItem.javaと同じフォルダ内に保存して動作確認し、実行結果が得られることを確認してください。

**仕様**

- 次のメンバ変数を作成する
    - 商品名を表すnameをString型で宣言する
    - 価格を表すpriceをint型で宣言する
- コンストラクタを作成する
    - 引数：
        - name:String型
        - price:int型
    - 処理内容：引数で与えられた値を、同名のメンバ変数に代入する。
- displayメソッドを作成する
    - 引数：なし
    - 戻り値：なし
    - 処理内容：インスタンスの内容を表示する。実行結果を参考にして作成。

**提供コード**

```java
public class Main{
    public static void main(String[] args){
        Item i1 = new Item("コーヒー", 120);
        Item i2 = new Item("オレンジジュース", 150);

        i1.display();
        i2.display();
    }
}
```

**実行結果**

```java
コーヒー:120円
オレンジジュース:150円
```

## 練習問題2

次の仕様に基づきShopクラスを作成してください。
提供コードのMain.javaをShop.javaと同じフォルダ内に保存して動作確認し、実行結果が得られることを確認してください。

**仕様**

- メンバ変数を作成する
    - 店名を表すnameをString型で宣言する
    - 売上高を表すsalesをint型で宣言する
- コンストラクタ①を作成する
    - 引数：
        - name:String型
        - sales:int型
    - 処理内容：引数で与えられた値を、同名のメンバ変数に代入する。
- コンストラクタ②を作成する（２つ目）
    - 引数：なし
    - 処理内容：コンストラクタ①を呼び出す。第１引数には`"出店予定"`の文字列を渡し、第２引数には`0`を渡す。
- displayメソッドを作成する
    - 引数：なし
    - 戻り値：なし
    - 処理内容：インスタンスの内容を表示する。実行結果を参考にして作成。

提**供コード**

```java
public class Main {
    public static void main(String[] args) {
        Shop s1 = new Shop("A町店", 150000);
        Shop s2 = new Shop("B公園前店", 180000);
        Shop s3 = new Shop();

        s1.display();
        s2.display();
        s3.display();
    }
}
```

**実行結果**

```java
A町店:売上高 150000円
B公園前店:売上高 180000円
出店予定:売上高 0円
```
