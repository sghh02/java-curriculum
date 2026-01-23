# 非標準ライブラリの活用


## 課題：第5章 非標準ライブラリの活用

[https://docs.google.com/forms/d/e/1FAIpQLScKbAXDGcL8A5Gs5ugjlA5EHYGDlyXIbfg1NJ2KQAAwe7J9UA/viewform?usp=sf_link](https://docs.google.com/forms/d/e/1FAIpQLScKbAXDGcL8A5Gs5ugjlA5EHYGDlyXIbfg1NJ2KQAAwe7J9UA/viewform?usp=sf_link)

## 練習問題1

commons-langライブラリのJAR ファイル「commons-langjar」が、
c:*javalibフォルダにあるとします。
このライブラリを利用しているソースコードMain.javaをコンパイルして実行するために入力するコマンドを、「」を埋めて完成させてください(なお、Main.java 以外にはソースファイルは作成していないものとする)。

**コンパイル**

```java
> javac 「 1 」 ️Main.java
```

**実行**

```java
> java 「 2 」　Main
```

## 練習問題2

第1章の練習問題1(p.53)の条件①を以下のように修正した課題を実施してください。
旧：書名と発行日が同じであれば等価なものと判定され
↓
新：書名と発行日とコメントが同じであれば等価なものと判定され

その際、commons-langに含まれる以下のクラスを利用してください。
各クラスの詳細については、commons-langの公式Webサイトに掲載されているユーザーガイド(APIリファレンス)を参照してください。
HashCodeBuilder EqualsBuilder CompareToBuilder
