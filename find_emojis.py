import re

for filename in ['index.html', 'app.js', 'styles.css']:
    with open(filename, 'r', encoding='utf-8') as f:
        content = f.read()
    
    emoji_pattern = re.compile(r'[\U00010000-\U0010ffff]|[\u2600-\u27bf]|[\u2300-\u23ff]|[\u2b50-\u2b55]|[\u3030\u303d\u3297\u3299]')
    matches = [(m.start(), m.group()) for m in emoji_pattern.finditer(content)]
    if matches:
        print(f"=== {filename}: {len(matches)} emojis ===")
        for idx, em in matches:
            line_no = content[:idx].count('\n') + 1
            snippet = content[max(0, idx-15):min(len(content), idx+35)].replace('\n', ' ')
            safe_em = em.encode('unicode_escape').decode()
            safe_snippet = snippet.encode('ascii', 'replace').decode()
            print(f"Line {line_no} [{safe_em}]: {safe_snippet}")
