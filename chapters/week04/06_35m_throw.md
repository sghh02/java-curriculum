# Week 4 例外処理その2（自分から例外を投げる）

前回は、起きた例外を受け止める側を書きました。今回は投げる側です。Java が投げてくれるのを待つのではなく、自分で「これはおかしい」と判断して投げます。

マイナスの年齢、100点を超えた点数、空の名前。こうした値は、そのまま先へ進めるより、その場で止めたほうが安全です。あとになってから原因を探すのは大変だからです。

## まず押さえること

例外は `throw` で発生させます。

```
throw new IllegalArgumentException("メッセージ");
```

`new` の形に注目してください。Week 4 で書いた `new HashMap<>()` と同じ書き方です。例外も `new` で作って投げます。丸かっこへ渡した文字列が、受け取る側の `e.getMessage()` で取れます。

`IllegalArgumentException` は「引数がおかしい」という意味の例外です。渡された値が想定と違うときに使います。標準で用意されているので、自分で作る必要はありません。

大事な決まりが1つあります。`throw` した時点で、そのメソッドは終わります。下の行へは進みません。

```
if (age < 0) {
    throw new IllegalArgumentException("年齢がマイナスです");
}
System.out.println("ここは正常なときだけ通る");
```

`throw` のあとに `else` を書く必要はありません。マイナスなら投げて抜けるので、その下は正常な場合しか通らないからです。

## ステップ1: 予測写経

次のお手本を1行ずつ写します。写す前に「この行は何をするか」を予測します。写し終えたら実行し、予測と合っているか確かめます。

保存先は `src/main/java/com/example/week04/06_35m_throw/AgeCheckDemo.java` です。

```java
public class AgeCheckDemo {
    public static void main(String[] args) {
        try {
            checkAge(20);
            checkAge(-5);
        } catch (IllegalArgumentException e) {
            System.out.println("入力が不正です: " + e.getMessage());
        }

        System.out.println("最後まで動きました");
    }

    static void checkAge(int age) {
        if (age < 0) {
            throw new IllegalArgumentException("年齢がマイナスです");
        }
        System.out.println("年齢は " + age + " 歳です");
    }
}
```

実行は `java src/main/java/com/example/week04/06_35m_throw/AgeCheckDemo.java` です。

写しながら、次を自分に問いかけてください。

- `checkAge(20)` と `checkAge(-5)` は、どちらも実行されるか
- `e.getMessage()` に出るのは、誰が書いた文字列か
- `checkAge` に `else` がないのはなぜか
- `checkAge(0)` を渡したら、投げられるか
- try をまるごと外したら、プログラムはどうなるか

## ステップ2: 暗写（設計メモから組み立てる）

お手本のコードは閉じます。次の設計メモだけを手がかりに、`AgeCheckDemo` を書きます。丸暗記ではなく、設計をコードへ起こす練習です。書けたら実行し、同じ出力になるか確かめます。

- 実行用クラス `AgeCheckDemo`
  - `checkAge(int age)` … age がマイナスなら `IllegalArgumentException` を投げる。マイナスでなければ `年齢は ◯ 歳です` を表示する。戻り値なし
  - main の流れ
    - try で `checkAge(20)` と `checkAge(-5)` を続けて呼ぶ
    - catch で `IllegalArgumentException` を受け、`入力が不正です: 理由` を表示
    - 最後に `最後まで動きました` を表示

## ステップ3: 自力

新しいファイル `src/main/java/com/example/week04/06_35m_throw/ScoreCheckDemo.java` を作ります。これまでのファイルは直しません。

テーマは「点数の検査」です。次のとおり書いてください。

- クラス名は `ScoreCheckDemo` にする
- static メソッド `checkScore(int score)` を作る
- score が0未満、または100より大きければ `IllegalArgumentException` を投げる
- メッセージには不正だった値も入れる。例 `範囲外です: 120`
- 範囲内なら `点数: ◯点` を表示する
- main では try の中で `checkScore` を2回呼ぶ。1回目は正常な点数、2回目は範囲外の点数
- catch で受け、`点数が不正です: 理由` を表示する
- 最後に `採点を終わります` を表示する

ヒント: 2つの条件を「または」でつなぐには Week 3 の `||` を使います。メッセージに値を入れるには、文字列と数値を `+` でつなぎます。

書けたら回答を `submissions/week04/06_35m_throw.md` に貼り、「レビューして」と言ってください。

今回のポイントは3つです。`throw` で自分から投げられること。`new` で例外を作ること。`throw` した時点でメソッドを抜けること。3つ目のおかげで `else` が要りません。

（予測: お手本は `checkAge(20)` を先に呼びます。「年齢は 20 歳です」は表示されるでしょうか）
