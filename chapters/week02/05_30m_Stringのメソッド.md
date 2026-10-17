# Week 2 文字列その1（String の道具を使う）

これまで文字列は、`+` でつなぐだけの相手でした。今回は中身をさわります。長さを数える、前後の空白を取る、一部を切り出す。こうした道具が `String` には最初から付いています。

名前や住所を扱うプログラムでは、この手の加工が絶えず出てきます。

## まず押さえること

文字列のうしろに点を打ち、道具の名前を書きます。

```
String s = "Hello";
s.length()
```

`s.length()` は「s の文字数を教えて」という頼み方です。答えが返ってくるので、`+` でつないで表示できます。

よく使う道具は5つです。

- `length()` … 文字数を返す
- `trim()` … 前後の空白を取り除いた文字列を返す
- `toUpperCase()` … すべて大文字にした文字列を返す
- `substring(0, 6)` … 0番目から6番目の手前までを切り出す
- `indexOf(" ")` … 探した文字が何番目にあるかを返す

大事な決まりが2つあります。

1つめは、数え方が0から始まることです。`Hello` の `H` は0番目です。

2つめは、もとの文字列が変わらないことです。`trim()` を呼んでも、もとの変数は空白を持ったままです。加工した結果は新しい文字列として返るので、別の変数へ受け取ります。

## ステップ1: 予測写経

次のお手本を1行ずつ写します。写す前に「この行は何を表示するか」を予測します。写し終えたら実行し、予測と合っているか確かめます。

保存先は `src/main/java/com/example/week02/05_30m_Stringのメソッド/NameFormat.java` です。

```java
public class NameFormat {
    public static void main(String[] args) {
        String name = "  Yamada Taro  ";
        System.out.println("もとの文字数: " + name.length());

        String trimmed = name.trim();
        System.out.println("空白を取る: [" + trimmed + "]");
        System.out.println("文字数: " + trimmed.length());
        System.out.println("大文字: " + trimmed.toUpperCase());
        System.out.println("先頭6文字: " + trimmed.substring(0, 6));
        System.out.println("空白の位置: " + trimmed.indexOf(" "));
    }
}
```

実行は `java src/main/java/com/example/week02/05_30m_Stringのメソッド/NameFormat.java` です。

角かっこで囲んでいるのは、空白が取れたかどうかを目で確かめるためです。

写しながら、次を自分に問いかけてください。

- `name.length()` はいくつになるか。前後の空白も数に入るか
- `substring(0, 6)` が切り出すのは何文字か
- `indexOf(" ")` の答えと、`substring` の6には関係がありそうか
- `toUpperCase()` を呼んだあと、`trimmed` の中身は大文字になっているか

## ステップ2: 暗写（設計メモから組み立てる）

お手本のコードは閉じます。次の設計メモだけを手がかりに、`NameFormat` を書きます。丸暗記ではなく、設計をコードへ起こす練習です。書けたら実行し、同じ出力になるか確かめます。

- 実行用クラス `NameFormat`
- `String name` … 前後に空白を2つずつ付けた `Yamada Taro` を入れる
- `もとの文字数: ◯` … `length()` で数えて表示する
- `String trimmed` … `trim()` の結果を受け取る
- `空白を取る: [◯]` … 角かっこで囲んで表示する
- `文字数: ◯` … trim したあとの文字数を表示する
- `大文字: ◯` … `toUpperCase()` の結果を表示する
- `先頭6文字: ◯` … `substring` で0から6の手前までを切り出す
- `空白の位置: ◯` … `indexOf` で空白1文字を探す

## ステップ3: 自力

新しいファイル `src/main/java/com/example/week02/05_30m_Stringのメソッド/CityName.java` を作ります。これまでのファイルは直しません。

テーマは「都市名の加工」です。次のとおり書いてください。

- クラス名は `CityName` にする
- 変数へ `  TOKYO Japan  ` を入れる。前後に空白を2つずつ付ける
- もとの文字数を `もとの文字数: ◯` の形で表示する
- `trim()` の結果を別の変数で受け取る
- 受け取った結果を `空白を取る: [◯]` の形で表示する
- 小文字にした結果を `小文字: ◯` の形で表示する
- 先頭5文字を切り出し、`先頭5文字: ◯` の形で表示する
- `Japan` が何番目にあるかを `Japan の位置: ◯` の形で表示する

ヒント: 小文字にする道具の名前は、大文字にするほうから見当が付きます。`indexOf` には1文字だけでなく、単語をまるごと渡せます。

書けたら回答を `submissions/week02/05_30m_Stringのメソッド.md` に貼り、「レビューして」と言ってください。

今回のポイントは2つです。数え方は0から始まること。道具を呼んでも、もとの文字列は変わらないこと。

（予測: `substring(0, 6)` の6と `indexOf(" ")` の答え。同じ数になるのは偶然でしょうか）
