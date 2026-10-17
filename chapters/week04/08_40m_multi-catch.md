# Week 4 例外処理その4（複数の失敗をまとめて受ける）

Week 4 の例外の最終回です。これまでは1つの `catch` で1種類だけ受けてきました。しかし1つのメソッドが、2種類以上の失敗を起こすことはよくあります。今日はそれをまとめて受ける書き方をおぼえます。

## まず押さえること

`catch` の型を縦棒でつなぐと、複数の例外を1つの `catch` で受けられます。multi-catch と呼びます。

```
try {
    // 2種類の失敗が起きる可能性のある処理
} catch (IllegalArgumentException | IOException e) {
    // どちらが来ても、ここで受ける
}
```

縦棒は `|` です。`||`（または）とは別物なので、2本にしないでください。

使いどころは「後始末が同じとき」です。どちらの失敗でも同じメッセージを出すなら、まとめたほうが短く書けます。逆に、失敗の種類ごとに違う処理をしたいなら、`catch` を分けて並べます。

```
} catch (IllegalArgumentException e) {
    // 入力が悪いときの処理
} catch (IOException e) {
    // 保存に失敗したときの処理
}
```

どちらが正しいという話ではありません。処理が同じならまとめ、違うなら分ける。それだけです。

検査例外と非検査例外を混ぜて書けます。今回のお手本はその形です。検査例外が1つでも入っていれば、投げる側の宣言に `throws` が要ります。ここは前回と同じ決まりです。

## ステップ1: 予測写経

次のお手本を1行ずつ写します。写す前に「この行は何をするか」を予測します。写し終えたら実行し、予測と合っているか確かめます。

保存先は `src/main/java/com/example/week04/08_40m_multi-catch/RegisterDemo.java` です。

```java
import java.io.IOException;

public class RegisterDemo {
    public static void main(String[] args) {
        try {
            register(-1);
        } catch (IllegalArgumentException | IOException e) {
            System.out.println("登録できません: " + e.getMessage());
        }

        try {
            register(0);
        } catch (IllegalArgumentException | IOException e) {
            System.out.println("登録できません: " + e.getMessage());
        }

        System.out.println("最後まで動きました");
    }

    static void register(int id) throws IOException {
        if (id < 0) {
            throw new IllegalArgumentException("ID がマイナスです");
        }
        if (id == 0) {
            throw new IOException("ID 0 は使えません");
        }
        System.out.println("ID " + id + " を登録しました");
    }
}
```

実行は `java src/main/java/com/example/week04/08_40m_multi-catch/RegisterDemo.java` です。

写しながら、次を自分に問いかけてください。

- 1つ目の try と2つ目の try で、投げられる例外の型は同じか
- `register` の宣言に `throws IOException` はあるのに、`IllegalArgumentException` がないのはなぜか
- 2つの try を1つにまとめたら、`register(0)` は呼ばれるか
- `register(5)` を渡したら、何が表示されるか
- 縦棒を `||` と書いたら、どうなるか

## ステップ2: 暗写（設計メモから組み立てる）

お手本のコードは閉じます。次の設計メモだけを手がかりに、`RegisterDemo` を書きます。丸暗記ではなく、設計をコードへ起こす練習です。書けたら実行し、同じ出力になるか確かめます。

- `import` … `java.io.IOException` を読み込む
- 実行用クラス `RegisterDemo`
  - `register(int id)` … 検査例外を投げる予告を宣言に付ける。id がマイナスなら `IllegalArgumentException`、0なら `IOException` を投げる。1以上なら `ID ◯ を登録しました` を表示する。戻り値なし
  - main の流れ
    - try で `register(-1)` を呼ぶ。multi-catch で2つの例外を受け、`登録できません: 理由` を表示
    - try で `register(0)` を呼ぶ。catch は上と同じ形
    - 最後に `最後まで動きました` を表示

## ステップ3: 自力

新しいファイル `src/main/java/com/example/week04/08_40m_multi-catch/OrderDemo.java` を作ります。これまでのファイルは直しません。

テーマは「注文の受付」です。次のとおり書いてください。

- クラス名は `OrderDemo` にする
- static メソッド `order(int count)` を作り、検査例外を投げる予告を宣言に付ける
- count がマイナスなら `IllegalArgumentException` を投げる。メッセージには値も入れる
- count が0なら `IOException` を投げる
- 1以上なら `◯個を注文しました` を表示する
- main では try を2つ並べ、マイナスの数と0をそれぞれ渡す
- どちらの catch も multi-catch にして、`注文できません: 理由` を表示する
- 最後に `受付を終わります` を表示する

ヒント: 形はお手本と同じです。縦棒は1本です。検査例外が混ざるので、宣言の `throws` を忘れないでください。

書けたら回答を `submissions/week04/08_40m_multi-catch.md` に貼り、「レビューして」と言ってください。

今回のポイントは3つです。縦棒1本で複数の型を受けられること。後始末が同じならまとめ、違うなら分けること。検査例外が混ざれば `throws` が要ること。

（予測: お手本の2つの catch は、まったく同じ書き方です。それでも表示される理由の文章は違います。なぜでしょうか）
