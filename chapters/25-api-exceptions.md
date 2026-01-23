# 例外


## 課題：chapter 17 例外

[https://forms.gle/EY5goSwuxcEUxk6h9](https://forms.gle/EY5goSwuxcEUxk6h9)

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
