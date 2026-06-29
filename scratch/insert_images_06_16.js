const fs = require('fs');
const path = require('path');

const articlesDir = path.join('C:', 'Users', 'ntana', 'Documents', 'Antigravity_docs', 'digital-literacy-ip', 'src', 'articles', '01_p2p');

const targetFiles = [
    '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16'
];

targetFiles.forEach(num => {
    const articleFolderName = `article-01-${num}`;
    const indexPath = path.join(articlesDir, articleFolderName, 'index.html');
    const imgPath = `/img/img_article-01/img_article-01-${num}.png`;

    if (fs.existsSync(indexPath)) {
        let content = fs.readFileSync(indexPath, 'utf8');

        // すでに画像が挿入されているかチェック
        if (!content.includes(imgPath)) {
            // <h1>タグの直後、または最初の <h2 タグの直前に画像を挿入する
            // article-01-06〜16は構造が <h1>...</h1>\n<h2... となっているので、最初の <h2 の前に挿入する
            content = content.replace(/(<h2[^>]*>)/, (match) => {
                return `<div style="text-align: center; margin-bottom: 3rem; margin-top: 2rem;">
    <img src="${imgPath}" alt="挿絵画像" style="max-width: 80%; height: auto; border-radius: 12px; box-shadow: 0 8px 32px rgba(0,0,0,0.5); border: 1px solid rgba(255,255,255,0.1);">
</div>\n${match}`;
            });

            fs.writeFileSync(indexPath, content, 'utf8');
            console.log(`Inserted image for ${articleFolderName}`);
        } else {
            console.log(`Image already exists for ${articleFolderName}`);
        }
    } else {
        console.log(`File not found: ${indexPath}`);
    }
});
