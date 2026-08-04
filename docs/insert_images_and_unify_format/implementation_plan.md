# 挿絵の挿入および記事フォーマットの統一計画

挿絵が入っていない13件の記事に対して、対応する画像を挿入するとともに、記事の構造や表記揺れ（である調からですます調への統一、不要なステータス表記の削除）を **FILE 01-01** に準拠する形に修正します。

## ユーザー確認事項 (User Review Required)

> [!IMPORTANT]
> **1. 不足している画像ファイルの自動生成について**
> 調査したところ、`src/img` ディレクトリ内には一部の記事に対応する画像ファイル（`img_article-03-01.png`, `img_article-03-02.png`, `img_article-03-03.png` の3件）のみが存在し、残りの10件の記事に対応する画像ファイルが存在しませんでした。
> 本計画では、不足している画像について `generate_image`（画像生成ツール）を使用し、各記事の内容に沿った高品質なイラストを自動生成して `src/img/` の各フォルダに保存するアプローチを提案します。この方針で進めてよろしいでしょうか？

> [!NOTE]
> **2. アーカイブ記事 (archive/article-01-17) の扱いについて**
> リストアップされた13件の中に、アーカイブ用ディレクトリ配下の [article-01-17](file:///c:/Users/ntana/Documents/Antigravity_docs/digital-literacy-ip/src/articles/archive/article-01-17/index.html) も含まれています。このファイルも本番の記事と同様にフォーマット統一および画像挿入の対象としてよろしいでしょうか？

---

## 修正の方針

### 1. 枠組み（HTML構造）の統一
`FILE 01-01` の枠組みに準じ、各記事を以下の構造に統一します。
* 最初のセクションを `<section class="glass article-card" style="margin-bottom: 3rem;">` とし、直後に挿絵画像の `div` コンテナを挿入します。
* 2番目のセクションを `<section class="glass article-card">` とします。
* 3番目のセクション（まとめなど）が外出しになっている場合は、2番目のセクションの中に含めるように統合します。
* 全体的にインデントや改行のズレを綺麗に整理します。

### 2. ですます調の統一
* 箇条書きや本文中で「である調」が使われている箇所を、自然な「ですます調（〜ました、〜です、〜になります）」にリライトします。

### 3. 不要なステータス表記の削除
* 一部の記事（`FILE 03-03` など）に存在する、以下のような「基本ステータス」ブロックおよびその周辺の `<hr>` タグを削除します。
  ```html
  <h2 style="color: var(--accent-gold); margin-bottom: 1rem; margin-top: 3rem;">基本ステータス</h2>
  <ul>...</ul>
  ```

---

## 提案する変更内容

### 各コンポーネントごとの変更

---
#### 01_p2p

##### [MODIFY] [article-01-17/index.html](file:///c:/Users/ntana/Documents/Antigravity_docs/digital-literacy-ip/src/articles/01_p2p/article-01-17/index.html)
* **画像**: `img_article-01-17.png` を生成・保存のうえ挿入。
* **枠組み**: 最初のセクションに画像用コンテナを追加。インデントのズレを補正。

---
#### 03_clips

##### [MODIFY] [article-03-01/index.html](file:///c:/Users/ntana/Documents/Antigravity_docs/digital-literacy-ip/src/articles/03_clips/article-03-01/index.html)
* **画像**: 既存の `img_article-03-01.png` を挿入。
* **枠組み**: 3つ目のセクションを2つ目のセクション内に統合。画像用コンテナを追加。

##### [MODIFY] [article-03-02/index.html](file:///c:/Users/ntana/Documents/Antigravity_docs/digital-literacy-ip/src/articles/03_clips/article-03-02/index.html)
* **画像**: 既存の `img_article-03-02.png` を挿入。
* **枠組み**: 最初のセクションの `class="glass article-card"` 欠落を補正、3つ目のセクションを統合。

##### [MODIFY] [article-03-03/index.html](file:///c:/Users/ntana/Documents/Antigravity_docs/digital-literacy-ip/src/articles/03_clips/article-03-03/index.html)
* **画像**: 既存の `img_article-03-03.png` を挿入。
* **ステータス**: 不要な「基本ステータス」ブロックを削除。
* **枠組み**: `glass article-card` のセクション構造に全面書き換え。箇条書きを段落に調整。
* **口調**: 箇条書きを含む各所を「ですます調」に統一。

##### [MODIFY] [article-03-04/index.html](file:///c:/Users/ntana/Documents/Antigravity_docs/digital-literacy-ip/src/articles/03_clips/article-03-04/index.html)
* **画像**: `img_article-03-04.png` を生成・保存のうえ挿入。
* **ステータス**: 不要な「基本ステータス」ブロックを削除。
* **枠組み**: `glass article-card` のセクション構造に全面書き換え。
* **口調**: タイムラインなどの箇条書きを「ですます調」に統一。

##### [MODIFY] [article-03-05/index.html](file:///c:/Users/ntana/Documents/Antigravity_docs/digital-literacy-ip/src/articles/03_clips/article-03-05/index.html)
* **画像**: `img_article-03-05.png` を生成・保存のうえ挿入。
* **ステータス**: 不要な「基本ステータス」ブロックを削除。
* **枠組み**: `glass article-card` のセクション構造に全面書き換え。
* **口調**: 各所を「ですます調」に統一。

---
#### 04_web

##### [MODIFY] [article-04-01/index.html](file:///c:/Users/ntana/Documents/Antigravity_docs/digital-literacy-ip/src/articles/04_web/article-04-01/index.html)
* **画像**: `img_article-04-01.png` を生成・保存のうえ挿入。
* **枠組み**: 3つ目のセクションを統合。インデント調整。画像挿入。

##### [MODIFY] [article-04-02/index.html](file:///c:/Users/ntana/Documents/Antigravity_docs/digital-literacy-ip/src/articles/04_web/article-04-02/index.html)
* **画像**: `img_article-04-02.png` を生成・保存のうえ挿入。
* **枠組み**: 最初のセクションの `class` 欠落を補正、3つ目のセクションを統合。画像挿入。
* **その他**: 32行目の誤字「電子計算機使用詐気が」を「電子計算機使用詐欺」に修正。

##### [MODIFY] [article-04-03/index.html](file:///c:/Users/ntana/Documents/Antigravity_docs/digital-literacy-ip/src/articles/04_web/article-04-03/index.html)
* **画像**: `img_article-04-03.png` を生成・保存のうえ挿入。
* **ステータス**: 不要な「基本ステータス」ブロックを削除。
* **枠組み**: `glass article-card` のセクション構造に全面書き換え。
* **口調**: 各所を「ですます調」に統一。

##### [MODIFY] [article-04-04/index.html](file:///c:/Users/ntana/Documents/Antigravity_docs/digital-literacy-ip/src/articles/04_web/article-04-04/index.html)
* **画像**: `img_article-04-04.png` を生成・保存のうえ挿入。
* **ステータス**: 不要な「基本ステータス」ブロックを削除。
* **枠組み**: `glass article-card` のセクション構造に全面書き換え。
* **口調**: 各所を「ですます調」に統一。

##### [MODIFY] [article-04-05/index.html](file:///c:/Users/ntana/Documents/Antigravity_docs/digital-literacy-ip/src/articles/04_web/article-04-05/index.html)
* **画像**: `img_article-04-05.png` を生成・保存のうえ挿入。
* **ステータス**: 不要な「基本ステータス」ブロックを削除。
* **枠組み**: `glass article-card` のセクション構造に全面書き換え。
* **口調**: 各所を「ですます調」に統一。

##### [MODIFY] [article-04-06/index.html](file:///c:/Users/ntana/Documents/Antigravity_docs/digital-literacy-ip/src/articles/04_web/article-04-06/index.html)
* **画像**: `img_article-04-06.png` を生成・保存のうえ挿入。
* **ステータス**: 不要な「基本ステータス」ブロックを削除。
* **枠組み**: `glass article-card` のセクション構造に全面書き換え。
* **口調**: 各所を「ですます調」に統一。

---
#### archive

##### [MODIFY] [archive/article-01-17/index.html](file:///c:/Users/ntana/Documents/Antigravity_docs/digital-literacy-ip/src/articles/archive/article-01-17/index.html)
* **画像**: `img_article-01-17.png` を生成・保存のうえ挿入。
* **枠組み**: 最初のセクションに画像用コンテナを追加。インデントのズレを補正。

---

## 検証計画 (Verification Plan)

### 手動検証
1. 修正されたすべての `index.html` ファイルで HTML 構造に不備（タグの閉じ忘れなど）がないか静的解析スクリプト等でチェック。
2. 実際に変更された記事ファイル（特に `glass article-card` に変更した部分や画像追加部分）の表示テストを行い、`FILE 01-01` と視覚的・構造的に一致しているか検証する。
