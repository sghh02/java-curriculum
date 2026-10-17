# Week 3 制御構文（break と continue）

テーマは制御構文の続きです。今日はループの流れを変える2つの命令を覚えます。`break` はくり返しを途中でやめます。`continue` はその回だけ飛ばして次へ進みます。

## まず押さえること

`break` は、くり返しをそこで打ち切ります。以降の回はもう動きません。

`continue` は、その回の残りを飛ばして、次のくり返しに進みます。ループ自体は続きます。

どちらも if と組み合わせて使うのがふつうです。「ある条件になったら抜ける」「ある条件のときだけ飛ばす」という書き方をします。

```
while (条件) {
    if (打ち切りたい条件) {
        break;      // ここでループを終える
    }
    // 通常の処理
}
```

## ステップ1: 予測写経

次のお手本を1行ずつ写します。写す前に「何が、どの順で表示されるか」を予測します。写し終えたら実行し、予測と合っているか確かめます。

保存先は `src/main/java/com/example/week03/05_30m_breakとcontinue/BreakSample.java` にします。

```java
public class BreakSample {
    public static void main(String[] args) {
        int i = 1;
        while (i <= 10) {
            if (i == 4) {
                break;
            }
            System.out.println(i);
            i = i + 1;
        }
        System.out.println("終わり");
    }
}
```

実行は `java src/main/java/com/example/week03/05_30m_breakとcontinue/BreakSample.java` です。

## ステップ2: 暗写（設計メモから組み立てる）

お手本のコードは閉じます。次の設計メモだけを手がかりに、`BreakSample` を書きます。丸暗記ではなく、設計をコードへ起こす練習です。書けたら実行し、同じ出力になるか確かめます。

- 実行用クラス `BreakSample`
- `int i` … 1 を入れる
- while … `i <= 10` の間くり返す
- くり返し中に `i == 4` なら `break` で抜ける
- それ以外なら i を1行表示し、`i = i + 1;` で1増やす
- くり返しを抜けたら `終わり` を表示する

## ステップ3: 自力

新しいファイル `src/main/java/com/example/week03/05_30m_breakとcontinue/ContinueSample.java` を作ります。これまでのファイルは直しません。

テーマは「3の倍数だけ飛ばす」です。次のとおり書いてください。

- for 文で i を 1 から 10 までくり返す
- i が3の倍数のとき（`i % 3 == 0`）は `continue` で飛ばす
- それ以外のときは i を1行表示する

クラス名は `ContinueSample` にします。書けたら回答を `submissions/week03/05_30m_breakとcontinue.md` に貼り、「レビューして」と言ってください。

今回のポイントは2つです。`break` はループごと終わること。`continue` はその回だけ飛ばして、ループは続くこと。この違いを、出力を見比べて確かめてください。

（予測: 3の倍数を飛ばすと、1 から 10 のうち何が表示されるでしょうか。）
