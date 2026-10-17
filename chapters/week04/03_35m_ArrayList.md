# Week 4 ArrayList（あとから増やせる一覧を扱う）

配列の続きです。前回の配列は、作るときに個数が決まっていて、あとから増やせませんでした。今回は ArrayList です。あとから商品を足したり、消したりできる一覧です。在庫管理では「入荷で商品が増える」「売り切れで消える」が当たり前なので、ここが実務の土台になります。

## まず押さえること

ArrayList は、あとから中身を足し引きできる一覧です。使う前に `import` が要ります。作るときは型を `<>` の中に書きます。

```
import java.util.ArrayList;
import java.util.List;

List<String> items = new ArrayList<>();  // String を入れる空の一覧
items.add("りんご");                      // 末尾に足す
items.get(0);                            // 0番目を取り出す。りんご
items.size();                            // 個数。配列の length にあたる
items.remove("りんご");                   // 中身を消す
```

配列との違いはこうです。個数は `.size()` で取ります。配列の `.length` はカッコなしでしたが、ArrayList はメソッドなのでカッコが要ります。番号が 0 から始まる点は配列と同じです。

## ステップ1: 予測写経

次のお手本を1行ずつ写します。写す前に「この行は何をするか」を予測します。写し終えたら実行し、予測と合っているか確かめます。

保存先は `src/main/java/com/example/week04/03_35m_ArrayList/StockListDemo.java` です。

```java
import java.util.ArrayList;
import java.util.List;

public class StockListDemo {
    public static void main(String[] args) {
        List<String> items = new ArrayList<>();
        items.add("りんご");
        items.add("みかん");
        items.add("ぶどう");

        System.out.println("商品数: " + items.size() + "件");

        for (String item : items) {
            System.out.println(item);
        }

        items.remove("みかん");
        System.out.println("削除後: " + items.size() + "件");
    }
}
```

実行は `java src/main/java/com/example/week04/03_35m_ArrayList/StockListDemo.java` です。

写しながら、次を自分に問いかけてください。

- `new ArrayList<>()` の時点で、中身は何個か
- `add` を3回すると、`size()` はいくつになるか
- 拡張for は、配列のときと同じ書き方で回せるか
- `remove("みかん")` のあと、`size()` はいくつになるか

## ステップ2: 暗写（設計メモから組み立てる）

お手本のコードは閉じます。次の設計メモだけを手がかりに、`StockListDemo` を書きます。丸暗記ではなく、設計をコードへ起こす練習です。書けたら実行し、同じ出力になるか確かめます。

- `import` … `java.util.ArrayList` と `java.util.List` を読み込む
- 実行用クラス `StockListDemo`
  - `List<String> items` … 空の ArrayList を作る
  - `add` … りんご・みかん・ぶどうを順に足す
  - `商品数: 件数件` … `size()` を使って個数を表示する
  - 拡張for … items を1つずつ取り出し、商品名を1行ずつ表示する
  - `remove` … みかんを消す
  - `削除後: 件数件` … 消したあとの `size()` を表示する

## ステップ3: 自力

新しいファイル `src/main/java/com/example/week04/03_35m_ArrayList/ArrivalListDemo.java` を作ります。これまでのファイルは直しません。

テーマは「入荷リスト」です。次のとおり書いてください。

- クラス名は `ArrivalListDemo` にする
- `List<String>` の一覧を作り、商品を4つ `add` する
- 全件を `1. 商品名` の形で、番号を付けて表示する。番号は1から始める
- そのあと商品を1つ `remove` する
- 最後に残りの件数を `残り: 件数件` の形で表示する

ヒント: 番号を付けるには、位置が要ります。`for (int i = 0; i < items.size(); i++)` で回し、`items.get(i)` で取り出します。番号は `i + 1` で1からにできます。

書けたら回答を `submissions/week04/03_35m_ArrayList.md` に貼り、「レビューして」と言ってください。

今回のポイントは3つです。ArrayList は `import` が要ること。`add` と `remove` であとから増減できること。個数はカッコ付きの `size()` で取ること。

（予測: お手本の `StockListDemo` は、全部で何行の出力になるでしょうか。最後の件数はいくつでしょうか。）
