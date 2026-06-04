// ================================================================
// AL MUMIN CHATBOT — Voice + Multilingual Response Patch v4
// Drop this file in: C:\Users\aftab\Desktop\almumin\
// index.html already loads it via:
//   <script src="almumin-voice-patch.js"></script>
// ================================================================

(function () {

  // ════════════════════════════════════════════════════════════════
  // 1. MULTILINGUAL RESPONSE KNOWLEDGE BASE
  // ════════════════════════════════════════════════════════════════

  const KB = {
    en: {
      greeting: "As-salamu alaykum! Welcome to Al Mumin. How can I help you with Hajj or Umrah?",
      hajj:     "We offer complete Hajj packages with visa, accommodation, and guided tours. Would you like details?",
      umrah:    "Our Umrah packages start from affordable rates. We handle visa, flights, and hotels in Makkah & Madinah.",
      price:    "Packages vary based on duration and hotel category. Please call us or fill the enquiry form for a quote.",
      contact:  "You can reach us at our office or use the contact form on this page. We respond within 24 hours.",
      visa:     "We assist with Hajj and Umrah visa processing. Our team handles all documentation.",
      hotel:    "We offer 3-star to 5-star hotels close to Masjid al-Haram in Makkah and Masjid an-Nabawi in Madinah.",
      flight:   "We arrange direct and connecting flights from major Indian cities. Group bookings available.",
      fallback: "I'm here to help with your Hajj and Umrah queries. Could you tell me more?"
    },
    ta: {
      greeting: "வஸ்ஸலாமு அலைக்கும்! அல் முமின்-க்கு வரவேற்கிறோம். ஹஜ் அல்லது உம்ரா பற்றி எப்படி உதவலாம்?",
      hajj:     "நாங்கள் விசா, தங்குமிடம் மற்றும் வழிகாட்டுதலுடன் முழுமையான ஹஜ் பேக்கேஜ்கள் வழங்குகிறோம். விவரங்கள் வேண்டுமா?",
      umrah:    "எங்கள் உம்ரா பேக்கேஜ்கள் மலிவான விலையில் தொடங்குகின்றன. விசா, விமானம், மக்கா-மதீனா ஹோட்டல் ஏற்பாடுகள் உள்ளன.",
      price:    "பேக்கேஜ் விலை கால அளவு மற்றும் ஹோட்டல் தரத்தை பொறுத்து மாறும். விலை விவரங்களுக்கு எங்களை தொடர்பு கொள்ளுங்கள்.",
      contact:  "எங்கள் அலுவலகத்தை அழைக்கலாம் அல்லது தொடர்பு படிவத்தை பயன்படுத்தலாம். 24 மணி நேரத்தில் பதிலளிப்போம்.",
      visa:     "ஹஜ் மற்றும் உம்ரா விசா செயலாக்கத்தில் நாங்கள் உதவுகிறோம். அனைத்து ஆவணங்களையும் நாங்கள் கவனிக்கிறோம்.",
      hotel:    "மக்காவில் மஸ்ஜிதுல் ஹராம் அருகில் 3 முதல் 5 நட்சத்திர ஹோட்டல்கள் கிடைக்கும்.",
      flight:   "இந்தியாவின் முக்கிய நகரங்களில் இருந்து நேரடி மற்றும் இணைப்பு விமானங்கள் ஏற்பாடு செய்கிறோம்.",
      fallback: "உங்கள் ஹஜ் மற்றும் உம்ரா கேள்விகளுக்கு நான் இங்கே இருக்கிறேன். கொஞ்சம் விளக்கமாக சொல்லுங்கள்."
    },
    hi: {
      greeting: "वस्सलामु अलैकुम! अल मुमिन में आपका स्वागत है। हज या उमरा में मैं कैसे मदद कर सकता हूँ?",
      hajj:     "हम वीज़ा, आवास और मार्गदर्शन के साथ पूर्ण हज पैकेज देते हैं। क्या आप विवरण चाहते हैं?",
      umrah:    "हमारे उमरा पैकेज किफ़ायती दरों से शुरू होते हैं। वीज़ा, फ्लाइट और मक्का-मदीना में होटल हम संभालते हैं।",
      price:    "पैकेज की कीमत अवधि और होटल श्रेणी पर निर्भर है। कोटेशन के लिए हमसे संपर्क करें।",
      contact:  "हमारे कार्यालय को कॉल करें या संपर्क फ़ॉर्म भरें। हम 24 घंटे में जवाब देते हैं।",
      visa:     "हम हज और उमरा वीज़ा प्रोसेसिंग में सहायता करते हैं। सभी दस्तावेज़ हम संभालते हैं।",
      hotel:    "मक्का में मस्जिद अल-हराम के पास 3-स्टार से 5-स्टार होटल उपलब्ध हैं।",
      flight:   "भारत के प्रमुख शहरों से सीधी और कनेक्टिंग फ्लाइट की व्यवस्था करते हैं।",
      fallback: "मैं आपके हज और उमरा सवालों में मदद के लिए यहाँ हूँ। कृपया और बताइए।"
    },
    ar: {
      greeting: "وعليكم السلام! مرحباً بك في الأمين. كيف يمكنني مساعدتك في الحج أو العمرة؟",
      hajj:     "نقدم باقات حج شاملة مع التأشيرة والإقامة والإرشاد. هل تريد التفاصيل؟",
      umrah:    "باقات العمرة بأسعار معقولة تشمل التأشيرة والطيران والفنادق في مكة والمدينة.",
      price:    "تتفاوت الأسعار حسب المدة وفئة الفندق. تواصل معنا للحصول على عرض سعر.",
      contact:  "يمكنك التواصل عبر مكتبنا أو نموذج الاتصال. نرد خلال 24 ساعة.",
      visa:     "نساعد في معالجة تأشيرات الحج والعمرة ونتولى جميع الأوراق.",
      hotel:    "نوفر فنادق 3 إلى 5 نجوم قرب المسجد الحرام في مكة والمسجد النبوي في المدينة.",
      flight:   "نرتب رحلات مباشرة ومتوقفة من كبرى المدن الهندية.",
      fallback: "أنا هنا للمساعدة في استفساراتك. هل يمكنك إخباري بالمزيد؟"
    }
  };

  // ════════════════════════════════════════════════════════════════
  // 2. LANGUAGE DETECTION
  // ════════════════════════════════════════════════════════════════

  let activeLang = 'en';

  function detectLang(text) {
    const t = text.toLowerCase();
    if (/[\u0B80-\u0BFF]/.test(text)) return 'ta';
    if (/[\u0600-\u06FF]/.test(text)) return 'ar';
    if (/[\u0900-\u097F]/.test(text)) return 'hi';
    const tamilWords = ['eppadi','enna','yenna','vanakkam','nandri','panam','pananam',
      'vilai','sollu','sollunga','theriyuma','therinja','irukka','pakano','pakanum',
      'yeppo','naan','ungal','kidaikuma','ponalum','seithu'];
    const hindiWords = ['kaise','kya','kahan','kitna','mujhe','bataiye','chahiye',
      'kharcha','jana','chahta','haan','nahi','acha','bahut','theek','namaste',
      'shukriya','paisa'];
    const arabicWords = ['assalamu','jazakallah','inshallah','alhamdulillah',
      'bismillah','mashallah','subhanallah','wallah','kaifa'];
    const tScore = tamilWords.filter(w => t.includes(w)).length;
    const hScore = hindiWords.filter(w => t.includes(w)).length;
    const aScore = arabicWords.filter(w => t.includes(w)).length;
    const max = Math.max(tScore, hScore, aScore);
    if (max === 0) return 'en';
    if (tScore === max) return 'ta';
    if (hScore === max) return 'hi';
    if (aScore === max) return 'ar';
    return 'en';
  }

  // ════════════════════════════════════════════════════════════════
  // 3. INTENT DETECTION
  // ════════════════════════════════════════════════════════════════

  function detectIntent(text) {
    const t = text.toLowerCase();
    const patterns = {
      greeting: ['hello','hi','salam','salaam','vanakkam','assalamu','namaste',
                 'eppadi','kaise ho','good morning','good evening','welcome'],
      hajj:     ['hajj','haj','pilgrimage','makkah','mecca','arafat','mina'],
      umrah:    ['umrah','umra','umroh','tawaf','ziyarat'],
      price:    ['price','cost','rate','fee','charge','panam','pananam','paisa',
                 'kitna','kharcha','vilai','budget','how much','evvalavu','ethanai'],
      contact:  ['contact','phone','call','number','address','office','reach',
                 'enquiry','inquiry','form','whatsapp','email','thodarbu'],
      visa:     ['visa','document','passport','permit','clearance','application'],
      hotel:    ['hotel','accommodation','stay','room','lodge','near haram'],
      flight:   ['flight','fly','airline','airport','ticket','travel','vimanam']
    };
    for (const [intent, keywords] of Object.entries(patterns)) {
      if (keywords.some(w => t.includes(w))) return intent;
    }
    return 'fallback';
  }

  function getMultilingualReply(userText) {
    const lang   = detectLang(userText);
    const intent = detectIntent(userText);
    activeLang   = lang;
    return (KB[lang] || KB['en'])[intent] || (KB[lang] || KB['en'])['fallback'];
  }

  // ════════════════════════════════════════════════════════════════
  // 5. INTERCEPT chatSend — v4
  //    Problem: the original's menu ("Back to menu / Book Now")
  //    lives OUTSIDE chat-msgs, so a msgBox observer misses it.
  //    Fix: snapshot the ENTIRE chat widget before orig() fires,
  //    then use subtree:true observer to block everything new
  //    except the user bubble and our own reply.
  // ════════════════════════════════════════════════════════════════

  // Flag so observer knows our bubble is safe
  let _ourBubble = null;
  // Flag: are we currently in patch-intercept mode?
  let _blocking  = false;

  function wrapSendFunction() {

    function getMsgBox() {
      return document.getElementById('chat-msgs') ||
             document.getElementById('chat-messages') ||
             document.querySelector('.chat-msgs') ||
             document.querySelector('.chat-messages') ||
             document.querySelector('#chat-widget .messages');
    }

    // Get the widest chat container (widget root)
    function getChatWidget() {
      const msgBox = getMsgBox();
      if (!msgBox) return null;
      // Walk up to find the outermost chat container
      let el = msgBox.parentNode;
      for (let i = 0; i < 5; i++) {
        if (!el || el === document.body) break;
        const id  = (el.id || '').toLowerCase();
        const cls = (el.className || '').toLowerCase();
        if (id.includes('chat') || cls.includes('chat') || cls.includes('widget')) return el;
        el = el.parentNode;
      }
      return msgBox.parentNode; // fallback: direct parent
    }

    function injectBotReply(replyText) {
      const msgBox = getMsgBox();
      if (!msgBox) return null;
      const bubble = document.createElement('div');
      bubble.className = 'msg bot';
      bubble.setAttribute('data-patch', 'true');
      bubble.style.cssText = `
        background:#f0f4ff;color:#0d0d0d;padding:10px 14px;
        border-radius:12px 12px 12px 0;max-width:80%;margin:6px 0;
        font-size:14px;line-height:1.5;align-self:flex-start;
        box-shadow:0 1px 4px rgba(0,0,0,0.08);word-break:break-word;`;
      bubble.textContent = replyText;
      msgBox.appendChild(bubble);
      setTimeout(() => { msgBox.scrollTop = msgBox.scrollHeight; }, 50);
      return bubble;
    }

    function getInput() {
      return document.getElementById('chat-input') ||
             document.getElementById('chatInput') ||
             document.getElementById('user-input') ||
             document.querySelector('#chat-widget input[type="text"]') ||
             document.querySelector('#chat-widget textarea');
    }

    // ── Is a node a user message bubble? (keep these) ───────────
    function isUserBubble(node) {
      if (!node || node.nodeType !== 1) return false;
      const cls = (node.className || '').toLowerCase();
      return cls.includes('user') || cls.includes('sent') ||
             node.style.textAlign === 'right' ||
             node.style.alignSelf === 'flex-end' ||
             node.style.marginLeft === 'auto';
    }

    // ── Core wrap ────────────────────────────────────────────────
    function wrappedSend(orig) {
      const inp    = getInput();
      const text   = inp ? inp.value.trim() : '';
      const lang   = detectLang(text);
      const intent = detectIntent(text);

      if (lang !== 'en' || intent !== 'fallback') {

        const chatWidget = getChatWidget();
        const msgBox     = getMsgBox();

        // Snapshot every existing node in the widget BEFORE orig()
        const existingNodes = new Set();
        if (chatWidget) {
          chatWidget.querySelectorAll('*').forEach(function(n) {
            existingNodes.add(n);
          });
        }

        // Activate blocking flag
        _blocking  = true;
        _ourBubble = null;

        // Start the observer BEFORE orig() so we catch sync additions too
        let observer = null;
        if (chatWidget) {
          observer = new MutationObserver(function (mutations) {
            if (!_blocking) return;
            mutations.forEach(function (mutation) {
              mutation.addedNodes.forEach(function (node) {
                if (node.nodeType !== 1)               return; // text nodes — skip
                if (node === _ourBubble)               return; // our bubble — keep
                if (node.getAttribute && node.getAttribute('data-patch')) return; // our bubble — keep
                if (existingNodes.has(node))           return; // was there before — keep
                if (isUserBubble(node))                return; // user message — keep

                // Everything else the original adds → hide immediately
                node.style.display = 'none';
                // Also schedule removal after 200ms (belt + suspenders)
                setTimeout(function() {
                  if (node.parentNode) node.parentNode.removeChild(node);
                }, 200);
              });
            });
          });
          observer.observe(chatWidget, { childList: true, subtree: true });
        }

        // Let original run (adds user bubble, clears input, fires API call)
        try { orig(); } catch(e) {}

        // Inject our KB reply
        setTimeout(function () {
          _ourBubble = injectBotReply(getMultilingualReply(text));
        }, 80);

        // Stop blocking after 8 seconds (covers slow API responses)
        setTimeout(function () {
          _blocking = false;
          if (observer) observer.disconnect();
        }, 8000);

        return;
      }

      // English, no matched intent → original handles fully
      orig();
    }

    // Wrap chatSend (confirmed present)
    const originalChatSend = window.chatSend;
    if (typeof originalChatSend === 'function') {
      window.chatSend = function () { wrappedSend(originalChatSend); };
      console.log('[AlMumin] chatSend wrapped ✓ v4');
      return;
    }

    ['sendMessage','handleSend','sendChat'].forEach(function (name) {
      if (typeof window[name] === 'function' && !window[name]._patched) {
        const orig = window[name];
        window[name] = function () { wrappedSend(orig); };
        window[name]._patched = true;
        console.log('[AlMumin]', name, 'wrapped ✓ v4');
      }
    });
  }

  // ════════════════════════════════════════════════════════════════
  // 6. VOICE / MIC
  // ════════════════════════════════════════════════════════════════

  let recognition = null;
  let isListening  = false;
  const LANG_CODES = { en:'en-IN', ar:'ar-SA', hi:'hi-IN', ta:'ta-IN' };

  function getCurrentLang() {
    return LANG_CODES[document.body.getAttribute('data-lang') || 'en'] || 'en-IN';
  }

  function getChatInput() {
    return document.getElementById('chat-input') ||
           document.getElementById('chatInput') ||
           document.getElementById('user-input') ||
           document.querySelector('.chat-input') ||
           document.querySelector('#chat-widget textarea') ||
           document.querySelector('#chat-widget input[type="text"]');
  }

  function setupRecognition() {
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SR) { alert('Voice not supported. Use Chrome.'); return null; }
    const rec = new SR();
    rec.continuous = false; rec.interimResults = true; rec.maxAlternatives = 1;
    rec.lang = getCurrentLang();
    rec.onresult = function (e) {
      let t = '';
      for (let i = e.resultIndex; i < e.results.length; i++) t += e.results[i][0].transcript;
      const inp = getChatInput(); if (inp) inp.value = t;
    };
    rec.onstart = function () { isListening = true;  updateMicBtn(true);  };
    rec.onend   = function () {
      isListening = false; updateMicBtn(false);
      const inp = getChatInput();
      if (!inp || !inp.value.trim()) return;
      switchSiteLang(detectLang(inp.value));
      setTimeout(autoSend, 600);
    };
    rec.onerror = function (e) {
      isListening = false; updateMicBtn(false);
      if (e.error === 'not-allowed') showToast('🎤 Mic denied. Allow in Chrome settings.');
      else if (e.error === 'no-speech') showToast('No speech detected. Try again.');
    };
    return rec;
  }

  window.toggleVoice = function () {
    if (!recognition) { recognition = setupRecognition(); if (!recognition) return; }
    if (isListening) { recognition.stop(); return; }
    recognition.lang = getCurrentLang();
    try { recognition.start(); }
    catch(e) { recognition.stop(); setTimeout(() => recognition.start(), 200); }
  };

  function updateMicBtn(on) {
    const btn = document.getElementById('mic-btn'); if (!btn) return;
    btn.style.background = on ? '#FF3B5C' : '#f0f4ff';
    btn.style.transform  = on ? 'scale(1.1)' : 'scale(1)';
    btn.innerHTML        = on ? '⏹' : '🎤';
    btn.title            = on ? 'Tap to stop' : 'Speak your message';
    btn.style.animation  = on ? 'micPulse 1s ease infinite' : 'none';
  }

  function autoSend() {
    if (typeof window.chatSend    === 'function') { window.chatSend();    return; }
    if (typeof window.sendMessage === 'function') { window.sendMessage(); return; }
    if (typeof window.handleSend  === 'function') { window.handleSend();  return; }
    if (typeof window.sendChat    === 'function') { window.sendChat();    return; }
    const btn = document.getElementById('chat-send') ||
                document.querySelector('.chat-send') ||
                document.querySelector('#chat-widget button[type="submit"]');
    if (btn) btn.click();
  }

  function switchSiteLang(lang) {
    try {
      document.querySelectorAll('.lang-btn').forEach(function (btn) {
        const oc = btn.getAttribute('onclick') || '';
        if (oc.includes("'" + lang + "'") || oc.includes('"' + lang + '"')) btn.click();
      });
    } catch(e) {}
  }

  function showToast(msg) {
    const t = document.createElement('div');
    t.textContent = msg;
    t.style.cssText = `position:fixed;bottom:100px;left:50%;transform:translateX(-50%);
      background:#0D0D0D;color:#fff;padding:10px 20px;border-radius:8px;font-size:13px;
      z-index:99999;max-width:280px;text-align:center;box-shadow:0 4px 20px rgba(0,0,0,.3)`;
    document.body.appendChild(t); setTimeout(() => t.remove(), 3500);
  }

  // ════════════════════════════════════════════════════════════════
  // 7. STYLES + MIC BUTTON AUTO-INJECT
  // ════════════════════════════════════════════════════════════════

  const style = document.createElement('style');
  style.textContent = `
    @keyframes micPulse {
      0%,100% { box-shadow:0 0 0 0 rgba(255,59,92,.5); }
      50%      { box-shadow:0 0 0 8px rgba(255,59,92,0); }
    }
    #mic-btn { outline:none; }
    #mic-btn:hover { opacity:.85; }
  `;
  document.head.appendChild(style);

  window.addEventListener('load', function () {
    wrapSendFunction();
    setTimeout(function () {
      if (document.getElementById('mic-btn')) return;
      const sendBtn = document.getElementById('chat-send') ||
                      document.querySelector('#chat-widget button') ||
                      document.querySelector('.chat-send');
      if (sendBtn && sendBtn.parentNode) {
        const b = document.createElement('button');
        b.id = 'mic-btn'; b.innerHTML = '🎤'; b.title = 'Speak your message';
        b.onclick = window.toggleVoice;
        b.style.cssText = `width:38px;height:38px;border-radius:50%;border:none;cursor:pointer;
          background:#f0f4ff;display:flex;align-items:center;justify-content:center;
          transition:all .2s;flex-shrink:0;margin-right:6px;font-size:16px;`;
        sendBtn.parentNode.insertBefore(b, sendBtn);
      }
    }, 1500);
  });

})();