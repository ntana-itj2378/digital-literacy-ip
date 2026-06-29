const nunjucks = require('nunjucks');
const fs = require('fs-extra');
const path = require('path');
const { glob } = require('glob');

// Configure Nunjucks
const env = new nunjucks.Environment(
    new nunjucks.FileSystemLoader(['src/layouts', 'src']),
    { autoescape: true }
);

async function build() {
    const distDir = 'dist';
    
    // 1. Clean and Prepare dist directory
    await fs.emptyDir(distDir);
    
    // 2. Copy static assets (CSS and Public)
    // We'll put CSS in dist/css
    await fs.copy('src/css', path.join(distDir, 'css'));
    
    // Copy public folder contents to dist root (favicons, og-images, etc.)
    if (await fs.pathExists('src/public')) {
        await fs.copy('src/public', distDir);
        console.log('Copied public assets.');
    }
    
    // Copy images folder
    if (await fs.pathExists('src/img')) {
        await fs.copy('src/img', path.join(distDir, 'img'));
        console.log('Copied img assets.');
    }
    
    // Copy vercel.json to dist to ensure headers are applied if deploying from dist
    if (await fs.pathExists('vercel.json')) {
        await fs.copy('vercel.json', path.join(distDir, 'vercel.json'));
    }
    console.log('Copied assets.');

    // 3. Process all template files in src
    // Find all index.html or *.html files in src (excluding layouts)
    const files = await glob('src/**/*.html', { ignore: 'src/layouts/**' });

    for (const file of files) {
        const relativePath = path.relative('src', file);
        
        // Determine output path (Clean URLs)
        // src/index.html -> dist/index.html
        // src/articles/torrent/article-01/index.html -> dist/articles/torrent/article-01/index.html
        // (If we had article-01.html, we'd convert it, but we already refactored them to /index.html)
        
        const outputPath = path.join(distDir, relativePath);
        await fs.ensureDir(path.dirname(outputPath));

        console.log(`Building ${relativePath}...`);
        
        try {
            // Render the file using Nunjucks
            // This treats the file as a template that extends layouts/main.njk
            const rendered = env.render(relativePath);
            
            // UTF-8 without BOM is default in Node.js fs
            await fs.writeFile(outputPath, rendered, 'utf8');
        } catch (err) {
            console.error(`Error rendering ${file}:`, err);
        }
    }

    // 4. Handle Directory Indexes (Articles top page etc.)
    // We can generate index.html for /articles/ if needed
    // For now, it's just the files we migrated.

    console.log('Build complete!');
}

build().catch(err => {
    console.error('Build failed!', err);
    process.exit(1);
});
