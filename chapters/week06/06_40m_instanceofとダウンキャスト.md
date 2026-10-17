# Week 6 instanceof（実体の型を調べる）

ポリモーフィズムでは、親の型で受けて子の実体を動かしました。ただし親の型で受けると、子だけが持つメソッドは呼べません。今回はその場面の道具です。

`instanceof` で実体の型を調べ、子の型として扱い直します。ダウンキャストと呼びます。現場では既存コードを読むときに出てきます。

## まず押さえること

親の型で受けた変数からは、親が持つものしか呼べません。

```
Animal a = new Rabbit();
a.hop();   // Animal に hop がなければエラー
```

実体が `Rabbit` かどうかは `instanceof` で調べられます。答えは true か false です。

```
if (animal instanceof Rabbit) { ... }
```

調べたあと、`Rabbit` として使い直す書き方があります。丸かっこで型名を書くダウンキャストです。

```
Rabbit rabbit = (Rabbit) animal;
```

いまは短く書けます。`instanceof` のうしろに変数名を足す形です。

```
if (animal instanceof Rabbit rabbit) {
    rabbit.hop();
}
```

判定が true のときだけ、`rabbit` が使えます。この書き方なら、キャストの失敗が起きません。

なお `instanceof` を多用する設計はよくありません。型で分けたい処理は、オーバーライドで書けることが多いからです。読むための知識として押さえてください。

## ステップ1: 予測写経

次のお手本を1行ずつ写します。写す前に「この行は何をするか」を予測します。写し終えたら実行し、予測と合っているか確かめます。

保存先は `src/main/java/com/example/week06/06_40m_instanceofとダウンキャスト/InstanceofDemo.java` です。

```java
public class InstanceofDemo {
    public static void main(String[] args) {
        Animal a = new Rabbit();
        Animal b = new Turtle();
        check(a);
        check(b);
    }

    static void check(Animal animal) {
        System.out.println("うさぎかどうか: " + (animal instanceof Rabbit));
        if (animal instanceof Rabbit rabbit) {
            System.out.println("跳べる: " + rabbit.hop());
        } else {
            System.out.println("跳べない");
        }
    }
}

class Animal {
}

class Rabbit extends Animal {
    String hop() {
        return "ぴょん";
    }
}

class Turtle extends Animal {
}
```

実行は `java src/main/java/com/example/week06/06_40m_instanceofとダウンキャスト/InstanceofDemo.java` です。

`Animal` と `Turtle` は空です。今回は型の判定が主役なので、中身を最小にしています。

写しながら、次を自分に問いかけてください。

- `check(a)` のとき、`animal instanceof Rabbit` は true と false のどちらか
- `animal.hop()` と直接書けない理由はどこにあるか
- `if` の中の `rabbit` は、どこで用意された変数か
- `check(b)` では、`rabbit` を使えるか

## ステップ2: 暗写（設計メモから組み立てる）

お手本のコードは閉じます。次の設計メモだけを手がかりに、`InstanceofDemo` を書きます。丸暗記ではなく、設計をコードへ起こす練習です。書けたら実行し、同じ出力になるか確かめます。

- 実行用クラス `InstanceofDemo`
- クラス `Animal` … 中身なし
- クラス `Rabbit` … `Animal` を継承。`String hop()` が `ぴょん` を返す
- クラス `Turtle` … `Animal` を継承。中身なし
- `check` … `Animal` を受け取る `static` メソッド。戻り値なし
- check の1行め … `うさぎかどうか: ◯` の形で `instanceof` の結果を表示。丸かっこで囲む
- check の分岐 … `instanceof` のうしろに変数名を足す形で判定する
- true のとき … `跳べる: ◯` の形で hop の結果を表示
- false のとき … `跳べない` を表示
- main … `Animal` 型の変数へ `Rabbit` と `Turtle` を入れ、それぞれ check へ渡す

## ステップ3: 自力

新しいファイル `src/main/java/com/example/week06/06_40m_instanceofとダウンキャスト/ShapeCheck.java` を作ります。これまでのファイルは直しません。

テーマは「図形の判定」です。次のとおり書いてください。

- 実行用クラスは `ShapeCheck` にする
- クラス `Figure` を作る。中身なし
- クラス `Ball` を作る。`Figure` を継承し、`String roll()` で `ころころ` を返す
- クラス `Cube` を作る。`Figure` を継承し、中身なし
- `check` という `static` メソッドを作る。`Figure` を受け取る
- `ボールかどうか: ◯` の形で `instanceof` の結果を表示する
- `Ball` だったら `転がる: ◯` の形で roll の結果を表示する
- そうでなければ `転がらない` と表示する
- main で `Figure` 型の変数へ `Ball` と `Cube` を入れ、それぞれ check へ渡す

ヒント: 判定と変数の用意を1行でまとめられます。

書けたら回答を `submissions/week06/06_40m_instanceofとダウンキャスト.md` に貼り、「レビューして」と言ってください。

今回のポイントは2つです。`instanceof` は実体の型を調べること。判定と同時に変数を用意できること。

（予測: `check(b)` のとき、`else` のほうへ進むでしょうか）
