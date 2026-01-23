# 関数とラムダ式


## 課題：第3章 関数とラムダ式

[https://forms.gle/8GLEVuTYTSKUrXBS8](https://forms.gle/8GLEVuTYTSKUrXBS8)

## 練習問題1

次のコードに含まれる2つのメソッドを関数として変数に格納し、それを呼び出す Main クラスを作成してください。
関数を代入するためのインタフェース名は Func1とFunc2とし、それ以外のメソッド名や引数名は任意とします。

```java
public class FuncList {
    public static boolean isOdd(int x) { return (x % 2 == 1); }
    public String passCheck(int point, String name) {
        return name + "さんは" + (point > 65 ? "合格" : "不合格");
    }
}
```

## 練習問題2

練習問題1における FuncList クラスの2つのメソッドの内容について、それぞれラムダ式で表現し、インタフェース Func1とFunc2に代入して利用するよう練習問題1で作成した Main クラスを書き換えてください。

## 練習問題3

練習問題2のFunc1のラムダ式について、代入先の型をFunc1ではなく、標準関数インタフェースに変更します。
用いるべき適切な型をAPIリファレンスで調べ、プログラムを変更してください。

## 練習問題4

スッキリわかるJava実践編の人物紹介(p.17)を参照し、登場人物4名のフルネームを格納した
List<String>型の
names を準備し（名字と名前の間には空白を入れない）、フル
ネームが4文字以下であるすべての人物について、未尾に「さん」を付けて表示するプログラムを StreamAPIを用いて作成してください。
