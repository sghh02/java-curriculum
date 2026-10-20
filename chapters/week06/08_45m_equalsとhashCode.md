# Week 6 equals と hashCode（中身が同じかを決める）

前回は `toString` を書き直しました。今回は `equals` です。これも `Object` から受け継ぐメソッドです。

Week 2 で、文字列の比較には `equals` を使うと学びました。自分で作ったクラスでも同じです。ただし書き直さないと、`==` と同じ動きになります。中身が同じでも別物と判定されます。

## まず押さえること

何も書かないと、`Object` の `equals` が使われます。中身は「同じ実体かどうか」の判定です。`==` と変わりません。

中身で比べたいときは書き直します。形は決まっています。

```
@Override
public boolean equals(Object o) {
    if (!(o instanceof Code other)) {
        return false;
    }
    return value == other.value;
}
```

引数の型は `Object` です。ここを自分のクラス名にすると、オーバーライドになりません。だから最初に型を調べます。前回の `instanceof` がここで効いてきます。

もう1つ決まりがあります。`equals` を書き直したら `hashCode` も書き直します。

```
@Override
public int hashCode() {
    return value;
}
```

`hashCode` は実体を数値で表したものです。`HashMap` のキーはこの値で置き場所を決めます。等しい2つが違う数値を返すと、`HashMap` が正しく動きません。だから対で書き直します。

## ステップ1: 予測写経

次のお手本を1行ずつ写します。写す前に「この行は何をするか」を予測します。写し終えたら実行し、予測と合っているか確かめます。

保存先は `src/main/java/com/example/week06/08_45m_equalsとhashCode/EqualsFieldDemo.java` です。

```java
public class EqualsFieldDemo {
    public static void main(String[] args) {
        Code a = new Code(100);
        Code b = new Code(100);
        System.out.println("==: " + (a == b) + " / equals: " + a.equals(b));
        System.out.println("hashCode がそろう: " + (a.hashCode() == b.hashCode()));
    }
}

class Code {
    private int value;

    Code(int value) {
        this.value = value;
    }

    @Override
    public boolean equals(Object o) {
        if (!(o instanceof Code other)) {
            return false;
        }
        return value == other.value;
    }

    @Override
    public int hashCode() {
        return value;
    }
}
```

実行は `java src/main/java/com/example/week06/08_45m_equalsとhashCode/EqualsFieldDemo.java` です。

写しながら、次を自分に問いかけてください。

- `a == b` の答えはどちらか。同じ 100 を渡しているのに
- `a.equals(b)` の答えはどちらか
- `equals` の引数が `Object` なのはなぜか
- `other.value` を読めるのはなぜか。`private` なのに

## ステップ2: 暗写（設計メモから組み立てる）

お手本のコードは閉じます。次の設計メモだけを手がかりに、`EqualsFieldDemo` を書きます。丸暗記ではなく、設計をコードへ起こす練習です。書けたら実行し、同じ出力になるか確かめます。

- 実行用クラス `EqualsFieldDemo`
- クラス `Code` … `private int value` を1つ持つ
- コンストラクタ … `int` の value を受け取り、フィールドへ入れる
- `equals` … `@Override` を付ける。`public boolean equals(Object o)` の形
- 中身は、`instanceof` で `Code` か調べる。パターン変数は `other`。違えば false を返す
- 同じなら value どうしを比べた結果を返す
- `hashCode` … `@Override` を付ける。value をそのまま返す
- main … 同じ 100 を渡して `Code a` と `Code b` を作る
- main の1行め … `a == b` と `a.equals(b)` の結果を1回の `println` で表示する。形は `==: false / equals: true`。`◯` の位置には `true` か `false` が入る
- main の2行め … `a.hashCode() == b.hashCode()` の結果を表示する。形は `hashCode がそろう: true`

## ステップ3: 自力

新しいファイル `src/main/java/com/example/week06/08_45m_equalsとhashCode/UserEquals.java` を作ります。これまでのファイルは直しません。

テーマは「会員 ID の照合」です。次のとおり書いてください。

- 実行用クラスは `UserEquals` にする
- クラス `UserCode` を作る。`private String id` を1つ持つ
- コンストラクタで `String` の id を受け取り、フィールドへ入れる
- `equals` をオーバーライドする。引数は `Object o` にする
- `instanceof` で `UserCode` か調べる。パターン変数は `other`。違えば false を返す
- 同じなら id どうしを比べた結果を返す
- `hashCode` をオーバーライドし、id の `hashCode()` をそのまま返す
- main で、同じ `"u01"` を渡して `UserCode a` と `UserCode b` を作る
- 1行め … `a == b` と `a.equals(b)` の結果を1回の `println` で表示する。形は `==: false / equals: true`。`◯` の位置には `true` か `false` が入る
- 2行め … `a.hashCode() == b.hashCode()` の結果を表示する。形は `hashCode がそろう: true`

ヒント: id は `String` です。中身を比べるので `==` は使いません。

書けたら回答を `submissions/week06/08_45m_equalsとhashCode.md` に貼り、「レビューして」と言ってください。

今回のポイントは2つです。中身で比べたいなら `equals` を書き直すこと。`equals` と `hashCode` は対で書き直すこと。

（予測: `hashCode` を書き直さないと、2つの値はそろうでしょうか）
