# メトリクスとリファクタリング


## 課題：第12章 メトリクスとリファクタリング

[https://forms.gle/Bddd6KzTyTaRJanw5](https://forms.gle/Bddd6KzTyTaRJanw5)

## 練習問題1

第11章 単体テストとアサーションの練習問題2でテストした Bank クラスについて、BankTest テストクラスによるテストのカバレッジをMaven とJacocoを組み合わせて計測してください。

## 練習問題2

練習問題1で得たカバレッジの結果に基づき、カバレッジをより改善するためのテストケースを BankTestに追加してください。
さらに、再テストを行い、カバレッジが改善していることを確認してください。

## 練習問題3

次のMainクラスについて、SpotBugsによる静的解析を行ってください。
また、解析結果に従ってリファクタリングとリグレッションテストを行ってください。

```java
import java.util.*;

public class Main {
    public static void main(String[] args) {
        List list = new ArrayList();
        list.add(args[0]);
        list.add("word");
        if (args[0] == "hello") new Exception();
        for (Object s : list) System.out.print(s);
    }
}
```
