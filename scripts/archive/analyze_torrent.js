const fs = require('fs');
const path = require('path');
const glob = require('glob');

const torrentArticleNums = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 15, 16, 18, 20, 21, 22, 26, 27];

torrentArticleNums.forEach(num => {
    const padded = num.toString().padStart(2, '0');
    const dirPath = path.join(__dirname, 'src', 'articles', `article-${padded}`);
    if (fs.existsSync(dirPath)) {
        const mdFiles = glob.globSync(dirPath + '/*.md');
        if (mdFiles.length > 0) {
            const content = fs.readFileSync(mdFiles[0], 'utf8');
            console.log(`\n========================================`);
            console.log(`FILE ${padded}`);
            console.log(`========================================`);
            // Extract Title
            const titleMatch = content.match(/^#\s+(.+)$/m);
            if (titleMatch) console.log(`Title: ${titleMatch[1]}`);
            
            // Extract from ## to the end or skip huge chunks
            // Let's just print the first 800 characters to get the gist
            console.log(content.substring(0, 800) + '...\n');
        } else {
             // For older articles, there might not be a .md file if they were directly written in HTML, wait!
             // Previously we moved all drafts to src/articles/article-XX/
             const htmlPath = path.join(dirPath, 'index.html');
             if (fs.existsSync(htmlPath)) {
                 const htmlContent = fs.readFileSync(htmlPath, 'utf8');
                 const titleMatch = htmlContent.match(/<h1[^>]*>(.*?)<\/h1>/);
                 console.log(`\n========================================`);
                 console.log(`FILE ${padded} (HTML ONLY)`);
                 console.log(`========================================`);
                 if (titleMatch) console.log(`Title: ${titleMatch[1].replace(/<[^>]+>/g, '')}`);
                 
                 // extract paragraph text
                 const pMatches = htmlContent.match(/<p[^>]*>(.*?)<\/p>/g);
                 if (pMatches) {
                     console.log(pMatches.slice(0, 3).map(p => p.replace(/<[^>]+>/g, '')).join('\n'));
                 }
             }
        }
    }
});
