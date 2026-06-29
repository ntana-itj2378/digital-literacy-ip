const fs = require('fs');
const path = require('path');

const indexPath = path.join('C:', 'Users', 'ntana', 'Documents', 'Antigravity_docs', 'digital-literacy-ip', 'src', 'index.html');
const mapping = require('./mapping.js');

let content = fs.readFileSync(indexPath, 'utf8');

const lines = content.split('\n');
for (let i = 0; i < lines.length; i++) {
    let line = lines[i];
    const match = line.match(/url:\s*"\/articles\/(article-\d+)\/"/);
    if (match) {
        const oldDir = match[1];
        const info = mapping[oldDir];
        if (info) {
            line = line.replace(`"/articles/${oldDir}/"`, `"/articles/${info.cat}/article-${info.fileId}/"`);
            line = line.replace(/id:\s*"\d+"/, `id: "${info.fileId}"`);
            lines[i] = line;
        }
    }
}

fs.writeFileSync(indexPath, lines.join('\n'), 'utf8');
console.log('Index updated.');
