const fs = require('fs');
const content = fs.readFileSync('src/index.html', 'utf8');

const torrentArticlesMatch = content.match(/{% set torrentArticles = \[([\s\S]*?)\] %}/);
if (torrentArticlesMatch) {
  const lines = torrentArticlesMatch[1].split('\n').filter(l => l.trim().startsWith('{ url'));
  lines.forEach(l => {
    const url = l.match(/url: "(.*?)"/)[1];
    const id = l.match(/id: "(.*?)"/)[1];
    const desc = l.match(/desc: "(.*?)"/);
    console.log(`${url} -> id: ${id}, desc: ${desc ? (desc[1].substring(0, 10) + '...') : 'NONE'}`);
  });
}
