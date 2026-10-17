# Week 5 static（インスタンスごとではなく全体で1つ）

前回まででクラスの基本を終えました。フィールドは実体ごとに別々の値を持ちます。今回は「全体で1つだけ持つ」書き方です。`static` を付けます。

`main` にずっと付いていた `static` の正体でもあります。ここで回収します。現場では定数と共通の道具に使います。

## まず押さえること

これまでのフィールドは、実体ごとに別々でした。

```
class Visitor {
    String name;   // 実体ごとに違う
}
```

`static` を付けると、実体ではなくクラスに1つだけ置かれます。

```
class Visitor {
    static int count;   // 全体で1つ
}
```

何人作っても count は1つです。だから人数を数えるのに使えます。

メソッドにも付けられます。`static` メソッドは実体を作らずに呼べます。

```
Visitor.getCount()   // クラス名から呼ぶ
a.getName()          // 実体から呼ぶ
```

`main` に `static` が付いているのは、実体を作る前に呼ぶ必要があるからです。プログラムの入り口なので、誰も `new` していない時点で動きます。

注意が1つあります。`static` メソッドの中では、実体ごとのフィールドを直接さわれません。どの実体の話なのか決まらないからです。

## ステップ1: 予測写経

次のお手本を1行ずつ写します。写す前に「この行は何をするか」を予測します。写し終えたら実行し、予測と合っているか確かめます。

保存先は `src/main/java/com/example/week05/05_40m_staticフィールドとstaticメソッド/StaticDemo.java` です。

```java
public class StaticDemo {
    public static void main(String[] args) {
        System.out.println("最初の人数: " + Visitor.getCount());

        Visitor a = new Visitor("佐藤");
        Visitor b = new Visitor("鈴木");
        System.out.println(a.getName() + " と " + b.getName());

        System.out.println("いまの人数: " + Visitor.getCount());
    }
}

class Visitor {
    private static int count = 0;
    private String name;

    Visitor(String name) {
        this.name = name;
        count++;
    }

    static int getCount() {
        return count;
    }

    String getName() {
        return name;
    }
}
```

実行は `java src/main/java/com/example/week05/05_40m_staticフィールドとstaticメソッド/StaticDemo.java` です。

写しながら、次を自分に問いかけてください。

- 1つも作っていない時点の `getCount()` はいくつを返すか
- `count++` はどの実体の count を増やしているか
- `Visitor.getCount()` と `a.getName()` の呼び方の違いはどこか
- `getCount()` の中で `name` を使えるか

## ステップ2: 暗写（設計メモから組み立てる）

お手本のコードは閉じます。次の設計メモだけを手がかりに、`StaticDemo` を書きます。丸暗記ではなく、設計をコードへ起こす練習です。書けたら実行し、同じ出力になるか確かめます。

- 実行用クラス `StaticDemo`
- クラス `Visitor` … 来場者を表す
- `private static int count` … 全体で1つの人数。0 で初期化する
- `private String name` … 実体ごとの名前
- コンストラクタ … 名前を受け取って name へ入れ、count を1増やす
- `static int getCount()` … count を返す
- `String getName()` … name を返す
- main の1つめ … 作る前の人数を `最初の人数: ◯` の形で表示
- main の2つめ … `Visitor a` と `Visitor b` を作る。名前は `佐藤` と `鈴木`。2つの名前を ` と ` でつないで表示
- main の3つめ … 作ったあとの人数を `いまの人数: ◯` の形で表示

## ステップ3: 自力

新しいファイル `src/main/java/com/example/week05/05_40m_staticフィールドとstaticメソッド/IdIssuer.java` を作ります。これまでのファイルは直しません。

テーマは「連番の発行」です。次のとおり書いてください。

- 実行用クラスは `IdIssuer` にする
- クラス `Numbering` を作る。1件ごとに番号を持たせる
- `private static int lastId` … 最後に発行した番号。0 で初期化する
- `private int id` … その実体の番号
- コンストラクタ … lastId を1増やし、その値を id へ入れる
- `static int getLastId()` … lastId を返す
- `int getId()` … id を返す
- main で、作る前の lastId を `最初の番号: ◯` の形で表示する
- 変数 `first` と `second` に、それぞれ `Numbering` のインスタンスを代入する
- 作り方はステップ1の `Visitor a = new Visitor("佐藤");` と同じ形
- それぞれの id を ` と ` でつないで表示する
- 作ったあとの lastId を `いまの番号: ◯` の形で表示する

ヒント: 実行用クラスを先に書き、`Numbering` はそのうしろに書きます。

書けたら回答を `submissions/week05/05_40m_staticフィールドとstaticメソッド.md` に貼り、「レビューして」と言ってください。

今回のポイントは2つです。`static` は実体ごとではなく全体で1つになること。`static` メソッドはクラス名から呼べること。

（予測: `Visitor` を2つ作ったあと、`getCount()` はいくつを返すでしょうか）
