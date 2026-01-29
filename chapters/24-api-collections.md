# コレクション

> 提出ブランチ：`feature/24-api-collections`（PRのbase：`main`）

## 課題：chapter 16 コレクション

この章を学習したら、以下の練習問題に取り組んでください。

## 練習問題1

以下プログラムと同じ処理内容のプログラムをArrayListを用いて作成してください。

```java
public class ArraySample{
    public static void main(String[] args) {
        String[] array = {"みかん","バナナ","いちご","りんご"};
        for( int i = 0; i < array.length; i++ ){
            System.out.println(array[i]);
        }
    }
}
```

**実行結果**

```java
みかん
バナナ
いちご
りんご
```

## 練習問題2

以下プログラムのコメントの指示に基づき、プログラムを作成してください。

```java
//必要なimportを行う

public class Main{
    public static void main(String[] args) {
        //HashSetインスタンスを生成し、Set型の変数setに代入する
        //扱う要素はString型

        //addメソッドを使って、「みかん」「バナナ」「いちご」「りんご」
        //の各文字列を要素として追加する

        //removeメソッドを使って「みかん」を削除する

        System.out.println(set);

        //containsメソッドを使って「バナナ」が含まれているかを判定し、trueかfalseを表示する

        //containsメソッドを使って「みかん」が含まれているかを判定し、trueかfalseを表示する
    }
}
```

**実行結果**

```java
[バナナ, いちご, りんご]
true
false
```

## 練習問題3

以下の仕様に基づき提供プログラムを追記し、実行結果を得てください。

**仕様**

- HashMapを使って科目とその得点を管理します。
- HashMapのキーを「科目名」(String型)、値を「得点」(Integer型)として扱います。
- 各科目と得点は次のとおりです。
    - 国語：90点
    - 数学：80点
    - 英語：70点

**提供コード**

```java
import java.util.Map;
import java.util.HashMap;

public class Main{
    public static void main(String[] args) {
        //HashMapインスタンスを生成

        //各科目の科目名と得点を要素として追加

        //HashMapからkeySetを取り出し、拡張forで各科目の
        //科目名と得点を表示する。

    }
}
```

**実行結果**

```java
国語:90
数学:80
英語:70
```

## AIに質問する（この章の例）

次の例をそのままAIに投げてOKです（必要なら自分のコード/エラーに置き換えてください）。

```text
「『コレクション』を初心者向けに、たとえ話つきで説明して。最後に要点を3つにまとめて」
「この章の内容で理解確認クイズを5問作って（解答は最後にまとめて）」
「この章の練習問題で詰まった。答えを丸ごとではなく、方針→ヒント→確認質問の順で教えて」
「List/Map/Setの使い分けを、ToDo管理の例で教えて」
```

---

## 課題提出

この章には提出課題があります。

1. 上記の練習問題を完了する
2. GitHub で `feature/24-api-collections` ブランチを作成し、PRを作成
3. [AI総合レビューツール](https://ai.studio/apps/drive/1AMqIqU4Bio4te7AWh5dly1Qzp7CesqP9?fullscreenApplet=true) でレビューを実行
4. 問題がなければ、スプレッドシートに **PR URL** と **完了日** を記入
