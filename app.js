/* ===================================================
   NANOVA PWA — app.js  (Ethiopian University Student App)
   Parts A-E: i18n, DB, State, Quiz engine, Announcements,
              Admin panel, Event listeners, Service Worker
   =================================================== */
(() => {
  'use strict';

  /* ── PART A: TRANSLATIONS ─────────────────────────── */
  const TRANSLATIONS = {
    en: {
      app_name: 'Nanova', tagline: "Ethiopia's Freshman Exam Hub",
      tab_exams: 'Exams', tab_announcements: 'News', tab_profile: 'Profile', tab_admin: 'Admin',
      filter_all: 'All', filter_midterm: 'Midterm', filter_final: 'Final', filter_model: 'Model',
      search_placeholder: 'Search exams...', reset_filters: 'Reset',
      start_quiz: 'Start Quiz', start_all: 'Practice All', questions_label: 'questions',
      free_questions: 'Free Questions Used', upgrade_btn: 'Unlock Premium - 50 ETB',
      paywall_title: 'Unlock All Exams',
      paywall_subtitle: "You've used your 10 free questions. Pay 50 ETB via Telebirr or Chapa to unlock everything.",
      select_payment_method: 'Select Payment Method',
      student_profile: 'Student Profile', full_name: 'Full Name', select_university: 'University',
      stream: 'Stream / Field', academic_year: 'Academic Year', save_profile: 'Save Profile',
      announcements_title: 'University Announcements', announcements_subtitle: 'Campus news and updates',
      sync_feed: 'Sync Feed', offline_storage: 'Offline Storage',
      storage_desc: 'Exam data is cached locally in IndexedDB for 100% offline access.',
      admin_title: 'Admin Panel', admin_passkey_label: 'Admin Passkey',
      admin_login: 'Login', admin_logout: 'Logout',
      supabase_url: 'Supabase URL', supabase_key: 'Supabase Anon Key', save_config: 'Save Config',
      ann_title: 'Title', ann_university: 'University', ann_category: 'Category',
      ann_author: 'Author', ann_content: 'Content', ann_pinned: 'Pin this announcement',
      publish: 'Publish', sync_announcements: 'Sync Announcements',
      clear_cache: 'Clear Cache & Reset', force_reload: 'Force Reload Data',
      online: 'Online', offline: 'Offline', question_of: 'of', time_left: 'Time Left',
      correct: 'Correct!', incorrect: 'Incorrect', explanation: 'Explanation',
      next: 'Next', prev: 'Previous', exit_quiz: 'Exit',
      score_label: 'Score', quiz_complete: 'Quiz Complete!'
    },
    om: {
      app_name: 'Nanova', tagline: 'Giddugala Qormaata Yunibarsitii Itoophiyaa',
      tab_exams: 'Qormaata', tab_announcements: 'Oduu', tab_profile: 'Profiila', tab_admin: 'Bulchiinsa',
      filter_all: 'Hunda', filter_midterm: 'Giddu-Galeessa', filter_final: 'Xumura', filter_model: 'Fakkeenyaa',
      search_placeholder: 'Qormaata Barbaadi...', reset_filters: "Deebi'i",
      start_quiz: 'Qormaata Jalqabi', start_all: 'Hunda Shaakal', questions_label: 'gaaffilee',
      free_questions: 'Gaaffilee Bilisaa Fayyadamte', upgrade_btn: 'Bilisaa Bani - Qar. 50 ETB',
      paywall_title: 'Qormaata Hunda Bani',
      paywall_subtitle: 'Gaaffilee 10 bilisaa xumurteetta. Qar. 50 ETB Telebirriin kafaluun qormaata hunda bani.',
      select_payment_method: 'Mala Kafaltii Filadhu',
      student_profile: 'Profiila Barataa', full_name: 'Maqaa Guutuu', select_university: 'Yunibarsitii',
      stream: 'Saayinsii / Gocha', academic_year: 'Bara Barnootaa', save_profile: "Profiila Olkaa'i",
      announcements_title: 'Beeksisa Yunibarsitii', announcements_subtitle: 'Oduu fi Odeeffannoo Yunibarsitii',
      sync_feed: 'Haromsuu', offline_storage: 'Kuusaa Offline',
      storage_desc: "Qormaatni IndexedDB keessatti kaachee ta'ee offline argama.",
      admin_title: 'Mana Bulchiinsaa', admin_passkey_label: 'Kilii Bulchiinsaa',
      admin_login: 'Seeni', admin_logout: "Ba'i",
      supabase_url: 'Supabase URL', supabase_key: 'Supabase Anon Key', save_config: "Qindaa'ina Olkaa'i",
      ann_title: 'Mata-Duree', ann_university: 'Yunibarsitii', ann_category: 'Gosa',
      ann_author: 'Barreessaa', ann_content: 'Qabiyyee', ann_pinned: 'Kana qabachuu',
      publish: 'Maxxansi', sync_announcements: 'Beeksisa Haromsuu',
      clear_cache: 'Kaachee Haqi', force_reload: 'Daataa Haaroomsuu',
      online: 'Onlaayinii', offline: 'Offline', question_of: 'of', time_left: 'Yeroo Hafee',
      correct: 'Sirrii!', incorrect: 'Dogoggora', explanation: 'Ibsa',
      next: 'Itti Aanaa', prev: 'Dura', exit_quiz: "Ba'i",
      score_label: 'Qabxii', quiz_complete: 'Qormaatni Xumurame!'
    },
    am: {
      app_name: 'Nanova', tagline: 'የኢትዮጵያ ዩኒቨርስቲ ፈተና ማዕከል',
      tab_exams: 'ፈተናዎች', tab_announcements: 'ዜና', tab_profile: 'መገለጫ', tab_admin: 'አስተዳደር',
      filter_all: 'ሁሉ', filter_midterm: 'ሚድተርም', filter_final: 'የመጨረሻ', filter_model: 'ናሙና',
      search_placeholder: 'ፈተና ፈልግ...', reset_filters: 'ዳግም',
      start_quiz: 'ፈተና ጀምር', start_all: 'ሁሉንም', questions_label: 'ጥያቄዎች',
      free_questions: 'ነፃ ጥያቄዎች', upgrade_btn: 'ፕሪሚየም ክፈት - 50 ብር',
      paywall_title: 'ሁሉንም ፈተናዎች ክፈት',
      paywall_subtitle: '10 ነፃ ጥያቄዎችን ተጠቀምህ። 50 ብር ከፍለህ ሁሉንም ፈተናዎች ክፈት።',
      select_payment_method: 'የክፍያ ዘዴ ምረጥ',
      student_profile: 'የተማሪ መገለጫ', full_name: 'ሙሉ ስም', select_university: 'ዩኒቨርስቲ',
      stream: 'የትምህርት ዘርፍ', academic_year: 'የትምህርት ዓመት', save_profile: 'መገለጫ አስቀምጥ',
      announcements_title: 'የዩኒቨርስቲ ማስታወቂያዎች', announcements_subtitle: 'የካምፓስ ዜና',
      sync_feed: 'አዘምን', offline_storage: 'ኦፍላይን ማከማቻ',
      storage_desc: 'የፈተና ውሂብ ለ100% ኦፍላይን ሽፋን በ IndexedDB ተከማችቷል።',
      admin_title: 'አስተዳዳሪ ፓኔል', admin_passkey_label: 'የአስተዳዳሪ ቁልፍ',
      admin_login: 'ግባ', admin_logout: 'ውጣ',
      supabase_url: 'Supabase URL', supabase_key: 'Supabase Anon Key', save_config: 'ቅንጅት አስቀምጥ',
      ann_title: 'ርዕስ', ann_university: 'ዩኒቨርስቲ', ann_category: 'ምድብ',
      ann_author: 'ጸሐፊ', ann_content: 'ይዘት', ann_pinned: 'ቀን',
      publish: 'አሳትም', sync_announcements: 'ማስታወቂያዎች አዘምን',
      clear_cache: 'ካሽ አጽዳ', force_reload: 'ውሂብ አስገድዶ ጫን',
      online: 'ኦንላይን', offline: 'ኦፍላይን', question_of: 'ከ', time_left: 'ቀሪ ጊዜ',
      correct: 'ትክክል!', incorrect: 'ስህተት', explanation: 'ማብራሪያ',
      next: 'ቀጣይ', prev: 'ቀዳሚ', exit_quiz: 'ውጣ',
      score_label: 'ነጥብ', quiz_complete: 'ፈተና ተጠናቀቀ!'
    }
  };

  /* ── PART B: INDEXEDDB ENGINE ─────────────────────── */
  const NanovaDB = {
    dbName: 'NanovaFreshmanDB', version: 1, db: null,
    async init() {
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
    async saveAll(storeName, items) {
      if (!this.db) await this.init();
      return new Promise((resolve, reject) => {
        const tx = this.db.transaction(storeName, 'readwrite');
        const store = tx.objectStore(storeName);
        items.forEach((item) => store.put(item));
        tx.oncomplete = resolve;
        tx.onerror = (e) => reject(e.target.error);
      });
    },
    async getAll(storeName) {
      if (!this.db) await this.init();
      return new Promise((resolve, reject) => {
        const tx = this.db.transaction(storeName, 'readonly');
        const req = tx.objectStore(storeName).getAll();
        req.onsuccess = () => resolve(req.result);
        req.onerror = (e) => reject(e.target.error);
      });
    },
    async clearAll(storeName) {
      if (!this.db) await this.init();
      return new Promise((resolve, reject) => {
        const tx = this.db.transaction(storeName, 'readwrite');
        tx.objectStore(storeName).clear();
        tx.oncomplete = resolve;
        tx.onerror = (e) => reject(e.target.error);
      });
    }
  };

  /* ── PART C: STATE MACHINE ────────────────────────── */
  const State = {
    lang: 'en', isOffline: !navigator.onLine,
    profile: { name: '', university: '', stream: '', year: '' },
    exams: [], filteredExams: [], announcements: [],
    filters: { university: 'ALL', year: 'ALL', type: 'ALL', course: 'ALL', search: '' },
    answeredCount: 0, isPremium: false, adminAuthenticated: false,
    supabase: { url: '', key: '' },
    quiz: { active: false, questions: [], currentIndex: 0, answers: {}, timer: null, timeLeft: 0, examMeta: null }
  };

  const ADMIN_PASSKEY = 'nanova2026';
  const FREE_LIMIT = 10;
  const QUIZ_TIME = 45;

  /* ── INITIALISATION ───────────────────────────────── */
  async function initApp() {
    loadStoredLanguage();
    loadStoredProfile();
    loadStoredPremium();
    applyI18n();
    setupNetworkListeners();
    populateProfileForm();
    updateFreemiumMeter();
    await NanovaDB.init().catch(console.warn);
    await loadExamsData();
    await loadAnnouncementsData();
    setupEventListeners();
    switchTab('exams');
    registerServiceWorker();
    console.log('[Nanova] App ready');
  }

  /* ── PROFILE ──────────────────────────────────────── */
  function loadStoredProfile() {
    try {
      const r = localStorage.getItem('nanova_profile');
      if (r) Object.assign(State.profile, JSON.parse(r));
    } catch { /* ignore */ }
  }
  function saveProfile(data) {
    Object.assign(State.profile, data);
    localStorage.setItem('nanova_profile', JSON.stringify(State.profile));
    renderProfileBadge();
    populateProfileForm();
  }
  function populateProfileForm() {
    const s = (id, v) => { const el = document.getElementById(id); if (el) el.value = v || ''; };
    s('profileFullNameInput', State.profile.name);
    s('profileUniversitySelect', State.profile.university);
    s('profileStreamSelect', State.profile.stream);
    s('profileYearSelect', State.profile.year);
    renderProfileBadge();
  }
  function renderProfileBadge() {
    const b = document.getElementById('profileBadge');
    if (b) b.textContent = State.profile.name ? State.profile.name[0].toUpperCase() : '?';
    const n = document.getElementById('profileDisplayName');
    if (n) n.textContent = State.profile.name || 'Student';
    const u = document.getElementById('profileDisplayUniv');
    if (u) u.textContent = State.profile.university || 'No University Set';
  }

  /* ── PREMIUM / PAYWALL ────────────────────────────── */
  function loadStoredPremium() {
    State.answeredCount = parseInt(localStorage.getItem('nanova_answered_count') || '0', 10);
    State.isPremium = localStorage.getItem('nanova_is_premium') === 'true';
  }
  function updateFreemiumMeter() {
    const wrap = document.getElementById('freemiumMeter');
    if (State.isPremium) { if (wrap) wrap.classList.add('hidden'); return; }
    if (wrap) wrap.classList.remove('hidden');
    const bar = document.getElementById('freemiumBar');
    const cnt = document.getElementById('freeQuestionsUsed');
    if (bar) bar.style.width = Math.min((State.answeredCount / FREE_LIMIT) * 100, 100) + '%';
    if (cnt) cnt.textContent = State.answeredCount + ' / ' + FREE_LIMIT;
  }
  function showPaywallModal() { document.getElementById('paywallModal')?.classList.remove('hidden'); }
  function hidePaywallModal() { document.getElementById('paywallModal')?.classList.add('hidden'); }
  function processPayment() {
    const m = document.querySelector('input[name="paymentMethod"]:checked');
    const name = m ? m.value : 'Telebirr';
    const btn = document.getElementById('payNowBtn');
    if (btn) { btn.textContent = 'Processing...'; btn.disabled = true; }
    setTimeout(() => {
      State.isPremium = true;
      localStorage.setItem('nanova_is_premium', 'true');
      hidePaywallModal();
      updateFreemiumMeter();
      showToast('Payment via ' + name + ' confirmed! Premium unlocked.');
      if (btn) { btn.textContent = 'Pay Now'; btn.disabled = false; }
    }, 2000);
  }

  /* ── EXAM DATA ────────────────────────────────────── */
  async function loadExamsData() {
    try {
      const cached = await NanovaDB.getAll('exams');
      if (cached && cached.length) { State.exams = cached; filterExams(); }
    } catch { /* no cache */ }
    try {
      const resp = await fetch('./data/exams.json');
      if (!resp.ok) throw new Error('net');
      const data = await resp.json();
      const exams = data.exams || data;
      State.exams = exams;
      await NanovaDB.saveAll('exams', exams).catch(console.warn);
      filterExams();
    } catch (err) {
      console.warn('[Nanova] exams fetch failed:', err.message);
      if (!State.exams.length) renderExamList([]);
    }
  }

  function filterExams() {
    const { university, year, type, course, search } = State.filters;
    const q = (search || '').toLowerCase();
    State.filteredExams = State.exams.filter((ex) => {
      if (university !== 'ALL' && ex.university !== university) return false;
      if (year !== 'ALL' && String(ex.year) !== String(year)) return false;
      if (type !== 'ALL' && ex.type !== type) return false;
      if (course !== 'ALL' && ex.course !== course) return false;
      if (q && !(
        (ex.title || '').toLowerCase().includes(q) ||
        (ex.course || '').toLowerCase().includes(q) ||
        (ex.university || '').toLowerCase().includes(q)
      )) return false;
      return true;
    });
    renderExamList(State.filteredExams);
  }

  function renderExamList(exams) {
    const c = document.getElementById('examList');
    if (!c) return;
    if (!exams.length) {
      c.innerHTML = '<div class="empty-state"><div style="font-size:2.5rem;margin-bottom:1rem">📚</div><h3>No exams found</h3><p>Try adjusting your filters.</p></div>';
      return;
    }
    c.innerHTML = exams.map((ex) => {
      const qn = (ex.questions || []).length;
      const tc = ex.type === 'Final' ? '#f59e0b' : ex.type === 'Model' ? '#8b5cf6' : '#10b981';
      return '<div class="exam-card" id="exam-' + ex.id + '">' +
        '<div class="exam-card-header"><div>' +
        '<span class="exam-tag" style="background:' + tc + '20;color:' + tc + '">' + (ex.type || 'Exam') + '</span>' +
        '<h3 class="exam-title">' + ex.title + '</h3>' +
        '<p class="exam-meta">' + ex.university + ' &bull; ' + ex.course + ' &bull; ' + (ex.year || '') + '</p>' +
        '</div><div class="exam-count">' + qn + '<span>Qs</span></div></div>' +
        '<div class="exam-card-footer">' +
        '<button class="btn-primary btn-sm" onclick="NanovaApp.startQuiz(\'' + ex.id + '\')">▶ Start Quiz</button>' +
        '<button class="btn-outline btn-sm" onclick="NanovaApp.startQuizSingle(\'' + ex.id + '\')">Flashcard</button>' +
        '</div></div>';
    }).join('');
  }

  /* ── QUIZ ENGINE ──────────────────────────────────── */
  function startQuiz(examId) {
    const exam = State.exams.find((e) => String(e.id) === String(examId));
    if (!exam || !(exam.questions || []).length) { showToast('No questions found.'); return; }
    launchQuiz(exam.questions, exam);
  }
  function startQuizSingle(examId) { startQuiz(examId); }
  function startAllQuiz() {
    const all = [];
    State.filteredExams.forEach((ex) => (ex.questions || []).forEach((q) => all.push(q)));
    if (!all.length) { showToast('No questions to practice.'); return; }
    launchQuiz(all, { title: 'All Exams Practice' });
  }
  function launchQuiz(questions, examMeta) {
    if (!State.isPremium && State.answeredCount >= FREE_LIMIT) { showPaywallModal(); return; }
    State.quiz = { active: true, questions, currentIndex: 0, answers: {}, timer: null, timeLeft: QUIZ_TIME, examMeta };
    document.getElementById('quizModal')?.classList.remove('hidden');
    renderQuizQuestion();
  }
  function renderQuizQuestion() {
    const { questions, currentIndex, answers } = State.quiz;
    const q = questions[currentIndex];
    if (!q) return;
    const total = questions.length;
    const dict = TRANSLATIONS[State.lang] || TRANSLATIONS.en;
    const setT = (id, v) => { const el = document.getElementById(id); if (el) el.textContent = v; };
    setT('quizCounter', (currentIndex + 1) + ' ' + dict.question_of + ' ' + total);
    setT('quizExamTitle', State.quiz.examMeta ? State.quiz.examMeta.title : 'Quiz');
    const pb = document.getElementById('quizProgressBar');
    if (pb) pb.style.width = (((currentIndex + 1) / total) * 100) + '%';
    setT('quizQuestionText', (currentIndex + 1) + '. ' + q.question);
    const oc = document.getElementById('quizOptions');
    if (oc) {
      const ans = answers[currentIndex];
      oc.innerHTML = (q.options || []).map((opt, i) => {
        let cls = 'quiz-option';
        if (ans !== undefined) {
          if (i === q.answer) cls += ' correct';
          else if (i === ans) cls += ' incorrect';
          else cls += ' disabled';
        }
        return '<button class="' + cls + '" onclick="NanovaApp.selectQuizOption(' + i + ')">' +
               '<span class="opt-letter">' + ['A','B','C','D'][i] + '</span> ' + opt + '</button>';
      }).join('');
    }
    const exp = document.getElementById('quizExplanation');
    if (exp) {
      if (answers[currentIndex] !== undefined && q.explanation) {
        exp.classList.remove('hidden');
        exp.innerHTML = '<strong>' + dict.explanation + ':</strong> ' + q.explanation;
      } else { exp.classList.add('hidden'); }
    }
    const prevB = document.getElementById('quizPrevBtn'); if (prevB) prevB.disabled = currentIndex === 0;
    const nextB = document.getElementById('quizNextBtn');
    if (nextB) nextB.textContent = currentIndex === total - 1 ? (dict.quiz_complete || 'Finish') : (dict.next || 'Next');
    clearInterval(State.quiz.timer);
    if (answers[currentIndex] === undefined) {
      State.quiz.timeLeft = QUIZ_TIME;
      const te = document.getElementById('quizTimer');
      State.quiz.timer = setInterval(() => {
        State.quiz.timeLeft--;
        if (te) te.textContent = State.quiz.timeLeft + 's';
        if (State.quiz.timeLeft <= 0) {
          clearInterval(State.quiz.timer);
          State.quiz.answers[currentIndex] = -1;
          bumpAnsweredCount();
          renderQuizQuestion();
        }
      }, 1000);
    }
  }
  function selectQuizOption(idx) {
    const { questions, currentIndex, answers } = State.quiz;
    if (answers[currentIndex] !== undefined) return;
    clearInterval(State.quiz.timer);
    State.quiz.answers[currentIndex] = idx;
    bumpAnsweredCount();
    const q = questions[currentIndex];
    document.querySelectorAll('.quiz-option').forEach((btn, i) => {
      btn.disabled = true;
      if (i === q.answer) btn.classList.add('correct');
      else if (i === idx) btn.classList.add('incorrect');
    });
    const exp = document.getElementById('quizExplanation');
    if (exp && q.explanation) {
      exp.classList.remove('hidden');
      exp.innerHTML = '<strong>Explanation:</strong> ' + q.explanation;
    }
    showToast(idx === q.answer ? 'Correct!' : 'Incorrect — Answer: ' + ['A','B','C','D'][q.answer]);
  }
  function bumpAnsweredCount() {
    if (!State.isPremium) {
      State.answeredCount++;
      localStorage.setItem('nanova_answered_count', State.answeredCount);
      updateFreemiumMeter();
      if (State.answeredCount >= FREE_LIMIT) {
        clearInterval(State.quiz.timer);
        setTimeout(() => { exitQuiz(); showPaywallModal(); }, 1500);
      }
    }
  }
  function prevQuestion() {
    if (State.quiz.currentIndex > 0) { clearInterval(State.quiz.timer); State.quiz.currentIndex--; renderQuizQuestion(); }
  }
  function nextQuestion() {
    clearInterval(State.quiz.timer);
    if (State.quiz.currentIndex >= State.quiz.questions.length - 1) finishQuiz();
    else { State.quiz.currentIndex++; renderQuizQuestion(); }
  }
  function finishQuiz() {
    const { questions, answers } = State.quiz;
    let correct = 0;
    questions.forEach((q, i) => { if (answers[i] === q.answer) correct++; });
    const score = Math.round((correct / questions.length) * 100);
    const qt = document.getElementById('quizQuestionText');
    if (qt) qt.innerHTML = '<div class="score-result"><div class="score-circle">' + score + '%</div><h3>Quiz Complete!</h3><p>Score: ' + correct + ' / ' + questions.length + '</p></div>';
    const oc = document.getElementById('quizOptions'); if (oc) oc.innerHTML = '';
    document.getElementById('quizExplanation')?.classList.add('hidden');
    const nb = document.getElementById('quizNextBtn'); if (nb) nb.style.display = 'none';
    const pb = document.getElementById('quizPrevBtn'); if (pb) pb.style.display = 'none';
  }
  function exitQuiz() {
    clearInterval(State.quiz.timer); State.quiz.active = false;
    document.getElementById('quizModal')?.classList.add('hidden');
    const nb = document.getElementById('quizNextBtn'); if (nb) { nb.style.display = ''; nb.textContent = 'Next'; }
    const pb = document.getElementById('quizPrevBtn'); if (pb) pb.style.display = '';
  }

  /* ── ANNOUNCEMENTS ────────────────────────────────── */
  async function loadAnnouncementsData() {
    try {
      const cached = await NanovaDB.getAll('announcements');
      if (cached && cached.length) { State.announcements = cached; renderAnnouncements(cached); }
    } catch { /* ignore */ }
    if (State.supabase.url && State.supabase.key) {
      try {
        const r = await fetch(State.supabase.url + '/rest/v1/announcements?select=*&order=created_at.desc', {
          headers: { 'apikey': State.supabase.key, 'Authorization': 'Bearer ' + State.supabase.key }
        });
        if (r.ok) { const d = await r.json(); State.announcements = d; await NanovaDB.saveAll('announcements', d).catch(console.warn); renderAnnouncements(d); return; }
      } catch { /* fallback */ }
    }
    try {
      const r = await fetch('./data/announcements.json');
      if (!r.ok) throw new Error('not found');
      const d = await r.json();
      const anns = d.announcements || d;
      State.announcements = anns;
      await NanovaDB.saveAll('announcements', anns).catch(console.warn);
      renderAnnouncements(anns);
    } catch (err) { console.warn('[Nanova] announcements failed:', err.message); }
  }
  function renderAnnouncements(anns) {
    const c = document.getElementById('announcementsList');
    if (!c) return;
    if (!anns.length) { c.innerHTML = '<div class="empty-state"><p>No announcements yet.</p></div>'; return; }
    const sorted = [...anns].sort((a, b) => (b.pinned ? 1 : 0) - (a.pinned ? 1 : 0));
    const clr = { Academic: '#10b981', Administrative: '#3b82f6', Event: '#8b5cf6', Emergency: '#ef4444' };
    c.innerHTML = sorted.map((a) => {
      const col = clr[a.category] || '#6b7280';
      return '<div class="announcement-card' + (a.pinned ? ' pinned' : '') + '">' +
        (a.pinned ? '<div class="pin-badge">📌 Pinned</div>' : '') +
        '<div class="ann-header"><span class="ann-tag" style="background:' + col + '20;color:' + col + '">' + (a.category || 'General') + '</span>' +
        '<span class="ann-univ">' + (a.university || 'All Universities') + '</span></div>' +
        '<h3 class="ann-title">' + a.title + '</h3>' +
        '<p class="ann-content">' + a.content + '</p>' +
        '<div class="ann-footer"><span>' + (a.author || 'Admin') + '</span><span>' + (a.date ? new Date(a.date).toLocaleDateString() : '') + '</span></div></div>';
    }).join('');
  }

  /* ── ADMIN ────────────────────────────────────────── */
  function authenticateAdmin(k) {
    if (k === ADMIN_PASSKEY) {
      State.adminAuthenticated = true;
      document.getElementById('adminLockedState')?.classList.add('hidden');
      document.getElementById('adminUnlockedState')?.classList.remove('hidden');
      try {
        const cfg = JSON.parse(localStorage.getItem('nanova_supabase') || '{}');
        const u = document.getElementById('supabaseUrlInput'); if (u) u.value = cfg.url || '';
        const kk = document.getElementById('supabaseKeyInput'); if (kk) kk.value = cfg.key || '';
      } catch { /* ignore */ }
    } else { showToast('Incorrect passkey'); }
  }
  function saveSupabaseConfig() {
    const url = (document.getElementById('supabaseUrlInput')?.value || '').trim();
    const key = (document.getElementById('supabaseKeyInput')?.value || '').trim();
    State.supabase = { url, key };
    localStorage.setItem('nanova_supabase', JSON.stringify({ url, key }));
    showToast('Supabase config saved');
  }
  async function publishAnnouncement(data) {
    if (!State.adminAuthenticated) { showToast('Not authenticated'); return; }
    const ann = { id: 'ann_' + Date.now(), ...data, date: new Date().toISOString() };
    if (State.supabase.url && State.supabase.key) {
      try {
        const r = await fetch(State.supabase.url + '/rest/v1/announcements', {
          method: 'POST',
          headers: { 'apikey': State.supabase.key, 'Authorization': 'Bearer ' + State.supabase.key, 'Content-Type': 'application/json' },
          body: JSON.stringify(ann)
        });
        if (r.ok) { showToast('Announcement published to Supabase'); await loadAnnouncementsData(); return; }
      } catch { /* fallback */ }
    }
    State.announcements.unshift(ann);
    await NanovaDB.saveAll('announcements', State.announcements).catch(console.warn);
    renderAnnouncements(State.announcements);
    showToast('Announcement saved locally');
  }

  /* ── PART E: EVENT LISTENERS ──────────────────────── */
  function setupEventListeners() {
    const ls = document.getElementById('langSelect');
    if (ls) {
      ls.value = State.lang;
      ls.addEventListener('change', (e) => { State.lang = e.target.value; localStorage.setItem('nanova_lang', State.lang); applyI18n(); });
    }
    document.querySelectorAll('.nav-tab-btn').forEach((b) => b.addEventListener('click', () => { const t = b.getAttribute('data-tab'); if (t) switchTab(t); }));

    wireFilterRow('#universityFilterRow', 'data-univ', 'university');
    wireFilterRow('#yearFilterRow', 'data-year', 'year');
    wireFilterRow('#typeFilterRow', 'data-type', 'type');
    wireFilterRow('#courseFilterRow', 'data-course', 'course');

    const si = document.getElementById('examSearchInput');
    if (si) si.addEventListener('input', (e) => { State.filters.search = e.target.value.trim(); filterExams(); });

    document.getElementById('resetFiltersBtn')?.addEventListener('click', resetFilters);
    document.getElementById('startAllQuizBtn')?.addEventListener('click', startAllQuiz);

    const pf = document.getElementById('profileForm');
    if (pf) pf.addEventListener('submit', (e) => {
      e.preventDefault();
      saveProfile({
        name: document.getElementById('profileFullNameInput')?.value || '',
        university: document.getElementById('profileUniversitySelect')?.value || '',
        stream: document.getElementById('profileStreamSelect')?.value || '',
        year: document.getElementById('profileYearSelect')?.value || ''
      });
      showToast('Profile saved!');
    });

    document.getElementById('profileAvatarBtn')?.addEventListener('click', () => {
      const qn = document.getElementById('quickNameInput'); const qu = document.getElementById('quickUnivSelect');
      if (qn) qn.value = State.profile.name; if (qu) qu.value = State.profile.university;
      document.getElementById('profileModal')?.classList.remove('hidden');
    });
    document.getElementById('closeProfileModalBtn')?.addEventListener('click', () => document.getElementById('profileModal')?.classList.add('hidden'));
    document.getElementById('quickSaveProfileBtn')?.addEventListener('click', () => {
      saveProfile({ name: document.getElementById('quickNameInput')?.value || '', university: document.getElementById('quickUnivSelect')?.value || '' });
      document.getElementById('profileModal')?.classList.add('hidden');
    });

    document.getElementById('upgradeBtn')?.addEventListener('click', showPaywallModal);
    document.getElementById('closePaywallBtn')?.addEventListener('click', hidePaywallModal);
    document.getElementById('payNowBtn')?.addEventListener('click', processPayment);

    document.getElementById('exitQuizBtn')?.addEventListener('click', exitQuiz);
    document.getElementById('quizPrevBtn')?.addEventListener('click', prevQuestion);
    document.getElementById('quizNextBtn')?.addEventListener('click', nextQuestion);

    const af = document.getElementById('adminLoginForm');
    if (af) af.addEventListener('submit', (e) => { e.preventDefault(); authenticateAdmin(document.getElementById('adminPasskeyInput')?.value || ''); });

    document.getElementById('adminLogoutBtn')?.addEventListener('click', () => {
      State.adminAuthenticated = false;
      document.getElementById('adminLockedState')?.classList.remove('hidden');
      document.getElementById('adminUnlockedState')?.classList.add('hidden');
    });

    document.getElementById('saveSupabaseConfigBtn')?.addEventListener('click', saveSupabaseConfig);

    const pubForm = document.getElementById('publishAnnouncementForm');
    if (pubForm) pubForm.addEventListener('submit', (e) => {
      e.preventDefault();
      publishAnnouncement({
        title: document.getElementById('annTitleInput')?.value || '',
        university: document.getElementById('annUniversitySelect')?.value || '',
        category: document.getElementById('annCategorySelect')?.value || '',
        author: document.getElementById('annAuthorInput')?.value || '',
        content: document.getElementById('annContentInput')?.value || '',
        pinned: document.getElementById('annPinnedCheckbox')?.checked || false
      });
      pubForm.reset();
    });

    document.getElementById('syncAnnouncementsBtn')?.addEventListener('click', async () => {
      const icon = document.getElementById('syncIcon');
      if (icon) icon.classList.add('animate-spin');
      await loadAnnouncementsData();
      if (icon) icon.classList.remove('animate-spin');
      showToast('Campus announcements synced!');
    });

    document.getElementById('clearCacheBtn')?.addEventListener('click', async () => {
      if (!confirm('Really reset all offline cache and progress?')) return;
      await NanovaDB.clearAll('exams').catch(console.warn);
      await NanovaDB.clearAll('announcements').catch(console.warn);
      localStorage.removeItem('nanova_answered_count');
      localStorage.removeItem('nanova_is_premium');
      State.answeredCount = 0; State.isPremium = false;
      location.reload();
    });

    document.getElementById('forceReloadDataBtn')?.addEventListener('click', async () => {
      await loadExamsData(); await loadAnnouncementsData(); showToast('All offline data refreshed!');
    });
  }

  /* ── HELPERS ──────────────────────────────────────── */
  function wireFilterRow(sel, attr, key) {
    document.querySelectorAll(sel + ' .filter-chip').forEach((chip) => {
      chip.addEventListener('click', () => { setActiveChip(sel, chip); State.filters[key] = chip.getAttribute(attr) || 'ALL'; filterExams(); });
    });
  }
  function setActiveChip(ps, active) {
    document.querySelectorAll(ps + ' .filter-chip').forEach((c) => c.classList.remove('active'));
    active.classList.add('active');
  }
  function resetFilters() {
    State.filters = { university: 'ALL', year: 'ALL', type: 'ALL', course: 'ALL', search: '' };
    const si = document.getElementById('examSearchInput'); if (si) si.value = '';
    document.querySelectorAll('.filter-chip').forEach((c) => {
      const isDef = ['data-univ','data-year','data-type','data-course'].some((a) => c.getAttribute(a) === 'ALL');
      if (isDef) c.classList.add('active'); else c.classList.remove('active');
    });
    filterExams();
  }
  function switchTab(name) {
    document.querySelectorAll('.tab-content').forEach((t) => t.classList.remove('active'));
    document.getElementById('tab-' + name)?.classList.add('active');
    document.querySelectorAll('.nav-tab-btn').forEach((b) => {
      const t = b.getAttribute('data-tab');
      if (t === name) b.classList.add('active'); else b.classList.remove('active');
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
  function applyI18n() {
    const dict = TRANSLATIONS[State.lang] || TRANSLATIONS.en;
    document.querySelectorAll('[data-i18n]').forEach((el) => { const k = el.getAttribute('data-i18n'); if (dict[k]) el.textContent = dict[k]; });
    document.querySelectorAll('[data-i18n-placeholder]').forEach((el) => { const k = el.getAttribute('data-i18n-placeholder'); if (dict[k]) el.placeholder = dict[k]; });
  }
  function loadStoredLanguage() { const l = localStorage.getItem('nanova_lang'); if (l && TRANSLATIONS[l]) State.lang = l; }
  function setupNetworkListeners() {
    const upd = () => {
      State.isOffline = !navigator.onLine;
      document.getElementById('offlineBanner')?.classList[State.isOffline ? 'remove' : 'add']('hidden');
      const d = document.getElementById('netStatusDot');
      if (d) d.className = 'w-2 h-2 rounded-full ' + (State.isOffline ? 'bg-amber-500' : 'bg-emerald-500');
      const t = document.getElementById('netStatusText');
      if (t) t.textContent = State.isOffline ? 'Offline' : 'Online';
    };
    window.addEventListener('online', upd); window.addEventListener('offline', upd); upd();
  }
  function registerServiceWorker() {
    if ('serviceWorker' in navigator) navigator.serviceWorker.register('./sw.js').then(() => console.log('[Nanova] SW registered')).catch(console.warn);
  }
  function showToast(msg, dur) {
    let t = document.getElementById('nanovaToast');
    if (!t) {
      t = document.createElement('div'); t.id = 'nanovaToast';
      t.style.cssText = 'position:fixed;bottom:90px;left:50%;transform:translateX(-50%);background:#1e293b;color:#f1f5f9;padding:12px 20px;border-radius:12px;font-size:14px;z-index:9999;box-shadow:0 4px 20px rgba(0,0,0,.4);transition:opacity .3s;max-width:90vw;text-align:center;';
      document.body.appendChild(t);
    }
    t.textContent = msg; t.style.opacity = '1';
    clearTimeout(t._t); t._t = setTimeout(() => { t.style.opacity = '0'; }, dur || 3000);
  }

  /* ── GLOBAL API ───────────────────────────────────── */
  window.NanovaApp = { switchTab, resetFilters, startQuiz, startQuizSingle, startAllQuiz, selectQuizOption, exitQuiz, showPaywallModal, hidePaywallModal, processPayment };

  document.addEventListener('DOMContentLoaded', initApp);
})();
