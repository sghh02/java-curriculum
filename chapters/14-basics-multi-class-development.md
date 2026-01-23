# 複数クラスを用いた開発


## 課題：chapter 6 複数クラスを用いた開発

[https://forms.gle/7kxVsqMVmT5u6ndU7](https://forms.gle/7kxVsqMVmT5u6ndU7)

## 練習問題1

次のソースコードを分解してください。

```java
public class Main {
    public static void main(String[] args) {
	    	displayStart();
        displaySum(5, 3);
        displayProduct(4, 6);
    }

    // 文字を表示するメソッド
    public static void displayStart() {
    	System.out.println("足し算と掛け算を行います！");
    }

    // 足し算の結果を表示するメソッド
    public static void displaySum(int a, int b) {
        int sum = addNumbers(a, b);
        System.out.println("Sum: " + sum);
    }

    // 掛け算の結果を表示するメソッド
    public static void displayProduct(int x, int y) {
        int product = multiplyNumbers(x, y);
        System.out.println("Product: " + product);
    }

    // 足し算をするメソッド
    public static int addNumbers(int num1, int num2) {
        return num1 + num2;
    }

    // 掛け算するメソッド
    public static int multiplyNumbers(int num1, int num2) {
        return num1 * num2;
    }
}
```

## 練習問題2

練習問題1で分割したクラスのパッケージを作成してそのパッケージに移動させてください。

## 練習問題3

[APIリファレンス](https://docs.oracle.com/javase/jp/21/docs/api/)でRandomクラスを調べ、1 ~ 100の数値をランダムに生成するメソッドを作成してください。
上記で作成したメソッドの値をmultiplyNumbersメソッドの第二引数として渡すようにして、multiplyNumbersの返り値が100を超えたら、”掛け算の値が100を超えました”と表示してください。
