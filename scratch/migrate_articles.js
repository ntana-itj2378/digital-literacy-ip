const fs = require('fs');
const path = require('path');

const articlesDir = path.join('C:', 'Users', 'ntana', 'Documents', 'Antigravity_docs', 'digital-literacy-ip', 'src', 'articles');

const categories = {
    "01_p2p": ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "20", "21", "22", "26", "27", "29", "30"],
    "02_apps": ["31", "32", "33", "34", "35", "36"],
    "03_clips": ["11", "12", "17", "19", "25"],
    "04_web": ["13", "14", "15", "16", "18", "28"]
};

function cleanTitle(title) {
    return title.replace(/^(?:FILE\s*\d+:?|FILE\s*\d+-\d+:?)\s*/i, '').trim();
}

const mapping = {};
const categoryArticles = {};
const newTitles = {};

// Build mapping
for (const [catName, oldNums] of Object.entries(categories)) {
    const catNum = catName.split('_')[0];
    categoryArticles[catName] = [];
    
    oldNums.forEach((oldNum, i) => {
        const newNum = String(i + 1).padStart(2, '0');
        const oldDir = `article-${oldNum}`;
        const newDir = `article-${catNum}-${newNum}`;
        mapping[oldDir] = { cat: catName, newDir, fileId: `${catNum}-${newNum}` };
        categoryArticles[catName].push(newDir);
    });
}

// Extract old titles
const oldTitles = {};
for (const oldDir of Object.keys(mapping)) {
    const idxPath = path.join(articlesDir, oldDir, 'index.html');
    if (fs.existsSync(idxPath)) {
        const content = fs.readFileSync(idxPath, 'utf8');
        const match = content.match(/<h1>(.*?)<\/h1>/);
        oldTitles[oldDir] = match ? cleanTitle(match[1]) : 'No Title';
    } else {
        oldTitles[oldDir] = 'No Title';
    }
}

for (const [oldDir, info] of Object.entries(mapping)) {
    newTitles[info.newDir] = oldTitles[oldDir];
}

// Create directories and move files
for (const catName of Object.keys(categories)) {
    const catPath = path.join(articlesDir, catName);
    if (!fs.existsSync(catPath)) fs.mkdirSync(catPath, { recursive: true });
}

for (const [oldDir, info] of Object.entries(mapping)) {
    const oldPath = path.join(articlesDir, oldDir);
    const newPath = path.join(articlesDir, info.cat, info.newDir);
    
    if (fs.existsSync(oldPath)) {
        if (fs.existsSync(newPath)) fs.rmSync(newPath, { recursive: true, force: true });
        fs.renameSync(oldPath, newPath);
    }
}

// Process HTML files
for (const catName of Object.keys(categories)) {
    const catPath = path.join(articlesDir, catName);
    const dirs = fs.readdirSync(catPath).filter(d => d.startsWith('article-')).sort();
    
    dirs.forEach((d, i) => {
        const idxPath = path.join(catPath, d, 'index.html');
        if (!fs.existsSync(idxPath)) return;
        
        let content = fs.readFileSync(idxPath, 'utf8');
        const fileId = d.replace('article-', '');
        const cleanT = newTitles[d];
        const newFullTitle = `FILE ${fileId}: ${cleanT}`;
        
        // Replace title block
        content = content.replace(/{%\s*set title = "(.*?)"\s*%}/g, `{% set title = "${newFullTitle}" %}`);
        
        // Replace h1 block
        content = content.replace(/<h1>(.*?)<\/h1>/g, `<h1>${newFullTitle}</h1>`);
        
        // Navigation links
        const prevDir = i > 0 ? dirs[i-1] : null;
        const nextDir = i < dirs.length - 1 ? dirs[i+1] : null;
        
        let newNav = '<div style="margin-top: 3rem; text-align: center; display: flex; justify-content: center; gap: 1rem; flex-wrap: wrap;">\n';
        
        if (prevDir) {
            newNav += `    <a href="/articles/${catName}/${prevDir}/" class="glass" style="padding: 1rem 2.5rem; color: var(--accent-gold); text-decoration: none; border: 1px solid var(--accent-gold); font-weight: bold; transition: all 0.3s;">&larr; 前へ：${newTitles[prevDir]}</a>\n`;
        }
        
        newNav += `    <a href="/" class="glass" style="padding: 1rem 2.5rem; color: #fff; text-decoration: none; border: 1px solid rgba(255,255,255,0.2); font-weight: bold; transition: all 0.3s;">ポータルへ戻る</a>\n`;

        if (nextDir) {
            newNav += `    <a href="/articles/${catName}/${nextDir}/" class="glass" style="padding: 1rem 2.5rem; color: var(--accent-gold); text-decoration: none; border: 1px solid var(--accent-gold); font-weight: bold; transition: all 0.3s;">次へ：${newTitles[nextDir]} &rarr;</a>\n`;
        }
        
        newNav += '</div>';
        
        const navPattern = /<div style="margin-top: 3rem; text-align: center;">\s*<a href=.*?<\/a>\s*<\/div>/s;
        if (navPattern.test(content)) {
            content = content.replace(navPattern, newNav);
        } else {
            content = content.replace(/<\/article>/, `${newNav}\n</article>`);
        }
        
        // Clean portal links
        content = content.replace(/<nav style="margin-bottom: 2rem;">\s*<a href="\/".*?>.*?<\/a>\s*<\/nav>/g, 
            '<nav style="margin-bottom: 2rem;">\n        <a href="/" style="color: var(--accent-gold); text-decoration: none;">&larr; ポータルへ戻る</a>\n    </nav>');

        fs.writeFileSync(idxPath, content, 'utf8');
    });
}

// Generate the mapping configuration for update_index.js to use
const indexMappingConfig = `module.exports = ${JSON.stringify(mapping, null, 4)};`;
fs.writeFileSync(path.join('C:', 'Users', 'ntana', 'Documents', 'Antigravity_docs', 'digital-literacy-ip', 'scratch', 'mapping.js'), indexMappingConfig, 'utf8');

console.log("Migration completed.");
