const fs = require('fs-extra');
const path = require('path');
const { globSync } = require('glob');

const dirs = globSync('src/articles/article-*', { absolute: true });
const result = [];

dirs.forEach(d => {
  const mdFiles = globSync('*.md', { cwd: d });
  const htmlFile = path.join(d, 'index.html');
  
  if (mdFiles.length > 0) {
    const mdName = mdFiles[0];
    if (!fs.existsSync(htmlFile)) {
      result.push({ dir: path.basename(d), md: mdName, status: 'HTML未作成' });
    } else {
      const content = fs.readFileSync(htmlFile, 'utf8');
      if (content.includes('class="card glass-effect"')) {
        result.push({ dir: path.basename(d), md: mdName, status: 'カードUIのみ存在（HTML未作成）' });
      }
    }
  }
});

console.log(JSON.stringify(result, null, 2));
