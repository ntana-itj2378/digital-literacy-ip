# 整理内容の確認 (Project Reorganization)

プロジェクトルートのクリーンアップと、役割の重複するファイルの整理を実施しました。

## 実施結果

### 1. フォルダの仕分け
*   **`scripts/`**: 現役のユーティリティ（`find_unlinked.js`）を格納。
*   **`scripts/archive/`**: 移行完了済みの使い捨てスクリプト（15ファイル）をアーカイブ。
*   **`docs/archive/`**: 過去の計画書や解析ログをアーカイブ。

### 2. ルートディレクトリの状態
整理後のルートディレクトリには、ビルドに必要なコアファイルのみが残っています。
*   コア: `src/`, `css/`, `build.js`, `package.json` 等
*   設定: `vercel.json`, `vite.config.js` 等
*   管理: `scripts/`, `docs/`, `node_modules/` 等

### 3. 重複の排除
*   インデックスチェック関連の複数のスクリプト（`check_index.js`, `check_index2.js`）をアーカイブし、最も高機能な `find_unlinked.js` に集約しました。

## ビルド確認
`node build.js` を実行し、ファイル構成の変更がビルドプロセスに影響を与えないことを確認済みです。
