// ================================================================
// AL MUMIN CHATBOT — Voice-to-Text Patch
// Instructions:
// 1. Open almumin/chatbot.js in VS Code
// 2. Find the textarea / input area in the chatbot HTML
//    (look for the send button or input field)
// 3. Add the mic button HTML next to the send button
// 4. Paste the voice JS at the bottom of chatbot.js
// ================================================================

// ── STEP 1: Find this in chatbot.js (your send button area) ────
// Look for something like:
//   <button id="chat-send"> or <button onclick="sendMessage">
// Add the mic button RIGHT BEFORE the send button:

/*
  ADD THIS HTML next to your send button inside the chat footer:
  
  <button id="mic-btn" onclick="toggleVoice()" title="Speak your message"
    style="width:38px;height:38px;border-radius:50%;border:none;cursor:pointer;
           background:#f0f4ff;display:flex;align-items:center;justify-content:center;
           transition:all .2s;flex-shrink:0;margin-right:4px">
    🎤
  </button>
*/

// ── STEP 2: Paste this entire block at the BOTTOM of chatbot.js ─

(function() {

  // ── Voice state ─────────────────────────────────────────────
  let recognition = null;
  let isListening = false;

  // Language map — matches Al Mumin's language switcher
  const LANG_CODES = {
    'en': 'en-IN',
    'ar': 'ar-SA',
    'hi': 'hi-IN',
    'ta': 'ta-IN'
  };

  // Detect current active language from Al Mumin's lang switcher
  function getCurrentLang() {
    // Al Mumin uses data-lang attribute on body or active lang button
    const bodyLang = document.body.getAttribute('data-lang') || 'en';
    return LANG_CODES[bodyLang] || 'en-IN';
  }

  // ── Setup Speech Recognition ─────────────────────────────────
  function setupRecognition() {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert('Voice input is not supported on this browser. Please use Chrome on Android.');
      return null;
    }

    const rec = new SpeechRecognition();
    rec.continuous = false;
    rec.interimResults = true;
    rec.maxAlternatives = 1;

    // Auto-detect language based on site language
    rec.lang = getCurrentLang();

    // Show interim results in input as user speaks
    rec.onresult = function(event) {
      let transcript = '';
      for (let i = event.resultIndex; i < event.results.length; i++) {
        transcript += event.results[i][0].transcript;
      }
      // Put text in chat input
      const inp = getChatInput();
      if (inp) inp.value = transcript;
    };

    rec.onstart = function() {
      isListening = true;
      updateMicBtn(true);
    };

    rec.onend = function() {
      isListening = false;
      updateMicBtn(false);
      // Auto-send if there's text
      const inp = getChatInput();
      if (inp && inp.value.trim()) {
        // Detect language from transcript and update currentLang
        detectAndSetLang(inp.value);
        setTimeout(() => autoSend(), 700);
      }
    };

    rec.onerror = function(e) {
      isListening = false;
      updateMicBtn(false);
      if (e.error === 'not-allowed') {
        showVoiceError('🎤 Microphone permission denied. Please allow mic access in Chrome settings.');
      } else if (e.error === 'no-speech') {
        showVoiceError('No speech detected. Please try again.');
      }
    };

    return rec;
  }

  // ── Toggle voice on/off ───────────────────────────────────────
  window.toggleVoice = function() {
    if (!recognition) {
      recognition = setupRecognition();
      if (!recognition) return;
    }

    if (isListening) {
      recognition.stop();
    } else {
      // Update language in case user switched language
      recognition.lang = getCurrentLang();
      try {
        recognition.start();
      } catch(e) {
        // Already started — stop and restart
        recognition.stop();
        setTimeout(() => recognition.start(), 200);
      }
    }
  };

  // ── Mic button visual state ───────────────────────────────────
  function updateMicBtn(listening) {
    const btn = document.getElementById('mic-btn');
    if (!btn) return;

    if (listening) {
      btn.style.background = '#FF3B5C';
      btn.style.transform = 'scale(1.1)';
      btn.innerHTML = '⏹';
      btn.title = 'Tap to stop';
      // Pulse animation while listening
      btn.style.animation = 'micPulse 1s ease infinite';
    } else {
      btn.style.background = '#f0f4ff';
      btn.style.transform = 'scale(1)';
      btn.innerHTML = '🎤';
      btn.title = 'Speak your message';
      btn.style.animation = 'none';
    }
  }

  // ── Find the chat input field ─────────────────────────────────
  function getChatInput() {
    // Try common IDs used in Al Mumin chatbot
    return document.getElementById('chat-input') ||
           document.getElementById('chatInput') ||
           document.getElementById('user-input') ||
           document.querySelector('.chat-input') ||
           document.querySelector('#chat-widget textarea') ||
           document.querySelector('#chat-widget input[type="text"]');
  }

  // ── Auto-send after voice ─────────────────────────────────────
  function autoSend() {
    // Try common send functions
    if (typeof sendMessage === 'function') { sendMessage(); return; }
    if (typeof sendChat === 'function') { sendChat(); return; }
    if (typeof handleSend === 'function') { handleSend(); return; }
    // Try clicking the send button
    const sendBtn = document.getElementById('chat-send') ||
                    document.querySelector('.chat-send') ||
                    document.querySelector('#chat-widget button[type="submit"]') ||
                    document.querySelector('#chat-widget .send-btn');
    if (sendBtn) sendBtn.click();
  }

  // ── Error toast ───────────────────────────────────────────────
  function showVoiceError(msg) {
    const toast = document.createElement('div');
    toast.textContent = msg;
    toast.style.cssText = `
      position:fixed;bottom:100px;left:50%;transform:translateX(-50%);
      background:#0D0D0D;color:#fff;padding:10px 20px;border-radius:8px;
      font-size:13px;z-index:99999;max-width:280px;text-align:center;
      box-shadow:0 4px 20px rgba(0,0,0,0.3)`;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 3500);
  }

  // ── Pulse animation CSS ───────────────────────────────────────
  const style = document.createElement('style');
  style.textContent = `
    @keyframes micPulse {
      0%, 100% { box-shadow: 0 0 0 0 rgba(255,59,92,0.5); }
      50%       { box-shadow: 0 0 0 8px rgba(255,59,92,0); }
    }
    #mic-btn { outline: none; }
    #mic-btn:hover { opacity: 0.85; }
  `;
  document.head.appendChild(style);

  // ── Inject mic button if not manually placed ──────────────────
  // This auto-injects next to the send button as fallback
  window.addEventListener('load', function() {
    // Wait for chatbot to render
    setTimeout(function() {
      if (document.getElementById('mic-btn')) return; // already placed manually

      const sendBtn = document.getElementById('chat-send') ||
                      document.querySelector('#chat-widget button') ||
                      document.querySelector('.chat-send');

      if (sendBtn && sendBtn.parentNode) {
        const micBtn = document.createElement('button');
        micBtn.id = 'mic-btn';
        micBtn.innerHTML = '🎤';
        micBtn.title = 'Speak your message';
        micBtn.onclick = window.toggleVoice;
        micBtn.style.cssText = `
          width:38px;height:38px;border-radius:50%;border:none;cursor:pointer;
          background:#f0f4ff;display:flex;align-items:center;justify-content:center;
          transition:all .2s;flex-shrink:0;margin-right:6px;font-size:16px;`;
        sendBtn.parentNode.insertBefore(micBtn, sendBtn);
      }
    }, 1500);
  });


  // ── Language detection from voice transcript ──────────────────
  function detectAndSetLang(text) {
    const t = text.toLowerCase();
    // Tamil Unicode script
    if (/[\u0B80-\u0BFF]/.test(text)) { setLang('ta'); return; }
    // Arabic Unicode script
    if (/[\u0600-\u06FF]/.test(text)) { setLang('ar'); return; }
    // Hindi/Devanagari Unicode
    if (/[\u0900-\u097F]/.test(text)) { setLang('hi'); return; }
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
  }

})();

