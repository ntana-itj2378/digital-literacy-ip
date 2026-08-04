const fs = require('fs-extra');
const path = require('path');
const { glob } = require('glob');

async function check() {
    // Search only in src/articles, ignoring src/articles/archive
    const files = await glob('src/articles/**/*.html', { ignore: 'src/articles/archive/**' });
    console.log(`Found ${files.length} articles to check.`);

    for (const file of files) {
        const content = await fs.readFile(file, 'utf8');
        
        // Remove HTML comments
        const noComments = content.replace(/<!--[\s\S]*?-->/g, '');
        
        // Check if there is an <img> tag in the non-commented content
        const imgRegex = /<img\s+[^>]*src=["']([^"']+)["'][^>]*>/gi;
        const matches = [...noComments.matchAll(imgRegex)];
        
        if (matches.length === 0) {
            console.log(`[NO IMG TAG] ${file}`);
            // Check if there is an img tag in the commented out content
            const allMatches = [...content.matchAll(imgRegex)];
            if (allMatches.length > 0) {
                console.log(`  -> (Found commented out img tag: ${allMatches.map(m => m[1]).join(', ')})`);
            }
        } else {
            // Check if target image exists
            for (const match of matches) {
                const imgPath = match[1];
                // imgPath is absolute like /img/img_article-01/img_article-01-01.png
                // Resolve relative to src directory
                const fullImgPath = path.join('src', imgPath);
                const exists = await fs.pathExists(fullImgPath);
                if (!exists) {
                    console.log(`[IMG NOT FOUND] ${file}: Image ${imgPath} (${fullImgPath}) does not exist.`);
                }
            }
        }
    }
}

check().catch(console.error);
