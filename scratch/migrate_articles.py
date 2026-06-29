import os
import shutil
import re

articles_dir = r"C:\Users\ntana\Documents\Antigravity_docs\digital-literacy-ip\src\articles"

categories = {
    "01_p2p": ["01", "05", "06", "07", "08", "09", "10", "20", "21", "26", "27", "29", "30"],
    "02_apps": ["31", "32", "33", "34", "35", "36"],
    "03_clips": ["02", "04", "11", "12", "17"],
    "04_web": ["03", "13", "14", "15", "16", "18", "19", "22", "25", "28"]
}

# 1. Map old article names to new structure
mapping = {}
category_articles = {} # category_name -> list of new_article_names
new_titles = {} # new_article_name -> clean_title

for cat_name, old_nums in categories.items():
    cat_num = cat_name.split("_")[0]
    category_articles[cat_name] = []
    
    for i, old_num in enumerate(old_nums):
        new_num = f"{i+1:02d}"
        old_dir = f"article-{old_num}"
        new_dir = f"article-{cat_num}-{new_num}"
        mapping[old_dir] = {"cat": cat_name, "new_dir": new_dir, "file_id": f"{cat_num}-{new_num}"}
        category_articles[cat_name].append(new_dir)

# Helper to clean titles
def clean_title(title):
    # Remove existing "FILE XX: " or similar prefixes
    title = re.sub(r'^(?:FILE\s*\d+:?|FILE\s*\d+-\d+:?)\s*', '', title, flags=re.IGNORECASE)
    return title.strip()

# 2. Extract current titles before moving
old_titles = {}
for old_dir in mapping.keys():
    idx_path = os.path.join(articles_dir, old_dir, "index.html")
    if os.path.exists(idx_path):
        with open(idx_path, "r", encoding="utf-8") as f:
            content = f.read()
        m = re.search(r'<h1>(.*?)</h1>', content)
        if m:
            old_titles[old_dir] = clean_title(m.group(1))
        else:
            old_titles[old_dir] = "No Title"
    else:
        old_titles[old_dir] = "No Title"

# Map new titles
for old_dir, info in mapping.items():
    new_titles[info["new_dir"]] = old_titles[old_dir]

# 3. Create category directories and move files
for cat_name in categories.keys():
    cat_path = os.path.join(articles_dir, cat_name)
    os.makedirs(cat_path, exist_ok=True)

for old_dir, info in mapping.items():
    old_path = os.path.join(articles_dir, old_dir)
    new_path = os.path.join(articles_dir, info["cat"], info["new_dir"])
    
    if os.path.exists(old_path):
        # Move directory
        if os.path.exists(new_path):
            shutil.rmtree(new_path)
        shutil.move(old_path, new_path)

# 4. Process HTML files in the new structure
for cat_name in categories.keys():
    cat_path = os.path.join(articles_dir, cat_name)
    dirs = sorted([d for d in os.listdir(cat_path) if d.startswith("article-")])
    
    for i, d in enumerate(dirs):
        idx_path = os.path.join(cat_path, d, "index.html")
        if not os.path.exists(idx_path):
            continue
            
        with open(idx_path, "r", encoding="utf-8") as f:
            content = f.read()
            
        file_id = d.replace("article-", "") # e.g. "01-01"
        clean_t = new_titles[d]
        new_full_title = f"FILE {file_id}: {clean_t}"
        
        # Replace title block
        content = re.sub(r'{%\s*set title = "(.*?)"\s*%}', f'{{% set title = "{new_full_title}" %}}', content)
        
        # Replace h1 block
        content = re.sub(r'<h1>(.*?)</h1>', f'<h1>{new_full_title}</h1>', content)
        
        # Determine previous and next links
        prev_dir = dirs[i-1] if i > 0 else None
        next_dir = dirs[i+1] if i < len(dirs) - 1 else None
        
        # Replace bottom navigation block (heuristic: div containing '次の記事' or 'カテゴリ一覧' or 'ポータルへ')
        # Since layouts vary, we will replace the entire <div style="margin-top: 3rem; text-align: center;">...</div> at the end.
        
        # Find the last matching nav div at the bottom
        nav_pattern = r'<div style="margin-top: 3rem; text-align: center;">\s*<a href=.*?>.*?</a>\s*</div>'
        
        new_nav = '<div style="margin-top: 3rem; text-align: center; display: flex; justify-content: center; gap: 1rem; flex-wrap: wrap;">\n'
        
        if prev_dir:
            prev_title = new_titles[prev_dir]
            new_nav += f'    <a href="/articles/{cat_name}/{prev_dir}/" class="glass" style="padding: 1rem 2.5rem; color: var(--accent-gold); text-decoration: none; border: 1px solid var(--accent-gold); font-weight: bold; transition: all 0.3s;">&larr; 前へ：{prev_title}</a>\n'
        
        new_nav += f'    <a href="/#category" class="glass" style="padding: 1rem 2.5rem; color: #fff; text-decoration: none; border: 1px solid rgba(255,255,255,0.2); font-weight: bold; transition: all 0.3s;">カテゴリ一覧へ戻る</a>\n'

        if next_dir:
            next_title = new_titles[next_dir]
            new_nav += f'    <a href="/articles/{cat_name}/{next_dir}/" class="glass" style="padding: 1rem 2.5rem; color: var(--accent-gold); text-decoration: none; border: 1px solid var(--accent-gold); font-weight: bold; transition: all 0.3s;">次へ：{next_title} &rarr;</a>\n'
            
        new_nav += '</div>'
        
        if re.search(nav_pattern, content, re.DOTALL):
            content = re.sub(nav_pattern, new_nav, content, flags=re.DOTALL)
        else:
            # If not found, insert before </article>
            content = re.sub(r'</article>', f'{new_nav}\n</article>', content)
            
        # Also clean up any old portal links at the top
        content = re.sub(r'<nav style="margin-bottom: 2rem;">\s*<a href="/".*?>.*?</a>\s*</nav>', 
                         '<nav style="margin-bottom: 2rem;">\n        <a href="/" style="color: var(--accent-gold); text-decoration: none;">&larr; ポータルへ戻る</a>\n    </nav>', content)

        with open(idx_path, "w", encoding="utf-8") as f:
            f.write(content)

print("Migration completed.")
