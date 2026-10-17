# Week 4 例外処理その3（検査例外と throws の予告）

前回は `throw` で自分から例外を投げました。今回は、例外を2種類に分ける話です。片方はコンパイラが対処を強制します。強制されるほうを扱うには、`throws` という宣言が要ります。

## まず押さえること

例外は2種類に分かれます。違いは、コンパイラが対処を強制するかどうかです。

- 非検査例外 … `ArithmeticException` や `IllegalArgumentException` など。強制されない
- 検査例外 … `IOException` など。対処を書かないとコンパイルエラー

線引きは「防げるかどうか」です。0除算や配列のはみ出しは、書き方を直せば防げます。だから強制しません。ファイルの読み書きは、こちらが正しく書いても失敗します。そのため強制します。

検査例外への対処は2つあり、どちらか一方を選びます。その場で `try-catch` して自分で始末をつけるか、`throws` を付けて呼び出し元へ預けるかです。両方とも書かなかったときだけエラーになります。

`throws` はメソッドの宣言に付けます。

```
static void save(int size) throws IOException { ... }
```

意味は「このメソッドは失敗する可能性がある」という予告です。呼ぶ側は、その覚悟をして呼びます。

`throw` と1文字しか違いませんが、役割は別です。`throw` は投げる命令で、`throws` は予告の看板です。ここは打ち間違いが起きやすいので、写すときに意識してください。

## ステップ1: 予測写経

次のお手本を1行ずつ写します。写す前に「この行は何をするか」を予測します。写し終えたら実行し、予測と合っているか確かめます。

保存先は `src/main/java/com/example/week04/07_35m_throwsと検査例外/SaveDemo.java` です。

```java
import java.io.IOException;

public class SaveDemo {
    public static void main(String[] args) {
        try {
            save(3);
            save(0);
        } catch (IOException e) {
            System.out.println("保存に失敗しました: " + e.getMessage());
        }

        System.out.println("最後まで動きました");
    }

    static void save(int size) throws IOException {
        if (size <= 0) {
            throw new IOException("保存するデータがありません");
        }
        System.out.println(size + "件を保存しました");
    }
}
```

実行は `java src/main/java/com/example/week04/07_35m_throwsと検査例外/SaveDemo.java` です。

写しながら、次を自分に問いかけてください。

- `save` から `throws IOException` を消したら、何が起きるか
- main の try を外したら、何が起きるか
- `main` に `throws` が付いていないのはなぜか
- 前回の `checkAge` に `throws` が要らなかったのはなぜか
- `import` が1行だけ要るのはなぜか

## ステップ2: 暗写（設計メモから組み立てる）

お手本のコードは閉じます。次の設計メモだけを手がかりに、`SaveDemo` を書きます。丸暗記ではなく、設計をコードへ起こす練習です。書けたら実行し、同じ出力になるか確かめます。

- `import` … `java.io.IOException` を読み込む
- 実行用クラス `SaveDemo`
  - `save(int size)` … 検査例外を投げる予告を宣言に付ける。size が0以下なら `IOException` を投げる。1以上なら `◯件を保存しました` を表示する。戻り値なし
  - main の流れ
    - try で `save(3)` と `save(0)` を続けて呼ぶ
    - catch で `IOException` を受け、`保存に失敗しました: 理由` を表示
    - 最後に `最後まで動きました` を表示

## ステップ3: 自力

新しいファイル `src/main/java/com/example/week04/07_35m_throwsと検査例外/LoadDemo.java` を作ります。これまでのファイルは直しません。

テーマは「読み込み」です。次のとおり書いてください。

- クラス名は `LoadDemo` にする
- static メソッド `load(int id)` を作り、検査例外を投げる予告を宣言に付ける
- id が0以下なら `IOException` を投げる。メッセージには不正だった値も入れる
- 1以上なら `ID ◯ を読み込みました` を表示する
- main では try の中で `load` を2回呼ぶ。1回目は正しい ID、2回目は0
- catch で受け、`読み込めません: 理由` を表示する
- 最後に `処理を終わります` を表示する

ヒント: `IOException` を使うので `import java.io.IOException;` が要ります。宣言に付けるのは `throws`、投げる命令は `throw` です。

書けたら回答を `submissions/week04/07_35m_throwsと検査例外.md` に貼り、「レビューして」と言ってください。

今回のポイントは3つです。検査例外だけがコンパイラに対処を強制されること。対処は `try-catch` か `throws` の二択であること。`throw` は命令で `throws` は予告であること。

（予測: `save(3)` は成功します。そのあと `save(0)` が投げると、出力は何行になるでしょうか）
