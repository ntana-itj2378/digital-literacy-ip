const fs = require('fs-extra');
const { globSync } = require('glob');
const path = require('path');

const files = globSync('src/articles/article-*/*.njk', { absolute: true });
files.forEach(f => {
  fs.removeSync(f);
  console.log('Deleted', path.relative(__dirname, f));
});
