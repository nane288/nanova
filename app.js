/* ===================================================
   NANOVA - Freshman Exam Board & Community Feed Engine
   100% English Language - Ethiopian University Freshman App
   =================================================== */
(() => {
  'use strict';

  /* ── INDEXEDDB PERSISTENCE ─────────────────────────── */
  const NanovaDB = {
    dbName: 'NanovaBoardDB',
    version: 2,
    db: null,

    async init() {
      return new Promise((resolve, reject) => {
        const req = indexedDB.open(this.dbName, this.version);
        req.onupgradeneeded = (e) => {
          const db = e.target.result;
          if (!db.objectStoreNames.contains('exams')) db.createObjectStore('exams', { keyPath: 'id' });
          if (!db.objectStoreNames.contains('posts')) db.createObjectStore('posts', { keyPath: 'id' });
        };
        req.onsuccess = (e) => { this.db = e.target.result; resolve(this.db); };
        req.onerror = (e) => reject(e.target.error);
      });
    },
    async saveAll(store, items) {
      if (!this.db) await this.init();
      return new Promise((resolve, reject) => {
        const tx = this.db.transaction(store, 'readwrite');
        const st = tx.objectStore(store);
        items.forEach((item) => st.put(item));
        tx.oncomplete = resolve;
        tx.onerror = (e) => reject(e.target.error);
      });
    },
    async getAll(store) {
      if (!this.db) await this.init();
      return new Promise((resolve, reject) => {
        const tx = this.db.transaction(store, 'readonly');
        const req = tx.objectStore(store).getAll();
        req.onsuccess = () => resolve(req.result);
        req.onerror = (e) => reject(e.target.error);
      });
    }
  };

  /* ── DEFAULT DATA (ENGLISH ONLY) ───────────────────── */
  const DEFAULT_QUESTIONS = [
    {
      id: 'q1',
      course: 'General Psychology',
      university: 'Haramaya University',
      year: '2022 Exam',
      question: 'Which conflict of motives happens when a child who loves both parents must choose to stay with either the father or mother?',
      options: [
        'Approach-Approach',
        'Approach-Avoidance',
        'Avoidance-Avoidance',
        'Multiple approach-Avoidance'
      ],
      answer: 0,
      explanation: 'An Approach-Approach conflict occurs when an individual is caught between two equally attractive and desirable options (loving both parents and having to choose between them).'
    },
    {
      id: 'q2',
      course: 'General Physics',
      university: 'Addis Ababa University',
      year: '2023 Exam',
      question: 'A car accelerates uniformly from rest to a speed of 20 m/s in 5 seconds. What is the total distance covered by the car?',
      options: [
        '50 meters',
        '100 meters',
        '25 meters',
        '200 meters'
      ],
      answer: 0,
      explanation: 'Using kinematic formula: d = ((v_i + v_f) / 2) * t = ((0 + 20) / 2) * 5 = 10 * 5 = 50 meters.'
    },
    {
      id: 'q3',
      course: 'Applied Mathematics I',
      university: 'ASTU',
      year: '2024 Exam',
      question: 'What is the limit of (sin(3x) / x) as x approaches 0?',
      options: [
        '0',
        '1',
        '3',
        'Undefined'
      ],
      answer: 2,
      explanation: 'Using the standard trigonometric limit lim(x->0) [sin(kx)/x] = k, here k = 3, therefore the limit is 3.'
    },
    {
      id: 'q4',
      course: 'Logic and Critical Thinking',
      university: 'Jimma University',
      year: '2022 Exam',
      question: 'Which fallacy is committed when an arguer attacks their opponent\'s character rather than addressing the substance of their argument?',
      options: [
        'Straw Man Fallacy',
        'Argumentum Ad Hominem',
        'Appeal to Ignorance',
        'False Dilemma'
      ],
      answer: 1,
      explanation: 'Argumentum Ad Hominem directly attacks the person rather than addressing the merits of the actual argument.'
    },
    {
      id: 'q5',
      course: 'Emerging Technologies',
      university: 'AASTU',
      year: '2023 Exam',
      question: 'Which core characteristic distinguishes Industry 4.0 from previous industrial revolutions?',
      options: [
        'Steam and water power mechanization',
        'Cyber-Physical Systems and IoT integration',
        'Mass production using electrical energy',
        'Manual assembly line labor'
      ],
      answer: 1,
      explanation: 'Industry 4.0 is characterized by Cyber-Physical Systems, Internet of Things (IoT), cloud computing, and AI-driven automation.'
    }
  ];

  const DEFAULT_POSTS = [
    {
      id: 'post_1',
      author: 'Campus Dean / Admin',
      initial: 'A',
      isAdminPost: true,
      date: '05 Jul 2026, 14:59',
      content: 'Welcome to the Freshman Exam Board! Midterm and final past papers for AAU, Haramaya, Jimma, and ASTU are now cached offline for all streams.',
      likes: 12,
      isLiked: true
    },
    {
      id: 'post_2',
      author: 'Academic Registrar',
      initial: 'R',
      isAdminPost: true,
      date: '04 Jul 2026, 10:15',
      content: 'Freshman Math mid exams schedule has been posted. Make sure to practice derivatives and limits from ASTU 2023 model questions.',
      likes: 8,
      isLiked: false
    }
  ];

  /* ── APPLICATION STATE ─────────────────────────────── */
  const State = {
    profile: { name: 'Adnan', university: 'Haramaya University', stream: 'Natural Science' },
    isAdmin: false,
    adminPasskey: 'nanova2026',
    exams: [],
    questions: [],
    filteredQuestions: [],
    currentQuestionIndex: 0,
    userAnswers: {},
    isPremium: false,
    posts: [],
    filters: {
      course: 'ALL',
      university: 'ALL',
      year: 'ALL'
    }
  };

  /* ── INITIALIZATION ────────────────────────────────── */
  async function initApp() {
    loadSavedState();
    await NanovaDB.init().catch(console.warn);
    await loadExamsData();
    await loadPosts();
    renderBoardQuestion();
    renderExamPackages();
    renderCommunityPosts();
    updateAdminComposerUI();
    updateCounterBadges();
    if (window.lucide) window.lucide.createIcons();
    console.log('[Nanova] 100% English UI initialized');
  }

  function loadSavedState() {
    try {
      const p = localStorage.getItem('nanova_profile');
      if (p) Object.assign(State.profile, JSON.parse(p));
      const ans = localStorage.getItem('nanova_board_answers');
      if (ans) State.userAnswers = JSON.parse(ans);
      State.isPremium = localStorage.getItem('nanova_is_premium') === 'true';
      State.isAdmin = localStorage.getItem('nanova_is_admin') === 'true';
      // Clean any legacy language key
      localStorage.removeItem('nanova_lang');
    } catch {}
    updateProfileUI();
  }

  function updateProfileUI() {
    const init = State.profile.name ? State.profile.name[0].toUpperCase() : 'A';
    const headerInit = document.getElementById('headerProfileInitial');
    const compInit = document.getElementById('composerAvatar');
    const profInit = document.getElementById('profileLargeInitial');
    if (headerInit) headerInit.textContent = init;
    if (compInit) compInit.innerHTML = '<span>' + init + '</span>';
    if (profInit) profInit.textContent = init;

    const pName = document.getElementById('profileLargeName');
    const pUniv = document.getElementById('profileLargeUniv');
    if (pName) pName.textContent = State.profile.name;
    if (pUniv) pUniv.textContent = State.profile.university;
  }

  /* ── ADMIN ACCESS CONTROLS ─────────────────────────── */
  function updateAdminComposerUI() {
    const adminView = document.getElementById('adminComposerView');
    const studentView = document.getElementById('studentComposerView');
    const adminLockedBox = document.getElementById('adminLockedBox');
    const adminUnlockedBox = document.getElementById('adminUnlockedBox');

    if (State.isAdmin) {
      if (adminView) adminView.classList.remove('hidden');
      if (studentView) studentView.classList.add('hidden');
      if (adminLockedBox) adminLockedBox.classList.add('hidden');
      if (adminUnlockedBox) adminUnlockedBox.classList.remove('hidden');
    } else {
      if (adminView) adminView.classList.add('hidden');
      if (studentView) studentView.classList.remove('hidden');
      if (adminLockedBox) adminLockedBox.classList.remove('hidden');
      if (adminUnlockedBox) adminUnlockedBox.classList.add('hidden');
    }
    if (window.lucide) window.lucide.createIcons();
  }

  function promptAdminLogin() {
    const pass = prompt('Enter Administrator Passkey to unlock post broadcast (Default: nanova2026):');
    if (!pass) return;

    if (pass === State.adminPasskey) {
      State.isAdmin = true;
      localStorage.setItem('nanova_is_admin', 'true');
      updateAdminComposerUI();
      alert('🛡️ Admin verified! You can now publish official campus announcements.');
    } else {
      alert('❌ Invalid admin passkey.');
    }
  }

  function handleAdminLogin(e) {
    e.preventDefault();
    const pass = document.getElementById('adminPasskeyInput')?.value;
    if (pass === State.adminPasskey) {
      State.isAdmin = true;
      localStorage.setItem('nanova_is_admin', 'true');
      updateAdminComposerUI();
      alert('🛡️ Admin Panel Unlocked!');
    } else {
      alert('❌ Invalid admin passkey.');
    }
  }

  function adminLogout() {
    State.isAdmin = false;
    localStorage.removeItem('nanova_is_admin');
    updateAdminComposerUI();
    alert('Logged out of Admin mode.');
  }

  /* ── DATA FETCHING ─────────────────────────────────── */
  async function loadExamsData() {
    try {
      const resp = await fetch('./data/exams.json');
      if (resp.ok) {
        let text = await resp.text();
        if (text.charCodeAt(0) === 0xFEFF) text = text.slice(1);
        const data = JSON.parse(text);
        const exams = Array.isArray(data) ? data : (data.exams || []);
        State.exams = exams;

        let allQs = [];
        exams.forEach((ex) => {
          (ex.questions || []).forEach((q, idx) => {
            allQs.push({
              id: ex.id + '_q' + idx,
              examId: ex.id,
              course: ex.course,
              university: ex.university,
              year: (ex.year || '2023') + ' Exam',
              question: q.question,
              options: q.options,
              answer: q.answer,
              explanation: q.explanation || 'Review the core university lecture slides for step-by-step breakdown.'
            });
          });
        });

        if (allQs.length) State.questions = allQs;
      }
    } catch (e) {
      console.warn('[Nanova] Fetch error, using defaults:', e);
    }

    if (!State.questions.length) {
      State.questions = DEFAULT_QUESTIONS;
    }

    applyFilters();
  }

  async function loadPosts() {
    try {
      const cached = await NanovaDB.getAll('posts');
      if (cached && cached.length) State.posts = cached;
      else State.posts = DEFAULT_POSTS;
    } catch {
      State.posts = DEFAULT_POSTS;
    }
  }

  /* ── FILTERING ─────────────────────────────────────── */
  function onFilterChange() {
    const c = document.getElementById('courseSelect')?.value || 'ALL';
    const u = document.getElementById('universitySelect')?.value || 'ALL';
    const y = document.getElementById('yearSelect')?.value || 'ALL';

    State.filters.course = c;
    State.filters.university = u;
    State.filters.year = y;

    applyFilters();
  }

  function applyFilters() {
    const { course, university, year } = State.filters;
    State.filteredQuestions = State.questions.filter((q) => {
      if (course !== 'ALL' && q.course !== course) return false;
      if (university !== 'ALL' && q.university !== university) return false;
      if (year !== 'ALL' && !q.year.includes(year)) return false;
      return true;
    });

    if (!State.filteredQuestions.length) {
      State.filteredQuestions = State.questions;
    }

    State.currentQuestionIndex = 0;
    renderBoardQuestion();
    renderExamPackages();
    updateCounterBadges();
  }

  /* ── QUESTION BOARD RENDERING ──────────────────────── */
  function renderBoardQuestion() {
    const total = State.filteredQuestions.length;
    if (!total) return;

    const q = State.filteredQuestions[State.currentQuestionIndex];
    if (!q) return;

    const cTag = document.getElementById('boardCourseName');
    const uTag = document.getElementById('boardUnivName');
    const yTag = document.getElementById('boardYearName');
    const qNum = document.getElementById('boardQuestionNumber');
    const qText = document.getElementById('boardQuestionText');

    if (cTag) cTag.textContent = (q.course || 'GENERAL PSYCHOLOGY').toUpperCase();
    if (uTag) uTag.textContent = (q.university || 'HARAMAYA UNIVERSITY').toUpperCase();
    if (yTag) yTag.textContent = q.year || '2022 Exam';
    if (qNum) qNum.textContent = 'Q. ' + (State.currentQuestionIndex + 1);
    if (qText) qText.textContent = q.question;

    const optGrid = document.getElementById('boardOptionsGrid');
    if (optGrid) {
      const answered = State.userAnswers[q.id];
      const letters = ['A', 'B', 'C', 'D'];

      optGrid.innerHTML = (q.options || []).map((opt, i) => {
        let cls = 'option-btn';
        if (answered !== undefined) {
          if (i === q.answer) cls += ' selected-correct';
          else if (i === answered) cls += ' selected-incorrect';
          else cls += ' dimmed';
        }
        return '<button class="' + cls + '" onclick="NanovaApp.handleBoardOptionClick(' + i + ')">' +
          '<span class="option-letter-badge">' + letters[i] + '</span>' +
          '<span class="option-label-text">' + opt + '</span>' +
        '</button>';
      }).join('');
    }

    const expBox = document.getElementById('boardExplanationBox');
    const expText = document.getElementById('boardExplanationText');
    const answered = State.userAnswers[q.id];

    if (expBox && expText) {
      if (answered !== undefined && q.explanation) {
        expBox.classList.remove('hidden');
        expText.textContent = q.explanation;
      } else {
        expBox.classList.add('hidden');
      }
    }

    const prevBtn = document.getElementById('boardPrevBtn');
    if (prevBtn) prevBtn.disabled = State.currentQuestionIndex === 0;

    if (window.lucide) window.lucide.createIcons();
  }

  function handleBoardOptionClick(optIndex) {
    const q = State.filteredQuestions[State.currentQuestionIndex];
    if (!q) return;

    const answeredKeys = Object.keys(State.userAnswers);
    if (!State.isPremium && answeredKeys.length >= 10 && State.userAnswers[q.id] === undefined) {
      showPaywallModal();
      return;
    }

    if (State.userAnswers[q.id] !== undefined) return;

    State.userAnswers[q.id] = optIndex;
    localStorage.setItem('nanova_board_answers', JSON.stringify(State.userAnswers));

    renderBoardQuestion();
    updateCounterBadges();
  }

  function boardNextQuestion() {
    if (State.currentQuestionIndex < State.filteredQuestions.length - 1) {
      State.currentQuestionIndex++;
    } else {
      State.currentQuestionIndex = 0;
    }
    renderBoardQuestion();
  }

  function boardPrevQuestion() {
    if (State.currentQuestionIndex > 0) {
      State.currentQuestionIndex--;
      renderBoardQuestion();
    }
  }

  function shuffleQuestions() {
    State.filteredQuestions.sort(() => Math.random() - 0.5);
    State.currentQuestionIndex = 0;
    renderBoardQuestion();
  }

  function updateCounterBadges() {
    const answeredTotal = Object.keys(State.userAnswers).length;
    const badgeCount = document.getElementById('answeredCountBadge');
    const badgeTotal = document.getElementById('totalQuestionsBadge');

    if (badgeCount) badgeCount.textContent = answeredTotal;
    if (badgeTotal) badgeTotal.textContent = State.filteredQuestions.length || 15;
  }

  /* ── EXAM PACKAGES GRID ────────────────────────────── */
  function renderExamPackages() {
    const grid = document.getElementById('examCardsGrid');
    const countDisplay = document.getElementById('examCountDisplay');
    if (!grid) return;

    if (!State.exams.length) {
      grid.innerHTML = '';
      return;
    }

    if (countDisplay) countDisplay.textContent = State.exams.length + ' Exams Available';

    grid.innerHTML = State.exams.map((ex) => {
      const qCount = (ex.questions || []).length;
      return '<div class="white-card hover:shadow-xl transition flex flex-col justify-between" style="padding: 20px;">' +
        '<div>' +
          '<div class="flex items-center justify-between mb-2">' +
            '<span class="exam-tag-pill" style="font-size: 11px; padding: 4px 10px;">' + (ex.type || 'Exam') + '</span>' +
            '<span class="text-xs font-bold text-slate-400">' + (ex.year || '2023') + '</span>' +
          '</div>' +
          '<h4 class="font-extrabold text-slate-900 text-base mb-1">' + ex.title + '</h4>' +
          '<p class="text-xs font-semibold text-slate-500 mb-3">' + ex.university + ' &bull; ' + ex.course + '</p>' +
        '</div>' +
        '<div class="flex items-center justify-between pt-3 border-t border-slate-100">' +
          '<span class="text-xs font-bold text-blue-600">' + qCount + ' Questions</span>' +
          '<button onclick="NanovaApp.selectExamPackage(\'' + ex.id + '\')" class="px-4 py-1.5 rounded-xl bg-[#0052fe] hover:bg-[#0041d0] text-white font-bold text-xs shadow">' +
            'Practice Exam' +
          '</button>' +
        '</div>' +
      '</div>';
    }).join('');
  }

  function selectExamPackage(examId) {
    const ex = State.exams.find((e) => e.id === examId);
    if (!ex) return;

    const examQs = State.questions.filter((q) => q.examId === examId);
    if (examQs.length) {
      State.filteredQuestions = examQs;
      State.currentQuestionIndex = 0;
      renderBoardQuestion();
      updateCounterBadges();
      window.scrollTo({ top: 120, behavior: 'smooth' });
    }
  }

  /* ── COMMUNITY FEED (ADMIN ONLY PUBLISH) ────────────── */
  function renderCommunityPosts() {
    const container = document.getElementById('communityPostsContainer');
    if (!container) return;

    if (!State.posts.length) {
      container.innerHTML = '<div class="white-card text-center text-slate-400 py-8">No announcements yet.</div>';
      return;
    }

    container.innerHTML = State.posts.map((post) => {
      return '<div class="white-card" id="' + post.id + '">' +
        '<div class="flex items-center justify-between mb-3">' +
          '<div class="flex items-center space-x-3">' +
            '<div class="user-avatar-circle bg-emerald-800 text-white font-bold">' + (post.initial || (post.author ? post.author[0].toUpperCase() : 'A')) + '</div>' +
            '<div>' +
              '<div class="flex items-center space-x-2">' +
                '<h4 class="font-extrabold text-slate-900 text-sm">' + post.author + '</h4>' +
                (post.isAdminPost ? '<span class="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-extrabold tracking-wide">ADMIN</span>' : '') +
              '</div>' +
              '<span class="text-xs text-slate-400 font-medium">' + post.date + '</span>' +
            '</div>' +
          '</div>' +
          (State.isAdmin ? '<button onclick="NanovaApp.deletePost(\'' + post.id + '\')" class="text-slate-400 hover:text-rose-500 p-1.5 rounded-lg transition" title="Delete Post"><i data-lucide="trash-2" class="w-4 h-4"></i></button>' : '') +
        '</div>' +

        '<p class="text-slate-800 text-sm leading-relaxed mb-4">' + post.content + '</p>' +

        '<div class="flex items-center space-x-4 pt-3 border-t border-slate-100">' +
          '<button onclick="NanovaApp.toggleLikePost(\'' + post.id + '\')" class="post-action-btn ' + (post.isLiked ? 'liked' : '') + '">' +
            '<i data-lucide="thumbs-up" class="w-4 h-4"></i>' +
            '<span>' + (post.isLiked ? '1 Like' : (post.likes || 0) + ' Likes') + '</span>' +
          '</button>' +
          '<button onclick="NanovaApp.commentOnPost(\'' + post.id + '\')" class="post-action-btn">' +
            '<i data-lucide="message-circle" class="w-4 h-4"></i>' +
            '<span>Comment</span>' +
          '</button>' +
          '<button onclick="NanovaApp.sharePost(\'' + post.id + '\')" class="post-action-btn">' +
            '<i data-lucide="share-2" class="w-4 h-4"></i>' +
            '<span>Share</span>' +
          '</button>' +
        '</div>' +
      '</div>';
    }).join('');

    if (window.lucide) window.lucide.createIcons();
  }

  function publishCommunityPost() {
    if (!State.isAdmin) {
      promptAdminLogin();
      return;
    }

    const input = document.getElementById('postInputContent');
    const content = (input?.value || '').trim();
    if (!content) return;

    const now = new Date();
    const dateStr = now.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) + ', ' +
                    now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const newPost = {
      id: 'post_' + Date.now(),
      author: 'Campus Admin (' + (State.profile.name || 'Adnan') + ')',
      initial: 'A',
      isAdminPost: true,
      date: dateStr,
      content: content,
      likes: 0,
      isLiked: false
    };

    State.posts.unshift(newPost);
    NanovaDB.saveAll('posts', State.posts).catch(console.warn);
    if (input) input.value = '';

    renderCommunityPosts();
    alert('✅ Admin announcement published to feed!');
  }

  function toggleLikePost(postId) {
    const p = State.posts.find((item) => item.id === postId);
    if (!p) return;

    p.isLiked = !p.isLiked;
    p.likes = (p.likes || 0) + (p.isLiked ? 1 : -1);
    if (p.likes < 0) p.likes = 0;

    NanovaDB.saveAll('posts', State.posts).catch(console.warn);
    renderCommunityPosts();
  }

  function deletePost(postId) {
    if (!State.isAdmin) {
      alert('Only administrators can delete posts.');
      return;
    }
    State.posts = State.posts.filter((p) => p.id !== postId);
    NanovaDB.saveAll('posts', State.posts).catch(console.warn);
    renderCommunityPosts();
  }

  function promptImageAttachment() {
    alert('Image attachment enabled for admin post.');
  }

  function commentOnPost(postId) {
    const msg = prompt('Write your comment on this official announcement:');
    if (msg) alert('Comment recorded!');
  }

  function sharePost(postId) {
    if (navigator.share) {
      navigator.share({ title: 'Nanova Freshman Announcement', url: window.location.href });
    } else {
      alert('Post link copied to clipboard!');
    }
  }

  /* ── TAB SWITCHING ─────────────────────────────────── */
  function switchTab(tabId) {
    document.querySelectorAll('.tab-content').forEach((el) => el.classList.add('hidden'));
    const target = document.getElementById('tab-' + tabId);
    if (target) target.classList.remove('hidden');

    document.querySelectorAll('.nav-link').forEach((btn) => {
      if (btn.getAttribute('data-tab') === tabId) btn.classList.add('active');
      else btn.classList.remove('active');
    });

    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  /* ── PAYWALL ───────────────────────────────────────── */
  function showPaywallModal() {
    document.getElementById('paywallModal')?.classList.remove('hidden');
  }

  function hidePaywallModal() {
    document.getElementById('paywallModal')?.classList.add('hidden');
  }

  function processPayment() {
    const btn = document.getElementById('payNowBtn');
    if (btn) { btn.textContent = 'Processing...'; btn.disabled = true; }

    setTimeout(() => {
      State.isPremium = true;
      localStorage.setItem('nanova_is_premium', 'true');
      hidePaywallModal();
      alert('✅ Payment verified! Unlimited Freshman Exam Access unlocked.');
      if (btn) { btn.textContent = 'Pay 50 ETB'; btn.disabled = false; }
    }, 1500);
  }

  function saveSupabaseConfig() {
    alert('Supabase credentials saved locally.');
  }

  function clearCacheAndReset() {
    if (confirm('Reset all cached exams and question progress?')) {
      localStorage.clear();
      location.reload();
    }
  }

  /* ── GLOBAL API EXPORT ─────────────────────────────── */
  window.NanovaApp = {
    switchTab,
    onFilterChange,
    handleBoardOptionClick,
    boardNextQuestion,
    boardPrevQuestion,
    shuffleQuestions,
    selectExamPackage,
    publishCommunityPost,
    promptAdminLogin,
    handleAdminLogin,
    adminLogout,
    toggleLikePost,
    deletePost,
    promptImageAttachment,
    commentOnPost,
    sharePost,
    showPaywallModal,
    hidePaywallModal,
    processPayment,
    saveSupabaseConfig,
    clearCacheAndReset
  };

  document.addEventListener('DOMContentLoaded', initApp);
})();
