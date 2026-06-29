# プロジェクト構成の整理および重複排除計画

現在のプロジェクトルートに散在するファイルを整理し、役割が重複するファイルをアーカイブ・削除することで、プロジェクトのメンテナンス性を向上させます。

## 1. 整理の目的
*   ルートディレクトリのクリーンアップ（コアファイルのみにする）
*   過去の移行作業で使用した使い捨てスクリプトのアーカイブ
*   役割が重複しているチェックツールの統合・整理

## 2. フォルダ構成の変更案

### 新規作成するフォルダ
*   **`scripts/`**: 現役で使用する、または参考のために残すユーティリティスクリプト
*   **`scripts/archive/`**: 移行完了により不要となった使い捨てスクリプト
*   **`docs/archive/`**: 過去の作業計画や分析データ（ルートにあるもの）

### ファイル移動の仕分け

| 移動元 (Root) | 移動先 | 備考 |
| :--- | :--- | :--- |
| `analyze_torrent.js` | `scripts/archive/` | 移行用・不要 |
| `check_drafts.js` | `scripts/archive/` | 移行用・不要 |
| `check_index.js` | `scripts/archive/` | `find_unlinked.js` と重複 |
| `check_index2.js` | `scripts/archive/` | `find_unlinked.js` と重複 |
| `cleanup.js` | `scripts/archive/` | 使い捨て |
| `find_unlinked.js` | `scripts/` | 現役（未リンク記事のチェック用） |
| `fix-encoding.js` | `scripts/archive/` | 使い捨て |
| `generate_articles.js` | `scripts/archive/` | 移行用・不要 |
| `inject_articles.js` | `scripts/archive/` | 移行用・不要 |
| `migrate.js` | `scripts/archive/` | 移行用・不要 |
| `migrate_njk.js` | `scripts/archive/` | 移行用・不要 |
| `move_categories.js` | `scripts/archive/` | 移行用・不要 |
| `move_drafts.js` | `scripts/archive/` | 移行用・不要 |
| `pack_numbers.js` | `scripts/archive/` | 移行用・不要 |
| `reorganize.js` | `scripts/archive/` | 移行用・不要 |
| `temp_extract.js` | `scripts/archive/` | 移行用・不要 |
| `implementation_plan.md` | `docs/archive/` | ルートの古い計画書 |
| `task.md` | `docs/archive/` | ルートの古いタスク |
| `torrent_analysis_dump.txt` | `docs/archive/` | 解析ログ |

### ルートに残すファイル（コア）
*   `src/`, `css/`, `docs/`, `node_modules/`, `dist/`, `_legacy/`, `.vercel/`, `.git/`
*   `build.js` (SSGビルドのメイン)
*   `package.json` / `package-lock.json`
*   `vercel.json`
*   `vite.config.js`
*   `.gitignore`

## 3. 重複ファイルの扱い
重複が確認された以下のファイルは、`scripts/archive/` に移動した後に、将来的に削除対象とします。
*   `check_index.js` / `check_index2.js` ( → `find_unlinked.js` で代替可能)

## 4. 実施手順
1.  ディレクトリ `scripts/archive` および `docs/archive` を作成。
2.  各ファイルを計画通りに移動。
3.  移動後、プロジェクトのビルド（`node build.js`）に影響がないことを確認。

---
**💡 ユーザーレビュー依頼**
この計画で問題なければ、一括で実行に移ります。
