# JVM制御とリフレクション


## 課題：第4章 JVM制御とリフレクション

[https://docs.google.com/forms/d/e/1FAIpQLSeczpMdBElca9eHf2fP3Ew4IiI0TKj_cBZREMD7DmSHTDj7wg/viewform?usp=sf_link](https://docs.google.com/forms/d/e/1FAIpQLSeczpMdBElca9eHf2fP3Ew4IiI0TKj_cBZREMD7DmSHTDj7wg/viewform?usp=sf_link)

## 練習問題1

次のような動作をする クラス Launcher を、必要に応じてAPIリファレンスを参照しながら開発してください(例外処理は省略してかまいません)。

1.コマンドライン引数から、次の2つの情報を受け取る。

- 第1引数・・・起動すべきクラスの FQCN
- 第2引数・・・起動方法を示す文字(Eまたは1)

2.現在のメモリ使用量を表示する。

3.FQCNのクラスが持つ、すべてのメソッド名を画面に表示する。

4.指定された方法によって次のように起動する。

- Eの場合・・・ProcessBuilder で別プロセスとして起動する
- Iの場合・・・・リフレクションでmain メソッドを呼び出す

5.現在のメモリ使用量(MB単位)を表示する。

6.このプログラムが終了する際には、起動に成功した場合は0、そうでなければ1を終了コードとする。

## 練習問題2

起動すると要素数 1280000のlong型配列を確保するだけの処理を行うプログラムMemoryEaterを作成し、練習問題1で作成したLauncherで2通りの起動を試してください。
なお、MemoryEaterは起動直後に次のような表示を行うものとします。

- ロケール言語が日本語の場合・・・・「メモリを消費しています…」
- ロケール言語が日本語以外の場合・・・「eating memory …」
