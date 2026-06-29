const fs = require('fs');
const path = require('path');

function walk(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        if (file === 'node_modules' || file === '.git') continue;
        const filePath = path.join(dir, file);
        const stats = fs.statSync(filePath);
        if (stats.isDirectory()) {
            walk(filePath);
        } else if (file.endsWith('.html') || file.endsWith('.njk') || file.endsWith('.js') || file.endsWith('.json')) {
            const content = fs.readFileSync(filePath, 'utf8');
            fs.writeFileSync(filePath, content, 'utf8');
            console.log(`Rewrote ${filePath} as UTF-8 (no BOM)`);
        }
    }
}

walk('./src');
walk('.'); // For config files but careful not to touch node_modules
