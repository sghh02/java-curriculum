# Week 7 HttpServer（URL にアクセスすると文字列が返る）

ここから Phase 3 です。Week 6 までは画面に表示するだけでした。今回は、ブラウザや curl からアクセスすると、Java のプログラムが文字列を返します。

これが API の最小形です。外部の API も、自分で作る API も、この形の応用になります。今回は `HttpServer` で文字列を1つ返すところまでを扱います。

## 実行のしかた

これまでと同じ `java ファイルのパス` で実行します。`HttpServer` は起動したままになります。止めるときは `Ctrl+C` を押します。

現場の Java は 8 ですが、学習は Java 21 で進めます。Java 8 との違いは、別の補講で扱います。

## まず押さえること

サーバーを作る流れは3行です。

```
HttpServer server = HttpServer.create(new InetSocketAddress(8080), 0);
server.createContext("/hello", new HelloHandler());
server.start();
```

- `HttpServer.create` … サーバー本体を作る。`8080` は入口の番号（ポート）。`0` は待ち行列の設定で、おまじないとして `0` にする
- `createContext` … URL のパスと担当者を結びつける。`/hello` にアクセスが来たら `HelloHandler` に任せる
- `start()` … 待ち受けを始める

担当者になるクラスは、`HttpHandler` インターフェースを実装します。Week 6 の `implements` と同じです。求められるのは `handle` メソッド1つです。

```
public void handle(HttpExchange exchange) throws IOException {
    ...
}
```

`HttpExchange` は、1回のやりとり（リクエストとレスポンス）を表す入れ物です。ここから返事を書き込みます。返事は次の順で作ります。

1. 返す文字列をバイト列にする（`getBytes`）
2. `sendResponseHeaders(200, バイト数)` でステータスコードと長さを伝える
3. `getResponseBody()` の出力先へバイト列を書き込む

`200` は「成功」のステータスコードです。順番を入れ替えてはいけません。先に書き込むとエラーになります。

出力先は使い終わったら閉じます。Week 6 で学んだ try-with-resources の出番です。閉じることで、返事が最後まで送られます。

`start()` を呼ぶと、`main` が終わってもプログラムは動き続けます。止めるときは、ターミナルで `Ctrl+C` を押します。

## ステップ1: 予測写経

次のお手本を1行ずつ写します。写す前に「この行は何をするか」を予測します。写し終えたら実行し、予測と合っているか確かめます。

保存先は次のとおりです。

`src/main/java/com/example/week07/01_40m_HttpServerで文字列を返す/HelloServerDemo.java`

```java
import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpHandler;
import com.sun.net.httpserver.HttpServer;
import java.io.IOException;
import java.io.OutputStream;
import java.net.InetSocketAddress;
import java.nio.charset.StandardCharsets;

public class HelloServerDemo {
    public static void main(String[] args) throws IOException {
        HttpServer server = HttpServer.create(new InetSocketAddress(8080), 0);
        server.createContext("/hello", new HelloHandler());
        server.start();
        System.out.println("起動しました: http://localhost:8080/hello");
    }
}

class HelloHandler implements HttpHandler {
    @Override
    public void handle(HttpExchange exchange) throws IOException {
        byte[] body = "Hello, Java!".getBytes(StandardCharsets.UTF_8);
        exchange.sendResponseHeaders(200, body.length);
        try (OutputStream os = exchange.getResponseBody()) {
            os.write(body);
        }
    }
}
```

実行は、リポジトリの直下で次のとおりです。

```bash
java "src/main/java/com/example/week07/01_40m_HttpServerで文字列を返す/HelloServerDemo.java"
```

起動したら、別のターミナルで次を実行します。`-i` を付けると、ステータスコードも見えます。

```bash
curl -i http://localhost:8080/hello
curl -i http://localhost:8080/nothing
```

ブラウザで `http://localhost:8080/hello` を開いても確かめられます。

写しながら、次を自分に問いかけてください。

- `main` は `start()` のあと、すぐ終わるか。プログラムは終わるか
- `/hello` にアクセスしたとき、動くのはどのクラスのどのメソッドか
- `/hello` 以外のパスにアクセスすると、どうなるか
- `handle` を呼んでいる行は、コードのどこにあるか
- `sendResponseHeaders` と `write` の順番を入れ替えると、どうなるか（試してよい）

## ステップ2: 暗写（設計メモから組み立てる）

お手本のコードは閉じます。次の設計メモだけを手がかりに、`HelloServerDemo` を書きます。丸暗記ではなく、設計をコードへ起こす練習です。書けたら実行し、`curl で同じ結果になるか確かめます。

- 実行用クラス `HelloServerDemo`。`main` は `throws IOException`
- クラス `HelloHandler` … `HttpHandler` を実装する
- `handle(HttpExchange exchange)` … `@Override` を付ける。`public void`。`throws IOException`
- `handle` の1行目 … `Hello, Java!` を UTF-8 のバイト列にして `byte[] body` へ入れる
- `handle` の2行目 … ステータスコード `200` と `body.length` を伝える
- `handle` の3行目以降 … `getResponseBody()` を try-with-resources で受け、`body` を書き込む
- main の1行目 … ポート `8080`、待ち行列 `0` で `HttpServer server` を作る
- main の2行目 … `/hello` と `new HelloHandler()` を結びつける
- main の3行目 … `start()` を呼ぶ。そのあと `起動しました: http://localhost:8080/hello` と表示する

## ステップ3: 自力

同じ問題フォルダに新しいファイル `PingServerDemo.java` を作ります。これまでのファイルは直しません。

テーマは「生きているか確かめる API」です。次のとおり書いてください。

- 実行用クラスは `PingServerDemo` にする。`main` は `throws IOException`
- ポートは `8081` にする。待ち行列は `0`
- クラス `PingHandler` を作る。`/ping` にアクセスすると `pong` を返す
- クラス `VersionHandler` を作る。`/version` にアクセスすると `v1` を返す
- 2つのハンドラとも、ステータスコードは `200` にする
- `main` で、1つの `HttpServer server` に `/ping` と `/version` の2つを結びつける
- `start()` のあと、`起動しました: http://localhost:8081` と表示する
- `curl -i http://localhost:8081/ping` で `pong` が返る
- `curl -i http://localhost:8081/version` で `v1` が返る

ヒント: `createContext` は、パスの数だけ呼びます。ハンドラのクラスは、パスごとに1つずつ作ります。

書けたら回答を `submissions/week07/01_40m_HttpServerで文字列を返す.md` に貼り、「レビューして」と言ってください。

今回のポイントは3つです。`HttpServer` は「パスと担当者の結びつけ」で動くこと。担当者は `HttpHandler` を実装した `handle` であること。返事は「ステータスコード、長さ、本文」の順に作ること。

（予測: お手本を実行したあと、`/nothing` にアクセスしたら何が返るでしょうか。ステータスコードも含めて予測してください）
