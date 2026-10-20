# Week 2 StringBuilder（書き換えられる文字列）

前回は `==` と `equals` の違いを見ました。今回は文字列を組み立てる道具です。`String` は一度作ると中身が変わりません。何度も足していく場面では、別の入れ物のほうが向いています。テキストブロックは次回にまわします。

## まず押さえること

`String` の道具は、加工した結果を新しい文字列として返しました。`trim()` を呼んでも、もとの変数は変わりませんでした。`+` でつないだときも、そのたびに新しい文字列ができます。

`StringBuilder` は違います。中身を書き換えられる入れ物です。

```
StringBuilder sb = new StringBuilder("Java");
sb.append("!");       // うしろに足す
sb.insert(0, ">> ");  // 位置を決めて差し込む
sb.toString()         // String に戻す
```

`new` は「新しく作る」という合図です。中身のしくみは Week 5 で学びます。今は決まり文句として書いてください。

大事なのは、`append` が sb 自身を書き換える点です。`String` の道具と違い、結果を別の変数で受け取る必要はありません。

## ステップ1: 予測写経

次のお手本を1行ずつ写します。写す前に「この行は何をするか」を予測します。写し終えたら実行し、予測と合っているか確かめます。

保存先は `src/main/java/com/example/week02/07_30m_StringBuilder/BuilderDemo.java` です。

```java
public class BuilderDemo {
    public static void main(String[] args) {
        StringBuilder sb = new StringBuilder("Java");
        System.out.println("最初: " + sb);
        System.out.println("長さ: " + sb.length());

        sb.append(" is fun");
        sb.append("!");
        System.out.println("足したあと: " + sb);
        System.out.println("長さ: " + sb.length());

        sb.insert(0, ">> ");
        System.out.println("差し込んだあと: " + sb);
        String result = sb.toString();
        System.out.println("String に戻す: " + result);
    }
}
```

実行は `java src/main/java/com/example/week02/07_30m_StringBuilder/BuilderDemo.java` です。

写しながら、次を自分に問いかけてください。

- 最初の `長さ` はいくつか
- `append` を2回呼んだあとの `長さ` はいくつか。空白も数に入るか
- `insert(0, ">> ")` の 0 が指す場所はどこか
- sb をそのまま `println` へ渡すと、何が表示されるか

## ステップ2: 暗写（設計メモから組み立てる）

お手本のコードは閉じます。次の設計メモだけを手がかりに、`BuilderDemo` を書きます。丸暗記ではなく、設計をコードへ起こす練習です。書けたら実行し、同じ出力になるか確かめます。

- 実行用クラス `BuilderDemo`
- `StringBuilder sb` … `Java` を入れて作る
- `最初: ◯` … sb の中身を表示
- `長さ: ◯` … `length()` の結果を表示
- `append` で ` is fun` を足す。先頭の空白を忘れない
- 続けて `append` で `!` を足す
- `足したあと: ◯` と `長さ: ◯` を1行ずつ表示
- `insert` で先頭へ `>> ` を差し込む
- `差し込んだあと: ◯` を表示
- `String result` … `toString()` の結果を受け取り、`String に戻す: ◯` の形で表示

## ステップ3: 自力

新しいファイル `src/main/java/com/example/week02/07_30m_StringBuilder/MenuBuilder.java` を作ります。これまでのファイルは直しません。

テーマは「メニュー1行の組み立て」です。次のとおり書いてください。

- クラス名は `MenuBuilder` にする
- `coffee` を入れて `StringBuilder` を作る
- 中身を `最初: ◯` の形で表示する
- 長さを `長さ: ◯` の形で表示する
- うしろへ ` 400yen` を足す。先頭に空白を入れる
- 足したあとの中身と長さを、同じラベルの形で表示する
- 先頭へ `1. ` を差し込み、`差し込んだあと: ◯` の形で表示する
- `toString()` で `String` に戻し、大文字にした結果を `大文字: ◯` の形で表示する

ヒント: 大文字にする道具は前回使いました。`StringBuilder` のままでは呼べないので、先に `String` へ戻します。

書けたら回答を `submissions/week02/07_30m_StringBuilder.md` に貼り、「レビューして」と言ってください。

今回のポイントは2つです。`StringBuilder` は中身そのものが書き換わること。`String` の道具を使いたいときは `toString()` で戻すこと。

（予測: `append` を2回呼んだあと、`長さ` はいくつになるでしょうか）
