# Spring Boot：ToDo管理APIのテスト（MockMvc）

> 提出ブランチ：`feature/51-springboot-todo-testing`（PRのbase：`main`）

この章では、APIの自動テストを書いて「壊れないCRUD」を作ります。

## ゴール

- `MockMvc` でエンドポイントのテストを書ける
- 正常系/異常系（バリデーション、404）をテストできる

## 前提

- `spring-boot-starter-test` はSpring Initializrで自動的に入っている想定です
- DBはH2（前章）でOKです

## 練習問題

### 練習問題1：起動テストを書く

`@SpringBootTest` でコンテキストが起動することを確認するテストを書いてください。

`src/test/java/com/example/todo/TodoApiApplicationTests.java`（ファイル名は任意）

```java
package com.example.todo;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
class TodoApiApplicationTests {
    @Test
    void contextLoads() {
    }
}
```

### 練習問題2：CRUDの統合テストを書く

次を満たすテストを書いてください。

- `POST /tasks` で作成できる（201）
- `GET /tasks` に作成したものが含まれる（200）
- `PUT /tasks/{id}` で更新できる（200）
- `DELETE /tasks/{id}` で削除できる（204）

### 練習問題3：異常系テストを書く

- タイトルが空なら `400`
- 存在しないIDは `404`

`src/test/java/com/example/todo/TaskApiIntegrationTest.java`（例）

```java
package com.example.todo;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.transaction.annotation.Transactional;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
@Transactional
class TaskApiIntegrationTest {

    @Autowired
    MockMvc mockMvc;

    @Autowired
    ObjectMapper objectMapper;

    @Test
    void crud_flow() throws Exception {
        MvcResult createdResult = mockMvc.perform(post("/tasks")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{\"title\":\"buy milk\"}"))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.id").isNumber())
                .andExpect(jsonPath("$.title").value("buy milk"))
                .andExpect(jsonPath("$.completed").value(false))
                .andReturn();

        JsonNode created = objectMapper.readTree(createdResult.getResponse().getContentAsString());
        long id = created.get("id").asLong();

        mockMvc.perform(get("/tasks/" + id))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(id));

        mockMvc.perform(put("/tasks/" + id)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{\"title\":\"buy milk\",\"completed\":true}"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.completed").value(true));

        mockMvc.perform(get("/tasks"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].id").isNumber());

        mockMvc.perform(delete("/tasks/" + id))
                .andExpect(status().isNoContent());

        mockMvc.perform(get("/tasks/" + id))
                .andExpect(status().isNotFound());
    }

    @Test
    void validation_error_when_title_blank() throws Exception {
        mockMvc.perform(post("/tasks")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{\"title\":\"\"}"))
                .andExpect(status().isBadRequest());
    }

    @Test
    void not_found_when_task_missing() throws Exception {
        mockMvc.perform(get("/tasks/999"))
                .andExpect(status().isNotFound());
    }
}
```

### 練習問題4：テストを実行する

```bash
./mvnw test
```

## 完了条件（チェックリスト）

- テストがgreenになっている
- APIの主要仕様がテストで守られている

## AIに質問する（この章の例）

次の例をそのままAIに投げてOKです（必要なら自分のコード/エラーに置き換えてください）。

```text
「『Spring Boot：ToDo管理APIのテスト（MockMvc）』を初心者向けに、たとえ話つきで説明して。最後に要点を3つにまとめて」
「この章の内容で理解確認クイズを5問作って（解答は最後にまとめて）」
「自分の実装を貼るのでレビューして。バグ/設計の危険箇所だけ指摘して、直し方はヒントで」
「この章の手順で詰まった。エラー文から原因候補と確認順を教えて」
```

---

## 課題提出

この章には提出課題があります。

1. 上記のハンズオン課題を完了する
2. GitHub で `feature/51-springboot-todo-testing` ブランチを作成し、PRを作成
3. [AI総合レビューツール](https://ai.studio/apps/drive/1AMqIqU4Bio4te7AWh5dly1Qzp7CesqP9?fullscreenApplet=true) でレビューを実行
4. 問題がなければ、スプレッドシートに **PR URL** と **完了日** を記入
