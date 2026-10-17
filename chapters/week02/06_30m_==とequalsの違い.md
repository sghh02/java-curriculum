# Week 2 文字列その2（`==` と equals の違い）

前回は `String` の道具を使いました。今回は文字列どうしの比べ方です。`==` で比べると、見た目どおりの答えにならないことがあります。ここは Java の入り口でつまずきやすい場所です。

## まず押さえること

比べ方は2つあります。

```
String a = "Java";
String b = "Java";
a == b        // 入れ物が同じかを調べる
a.equals(b)   // 中身が同じかを調べる
```

`int` の数値は `==` で比べられます。文字列は事情が違います。文字列の変数が持っているのは、文字そのものではありません。文字の置き場所を指す札です。

そのため、中身がまったく同じでも、置き場所が別なら `==` は false を返します。この落とし穴を避けるために、文字列の比較では `equals` を使います。

大文字と小文字を区別したくないときは `equalsIgnoreCase` があります。`Java` と `JAVA` を同じものとして扱えます。

## ステップ1: 予測写経

次のお手本を1行ずつ写します。写す前に「この行は何をするか」を予測します。写し終えたら実行し、予測と合っているか確かめます。

保存先は `src/main/java/com/example/week02/06_30m_==とequalsの違い/EqualsDemo.java` です。

```java
public class EqualsDemo {
    public static void main(String[] args) {
        String a = "Java";
        String b = "Java";
        System.out.println("a == b: " + (a == b));
        System.out.println("a.equals(b): " + a.equals(b));

        String head = "Ja";
        String c = head + "va";
        System.out.println("c: " + c);
        System.out.println("a == c: " + (a == c));
        System.out.println("a.equals(c): " + a.equals(c));

        String upper = "JAVA";
        System.out.println("a.equals(upper): " + a.equals(upper));
        System.out.println("大小を無視: " + a.equalsIgnoreCase(upper));
    }
}
```

実行は `java src/main/java/com/example/week02/06_30m_==とequalsの違い/EqualsDemo.java` です。

`a == b` を丸かっこで囲んでいるのは、先に比較をさせるためです。囲まないと `+` のほうが先に働いて、思ったとおりに動きません。

写しながら、次を自分に問いかけてください。

- `a == b` の答え
- `c` の中身。`a` と同じ文字列になるかどうか
- `a == c` の答え。`a == b` と同じになるかどうか
- `a.equals(upper)` の答え。`equalsIgnoreCase` との違い

## ステップ2: 暗写（設計メモから組み立てる）

お手本のコードは閉じます。次の設計メモだけを手がかりに、`EqualsDemo` を書きます。丸暗記ではなく、設計をコードへ起こす練習です。書けたら実行し、同じ出力になるか確かめます。

- 実行用クラス `EqualsDemo`
- `String a` … `Java` を直接書いて入れる
- `String b` … 同じく `Java` を直接書いて入れる
- `a == b:` と `a.equals(b):` の結果を1行ずつ表示
- `String head` … `Ja` を入れる
- `String c` … head と `va` をつないだ結果を受け取る
- `c:` … c の中身を表示
- `a == c:` と `a.equals(c):` の結果を1行ずつ表示
- `String upper` … `JAVA` を入れる
- `a.equals(upper):` と `大小を無視:` の結果を1行ずつ表示

## ステップ3: 自力

新しいファイル `src/main/java/com/example/week02/06_30m_==とequalsの違い/PasswordCheck.java` を作ります。これまでのファイルは直しません。

テーマは「合言葉の照合」です。次のとおり書いてください。

- クラス名は `PasswordCheck` にする
- 正しい合言葉として `sakura` を変数へ入れる
- `saku` を入れた変数を用意し、そこへ `ra` をつないだ結果を別の変数で受け取る
- つないだ結果を `入力: ◯` の形で表示する
- `==` で比べた結果を `== の結果: ◯` の形で表示する
- `equals` で比べた結果を `equals の結果: ◯` の形で表示する
- `SAKURA` を変数へ入れ、`equals` で比べた結果を `大文字と比べる: ◯` の形で表示する
- 同じ相手を `equalsIgnoreCase` で比べ、`大小を無視: ◯` の形で表示する

ヒント: `==` を `+` の右に書くときは、丸かっこで囲みます。

書けたら回答を `submissions/week02/06_30m_==とequalsの違い.md` に貼り、「レビューして」と言ってください。

今回のポイントは2つです。文字列の比較には `equals` を使うこと。`==` が見ているのは中身ではなく置き場所だということ。

（予測: `a == b` と `a == c` は、同じ結果になるでしょうか）
