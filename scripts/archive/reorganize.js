const fs = require('fs-extra');
const path = require('path');
const { globSync } = require('glob');

const srcArticlesDir = path.join(__dirname, 'src', 'articles');

// 1. Move and rename directories
const moves = [
  { from: 'fast-video/incident', to: 'article-11' },
  { from: 'fast-video/anime-clips', to: 'article-12' },
  { from: 'piracy/manga-mura', to: 'article-13' },
  { from: 'piracy/others', to: 'article-14' }
];

moves.forEach(m => {
  const src = path.join(srcArticlesDir, m.from);
  const dest = path.join(srcArticlesDir, m.to);
  if (fs.existsSync(src)) {
    fs.moveSync(src, dest, { overwrite: true });
    console.log(`Moved ${m.from} to ${m.to}`);
  }
});

// 2. Move all article-* from torrent
const torrentDir = path.join(srcArticlesDir, 'torrent');
if (fs.existsSync(torrentDir)) {
  const torrentDirs = fs.readdirSync(torrentDir);
  torrentDirs.forEach(dir => {
    if (dir.startsWith('article-')) {
      const src = path.join(torrentDir, dir);
      const dest = path.join(srcArticlesDir, dir);
      fs.moveSync(src, dest, { overwrite: true });
      console.log(`Moved torrent/${dir} to ${dir}`);
    }
  });
}

// 3. Clean up empty directories
['torrent', 'fast-video', 'piracy'].forEach(dir => {
  const p = path.join(srcArticlesDir, dir);
  if (fs.existsSync(p)) {
    fs.removeSync(p);
    console.log(`Removed ${dir}`);
  }
});

// 4. Update file contents to reflect new paths
const replacements = [
  { old: '/articles/torrent/article-', new: '/articles/article-' },
  { old: '/articles/fast-video/incident/', new: '/articles/article-11/' },
  { old: '/articles/fast-video/anime-clips/', new: '/articles/article-12/' },
  { old: '/articles/piracy/manga-mura/', new: '/articles/article-13/' },
  { old: '/articles/piracy/others/', new: '/articles/article-14/' }
];

const files = globSync('src/**/*.{html,njk,js,css}');
files.forEach(f => {
  let content = fs.readFileSync(f, 'utf8');
  let changed = false;
  replacements.forEach(r => {
    if (content.includes(r.old)) {
      content = content.split(r.old).join(r.new);
      changed = true;
    }
  });
  if (changed) {
    fs.writeFileSync(f, content);
    console.log(`Updated paths in ${f}`);
  }
});

console.log('Reorganization complete.');
