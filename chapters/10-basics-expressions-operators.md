# 式と演算子


## 課題：chapter 2 式と演算子

[https://forms.gle/E9Fhy9J9fHvdqSY96](https://forms.gle/E9Fhy9J9fHvdqSY96)

## 練習問題1

以下の内容のプログラムを作成してください。

1. 画面に「ようこそ占いの館へ」と表示します。
2. 画面に「あなたの名前を入力してください」と表示します。
3. キーボードから 1行の文字入力を受け付け、String 型の変数 nameに納します。
4. 画面に「あなたの年齢を入力してください」と表示します。
5. キーボードから1行の文字入力を受け付け、String 型の変数 ageString に格納します。
6. 変数ageString の内容をint型に変換し、int型の変数ageに代入します。
7. 0から3までの乱数を生成し、int型の変数 fortune に代入します。
8. fortune の数値をインクリメント演算子で1増やし、1から4の乱数にします。
9. 画面に「占いの結果が出ました！」と表示します。
10. 1画面に「（年齢）歳の（名前）さん、あなたの運気番号は（乱数）です」と表示します。
その際に（年齢）には変数ageを、（名前）には変数 nameを、そして（乱数）には⑧で作った数を表示します。
11. 画面に「1：大吉 2：中吉 3：吉 4：凶」と表示します。

## 練習問題2

以下のJavaプログラムはエラーとなってしまいます。
各問題に対して修正を行い、正しい出力が得られるようにしてください。

```java
public class ModificationTask {

    public static void main(String[] args) {
        // 問題1:
        int operand1 = 8;
        int operand2 = 4;
        int result = operand1 - operand2;

        System.out.println("問題1: 修正後の式の結果 =  + result);

        // 問題2:
        double decimalValue = 12.75;
        int intValue = decimalValue;

        System.out.println("問題2: 追加した型変換後の整数値 = " + intValue);
    }
}
```
