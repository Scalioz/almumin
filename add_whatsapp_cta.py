from pathlib import Path
from bs4 import BeautifulSoup
path = Path('tools.html')
text = path.read_text(encoding='utf-16')
soup = BeautifulSoup(text, 'html.parser')
cta_html = '''<a href="https://wa.me/919043616100?text=Hi%2C+I+need+a+custom+version+of+this+tool" target="_blank" style="display:flex;align-items:center;gap:6px;font-size:12px;color:#25D366;font-weight:600;text-decoration:none;margin-top:4px;margin-bottom:8px"><img src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" style="width:14px;height:14px"/> Need a custom version? WhatsApp us today</a>'''
added=0
for footer in soup.select('div.card-footer'):
    btn = footer.find('button')
    if not btn:
        continue
    if footer.find('a', href=lambda value: value and 'wa.me/919043616100' in value):
        continue
    new_link = BeautifulSoup(cta_html, 'html.parser')
    btn.insert_before(new_link)
    added += 1
if added == 0:
    print('No new CTAs inserted; existing CTAs may already be present.')
else:
    path.write_text(str(soup), encoding='utf-16')
    print(f'Inserted CTA in {added} card footers.')
