# インスタンスの基本操作


## 課題：第1章 インスタンスの基本操作

[https://forms.gle/toKmMeMro3MSSEnU6](https://forms.gle/toKmMeMro3MSSEnU6)

## 練習問題1

次のような書籍クラス(Bookクラス)があります。

```java
import java.util.Date;

public class Book {
    private String title;
    private Date publishDate;
    private String comment;

    // getter / setterの宣言は省略
}
```

以下のすべての動作を実現するよう、Bookクラスを改良してください。
ただし、各フィールドにnullが入っている場合を考慮する必要はありません。

① 書名と発行日が同じであれば等価なものと判定され、かつ、HashSet などに格納しても正しく利用できる。
② 発行日が古い順を自然順序とする。
③ clone()を呼び出すと、深いコピーによる複製が行われる。

## 練習問題2

書名の昇順で並び替えるために利用可能なTitleComparatorクラスを定義してください。

## 練習問題3

下記の書籍を3冊作成し、ArrayListに格納した上で書名順に表示してください。
ただし、練習問題2で定義したクラスを用いること。

| 書名 | 発行日 | コメント |
| --- | --- | --- |
| Java 入門 | 2011/10/07 | スッキリわかる |
| Python 入門 | 2019/06/11 | カレーが食べたくなる |
| C 言語入門 | 2018/06/21 | ポインタも自由自在 |
