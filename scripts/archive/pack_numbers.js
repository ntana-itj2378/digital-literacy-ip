const fs = require('fs-extra');
const path = require('path');
const { globSync } = require('glob');

const mapping = {
  '18': '17',
  '19': '18',
  '20': '19',
  '21': '20',
  '23': '21',
  '24': '22'
};

const keys = Object.keys(mapping).sort((a, b) => parseInt(a) - parseInt(b));

// 1. Rename docs/FILE_XX
keys.forEach(oldNum => {
  const newNum = mapping[oldNum];
  const src = path.join(__dirname, `docs/new_piracy_article_implementation/FILE_${oldNum}`);
  const dest = path.join(__dirname, `docs/new_piracy_article_implementation/FILE_${newNum}`);
  if (fs.existsSync(src)) {
    fs.moveSync(src, dest, { overwrite: true });
    console.log(`Renamed FILE_${oldNum} to FILE_${newNum}`);
    
    // rename files inside if they contain the old number
    const insideFiles = fs.readdirSync(dest);
    insideFiles.forEach(f => {
      if (f.includes(`file${oldNum}`)) {
        const newFileName = f.replace(`file${oldNum}`, `file${newNum}`);
        fs.moveSync(path.join(dest, f), path.join(dest, newFileName), { overwrite: true });
        console.log(`  Renamed ${f} to ${newFileName}`);
      }
    });
  }
});

// 2. Rename src/articles/article-XX
keys.forEach(oldNum => {
  const newNum = mapping[oldNum];
  const src = path.join(__dirname, `src/articles/article-${oldNum}`);
  const dest = path.join(__dirname, `src/articles/article-${newNum}`);
  if (fs.existsSync(src)) {
    fs.moveSync(src, dest, { overwrite: true });
    console.log(`Renamed article-${oldNum} to article-${newNum}`);
  }
});

// 3. Replace text in files
const files = globSync('{src,docs}/**/*.{html,njk,js,css,md}');
files.forEach(f => {
  let content = fs.readFileSync(f, 'utf8');
  let changed = false;
  
  // Use a regex that replaces article-XX, FILE XX, FILE_XX, fileXX, id: "XX"
  const regex = /(article-|FILE |FILE_|file|id: ")(18|19|20|21|23|24)(?=\D|$)/g;
  
  const newContent = content.replace(regex, (match, prefix, num) => {
    changed = true;
    return prefix + mapping[num];
  });
  
  if (changed) {
    fs.writeFileSync(f, newContent);
    console.log(`Updated contents in ${f}`);
  }
});

console.log('Packing numbers complete.');
