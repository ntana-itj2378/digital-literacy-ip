const fs = require('fs');
const content = fs.readFileSync('src/index.html', 'utf8');

const regex = /{% set (fastVideoArticles|piracyArticles) = \[([\s\S]*?)\] %}/g;
let match;
while ((match = regex.exec(content)) !== null) {
  console.log('--- ' + match[1]);
  const lines = match[2].split('\n').filter(l => l.trim().startsWith('{ url'));
  lines.forEach(l => {
    const url = l.match(/url: "(.*?)"/)[1];
    const id = l.match(/id: "(.*?)"/)[1];
    const desc = l.match(/desc: "(.*?)"/);
    console.log(`${url} -> id: ${id}, desc: ${desc ? (desc[1].substring(0, 10) + '...') : 'NONE'}`);
  });
}
