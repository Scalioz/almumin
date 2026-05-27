import re
from pathlib import Path

path = Path('tools.html')
text = path.read_text(encoding='utf-8')

CARD_PATTERN = re.compile(
    r'<div class="tool-card"[^>]*data-name="(?P<name>[^"]+)"[^>]*>.*?</div>\s*</div>\s*</div>',
    flags=re.DOTALL,
)


def make_gradient(name: str) -> str:
    h = sum(ord(ch) for ch in name) % 360
    h2 = (h + 40) % 360
    h3 = (h + 80) % 360
    return (
        f'hsl({h}, 70%, 35%), '
        f'hsl({h2}, 80%, 45%), '
        f'hsl({h3}, 90%, 55%)'
    )


def replace_card(match: re.Match) -> str:
    name = match.group('name')
    block = match.group(0)
    gradient = make_gradient(name)

    def replace_img_tag(img_match: re.Match) -> str:
        img_attrs = img_match.group('imgattrs') or ''
        if 'style=' in img_attrs:
            img_attrs = re.sub(r'style="[^"]*"', f'style="background: linear-gradient(135deg, {gradient}) ;"', img_attrs)
        else:
            img_attrs = img_attrs + f' style="background: linear-gradient(135deg, {gradient}) ;"'
        return f'<div class="card-img"{img_attrs}>'

    modified = re.sub(
        r'<div class="card-img"(?P<imgattrs>[^>]*)>\s*<div class="card-img-placeholder">.*?</div>',
        replace_img_tag,
        block,
        count=1,
        flags=re.DOTALL,
    )

    return modified

new_text, count = re.subn(CARD_PATTERN, replace_card, text)
if count == 0:
    raise SystemExit('No card blocks were modified. Check tools.html structure.')

path.write_text(new_text, encoding='utf-8')
print(f'Updated {count} tool-card blocks with unique gradients.')
