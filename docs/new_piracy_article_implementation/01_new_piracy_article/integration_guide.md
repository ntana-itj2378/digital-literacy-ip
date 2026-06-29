# ポータルサイト記事移植・量産ガイド

本ガイドは、別のPC端末で稼働しているポータルサイト（`digital-literacy-ip`）の本体ソースコードへ、今回作成した新規記事を統合・移植するための手順書です。

## 1. ディレクトリ構成の対応
本体ソースコードのあるPCで、以下の通りファイルを配置してください。

| 移植元（本環境） | 移植先（本体PC） | 説明 |
| :--- | :--- | :--- |
| `article_draft_fileXX.md` | `src/articles/content/` | 原稿テキスト（Markdown） |
| `discord_bot_article.njk` | `src/articles/templates/` | UIテンプレートパーツ |

## 2. 記事の量産フロー
新しい記事を追加する際は、以下のステップを繰り返します。

### Step 1: 原稿の作成
`template_article.md`（後述）を使用し、内容を執筆します。既存のトーン（警戒モード、法的事実重視）を維持してください。

### Step 2: Nunjucksマクロへの登録
本体の `index.njk` または `articles_list.njk` に、新規作成したテンプレートをインポートします。
```njk
{% import "templates/discord_bot_article.njk" as discord %}
{{ discord.render() }}
```

### Step 3: ビルドの実行
本体PCでビルドコマンドを実行し、成果物を確認します。
```bash
npm run build
# または
node build.js
```

## 3. 量産用テンプレート
以下の構成で原稿を作成することで、デザインの統一性を保てます。
- **Title**: 事件を象徴する簡潔なタイトル
- **File ID**: 通し番号（既存がFILE 14までの場合、15, 16...）
- **Caution Point**: ユーザーが最も注意すべき一行（引用形式）
- **Legal Base**: 根拠となる条文（著作権法、民法等）
