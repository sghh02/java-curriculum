# さまざまなファイル形式


## 課題：第7章 さまざまなファイル形式

[https://forms.gle/kVeBKTZhkGmB1tJWA](https://forms.gle/kVeBKTZhkGmB1tJWA)

## 練習問題1

次のような内容のプロパティファイル(pref.properties)があるとします。

```java
tokyo.capital = 東京
tokyo.food = 寿司
aichi.capital = 名古屋
aichi.food = 味噌カツ
```

このファイルを読み取り、aichi.capitalとaichi.foodの内容を「名古屋：味噌カツ」の形式で画面に表示するプログラムを作成してください。

## 練習問題2

練習問題1を、ResourceBundleを用いて実現するプログラムを作成してください。
なお、プロパティファイルはクラスパス直下に配置されているものとします。

## 練習問題3

次のような「社員クラス」と「部署クラス」があります。

```java
class Employee {
	String name;
	int age;
}
```

```java
class Department {
	String name;
	Employee leader;
}
```

「総務部」のリーダー「田中太郎(41歳)」のインスタンスをJVM内に生成したうえで、直列化機構を使ってファイル company.dat に書き込むプログラムを作成してください。
なお、上記の2つのクラスを必要な範囲で修正してください。
