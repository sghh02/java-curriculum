# Week 4 例外処理その1（失敗を受け止めて、止まらないようにする）

Week 4 の最後のテーマに入ります。ここまでは、必ず成功する処理だけを書いてきました。しかし現実のプログラムは失敗します。0で割る、無い番号を指す、ファイルが見つからない。こうした失敗を Java は「例外」という形で知らせます。

例外を放っておくと、プログラムはその場で止まります。受け止めれば、止めずに次へ進めます。今日はその受け止め方だけをやります。

## まず押さえること

失敗する可能性のある処理は `try` で囲みます。失敗したときの後始末は `catch` に書きます。

```
try {
    // 失敗する可能性のある処理
} catch (例外の型 e) {
    // 失敗したときの処理
} finally {
    // 成功しても失敗しても、必ず通る処理
}
```

`catch` の丸かっこは、メソッドの引数と同じ形です。左に型、右に変数名を書きます。この `e` が、投げられてきた例外そのものです。`e.getMessage()` を呼ぶと、失敗の理由が文字列で取れます。

`finally` は、例外の有無にかかわらず必ず通ります。後片づけを書く場所です。省いてもかまいません。

大事な決まりが1つあります。`try` の中で例外が起きると、その下の行は飛ばされます。処理はすぐ `catch` へ移ります。ここを勘違いしやすいので、実行して確かめてください。

## ステップ1: 予測写経

次のお手本を1行ずつ写します。写す前に「この行は何をするか」を予測します。写し終えたら実行し、予測と合っているか確かめます。

保存先は `src/main/java/com/example/week04/05_35m_try-catch-finally/DivideDemo.java` です。

```java
public class DivideDemo {
    public static void main(String[] args) {
        try {
            int answer = divide(10, 0);
            System.out.println("答え: " + answer);
        } catch (ArithmeticException e) {
            System.out.println("計算できません: " + e.getMessage());
        } finally {
            System.out.println("計算を終わります");
        }

        System.out.println("最後まで動きました");
    }

    static int divide(int a, int b) {
        return a / b;
    }
}
```

実行は `java src/main/java/com/example/week04/05_35m_try-catch-finally/DivideDemo.java` です。

写しながら、次を自分に問いかけてください。

- `divide(10, 0)` の直後にある「答え」の表示は、実行されるか
- `finally` は、例外が起きなかったときも通るか
- `e.getMessage()` が返すのは何か
- `catch` をまるごと消したら、プログラムはどうなるか
- 最後の「最後まで動きました」に、なぜたどり着けるのか

## ステップ2: 暗写（設計メモから組み立てる）

お手本のコードは閉じます。次の設計メモだけを手がかりに、`DivideDemo` を書きます。丸暗記ではなく、設計をコードへ起こす練習です。書けたら実行し、同じ出力になるか確かめます。

- 実行用クラス `DivideDemo`
  - `divide(int a, int b)` … a を b で割った結果を返す。戻り値は int
  - main の流れ
    - try で `divide(10, 0)` を呼び、結果を `答え: ◯` の形で表示
    - catch で `ArithmeticException` を受け、`計算できません: 理由` を表示
    - finally で `計算を終わります` を表示
    - 最後に `最後まで動きました` を表示

## ステップ3: 自力

新しいファイル `src/main/java/com/example/week04/05_35m_try-catch-finally/ArrayPickDemo.java` を作ります。これまでのファイルは直しません。

テーマは「配列から取り出す」です。次のとおり書いてください。

- クラス名は `ArrayPickDemo` にする
- int の配列を3つの要素で作る
- static メソッド `pick(int[] numbers, int index)` を作り、`numbers[index]` を返す
- main では try の中で `pick` を2回呼ぶ。1回目は正しい番号、2回目は範囲外の番号
- catch で `ArrayIndexOutOfBoundsException` を受け、`取り出せません: 理由` を表示する
- finally で `確認を終わります` を表示する

ヒント: 配列は Week 4 の `array` でやった形です。`e.getMessage()` は今回も理由の文字列を返します。範囲外の番号を渡すと、Java 側が例外を投げてくれます。自分で `throw` する必要はありません。

書けたら回答を `submissions/week04/05_35m_try-catch-finally.md` に貼り、「レビューして」と言ってください。

今回のポイントは3つです。`try` で囲んで `catch` で受けること。`try` の中で例外が起きると、その下の行は飛ばされること。`finally` は必ず通ること。

（予測: お手本では `divide` が例外を投げます。「答え」の行と「計算を終わります」の行は、どちらが表示されるでしょうか）
