const fs = require('fs');

const files = [
  { path: 'src/articles/article-01/index.html', img: '/img/img_article-01.png' },
  { path: 'src/articles/article-02/index.html', img: '/img/img_article-02.png' },
  { path: 'src/articles/article-03/index.html', img: '/img/img_article-03.png' },
  { path: 'src/articles/article-04/index.html', img: '/img/img_article-04.png' },
  { path: 'src/articles/article-05/index.html', img: '/img/img_article-05.png' },
];

files.forEach(f => {
  let content = fs.readFileSync(f.path, 'utf8');
  content = content.replace(/^(\s*)<\/section>/m, (match, p1) => {
    return p1 + '<div style="text-align: center; margin-top: 2rem;">\n' +
           p1 + '    <img src="' + f.img + '" alt="事件のイメージ画像" style="max-width: 100%; height: auto; border-radius: 12px; box-shadow: 0 8px 32px rgba(0,0,0,0.5); border: 1px solid rgba(255,255,255,0.1);">\n' +
           p1 + '</div>\n' +
           match;
  });
  fs.writeFileSync(f.path, content);
  console.log('Updated ' + f.path);
});
