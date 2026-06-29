const fs = require('fs-extra');
const path = require('path');
const { globSync } = require('glob');
const { marked } = require('marked');

const dirs = globSync('src/articles/article-*', { absolute: true });
const articleNumbers = dirs.map(d => parseInt(path.basename(d).replace('article-', ''))).sort((a, b) => a - b);

dirs.forEach(d => {
  const mdFiles = globSync('*.md', { cwd: d });
  if (mdFiles.length === 0) return;

  const currentNum = parseInt(path.basename(d).replace('article-', ''));
  if (currentNum < 15) return; // 14以前は既存の綺麗なHTMLがあるので触らない

  const mdPath = path.join(d, mdFiles[0]);
  const markdownText = fs.readFileSync(mdPath, 'utf8');

  // 1. タイトル抽出
  let titleMatch = markdownText.match(/^#\s+(.+)$/m);
  let title = titleMatch ? titleMatch[1].replace(/FILE \d+:\s*/, '') : `FILE ${currentNum}`;

  // 2. Markdownをパース
  let html = marked.parse(markdownText);

  // 3. デザイン適用（既存記事のインラインスタイルを模倣）
  // <h1>のID等を除去
  html = html.replace(/<h1[^>]*>.*?<\/h1>/, `<h1>FILE ${currentNum}: ${title}</h1>`);
  
  // <h2>へのスタイル適用
  html = html.replace(/<h2[^>]*>/g, '<h2 style="color: var(--accent-gold); margin-bottom: 1rem; margin-top: 3rem;">');
  
  // <h3>へのスタイル適用
  html = html.replace(/<h3[^>]*>/g, '<h3 style="color: #fff; margin-bottom: 1rem; margin-top: 2rem;">');

  // 警戒ポイントのボックス化（> [!WARNING]）
  const warningRegex = /<blockquote[^>]*>[\s\S]*?<p>\[!WARNING\]([\s\S]*?)<\/p>[\s\S]*?<\/blockquote>/gi;
  html = html.replace(warningRegex, `<div style="text-align: center; padding: 1.5rem; background: rgba(239, 68, 68, 0.05); border-radius: 12px; border: 1px solid rgba(239, 68, 68, 0.2); margin: 2rem 0;">
    <p style="font-size: 0.9rem; margin-bottom: 0.5rem; color: #fff;">⚠️ 警戒ポイント</p>
    <p style="font-size: 1.1rem; font-weight: bold; color: var(--accent-danger); margin: 0;">$1</p>
  </div>`);

  // 参考文献セクションの装飾
  html = html.replace(/<h2[^>]*>参考文献<\/h2>\s*<ul>([\s\S]*?)<\/ul>/, `<section class="references">\n  <h4>Sources & References</h4>\n  <ul>$1</ul>\n</section>`);

  // 4. 次の記事リンク生成
  const nextNumIndex = articleNumbers.indexOf(currentNum) + 1;
  let nextArticleHtml = '';
  if (nextNumIndex < articleNumbers.length) {
    const nextNum = articleNumbers[nextNumIndex];
    const paddedNext = nextNum.toString().padStart(2, '0');
    nextArticleHtml = `
    <div style="margin-top: 3rem; text-align: center;">
        <a href="/articles/article-${paddedNext}/" class="glass" style="padding: 1rem 2.5rem; color: var(--accent-gold); text-decoration: none; border: 1px solid var(--accent-gold); font-weight: bold; transition: all 0.3s;">次の記事：FILE ${paddedNext} &rarr;</a>
    </div>`;
  }

  // 5. 最終テンプレートの組み立て
  const finalTemplate = `{% extends "main.njk" %}
{% set title = "${title}" %}
{% block content %}

<article>
    <nav style="margin-bottom: 2rem;">
        <a href="/" style="color: var(--accent-gold); text-decoration: none;">&larr; ポータルへ戻る</a>
    </nav>

    ${html}

    ${nextArticleHtml}
</article>

{% endblock %}
`;

  fs.writeFileSync(path.join(d, 'index.html'), finalTemplate);
  console.log(`Generated HTML for article-${currentNum}`);
});
