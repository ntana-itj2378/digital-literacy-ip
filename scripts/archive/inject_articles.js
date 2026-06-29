const fs = require('fs');
const glob = require('glob');
const path = require('path');

const dirs = glob.globSync('src/articles/article-*', { absolute: true });
const articlesData = [];

dirs.forEach(d => {
  const num = parseInt(path.basename(d).split('-').pop());
  if (num >= 15 && num <= 28) {
    const mds = glob.globSync(d + '/*.md');
    if (mds.length) {
      const content = fs.readFileSync(mds[0], 'utf8');
      
      const catMatch = content.match(/-\s*\*\*カテゴリ\*\*:\s*(.*)/);
      const tag = catMatch ? catMatch[1].trim() : 'CASE';
      
      const titleMatch = content.match(/^#\s+(.+)$/m);
      const title = titleMatch ? titleMatch[1].replace(/FILE \d+:\s*/, '').trim() : '';
      
      const descMatch = content.match(/##\s*概要\s*([\s\S]*?)(##|---|> \[!WARNING\])/);
      let desc = '';
      if (descMatch) {
        // clean up desc
        desc = descMatch[1].replace(/\n/g, '').trim();
        // limit to ~60 chars for the card
        if (desc.length > 65) desc = desc.substring(0, 65) + '...';
      }

      articlesData.push({
        num,
        str: `,\n{ url: "/articles/article-${num.toString().padStart(2, '0')}/", id: "${num.toString().padStart(2, '0')}", tag: "${tag.toUpperCase()}", title: "${title}", desc: "${desc}" }`
      });
    }
  }
});

articlesData.sort((a, b) => a.num - b.num);

const injectionString = articlesData.map(a => a.str).join('');

const indexPath = path.join(__dirname, 'src', 'index.html');
let indexHtml = fs.readFileSync(indexPath, 'utf8');

// Find the end of torrentArticles array. 
// Look for the line where torrentArticles is defined, then find the closing bracket
const torrentEndIndex = indexHtml.indexOf('] %}', indexHtml.indexOf('{% set torrentArticles'));
if (torrentEndIndex !== -1) {
  indexHtml = indexHtml.slice(0, torrentEndIndex) + injectionString + '\n' + indexHtml.slice(torrentEndIndex);
  fs.writeFileSync(indexPath, indexHtml);
  console.log('Successfully injected articles into src/index.html');
} else {
  console.log('Could not find the end of torrentArticles array in src/index.html');
}
