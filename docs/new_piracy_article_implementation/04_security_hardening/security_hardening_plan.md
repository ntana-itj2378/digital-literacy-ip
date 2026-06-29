# セキュリティ強化実装計画 (Security Hardening Plan)

本計画では、NovelManagerでの実績（環境変数管理、ログ制御、内部情報保護）を基に、本ポータルサイト（digital-literacy-ip）の堅牢性を高めるための具体的な実装内容を定義します。

## 1. 戦略：多層防御 (Defense in Depth)
静的サイトとしての特性を活かし、ネットワーク（ヘッダー）、アプリケーション（ロガー）、および運用（エラーページ）の各レイヤーで防御を固めます。

## 2. 実装詳細

### A. HTTPセキュリティヘッダーの設定 (`vercel.json`)
Vercelのインフラレベルで以下のヘッダーを強制し、ブラウザ側での攻撃を遮断します。

| ヘッダー | 設定内容 | 目的 |
| :--- | :--- | :--- |
| `Content-Security-Policy` | `default-src 'self' ...` | 信頼されたソース以外のスクリプト実行・リソース読み込みを禁止。 |
| `X-Frame-Options` | `DENY` | 他サイトのiframe内での表示を禁止し、クリックジャッキングを防止。 |
| `X-Content-Type-Options` | `nosniff` | ブラウザによるMIMEタイプの誤認を利用した攻撃を防止。 |
| `Referrer-Policy` | `strict-origin-when-cross-origin` | 外部サイト遷移時のリファラ情報漏洩を最小限に抑制。 |
| `Permissions-Policy` | `camera=(), microphone=(), ...` | 使用しないブラウザ機能（位置情報、カメラ等）を完全に無効化。 |

### B. プロダクション・ロガーの導入 (`src/js/utils/logger.js`)
開発時の利便性を保ちつつ、本番環境での情報漏洩を防ぎます。
*   **開発環境**: 全ての `log`, `info`, `warn`, `error` を出力。
*   **本番環境**: `error` のみを出力し、かつ詳細なスタックトレースや内部オブジェクトの露出を抑制。

### C. カスタム404エラーページの作成 (`src/404.html`)
デフォルトのサーバーエラーページを隠蔽し、安全かつブランドに沿ったユーザー体験を提供します。

## 3. 修正・新規作成ファイル

#### [NEW] [vercel.json](file:///C:/Users/ntana/Documents/Antigravity_docs/digital-literacy-ip/vercel.json)
```json
{
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        { "key": "Content-Security-Policy", "value": "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data:; connect-src 'self';" },
        { "key": "X-Frame-Options", "value": "DENY" },
        { "key": "X-Content-Type-Options", "value": "nosniff" },
        { "key": "Referrer-Policy", "value": "strict-origin-when-cross-origin" },
        { "key": "Permissions-Policy", "value": "camera=(), microphone=(), geolocation=()" }
      ]
    }
  ]
}
```

#### [NEW] [logger.js](file:///C:/Users/ntana/Documents/Antigravity_docs/digital-literacy-ip/src/js/utils/logger.js)
```javascript
const isProd = process.env.NODE_ENV === 'production';

export const logger = {
    log: (...args) => { if (!isProd) console.log(...args); },
    warn: (...args) => { if (!isProd) console.warn(...args); },
    error: (msg, error) => {
        if (isProd) {
            console.error(`[System Error]: ${msg}`);
            // 本番では詳細なエラーオブジェクトを露出させない
        } else {
            console.error(msg, error);
        }
    }
};
```

#### [NEW] [404.html](file:///C:/Users/ntana/Documents/Antigravity_docs/digital-literacy-ip/src/404.html)
ブランドデザインに合わせたカスタム404ページ。

## 4. 検証プラン
*   **ヘッダー検証**: デプロイ後、`curl -I` またはブラウザツールでヘッダーが期待通りであることを確認。
*   **ログ抑制確認**: 本番ビルド版で `logger.log` が出力されないことを確認。

---
**💡 承認依頼**
この詳細プランで実装を開始してよろしいでしょうか？
承認後、直ちに `vercel.json` の作成とロガーの導入、およびサイトの再ビルドを行います。
