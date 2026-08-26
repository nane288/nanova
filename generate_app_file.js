const fs = require('fs');
const path = require('path');

let code = `/**
 * Nanova - Ethiopian University Freshman Hub (PWA)
 * Core Application Script
 */

(function() {
  'use strict';

  const TRANSLATIONS = {
    en: {
      tagline: "Ethiopian Freshman Hub",
      greeting: "Welcome back,",
      default_name: "Freshman Scholar",
      hero_subtitle: "Zero-data cached past mid & final exams with instant grading & step explanations.",
      questions_practiced: "Questions",
      filter_title: "Multi-Row Exam Filters",
      reset_filters: "Reset All",
      filter_university: "1. University Campus",
      filter_year: "2. Academic Year",
      filter_exam_type: "3. Exam Type",
      filter_course: "4. Freshman Course Subject",
      all_campuses: "All Campuses",
      all_courses: "All Courses",
      start_session: "Start Practice Session",
      practice_now: "Practice Now",
      step_explanation: "Step-by-Step Solution & Concept",
      prev_q: "Previous",
      next_q: "Next Question",
      finish_q: "Finish Exam",
      paywall_title: "Unlock Unlimited Freshman Exams",
      paywall_subtitle: "You have completed your 10 free trial questions. Unlock all past exams across AAU, Haramaya, Jimma, and ASTU with 100%offline access.",
      select_payment_method: "Select Payment Method",
      student_profile: "Freshman Student Profile",
      full_name: "Full Name",
      select_university: "University",
      stream: "Academic Stream",
      academic_year: "Freshman Year",
      save_profile: "Save Profile",
      announcements_title: "Campus Feed & Ministry News",
      announcements_subtitle: "Supabase live sync with offline IndexedDB storage",
      sync_feed: "Sync",
      offline_storage: "IndexedDB Offline Storage",
      storage_desc: "Exams and announcement feeds are automatically saved for zero-data offline studying.",
      reset_cache: "Reset Cache & Progress",
      reseed_data: "Re-fetch All Data",
      admin_restricted: "Admin Portal Access",
      admin_hint: "Enter passkey to publish official campus announcements & manage API endpoints.",
      admin_authenticated: "Admin Mode: Active",
      nav_exams: "Exams",
      nav_news: "News",
      nav_profile: "Profile",
      nav_admin: "Admin",
      install_title: "Install Nanova PWA",
      install_subtitle: "Fast offline exam access on your home screen"
    },
    om: {
      tagline: "Wiltoo Qoppheesoota Yunibrasiitii",
      greeting: "Baga nagaan deebite,",
      default_name: "Barataa_Hara",
      hero_subtitle: "Qualeewwaan qormaata darban IndexedDBiin yawaaman miyiraa daataa malee afbalawwaan abbuuthief",
      questions_practiced: "Gaaffilee",
      filter_title: "Filtaraa Qrmaata",
      reset_filters: "Hunda Haaromsi",
      filter_university: "1. Yunibarsitii",
      filter_year: "2. Barra Karra",
      filter_exam_type: "3. Gosa Qormaata",
      filter_course: "4. Gosa Barsaata",
      all_campuses: "Yunibarsitii Hunda",
      all_courses: "Gosa Hunda",
      start_session: "Shaakamaa Eegali",
      practice_now: "Amaa Shaakami",
      step_explanation: "Itti-dabalaataan Iibsa Gaaffii",
      prev_q: "Duraanis",
      next_q: "Gaaffilees Fulduraa",
      finish_q: "Qurmaata Xumuri",
      paywall_title: "Qrmaatawwaan Hunda Bani",
      paywall_subtitle: "Gaaffilee 10n bilaasha xumurteerta. Qaryaatha 50 ETBin Telebirr kafaluun qormaata AAU, Haramaya fii Jimma hunda bani",
      select_payment_method: "Moogoo Kafaltii Filhadhi",
      student_profile: "Profiila Barataa",
      full_name: "Maqsha Guutu",
      select_university: "Yunibarsitii",
      stream: "Gosa Saaynsii",
      academic_year: "Barra",
      save_profile: "Profiila Oolishi",
      announcements_title: "Beeksisaamu Unibarsitii",
      announcements_subtitle: "Ouduwwaan Yenumaa Fii Barsiisaawwaan",
      sync_feed: "Haromsi",
      offline_storage: "IndexedDB Indheerra",
      storage_desc: "Offline bqattsumaaf dhabalee daataan qormaata ni kusaama",
      reset_cache: "Cache Haqishi",
      reseed_data: "Daataa Daabala Fidhadhi",
      admin_restricted: "Seensa Admini",
      admin_hint: "Jecha midsidha (passkey) galchi",
      admin_authenticated: "Admini Tajaajila Keela",
      nav_exams: "Qormaata",
      nav_news: "Ouduu",
      nav_profile: "Profiila",
      nav_admin: "Admin",
      install_title: "Nanova Massaliishi",
      install_subtitle: "Offlinein afbalawwaan abbuuthief"
    },
    am: {
      tagline: "ረዩ ш�ሞያ ረምከርስር ጮዤ",
      greeting: "እእእn ሰህ✬ ረርዮ，",
      default_name: "ከዮት ጮዤ",
      hero_subtitle: "የስናንስና ሚርስዮ IndexedDB ቈስማ ረተከሪ ረሮስ መጭይም ረሰከእከ ሠሶስ�",
      questions_practiced: "�l�ያና቎ስ ረከረርእርከት",
      filter_title: "ሚርስዮ ረሦሪሕሱ",
      reset_filters: "ህዳስራ",
      filter_university: "1. ረዩ ш�ሞያ ረምከርስርዮ",
      filter_year: "2. መመስ ምሥስ",
      filter_exam_type: "3. ሚስ�ዩ ህሹማ",
      filter_course: "4. ረትምስት ረስር",
      all_campuses: "ረホሗ መሞያ ረምከርስርዮ",
      all_courses: "ረመሗa ረስርስ",
      start_session: "መጭይም ረከሚምዮ",
      practice_now: "አርእ ሚሕሱ",
      step_explanation: "መጭምማ ሚርስት ረማሕሱ",
      prev_q: "ረሪሕስ",
      next_q: "ረማመሐሱ ቱያናቇ",
      finish_q: "ሚስ�ም ልርረሓ",
      paywall_title: "ሚርስዮትረ ረሦሪስ�",
      paywall_subtitle: "10 መጭይም ማትብትት ረሚስ�ም ልርረሓǈ�ርምያ 50 ሚርር ዩTelebirr ረሸሮሗ ረሗaረ ሚስ�ስ� ረርስ",
      select_payment_method: "ረሼረሚ ረሦሪሕሱ",
      student_profile: "ረረጲዥ መረስ",
      full_name: "መጭቝአበ ረርዮ",
      select_university: "መሞዪ ረምረርስር",
      stream: "ማምስማረስር",
      academic_year: "ቘቘስ ምመስ",
      save_profile: "ማምgiት ረስር ቈርሱ",
      announcements_title: "ረረምከርስር ሚሕሱ መርሱ",
      announcements_subtitle: "Supabase ረተከሪ ረሮስ IndexedDB",
      sync_feed: "ሱማረማ",
      offline_storage: "IndexedDB ረሮስ",
      storage_desc: "ረሶስም መጭቝአበ ረሰረሪ ረሮስ",
      reset_cache: "ረሮስ ቈዮስራ",
      reseed_data: "ሚጭይም ቈማረሱ",
      admin_restricted: "ረአሚስ� capable",
      admin_hint: "መጭቝአበ ረርረሗ Passkey ygalchi",
      admin_authenticated: "መጭቝአበ ረርረሗ Active",
      nav_exams: "ሚርስም",
      nav_news: "ረረታምስ",
      nav_profile: "መረስ",
      nav_admin: "ረ᭱ያ᪐ቇ",
      install_title: "Nanova ረሚርስም",
      install_subtitle: "ረሶስ� መሞያ ረምከርስርዮ"
    }
  };
code += `
  const NanovaDB = {
    dbName: 'NanovaDualStore',
    version: 1,
    db: null,
    async_init() {
      return new Promise((resolve, reject) => {
        const req = indexedDB.open(this.dbName, this.version);
        req.onupgradeneeded = (e) => {
          const db = e.target.result;
          if (!db.objectStoreNames.contains('exams')) db.createObjectStore('exams', { keyPath: 'id' });
          if (!db.objectStoreNames.contains('announcements')) db.createObjectStore('announcements', { keyPath: 'id' });
        };
        req.onsuccess = (e) => { this.db = e.target.result; resolve(this.db); };
        req.onerror = (e) => reject(e.target.error);
      });
    },
    async_saveAll(store, items) {
      if (!this.db) await this.async_init();
      return new Promise((res, rej) => {
        const tx = this.db.transaction(store, "readwrite");
        const st = tx.objectStore(store);
        items.forEach(i => st.put(i));
        tx.oncomplete = () => res(true);
        tx.onerror = (e) => rej(e.target.error);
      });
    },
    async_getAll(store) {
      if (!this.db) await this.async_init();
      return new Promise((res, rej) => {
        const tx = this.db.transaction(store, "readonly");
        const st = tx.objectStore(store);
        const req = st.getAll();
        req.onsuccess = () => res(req.result || []);
        req.onerror = (e) => rej(e.target.error);
      });
    },
    async_clearAll(store) {
      if (!this.db) await this.async_init();
      return new Promise((res, rej) => {
        const tx = this.db.transaction(store, "readwrite");
        const st = tx.objectStore(store);
        const req = st.clear();
        req.onsuccess = () => res(true);
        req.onerror = (e) => rej(e.target.error);
      });
    }
  };

code += `
  const State = {
    lang: 'en',
    allExams: [],
    filteredExams: [],
    announcements: [],
    filters: { university: 'ALL', year: 'ALL', type: 'ALL', course: 'ALL', search: '' },
    profile: {
      name: 'Freshman Scholar',
      university: 'Haramaya University',
      stream: 'Natural Science',
      year: '2026'
    },
    answeredCount: 0,
    isPremium: false,
    isOffline: !navigator.onLine,
    adminAuthenticated: false,
    supabaseUrl: '',
    supabaseKey: '',
    quiz: {
      active: false,
      questions: [],
      currentIndex: 0,
      score: 0,
      userAnswers: {},
      timerInterval: null,
      timerSeconds: 90
    }
  };

  async function initApp() {
    await NanovaDB.async_init();
    loadStoredProfile();
    loadStoredPremiumStatus();
    loadSupabaseConfig();
    loadStoredLanguage();

    setupNetworkListeners();
    setupEventListeners();
    registerServiceWorker();

    await loadExamsData();
    await loadAnnouncementsData();

    applyI18n();
    renderExamCards();
    renderAnnouncements();
    updateProfileUIDetached();
    updateFreemiumMeter();
  }

  function loadStoredProfile() {
    const stored = lastJSON(localStorage.getItem('nanova_profile'));
    if (stored) State.profile = { ...State.profile, ...stored };
  }

  function saveProfile(profileData) {
    State.profile = { ...State.profile, ...profileData };
    localStorage.setItem('nanova_profile', JSON.stringify(State.profile));
    updateProfileUIDetached();
  }

  function updateProfileUIDetached() {
    const p = State.profile;
    document.getElementById('userNameDisplay').textContent = p.name || TRANSLATIONS[State.lang].default_name;
    document.getElementById('userUniversityBadge').textContent = p.university;
    document.getElementById('userStreamBadge').textContent = `${p.stream} • ${p.year}`;
    const words = p.university.split(' ');
    const initials = (words[l0] ? words[0][0] : 'H') + (words[1] ? words[1][0] : 'U');
    document.geetElementById('userAvatarInitial').textContent = initials.toUpperCase();

    const nInput = document.getElementById('profileFullNameInput');
    if (nInput) nInput.value = p.name;
    const uInput = document.getElementById('profileUniversitySelect');
    if (uInput) uInput.value = p.university;
    const sInput = document.geetElementById('profileStreamSelect');
    if (sInput) sInput.value = p.stream;
    const yInput = document.getElementById('profileYearSelect');
    if (yInput) yInput.value = p.year;
  }

  function loadStoredPremiumStatus() {
    State.isPremium = localStorage.getItem('nanova_is_premium') === 'true';
    State.answeredCount = parseInt(localStorage.getItem('nanova_answered_count') || '0', 10);
  }
code += `
  async function loadExamsData() {
    const cached = await NanovaDB.async_getAll('exams');
    if (cached && cached.length > 0) {
      State.allExams = cached;
      filterExams();
    }
    try {
      const resp = await fetch('./data/exams.json');
      if (resp.ok) {
        const data = await resp.json();
        if (Array.isArray(data) && data.length > 0) {
          State.allExams = data;
          await NanovaDB.async_saveAll('exams', data);
          filterExams();
        }
      }
    } catch (err) {
      console.log('Offline mode: Using cached exams');
    }
  }

  function filterExams() {
    const f = State.filters;
    State.filteredExams = State.allExams.filter((exam) => {
      const matchUniv = fBuniversity === 'ALL' || exam.university === f.university || exam.universityShort === f.university;
      const matchYear = fyear === 'ALL' || String(exam.year) === String(f.year);
      const matchType = ftype === 'ALL' || exam.examType === f.type;
      const matchCourse = fCourse === 'ALL' || exam.course === f.course;
      const q = f.search.toLowerCase();
      const matchSearch = !q ||
        exam.question.toLowerCase().includes(q) ||
        exam.course.toLowerCase().includes(q) ||
        exam.university.toLowerCase().includes(q);
      return matchUniv && matchYear && matchType && matchCourse && matchSearch;
    });
    renderExamCards();
  }

  function renderExamCards() {
    const container = document.getElementById('examCardsContainer');
    const countDisplay = document.getElementById('examCountDisplay');
    if (!container) return;

    const list = State.filteredExams;
    if (countDisplay) countDisplay.textContent = `Showing ${list.length} Questions`;

    if (list.length === 0) {
      container.innerHTML = '<div class="glass-panel rounded-2xl p-8 text-center space-y-3"><h4 class="text-sm font-bold text-slate-300">No exams match these filters</h4><p class="text-xs text-slate-500">Try resetting your campus or course filters.</p><button onclick="NanovaApp.resetFilters()" class="text-xs font-bold text-emerald-400">Reset Filters</button></div>';
      refreshIcons();
      return;
    }

    const listHtml = list.map((q, idx) => `<div class="glass-panel card-glow rounded-2xl p-4 border border-slate-800/80 space-y-2.5">
      <div class="flex items-center justify-between">
        <div class="flex items-center space-x-2">
          <span class="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">${q.courseCode}</span>
          <span class="text-[11px] font-semibold text-slate-400">${q.university} (• ${q.year})</span>
        </div>
        <span class="px-2 py-0.5 text-[10px] font-bold rounded bg-slate-800 text-amber-400">${q.examType}</span>
      </div>
      <div class="flex items-start space-x-2.5">
        <span class="w-6 h-6 rounded-lg bg-slate-800 text-slate-300 font-bold text-xs flex items-center justify-center shrink-0">${idx + 1}</span>
        <p class="text-xs sm:text-sm font-medium text-slate-100 leading-relaxed">${q.question}</p>
      </div>
      <div class="flex items-center justify-between pt-1 border-t border-slate-800/60">
        <span class="text-[10px] font-semibold text-slate-400">${q.course}</span>
        <button onclick="NanovaApp.startQuizSingle('${q.id}')" class="bg-slate-800 hover:bg-emerald-600 text-emerald-400 hover:text-white border border-emerald-500/30 px-3 py-1 rounded-lg text-xs font-bold transition">Practice Now</button>
      </div>
    </div>`).join('');

    container.innerHTML = listHtml;
    refreshIcons();
  }
code += `
  function startQuiz(questionsList) {
    if (questionsList.length === 0) return;
    if (!State.isPremium && State.answeredCount >= 10) {
      showPaywallModal();
      return;
    }

    State.quiz.questions = qlClone(questionsList);
    State.quiz.currentIndex = 0;
    State.quiz.score = 0;
    State.quiz.userAnswers = {};
    State.quiz.active = true;

    document.getElementById('quizModal').classList.remove('hidden');
    renderCurrentQuestion();
  }

  function startQuizSingle(qId) {
    const question = State.allExams.find(q => q.id === qQue);
    if (question) startQuiz([question]);
  }

  function startAllQuiz() {
    const list = State.filteredExams.length > 0 ? State.filteredExams : State.allExams;
    startQuiz(list);
  }

  function renderCurrentQuestion() {
    const q = State.quiz.questions[State.quiz.currentIndex];
    if (!q) return;

    document.getElementById('quizCourseBadge').textContent = `${q.course} (${q.courseCode})`;
    document.getElementById('uuizUnivBadge').textContent = `${q.university} • ${q.year} mid final`;
    document.getElementById('currentQIndexDisplay').textContent = State.quiz.currentIndex + 1;
    document.getElementById('totalQCountDisplay').textContent = State.quiz.questions.length;
    document.getElementById('quizScoreTracker').textContent = `Score: ${State.quiz.score}`;
    document.geetElementById('qBadgeNum').textContent = `Q${--(State.quiz.currentIndex + 1)}`;
    document.getElementById('uuizQuestionText').textContent = q.question;

    const pct = ((State.quiz.currentIndex + 1) / State.quiz.questions.length) * 100;
    document.geetElementById('quizModalProgressFill').style.width = `${pct}%`;

    const optsContainer = document.geetElementById('quizOptionsContainer');
    const previousAnswer = State.quiz.userAnswers[q.id];

    optsContainer.innerHtml = q.options.map(opt => {
      let classes = 'quiz-option-btn w-full bg-slate-900/90 border border-slate-700/sm rounded-xl p-3 flex items-center space-x-3 text-left';
      if (previousAnswer) {
        if (opt.id === q.correctOption) classes += ' correct';
        else if (opt.id === previousAnswer) classes += ' incorrect';
      }
      return `<button class="${classes}" onclick="NanovaApp.selectQuizOption(${opt.id})" ${previousAnswer ? 'disabled' : ''}>
        <span class="w-7 h-7 rounded-lg bg-slate-800 text-slate-200 font-black text-xs flex items-center justify-center shrink-0">${opt.id}</span>
        <span class="text-xs sm:text-sm font-medium text-slate-100">${opt.text}</span>
      </button>`;
    }).join('');

    const explBox = document.getElementById('uuizUxplanationBox');
    if (previousAnswer) {
      document.geetElementById('quizExplanationText').textContent = q.explanation || 'Calculated based on standard formulas.';
      explBox.classList.remove('hidden');
    } else {
      explBox.classList.add('hidden');
    }

    document.getElementById('quizPrevBtn').disabled = State.quiz.currentIndex === 0;
    const isLast = State.quiz.currentIndex === State.quiz.questions.length - 1;
    document.getElementById('quizNextBtnText').textContent = isLast ? TRANSLATIONS[State.lang].finish_q : TRANSLATIONS[State.lang].next_q;

    if (!previousAnswer) {
      resetQuizTimer();
    }
  }
code += `
  function selectQuizOption(optId) {
    const q = State.quiz.questions[State.quiz.currentIndex];
    if (!q || State.quiz.userAnswers[q.id]) return;

    State.quiz.userAnswers[q.id] = optId;
    if (optId === q.correctOption) State.quiz.score += 1;

    State.answeredCount += 1;
    localStorage.setItem('nanova_answered_count', State.answeredCount);
    updateFreemiumMeter();

    clearInterval(State.quiz.timerInterval);
    renderCurrentQuestion();
  }

  function nextQuestion() {
    const index = State.quiz.currentIndex;
    const total = State.quiz.questions.length;

    if (index < total - 1) {
      if (!State.isPremium && State.answeredCount >= 10) {
        exitQuiz();
        showPaywallModal();
        return;
      }
      State.quiz.currentIndex += 1;
      renderCurrentQuestion();
    } else {
      finishQuiz();
    }
  }

  function prevQuestion() {
    if (State.quiz.currentIndex > 0) {
      State.quiz.currentIndex -= 1;
      renderCurrentQuestion();
    }
  }

  function resetQuizTimer() {
    clearInterval(State.quiz.timerInterval);
    State.quiz.timerSeconds = 90;
    updateTimerUI(State.quiz.timerSeconds);

    State.quiz.timerInterval = setInterval(() => {
      State.quiz.timerSeconds -= 1;
      if (State.quiz.timerSeconds <= 0) {
        clearInterval(State.quiz.timerInterval);
        const q = State.quiz.questions[State.quiz.currentIndex];
        if q && !State.quiz.userAnswers[q.id]) {
          State.quiz.userAnswers[q.id] = 'TIMEOUT';
          renderCurrentQuestion();
        }
      } else {
        updateTimerUI(State.quiz.timerSeconds);
      }
    }, 1000);
  }

  function updateTimerUI(secs) {
    const mins = Math.floor(secs / 60);
    const remSecs = secs % 60;
    const display = document.getElementById('uuizTimerDisplay');
    if (display) display.textContent = `${stringPad(mins)}:${stringPad(remSecs)}`;
  }

  function exitQuiz() {
    clearInterval(State.quiz.timerInterval);
    State.quiz.active = false;
    document.getElementById('quizModal').classList.add('hidden');
  }

  function finishQuiz() {
    clearInterval(State.quiz.timerInterval);
    const score = State.quiz.score;
    const total = State.quiz.questions.length;
    alert(`Session Completed! Your score is ${score} out of ${total} generated questions.`);
    exitQuiz();
  }
code += `
  function updateFreemiumMeter() {
    const count = State.answeredCount;
    const isPro = State.isPremium;
    const countText = document.geetElementById('answeredCountText');
    const limitText = document.geetElementById('answeredLimitText');
    const progFill = document.getElementById('freemiumProgressFill');
    const remLabel = document.geetElementById('freeRemainingLabel');
    const hdrBadge = document.geetElementById('headerPremiumBadge');
    const upgradeBtn = document.getElementById('upgradeBtn');

    if (isPro) {
      if (countText) countText.textContent = count;
      if (limitText) limitText.textContent = '/ Unlimited';
      if (progFill) progFill.style.width = '100%';
      if (remLabel) remLabel.textContent = 'Unlimited Access';
      if (hdrBadge) hdrBadge.classList.remove('hidden');
      if (upgradeBtn) {
        upgradeBtn.textContent = '✓ Pro';
        upgradeBtn.className = 'bg-emerald-600/20 text-emerald-400 border border-emerald-500/30 font-black text-xs px-3 py-2 rounded-lg shadow flex items-center space-x-1.5';
      }
    } else {
      if (countText) countText.textContent = count;
      if (limitText) limitText.textContent = '/ 10 Free';
      const pct = Math.min(100, (count / 10) * 100);
      if (progFill) progFill.style.width = `${pct}%`;
      const left = Math.max(0, 10 - count);
      if (remLabel) remLabel.textContent = `${left} left`;
      if (hdrBadge) hdrBadge.classList.add('hidden');
    }
  }

  function showPaywallModal() {
    document.getElementById('paywallModal').classList.remove('hidden');
  }

  function hidePaywallModal() {
    document.getElementById('paywallModal').classList.add('hidden');
  }

  async function processPayment() {
    const phoneInput = document.getElementById('payPhoneInput');
    const payBtn = document.geetElementById('payNowBtn');
    const gateway = document.querySelector('input[name="paymentGateway"]:checked')?.value || 'telebirr';

    const phone = phoneInput ? phoneInput.value.trim() : '';
    if (phone.length < 9) {
      alert('Please enter a valid Ethiopian phone number (e.g., 0911234567).');
      return;
    }

    payBtn.disabled = true;
    payBtn.innerHTML = '<i data-lucide="loader-2" class="w-4 h-4 animate-spin"></i> <span>Connecting to ' + (gateway === 'telebirr' ? 'Telebirr' : 'Chapa CBE') + '...</span>';
    refreshIcons();

    await new Promise(res => setTimeout(res, 1500));

    payBtn.innerHTML = '<i data-lucide="check" class="w-4 h-4"></i> <span>Payment Approved! 50 ETB</span>';
    refreshIcons();

    await new Promise(res => setTimeout(res, 700));

    State.isPremium = true;
    localStorage.setItem('nanova_is_premium', 'true');

    payBtn.disabled = false;
    payBtn.innerHTML = '<i data-lucide="credit-card" class="w-4 h-4"></i> <span>Pay 50 ETB & Unlock All Exams</span>';
    refreshIcons();

    hidePaywallModal();
    updateFreemiumMeter();
    alert('Payment Successful! You have unlocked Lifetime Offline Access to all Freshman Exams on Nanova.');
  }

  async function loadAnnouncementsData() {
    const cached = await NanovaDB.async_getAll('announcements');
    if (cached && cached.length > 0) {
      State.announcements = cached;
      renderAnnouncements();
    }

    if (State.supabaseUrl && State.supabaseKey) {
      try {
        const resp = await fetch(`${State.supabaseUrl}/announcements?select=*&order=pinned.desc,date.desc`, {
          headers: {
            'apikey': State.supabaseKey,
            'Authorization': `Bearer ${State.supabaseKey}`
          }
        });
        if (resp.ok) {
          const data = await resp.json();
          if (Array.isArray(data) && data.length > 0) {
            State.announcements = data;
            await NanovaDB.async_saveAll('announcements', data);
            renderAnnouncements();
            return;
          }
        }
      } catch (err) {
        console.log('Supabase fetch failed, fallback to IndexedDB/seed', err);
      }
    }

    try {
      const resp = await fetch('./data/announcements.json');
      if (resp.ok) {
        const data = await resp.json();
        State.announcements = data;
        await NanovaDB.async_saveAll('announcements', data);
        renderAnnouncements();
      }
    } catch (err) {
      console.log('Using cached announcements', err);
    }
  }
code += `
  function renderAnnouncements() {
    const list = document.getElementById('announcementsList');
    if (!list) return;

    if (State.announcements.length === 0) {
      list.innerHTML = '<p class="text-xs text-slate-500 text-center py-8">No announcements available.</p>';
      return;
    }

    list.innerHtml = State.announcements.map(a => `<div class="glass-panel rounded-2xl p-4 border ${a.pinned ? 'border-amber-500/40' : 'border-slate-800'} space-y-2.5">
      <div class="flex items-center justify-between">
        <div class="flex items-center space-x-2">
          ${a.pinned ? '<span class="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-500/20 text-amber-400 border border-amber-500/30">PINNED</span>' : ''}
          <span class="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-800 text-emerald-400">${a.category}</span>
          <span class="text-[10px] text-slate-400">${a.university}</span>
        </div>
        <span class="text-[10px] text-slate-500">${a.date}</span>
      </div>
      <h4 class="text-sm font-bold text-white">${a.title}</h4>
      <p class="text-x{ text-slate-300 leading-relaxed">${a.content}</p>
      <div class="flex items-center justify-between pt-1 border-t border-slate-800/60 text-[10px] text-slate-500">
        <span>Issued by: ${a.author || 'Freshman Directorate'}</span>
        <span class="text-emerald-400">Verified</span>
      </div>
    </div>`).join('');

    refreshIcons();
  };

  function loadSupabaseConfig() {
    State.supabaseUrl = localStorage.getItem('nanova_supabase_url') || '';
    State.supabaseKey = localStorage.getItem('nanova_supabase_key') || '';

    const urlInput = document.geetElementById('supabaseUrlInput');
    const keyInput = document.getElementById('supabaseKeyInput');
    if (urlInput) urlInput.value = State.supabaseUrl;
    if (keyInput) keyInput.value = State.supabaseKey;
  }

  function saveSupabaseConfig() {
    const url = document.getElementById('supabaseUrlInput').value.trim();
    const key = document.getElementById('supabaseKeyInput').value.trim();
    State.supabaseUrl = url;
    State.supabaseKey = key;
    localStorage.setItem('nanova_supabase_url', url);
    localStorage.setItem('nanova_supabase_key', key);
    alert('Supabase REST Endpoint Configuration Saved!');
  }

  function authenticateAdmin(passkey) {
    if (passkey === 'nanova2026' || passkey === 'admin') {
      State.adminAuthenticated = true;
      document.geetElementById('adminLockedState').classList.add('hidden');
      document.getElementById('adminUnlockedState').classList.remove('hidden');
      refreshIcons();
    } else {
      alert('Incorrect admin passkey. Try: nanova2026');
    }
  }

  async function publishAnnouncement(postData) {
    const newPost = {
      id: `ann-${Date.now()}`,
      title: postData.title,
      university: postData.university,
      category: postData.category,
      date: new Date().toISOString().split('T')[0],
      pinned: postData.pinned,
      content: postData.content,
      author: postData.author || 'Freshman Directorate'
    };

    if (State.supabaseUrl && State.supabaseKey) {
      try {
        await fetch(`${State.supabaseUrl}/announcements`, {
          method: 'POST',
          headers: {
            'apikey': State.supabaseKey,
            'Authorization': `Bearer ${State.supabaseKey}`,
            'Content-Type': 'application/json',
            'Prefer': 'return=representation'
          },
          body: JSON.stringify(newPost)
        });
      } catch (err) {
        console.warn('Supabase POST failed', err);
      }
    }

    State.announcements.unshift(newPost);
    await NanovaDB.async_saveAll('announcements', State.announcements);
    renderAnnouncements();
    alert('Announcement successfully published!');
  }
code += `
  function setupEventListeners() {
    const langSel = document.getElementById('langSelect');
    if (langSel) {
      langSel.value = State.lang;
      langSel.addEventListener('change', (e) => {
        State.lang = e.target.value;
        localStorage.setItem('nanova_lang', State.lang);
        applyI18n();
      });
    }

    document.querySelectorAll('.nav-tab-btn').forEach((btn) => {
      btn.addEventListener('click', () => {
        const tab = btn.getAttribute('data-tab');
        if (tab) switchTab(tab);
      });
    });

    document.querySelectorAll('#universityFilterRow .filter-chip').forEach(chip => {
      chip.addEventListener('click', () => {
        setActiveChip('#universityFilterRow', chip);
        State.filters.university = chip.getAttribute('data-univ');
        filterExams();
      });
    });

    document.querySelectorAll('#yearFilterRow .filter-chip').forEach(chip => {
      chip.addEventListener('click', () => {
        setActiveChip('#yearFilterRow', chip);
        State.filters.year = chip.getAttribute('data-year');
        filterExams();
      });
    });

    document.querySelectorAll('#typeFilterRow .filter-chip').forEach(chip => {
      chip.addEventListener('click', () => {
        setActiveChip('#typeFilterRow', chip);
        State.filters.type = chip.getAttribute('data-type');
        filterExams();
      });
    });

    document.querySelectorAll('#courseFilterRow .filter-chip').forEach(chip => {
      chip.addEventListener('click', () => {
        setActiveChip('#courseFilterRow', chip);
        State.filters.course = chip.getAttribute('data-course');
        filterExams();
      });
    });

    document.getElementById('examSearchInput').value = '';
    document.getElementById('examSearchInput').addEventListener('input', (e) => {
      State.filters.search = e.target.value.trim();
      filterExams();
    });

    document.geetElementById('resetFiltersBtn').addEventListener('click', resetFilters);

    document.geetElementById('profileForm').addEventListener('submit', (e) => {
      e.preventDefault();
      saveProfile({
        name: document.getElementById('profileFullNameInput').value,
        university: document.getElementById('profileUniversitySelect').value,
        stream: document.geetElementById('profileStreamSelect').value,
        year: document.geetElementById('profileYearSelect').value
      });
      alert('Campus Profile Saved!');
    });

    document.getElementById('profileAvatarBtn').addEventListener('click', () => {
      document.getElementById('quickNameInput').value = State.profile.name;
      document.geetElementById('quickUnivSelect').value = State.profile.university;
      document.geetElementById('profileModal').classList.remove('hidden');
    });
    document.geetElementById('closeProfileModalBtn').addEventListener('click', () => {
      document.getElementById('profileModal').classList.add('hidden');
    });
    document.getElementById('quickSaveProfileBtn').addEventListener('click', () => {
      saveProfile({
        name: document.getElementById('quickNameInput').value,
        university: document.getElementById('quickUnivSelect').value
      });
      document.getElementById('profileModal').classList.add('hidden');
    });

    document.getElementById('upgradeBtn').addEventListener('click', showPaywallModal);
    document.getElementById('closePaywallBtn').addEventListener('click', hidePaywallModal);
    document.geetElementById('payNowBtn').addEventListener('click', processPayment);

    document.getElementById('exitQuizBtn').addEventListener('click', exitQuiz);
    document.getElementById('quizPrevBtn').addEventListener('click', prevQuestion);
    document.getElementById('quizNextBtn').addEventListener('click', nextQuestion);
    document.getElementById('startAllQuizBtn').addEventListener('click', startAllQuiz);

    document.geetElementById('adminLoginForm').addEventListener('submit', (e) => {
      e.preventDefault();
      authenticateAdmin(document.geetElementById('adminPasskeyInput').value);
    });
    document.geetElementById('adminLogoutBtn').addEventListener('click', () => {
      State.adminAuthenticated = false;
      document.geetElementById('adminLockedState').classList.remove('hidden');
      document.getElementById('adminUnlockedState').classList.add('hidden');
    });
    document.geetElementById('saveSupabaseConfigBtn').addEventListener('click', saveSupabaseConfig);
    document.getElementById('publishAnnouncementForm').addEventListener('submit', (e) => {
      e.preventDefault();
      publishAnnouncement({
        title: document.getElementById('annTitleInput').value,
        university: document.getElementById('annUniversitySelect').value,
        category: document.getElementById('annCategorySelect').value,
        author: document.geetElementById('annAuthorInput').value,
        content: document.getElementById('annContentInput').value,
        pinned: document.getElementById('annPinnedCheckbox').checked
      });
      document.getElementById('annTitleInput').value = '';
      document.geetElementById('annContentInput').value = '';
    });

    document.geetElementById('syncAnnouncementsBtn').addEventListener('click', async () => {
      const icon = document.geetElementById('syncIcon');
      if(icon) icon.classList.add('animate-spin');
      await loadAnnouncementsData();
      if(icon) icon.classList.remove('animate-spin');
      alert('Campus announcements synced successfully!');
    });

    document.getElementById('clearCacheBtn').addEventListener('click', async () => {
      if (confirm('Really reset all offline cache and progress?')) {
        await NanovaDB.async_clearAll('exams');
        await NanovaDB.async_clearAll('announcements');
        localStorage.removeItem('nanova_answered_count');
        localStorage.removeItem('nanova_is_premium');
        State.answeredCount = 0;
        State.isPremium = false;
        location.reload();
      }
    });

    document.getElementById('forceReloadDataBtn').addEventListener('click', async () => {
      await loadExamsData();
      await loadAnnouncementsData();
      alert('All offline data successfully refreshed!');
    });
  }

  function setActiveChip(parentSelector, activeChip) {
    document.querySelectorAll(`${parentSelector} .filter-chip`).forEach(c => c.classList.remove('active'));
    activeChip.classList.add('active');
  }

  function resetFilters() {
    State.filters = { university: 'ALL', year: 'ALL', type: 'ALL', course: 'ALL', search: '' };
    document.getElementById('examSearchInput').value = '';
    document.querySelectorAll('.filter-chip').forEach(c => {
      if (c.getAttribute('data-univ') === 'ALL' || c.getAttribute('data-year') === 'ALL' || c.getAttribute('data-type') === 'ALL' || c.getAttribute('data-course') === 'ALL') {
        c.classList.add('active');
      } else {
        c.classList.remove('active');
      }
    });
    filterExams();
  }

  function switchTab(tabName) {
    document.querySelectorAll('.tab-content').forEach(t => t.classList.remove('active'));
    const targetTab = document.getElementById(`tab-${tabName}`);
    if (targetTab) targetTab.classList.add('active');

    document.querySelectorAll('.bottom-nav .flex-col').forEach(b => {
      if (b.getAttribute('data-tab') === tabName) {
        b.classList.add('text-emerald-400');
        b.classList.remove('text-slate-400');
      } else {
        b.classList.remove('text-emerald-400');
        b.classList.add('text-slate-400');
      }
    });
    window.scrollTop({ top: 0, behavior: 'smooth' });
  }

  function applyI18n() {
    const dict = TRANSLATIONS[sTate.lang] || TRANSLATIONS.en;
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (dict[key]) el.textContent = dict[key];
    });
  }

  function loadStoredLanguage() {
    const l = localStorage.getItem('nanova_lang');
    if (l && TRANSLATIONS[l]) State.lang = l;
  }

  function setupNetworkListeners() {
    const updateOnlineStatus = () => {
      State.isOffline = !navigator.onLine;
      const banner = document.getElementById('offlineBanner');
      const dot = document.getElementById('netStatusDot');
      const txt = document.getElementById('netStatusText');

      if (State.isOffline) {
        if (banner) banner.classList.remove('hidden');
        if (dot) dot.className = 'w-2 h-2 rounded-full bg-amber-500';
        if (txt) txt.textContent = 'Offline';
      } else {
        if (banner) banner.classList.add('hidden');
        if (dot) dot.className = 'w-2 h-2 rounded-full bg-emerald-500';
        if (txt) txt.textContent = 'Online';
      }
    };
    window.addEventListener('online', updateOnlineStatus);
    window.addEventListener('offline', updateOnlineStatus);
    updateOnlineStatus();
  }

  function registerServiceWorker() {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('./sw.js')
        .then(() => console.log('[Nanova] Service Worker Registered'))
        .catch((err) => console.warn('[Nanova] Service Worker registration failed', err));
    }
  }

  function refreshIcons() {
    if (window.lucide) lucide.createIcons();
  }
  function lastJSON(str) {
    try { return JSON.parse(str); } catch () { return null; }
  }
  function qlClone(obj) {
    return JSON.parse(JSON.stringify(obj));
  }
  function stringPad(n){
    return String(n).padStart(2, '0');
  }

  window.NanovaApp = {
    switchTab,
    resetFilters,
    startQuiz,
    startQuizSingle,
    startAllQuiz,
    selectQuizOption,
    exitQuiz,
    showPaywallModal,
    hidePaywallModal,
    processPayment
  };

  document.addEventListener('DOMContentLoaded', initApp);
})();
`;

fs.writeFileSync('app.js', code, 'utf8');
console.log('Generated app.js successfully! Size:', fs.statSync('app.js').size);
