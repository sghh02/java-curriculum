# 単体テストとアサーション


## 課題：第11章 単体テストとアサーション

[https://forms.gle/m7UhxRuu5LV6X3eS9](https://forms.gle/m7UhxRuu5LV6X3eS9)

## 練習問題1

以下のソースファイルBank.javaを検査する JUnitテストクラスBankTest.javaを作成してください。また、できるだけ多くの検査が行えるようなテストケースを記述してしてください。

```java
public class Bank {
    private String name; // 銀行名(必ず3文字以上が設定される)
    public String getName() {
        return this.name;
    }
    public void setName(String newName) {
        if (newName.length() <= 3) {
            throw new IllegalArgumentException("名前が不正です");
        }
        this.name = newName;
    }
}
```

## 練習問題2

練習問題1で作成したテストケースをコンパイルし、テストを実行してください。
また、テストの結果、Bank.javaに不具合が見つかった場合は、併せて修正してください
