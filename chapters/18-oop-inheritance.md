# 継承

> 提出ブランチ：`feature/18-oop-inheritance`（PRのbase：`develop`）

## 課題：chapter 10 継承

この章を学習したら、以下の練習問題に取り組んでください。

## 練習問題1

次の仕様に基づいて、各クラスを作成してください。

**仕様**
従業員を表すEmployeeクラスを作成します。
次のメンバ変数、メソッドを作成し、Employee.javaとして保存します。

- メンバ変数を作成する
    - 名前を表すnameをString型で宣言します。
- operationメソッドを作成します。
    - 引数：なし
    - 戻り値：なし
    - 処理内容：「xxxは通常業務を行ないます。」と表示します。　※ xxxはメンバ変数nameを示しています。

従業員の管理者を表すManagerクラスを、Employeeクラスを継承して作成します。
次のメソッドを作成し、Manager.javaとして保存します。

- managementメソッドを作成する
    - 引数：なし
    - 戻り値：なし
    - 処理内容：「xxxは管理業務を行ないます。」と表示します。　※ xxxはメンバ変数nameを示しています。

**提供コード**
下のMain.javaをコメントの指示（①～③）に基づいて追記します。その後、作成した他のソースファイルと同じフォルダ内に保存して動作確認し、実行結果が得られることを確認してください。

```java
public class Main {
    public static void main(String[] args) {
        Employee taro = new Employee();
        taro.name = "タロウ";

        Manager hanako = new Manager();
        hanako.name = "ハナコ";

        //①taroの持つoperationメソッドを呼び出します。
        //②hanakoの持つoperationメソッドを呼び出します。
        //③hanakoの持つmanagementメソッドを呼び出します。
    }
}
```

**実行結果**

```java
タロウは通常業務を行ないます。
ハナコは通常業務を行ないます。
ハナコは管理業務を行ないます。
```

## 練習問題2

次の仕様に基づいて、各クラスを作成してください。

**仕様**
RPGに登場する戦士を表すFighterクラスを作成します。
次のメンバ変数、コンストラクタを作成し、Fighter.javaとして保存します。

- メンバ変数を作成する
    - 職業名を表すnameをString型で宣言する
    - 攻撃力を表すatkをint型で宣言する
- コンストラクタを作成する
    - 引数：なし
    - 処理内容：
        - メンバ変数nameに、「戦士」を代入する
        - メンバ変数atkに、10を代入する
- attackメソッドを作成する
    - 引数：なし
    - 戻り値：なし
    - 処理内容：
        - 「xxxの攻撃!」と表示する。※xxxはメンバ変数nameの値
        - 「敵にyyyのダメージ!」と表示する。※yyyはメンバ変数atkの値

RPGに登場する魔法戦士を表すMagicFighterクラスを、Fighterクラスを継承して作成します。
次のメンバ変数、コンストラクタ、メソッドを追加し、MagicFighter.javaとして保存します。

- メンバ変数を作成する
    - 魔力を表すmpをint型で宣言する
- コンストラクタを作成する
    - 引数:なし
    - 処理内容：
        - メンバ変数nameに、「魔法戦士」を代入する
        - メンバ変数mpに、10を代入する
- attackメソッドをオーバーライドする
    - 処理内容：
        - 「xxxの魔法攻撃!」と表示する。xxxはメンバ変数name
        - 「敵にyyのダメージ!」と表示する。yyはメンバ変数atkとmpの合計値

**提供コード**
下記のMain.javaを作成した他のソースファイルと同じフォルダ内に保存して動作確認し、実行結果が得られることを確認してください。

```java
public class Main {
    public static void main(String[] args) {
        Fighter fighter = new Fighter();
        fighter.attack();

        MagicFighter magicFighter = new MagicFighter();
        magicFighter.attack();
    }
}
```

**実行結果**

```java
戦士の攻撃!
敵に10のダメージ!
魔法戦士の魔法攻撃!
敵に20のダメージ!
```

## AIに質問する（この章の例）

次の例をそのままAIに投げてOKです（必要なら自分のコード/エラーに置き換えてください）。

```text
「『継承』を初心者向けに、たとえ話つきで説明して。最後に要点を3つにまとめて」
「この章の内容で理解確認クイズを5問作って（解答は最後にまとめて）」
「この章の練習問題で詰まった。答えを丸ごとではなく、方針→ヒント→確認質問の順で教えて」
「overrideのルールと、`super` を使うタイミングを例で教えて」
```

---

## 課題提出

この章には提出課題があります。

1. 上記の練習問題を完了する
2. GitHub で `feature/18-oop-inheritance` ブランチを作成し、PRを作成
3. [AI総合レビューツール](https://ai.studio/apps/drive/1AMqIqU4Bio4te7AWh5dly1Qzp7CesqP9?fullscreenApplet=true) でレビューを実行
4. 問題がなければ、スプレッドシートに **PR URL** と **完了日** を記入
