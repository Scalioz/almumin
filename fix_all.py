import glob, re, os

NAVY = "#0A1860"
BLUE = "#1A3CFF"
WA_NUM = "919043946087"

# ── Chatbot script tag (for tool pages depth=1) ───────────────────────────
BOT_TAG = '<script src="../chatbot.js"></script>'
BOT_TAG_ROOT = '<script src="chatbot.js"></script>'

# ── Rating HTML to inject before card-footer ─────────────────────────────
RATING_HTML = '<div class="card-rating"><span class="card-stars">★★★★★</span><span class="card-review-count">3 reviews</span></div>\n        '

RATING_CSS = """
    .card-rating{display:flex;align-items:center;gap:6px;margin-bottom:.5rem}
    .card-stars{color:#f59e0b;font-size:.85rem;letter-spacing:1px}
    .card-review-count{font-size:.72rem;color:#64748b;font-weight:600;background:#f1f5f9;
      padding:2px 7px;border-radius:20px;animation:pulse-badge 2s infinite}
    @keyframes pulse-badge{0%,100%{background:#f1f5f9;color:#64748b}50%{background:#e0e7ff;color:#1A3CFF}}"""

# ── Fix tools.html (root level) ───────────────────────────────────────────
print("Fixing tools.html...")
with open("tools.html") as f:
    c = f.read()

# Add rating CSS if missing
if "pulse-badge" not in c:
    c = c.replace("@media (max-width: 600px)", RATING_CSS + "\n    @media (max-width: 600px)")

# Add rating HTML if missing
if "card-review-count" not in c:
    c = c.replace('<div class="card-footer">', RATING_HTML + '<div class="card-footer">')

# Add chatbot if missing
if "chatbot.js" not in c:
    c = c.replace("</body>", f'{BOT_TAG_ROOT}\n</body>')

with open("tools.html", "w") as f:
    f.write(c)
print("  ✅ tools.html fixed")

# ── Fix all tool pages ────────────────────────────────────────────────────
DIRS = ["healthcare", "real-estate", "construction", "education"]
fixed = 0

for d in DIRS:
    for fpath in glob.glob(f"{d}/*.html"):
        with open(fpath, encoding="utf-8", errors="ignore") as f:
            c = f.read()

        changed = False

        # 1. FIX LOGO SIZE
        c2 = re.sub(
            r'(<img src="../assets/logo\.png"[^>]*?)(?:style="[^"]*")?([^>]*>)',
            r'\1 style="height:48px;display:block;" \2',
            c
        )
        if c2 != c: changed = True; c = c2

        # 2. FIX NAV LINKS
        replacements = [
            ('href="#pricing"', 'href="../index.html#pricing"'),
            ('href="index.html#pricing"', 'href="../index.html#pricing"'),
            ('href="#custom"', 'href="../index.html#custom"'),
            ('href="index.html#custom"', 'href="../index.html#custom"'),
            # Fix Custom link that might be pointing to WhatsApp
            (f'href="https://wa.me/{WA_NUM}?text=Hi%2C%20I%20want%20to%20customise%20a%20Scalioz%20tool"', 'href="../index.html#custom"'),
            ('href="tools.html"', 'href="../tools.html"'),
            ('href="index.html"', 'href="../index.html"'),
        ]
        for old, new in replacements:
            if old in c:
                c = c.replace(old, new)
                changed = True

        # 3. ADD CHATBOT if missing
        if "chatbot.js" not in c:
            c = c.replace("</body>", f'{BOT_TAG}\n</body>')
            changed = True

        # 4. FIX DEMO CARD BACKGROUND (add gradient+pattern if plain)
        if 'class="demo-card"' in c and 'background: linear-gradient' not in c.split('class="demo-card"')[1][:200]:
            c = c.replace(
                'class="demo-card"',
                'class="demo-card" style="background:linear-gradient(135deg,rgba(10,24,96,0.95) 0%,rgba(26,60,255,0.9) 60%,rgba(0,200,255,0.85) 100%);"'
            )
            changed = True

        if changed:
            with open(fpath, "w", encoding="utf-8") as f:
                f.write(c)
            fixed += 1

print(f"  ✅ {fixed} tool pages fixed (logo, nav links, chatbot, demo card)")
print("\n✅ ALL DONE. Now run: git add . && git commit -m 'Fix all: bot, ratings, logo, nav links' && git push")
