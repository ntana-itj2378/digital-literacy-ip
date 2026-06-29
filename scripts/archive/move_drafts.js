const fs = require('fs-extra');
const path = require('path');
const { globSync } = require('glob');

const docsImplDir = path.join(__dirname, 'docs', 'new_piracy_article_implementation');
const srcArticlesDir = path.join(__dirname, 'src', 'articles');

const filesDirs = globSync('FILE_*', { cwd: docsImplDir, absolute: true });

filesDirs.forEach(dirPath => {
  const dirName = path.basename(dirPath); // FILE_XX
  const match = dirName.match(/FILE_(\d+)/);
  if (match) {
    const num = match[1];
    const destDir = path.join(srcArticlesDir, `article-${num}`);
    
    // Ensure destination directory exists
    fs.ensureDirSync(destDir);
    
    // Move all files inside the FILE_XX folder to article-XX folder
    const filesInside = fs.readdirSync(dirPath);
    filesInside.forEach(file => {
      const srcFile = path.join(dirPath, file);
      const destFile = path.join(destDir, file);
      // Move file, overwrite if exists (though we expect them to be unique)
      fs.moveSync(srcFile, destFile, { overwrite: true });
      console.log(`Moved ${file} to article-${num}`);
    });
    
    // Remove the now empty FILE_XX directory
    fs.removeSync(dirPath);
    console.log(`Removed empty directory ${dirName}`);
  }
});

console.log('Drafts movement complete.');
