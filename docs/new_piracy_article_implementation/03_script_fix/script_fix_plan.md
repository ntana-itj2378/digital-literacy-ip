# ユーティリティスクリプトのパス修正計画

プロジェクト整理に伴い移動した `find_unlinked.js` が、正しいディレクトリ（`src/`）を参照できるように修正します。

## 1. 現状の課題
*   ファイル移動前：ルートディレクトリに配置。`__dirname` がルートを指していた。
*   ファイル移動後：`scripts/` ディレクトリに配置。`__dirname` が `scripts/` を指すようになり、相対パスで `src/` を見つけることができなくなった。

## 2. 修正内容
`scripts/find_unlinked.js` 内のパス定義を、親ディレクトリ（ルート）を経由するように変更します。

#### [MODIFY] [find_unlinked.js](file:///C:/Users/ntana/Documents/Antigravity_docs/digital-literacy-ip/scripts/find_unlinked.js)

```javascript
// 修正前
const articlesDir = path.join(__dirname, 'src', 'articles');
const indexHtmlPath = path.join(__dirname, 'src', 'index.html');

// 修正後
const articlesDir = path.join(__dirname, '..', 'src', 'articles');
const indexHtmlPath = path.join(__dirname, '..', 'src', 'index.html');
```

## 3. テスト計画書

### テスト項目 1: 未リンク記事の検出機能の正常動作
*   **目的**: 修正後のスクリプトが正しくファイルを読み込み、期待される出力を出すか確認する。
*   **手順**:
    1.  ターミナルで `node scripts/find_unlinked.js` を実行。
    2.  エラーが発生せず、「Unlinked Articles (Drafts not on index):」という見出しが表示されることを確認。
    3.  現在下書き状態の FILE 30（article-30）が正しくリストアップされることを確認。
*   **期待結果**: `article-30: 意見照会書の放置が招く悲劇` が出力に含まれている。

### テスト項目 2: パス解決の堅牢性
*   **目的**: 実行ディレクトリに依存せず動作することを確認する。
*   **手順**:
    1.  ルートディレクトリで `node scripts/find_unlinked.js` を実行。
    2.  `scripts` ディレクトリに移動して `node find_unlinked.js` を実行。
*   **期待結果**: いずれの場所から実行しても、正しいパス（`src/articles`）を解決し、同じ結果が得られる。
