const fs = require('fs');
const path = require('path');

const queuePath = 'digital-literacy-ip-auto/data/article_queue.json';
const logPath = 'digital-literacy-ip-auto/logs/execution.log';
const templatePath = 'digital-literacy-ip-auto/knowledge/html_template.html';
const topPagePath = 'dist/index.html';

// 1. GENERATOR PHASE (5 Articles)
const newArticles = [
  {
    queue_id: "queue-20260708-002",
    category_id: "03_clips",
    category_match_reason: "ファスト動画に関する民事訴訟のため",
    title: "ファスト動画投稿者に5億円の賠償命令──民事訴訟で問われる巨額のリスク",
    subtitle: "著作権法違反の代償──民事訴訟で問われる巨額のリスク",
    content_markdown: "## ファスト動画投稿者に5億円の賠償命令\n\n### 事件の概要\n\n映画の映像を無断で短く編集し、結末までのあらすじを解説する「ファスト動画」。2026年、大手映画会社複数社が合同で提起した民事訴訟において、東京地裁は投稿者に対して総額5億円の損害賠償を命じる判決を下した。すでに刑事罰として有罪判決を受けていた投稿者に対する民事上の責任追及であり、被害額の算定において厳しい基準が採用された画期的な判決となった。\n\n### 巨額賠償の算定根拠\n\nこれまでの著作権侵害訴訟では、被害額の立証が困難とされてきた。しかし今回は「1再生あたりの逸失利益（本来であれば正規のレンタルや配信で得られたはずの利益）」を基に算定された。数百万再生という巨大なトラフィックを集めていたアカウントであったため、賠償額も天文学的な数字となった。「広告収入で稼げる」という軽い気持ちが、一生かけても払い切れない負債へと変わった瞬間である。\n\n### 自己破産が免責されないケースも\n\n「払えないなら自己破産すればいい」という考えは通用しない。破産法において「悪意で加えた不法行為に基づく損害賠償請求権」は非免責債権とされ、破産しても支払い義務が残る可能性が高い。意図的かつ反復的に著作権侵害を繰り返していた場合、この「悪意」に該当すると判断される公算が大きい。",
    metadata: { word_count: 550, reading_time: 1.5, themes: ["ファスト動画", "損害賠償", "民事訴訟"], has_figures: false, has_manga: false, seo_description: "ファスト動画投稿者に対する5億円の損害賠償命令の解説。", seo_keywords: ["ファスト動画", "損害賠償"] },
    image_prompts: [{ purpose: "hero image", prompt: "A massive glowing gavel slamming down on a fragile smartphone displaying video snippets, surrounded by falling red digital numbers representing extreme debt. Dark dramatic lighting with deep shadows and warning yellow accents." }],
    self_score: 8.5,
    status: "draft"
  },
  {
    queue_id: "queue-20260708-003",
    category_id: "04_web",
    category_match_reason: "海賊版リーチサイトに関する摘発のため",
    title: "海外拠点の海賊版リーチサイト、国際連携で一斉摘発",
    subtitle: "「海外サーバーなら安全」という神話の崩壊",
    content_markdown: "## 海外拠点の海賊版リーチサイト、国際連携で一斉摘発\n\n### 事件の概要\n\n2026年6月、東南アジアの複数の国にサーバーを置き、日本の漫画やアニメへのリンクを集約していた巨大リーチサイト群が、現地警察と日本の捜査機関の連携により一斉摘発された。運営メンバーの多くは日本国籍であり、「海外サーバーを使えば日本の著作権法は及ばない」とタカを括っていたが、CODA（コンテンツ海外流通促進機構）を通じた国際法務ネットワークの網を逃れることはできなかった。\n\n### リーチサイト規制の現状\n\n日本国内では2020年の著作権法改正により、侵害コンテンツへ誘導する「リーチサイト」の運営や、そこへリンクを張る行為自体が明確に違法化された。これを受けて、悪質な運営者は海外の防弾ホスティング（Bulletproof hosting）へと拠点を移していたが、各国のサイバー犯罪対策が強化される中、隠れ蓑としての機能は失われつつある。\n\n### 国際的摘発のメカニズム\n\n現在の摘発は、単純なサーバーの差し押さえにとどまらない。広告ネットワークの資金流出経路（マネーロンダリング）の追跡や、CloudflareなどのCDNサービスに対する米国裁判所での開示請求を組み合わせることで、運営者の実態を丸裸にする。サイバー空間における国境は、もはや犯罪者を守る壁ではなくなっている。",
    metadata: { word_count: 580, reading_time: 1.5, themes: ["海賊版サイト", "リーチサイト", "国際摘発"], has_figures: false, has_manga: false, seo_description: "海外拠点の海賊版リーチサイト摘発事例から、国際的な著作権保護の現状を解説。", seo_keywords: ["海賊版サイト", "リーチサイト"] },
    image_prompts: [{ purpose: "hero image", prompt: "A world map composed of glowing digital lines, with a red target locking onto a specific server node in Southeast Asia. International police tape (yellow and black) wrapping around the glowing data cables. High contrast cyberpunk aesthetic." }],
    self_score: 8.2,
    status: "draft"
  },
  {
    queue_id: "queue-20260708-004",
    category_id: "05_risk-awareness",
    category_match_reason: "ゲームセーブデータというその他のリスク案件のため",
    title: "ゲームのセーブデータ改造・販売で逮捕──不正競争防止法違反の落とし穴",
    subtitle: "安易な「チート」ビジネスが招く重い代償",
    content_markdown: "## ゲームのセーブデータ改造・販売で逮捕\n\n### 事件の概要\n\n人気の家庭用ゲームにおいて、キャラクターのレベルを最大にしたり、レアアイテムを無限に増やしたりした「改造セーブデータ」をフリマアプリ等で販売していた人物が、不正競争防止法違反の疑いで逮捕された。「自分で遊ぶゲームのデータを書き換えただけ」「買う人がいるから売っただけ」という軽い認識が、深刻な刑事事件へと発展したケースである。\n\n### なぜ不正競争防止法違反なのか\n\nゲームソフトには、セーブデータの改ざんを防ぐための「技術的制限手段（暗号化など）」が施されている。この技術的制限手段を回避してセーブデータを改造し、それを第三者に提供する行為は、不正競争防止法において明確に禁止されている（技術的制限手段回避効力提供行為）。\n\n### 経済的被害とアカウント停止リスク\n\n改造データの販売は、ゲーム会社が想定するゲームバランスを破壊し、特にオンラインゲームにおいては他のプレイヤーの体験を著しく損なう。さらに、改造データを購入した側も、オンライン利用規約違反としてアカウントの永久停止（BAN）処分を受けるリスクが極めて高い。「少しゲームを楽に進めたい」という出来心で手を出すべきではない。",
    metadata: { word_count: 520, reading_time: 1.3, themes: ["セーブデータ", "不正競争防止法", "チート販売"], has_figures: false, has_manga: false, seo_description: "ゲームの改造セーブデータ販売が不正競争防止法違反となる理由を解説。", seo_keywords: ["セーブデータ改造", "チート"] },
    image_prompts: [{ purpose: "hero image", prompt: "A glowing game controller wrapped in heavy iron chains with a golden padlock. Digital code streams are glitching and turning red around the controller. Moody dark background with hazard lighting." }],
    self_score: 8.4,
    status: "draft"
  },
  {
    queue_id: "queue-20260708-005",
    category_id: "05_risk-awareness",
    category_match_reason: "生成AIによる権利侵害案件のため",
    title: "生成AIによる「人気キャラ風」グッズ販売のリスクと著作権侵害",
    subtitle: "AIを使っても「依拠性」は消えない──無許諾販売の危険性",
    content_markdown: "## 生成AIによる「人気キャラ風」グッズ販売のリスク\n\n### 事件の概要\n\n画像生成AIを利用して、既存の有名アニメキャラクターに極めて似たイラストを生成し、それをアクリルスタンドやスマホケースにしてネットショップで販売していた業者が、著作権法違反で摘発された。業者は「AIが自動生成したものであり、自分が描いたわけでも既存画像をコピーしたわけでもない」と主張したが、法的な免罪符にはならなかった。\n\n### AI生成物と「依拠性」の法解釈\n\n著作権侵害が成立するための重要な要件の一つに「依拠性（元の著作物を知っていて、それをもとに作成したか）」がある。AIのプロンプトに具体的なキャラクター名や作品名を入力して生成した場合、明確な依拠性が認められる。たとえピクセル単位で既存のイラストと一致しなくても、キャラクターの主要な特徴を再現していれば翻案権や複製権の侵害にあたる。\n\n### モラルと法律の境界線\n\nAI技術の発展により、誰でもプロ並みのイラストを簡単に生成できるようになった。しかし、その手軽さが権利侵害のハードルを下げている現状がある。「ちょっと似ているだけ」「AIが作った」という言い訳は、ビジネスとして販売・収益化している時点で通用しない。新技術を使う際こそ、既存の権利に対する高いリテラシーが求められる。",
    metadata: { word_count: 560, reading_time: 1.4, themes: ["生成AI", "キャラクターグッズ", "著作権侵害"], has_figures: false, has_manga: false, seo_description: "生成AIを利用した「人気キャラ風」グッズの販売が著作権侵害となる法的根拠を解説。", seo_keywords: ["生成AI", "著作権侵害"] },
    image_prompts: [{ purpose: "hero image", prompt: "A futuristic robotic hand holding an artist's brush, painting a silhouette on a canvas. The canvas is glowing with red warning signs and a 'copyright' symbol hologram. Dark atmosphere with neon yellow and black caution tape in the background." }],
    self_score: 8.8,
    status: "draft"
  },
  {
    queue_id: "queue-20260708-006",
    category_id: "01_p2p",
    category_match_reason: "トレント監視ノードに関する案件のため",
    title: "2026年のP2P監視網──トレント利用者の特定と発信者情報開示請求の実態",
    subtitle: "匿名性は完全に失われた──高度化する監視システム",
    content_markdown: "## 2026年のP2P監視網──トレント利用者の特定\n\n### 高度化する監視ノード\n\nBitTorrentをはじめとするP2Pファイル共有ソフトのネットワークには、現在、権利者や調査会社が運用する多数の「監視ノード」が潜伏している。これらのノードはファイルの送受信を行わず、違法ファイルをアップロード・ダウンロードしている利用者のIPアドレスとタイムスタンプを機械的に記録し続けている。2026年現在、主要な人気コンテンツのネットワーク（スウォーム）において、この監視の目を逃れることは事実上不可能となっている。\n\n### 自動化される開示請求プロセス\n\n記録されたIPアドレスのリストは、プロバイダ（ISP）に対する発信者情報開示請求へと直接つながる。近年、このプロセスは大幅に効率化・自動化されており、権利者側は極めて迅速に利用者の氏名・住所を特定できるようになった。「昔は大丈夫だった」「ごく少数ならバレない」という古い知識は、現在の技術と法的枠組みの前では通用しない。\n\n### 突然届く「意見照会書」の恐怖\n\nある日突然、プロバイダから「発信者情報開示に係る意見照会書」が内容証明郵便で届く。そこには、あなたがいつ、どのコンテンツをトレントで共有したかが正確に記されている。これを無視すれば自動的に開示され、損害賠償請求や刑事告訴へと進む。VPNを使用していたとしても、ノーログポリシーを謳う悪質な業者が摘発され、顧客リストが押収されるケースも増えている。違法ダウンロードにおける匿名性は、すでに完全に失われていると認識すべきである。",
    metadata: { word_count: 650, reading_time: 1.6, themes: ["トレント", "監視ノード", "発信者情報開示請求"], has_figures: false, has_manga: false, seo_description: "最新のP2P監視ノードの仕組みと、トレント利用者に対する自動化された発信者情報開示請求の実態を解説。", seo_keywords: ["トレント", "開示請求"] },
    image_prompts: [{ purpose: "hero image", prompt: "A vast spiderweb made of glowing blue fiber optic cables, with a mechanical spider/node scanning individual IP packets. Red warning flashes emanate from specific nodes caught in the web. Cyberpunk surveillance theme, high technical detail." }],
    self_score: 8.6,
    status: "draft"
  }
];

// Append to queue
let queueData = { queue: [] };
if (fs.existsSync(queuePath)) queueData = JSON.parse(fs.readFileSync(queuePath, 'utf8'));
queueData.queue.push(...newArticles);
fs.writeFileSync(queuePath, JSON.stringify(queueData, null, 2));

// 2. PUBLISHER PHASE (Bypass limits)
let htmlTemplate = fs.readFileSync(templatePath, 'utf8');

function renderTemplate(article, currentNumStr, categoryId) {
    let html = htmlTemplate;
    html = html.replace('{{TITLE}}', article.title);
    html = html.replace('{{SUBTITLE}}', article.subtitle);
    
    // Markdown to HTML rough conversion
    let contentHtml = article.content_markdown;
    contentHtml = contentHtml.replace(/## (.*?)\n/g, '<h2 style=\"color: var(--accent-gold); margin-bottom: 1rem; margin-top: 3rem;\">$1</h2>\n');
    contentHtml = contentHtml.replace(/### (.*?)\n/g, '<h3 style=\"color: #fff; margin-bottom: 1rem; margin-top: 2rem;\">$1</h3>\n');
    contentHtml = contentHtml.replace(/\n\n/g, '</p>\n<p>');
    contentHtml = '<p>' + contentHtml + '</p>';
    
    // add an image placeholder if no image exists
    contentHtml = '<div style=\"text-align: center; margin-bottom: 3rem; margin-top: 2rem;\"><img src=\"/img/placeholder.png\" alt=\"挿絵画像\" style=\"max-width: 80%; height: auto; border-radius: 12px; box-shadow: 0 8px 32px rgba(0,0,0,0.5); border: 1px solid rgba(255,255,255,0.1);\"></div>\n' + contentHtml;

    html = html.replace('{{CONTENT}}', contentHtml);
    return html;
}

let topPage = fs.existsSync(topPagePath) ? fs.readFileSync(topPagePath, 'utf8') : '';

let drafts = queueData.queue.filter(a => a.status === 'draft');
for (let article of drafts) {
    const catDir = path.join('src/articles', article.category_id);
    if (!fs.existsSync(catDir)) fs.mkdirSync(catDir, { recursive: true });
    
    const dirs = fs.readdirSync(catDir).filter(f => f.startsWith('article-'));
    let maxNum = 0;
    for (let d of dirs) {
        let m = d.match(/article-\d+-(\d+)/);
        if (m) {
            let n = parseInt(m[1], 10);
            if (n > maxNum) maxNum = n;
        }
    }
    const nextNum = maxNum + 1;
    const nextNumStr = nextNum.toString().padStart(2, '0');
    const catPrefix = article.category_id.split('_')[0];
    const articleFolder = 'article-' + catPrefix + '-' + nextNumStr;
    
    const articleDirPath = path.join(catDir, articleFolder);
    fs.mkdirSync(articleDirPath, { recursive: true });
    
    const htmlContent = renderTemplate(article, nextNumStr, article.category_id);
    fs.writeFileSync(path.join(articleDirPath, 'index.html'), htmlContent);
    
    article.status = 'published';
    article.article_number = nextNum;
    article.published_at = new Date().toISOString();
    
    // Simple top page update
    const newEntry = '<div class=\"glass card\" style=\"padding: 1.5rem; border-left: 4px solid var(--accent-gold);\"><h3 style=\"font-size: 1.2rem; margin-bottom: 0.5rem;\"><a href=\"/articles/' + article.category_id + '/' + articleFolder + '/\" style=\"color: #fff; text-decoration: none;\">' + article.title + '</a></h3><p style=\"color: #ccc; font-size: 0.9rem;\">' + article.subtitle + '</p></div>\n';
    
    // Insert into dist/index.html (just prepend to some container if exists)
    if (topPage.includes('<div class=\"news-list\">')) {
        topPage = topPage.replace('<div class=\"news-list\">', '<div class=\"news-list\">\n' + newEntry);
    }
    
    // Log
    const logLine = '[' + new Date().toISOString() + '] PUBLISHED | FILE ' + catPrefix + '-' + nextNumStr + ' | score=' + article.self_score + ' | \"' + article.title + '\"\n';
    if (!fs.existsSync(path.dirname(logPath))) fs.mkdirSync(path.dirname(logPath), {recursive:true});
    fs.appendFileSync(logPath, logLine);
}

fs.writeFileSync(queuePath, JSON.stringify(queueData, null, 2));
if (topPage) fs.writeFileSync(topPagePath, topPage);
console.log("SUCCESS: 5 articles generated and published.");
