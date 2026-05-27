(function () {
  const WA = "919043946087";
  const NAVY = "#0A1860", BLUE = "#1A3CFF", CYAN = "#00C8FF";

  // ── Tool knowledge base ──────────────────────────────────────────────────
  const TOOL_KB = {
    "clinic revenue leakage": "The Clinic Revenue Leakage Detector identifies where your clinic is silently losing money — through missed billing, under-priced services, unpaid follow-ups, and no-shows. It gives you a monthly leakage estimate and a recovery roadmap. Most clinics recover ₹15,000–₹80,000/month after using it.",
    "patient no-show": "The Patient No-Show Predictor scores each appointment for no-show risk based on booking gap, channel, and history. It then triggers WhatsApp/SMS reminders automatically to reduce no-shows by up to 60%. For a clinic seeing 300 patients/month, that can mean ₹30,000+ in recovered revenue.",
    "staff productivity": "The Staff Productivity Analyser tracks doctor utilisation, nurse workload, and admin efficiency. It scores your team against industry benchmarks and surfaces bottlenecks before they become burnout. Ideal for clinics with 3+ staff.",
    "marketing roi": "The Healthcare Marketing ROI Calculator shows you cost-per-patient-acquisition across every channel — Google Ads, social media, referrals, and offline campaigns. Know exactly which ₹ is working and which is wasted.",
    "treatment cost": "The Treatment Cost Estimator generates itemised pre-treatment cost breakdowns for patients. Builds trust, reduces billing disputes, and speeds up TPA/insurance pre-auth. Embeddable on your website.",
    "clinic growth": "The Clinic Growth Dashboard gives you a single growth score based on patient volume, revenue trend, Google ratings, and retention. It tells you exactly what to fix next to grow faster.",
    "health risk": "The Patient Health Risk Assessment screens for Type 2 Diabetes, Hypertension, and cardiovascular risk in under 2 minutes using standard clinical parameters. Perfect for OPD and health camps.",
    "appointment assistant": "The AI Appointment Assistant automates booking, rescheduling, and post-visit follow-ups via WhatsApp — 24/7 with zero staff effort. It handles multi-doctor, multi-slot scheduling and reduces booking call time by 80%.",
    "digital token": "The Digital Token System eliminates waiting room chaos. Patients get tokens via WhatsApp, wait from home, and arrive on time. Includes real-time queue display for your reception screen.",
    "property affordability": "The Property Affordability Calculator gives buyers a realistic purchase range based on income, liabilities, and down payment — with EMI projections and a readiness score. Helps brokers qualify buyers faster.",
    "rental yield": "The Rental Yield Calculator computes gross and net rental yield and compares it against FD and equity returns — so you know whether to rent, sell, or hold your property.",
    "property roi": "The Property ROI Projection Tool models capital appreciation + rental income over 5–10 years. Compare multiple properties side-by-side to find the best investment.",
    "home loan": "The Home Loan Eligibility Checker gives an instant loan eligibility estimate based on income, credit score, and liabilities — modelled on SBI, HDFC, ICICI, and Axis norms.",
    "property comparison": "The Property Comparison Tool evaluates up to 3 properties on 12 parameters — price, location, builder reputation, amenities, rental potential, and resale demand — in a structured report.",
    "broker lead": "The Broker Lead Tracker manages your property pipeline from enquiry to closure with follow-up reminders, budget scoring, and conversion probability — built specifically for real estate brokers.",
    "locality": "The Locality Intelligence Report gives you a full neighbourhood profile — infrastructure pipeline, price trends, social amenities, and a growth grade (A–D) for any Indian pin code.",
    "should i buy": "The Should I Buy This Property tool gives an honest Buy/Wait/Skip verdict based on financial readiness, market timing, property value, and urgency — no bias, no pressure.",
    "peb": "The PEB Budget Estimator calculates material, fabrication, and erection costs for Pre-Engineered Buildings in under 3 minutes — based on span, height, and end-use. ±15% accuracy for budgeting.",
    "warehouse cost": "The Warehouse Cost Estimator covers civil, structural, MEP, and fit-out costs for basic to Grade-A warehouses. Supports both RCC and PEB construction methods.",
    "cold storage": "The Cold Storage ROI Calculator models construction cost, operating expenses, rental income, and payback period. Includes NABARD subsidy modelling for eligible projects.",
    "construction timeline": "The Construction Timeline Planner generates a phased project schedule from approvals to handover — with critical path identification and monsoon adjustment. Exports to Gantt chart.",
    "steel weight": "The Steel Weight Calculator computes IS section weights (ISMB, ISMC, ISA, SHS, RHS, CHS) by length and quantity — instant BOQ-ready output for estimation and procurement.",
    "boq": "The BOQ Generator creates a preliminary Bill of Quantities across civil, structural, architectural, and MEP trades — ±20% accuracy for budgeting, with DSR-based unit rates.",
    "roofing": "The Roofing Sheet Calculator gives exact sheet counts, fastener quantities, and ridge/flashing lengths — with wastage allowance for corrugated, trapezoidal, and standing seam profiles.",
    "industrial roi": "The Industrial ROI Calculator models CAPEX, revenue, operating costs, and capacity utilisation to compute payback period and 10-year ROI — with IRR, NPV, and DSCR on paid plans.",
    "course eligibility": "The Course Eligibility Checker instantly validates whether a student meets entry criteria for any programme — reducing manual screening time for admissions teams by 70%.",
    "scholarship": "The Scholarship Eligibility Finder matches students to government, private, and merit-based scholarships they qualify for — improving enrolment and reducing dropout due to financial barriers.",
    "student performance": "The Student Performance Analyser tracks scores across subjects, identifies weak areas, and flags at-risk students early — so faculty can intervene before exams.",
    "fee reminder": "The Fee Reminder System automates WhatsApp and SMS alerts for due fees — reducing collection delays and uncomfortable manual follow-up calls for your admin team.",
    "exam planner": "The Exam Planner generates personalised study schedules based on syllabus, subject weightage, and available days — helping students study smarter, not harder.",
    "career recommendation": "The Career Recommendation Tool matches students to career paths based on interests, strengths, and current market demand — backed by real industry data.",
    "admission followup": "The Admission Follow-up Tracker manages every enquiry from first contact to enrolment — with stage-wise follow-up reminders so no lead goes cold.",
    "marks predictor": "The Marks Predictor estimates final exam scores based on internal marks, attendance, and study hours — giving students and teachers a realistic target to work toward.",
    "stream selector": "The Stream Selector helps Class 10 students choose Science, Commerce, or Arts based on subject strengths and career goals — with clear reasoning for parents too.",
    "student inquiry": "The Student Inquiry Manager captures, assigns, and tracks all student queries across channels — WhatsApp, phone, and web — from a single dashboard.",
  };

  const PRICING_INFO = "All Scalioz tools are priced at ₹499/month, ₹3,999/year (save 33%), or ₹9,999 lifetime — all + 18% GST. Every plan includes full tool access, unlimited queries, PDF report export, and WhatsApp support.";
  const CUSTOM_INFO = "Yes, we build custom versions of any tool. We can rebrand it, modify the logic, integrate with your existing systems, or build something entirely new. Contact us on WhatsApp: +91 90439 46087";
  const GENERAL_INFO = "Scalioz builds smart business tools for Indian businesses — clinics, real estate brokers, construction companies, and educational institutions. Our tools help you make faster, data-driven decisions without expensive consultants.";

  function getAIResponse(userMsg) {
    const msg = userMsg.toLowerCase();
    // Pricing
    if (msg.includes("price") || msg.includes("cost") || msg.includes("₹") || msg.includes("rupee") || msg.includes("plan") || msg.includes("subscription")) {
      return PRICING_INFO;
    }
    // Custom
    if (msg.includes("custom") || msg.includes("modify") || msg.includes("white label") || msg.includes("brand")) {
      setTimeout(() => szShowFlow("qualify_1"), 500);
      return;
    }
    // Tool-specific
    for (const [key, desc] of Object.entries(TOOL_KB)) {
      if (msg.includes(key) || key.split(" ").some(w => w.length > 4 && msg.includes(w))) {
        return desc + "\n\nWant to try it free or know more? Just ask!";
      }
    }
    // Category
    if (msg.includes("healthcare") || msg.includes("clinic") || msg.includes("hospital") || msg.includes("doctor")) {
      return "We have 9 tools for Healthcare: Revenue Leakage Detector, No-Show Predictor, Staff Productivity, Marketing ROI, Treatment Cost, Growth Dashboard, Health Risk Assessment, AI Appointment Assistant, and Digital Token System.\n\nWhich one would you like to know more about?";
    }
    if (msg.includes("real estate") || msg.includes("property") || msg.includes("broker") || msg.includes("house")) {
      return "We have 8 Real Estate tools: Property Affordability, Rental Yield, ROI Projection, Home Loan Eligibility, Property Comparison, Broker Lead Tracker, Locality Intelligence, and Should I Buy?\n\nWhich interests you?";
    }
    if (msg.includes("construction") || msg.includes("peb") || msg.includes("warehouse") || msg.includes("building")) {
      return "We have 8 Construction & PEB tools: PEB Budget Estimator, Warehouse Cost, Cold Storage ROI, Construction Timeline, Steel Weight, BOQ Generator, Roofing Sheet Calculator, and Industrial ROI.\n\nWhich one can I explain?";
    }
    if (msg.includes("education") || msg.includes("school") || msg.includes("college") || msg.includes("student")) {
      return "We have 10 Education tools: Course Eligibility, Scholarship Finder, Student Performance, Fee Reminder, Exam Planner, Career Recommendation, Admission Follow-up, Marks Predictor, Stream Selector, and Student Inquiry Manager.\n\nWhat would you like to know?";
    }
    // Benefits / what does it do
    if (msg.includes("benefit") || msg.includes("what does") || msg.includes("how does") || msg.includes("explain") || msg.includes("tell me") || msg.includes("help me")) {
      return "I can explain any of our 35 tools! Just tell me which tool or which industry you're in — Healthcare, Real Estate, Construction, or Education — and I'll give you full details on what it does, how it helps, and real-world use cases.";
    }
    // Greeting
    if (msg.includes("hi") || msg.includes("hello") || msg.includes("hey")) {
      return "Hi! 👋 I'm the Scalioz AI Assistant. I can tell you about any of our 35 business tools, explain pricing, or connect you with our team for a custom build. What would you like to know?";
    }
    return "I'm here to help! I can tell you about any of our 35 tools — what they do, how they work, pricing, or customisation. Try asking something like:\n• 'Tell me about the patient no-show tool'\n• 'What tools do you have for real estate?'\n• 'How much does it cost?'";
  }

  // ── FLOW-based options ───────────────────────────────────────────────────
  const FLOWS = {
    start: {
      msg: "👋 Hi! I'm the Scalioz AI Assistant.\n\nWhat brings you here today?",
      options: ["Learn about a specific tool", "Browse by industry", "Pricing & plans", "Need a custom tool", "Talk to the team"]
    },
    browse: {
      msg: "Which industry are you in?",
      options: ["🏥 Healthcare / Clinic", "🏠 Real Estate", "🏗️ Construction & PEB", "🎓 Education", "🏭 Industrial"]
    },
    healthcare: { msg: "We have 9 Healthcare tools. Which challenge are you facing?", options: ["Revenue & billing gaps", "Patient no-shows", "Staff efficiency", "Marketing ROI", "Patient screening", "Appointment automation"] },
    realestate: { msg: "We have 8 Real Estate tools. What do you need?", options: ["Property ROI / yield", "Loan eligibility", "Lead management", "Property comparison", "Locality research", "Buy decision help"] },
    construction: { msg: "We have 8 Construction tools. What's your need?", options: ["PEB cost estimate", "Warehouse budget", "Cold storage ROI", "Project timeline", "Steel / BOQ", "Roofing calculation"] },
    education: { msg: "We have 10 Education tools. What's your focus?", options: ["Student performance", "Admissions & eligibility", "Fee collection", "Career guidance", "Exam planning"] },
    qualify_1: {
      msg: "Great — custom builds are our speciality! Let me understand your needs first.\n\nWhich industry is your business in?",
      options: ["🏥 Healthcare / Clinic", "🏠 Real Estate", "🏗️ Construction & PEB", "🎓 Education", "🏭 Industrial / Manufacturing"]
    },
    qualify_2: {
      msg: "Got it! What do you want the custom tool to do?",
      options: ["Automate a manual process", "Calculate / estimate costs or ROI", "Track leads or customers", "Generate reports or documents", "Something entirely new"]
    },
    qualify_3: {
      msg: "Understood. What's your budget range for this custom build?",
      options: ["Under ₹10,000", "₹10,000 – ₹25,000", "₹25,000 – ₹50,000", "Above ₹50,000", "Not sure yet — need a quote"]
    },
    qualify_4: {
      msg: "Perfect! Last question — when do you need this?",
      options: ["Urgently (within 1 week)", "Within a month", "1–3 months", "Just exploring for now"]
    },
  };

  const TOOL_RESPONSES = {
    "Revenue & billing gaps": TOOL_KB["clinic revenue leakage"],
    "Patient no-shows": TOOL_KB["patient no-show"],
    "Staff efficiency": TOOL_KB["staff productivity"],
    "Marketing ROI": TOOL_KB["marketing roi"],
    "Patient screening": TOOL_KB["health risk"],
    "Appointment automation": TOOL_KB["appointment assistant"],
    "Property ROI / yield": TOOL_KB["rental yield"] + "\n\n" + TOOL_KB["property roi"],
    "Loan eligibility": TOOL_KB["home loan"],
    "Lead management": TOOL_KB["broker lead"],
    "Property comparison": TOOL_KB["property comparison"],
    "Locality research": TOOL_KB["locality"],
    "Buy decision help": TOOL_KB["should i buy"],
    "PEB cost estimate": TOOL_KB["peb"],
    "Warehouse budget": TOOL_KB["warehouse cost"],
    "Cold storage ROI": TOOL_KB["cold storage"],
    "Project timeline": TOOL_KB["construction timeline"],
    "Steel / BOQ": TOOL_KB["steel weight"] + "\n\n" + TOOL_KB["boq"],
    "Roofing calculation": TOOL_KB["roofing"],
    "Student performance": TOOL_KB["student performance"],
    "Admissions & eligibility": TOOL_KB["course eligibility"],
    "Fee collection": TOOL_KB["fee reminder"],
    "Career guidance": TOOL_KB["career recommendation"],
    "Exam planning": TOOL_KB["exam planner"],
  };

  let chatMode = "flow"; // "flow" or "ai"
  let flowState = "start";
  let msgHistory = [];
  let chatOpen = false;

  // ── CSS ──────────────────────────────────────────────────────────────────
  const css = `
    #sz-bubble{position:fixed;bottom:24px;right:24px;z-index:9999;cursor:pointer;width:58px;height:58px;
      border-radius:50%;background:linear-gradient(135deg,${NAVY},${BLUE});display:flex;align-items:center;
      justify-content:center;box-shadow:0 4px 20px rgba(26,60,255,.5);transition:transform .2s;}
    #sz-bubble:hover{transform:scale(1.08);}
    #sz-ping{position:absolute;top:0;right:0;width:14px;height:14px;background:#ef4444;border-radius:50%;
      border:2px solid white;animation:szping 1.5s infinite;}
    @keyframes szping{0%,100%{transform:scale(1);}50%{transform:scale(1.35);}}
    #sz-box{position:fixed;bottom:92px;right:24px;z-index:9998;width:350px;max-width:calc(100vw - 32px);
      background:white;border-radius:16px;box-shadow:0 8px 40px rgba(0,0,0,.2);
      display:none;flex-direction:column;overflow:hidden;font-family:'Segoe UI',system-ui,sans-serif;max-height:580px;}
    #sz-head{background:linear-gradient(135deg,${NAVY},${BLUE});padding:14px 16px;display:flex;
      align-items:center;gap:10px;color:white;flex-shrink:0;}
    #sz-head-av{width:40px;height:40px;border-radius:50%;background:rgba(255,255,255,.18);
      display:flex;align-items:center;justify-content:center;font-size:1.2rem;flex-shrink:0;}
    #sz-head-name{font-weight:800;font-size:.92rem;}
    #sz-head-st{font-size:.72rem;opacity:.8;display:flex;align-items:center;gap:4px;}
    #sz-head-st::before{content:'';width:7px;height:7px;background:#4ade80;border-radius:50%;display:inline-block;}
    #sz-close{margin-left:auto;background:none;border:none;color:white;cursor:pointer;font-size:1.2rem;padding:0;opacity:.8;}
    #sz-close:hover{opacity:1;}
    #sz-msgs{padding:14px;overflow-y:auto;flex:1;display:flex;flex-direction:column;gap:8px;min-height:120px;}
    .sz-bot{background:#f1f5f9;color:#0f172a;align-self:flex-start;max-width:88%;padding:10px 13px;
      border-radius:12px 12px 12px 3px;font-size:.83rem;line-height:1.55;white-space:pre-line;}
    .sz-user{background:linear-gradient(135deg,${NAVY},${BLUE});color:white;align-self:flex-end;
      max-width:88%;padding:10px 13px;border-radius:12px 12px 3px 12px;font-size:.83rem;line-height:1.55;}
    .sz-typing{display:flex;gap:4px;padding:12px 14px;align-self:flex-start;}
    .sz-typing span{width:7px;height:7px;background:#94a3b8;border-radius:50%;animation:sztyp 1s infinite;}
    .sz-typing span:nth-child(2){animation-delay:.2s;}
    .sz-typing span:nth-child(3){animation-delay:.4s;}
    @keyframes sztyp{0%,100%{transform:translateY(0);}50%{transform:translateY(-5px);}}
    #sz-opts{padding:0 12px 8px;display:flex;flex-direction:column;gap:5px;flex-shrink:0;}
    .sz-opt{padding:8px 12px;border-radius:8px;border:1.5px solid #e2e8f0;background:white;
      font-size:.79rem;font-weight:600;color:${NAVY};cursor:pointer;text-align:left;transition:all .15s;}
    .sz-opt:hover{background:#f0f4ff;border-color:${BLUE};}
    #sz-input-row{display:flex;gap:8px;padding:10px 12px;border-top:1px solid #f1f5f9;flex-shrink:0;}
    #sz-input{flex:1;border:1.5px solid #e2e8f0;border-radius:8px;padding:8px 12px;font-size:.82rem;
      outline:none;font-family:inherit;transition:border-color .2s;}
    #sz-input:focus{border-color:${BLUE};}
    #sz-send{background:linear-gradient(135deg,${NAVY},${BLUE});color:white;border:none;border-radius:8px;
      padding:8px 14px;cursor:pointer;font-size:.82rem;font-weight:700;transition:opacity .15s;white-space:nowrap;}
    #sz-send:hover{opacity:.88;}
    #sz-footer{padding:5px 12px 8px;font-size:.67rem;color:#94a3b8;text-align:center;flex-shrink:0;}
  `;

  const s = document.createElement("style");
  s.textContent = css;
  document.head.appendChild(s);

  document.body.insertAdjacentHTML("beforeend", `
    <div id="sz-bubble" onclick="szToggle()">
      <div id="sz-ping"></div>
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.2" stroke-linecap="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
      </svg>
    </div>
    <div id="sz-box">
      <div id="sz-head">
        <div id="sz-head-av">🤖</div>
        <div>
          <div id="sz-head-name">Scalioz AI Assistant</div>
          <div id="sz-head-st">Online — ask me anything</div>
        </div>
        <button id="sz-close" onclick="szToggle()">✕</button>
      </div>
      <div id="sz-msgs"></div>
      <div id="sz-opts"></div>
      <div id="sz-input-row">
        <input id="sz-input" placeholder="Or type any question about our tools..." onkeydown="if(event.key==='Enter')szSend()" />
        <button id="sz-send" onclick="szSend()">Send</button>
      </div>
      <div id="sz-footer">Powered by Scalioz AI · <a href="https://wa.me/919043946087" target="_blank" style="color:#1A3CFF;text-decoration:none;">WhatsApp us</a></div>
    </div>
  `);

  window.szToggle = function() {
    chatOpen = !chatOpen;
    const box = document.getElementById("sz-box");
    box.style.display = chatOpen ? "flex" : "none";
    box.style.flexDirection = "column";
    document.getElementById("sz-ping").style.display = "none";
    if (chatOpen && msgHistory.length === 0) szShowFlow("start");
  };

    function szAddBot(text) {
    const el = document.createElement("div");
    el.className = "sz-bot"; el.textContent = text;
    document.getElementById("sz-msgs").appendChild(el);
    scrollMsgs(); msgHistory.push({r:"bot",t:text});
  }

  function szAddUser(text) {
    const el = document.createElement("div");
    el.className = "sz-user"; el.textContent = text;
    document.getElementById("sz-msgs").appendChild(el);
    scrollMsgs(); msgHistory.push({r:"user",t:text});
  }

  function szTyping() {
    const el = document.createElement("div");
    el.className = "sz-typing"; el.id = "sz-typing-ind";
    el.innerHTML = "<span></span><span></span><span></span>";
    document.getElementById("sz-msgs").appendChild(el);
    scrollMsgs(); return el;
  }

  function scrollMsgs() {
    const m = document.getElementById("sz-msgs");
    setTimeout(() => m.scrollTop = m.scrollHeight, 50);
  }

  function szShowFlow(step) {
    flowState = step;
    const f = FLOWS[step];
    if (!f) return;
    szAddBot(f.msg);
    const opts = document.getElementById("sz-opts");
    opts.innerHTML = "";
    f.options.forEach(o => {
      const b = document.createElement("button");
      b.className = "sz-opt"; b.textContent = o;
      b.onclick = () => szFlowClick(o, step);
      opts.appendChild(b);
    });
  }

  function szFlowClick(opt, step) {
    szAddUser(opt);
    document.getElementById("sz-opts").innerHTML = "";

    if (step === "start") {
      if (opt.includes("specific tool")) { szAddBot("Sure! Type the tool name or describe what you're looking for and I'll explain everything about it."); }
      else if (opt.includes("industry")) szShowFlow("browse");
      else if (opt.includes("Pricing")) { szAddBot(PRICING_INFO); szShowNextOptions(); }
      else if (opt.includes("custom")) { szShowFlow("qualify_1"); }
      else if (opt.includes("team")) szSendWA("wants to talk to the team");
    } else if (step === "qualify_1") {
      state.category = opt;
      setTimeout(() => szShowFlow("qualify_2"), 400);
    } else if (step === "qualify_2") {
      state.challenge = opt;
      setTimeout(() => szShowFlow("qualify_3"), 400);
    } else if (step === "qualify_3") {
      state.budget = opt;
      setTimeout(() => szShowFlow("qualify_4"), 400);
    } else if (step === "qualify_4") {
      state.timeline = opt;
      // Now we have full lead info — pass to WhatsApp
      const summary = `Hi Scalioz Team! 👋\n\nI need a custom tool build:\n\n🏢 Industry: ${state.category}\n🔧 Requirement: ${state.challenge}\n💰 Budget: ${state.budget}\n📅 Timeline: ${state.timeline}\n\nPlease get in touch!`;
      setTimeout(() => {
        szAddBot(`Thank you! Here's a summary of your requirement:\n\n🏢 ${state.category}\n🔧 ${state.challenge}\n💰 ${state.budget}\n📅 ${state.timeline}\n\nOur team will review and get back to you within 2 hours. Connecting you now...`);
        const opts = document.getElementById("sz-opts");
        opts.innerHTML = "";
        const b = document.createElement("button");
        b.className = "sz-opt";
        b.style.cssText = "background:#25D366;color:white;border:none;font-size:.85rem;padding:10px;";
        b.textContent = "💬 Send My Requirements on WhatsApp →";
        b.onclick = () => window.open(`https://wa.me/${WA}?text=${encodeURIComponent(summary)}`, "_blank");
        opts.appendChild(b);
      }, 500);
    } else if (step === "browse") {
      if (opt.includes("Healthcare")) szShowFlow("healthcare");
      else if (opt.includes("Real Estate")) szShowFlow("realestate");
      else if (opt.includes("Construction")) szShowFlow("construction");
      else if (opt.includes("Education")) szShowFlow("education");
      else szShowFlow("construction");
    } else {
      const resp = TOOL_RESPONSES[opt];
      if (resp) {
        const t = szTyping();
        setTimeout(() => { t.remove(); szAddBot(resp); szShowNextOptions(); }, 700);
      } else szShowNextOptions();
    }
  }

  
  function szShowNextOptions() {
    const opts = document.getElementById("sz-opts");
    opts.innerHTML = "";
    ["Ask another question", "View all tools →", "Talk to our team"].forEach(o => {
      const b = document.createElement("button");
      b.className = "sz-opt"; b.textContent = o;
      b.onclick = () => {
        opts.innerHTML = "";
        if (o.includes("another")) { szAddBot("Sure! What would you like to know?"); }
        else if (o.includes("tools")) {
          const base = (window.location.pathname.includes("/healthcare/") || window.location.pathname.includes("/real-estate/") || window.location.pathname.includes("/construction/") || window.location.pathname.includes("/education/")) ? "../tools.html" : "tools.html";
          window.location.href = base;
        }
        else szSendWA("wants to talk to team after browsing tools");
      };
      opts.appendChild(b);
    });
  }

  window.szSend = function() {
    const input = document.getElementById("sz-input");
    const msg = input.value.trim();
    if (!msg) return;
    input.value = "";
    szAddUser(msg);
    document.getElementById("sz-opts").innerHTML = "";
    const msgL = msg.toLowerCase();

    // Custom tool — start qualification flow
    if (msgL.includes("custom") || msgL.includes("modify") || msgL.includes("white label") || msgL.includes("brand")) {
      const t = szTyping();
      setTimeout(() => { t.remove(); szShowFlow("qualify_1"); }, 600);
      return;
    }
    // Team / contact
    if (msgL.includes("team") || msgL.includes("contact") || msgL.includes("call") || msgL.includes("speak")) {
      const t = szTyping();
      setTimeout(() => { t.remove(); szSendWA(`wants to talk: "${msg}"`); }, 600);
      return;
    }
    const t = szTyping();
    setTimeout(() => {
      t.remove();
      const resp = getAIResponse(msg);
      szAddBot(resp);
    }, 600);
  };
  function szSendWA(reason) {
    const summary = `Hi Scalioz! 👋\nI was chatting with your AI assistant.\nReason: ${reason}\n\nPlease help me!`;
    const opts = document.getElementById("sz-opts");
    const b = document.createElement("button");
    b.className = "sz-opt";
    b.style.background = "#25D366"; b.style.color = "white"; b.style.border = "none";
    b.textContent = "💬 Continue on WhatsApp →";
    b.onclick = () => window.open(`https://wa.me/${WA}?text=${encodeURIComponent(summary)}`, "_blank");
    opts.innerHTML = ""; opts.appendChild(b);
  }

})();
