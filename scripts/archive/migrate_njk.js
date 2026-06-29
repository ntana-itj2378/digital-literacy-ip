const fs = require('fs-extra');
const path = require('path');
const { globSync } = require('glob');

function run() {
  const files = globSync('docs/new_piracy_article_implementation/FILE_*/*.njk');
  for (const f of files) {
    const match = f.match(/FILE_(\d+)/);
    if(match) {
      const num = match[1];
      const destDir = path.join('src/articles/torrent', 'article-' + num);
      fs.ensureDirSync(destDir);
      let content = fs.readFileSync(f, 'utf8');
      content = '{% extends "main.njk" %}\n{% block content %}\n' + content + '\n{% endblock %}';
      fs.writeFileSync(path.join(destDir, 'index.html'), content);
      console.log('Created ' + destDir + '/index.html');
    }
  }
}
run();
