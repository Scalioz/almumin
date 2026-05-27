from pathlib import Path
from bs4 import BeautifulSoup
text = Path('tools.html').read_text(encoding='utf-16')
soup = BeautifulSoup(text, 'html.parser')
print('cards', len(soup.select('a.tool-card')))
for i, card in enumerate(soup.select('a.tool-card')[:5], 1):
    print('--- card', i, '---')
    img = card.find('img')
    print('img', bool(img), img.parent.name if img else None, img.parent.get('style') if img else None)
    print('body', bool(card.find('div', class_='card-body')))
    print('first child', card.contents[0].name if card.contents else None)
    print(card.prettify()[:800])
