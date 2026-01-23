# 配列


## 課題：chapter 4 配列

[https://forms.gle/MXz8irbedsZSUR3p9](https://forms.gle/MXz8irbedsZSUR3p9)

## 練習問題1

次の条件を満たす各配列を準備するプログラムを作成してください。
なお、以下の4つの配列を1つのプログラムの中に記述して構いません。
また、値の初期化は不要です。

1. int型の値を4個まとめて格納できる配列 points
2. double 型の値を5個まとめて格納できる配列 weights
3. boolean 型の値を3つまとめて格納できる配列 answers
4. String 型の値を3つまとめて格納できる配列names

## 練習問題2

次に示す3つの条件を満たすプログラムを作成してください。

1. 3つの口座残高「121902」「8302」「55100」が格納されている int型配列moneyListを宣言します。
2. その配列の要素を1つずつ for文で取り出して画面に表示します。
3. 同じ配列の要素を拡張for文で1つずつ取り出して画面に表示します。

## 練習問題3

次のコードを実行すると、5行目と6行目で例外が発生します。

それぞれの行で発生する例外の名前を答えてください。

```java
public class Main {
	public static void main (String(] args) {
		int[] counts = null;
		float[] heights = {171.3F, 175. 0F};
		System.out.println(counts[1]);
		System.out.println(heights[2]);
	}
}
```
