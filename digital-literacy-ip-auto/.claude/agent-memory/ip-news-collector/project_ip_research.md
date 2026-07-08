---
name: project-ip-research
description: 知的財産権ニュース収集プロジェクトの背景、信頼できるソース、収集パターン
metadata:
  type: project
---

このプロジェクトは日本の著作権法・知的財産権に関するニュースを収集し、digital-literacy-ip-auto/data/research_results.json に保存するパイプラインの一部。

**Why:** デジタルリテラシー・IP分野の記事コンテンツ生成を支えるリサーチ基盤として機能する。

**How to apply:** 収集したデータは article-auto-generator エージェントが参照して記事を生成するため、JSON スキーマの整合性を維持すること。

## 信頼できる日本語ニュースソース（IP系）

- **ACCS**（コンピュータソフトウェア著作権協会）: https://www2.accsjp.or.jp/criminal/ — 毎年度の著作権侵害刑事事件を網羅。2026年度分は https://www2.accsjp.or.jp/criminal/2026/ で確認可能。
- **CODA**（コンテンツ海外流通促進機構）: https://coda-cj.jp/news/ — 海外での日本コンテンツ海賊版摘発ニュースに強い。
- **アニメ！アニメ！**: https://animeanime.jp/ — アニメ関連の著作権・海賊版ニュースに詳しい。
- **IP Force**: https://ipforce.jp/Hanketsu — 知財高裁・地裁の判決速報。
- **知財高裁公式**: https://www.ip.courts.go.jp/app/hanrei_jp/search — 直接判決検索が可能。

## 継続監視すべき事件・動向（2026年6月時点）

- 映画「文字抜き出し」サイト判決（2026年4月確定）: 日本初の判例として今後の類似事案に影響。
- ACCSの2026年度刑事事件リスト: 随時更新中。https://www2.accsjp.or.jp/criminal/2026/
- CODA経由の越境摘発: 中国・東南アジアでの日本コンテンツ海賊版への国際連携強化が継続中。

## 収集上の注意

- 「著作権法違反 逮捕 2026」の検索は最新ACCS・CODA・NHKニュースが高品質。
- site:nhk.or.jp の単独検索は機能しないことがあるため、ACCS直接フェッチが安定。
- トレント系ニュースは逮捕より「開示請求」事例が多い（実際の逮捕件数は少ない）。

See also: [[project-auto-pipeline]]
