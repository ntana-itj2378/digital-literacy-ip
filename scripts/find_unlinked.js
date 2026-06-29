const fs = require('fs');
const path = require('path');

const articlesDir = path.join(__dirname, '..', 'src', 'articles');
const indexHtmlPath = path.join(__dirname, '..', 'src', 'index.html');

const dirs = fs.readdirSync(articlesDir, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory() && dirent.name.startsWith('article-'))
    .map(dirent => dirent.name);

const indexContent = fs.readFileSync(indexHtmlPath, 'utf8');

const regex = /url:\s*\"\/articles\/(article-\d+)\/\"/g;
const linkedArticles = new Set();
let match;
while ((match = regex.exec(indexContent)) !== null) {
    linkedArticles.add(match[1]);
}

const unlinkedDirs = dirs.filter(dir => !linkedArticles.has(dir));

console.log('Unlinked Articles (Drafts not on index):');
unlinkedDirs.forEach(dir => {
    const mdFiles = fs.readdirSync(path.join(articlesDir, dir)).filter(f => f.endsWith('.md'));
    if (mdFiles.length > 0) {
        const mdContent = fs.readFileSync(path.join(articlesDir, dir, mdFiles[0]), 'utf8');
        const titleMatch = mdContent.match(/^#\s+(.+)$/m);
        const title = titleMatch ? titleMatch[1] : 'No Title';
        console.log(`- ${dir}: ${title}`);
    } else {
        console.log(`- ${dir}: (No markdown file found)`);
    }
});
