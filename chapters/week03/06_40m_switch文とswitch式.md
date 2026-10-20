# Week 3 switch（値で枝分かれする）

前回は break と continue でくり返しを操りました。今回は枝分かれです。`if` を何段も重ねる形は読みにくくなります。値が決まった数種類のときは `switch` のほうが読みやすくなります。

現場では区分の判定でよく出ます。ステータスや種別ごとに処理を分ける場面です。

## まず押さえること

書き方は2つあります。まず昔からある `switch` 文です。

```
switch (値) {
    case 1:
        処理
        break;
    default:
        処理
}
```

`case` は「この値だったら」という意味です。`break` を書かないと、次の `case` へ流れ落ちます。`default` はどれにも当てはまらないときです。

もう1つが `switch` 式です。矢印を使い、結果を変数へ受け取れます。

```
String s = switch (値) {
    case 1, 2 -> "平日";
    default -> "不明";
};
```

こちらは `break` が要りません。カンマで複数の値をまとめられます。最後にセミコロンが要る点に注意してください。値を返す式だからです。

新しく書くなら `switch` 式のほうが安全です。`break` の書き忘れが起きないからです。

## ステップ1: 予測写経

次のお手本を1行ずつ写します。写す前に「この行は何をするか」を予測します。写し終えたら実行し、予測と合っているか確かめます。

保存先は `src/main/java/com/example/week03/06_40m_switch文とswitch式/SwitchDemo.java` です。

```java
public class SwitchDemo {
    public static void main(String[] args) {
        int day = 3;
        switch (day) {
            case 1:
                System.out.println("月曜");
                break;
            case 2:
                System.out.println("火曜");
                break;
            case 3:
                System.out.println("水曜");
                break;
            default:
                System.out.println("その他");
        }

        String type = switch (day) {
            case 1, 2, 3, 4, 5 -> "平日";
            case 6, 7 -> "週末";
            default -> "不明";
        };
        System.out.println("区分: " + type);
    }
}
```

実行は `java src/main/java/com/example/week03/06_40m_switch文とswitch式/SwitchDemo.java` です。

写しながら、次を自分に問いかけてください。

- `day` が 3 のとき、表示されるのはどの `case` か
- `break` を消すと何が起きるか
- `switch` 式のほうに `break` がないのはなぜか
- 閉じ波かっこのうしろにセミコロンが要るのはどちらか

## ステップ2: 暗写（設計メモから組み立てる）

お手本のコードは閉じます。次の設計メモだけを手がかりに、`SwitchDemo` を書きます。丸暗記ではなく、設計をコードへ起こす練習です。書けたら実行し、同じ出力になるか確かめます。

- 実行用クラス `SwitchDemo`
- `int day` に 3 を入れる
- `switch` 文で day を見る
- case 1 なら月曜、case 2 なら火曜、case 3 なら水曜を表示。各 case に `break` を付ける
- default では「その他」を表示
- `String type` … `switch` 式の結果を受け取る
- 1 から 5 をまとめて `平日` にする
- 6 と 7 をまとめて `週末` にする
- default は `不明` にする
- `区分: ◯` を表示

## ステップ3: 自力

新しいファイル `src/main/java/com/example/week03/06_40m_switch文とswitch式/SeasonSwitch.java` を作ります。これまでのファイルは直しません。

テーマは「月から季節を出す」です。次のとおり書いてください。

- クラス名は `SeasonSwitch` にする
- `int month` に 4 を入れる
- `switch` 文で month を見る。case 1 なら `1月`、case 4 なら `4月`、case 8 なら `8月` を表示する
- どの case にも `break` を付ける
- default では `その他の月` を表示する
- `String season` … `switch` 式で決めた季節を受け取る
- 3・4・5 をまとめて `春`、6・7・8 をまとめて `夏` にする
- default は `それ以外` にする
- season を `季節: ◯` の形で表示する

ヒント: `switch` 式の閉じ波かっこのうしろには、セミコロンが要ります。

書けたら回答を `submissions/week03/06_40m_switch文とswitch式.md` に貼り、「レビューして」と言ってください。

今回のポイントは2つです。`switch` 文は `break` を書かないと流れ落ちること。`switch` 式は結果を変数へ受け取れること。

（予測: `day` が 3 のとき、`case 3` の `break` を消すと何が表示されるでしょうか）
