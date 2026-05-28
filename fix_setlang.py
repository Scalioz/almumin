with open('almumin-voice-patch.js', 'r', encoding='utf-8-sig') as f:
    c = f.read()

import re

# Replace the setLang function with one that calls the site's own setLang()
OLD = re.search(r'function setLang\(lang\) \{[\s\S]*?\n  \}', c)
if OLD:
    NEW_FN = """function setLang(lang) {
    // Call the site's own setLang function directly
    try {
      // The site has setLang('ta'), setLang('hi') etc. defined globally
      // Find and click the right lang-btn
      document.querySelectorAll('.lang-btn').forEach(function(btn) {
        var oc = btn.getAttribute('onclick') || '';
        if (oc.indexOf("'" + lang + "'") !== -1 || oc.indexOf('"' + lang + '"') !== -1) {
          btn.click();
        }
      });
    } catch(e) { console.warn('setLang error:', e); }
    console.log('[Voice] Language switched to:', lang);
  }"""
    c = c[:OLD.start()] + NEW_FN + c[OLD.end():]
    print("✅ Fixed setLang to click the actual site lang button")
else:
    print("❌ setLang function not found")
    # Show what's near setLang
    idx = c.find('setLang')
    if idx > 0:
        print("Context:", c[idx-50:idx+200])

with open('almumin-voice-patch.js', 'w', encoding='utf-8') as f:
    f.write(c)
print("✅ Saved")
