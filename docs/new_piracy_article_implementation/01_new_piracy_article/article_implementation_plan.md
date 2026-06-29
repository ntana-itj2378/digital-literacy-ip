# 記事再整理・リライト計画 (FILE 15, 16, 18, 29, 30)

ユーザー様の要望に基づき、カテゴリの再整理と FILE 29 の内容リライトを実施します。

## 実施内容

### 1. カテゴリの再整理 (`src/index.html`)
*   **海賊版 (piracyArticles) への移動**:
    *   FILE 15 (AI提訴)
    *   FILE 16 (Telegram逮捕)
    *   FILE 18 (ソシャゲ非公式サーバー)
*   **トレント (torrentArticles) の維持**:
    *   FILE 29 (監視ノードの罠)
*   **下書き状態の維持 (非表示)**:
    *   FILE 30 (意見照会書の放置) - インデックスから削除（または追加しない）

### 2. FILE 29 のリライト (`src/articles/article-29/article_draft_file29.md`)
*   **テーマ**: 監視ノード（ハニーポット）の仕組み
*   **具体例の追加**:
    *   2013年：産業制御システム（ICS）への攻撃調査（トレンドマイクロの実験等）
    *   2024年：IoT機器への攻撃分析（NICTERの観測レポート等）
*   **論理構成**: サイバーセキュリティの最前線で使われる「おとり調査」の技術が、トレントの違法利用者の特定にも応用されていることを解説。

### 3. ビルドとデプロイ
*   `node build.js` を実行し、`npx vercel --prod` で反映。

## 修正対象ファイル

#### [MODIFY] [index.html](file:///C:/Users/ntana/Documents/Antigravity_docs/digital-literacy-ip/src/index.html)
#### [MODIFY] [article_draft_file29.md](file:///C:/Users/ntana/Documents/Antigravity_docs/digital-literacy-ip/src/articles/article-29/article_draft_file29.md)

## 検証プラン
*   トップページの「海賊版」カテゴリに 15, 16, 18 が表示されていることを確認。
*   トップページの「トレント」カテゴリに 29 があり、内容がリライトされていることを確認。
*   FILE 30 がトップページに表示されていないことを確認。
