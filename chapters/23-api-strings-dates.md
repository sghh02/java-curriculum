# 文字列と日付の扱い


## 課題：chapter 15 文字列と日付の扱い

[https://forms.gle/8Vo7bxvs997sbroG7](https://forms.gle/8Vo7bxvs997sbroG7)

## 練習問題1

コマンドライン引数にファイル名を与えると、 その拡張子を取り出すプログラムを作成してください。
 拡張子とは、ファイル名が「cmd.exe」であれば「exe」である。 java.sun.exe のように「.」が2つ以上ある場合もあるので、 拡張子は、最後の「.」の直後から末尾までの文字列、 と定義することができる。
main メソッドのあるクラスのクラス名は ExtensionExtractor とする。

## 練習問題2

現在の日付を取得して、取得した日付から1年後の日付を以下と表示できるプログラムを作成してください。

```java
西暦〇〇〇〇年 〇〇月 〇〇日
```

## 練習問題3

以下の顧客リストを、名前、メールアドレス、郵便番号住所に分割して別のメソッドに分けてください。
※Stringクラスのメソッドを使用すること

```java
List<String> customerList = new ArrayList<>(Arrays.asList("西川 貴浩,xxxx@gmail.com,041-0604,北海道函館市元村町", "浅井 唯,xxxx@yahoo.co.jp,144-0034,東京都大田区西糀谷", "浜口 英則,yyyy@gmail.com,880-0879,宮崎県宮崎市宮崎駅東"));List<String> customerList = new ArrayList<>(Arrays.asList("鈴木 明人,xxxx@gmail.com,041-0604,北海道函館市元村町", "浅井 流々,xxxx@yahoo.co.jp,144-0034,東京都大田区西糀谷", "浜口 英俊,yyyy@gmail.com,880-0879,宮崎県宮崎市宮崎駅東"));
```
