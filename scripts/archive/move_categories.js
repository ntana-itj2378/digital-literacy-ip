const fs = require('fs');
const path = require('path');

const indexPath = path.join(__dirname, 'src', 'index.html');
let content = fs.readFileSync(indexPath, 'utf8');

const moveIdsToFastVideo = ['17', '19', '25'];
const moveIdsToPiracy = ['28'];

let fastVideoAdditions = '';
let piracyAdditions = '';

// Find and extract for fastVideo
moveIdsToFastVideo.forEach(id => {
  // match the comma before it as well if it exists
  const regex = new RegExp(`,?\\s*\\{\\s*url:\\s*"/articles/article-${id}/"[^}]+\\}`);
  const match = content.match(regex);
  if (match) {
    // ensure it starts with a comma for appending
    fastVideoAdditions += ',\n' + match[0].replace(/^,\s*/, '');
    content = content.replace(regex, '');
  }
});

// Find and extract for piracy
moveIdsToPiracy.forEach(id => {
  const regex = new RegExp(`,?\\s*\\{\\s*url:\\s*"/articles/article-${id}/"[^}]+\\}`);
  const match = content.match(regex);
  if (match) {
    piracyAdditions += ',\n' + match[0].replace(/^,\s*/, '');
    content = content.replace(regex, '');
  }
});

// Append to fastVideoArticles
if (fastVideoAdditions) {
  const fvEnd = content.indexOf('] %}', content.indexOf('{% set fastVideoArticles'));
  content = content.slice(0, fvEnd) + fastVideoAdditions + '\n' + content.slice(fvEnd);
}

// Append to piracyArticles
if (piracyAdditions) {
  const pEnd = content.indexOf('] %}', content.indexOf('{% set piracyArticles'));
  content = content.slice(0, pEnd) + piracyAdditions + '\n' + content.slice(pEnd);
}

fs.writeFileSync(indexPath, content);
console.log('Categories updated successfully!');
