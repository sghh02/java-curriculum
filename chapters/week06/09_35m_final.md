# Week 6 final（変えられないことを示す）

前回は `equals` を書き直しました。今回は `final` です。付けると、あとから変えられなくなります。

現場でいちばんよく見るのは定数です。税率や上限値など、動かしたくない値に付けます。名前を見ただけで「ここは変わらない」と分かるのが利点です。

## まず押さえること

変数に付けると、値を1度だけ入れられます。

```
final int count = 3;
count = 5;   // エラー
```

`static final` にすると、クラス全体で1つの定数になります。名前は大文字とアンダースコアで書く決まりがあります。

```
static final int MAX = 100;
```

大事な注意が1つあります。実体を入れた変数に `final` を付けても、中身までは固定されません。

```
final Holder holder = new Holder();
holder.value = 50;      // これはできる
holder = new Holder();  // これはエラー
```

固定されるのは「どの実体を指すか」です。指した先の中身は変えられます。Week 5 の値渡しで見た札の話と同じ考え方です。

## ステップ1: 予測写経

次のお手本を1行ずつ写します。写す前に「この行は何をするか」を予測します。写し終えたら実行し、予測と合っているか確かめます。

保存先は `src/main/java/com/example/week06/09_35m_final/FinalDemo.java` です。

```java
public class FinalDemo {
    static final int MAX = 100;

    public static void main(String[] args) {
        System.out.println("上限: " + MAX);

        final int count = 3;
        System.out.println("回数: " + count);

        final Holder holder = new Holder();
        holder.value = 50;
        System.out.println("中身は変えられる: " + holder.value);
    }
}

class Holder {
    int value = 1;
}
```

実行は `java src/main/java/com/example/week06/09_35m_final/FinalDemo.java` です。

写しながら、次を自分に問いかけてください。

- `MAX` が大文字なのはなぜか
- `count = 5;` と書き足すとどうなるか
- `holder.value = 50;` が通るのはなぜか
- `holder = new Holder();` と書き足すとどうなるか

## ステップ2: 暗写（設計メモから組み立てる）

お手本のコードは閉じます。次の設計メモだけを手がかりに、`FinalDemo` を書きます。丸暗記ではなく、設計をコードへ起こす練習です。書けたら実行し、同じ出力になるか確かめます。

- 実行用クラス `FinalDemo`
- `static final int MAX` … 100 を入れる。クラスの直下に置く
- クラス `Holder` … `int value` を1つ持ち、1 で初期化する
- main の1つめ … `上限: ◯` の形で MAX を表示
- main の2つめ … `final int count` に 3 を入れ、`回数: ◯` の形で表示
- main の3つめ … `final Holder holder` に新しい `Holder` を入れる
- そのフィールドへ 50 を代入する
- holder のフィールドを `中身は変えられる: ◯` の形で表示

## ステップ3: 自力

新しいファイル `src/main/java/com/example/week06/09_35m_final/ConstDemo.java` を作ります。これまでのファイルは直しません。

テーマは「税率と在庫」です。次のとおり書いてください。

- 実行用クラスは `ConstDemo` にする
- `static final double TAX` を作り、1.1 を入れる。クラスの直下に置く
- クラス `Store` を作る。`int stock` を1つ持ち、5 で初期化する
- main で `税率: ◯` の形で TAX を表示する
- `final String name` に `coffee` を入れ、`商品: ◯` の形で表示する
- `final Store store` に新しい `Store` を入れる
- そのフィールドへ 20 を代入する
- store のフィールドを `在庫は変えられる: ◯` の形で表示する

ヒント: 定数の名前は大文字にします。`TAX` のようにします。

書けたら回答を `submissions/week06/09_35m_final.md` に貼り、「レビューして」と言ってください。

今回のポイントは2つです。`final` は再代入を止めること。実体の中身までは止めないこと。

（予測: `final` を付けた変数へもう一度代入すると、いつエラーになるでしょうか）
