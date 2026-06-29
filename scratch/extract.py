import os, re, json

articles_dir = r'C:\Users\ntana\Documents\Antigravity_docs\digital-literacy-ip\src\articles'
results = []
dirs = sorted([d for d in os.listdir(articles_dir) if d.startswith('article-')])

for d in dirs:
    path = os.path.join(articles_dir, d, 'index.html')
    if os.path.exists(path):
        with open(path, 'r', encoding='utf-8') as f:
            content = f.read()
        
        title = ''
        category = ''
        
        t_m = re.search(r'{%\s*set title = "(.*?)"\s*%}', content)
        if not t_m:
            t_m = re.search(r'<h1>(.*?)</h1>', content)
        if t_m:
            title = t_m.group(1)
            
        c_m = re.search(r'<li>\s*<strong>カテゴリ</strong>:\s*(.*?)\s*</li>', content)
        if not c_m:
            c_m = re.search(r'カテゴリ[:：]\s*(.*?)(?:<|\r|\n)', content)
        if c_m:
            category = c_m.group(1)
            
        results.append({'dir': d, 'title': title, 'category': category})

print(json.dumps(results, ensure_ascii=False, indent=2))
