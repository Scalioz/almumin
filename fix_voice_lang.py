with open('almumin-voice-patch.js', 'r', encoding='utf-8-sig') as f:
    c = f.read()

# Add language detection into the onend handler, right before autoSend()
OLD = '''    rec.onend = function() {
      isListening = false;
      updateMicBtn(false);
      // Auto-send if there's text
      const inp = getChatInput();
      if (inp && inp.value.trim()) {
        setTimeout(() => autoSend(), 300);
      }
    };'''

NEW = '''    rec.onend = function() {
      isListening = false;
      updateMicBtn(false);
      // Auto-send if there's text
      const inp = getChatInput();
      if (inp && inp.value.trim()) {
        // Detect language from transcript and update currentLang
        detectAndSetLang(inp.value);
        setTimeout(() => autoSend(), 300);
      }
    };'''

if OLD in c:
    c = c.replace(OLD, NEW)
    print("✅ Patched onend handler")
else:
    print("⚠️  Pattern not found, trying alternative...")

# Add the detectAndSetLang function before the closing })();
LANG_FN = '''
  // ── Language detection from voice transcript ──────────────────
  function detectAndSetLang(text) {
    const t = text.toLowerCase();
    // Tamil Unicode script
    if (/[\\u0B80-\\u0BFF]/.test(text)) { setLang('ta'); return; }
    // Arabic Unicode script
    if (/[\\u0600-\\u06FF]/.test(text)) { setLang('ar'); return; }
    // Hindi/Devanagari Unicode
    if (/[\\u0900-\\u097F]/.test(text)) { setLang('hi'); return; }
    // Romanised Tamil keywords
    const ta = ['eppadi','pakano','sollu','yenna','yeppo','vanakkam',
                'naan','ungal','seithu','kidaikuma','irukka','theriyuma',
                'vilai','panam','yaarum','enna','hajj eppadi','sollunga',
                'therinja','pakanum','ponalum','porum'];
    if (ta.some(w => t.includes(w))) { setLang('ta'); return; }
    // Romanised Arabic/Islamic keywords
    const ar = ['assalamu','jazakallah','inshallah','alhamdulillah',
                'bismillah','mashallah','subhanallah','wallah'];
    if (ar.some(w => t.includes(w))) { setLang('ar'); return; }
    // Hindi keywords
    const hi = ['kaise','kya','mujhe','haj','umrah kaise','bataiye',
                'kitna','kharcha','jana','chahta'];
    if (hi.some(w => t.includes(w))) { setLang('hi'); return; }
  }

  function setLang(lang) {
    // Update the site's currentLang variable
    if (typeof window.currentLang !== 'undefined') window.currentLang = lang;
    // Also click the language button to trigger full lang switch
    const langBtn = document.querySelector('[data-lang="'+lang+'"]') ||
                    document.querySelector('.lang-btn[value="'+lang+'"]') ||
                    document.getElementById('lang-'+lang);
    if (langBtn) langBtn.click();
    console.log('[Voice] Language set to:', lang);
  }

'''

if LANG_FN.strip()[:30] not in c:
    c = c.replace('})();', LANG_FN + '})();')
    print("✅ Added detectAndSetLang function")
else:
    print("✓  Language detection already present")

with open('almumin-voice-patch.js', 'w', encoding='utf-8') as f:
    f.write(c)
print("✅ Saved almumin-voice-patch.js")
