# Week 6 toString（実体を文字列で表す）

前回は実体の型を調べました。今回はすべてのクラスが持つメソッドの話です。Java のクラスは、書かなくても `Object` を継承しています。`toString` はそこにあるメソッドです。

オーバーライドすると、実体を分かりやすく表示できます。現場ではログとデバッグで効いてきます。中身の見えないオブジェクトほど、原因を追うのが大変になるからです。

## まず押さえること

`System.out.println(オブジェクト)` と書くと、Java は `toString()` を呼びます。`+` で文字列につないだときも同じです。

何も書かないと、`Object` の `toString` が使われます。出るのは次のような文字列です。

```
Plain@41ee392b
```

クラス名とアットマーク、そのうしろの英数字です。中身が分かりません。

自分のクラスで書き直せます。

```
@Override
public String toString() {
    return "Coupon{" + name + "}";
}
```

`@Override` は、親のメソッドを書き直す印です。付けると、名前を間違えたときにコンパイラが教えてくれます。

`toString` の形は決まっています。`public String toString()` です。引数はありません。ここを変えるとオーバーライドになりません。

## ステップ1: 予測写経

次のお手本を1行ずつ写します。写す前に「この行は何をするか」を予測します。写し終えたら実行し、予測と合っているか確かめます。

保存先は `src/main/java/com/example/week06/07_40m_ObjectのtoStringをオーバーライドする/ToStringDemo.java` です。

```java
public class ToStringDemo {
    public static void main(String[] args) {
        Coupon c = new Coupon("送料無料", 500);
        System.out.println(c);
        System.out.println("文字列にする: " + c);

        Plain p = new Plain();
        System.out.println(p);
    }
}

class Coupon {
    private String name;
    private int amount;

    Coupon(String name, int amount) {
        this.name = name;
        this.amount = amount;
    }

    @Override
    public String toString() {
        return "Coupon{" + name + ", " + amount + "円}";
    }
}

class Plain {
}
```

実行は `java src/main/java/com/example/week06/07_40m_ObjectのtoStringをオーバーライドする/ToStringDemo.java` です。

写しながら、次を自分に問いかけてください。

- `println(c)` は何を表示するか。`toString()` と書いていないのに呼ばれるか
- `"文字列にする: " + c` の結果は、1つめと同じになるか
- `println(p)` は何を表示するか
- `Plain` は何も継承していないのに `toString` を持っているか

## ステップ2: 暗写（設計メモから組み立てる）

お手本のコードは閉じます。次の設計メモだけを手がかりに、`ToStringDemo` を書きます。丸暗記ではなく、設計をコードへ起こす練習です。書けたら実行し、同じ出力になるか確かめます。

- 実行用クラス `ToStringDemo`
- クラス `Coupon` … `private String name` と `private int amount` を持つ
- コンストラクタ … 名前と金額を受け取り、それぞれのフィールドへ入れる
- `toString` … `@Override` を付ける。`public String toString()` の形
- 戻り値は `Coupon{《名前》, 《金額》円}` の形にする（`{` `,` `円` `}` はそのまま書く記号。`《 》` の部分だけ、実際のフィールドの値に置き換える）
- クラス `Plain` … 中身なし
- main の1つめ … `Coupon c` を作る。名前は `送料無料`、金額は 500。文字列と `+` でつながず、`c` だけを `println` に渡して表示する
- main の2つめ … 同じ c を `文字列にする: ◯` の形で、`+` でつないで表示
- main の3つめ … `Plain p` を作り、そのまま表示

## ステップ3: 自力

新しいファイル `src/main/java/com/example/week06/07_40m_ObjectのtoStringをオーバーライドする/MemberPrint.java` を作ります。これまでのファイルは直しません。

テーマは「会員の表示」です。次のとおり書いてください。

- 実行用クラスは `MemberPrint` にする
- クラス `Member` を作る。`private String name` と `private int age` を持つ
- コンストラクタで名前と年齢を受け取る
- `toString` をオーバーライドし、`Member{名前, 年齢歳}` の形の文字列を返す
- `@Override` を付ける
- クラス `Blank` を作る。中身なし
- main で `Member m` を作る。名前は `佐藤`、年齢は 28
- m をそのまま表示する
- 同じ m を `文字列にする: ◯` の形で、`+` でつないで表示する
- `Blank b` を作り、そのまま表示する

ヒント: `toString` の戻り値は `String` です。`@Override` を付けておくと、書き間違えたときに気づけます。

書けたら回答を `submissions/week06/07_40m_ObjectのtoStringをオーバーライドする.md` に貼り、「レビューして」と言ってください。

今回のポイントは2つです。表示のときに `toString` が自動で呼ばれること。書かないとクラス名と英数字だけが出ること。

（予測: `Blank` を表示すると、何が出るでしょうか）
