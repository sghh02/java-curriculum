# ネットワークアクセス


## 課題：第8章 ネットワークアクセス

[https://forms.gle/eBcCyoeiMsGWjEhVA](https://forms.gle/eBcCyoeiMsGWjEhVA)

## 練習問題1

URLクラスを用いて、以下のURLにある画像ファイルを取得し、所定の名前で自分のPCに保存するプログラムを作成してください。

- 画像ファイルのアドレス　https://dokojava.jp/favicon.ico
- 保存先のフォルダ　　　　(どこでもよい)
- 保存する際のファイル名　dj.ico

## 練習問題2

以下のような形式のデータを送ると、メールを送信してくれるサービスが「smtp.example.com」の60025番ポートで動作しているとします。

```java
HELO smtp.example.com
MAIL FROM: asaka@example.com　                // 送信元アドレス
RCPT TO: minato@example.com　                 // 宛先アドレス
DATA
From: asaka@example.com                      // 送信元アドレス
Subject: Please send me your RPG             // タイトル
Hello minato. I world like to play your RPG. // 本文(各業にピリオドで終了)
Could you please send it to me ?
.
QUIT                                         // 終了
```

上記のデータをサーバに送り、メールを発言するプログラムを作成してください。
ただし、サーバに送るデータの改行コードには¥r¥を使うものとします。

## 練習問題3

GitHub という Web 上のサービスがあります。
このサービスでは、登録ユーザーの情報などをWebAPIから操作でき、その仕様は以下の場所に公開されています。
[https://docs.github.com/ja/rest/reference](https://docs.github.com/ja/rest/reference)
HttpClient と Jacksonを用いて、ユーザー「miyabilink」の情報を取得し、そのブログサイトのURLを画面表示するプログラムを作成してください。

練習問題3のヒント

1. 上記URLのWebAPI仕様にアクセスできることを確認します。
WebAPIリファレンスのURLが変更になるなどしてアクセスできない場合は、「GitHubWebAPI リファレンス」などで検索してみてください。
2. このWebAPI 仕様では、「現実世界のGitHub ユーザーを意味する URL」がREST の哲学に沿って定められていますので、それに関する解説を探します(一部は英語表記となっている場合があります)。
3. 「全ユーザー」ではなく、「miyabilink」という 1ユーザーを意味するURLの姿を考えます。
4. 「miyabilink ユーザー」を意味するURLに、どの種類のHTTP メソッドを用いてリクエストを送れば、そのユーザーの情報(ブログURLを含む)を得られるかを考え、リファレンスの表記を確認します。
5. 「miyabilink ユーザー」の情報を取得するリクエストを送ったときにサーバから返されるレスポンスボディの形式がどのようなもので、特にブログURLの情報はどのようにして抽出すればよいかを検討します。
6. 「miyabilink ユーザー」の情報を取得する WebAPIの呼び出しには、特別な認証情報の追加は不要です。
WebAPIリファレンスで定められているリクエストヘッダを確認し、JavaプログラムからHTTP リクエストを送してみましょう。
