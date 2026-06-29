const fs = require('fs-extra');
const path = require('path');
const { glob } = require('glob');

async function migrate() {
    const files = await glob('articles/**/*.html');
    files.push('wiki/index.html');

    for (const file of files) {
        console.log(`Processing ${file}...`);
        const content = await fs.readFile(file, 'utf8');
        
        // Extract Title
        const titleMatch = content.match(/<title>(.*?)<\/title>/);
        let title = titleMatch ? titleMatch[1].replace(' | 知的財産権啓蒙ポータル', '').replace(' | 知的財産権リスク啓蒙サイト', '').replace(' | 知的財産権啓蒙サイト', '') : '';

        // Extract Main Content
        const mainMatch = content.match(/<main[^>]*>([\s\S]*?)<\/main>/);
        if (!mainMatch) {
            console.log(`Skipping ${file} - no main container found.`);
            continue;
        }
        let mainContent = mainMatch[1];

        // Standardize Links in Content
        // articles/torrent/article-01.html -> /articles/torrent/article-01/
        mainContent = mainContent.replace(/"articles\/torrent\/article-(\d+)\.html"/g, '"/articles/torrent/article-$1/"');
        mainContent = mainContent.replace(/"articles\/fast-video\/(.*?)\.html"/g, '"/articles/fast-video/$1/"');
        mainContent = mainContent.replace(/"articles\/piracy\/(.*?)\.html"/g, '"/articles/piracy/$1/"');
        mainContent = mainContent.replace(/"wiki\/index\.html"/g, '"/wiki/"');
        mainContent = mainContent.replace(/"index\.html"/g, '"/"');
        
        // Internal page links (cross links)
        mainContent = mainContent.replace(/"anime-clips\.html"/g, '"/articles/fast-video/anime-clips/"');
        mainContent = mainContent.replace(/"incident\.html"/g, '"/articles/fast-video/incident/"');
        mainContent = mainContent.replace(/"manga-mura\.html"/g, '"/articles/piracy/manga-mura/"');
        mainContent = mainContent.replace(/"others\.html"/g, '"/articles/piracy/others/"');
        
        // Relative back links
        mainContent = mainContent.replace(/"\.\.\/\.\.\/index\.html"/g, '"/"');

        // Determine destination
        // articles/torrent/article-01.html -> src/articles/torrent/article-01/index.html
        let destPath;
        if (file === 'wiki/index.html') {
            destPath = 'src/wiki/index.html';
        } else {
            const folderName = file.replace(/\.html$/, '');
            destPath = path.join('src', folderName, 'index.html');
        }

        const template = `{% extends "main.njk" %}
{% set title = "${title}" %}
{% block content %}
${mainContent}
{% endblock %}`;

        await fs.ensureDir(path.dirname(destPath));
        await fs.writeFile(destPath, template, 'utf8');
        console.log(`Saved to ${destPath}`);
    }
}

migrate();
