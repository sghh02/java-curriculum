# Week 4 HashMap（名前で引ける一覧を扱う）

ArrayList の続きです。前回は番号で中身を取り出しました。今回は HashMap です。番号ではなく、名前で取り出します。在庫管理でいえば「商品名から在庫数を引く」動きです。REST API でも「ID から1件を引く」場面が絶えず出てきます。その考え方をここで身につけます。

## まず押さえること

HashMap は、キーと値の組で持つ入れ物です。キーが見出しで、値が中身です。使う前に `import` が要ります。

```
import java.util.HashMap;
import java.util.Map;

Map<String, Integer> stocks = new HashMap<>();  // キーの型と値の型を並べて書く
stocks.put("りんご", 12);                        // キーと値の組を入れる
stocks.get("りんご");                            // キーで取り出す。12
stocks.size();                                  // 組の数
stocks.containsKey("りんご");                    // あるかどうか。true
```

`Map<String, Integer>` は、キーの型と値の型を並べた書き方です。前が String で、後ろが Integer です。値の型に int とは書けません。`<>` の中には基本型を書けない決まりがあるからです。数値を入れたいときは `Integer` と書きます。

`put` や `get`、`size` は Map に決められたメソッドです。`Map<String, Integer>` と書いた変数へ `new HashMap<>()` を入れられるのは、HashMap が Map の一種だからです。この仕組みは Week 6 で扱います。今は書き方として覚えてください。

List との違いはこうです。List は「何番目か」で取り出します。Map は「どの名前か」で取り出します。探すものが決まっているときは、Map のほうが読みやすくなります。

覚えておくことが2つあります。同じキーでもう一度 `put` すると、上書きになります。それから、並び順は入れた順になるとは限りません。HashMap は順番を持たない仕組みだからです。

## ステップ1: 予測写経

次のお手本を1行ずつ写します。写す前に「この行は何をするか」を予測します。写し終えたら実行し、予測と合っているか確かめます。

保存先は `src/main/java/com/example/week04/04_40m_HashMap/StockMapDemo.java` です。

```java
import java.util.HashMap;
import java.util.Map;

public class StockMapDemo {
    public static void main(String[] args) {
        Map<String, Integer> stocks = new HashMap<>();
        stocks.put("りんご", 12);
        stocks.put("みかん", 30);
        stocks.put("ぶどう", 8);

        System.out.println("商品数: " + stocks.size() + "件");
        System.out.println("りんごの在庫: " + stocks.get("りんご") + "個");

        stocks.put("りんご", 20);
        System.out.println("入荷後のりんご: " + stocks.get("りんご") + "個");

        for (String name : stocks.keySet()) {
            System.out.println(name + ": " + stocks.get(name) + "個");
        }
    }
}
```

実行は `java src/main/java/com/example/week04/04_40m_HashMap/StockMapDemo.java` です。

最後の3行の並び順は、入れた順とは限りません。順番が違っていても間違いではありません。

写しながら、次を自分に問いかけてください。

- `Map<String, Integer>` の2つの型は、それぞれ何を表すか
- りんごを2回 `put` すると、`size()` はいくつになるか
- `keySet()` が返すのは何か
- `stocks.get(name)` は、ループの中で何を取り出しているか

## ステップ2: 暗写（設計メモから組み立てる）

お手本のコードは閉じます。次の設計メモだけを手がかりに、`StockMapDemo` を書きます。丸暗記ではなく、設計をコードへ起こす練習です。書けたら実行し、同じ出力になるか確かめます。

- `import` … `java.util.HashMap` と `java.util.Map` を読み込む
- 実行用クラス `StockMapDemo`
  - `Map<String, Integer> stocks` … 空の HashMap を作る
  - `put` … りんご12、みかん30、ぶどう8 の3組を入れる
  - `商品数: 件数件` … `size()` で組の数を表示する
  - `りんごの在庫: 個数個` … `get` で引いて表示する
  - `put` … りんごを20で入れ直す
  - `入荷後のりんご: 個数個` … もう一度 `get` して表示する
  - 拡張for … `keySet()` を回し、`商品名: 在庫数個` を1行ずつ表示する

## ステップ3: 自力

新しいファイル `src/main/java/com/example/week04/04_40m_HashMap/PriceMapDemo.java` を作ります。これまでのファイルは直しません。

テーマは「価格表」です。次のとおり書いてください。

- クラス名は `PriceMapDemo` にする
- 商品名をキー、価格を値にした Map を作り、4組 `put` する
- 全件を `商品名: 価格円` の形で表示する
- `containsKey` で「バナナ」があるか調べる
- あれば `バナナ: 価格円`、なければ `バナナ: 取り扱いなし` と表示する
- 最後に `商品数: 件数件` を表示する

ヒント: 全件を回すには `for (String name : prices.keySet())` を使います。値は `prices.get(name)` で取れます。有無の分岐には Week 3 の `if` と `else` を使います。

書けたら回答を `submissions/week04/04_40m_HashMap.md` に貼り、「レビューして」と言ってください。

## 補足: 取り出し方は3つある

ここはステップ3を解き終えてから読んでください。

Map から中身を取り出す道具は3つあります。どれも Map に決められたメソッドです。

- `keySet()` … キーだけを集めたもの
- `values()` … 値だけを集めたもの
- `entrySet()` … キーと値の組を集めたもの

今回使ったのは `keySet()` です。キーを1つずつ取り出し、そのつど `get` で値を引きました。

キーと値の両方が要るときは `entrySet()` のほうが向いています。組をそのまま受け取れるので、`get` で探し直さずに済むからです。

```java
for (Map.Entry<String, Integer> entry : stocks.entrySet()) {
    System.out.println(entry.getKey() + ": " + entry.getValue() + "個");
}
```

とはいえ今の段階は `keySet()` で書ければ十分です。`entrySet()` は、扱う件数が増えてきたときに思い出してください。

今回のポイントは3つです。キーと値の組で持つこと。取り出すのは番号ではなく名前であること。同じキーで `put` すると上書きになること。

（予測: お手本の `StockMapDemo` は、りんごの在庫を2回表示します。1回目と2回目で数は変わるでしょうか。）
