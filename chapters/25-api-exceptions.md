# 例外

> 提出ブランチ：`feature/25-api-exceptions`（PRのbase：`main`）

## 課題：chapter 17 例外

この章を学習したら、以下の練習問題に取り組んでください。

## 練習問題1

以下の仕様に基づいてプログラムを修正し、実行結果の各パターンを得てください。

**仕様**
提供コードで発生する可能性のある例外に対して次のように処理します。

- java.lang.ArrayIndexOutOfBoundsExceptionが発生した場合「引数の数が足りません」と表示する。
- java.lang.NumberFormatExceptionが発生した場合「引数はそれぞれ数値でなければいけません」と表示する。

**提供コード**

```java
public class Main{
    public static void main(String[] args){
        int x = Integer.parseInt(args[0]);
        int y = Integer.parseInt(args[1]);
        System.out.println(x/y);
    }
}
```

**実行結果(実行時コマンド含む)**

**パターン1**

```java
>java Main
引数は2つの数値を指定してください
プログラムを終了します
```

パターン2

```java
>java Main 5 0
不正な計算を行いました
プログラムを終了します
```

パターン3

```java
>java Main 10 5
2
プログラムを終了します
```

## 練習問題2

以下の仕様に基づいてプログラムを修正し、実行結果の各パターンを得てください。

**仕様**
提供コードで発生する可能性のある例外に対して次のように処理します。

- loadFileメソッド
    - throws宣言を使って、java.io.FileNotFoundExceptionが発生することを明示する。
- mainメソッド
    - java.io.FileNotFoundExceptionが発生した場合「ファイルを読込できません」と表示する。

**提供コード**

```java
import java.io.FileReader;
import java.io.FileNotFoundException;

public class Main{
    public static void main(String[] args){
    	loadFile();
    }
    public static void loadFile(){
    	FileReader fr = new FileReader("notfound.txt");
    }
}
```

**実行結果(実行時コマンド含む)**

```java
>java Main
引数は2つの数値を指定してください
プログラムを終了します
```

## AIに質問する（この章の例）

次の例をそのままAIに投げてOKです（必要なら自分のコード/エラーに置き換えてください）。

```text
「『例外』を初心者向けに、たとえ話つきで説明して。最後に要点を3つにまとめて」
「この章の内容で理解確認クイズを5問作って（解答は最後にまとめて）」
「この章の練習問題で詰まった。答えを丸ごとではなく、方針→ヒント→確認質問の順で教えて」
「例外を投げる/握りつぶすの判断を、境界（UI/Service）で説明して」
```

---

## 課題提出

この章には提出課題があります。

1. 上記の練習問題を完了する
2. GitHub で `feature/25-api-exceptions` ブランチを作成し、PRを作成
3. [AI総合レビューツール](https://ai.studio/apps/drive/1AMqIqU4Bio4te7AWh5dly1Qzp7CesqP9?fullscreenApplet=true) でレビューを実行
4. 問題がなければ、スプレッドシートに **PR URL** と **完了日** を記入
