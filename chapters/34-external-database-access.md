# データベースアクセス


## 課題：第9章 データベースアクセス

[https://forms.gle/8hS8mBm62a8mqbzQ8](https://forms.gle/8hS8mBm62a8mqbzQ8)

## 練習問題1

H2 Databaseのrpgdbデータベースに、右のようなITEMSテーブルがあるとします。このITEMSテーブルのある行に含まれるすべての列の内容をprivateフィールドとして格納するクラスItemを作ってください(1つの Item インスタンスは、1つのアイテムに関する情報を保持します)。
なお、Item クラスの全フィールドにはgetter/setterを準備するものとし、その名前はテーブルの列名に準じたものにしてください。

| Name | PRICE | WEIGHT |
| --- | --- | --- |
| やくそう | 5 | 2 |
| どくけしそう | 7 | 2 |

## 練習問題2

次のようなMainクラスがあります。
このクラスが呼び出しているItemsDAOクラスを作成してください。
なお、トランザクション制は行わないものとします

```java
import java.util.*;

public class Main {
    public static void main(String[] args) {
        System.out.println("1円以上のアイテム一覧表を表示します");
        // 指定価格以上のアイテムをItemのArrayListとして得る
        ArrayList<Item> items = ItemsDAO.findByMinimumPrice(1);
        for (Item item : items) {
            System.out.printf('%10s%4d%4d',
                    item.getName(), item.getPrice(), item.getWeight());
        }
    }
}
```

送信するSQL文は「SELECT * FROM ITEMS WHERE PRICE >= 1」
