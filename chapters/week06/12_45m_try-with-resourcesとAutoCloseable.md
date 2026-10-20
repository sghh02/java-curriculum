# Week 6 try-with-resources（後始末を確実にする）

前回は独自例外を作りました。今回は後始末の話です。ファイルや DB の接続は、使い終わったら閉じます。閉じ忘れると、資源をつかんだままになります。

途中で例外が出ても閉じたい。そのための書き方が try-with-resources です。実務ではファイル操作と JDBC で出てきます。

## まず押さえること

`try` のうしろに丸かっこを付け、その中で変数を用意します。

```
try (SimpleResource r = new SimpleResource()) {
    r.use();
}
```

`try` のブロックを抜けるとき、Java が自動で `close()` を呼びます。例外で抜けたときも呼ばれます。ここが `finally` を自分で書く形より確実です。

丸かっこに書けるのは、`AutoCloseable` を実装したクラスだけです。

```
class SimpleResource implements AutoCloseable {
    @Override
    public void close() {
        System.out.println("閉じる");
    }
}
```

`implements` はインターフェースを実装する書き方でした。`AutoCloseable` が求めるのは `close()` だけです。

閉じる順番も決まっています。丸かっこに複数書いたときは、うしろから順に閉じます。

## ステップ1: 予測写経

次のお手本を1行ずつ写します。写す前に「この行は何をするか」を予測します。写し終えたら実行し、予測と合っているか確かめます。

保存先は `src/main/java/com/example/week06/12_45m_try-with-resourcesとAutoCloseable/ResourceDemo.java` です。

```java
public class ResourceDemo {
    public static void main(String[] args) {
        try (SimpleResource r = new SimpleResource()) {
            r.use();
        }

        System.out.println("----");

        try (SimpleResource r = new SimpleResource()) {
            r.use();
            throw new RuntimeException("途中で失敗");
        } catch (RuntimeException e) {
            System.out.println("catch: " + e.getMessage());
        }
    }
}

class SimpleResource implements AutoCloseable {
    void use() {
        System.out.println("使う");
    }

    @Override
    public void close() {
        System.out.println("閉じる");
    }
}
```

実行は `java src/main/java/com/example/week06/12_45m_try-with-resourcesとAutoCloseable/ResourceDemo.java` です。

写しながら、次を自分に問いかけてください。

- 1つめの `try` で、`閉じる` はどこに出るか
- 2つめの `try` では、例外が出ても `閉じる` は出るか
- `閉じる` と `catch:` は、どちらが先に出るか
- `close()` を自分で呼んでいる行はあるか

## ステップ2: 暗写（設計メモから組み立てる）

お手本のコードは閉じます。次の設計メモだけを手がかりに、`ResourceDemo` を書きます。丸暗記ではなく、設計をコードへ起こす練習です。書けたら実行し、同じ出力になるか確かめます。

- 実行用クラス `ResourceDemo`
- クラス `SimpleResource` … `AutoCloseable` を実装する
- `void use()` … `使う` と表示する
- `close()` … `@Override` を付ける。`public void close()` の形。`閉じる` と表示する
- main の1つめ … try-with-resources で `SimpleResource r` を用意し、use を呼ぶ
- 区切りとして `----` を表示
- main の2つめ … 同じく `SimpleResource r` を用意して use を呼ぶ
- そのあと `RuntimeException` を投げる。メッセージは `途中で失敗`
- `catch` で受ける。変数は `e`。`catch: ◯` の形で `getMessage()` の結果を表示

## ステップ3: 自力

新しいファイル `src/main/java/com/example/week06/12_45m_try-with-resourcesとAutoCloseable/LogWriterDemo.java` を作ります。これまでのファイルは直しません。

テーマは「ログの書き込み」です。次のとおり書いてください。

- 実行用クラスは `LogWriterDemo` にする
- クラス `LogFile` を作る。`AutoCloseable` を実装する
- `void write()` … `書き込む` と表示する
- `close()` をオーバーライドし、`ファイルを閉じる` と表示する
- main で try-with-resources を使い、`LogFile f` を用意して write を呼ぶ
- 区切りとして `====` を表示する
- もう一度 try-with-resources で `LogFile f` を用意し、write を呼ぶ
- そのあと `RuntimeException` を投げる。メッセージは `書き込み失敗`
- `catch` で受ける。変数は `e`。`catch: ◯` の形でメッセージを表示する

ヒント: `close()` は `public` にします。`AutoCloseable` が求める形だからです。

書けたら回答を `submissions/week06/12_45m_try-with-resourcesとAutoCloseable.md` に貼り、「レビューして」と言ってください。

今回のポイントは2つです。`try` のブロックを抜けると `close()` が自動で呼ばれること。例外が出たときも呼ばれること。

（予測: 2つめの `try` では、`閉じる` と `catch:` のどちらが先に出るでしょうか）
