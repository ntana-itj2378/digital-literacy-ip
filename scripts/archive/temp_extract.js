const fs = require('fs');
const glob = require('glob');
const path = require('path');

const dirs = glob.globSync('src/articles/article-*', { absolute: true });
const result = [];

dirs.forEach(d => {
  const num = parseInt(path.basename(d).split('-').pop());
  if (num >= 15 && num <= 28) {
    const mds = glob.globSync(d + '/*.md');
    if (mds.length) {
      const content = fs.readFileSync(mds[0], 'utf8');
      const catMatch = content.match(/-\s*\*\*カテゴリ\*\*:\s*(.*)/);
      const titleMatch = content.match(/^#\s+(.+)$/m);
      result.push({
        num,
        cat: catMatch ? catMatch[1].trim() : 'Unknown',
        title: titleMatch ? titleMatch[1].replace(/FILE \d+:\s*/, '').trim() : ''
      });
    }
  }
});

result.sort((a, b) => a.num - b.num);
console.table(result);
