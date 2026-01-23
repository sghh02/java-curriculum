# 基本的な開発ツール


## 課題：第10章 基本的な開発ツール

[https://forms.gle/j3zmhsXSvkgTv4fV7](https://forms.gle/j3zmhsXSvkgTv4fV7)

## 練習問題1

以下のJavaソースファイルを作成し、変数名からクラスやメンバの意味を推測して、適切なJavadoc コメントとタグを書き加え、Javadoc でプログラム仕様書を生成してください。

```java
package jp.miyabilink.atm;

public class Bank {
		String name;
		String address;
		public void addAccount(String owner, int initZandaka) {}
		public static void main(String(l args) {
			System.out.printin("試験用のメインメソッドです")；
		}
}
```

## 練習問題2

練習問題2で作成したソースファイルをコンパイルし、atm.jarを生成してください。
このとき、マニフェストファイルに Main-Class としてBankクラスを指定してください。

## 練習問題3

練習問題2で作成したJARファイルをjavaコマンドにて実行してください。
ただし実行の際にjar オプションを利用してください。
