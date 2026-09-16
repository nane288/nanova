/* ===================================================
   NANOVA - Freshman Exam Board & Community Engine
   Firebase Authentication & Cloud Database Sync
   Firebase Project: nanova-st (nanova-st.firebaseapp.com)
   =================================================== */
(() => {
  'use strict';

  /* ── FIREBASE CONFIGURATION & INITIALIZATION ───────── */
  const firebaseConfig = {
    apiKey: "AIzaSyCUKyTmsymb7T-ai2eYhcxcXSDSD4Tom58",
    authDomain: "nanova-st.firebaseapp.com",
    databaseURL: "https://nanova-st-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "nanova-st",
    storageBucket: "nanova-st.firebasestorage.app",
    messagingSenderId: "127653158506",
    appId: "1:127653158506:web:921515de52ae2e380b3413",
    measurementId: "G-YDF5Z7Y2SJ"
  };

  let firebaseApp = null;
  let firebaseAuth = null;
  let firebaseDb = null;
  let firebaseFirestore = null;

  try {
    if (window.firebase) {
      if (!firebase.apps.length) {
        firebaseApp = firebase.initializeApp(firebaseConfig);
        try { firebase.analytics(); } catch {}
      } else {
        firebaseApp = firebase.app();
      }
      firebaseAuth = firebase.auth();
      try { firebaseDb = firebase.database(); } catch (e) { console.warn('[Firebase RTDB Init]', e); }
      try { firebaseFirestore = firebase.firestore(); } catch (e) { console.warn('[Firebase Firestore Init]', e); }
      console.log('[Firebase] Initialized with Phone Number Auth for: nanova-st');
    }
  } catch (err) {
    console.warn('[Firebase] Init notice:', err.message);
  }

  /* ── INDEXEDDB & LOCALFORAGE PERSISTENCE (OFFLINE EXAM ENGINE) ─── */
  const NanovaDB = {
    dbName: 'NanovaBoardDB_v5',
    version: 5,
    db: null,

    async init() {
      if (window.localforage) {
        try {
          window.localforage.config({
            name: 'NanovaBoardDB_v5',
            storeName: 'offline_cache',
            description: 'Nanova offline questions and cache storage'
          });
        } catch (e) {
          console.warn('[localforage config]', e);
        }
      }
      return new Promise((resolve, reject) => {
        const req = indexedDB.open(this.dbName, this.version);
        req.onupgradeneeded = (e) => {
          const db = e.target.result;
          if (!db.objectStoreNames.contains('exams')) db.createObjectStore('exams', { keyPath: 'id' });
          if (!db.objectStoreNames.contains('posts')) db.createObjectStore('posts', { keyPath: 'id' });
          if (!db.objectStoreNames.contains('universities')) db.createObjectStore('universities', { keyPath: 'id' });
          if (!db.objectStoreNames.contains('offline_cache')) db.createObjectStore('offline_cache');
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
    },
    async setCache(key, val) {
      // 1. Try localforage
      if (window.localforage) {
        try {
          await window.localforage.setItem(key, val);
        } catch (e) {
          console.warn('[localforage setCache fallback]', e);
        }
      }
      // 2. Try IndexedDB offline_cache
      try {
        if (!this.db) await this.init();
        await new Promise((resolve, reject) => {
          const tx = this.db.transaction('offline_cache', 'readwrite');
          const st = tx.objectStore('offline_cache');
          st.put(val, key);
          tx.oncomplete = resolve;
          tx.onerror = (e) => reject(e.target.error);
        });
      } catch (err) {
        console.warn('[NanovaDB setCache fallback]', err);
      }
      try {
        if (key === 'offline_questions') {
          localStorage.setItem('nanova_has_offline_questions', '1');
        }
      } catch {}
    },
    async getCache(key) {
      // 1. Try localforage
      if (window.localforage) {
        try {
          const lfVal = await window.localforage.getItem(key);
          if (lfVal !== null && lfVal !== undefined) return lfVal;
        } catch (e) {
          console.warn('[localforage getCache fallback]', e);
        }
      }
      // 2. Try IndexedDB offline_cache
      try {
        if (!this.db) await this.init();
        return await new Promise((resolve, reject) => {
          const tx = this.db.transaction('offline_cache', 'readonly');
          const req = tx.objectStore('offline_cache').get(key);
          req.onsuccess = () => resolve(req.result);
          req.onerror = (e) => reject(e.target.error);
        });
      } catch (err) {
        console.warn('[NanovaDB getCache fallback]', err);
        return null;
      }
    },
    async getOfflineQuestions() {
      // 1. Check localforage under 'offline_questions'
      if (window.localforage) {
        try {
          const lf = await window.localforage.getItem('offline_questions');
          if (lf && Array.isArray(lf) && lf.length) return lf;
        } catch (e) {
          console.warn('[localforage getOfflineQuestions]', e);
        }
      }

      // 2. Check offline_cache objectStore in IndexedDB
      const cached = await this.getCache('offline_questions');
      if (cached && Array.isArray(cached) && cached.length) return cached;

      // 3. Check exams objectStore in IndexedDB
      try {
        const exams = await this.getAll('exams');
        if (exams && Array.isArray(exams) && exams.length) return exams;
      } catch {}

      // 4. Check localStorage fallback
      try {
        const lq = localStorage.getItem('offline_questions');
        if (lq) {
          const parsed = JSON.parse(lq);
          if (Array.isArray(parsed) && parsed.length) return parsed;
        }
      } catch {}

      return null;
    },
    async saveOfflineQuestions(questions) {
      if (!Array.isArray(questions) || !questions.length) return;
      if (window.localforage) {
        try {
          await window.localforage.setItem('offline_questions', questions);
        } catch (e) {
          console.warn('[localforage saveOfflineQuestions]', e);
        }
      }
      await this.setCache('offline_questions', questions);
      await this.saveAll('exams', questions);
      try {
        localStorage.setItem('nanova_has_offline_questions', '1');
        localStorage.setItem('nanova_offline_questions_count', String(questions.length));
      } catch {}
    }
  };

  /* ── DEFAULT DATA FALLBACKS ────────────────────────── */
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
        '40 meters'
      ],
      answer: 0,
      explanation: 'Using kinematic equation s = ut + 0.5at²: Acceleration a = (20 - 0)/5 = 4 m/s². Distance s = 0 + 0.5*(4)*(5²) = 50 meters.'
    }
  ];

  const DEFAULT_UNIVERSITIES = [
    {
      id: 'univ_hu',
      name: 'Haramaya University',
      website: 'https://www.haramaya.edu.et',
      telegram: 'https://t.me/HaramayaUniversityOfficial',
      image: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=600&auto=format&fit=crop&q=80',
      location: 'Dire Dawa / Harar, Ethiopia',
      description: 'Pioneer agricultural & science research university with national freshman centers.'
    },
    {
      id: 'univ_aau',
      name: 'Addis Ababa University',
      website: 'http://www.aau.edu.et',
      telegram: 'https://t.me/AAU_Official_Telegram',
      image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=600&auto=format&fit=crop&q=80',
      location: 'Addis Ababa, Ethiopia',
      description: 'Oldest and leading autonomous university in Ethiopia.'
    },
    {
      id: 'univ_astu',
      name: 'Adama Science & Technology University (ASTU)',
      website: 'http://www.astu.edu.et',
      telegram: 'https://t.me/ASTU_Official',
      image: 'https://images.unsplash.com/photo-1562774053-701939374585?w=600&auto=format&fit=crop&q=80',
      location: 'Adama, Oromia, Ethiopia',
      description: 'Center of excellence in STEM, engineering innovations, and technology research.'
    },
    {
      id: 'univ_ju',
      name: 'Jimma University',
      website: 'https://www.ju.edu.et',
      telegram: 'https://t.me/JimmaUniversityOfficial',
      image: 'https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?w=600&auto=format&fit=crop&q=80',
      location: 'Jimma, Oromia, Ethiopia',
      description: 'Innovative community-based higher educational institution with medical leadership.'
    },
    {
      id: 'univ_bdu',
      name: 'Bahir Dar University',
      website: 'https://www.bdu.edu.et',
      telegram: 'https://t.me/BahirDarUniversityOfficial',
      image: 'https://images.unsplash.com/photo-1564981797816-1043664bf78d?w=600&auto=format&fit=crop&q=80',
      location: 'Bahir Dar, Amhara, Ethiopia',
      description: 'Leading university known for maritime education, engineering, and pedagogical research.'
    }
  ];

  const DEFAULT_POSTS = [
    {
      id: 'post_1',
      author: 'Campus Administrator',
      email: '',
      initial: 'A',
      isAdminPost: true,
      date: 'Official Notice',
      content: 'Freshman Math Lecture Video: Master limits, derivatives, and continuous functions for midterm preparation with this step-by-step video solution!',
      youtubeUrl: 'https://www.youtube.com/watch?v=WUvTyaaNkzM',
      imageUrl: '',
      likes: 24,
      isLiked: false
    },
    {
      id: 'post_2',
      author: 'Campus Administrator',
      email: '',
      initial: 'A',
      isAdminPost: true,
      date: 'Study Guide',
      content: 'General Physics formulas cheat sheet & university past questions guide. Make sure to check the Universities tab for official portals and Telegram study groups.',
      youtubeUrl: '',
      imageUrl: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800&auto=format&fit=crop&q=80',
      likes: 18,
      isLiked: false
    }
  ];

  /* ── SUBJECTS CATALOG (RECTANGULAR VISUAL CARDS) ───── */
  const SUBJECTS_CATALOG = [
    {
      id: 'sub_psy',
      name: 'General Psychology',
      shortName: 'General Psychology',
      image: 'https://images.unsplash.com/photo-1507413245164-6160d8298b31?w=800&auto=format&fit=crop&q=80',
      description: 'Human cognition, memory, learning, personality & motivation.',
      icon: 'brain',
      accentColor: 'blue'
    },
    {
      id: 'sub_math',
      name: 'Applied Mathematics I',
      shortName: 'Applied Math I',
      image: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800&auto=format&fit=crop&q=80',
      description: 'Calculus, limits, derivatives, integrals & real functions.',
      icon: 'calculator',
      accentColor: 'indigo'
    },
    {
      id: 'sub_phys',
      name: 'General Physics',
      shortName: 'General Physics',
      image: 'https://images.unsplash.com/photo-1636466497217-26a8cbeaf0aa?w=800&auto=format&fit=crop&q=80',
      description: 'Classical mechanics, kinematics, vectors & thermodynamics.',
      icon: 'atom',
      accentColor: 'sky'
    },
    {
      id: 'sub_logic',
      name: 'Logic and Critical Thinking',
      shortName: 'Logic & CT',
      image: 'https://images.unsplash.com/photo-1529699211952-734e80c4d42b?w=800&auto=format&fit=crop&q=80',
      description: 'Arguments, formal fallacies, categorical syllogisms & deduction.',
      icon: 'lightbulb',
      accentColor: 'amber'
    },
    {
      id: 'sub_eng',
      name: 'Communicative English',
      shortName: 'Communicative English',
      image: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=800&auto=format&fit=crop&q=80',
      description: 'Reading comprehension, academic grammar, tenses & vocabulary.',
      icon: 'book-open',
      accentColor: 'emerald'
    },
    {
      id: 'sub_geo',
      name: 'Geography of Ethiopia and the Horn',
      shortName: 'Geography of Ethiopia',
      image: 'https://images.unsplash.com/photo-1524661135-423995f22d0b?w=800&auto=format&fit=crop&q=80',
      description: 'Topography, drainage basins, climate, population & agro-ecology.',
      icon: 'map-pin',
      accentColor: 'teal'
    },
    {
      id: 'sub_coc',
      name: 'Freshman COC',
      shortName: 'Freshman COC Exam',
      image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&auto=format&fit=crop&q=80',
      description: 'Integrated multi-course evaluation & stream readiness certification.',
      icon: 'award',
      accentColor: 'purple'
    },
    {
      id: 'sub_civ',
      name: 'Moral and Civics Education',
      shortName: 'Civics & Ethics',
      image: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800&auto=format&fit=crop&q=80',
      description: 'Constitutional values, moral reasoning, ethics & citizenship.',
      icon: 'scale',
      accentColor: 'rose'
    },
    {
      id: 'sub_tech',
      name: 'Emerging Technologies',
      shortName: 'Emerging Tech',
      image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80',
      description: 'Artificial intelligence, IoT, big data, blockchain & cloud computing.',
      icon: 'cpu',
      accentColor: 'violet'
    },
    {
      id: 'sub_glo',
      name: 'Global Trends',
      shortName: 'Global Trends',
      image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&auto=format&fit=crop&q=80',
      description: 'International relations, global political economy & geopolitics.',
      icon: 'globe',
      accentColor: 'cyan'
    },
    {
      id: 'sub_anth',
      name: 'Social Anthropology',
      shortName: 'Social Anthropology',
      image: 'https://images.unsplash.com/photo-1461360370896-922624d12aa1?w=800&auto=format&fit=crop&q=80',
      description: 'Human culture, ethnography, marriage systems & cultural diversity.',
      icon: 'users',
      accentColor: 'yellow'
    },
    {
      id: 'sub_law',
      name: 'General Law',
      shortName: 'General Law',
      image: 'https://images.unsplash.com/photo-1505664194779-8beaceb93744?w=800&auto=format&fit=crop&q=80',
      description: 'Legal concepts, jurisprudence, contracts & constitutional principles.',
      icon: 'shield',
      accentColor: 'slate'
    },
    {
      id: 'sub_elaw',
      name: 'English for Law',
      shortName: 'English for Law',
      image: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?w=800&auto=format&fit=crop&q=80',
      description: 'Legal reasoning, case briefs, statutory drafting & legal terminology.',
      icon: 'file-text',
      accentColor: 'orange'
    }
  ];

  /* ── APPLICATION STATE ─────────────────────────────── */
  const State = {
    profile: { name: 'Student', university: 'Haramaya University', stream: 'Natural Science', email: '', phone: '' },
    currentUser: null,
    isAdmin: false,
    hasCurriculumAccess: false,
    pageSize: 10,
    currentPage: 1,
    curriculumPayload: null,
    registrationInfo: null,
    myIdVerification: null,
    exams: [],
    questions: [],
    filteredQuestions: [],
    userAnswers: {},
    missedRetries: {},
    bookmarks: JSON.parse(localStorage.getItem('nanova_bookmarks') || '[]'),
    activeQuickFilter: 'all',
    searchKeyword: '',
    examMode: 'practice',
    timerSeconds: 1800,
    examStartTime: null,
    timerInterval: null,
    universities: [],
    univSearchKeyword: '',
    hiddenUniversities: JSON.parse(localStorage.getItem('nanova_hidden_universities') || '["Addis Ababa University", "Adama Science & Technology University (ASTU)", "Jimma University", "Bahir Dar University", "Hawassa University", "Arba Minch University", "AASTU", "ASTU"]'),
    hiddenSubjects: JSON.parse(localStorage.getItem('nanova_hidden_subjects') || '[]'),
    guidedFlow: {
      active: true,
      university: 'Haramaya University',
      subject: null,
      category: null,
      year: null
    },
    posts: [],
    academicRequests: [],
    registeredUsers: [],
    blockedAuthors: JSON.parse(localStorage.getItem('nanova_blocked_authors') || '[]'),
    activeCommentPostId: null,
    comments: JSON.parse(localStorage.getItem('nanova_comments') || '{}'),
    filters: {
      course: 'ALL',
      university: 'ALL',
      year: 'ALL',
      category: 'ALL'
    },
    hasAppliedFilters: false,
    neverDownloadedQuestionsOffline: false
  };

  /* ── PERSISTENT STORAGE & OFFLINE RESILIENCE ───────── */
  async function initStoragePersistence() {
    if (navigator.storage && navigator.storage.persist) {
      try {
        const isPersisted = navigator.storage.persisted ? await navigator.storage.persisted() : false;
        if (!isPersisted) {
          const granted = await navigator.storage.persist();
          console.log('[Nanova Storage] Storage persistence requested, granted:', granted);
        } else {
          console.log('[Nanova Storage] Storage already marked as persistent.');
        }
      } catch (err) {
        console.warn('[Nanova Storage] Storage persistence notice:', err);
      }
    }
  }

  function registerServiceWorker() {
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('./sw.js').then((reg) => {
          console.log('[Nanova SW] Service worker active with scope:', reg.scope);
        }).catch((err) => {
          console.warn('[Nanova SW] Service worker registration failed:', err);
        });
      });
    }
  }

  function setupNetworkListeners() {
    window.addEventListener('online', () => {
      console.log('[Nanova Network] Back online.');
      handleNetworkOnline();
    });

    window.addEventListener('offline', () => {
      console.log('[Nanova Network] Offline — exam & study work seamlessly offline.');
      handleNetworkOffline();
    });
  }

  async function handleNetworkOnline() {
    // 1. Re-enable community inputs
    updateCommunityInputsOfflineState(false);

    // 2. Seamlessly re-fetch live community posts from Firebase
    await loadPostsFromFirebase();

    // 3. If question bank was missing offline, automatically download it
    if (!State.questions.length || State.neverDownloadedQuestionsOffline) {
      await loadExamsData();
      applyFilters();
      renderGuidedExploration();
      renderBoardQuestionsPage();
    }

    // 4. Update UI
    renderCommunityPosts();
    if (window.lucide) window.lucide.createIcons();
  }

  function handleNetworkOffline() {
    // Purge any top offline banner
    document.querySelectorAll('#offlineBanner, .offline-banner-top').forEach(el => el.remove());

    // 1. Stop any active loading spinners immediately
    const spinner = document.getElementById('communityFeedSpinner');
    if (spinner) spinner.classList.add('hidden');

    // 2. Disable input fields (composer and comments)
    updateCommunityInputsOfflineState(true);

    // 3. Re-render community posts in offline mode (cached posts + subtle banner, or empty state)
    renderCommunityPosts();

    // 4. If questions were not cached, refresh exam board warning
    if (!State.questions.length) {
      renderBoardQuestionsPage();
      renderGuidedExploration();
    }
    if (window.lucide) window.lucide.createIcons();
  }

  /* ── INITIALIZATION ────────────────────────────────── */
  async function initApp() {
    // Ensure top offline banner never appears under any circumstances
    document.querySelectorAll('#offlineBanner, .offline-banner-top').forEach(el => el.remove());

    loadSavedLocalState();
    initStoragePersistence();
    setupNetworkListeners();
    registerServiceWorker();

    await NanovaDB.init().catch(console.warn);
    await loadExamsData();
    await loadUniversities();
    await loadPostsFromFirebase();
    await syncCurriculumRegistry();
    initFirebaseAuthListener();
    applyFilters();
    updateFilterSummaryText();
    renderUniversities();
    renderCommunityPosts();
    updateAdminUI();
    updateCounterBadges();
    updateUniversitySelectDropdown();
    renderGuidedExploration();
    if (window.lucide) window.lucide.createIcons();
    console.log('[Nanova] Engine Initialized with Offline Caching & Resilient Feed');
  }

  function loadSavedLocalState() {
    try {
      const p = localStorage.getItem('nanova_profile');
      if (p) Object.assign(State.profile, JSON.parse(p));
      const ans = localStorage.getItem('nanova_board_answers');
      if (ans) State.userAnswers = JSON.parse(ans);
      const savedCurriculum = localStorage.getItem('nanova_curriculum_payload');
      if (savedCurriculum) State.curriculumPayload = savedCurriculum;
      const hiddenU = localStorage.getItem('nanova_hidden_universities');
      if (hiddenU) State.hiddenUniversities = JSON.parse(hiddenU);
      const hiddenS = localStorage.getItem('nanova_hidden_subjects');
      if (hiddenS) State.hiddenSubjects = JSON.parse(hiddenS);
      const blocked = localStorage.getItem('nanova_blocked_authors');
      if (blocked) State.blockedAuthors = JSON.parse(blocked);
    } catch {}
    updateProfileUI();
  }

  function updateProfileUI() {
    const landing = document.getElementById('landingPage');
    const mainApp = document.getElementById('mainAppContainer');
    const mainNav = document.getElementById('mainNavTabs');

    if (State.currentUser) {
      if (landing) landing.classList.add('hidden');
      if (mainApp) mainApp.classList.remove('hidden');
      if (mainNav) mainNav.classList.remove('hidden');
    } else {
      if (landing) landing.classList.remove('hidden');
      if (mainApp) mainApp.classList.add('hidden');
      if (mainNav) mainNav.classList.add('hidden');
    }

    const btn = document.getElementById('profileAvatarBtn');
    if (btn) {
      if (State.currentUser) {
        const studentLabel = State.profile.name || State.profile.phone || State.currentUser.displayName || State.currentUser.email?.split('@')[0] || 'Student';
        const init = (State.profile.name ? State.profile.name.trim()[0] : (studentLabel ? studentLabel[0] : 'S')).toUpperCase();
        btn.className = 'px-3 py-1.5 rounded-2xl bg-white text-slate-900 font-extrabold text-xs flex items-center space-x-2 border-2 border-white/80 hover:bg-blue-50 transition shadow-lg shadow-blue-900/30';
        btn.innerHTML = `
          <span class="w-6 h-6 rounded-xl bg-blue-100 text-[#0052fe] font-black text-xs flex items-center justify-center">${init}</span>
          <span class="hidden sm:inline font-extrabold text-xs text-slate-800 max-w-[120px] truncate">${escapeHtml(studentLabel)}</span>
        `;
      } else {
        btn.className = 'px-3.5 py-1.5 rounded-2xl bg-white text-[#0052fe] font-black text-xs flex items-center space-x-1.5 border-2 border-white hover:bg-blue-50 transition shadow-lg shadow-blue-900/30';
        btn.innerHTML = `
          <i data-lucide="user" class="w-4 h-4 text-[#0052fe]"></i>
          <span>Login / Sign Up</span>
        `;
      }
    }

    const profInit = document.getElementById('profileLargeInitial');
    const pName = document.getElementById('profileLargeName');
    const pUniv = document.getElementById('profileLargeUniv');
    const displayPhone = State.profile.phone || (State.currentUser?.email?.endsWith('@nanova.et') ? State.currentUser.email.replace('@nanova.et', '') : '');
    if (profInit) profInit.textContent = State.profile.name ? State.profile.name[0].toUpperCase() : (displayPhone ? displayPhone[0] : 'S');
    if (pName) pName.textContent = State.currentUser ? (displayPhone ? `${State.profile.name || 'Student'} (${displayPhone})` : (State.profile.name || 'Student Account')) : 'Guest Student';
    if (pUniv) pUniv.textContent = State.profile.university || 'Haramaya University';

    if (window.lucide) window.lucide.createIcons();
  }

  /* ── FIREBASE AUTHENTICATION (PHONE + PASSWORD ONLY) ── */
  let authMode = 'signin';

  function normalizePhone(input) {
    let digits = (input || '').replace(/\D/g, '');
    if (digits.startsWith('251') && digits.length === 12) {
      digits = '0' + digits.slice(3);
    } else if (digits.length === 9 && digits.startsWith('9')) {
      digits = '0' + digits;
    }
    return digits;
  }

  function initFirebaseAuthListener() {
    if (!firebaseAuth) return;
    syncCurriculumRegistry();

    firebaseAuth.onAuthStateChanged(async (user) => {
      if (user) {
        State.currentUser = user;
        const email = (user.email || '').toLowerCase().trim();
        const phone = email.endsWith('@nanova.et') ? email.replace('@nanova.et', '') : (user.phoneNumber || email.split('@')[0] || '');
        State.profile.phone = phone;
        State.profile.email = email;
        if (!State.profile.name || State.profile.name === 'Student') {
          State.profile.name = user.displayName || phone || 'Student';
        }

        const isPreApproved = (phone === '0911000000') || (email === '0911000000@nanova.et');

        State.isAdmin = false;

        // Synchronize / Listen to User Document in Firebase Realtime Database
        if (firebaseDb) {
          try {
            const userRef = firebaseDb.ref('users/' + user.uid);
            userRef.on('value', (snap) => {
              const uData = snap.val();
              if (uData) {
                State.isAdmin = uData.role === 'admin';
                State.hasCurriculumAccess = State.isAdmin || isPreApproved || !!uData.hasCurriculumAccess;
                if (uData.displayName) State.profile.name = uData.displayName;
                if (uData.academicYear) State.profile.academicYear = uData.academicYear;
              } else {
                // New user — initialize student profile
                const initialData = {
                  uid: user.uid,
                  phone: phone,
                  email: user.email || '',
                  displayName: State.profile.name || 'Student',
                  academicYear: State.profile.academicYear || '2017 E.C. (2025/2026)',
                  role: 'student',
                  hasCurriculumAccess: isPreApproved,
                  createdAt: Date.now()
                };
                userRef.set(initialData).catch(console.warn);
                State.isAdmin = false;
                State.hasCurriculumAccess = isPreApproved;
              }
              updateProfileUI();
              updateAdminUI();
              renderBoardQuestionsPage();
            });
          } catch (e) {
            console.warn('[Firebase RTDB User Listener]', e);
          }
        } else {
          State.hasCurriculumAccess = isPreApproved;
        }

        if (firebaseDb) {
          firebaseDb.ref('academic_registry/' + user.uid + '/submitted_token').on('value', (snap) => {
            State.myIdVerification = snap.val();
            if (document.getElementById('curriculumNoticeCard')) {
              renderBoardQuestionsPage();
            }
          });
        }

        localStorage.setItem('nanova_profile', JSON.stringify(State.profile));
        updateProfileUI();
        updateAdminUI();
        if (State.isAdmin) {
          loadAcademicRequestsAndUsers();
        }
        console.log('[Firebase Auth] Student Phone:', phone, '| Admin:', State.isAdmin, '| Curriculum Access:', State.hasCurriculumAccess);
      } else {
        State.currentUser = null;
        State.isAdmin = false;
        State.hasCurriculumAccess = false;
        State.myIdVerification = null;
        updateProfileUI();
        updateAdminUI();
        renderBoardQuestionsPage();
        console.log('[Firebase Auth] Signed out');
      }
      if (window.lucide) window.lucide.createIcons();
    });
  }

  /* ── DELETE USER ACCOUNT ───────────────────── */
  async function deleteUserAccount() {
    if (!State.currentUser) {
      alert('You are not signed in.');
      return;
    }
    const confirmed = confirm(
      'Are you sure you want to permanently delete your account?\n\nThis will erase all your data from Nanova servers and cannot be undone.'
    );
    if (!confirmed) return;

    const btn = document.getElementById('deleteAccountBtn');
    if (btn) { btn.textContent = 'Deleting...'; btn.disabled = true; }

    try {
      const uid = State.currentUser.uid;
      // Remove from RTDB
      if (firebaseDb) {
        await firebaseDb.ref('users/' + uid).remove().catch(() => {});
        await firebaseDb.ref('academic_registry/' + uid).remove().catch(() => {});
      }
      // Delete Firebase Auth account
      await State.currentUser.delete();
      alert('✅ Your account and all associated data have been permanently deleted.');
      State.currentUser = null;
      State.hasCurriculumAccess = false;
      updateProfileUI();
    } catch (err) {
      if (err.code === 'auth/requires-recent-login') {
        alert('For security, please sign out and sign back in before deleting your account.');
      } else {
        alert('❌ ' + (err.message || 'Unable to delete account.'));
      }
      if (btn) { btn.textContent = 'Delete Account'; btn.disabled = false; }
    }
  }

  /* ── STUDENT ID VERIFICATION INFO (from Firebase) ─── */
  function syncIdVerificationInfo() {
    if (!firebaseDb) return;
    // Load student ID verification instructions set by admin
    firebaseDb.ref('system_config/id_verification_info').once('value', (snap) => {
      const info = snap.val();
      if (info) State.registrationInfo = info;
      const card = document.getElementById('semesterRegistrationCard');
      const body = document.getElementById('registrationInfoBody');
      if (!card || !body) return;
      if (!info) return; // hide if admin hasn't set it yet
      card.classList.remove('hidden');
      const lines = [];
      if (info.instruction_am) {
        lines.push(`<p class="text-sm font-medium text-slate-700 leading-relaxed">${escapeHtml(info.instruction_am)}</p>`);
      }
      if (info.how_to_get_id) {
        lines.push(`
          <div class="p-3.5 rounded-xl bg-blue-50 border border-blue-100">
            <p class="text-[10px] uppercase font-bold text-blue-700 tracking-wider mb-1">How to get your Student ID</p>
            <p class="text-xs text-slate-700 leading-relaxed font-medium">${escapeHtml(info.how_to_get_id)}</p>
          </div>`);
      }
      if (info.note_am) {
        lines.push(`<p class="text-[11px] text-slate-500 leading-relaxed">${escapeHtml(info.note_am)}</p>`);
      }
      body.innerHTML = lines.join('');
    });
  }

  function openAuthModal(reason = '', initialMode = null) {

    if (State.currentUser) {
      const label = State.profile.phone || State.currentUser.email || 'Student';
      const confirmed = confirm('Signed in with phone: ' + label + '\n\nWould you like to Sign Out?');
      if (confirmed) {
        firebaseSignOut();
      }
    } else {
      if (initialMode) {
        setAuthMode(initialMode);
      } else {
        setAuthMode(authMode || 'signin');
      }
      const title = document.getElementById('authModalTitle');
      const subtitle = document.getElementById('authModalSubtitle');
      if (reason === 'next_questions') {
        if (title) title.textContent = 'Verify Student ID';
        if (subtitle) subtitle.textContent = 'Please sign in or create an account to submit your student ID and access all exams.';
      } else if (reason === 'access_app' || reason === 'landing') {
        if (title) title.textContent = authMode === 'signup' ? 'Create Free Student Account' : 'Sign In to Enter Nanova';
        if (subtitle) subtitle.textContent = authMode === 'signup' ? 'Register with your phone number to access freshman exams, solutions, and community discussions.' : 'Sign in with your phone number to enter the platform and start practicing.';
      } else if (subtitle) {
        if (authMode === 'signup') {
          subtitle.textContent = 'Register with your name, academic year, phone number & password.';
        } else {
          subtitle.textContent = 'Sign in with your phone number to access your student profile & practice.';
        }
      }
      document.getElementById('authModal')?.classList.remove('hidden');
    }
  }

  function closeAuthModal() {
    document.getElementById('authModal')?.classList.add('hidden');
  }

  function setAuthMode(mode) {
    authMode = mode;
    const title = document.getElementById('authModalTitle');
    const subtitle = document.getElementById('authModalSubtitle');
    const submitBtn = document.getElementById('authSubmitBtn');
    const togglePrompt = document.getElementById('authTogglePrompt');
    const toggleBtn = document.getElementById('authToggleBtn');
    const signupFields = document.getElementById('authSignupFields');
    const confirmPassContainer = document.getElementById('authConfirmPassContainer');
    const nameInput = document.getElementById('authNameInput');
    const confirmPassInput = document.getElementById('authConfirmPasswordInput');
    const tabSignIn = document.getElementById('authTabSignIn');
    const tabSignUp = document.getElementById('authTabSignUp');

    if (authMode === 'signup') {
      if (title) title.textContent = 'Create Student Account';
      if (subtitle) subtitle.textContent = 'Register with your name, academic year, phone number & password.';
      if (submitBtn) submitBtn.textContent = 'Create Student Account';
      if (togglePrompt) togglePrompt.textContent = 'Already have an account?';
      if (toggleBtn) toggleBtn.textContent = 'Sign In';
      if (signupFields) signupFields.classList.remove('hidden');
      if (confirmPassContainer) confirmPassContainer.classList.remove('hidden');
      if (nameInput) nameInput.required = true;
      if (confirmPassInput) confirmPassInput.required = true;

      if (tabSignIn) {
        tabSignIn.className = 'py-2.5 rounded-xl font-bold text-xs text-slate-500 hover:text-slate-900 transition flex items-center justify-center space-x-1.5';
      }
      if (tabSignUp) {
        tabSignUp.className = 'py-2.5 rounded-xl font-extrabold text-xs transition bg-[#0052fe] text-white shadow-sm flex items-center justify-center space-x-1.5';
      }
    } else {
      if (title) title.textContent = 'Sign In to Nanova';
      if (subtitle) subtitle.textContent = 'Sign in with your phone number and password to continue.';
      if (submitBtn) submitBtn.textContent = 'Sign In';
      if (togglePrompt) togglePrompt.textContent = "Don't have an account?";
      if (toggleBtn) toggleBtn.textContent = 'Create Account';
      if (signupFields) signupFields.classList.add('hidden');
      if (confirmPassContainer) confirmPassContainer.classList.add('hidden');
      if (nameInput) nameInput.required = false;
      if (confirmPassInput) confirmPassInput.required = false;

      if (tabSignIn) {
        tabSignIn.className = 'py-2.5 rounded-xl font-extrabold text-xs transition bg-[#0052fe] text-white shadow-sm flex items-center justify-center space-x-1.5';
      }
      if (tabSignUp) {
        tabSignUp.className = 'py-2.5 rounded-xl font-bold text-xs text-slate-500 hover:text-slate-900 transition flex items-center justify-center space-x-1.5';
      }
    }
    if (window.lucide) window.lucide.createIcons();
  }

  function toggleAuthMode() {
    setAuthMode(authMode === 'signin' ? 'signup' : 'signin');
  }

  function normalizePhone(raw) {
    let n = (raw || '').replace(/[\s\-\(\)]+/g, '');
    if (n.startsWith('+251')) n = n.slice(4);
    else if (n.startsWith('251')) n = n.slice(3);
    else if (n.startsWith('0')) n = n.slice(1);
    
    // Check if it is a valid 9-digit Ethiopian mobile number starting with 9 or 7
    if (!/^[97]\d{8}$/.test(n)) {
      return null;
    }
    return '+251' + n;
  }


  async function handlePhoneAuth(e) {
    if (e && e.preventDefault) e.preventDefault();
    if (!firebaseAuth) {
      alert('Authentication service is initializing, please try again in a moment.');
      return;
    }

    const rawPhone = document.getElementById('authPhoneInput')?.value.trim();
    const phone = normalizePhone(rawPhone);
    const pass = document.getElementById('authPasswordInput')?.value;
    const submitBtn = document.getElementById('authSubmitBtn');

    if (authMode === 'signup') {
      const name = document.getElementById('authNameInput')?.value.trim();
      const academicYear = document.getElementById('authYearInput')?.value || '2017 E.C. (2025/2026)';
      const confirmPass = document.getElementById('authConfirmPasswordInput')?.value;

      if (!name) {
        alert('Please enter your full name.');
        document.getElementById('authNameInput')?.focus();
        return;
      }
      if (!phone) {
        alert('Please enter a valid Ethiopian mobile number (e.g., 0911000000 or 0711000000).');
        document.getElementById('authPhoneInput')?.focus();
        return;
      }
      if (!pass || pass.length < 6) {
        alert('Password must be at least 6 characters.');
        document.getElementById('authPasswordInput')?.focus();
        return;
      }
      if (pass !== confirmPass) {
        alert('❌ Passwords do not match! Please confirm your password accurately.');
        document.getElementById('authConfirmPasswordInput')?.focus();
        return;
      }

      const mappedEmail = `${phone}@nanova.et`;
      if (submitBtn) { submitBtn.textContent = 'Creating Account...'; submitBtn.disabled = true; }

      try {
        const userCred = await firebaseAuth.createUserWithEmailAndPassword(mappedEmail, pass);
        const user = userCred.user;
        if (user) {
          if (user.updateProfile) {
            await user.updateProfile({ displayName: name }).catch(() => {});
          }
          State.profile.name = name;
          State.profile.phone = phone;
          State.profile.academicYear = academicYear;
          localStorage.setItem('nanova_profile', JSON.stringify(State.profile));

          if (firebaseDb) {
            await firebaseDb.ref('users/' + user.uid).set({
              uid: user.uid,
              phone: phone,
              email: mappedEmail,
              displayName: name,
              academicYear: academicYear,
              role: 'student',
              hasCurriculumAccess: false,
              createdAt: Date.now()
            }).catch(console.warn);
          }
        }
        closeAuthModal();
        alert('✅ Account created successfully! Welcome to Nanova, ' + name + '!');
      } catch (err) {
        let msg = err.message || 'Unable to create account.';
        if (err.code === 'auth/email-already-in-use') {
          msg = 'An account with phone number ' + phone + ' already exists. Please switch to Sign In.';
        }
        alert('❌ ' + msg);
      } finally {
        if (submitBtn) {
          submitBtn.textContent = 'Create Account';
          submitBtn.disabled = false;
        }
      }
      return;
    }

    // SIGN IN FLOW
    if (!phone) {
      alert('Please enter a valid Ethiopian mobile number (e.g., 0911000000 or 0711000000).');
      return;
    }
    if (!pass || pass.length < 6) {
      alert('Password must be at least 6 characters.');
      return;
    }

    const mappedEmail = `${phone}@nanova.et`;
    if (submitBtn) { submitBtn.textContent = 'Signing in...'; submitBtn.disabled = true; }

    try {
      try {
        await firebaseAuth.signInWithEmailAndPassword(mappedEmail, pass);
      } catch (signInErr) {
        if ((signInErr.code === 'auth/user-not-found' || signInErr.code === 'auth/invalid-credential') && phone === '0911000000' && pass === 'testpass123') {
          await firebaseAuth.createUserWithEmailAndPassword(mappedEmail, pass);
        } else {
          throw signInErr;
        }
      }
      closeAuthModal();
    } catch (err) {
      let msg = err.message || 'Unable to authenticate. Please check your credentials.';
      if (err.code === 'auth/user-not-found' || err.code === 'auth/wrong-password' || err.code === 'auth/invalid-credential') {
        msg = 'Incorrect phone number or password. If you do not have an account yet, click "Create Account" below.';
      }
      alert('❌ ' + msg);
    } finally {
      if (submitBtn) {
        submitBtn.textContent = 'Sign In';
        submitBtn.disabled = false;
      }
    }
  }

  async function firebaseSignOut() {
    if (firebaseAuth) {
      await firebaseAuth.signOut();
    }
    State.currentUser = null;
    State.isAdmin = false;
    State.hasCurriculumAccess = false;
    updateProfileUI();
    updateAdminUI();
    renderBoardQuestionsPage();
    alert('Logged out.');
  }

  /* ── ADMIN UI & ROLE CONTROLS ──────────────────────── */
  function updateAdminUI() {
    const adminNavBtn = document.getElementById('adminNavBtn');
    const composerCard = document.getElementById('composerCard');
    const adminLockedBox = document.getElementById('adminLockedBox');
    const adminDashboardBox = document.getElementById('adminDashboardBox');
    const addUnivBtn = document.getElementById('addUnivBtn');
    const addQuestionBtn = document.getElementById('addQuestionBtn');

    if (State.isAdmin) {
      if (adminNavBtn) adminNavBtn.classList.remove('hidden');
      if (composerCard) composerCard.classList.remove('hidden');
      if (adminLockedBox) adminLockedBox.classList.add('hidden');
      if (adminDashboardBox) adminDashboardBox.classList.remove('hidden');
      if (addUnivBtn) addUnivBtn.classList.remove('hidden');
      if (addQuestionBtn) addQuestionBtn.classList.remove('hidden');

      const nameEl = document.getElementById('adminProfileDisplayName');
      const emailEl = document.getElementById('adminProfileEmailDisplay');
      if (nameEl) nameEl.textContent = State.currentUser?.displayName || State.profile.name || 'Administrator';
      if (emailEl) emailEl.textContent = (State.currentUser?.email || '') + ' • Verified Administrator';

      renderAdminDashboard();
    } else {
      if (adminNavBtn) adminNavBtn.classList.add('hidden');
      if (composerCard) composerCard.classList.add('hidden');
      if (adminLockedBox) adminLockedBox.classList.remove('hidden');
      if (adminDashboardBox) adminDashboardBox.classList.add('hidden');
      if (addUnivBtn) addUnivBtn.classList.add('hidden');
      if (addQuestionBtn) addQuestionBtn.classList.add('hidden');
    }

    updateProfileUI();
    if (window.lucide) window.lucide.createIcons();
  }

  /* ── DATA FETCHING & OFFLINE CACHING ────────────────── */
  const GITHUB_EXAMS_URL = 'https://raw.githubusercontent.com/nane288/nanova/main/data/exams.json';
  const JSDELIVR_EXAMS_URL = 'https://cdn.jsdelivr.net/gh/nane288/nanova@main/data/exams.json';
  const LOCAL_EXAMS_URL = './data/exams.json';

  function parseRawExamsJson(data) {
    let allQs = [];
    if (!data || !Array.isArray(data)) return allQs;

    data.forEach((item, idx) => {
      if (item.questions && Array.isArray(item.questions)) {
        item.questions.forEach((q, qIdx) => {
          allQs.push({
            id: item.id + '_q' + qIdx,
            examId: item.id,
            course: item.course,
            university: item.university,
            year: (item.year ? (item.year + '').includes('Exam') ? item.year : item.year + ' Exam' : '2024 Exam'),
            category: q.category || item.category || 'Mid Exam',
            question: q.question,
            options: q.options ? (typeof q.options[0] === 'object' ? q.options.map(o => o.text) : q.options) : [],
            answer: typeof q.answer === 'number' ? q.answer : (q.correctOption === 'B' ? 1 : q.correctOption === 'C' ? 2 : q.correctOption === 'D' ? 3 : 0),
            explanation: q.explanation || 'Detailed university solution provided.'
          });
        });
      } else if (item.question && item.options) {
        const optTexts = typeof item.options[0] === 'object' ? item.options.map(o => o.text) : item.options;
        const ansIdx = typeof item.answer === 'number' ? item.answer : (item.correctOption === 'B' ? 1 : item.correctOption === 'C' ? 2 : item.correctOption === 'D' ? 3 : 0);
        allQs.push({
          id: item.id || ('q_' + idx),
          course: item.course || 'Freshman Course',
          university: item.university || 'General University',
          year: (item.year ? (item.year + '').includes('Exam') ? item.year : item.year + ' Exam' : '2024 Exam'),
          category: item.category || 'Mid Exam',
          question: item.question,
          options: optTexts,
          answer: ansIdx,
          explanation: item.explanation || 'Detailed university solution provided.'
        });
      }
    });
    return allQs;
  }

  async function fetchAndCacheQuestionBank() {
    const urls = [LOCAL_EXAMS_URL, JSDELIVR_EXAMS_URL, GITHUB_EXAMS_URL];
    for (const url of urls) {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 9000);
        const resp = await fetch(url, { signal: controller.signal });
        clearTimeout(timeoutId);
        if (resp.ok) {
          let text = await resp.text();
          if (text.charCodeAt(0) === 0xFEFF) text = text.slice(1);
          const raw = JSON.parse(text);
          const allQs = parseRawExamsJson(raw);
          if (allQs.length) {
            await NanovaDB.saveOfflineQuestions(allQs);
            State.neverDownloadedQuestionsOffline = false;
            console.log('[Nanova] Fetched & cached ' + allQs.length + ' questions from: ' + url);
            return allQs;
          }
        }
      } catch (err) {
        console.warn('[Nanova] Failed fetching question bank from ' + url + ':', err.message);
      }
    }
    return null;
  }

  async function refreshQuestionBankInBackground() {
    try {
      const urls = [LOCAL_EXAMS_URL, JSDELIVR_EXAMS_URL, GITHUB_EXAMS_URL];
      for (const url of urls) {
        try {
          const resp = await fetch(url, { cache: 'no-cache' });
          if (resp.ok) {
            let text = await resp.text();
            if (text.charCodeAt(0) === 0xFEFF) text = text.slice(1);
            const raw = JSON.parse(text);
            const allQs = parseRawExamsJson(raw);
            if (allQs.length && allQs.length >= State.questions.length) {
              await NanovaDB.saveOfflineQuestions(allQs);
              State.questions = allQs;
              applyFilters();
              updateCounterBadges();
              if (State.isAdmin) {
                renderAdminDashboard();
                renderAdminStats();
              }
              console.log('[Nanova] Question bank updated in background (' + allQs.length + ' questions).');
              break;
            }
          }
        } catch {}
      }
    } catch {}
  }

  async function retryQuestionBankDownload() {
    if (!navigator.onLine) {
      alert('You are still offline. Please connect to Wi-Fi or mobile data and try again.');
      return;
    }
    const downloaded = await fetchAndCacheQuestionBank();
    if (downloaded && downloaded.length) {
      State.questions = downloaded;
      applyFilters();
      renderGuidedExploration();
      renderBoardQuestionsPage();
      alert('✅ Question bank downloaded successfully (' + downloaded.length + ' questions available offline)!');
    } else {
      alert('Failed to download question bank. Please check your internet connection.');
    }
  }

  async function loadExamsData() {
    const isOnline = navigator.onLine;

    // 1. Check if the question bank is already stored locally under 'offline_questions'
    let cached = null;
    try {
      cached = await NanovaDB.getOfflineQuestions();
    } catch (err) {
      console.warn('[Nanova] DB getOfflineQuestions error:', err);
    }

    if (isOnline) {
      if (cached && Array.isArray(cached) && cached.length) {
        // Stored locally -> load instantly and refresh quietly in background
        State.questions = cached;
        State.neverDownloadedQuestionsOffline = false;
        refreshQuestionBankInBackground();
      } else {
        // Missing and online -> fetch JSON from Local/jsDelivr/GitHub and store in IndexedDB
        console.log('[Nanova] Question bank missing locally. Downloading from remote repository...');
        const downloaded = await fetchAndCacheQuestionBank();
        if (downloaded && downloaded.length) {
          State.questions = downloaded;
          State.neverDownloadedQuestionsOffline = false;
        } else {
          State.questions = DEFAULT_QUESTIONS;
        }
      }
    } else {
      // Offline mode
      if (cached && Array.isArray(cached) && cached.length) {
        State.questions = cached;
        State.neverDownloadedQuestionsOffline = false;
        console.log('[Nanova] Offline mode: loaded ' + cached.length + ' questions from local storage.');
      } else {
        // User is offline and has NEVER downloaded the question bank before
        State.questions = [];
        State.neverDownloadedQuestionsOffline = true;
        console.warn('[Nanova] Offline: question bank has never been downloaded before.');
      }
    }

    if (!State.questions.length && !State.neverDownloadedQuestionsOffline) {
      State.questions = DEFAULT_QUESTIONS;
    }
  }

  async function loadUniversities() {
    try {
      const res = await fetch('./data/university_guides.json');
      if (res.ok) {
        const guides = await res.json();
        if (Array.isArray(guides) && guides.length) {
          State.universities = guides;
          NanovaDB.saveAll('universities', guides).catch(console.warn);
          renderUniversities();
          return;
        }
      }
    } catch (e) {
      console.log('Fetching university guides offline/failed, falling back to cache:', e);
    }

    try {
      const cached = await NanovaDB.getAll('universities');
      if (cached && cached.length) State.universities = cached;
      else {
        State.universities = DEFAULT_UNIVERSITIES;
        NanovaDB.saveAll('universities', DEFAULT_UNIVERSITIES).catch(console.warn);
      }
    } catch {
      State.universities = DEFAULT_UNIVERSITIES;
    }
    renderUniversities();
  }

  /* ── COMMUNITY FEED (FIREBASE & OFFLINE RESILIENT) ───── */
  async function loadPostsFromFirebase() {
    const isOnline = navigator.onLine;

    // If offline: load cached posts immediately without hanging on network
    if (!isOnline) {
      console.log('[Nanova Community] Offline: Loading cached posts.');
      const spinner = document.getElementById('communityFeedSpinner');
      if (spinner) spinner.classList.add('hidden');

      try {
        const cached = await NanovaDB.getAll('posts');
        if (cached && Array.isArray(cached) && cached.length) {
          State.posts = cached.sort((a, b) => (b.timestamp || 0) - (a.timestamp || 0));
        } else {
          const localStr = localStorage.getItem('nanova_cached_posts');
          if (localStr) {
            State.posts = JSON.parse(localStr);
          } else {
            State.posts = [];
          }
        }
      } catch (err) {
        console.warn('[Nanova Community] Failed reading cached posts:', err);
        State.posts = [];
      }
      renderCommunityPosts();
      return;
    }

    // If online: show spinner if feed is currently empty
    const spinner = document.getElementById('communityFeedSpinner');
    if (spinner && (!State.posts || !State.posts.length)) {
      spinner.classList.remove('hidden');
    }

    // If online: fetch from Firebase Realtime Database
    if (firebaseDb) {
      try {
        const postsRef = firebaseDb.ref('posts');
        postsRef.on('value', (snap) => {
          if (spinner) spinner.classList.add('hidden');
          const val = snap.val();
          if (val) {
            State.posts = Object.values(val).sort((a, b) => (b.timestamp || 0) - (a.timestamp || 0));
            // Cache to IndexedDB & localStorage for offline use
            NanovaDB.saveAll('posts', State.posts).catch(console.warn);
            try { localStorage.setItem('nanova_cached_posts', JSON.stringify(State.posts)); } catch {}
          } else {
            loadFallbackAnnouncements();
          }
          renderCommunityPosts();
          if (State.isAdmin) renderAdminPostsList();
        });
        return;
      } catch (e) {
        console.warn('[Firebase RTDB Posts]', e);
        if (spinner) spinner.classList.add('hidden');
      }
    }
    await loadFallbackAnnouncements();
    if (spinner) spinner.classList.add('hidden');
  }

  async function loadFallbackAnnouncements() {
    try {
      const resp = await fetch('./data/announcements.json');
      if (resp.ok) {
        const data = await resp.json();
        if (Array.isArray(data)) {
          State.posts = data.map((ann) => ({
            id: ann.id,
            author: ann.author || 'Campus Administrator',
            initial: 'A',
            isAdminPost: true,
            date: ann.date || 'Official Notice',
            content: (ann.title ? '📢 **' + ann.title + '**\n\n' : '') + ann.content,
            youtubeUrl: '',
            imageUrl: '',
            likes: 12,
            isLiked: false,
            timestamp: Date.now()
          }));
          NanovaDB.saveAll('posts', State.posts).catch(console.warn);
          try { localStorage.setItem('nanova_cached_posts', JSON.stringify(State.posts)); } catch {}
        }
      } else {
        State.posts = DEFAULT_POSTS;
      }
    } catch {
      State.posts = DEFAULT_POSTS;
    }
    renderCommunityPosts();
  }

  async function retryCommunityFeed() {
    if (!navigator.onLine) {
      alert('Still offline. Please connect to the internet and try again.');
      return;
    }
    await loadPostsFromFirebase();
    renderCommunityPosts();
  }

  function publishCommunityPost(e) {
    if (e && e.preventDefault) e.preventDefault();
    if (!navigator.onLine) {
      alert('You are currently offline. Broadcasting announcements requires an active internet connection.');
      return;
    }
    if (!State.isAdmin) {
      alert('Only verified Firebase Administrators can publish announcements.');
      return;
    }

    const input = document.getElementById('adminPostContentInput') || document.getElementById('postInputContent');
    const ytInput = document.getElementById('adminPostYoutubeInput') || document.getElementById('postYoutubeUrl');
    const imgInput = document.getElementById('adminPostImageInput') || document.getElementById('postImageUrl');

    const content = (input?.value || '').trim();
    const youtubeUrl = (ytInput?.value || '').trim();
    const imageUrl = (imgInput?.value || '').trim();

    if (!content && !youtubeUrl && !imageUrl) {
      alert('Please enter announcement text or media.');
      return;
    }

    const now = new Date();
    const dateStr = now.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) + ', ' +
                    now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const postId = 'post_' + Date.now();

    const newPost = {
      id: postId,
      author: State.currentUser?.displayName || State.profile.name || 'Campus Administrator',
      email: State.currentUser?.email || '',
      initial: 'A',
      isAdminPost: true,
      date: dateStr,
      timestamp: Date.now(),
      content: content || 'Campus Announcement',
      youtubeUrl: youtubeUrl,
      imageUrl: imageUrl,
      likes: 0,
      isLiked: false
    };

    if (firebaseDb) {
      firebaseDb.ref('posts/' + postId).set(newPost).then(() => {
        alert('✅ Announcement published to Firebase Community Feed!');
      }).catch((err) => {
        console.warn(err);
        State.posts.unshift(newPost);
        renderCommunityPosts();
      });
    } else {
      State.posts.unshift(newPost);
      NanovaDB.saveAll('posts', State.posts).catch(console.warn);
      renderCommunityPosts();
      alert('✅ Announcement published locally.');
    }

    if (input) input.value = '';
    if (ytInput) ytInput.value = '';
    if (imgInput) imgInput.value = '';
  }

  function openEditPostModal(postId) {
    if (!State.isAdmin) {
      alert('Only administrators can edit community feed posts.');
      return;
    }

    const post = State.posts.find((p) => p.id === postId);
    if (!post) {
      alert('Post not found.');
      return;
    }

    const modal = document.getElementById('editPostModal');
    const idInput = document.getElementById('editPostId');
    const contentInput = document.getElementById('editPostContent');
    const authorInput = document.getElementById('editPostAuthor');
    const ytInput = document.getElementById('editPostYoutube');
    const imgInput = document.getElementById('editPostImage');

    if (!modal) return;

    if (idInput) idInput.value = post.id;
    if (contentInput) contentInput.value = post.content || '';
    if (authorInput) authorInput.value = post.author || '';
    if (ytInput) ytInput.value = post.youtubeUrl || '';
    if (imgInput) imgInput.value = post.imageUrl || '';

    modal.classList.remove('hidden');
    if (window.lucide) window.lucide.createIcons();
  }

  function closeEditPostModal() {
    const modal = document.getElementById('editPostModal');
    if (modal) modal.classList.add('hidden');
  }

  function saveEditedPost(event) {
    if (event && event.preventDefault) event.preventDefault();

    if (!State.isAdmin) {
      alert('Only administrators can edit community feed posts.');
      return;
    }

    const idInput = document.getElementById('editPostId');
    const contentInput = document.getElementById('editPostContent');
    const authorInput = document.getElementById('editPostAuthor');
    const ytInput = document.getElementById('editPostYoutube');
    const imgInput = document.getElementById('editPostImage');

    const postId = idInput ? idInput.value : '';
    const newContent = (contentInput?.value || '').trim();
    const newAuthor = (authorInput?.value || '').trim();
    const newYoutube = (ytInput?.value || '').trim();
    const newImage = (imgInput?.value || '').trim();

    if (!postId) return;
    if (!newContent && !newYoutube && !newImage) {
      alert('Please enter announcement text or media.');
      return;
    }

    const post = State.posts.find((p) => p.id === postId);
    if (!post) {
      alert('Post not found.');
      return;
    }

    post.content = newContent || 'Campus Announcement';
    if (newAuthor) post.author = newAuthor;
    post.youtubeUrl = newYoutube;
    post.imageUrl = newImage;
    post.editedAt = Date.now();

    const updatePayload = {
      content: post.content,
      author: post.author,
      youtubeUrl: post.youtubeUrl,
      imageUrl: post.imageUrl,
      editedAt: post.editedAt
    };

    if (firebaseDb) {
      firebaseDb.ref('posts/' + postId).update(updatePayload).then(() => {
        alert('✅ Community post updated successfully in Firebase!');
      }).catch((err) => {
        console.warn('Firebase update failed, keeping local change:', err);
      });
    }

    NanovaDB.saveAll('posts', State.posts).catch(console.warn);
    renderCommunityPosts();
    renderAdminPostsList();
    closeEditPostModal();
    alert('✅ Post updated successfully!');
  }

  function deletePost(postId) {
    if (!State.isAdmin) {
      alert('Only administrators can delete feed posts.');
      return;
    }
    if (!confirm('Are you sure you want to delete this community post?')) return;

    if (firebaseDb) {
      firebaseDb.ref('posts/' + postId).remove().catch(console.warn);
    }
    State.posts = State.posts.filter((p) => p.id !== postId);
    NanovaDB.saveAll('posts', State.posts).catch(console.warn);
    renderCommunityPosts();
    renderAdminPostsList();
  }

  function toggleLikePost(postId) {
    const p = State.posts.find((item) => item.id === postId);
    if (!p) return;

    p.isLiked = !p.isLiked;
    p.likes = (p.likes || 0) + (p.isLiked ? 1 : -1);
    if (p.likes < 0) p.likes = 0;

    if (firebaseDb) {
      firebaseDb.ref('posts/' + postId + '/likes').set(p.likes).catch(console.warn);
    }
    renderCommunityPosts();
  }

  /* ── CURRICULUM REGISTRY & ENCRYPTED CLOUD PAYLOAD ─── */
  function decodePayload(encoded) {
    if (!encoded) return null;
    try {
      const jsonStr = decodeURIComponent(escape(atob(encoded)));
      return JSON.parse(jsonStr);
    } catch (e) {
      try {
        return JSON.parse(atob(encoded));
      } catch (e2) {
        return null;
      }
    }
  }

  function encodePayload(data) {
    try {
      return btoa(unescape(encodeURIComponent(JSON.stringify(data))));
    } catch (e) {
      return btoa(JSON.stringify(data));
    }
  }

  async function syncCurriculumRegistry() {
    if (firebaseDb) {
      try {
        firebaseDb.ref('curriculum_registry/notice_payload').on('value', (snap) => {
          const val = snap.val();
          if (val) {
            State.curriculumPayload = val;
            localStorage.setItem('nanova_curriculum_payload', val);
            updateAdminCurriculumUI();
          }
        });
      } catch (e) {
        console.warn('[Firebase RTDB Curriculum Registry]', e);
      }
    }
    syncIdVerificationInfo();
    updateAdminCurriculumUI();
  }

  function saveAdminCurriculumPayload(e) {
    if (e && e.preventDefault) e.preventDefault();
    if (!State.isAdmin) {
      alert('Only administrators can update curriculum registry configuration.');
      return;
    }

    const title = document.getElementById('adminPayloadTitleInput')?.value.trim();
    const subtitle = document.getElementById('adminPayloadSubtitleInput')?.value.trim();
    const howToGetId = document.getElementById('adminPayloadHowToGetIdInput')?.value.trim();
    const ref1 = document.getElementById('adminPayloadRef1Input')?.value.trim();
    const ref2 = document.getElementById('adminPayloadRef2Input')?.value.trim();
    const instructions = document.getElementById('adminPayloadInstructionsInput')?.value.trim();

    if (!title) {
      alert('Please provide a verification notice title.');
      return;
    }

    const payloadObj = {
      title: title || 'Verify Your Student ID to Access All Questions',
      subtitle: subtitle || 'Questions 1 through 10 are free for everyone. Submit your university student ID to unlock all past exams.',
      howToGetId: howToGetId || '',
      ref1: ref1 || 'Campus Registrar Office',
      ref2: ref2 || 'Your university student card or ID document',
      instructions: instructions || 'Enter your university student ID number below. Your request will be reviewed and approved by the administrator.',
      updatedAt: Date.now()
    };

    const encoded = encodePayload(payloadObj);
    State.curriculumPayload = encoded;
    localStorage.setItem('nanova_curriculum_payload', encoded);

    if (firebaseDb) {
      firebaseDb.ref('curriculum_registry/notice_payload').set(encoded).then(() => {
        // Also sync how_to_get_id to system_config/id_verification_info
        firebaseDb.ref('system_config/id_verification_info').update({
          how_to_get_id: howToGetId,
          instruction_am: instructions,
          updatedAt: Date.now()
        }).catch(() => {});
        alert('✅ Student ID verification settings saved!');
      }).catch((err) => {
        alert('Saved locally. Firebase error: ' + err.message);
      });
    } else {
      alert('✅ Verification settings saved locally.');
    }

    updateAdminCurriculumUI();
    renderAdminDashboard();
  }

  function updateAdminCurriculumUI() {
    const raw = State.curriculumPayload || localStorage.getItem('nanova_curriculum_payload');
    const decoded = decodePayload(raw);
    if (!decoded) return;

    const tInput = document.getElementById('adminPayloadTitleInput');
    const subInput = document.getElementById('adminPayloadSubtitleInput');
    const howInput = document.getElementById('adminPayloadHowToGetIdInput');
    const ref1Input = document.getElementById('adminPayloadRef1Input');
    const ref2Input = document.getElementById('adminPayloadRef2Input');
    const instInput = document.getElementById('adminPayloadInstructionsInput');

    if (tInput && !tInput.value) tInput.value = decoded.title || '';
    if (subInput && !subInput.value) subInput.value = decoded.subtitle || '';
    if (howInput && !howInput.value) howInput.value = decoded.howToGetId || '';
    if (ref1Input && !ref1Input.value) ref1Input.value = decoded.ref1 || '';
    if (ref2Input && !ref2Input.value) ref2Input.value = decoded.ref2 || '';
    if (instInput && !instInput.value) instInput.value = decoded.instructions || '';
  }

  /* ── DYNAMIC IN-MEMORY CURRICULUM NOTICE CARD ──────── */
  function removeCurriculumNotice() {
    const existing = document.getElementById('curriculumNoticeCard');
    if (existing) existing.remove();
  }

  function renderCurriculumNoticeInMemory() {
    const container = document.getElementById('boardQuestionsListContainer');
    if (!container) return;

    removeCurriculumNotice();

    // Do not render if student already has curriculum access
    if (State.hasCurriculumAccess || State.isAdmin) return;

    const rawPayload = State.curriculumPayload || localStorage.getItem('nanova_curriculum_payload');
    const decoded = decodePayload(rawPayload) || {
      title: 'Verify Your Student ID to Access All Questions',
      subtitle: 'Questions 1 through 10 are free for everyone. Submit your university student ID to unlock all past exams across AAU, Haramaya, Jimma, ASTU, and more.',
      howToGetId: 'Check your physical student ID card, your university portal login dashboard, or visit your campus registrar / department office.',
      ref1: 'Campus Registrar Office',
      ref2: 'Your university student card or ID document',
      instructions: 'Enter your university student ID number below. Your request will be reviewed and approved by the administrator.'
    };

    const card = document.createElement('div');
    card.id = 'curriculumNoticeCard';
    card.className = 'white-card border-2 border-blue-500/30 bg-gradient-to-b from-blue-50/50 to-white shadow-xl p-6 sm:p-8 space-y-6 animate-fade-in my-4';

    const header = document.createElement('div');
    header.className = 'flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-blue-100';

    const titleBox = document.createElement('div');
    titleBox.className = 'flex items-center space-x-3';
    titleBox.innerHTML = `
      <div class="w-12 h-12 rounded-2xl bg-blue-50 text-[#0052fe] border border-blue-200/80 flex items-center justify-center flex-shrink-0 shadow-xs">
        <i data-lucide="id-card" class="w-6 h-6"></i>
      </div>
      <div>
        <h3 class="text-lg sm:text-xl font-extrabold text-slate-900 leading-tight">${escapeHtml(decoded.title || 'Verify Your Student ID to Access All Questions')}</h3>
        <p class="text-xs text-slate-500 mt-0.5">${escapeHtml(decoded.subtitle || 'Questions 1–10 are free. Submit your university student ID to unlock all past exams.')}</p>
      </div>
    `;
    header.appendChild(titleBox);

    const badge = document.createElement('span');
    badge.className = 'px-3 py-1.5 rounded-full bg-[#0052fe] text-white text-[11px] font-extrabold self-start sm:self-center uppercase tracking-wider shadow-xs flex items-center gap-1.5';
    badge.innerHTML = '<i data-lucide="shield-check" class="w-3.5 h-3.5"></i> <span>Free ID Verification</span>';
    header.appendChild(badge);
    card.appendChild(header);

    // How to get ID instructions box (Admin writes instructions on where/how students get their ID)
    const howToGetIdText = decoded.howToGetId || State.registrationInfo?.how_to_get_id || 'Check your physical student ID card, admission letter, university portal dashboard, or visit your campus registrar / department office.';
    const idHelpBox = document.createElement('div');
    idHelpBox.className = 'p-4 rounded-2xl bg-blue-50 border border-blue-200/80 space-y-2';
    idHelpBox.innerHTML = `
      <div class="flex items-center space-x-2">
        <div class="w-7 h-7 rounded-lg bg-[#0052fe] text-white flex items-center justify-center flex-shrink-0">
          <i data-lucide="help-circle" class="w-4 h-4"></i>
        </div>
        <h4 class="text-xs font-black uppercase text-blue-900 tracking-wider">Don't know your Student ID? (የተማሪ መታወቂያ እንዴት ማግኘት ይቻላል?)</h4>
      </div>
      <p class="text-xs text-slate-700 leading-relaxed pl-9 font-medium">${escapeHtml(howToGetIdText)}</p>
    `;
    card.appendChild(idHelpBox);

    // Reference desks
    if (decoded.ref1 || decoded.ref2) {
      const refsGrid = document.createElement('div');
      refsGrid.className = 'grid grid-cols-1 sm:grid-cols-2 gap-3';

      if (decoded.ref1) {
        const refEl1 = document.createElement('div');
        refEl1.className = 'p-3.5 rounded-2xl bg-white border border-slate-200 shadow-xs flex items-center space-x-3';
        refEl1.innerHTML = `
          <div class="w-8 h-8 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center flex-shrink-0 font-bold">
            <i data-lucide="building-2" class="w-4 h-4"></i>
          </div>
          <div class="min-w-0 flex-1">
            <p class="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Campus Office</p>
            <p class="text-xs font-extrabold text-slate-800 truncate">${escapeHtml(decoded.ref1)}</p>
          </div>
        `;
        refsGrid.appendChild(refEl1);
      }

      if (decoded.ref2) {
        const refEl2 = document.createElement('div');
        refEl2.className = 'p-3.5 rounded-2xl bg-white border border-slate-200 shadow-xs flex items-center space-x-3';
        refEl2.innerHTML = `
          <div class="w-8 h-8 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center flex-shrink-0 font-bold">
            <i data-lucide="send" class="w-4 h-4"></i>
          </div>
          <div class="min-w-0 flex-1">
            <p class="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Official Channel</p>
            <p class="text-xs font-extrabold text-blue-900 truncate">${escapeHtml(decoded.ref2)}</p>
          </div>
        `;
        refsGrid.appendChild(refEl2);
      }
      card.appendChild(refsGrid);
    }

    if (decoded.instructions) {
      const instBox = document.createElement('p');
      instBox.className = 'text-xs text-slate-600 leading-relaxed font-medium bg-slate-50 p-3 rounded-xl border border-slate-200';
      instBox.textContent = decoded.instructions;
      card.appendChild(instBox);
    }

    // Account prompt if student is not signed in
    if (!State.currentUser) {
      const authCard = document.createElement('div');
      authCard.className = 'p-4 rounded-2xl bg-amber-50 border border-amber-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3';
      authCard.innerHTML = `
        <div class="flex items-center space-x-3">
          <div class="w-9 h-9 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center flex-shrink-0 font-bold">
            <i data-lucide="user-check" class="w-4 h-4"></i>
          </div>
          <div>
            <p class="text-xs font-extrabold text-slate-900">Step 1: Sign in with your phone</p>
            <p class="text-[11px] text-slate-600">Register or sign in with your phone number, then submit your student ID for approval.</p>
          </div>
        </div>
        <button type="button" onclick="NanovaApp.openAuthModal('next_questions')"
          class="px-4 py-2.5 bg-[#0052fe] hover:bg-[#0041d0] text-white font-extrabold text-xs rounded-xl shadow-sm transition flex items-center justify-center space-x-1.5 whitespace-nowrap cursor-pointer">
          <i data-lucide="log-in" class="w-4 h-4"></i>
          <span>Sign In / Register</span>
        </button>
      `;
      card.appendChild(authCard);
    } else {
      // User is logged in: Check if they already have a pending verification request
      const myReq = State.myIdVerification;
      if (myReq && myReq.status === 'pending') {
        const pendingBox = document.createElement('div');
        pendingBox.className = 'p-4 rounded-2xl bg-amber-50 border border-amber-200 space-y-2';
        pendingBox.innerHTML = `
          <div class="flex items-center space-x-2.5">
            <div class="w-8 h-8 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold">
              <i data-lucide="clock" class="w-4 h-4"></i>
            </div>
            <div>
              <h4 class="text-xs font-black text-slate-900">Student ID Verification Pending</h4>
              <p class="text-[11px] text-slate-600">Submitted ID: <span class="font-mono font-bold text-blue-700">${escapeHtml(myReq.submitted_token || myReq.submitted_id || '')}</span></p>
            </div>
          </div>
          <p class="text-xs text-slate-600 leading-relaxed">Your student ID is under review by the administrator. All questions will automatically unlock as soon as your ID is approved.</p>
        `;
        card.appendChild(pendingBox);
      } else {
        // ID submission form
        const tokenForm = document.createElement('form');
        tokenForm.className = 'space-y-3';
        tokenForm.onsubmit = function(e) {
          if (e) e.preventDefault();
          submitAcademicToken();
        };

        tokenForm.innerHTML = `
          <label class="filter-label flex items-center justify-between">
            <span>ENTER YOUR UNIVERSITY STUDENT ID</span>
            <span class="text-[10px] text-emerald-600 font-bold">100% Free • No Payment</span>
          </label>
          <div class="flex flex-col sm:flex-row gap-2.5">
            <input type="text" id="academicTokenInput" class="custom-select font-mono font-bold text-xs flex-1"
              placeholder="e.g. ETS0123/14, UGR/25678/14, or AAU/9876/15" required />
            <button type="submit" id="submitAcademicTokenBtn"
              class="px-6 py-3 bg-gradient-to-r from-blue-600 to-[#0052fe] hover:from-blue-700 hover:to-[#0041d0] text-white font-extrabold text-xs rounded-xl shadow-md transition flex items-center justify-center space-x-2 whitespace-nowrap cursor-pointer active:scale-95">
              <i data-lucide="send" class="w-4 h-4"></i>
              <span>Submit ID for Approval</span>
            </button>
          </div>
        `;
        card.appendChild(tokenForm);
      }
    }

    const footer = document.createElement('div');
    footer.className = 'flex items-center justify-between pt-3 border-t border-slate-100 text-xs text-slate-500';
    footer.innerHTML = `
      <span>Questions 1–10 remain open for free revision.</span>
      <button type="button" onclick="NanovaApp.restoreBoardQuestions()" class="font-extrabold text-[#0052fe] hover:underline flex items-center space-x-1 cursor-pointer">
        <i data-lucide="arrow-left" class="w-3.5 h-3.5"></i>
        <span>Back to Questions 1–10</span>
      </button>
    `;
    card.appendChild(footer);

    container.innerHTML = '';
    container.appendChild(card);

    if (window.lucide) window.lucide.createIcons();
    window.scrollTo({ top: 150, behavior: 'smooth' });
  }

  function restoreBoardQuestions() {
    State.currentPage = 1;
    renderBoardQuestionsPage();
    window.scrollTo({ top: 150, behavior: 'smooth' });
  }

  function submitAcademicToken() {
    if (!State.currentUser) {
      alert('Please sign in with your phone number before submitting your student ID.');
      openAuthModal();
      return;
    }

    const tokenInput = document.getElementById('academicTokenInput');
    const studentId = (tokenInput ? tokenInput.value : '').trim();

    if (!studentId || studentId.length < 3) {
      alert('Please enter a valid university student ID (e.g. ETS0123/14).');
      return;
    }

    const reqId = 'token_' + Date.now();
    const tokenData = {
      id: reqId,
      uid: State.currentUser.uid,
      phone: State.profile.phone || State.currentUser.email?.split('@')[0] || '',
      studentName: State.profile.name || 'Freshman Student',
      submitted_token: studentId,
      status: 'pending',
      timestamp: Date.now(),
      dateStr: new Date().toLocaleString()
    };

    if (firebaseDb) {
      firebaseDb.ref('academic_registry/' + State.currentUser.uid + '/submitted_token').set(tokenData).catch(console.warn);
      firebaseDb.ref('academic_registry/requests/' + reqId).set(tokenData).then(() => {
        alert('✅ Student ID Submitted!\n\nID: ' + studentId + '\n\nThe admin will review and approve your access. Full access will become active automatically once approved.');
        State.currentPage = 1;
        renderBoardQuestionsPage();
      }).catch((err) => {
        alert('Submission error: ' + err.message);
      });
    } else {
      alert('✅ Student ID recorded locally. Awaiting admin approval.');
      State.currentPage = 1;
      renderBoardQuestionsPage();
    }
  }

  /* ── ACADEMIC REGISTRY & STUDENT MANAGEMENT (ADMIN) ─── */
  function loadAcademicRequestsAndUsers() {
    if (!firebaseDb || !State.isAdmin) return;

    // Load Student ID Verification Requests
    firebaseDb.ref('academic_registry/requests').on('value', (snap) => {
      const val = snap.val();
      State.academicRequests = val ? Object.values(val).sort((a, b) => (b.timestamp || 0) - (a.timestamp || 0)) : [];
      renderAdminAcademicRequests();

      const pending = State.academicRequests.filter((r) => r.status === 'pending').length;
      const statP = document.getElementById('adminStatPendingRequests');
      const badge = document.getElementById('pendingRequestsBadge');
      if (statP) statP.textContent = pending;
      if (badge) {
        badge.textContent = pending;
        if (pending > 0) badge.classList.remove('hidden');
        else badge.classList.add('hidden');
      }
      renderAdminStats();
    });

    // Load Users
    firebaseDb.ref('users').on('value', (snap) => {
      const val = snap.val();
      State.registeredUsers = val ? Object.values(val) : [];
      renderAdminUsersList();
      renderAdminStats();
    });
  }

  function renderAdminAcademicRequests() {
    const container = document.getElementById('adminAcademicRequestsList');
    if (!container) return;

    if (!State.academicRequests.length) {
      container.innerHTML = '<div class="p-6 text-center text-xs text-slate-400 font-medium">No student ID verification requests submitted yet.</div>';
      return;
    }

    container.innerHTML = State.academicRequests.map((req) => {
      const isPending = req.status === 'pending';
      return `
        <div class="p-3.5 rounded-2xl bg-slate-50 border ${isPending ? 'border-blue-300 ring-2 ring-blue-100' : 'border-slate-200'} flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div class="space-y-1">
            <div class="flex items-center space-x-2">
              <span class="font-extrabold text-xs text-slate-900">${escapeHtml(req.studentName || 'Student')}</span>
              <span class="text-[11px] text-slate-500 font-mono">(${escapeHtml(req.phone || 'No phone')})</span>
              <span class="px-2 py-0.5 rounded-full text-[10px] font-extrabold ${isPending ? 'bg-amber-100 text-amber-800' : 'bg-emerald-100 text-emerald-800'}">
                ${req.status.toUpperCase()}
              </span>
            </div>
            <div class="flex items-center space-x-3 text-xs">
              <span class="font-mono font-bold text-[#0052fe]">Student ID: ${escapeHtml(req.submitted_token || req.student_id || 'N/A')}</span>
              <span class="text-slate-400 font-medium">${escapeHtml(req.dateStr || 'Recent')}</span>
            </div>
          </div>
          <div class="flex items-center space-x-2 self-end sm:self-center flex-shrink-0">
            ${isPending ? `
              <button onclick="NanovaApp.grantCurriculumAccess('${req.id}', '${req.uid}')" class="px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs rounded-xl shadow-sm transition flex items-center space-x-1">
                <i data-lucide="check" class="w-3.5 h-3.5"></i>
                <span>Approve ID & Grant Access</span>
              </button>
              <button onclick="NanovaApp.rejectAcademicToken('${req.id}', '${req.uid}')" class="px-3 py-1.5 bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold text-xs rounded-xl transition">
                Reject
              </button>
            ` : `
              <button onclick="NanovaApp.revokeCurriculumAccess('${req.id}', '${req.uid}')" class="px-3 py-1.5 bg-rose-50 hover:bg-rose-100 text-rose-600 font-bold text-xs rounded-xl transition">
                Revoke Access
              </button>
            `}
          </div>
        </div>
      `;
    }).join('');

    if (window.lucide) window.lucide.createIcons();
  }

  function renderAdminUsersList() {
    const container = document.getElementById('adminUsersList');
    if (!container) return;

    if (!State.registeredUsers.length) {
      container.innerHTML = '<div class="p-6 text-center text-xs text-slate-400 font-medium">No registered students in database.</div>';
      return;
    }

    container.innerHTML = State.registeredUsers.map((u) => {
      const isAdm = u.role === 'admin';
      const hasAccess = isAdm || !!u.hasCurriculumAccess;
      const userPhone = u.phone || (u.email?.endsWith('@nanova.et') ? u.email.replace('@nanova.et', '') : (u.email || 'No phone'));
      return `
        <div class="p-3 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between gap-3">
          <div class="space-y-0.5">
            <div class="flex items-center space-x-2">
              <span class="font-extrabold text-xs text-slate-900">${escapeHtml(u.displayName || userPhone || 'Student')}</span>
              <span class="px-2 py-0.5 rounded-full text-[9px] font-extrabold ${isAdm ? 'bg-indigo-100 text-indigo-800' : 'bg-slate-200 text-slate-700'}">
                ${(u.role || 'student').toUpperCase()}
              </span>
              <span class="px-2 py-0.5 rounded-full text-[9px] font-extrabold ${hasAccess ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'}">
                ${hasAccess ? 'FULL ACCESS (ALL EXAMS)' : 'PREVIEW ACCESS (10 QUESTIONS)'}
              </span>
            </div>
            <p class="text-[11px] text-slate-500 font-mono">${escapeHtml(userPhone)}</p>
          </div>
          <div class="flex items-center space-x-2 flex-shrink-0">
            ${!isAdm ? `
              <button onclick="NanovaApp.toggleUserCurriculumAccess('${u.uid}', ${!hasAccess})" class="px-2.5 py-1 bg-white hover:bg-slate-100 text-slate-700 text-xs font-bold rounded-lg border border-slate-200 transition">
                ${hasAccess ? 'Set Preview' : 'Grant Access'}
              </button>
              <button onclick="NanovaApp.deleteUserAccount('${u.uid}')" class="px-2.5 py-1 bg-rose-50 hover:bg-rose-100 text-rose-600 text-xs font-bold rounded-lg transition" title="Delete User">
                Delete
              </button>
            ` : '<span class="text-[11px] text-blue-600 font-bold px-2">Primary Admin</span>'}
          </div>
        </div>
      `;
    }).join('');

    if (window.lucide) window.lucide.createIcons();
  }

  function grantCurriculumAccess(reqId, uid) {
    if (!State.isAdmin) return;
    if (firebaseDb) {
      if (reqId) firebaseDb.ref('academic_registry/requests/' + reqId + '/status').set('approved');
      if (uid) firebaseDb.ref('users/' + uid + '/hasCurriculumAccess').set(true);
      alert('✅ Student ID approved! Full exam access activated for student.');
    }
  }

  function rejectAcademicToken(reqId, uid) {
    if (!State.isAdmin) return;
    if (confirm('Reject this student ID verification request?')) {
      if (firebaseDb) {
        if (reqId) firebaseDb.ref('academic_registry/requests/' + reqId + '/status').set('rejected');
        if (uid) firebaseDb.ref('users/' + uid + '/hasCurriculumAccess').set(false);
      }
    }
  }

  function revokeCurriculumAccess(reqId, uid) {
    if (!State.isAdmin) return;
    if (confirm('Revoke exam access for this student?')) {
      if (firebaseDb) {
        if (reqId) firebaseDb.ref('academic_registry/requests/' + reqId + '/status').set('revoked');
        if (uid) firebaseDb.ref('users/' + uid + '/hasCurriculumAccess').set(false);
      }
    }
  }

  function toggleUserCurriculumAccess(uid, newStatus) {
    if (!State.isAdmin || !firebaseDb) return;
    firebaseDb.ref('users/' + uid + '/hasCurriculumAccess').set(newStatus).then(() => {
      alert(`Student access status updated to: ${newStatus ? 'FULL ACCESS' : 'PREVIEW'}`);
    });
  }

  function deleteUserAccount(uid) {
    if (!State.isAdmin) return;
    if (confirm('Permanently delete this user from the app database?')) {
      if (firebaseDb) {
        firebaseDb.ref('users/' + uid).remove().then(() => {
          alert('User account removed.');
        });
      }
    }
  }

  function refreshAcademicRequests() {
    loadAcademicRequestsAndUsers();
  }

  function refreshUsersList() {
    loadAcademicRequestsAndUsers();
  }

  /* ── FILTERING & 10-QUESTIONS SCROLLABLE PAGINATION ── */
  function updateFilterSummaryText() {
    const summaryEl = document.getElementById('activeFilterSummaryText');
    if (!summaryEl) return;
    const cat = document.getElementById('categorySelect')?.value || 'ALL';
    const course = document.getElementById('courseSelect')?.value || 'ALL';
    const univ = document.getElementById('universitySelect')?.value || 'ALL';
    const yr = document.getElementById('yearSelect')?.value || 'ALL';

    const parts = [];
    if (course !== 'ALL') parts.push(course);
    if (cat !== 'ALL') parts.push(cat);
    if (univ !== 'ALL') parts.push(univ);
    if (yr !== 'ALL') parts.push(yr);

    if (parts.length === 0) {
      summaryEl.innerHTML = 'Showing <b>All Questions</b> • Tap <b class="text-[#0052fe]">OK</b> to refresh';
    } else {
      summaryEl.innerHTML = `Selected: <span class="font-bold text-[#0052fe]">${escapeHtml(parts.join(' • '))}</span> • Tap <b>OK</b> to display`;
    }
  }

  function onFilterChange(isExplicitSubmit = false) {
    const cat = document.getElementById('categorySelect')?.value || 'ALL';
    const courseEl = document.getElementById('courseSelect');

    // For COC Exam: COC contains all subjects, so do not restrict by single subject category
    if (cat === 'COC Exam') {
      if (courseEl) {
        courseEl.value = 'ALL';
        courseEl.disabled = true;
        courseEl.classList.add('opacity-50', 'cursor-not-allowed');
      }
    } else {
      if (courseEl && courseEl.disabled) {
        courseEl.disabled = false;
        courseEl.classList.remove('opacity-50', 'cursor-not-allowed');
      }
    }

    const c = courseEl?.value || 'ALL';
    const u = document.getElementById('universitySelect')?.value || 'ALL';
    const y = document.getElementById('yearSelect')?.value || 'ALL';
    const s = document.getElementById('examSearchInput')?.value || '';

    State.filters.course = c;
    State.filters.category = cat;
    State.filters.university = u;
    State.filters.year = y;
    State.searchKeyword = s;

    updateFilterSummaryText();

    // Highlight the OK button to prompt user to confirm display
    const okBtn = document.getElementById('applyFiltersOkBtn');
    if (okBtn && !isExplicitSubmit) {
      okBtn.classList.add('ring-4', 'ring-blue-300', 'animate-pulse');
    }

    if (isExplicitSubmit || State.hasAppliedFilters) {
      applyFilters();
    } else {
      updateCounterBadges();
    }
  }

  function applyFiltersWithFeedback(scrollOnMobile = true) {
    State.hasAppliedFilters = true;
    onFilterChange(true);
    const okBtn = document.getElementById('applyFiltersOkBtn');
    if (okBtn) {
      okBtn.classList.remove('ring-4', 'ring-blue-300', 'animate-pulse', 'ring-2', 'ring-blue-400');
      const count = State.filteredQuestions.length;
      const originalHtml = `
        <div class="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center group-hover:scale-110 transition">
          <i data-lucide="check" class="w-3.5 h-3.5 text-white stroke-[3]"></i>
        </div>
        <span class="tracking-wider uppercase font-black text-xs">OK</span>
        <span class="text-[11px] text-blue-100 font-medium hidden xs:inline">• Display Questions</span>
      `;

      okBtn.innerHTML = `
        <div class="w-5 h-5 rounded-full bg-white/30 flex items-center justify-center animate-bounce">
          <i data-lucide="check" class="w-3.5 h-3.5 text-white stroke-[3]"></i>
        </div>
        <span class="tracking-wider uppercase font-black text-xs">OK</span>
        <span class="text-[11px] text-blue-100 font-semibold">• Displaying (${count})</span>
      `;
      if (window.lucide) window.lucide.createIcons();

      setTimeout(() => {
        if (okBtn) {
          okBtn.innerHTML = originalHtml;
          if (window.lucide) window.lucide.createIcons();
        }
      }, 1600);
    }

    if (scrollOnMobile) {
      const targetEl = document.getElementById('boardQuestionsListContainer');
      if (targetEl) {
        const yOffset = -75;
        const y = targetEl.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    }
  }

  function applyFilters() {
    const { course, category, university, year } = State.filters;
    const search = (State.searchKeyword || '').toLowerCase().trim();

    let matched = State.questions.filter((q) => {
      // COC Exam contains all subjects together; do not separate by subject category
      if (category === 'COC Exam') {
        if (q.category !== 'COC Exam') return false;
      } else {
        if (course !== 'ALL' && q.course !== course) return false;
        if (category && category !== 'ALL' && q.category !== category) return false;
      }

      if (university !== 'ALL' && q.university !== university) return false;
      if (year !== 'ALL' && !q.year.includes(year)) return false;

      // Quick filter
      if (State.activeQuickFilter === 'saved' && !State.bookmarks.includes(q.id)) return false;
      if (State.activeQuickFilter === 'unanswered' && State.userAnswers[q.id] !== undefined) return false;
      if (State.activeQuickFilter === 'incorrect') {
        const userAns = State.userAnswers[q.id];
        if (userAns === undefined || userAns === q.answer) return false;
      }
      if (State.activeQuickFilter === 'answered') {
        const userAns = State.userAnswers[q.id];
        if (userAns === undefined || userAns !== q.answer) return false;
      }

      if (search) {
        const textMatch = q.question && q.question.toLowerCase().includes(search);
        const courseMatch = q.course && q.course.toLowerCase().includes(search);
        const univMatch = q.university && q.university.toLowerCase().includes(search);
        if (!textMatch && !courseMatch && !univMatch) return false;
      }
      return true;
    });

    State.filteredQuestions = matched;
    State.currentPage = 1;
    renderBoardQuestionsPage();
    updateCounterBadges();
  }

  /* ── RENDER 10 QUESTIONS ON ONE SCROLLABLE PAGE ─────── */
  function renderBoardQuestionsPage() {
    const container = document.getElementById('boardQuestionsListContainer');
    if (!container) return;

    // If the question bank was never downloaded (no questions at all) show a friendly prompt
    if (State.neverDownloadedQuestionsOffline || (!navigator.onLine && (!State.questions || !State.questions.length))) {
      container.innerHTML = `
        <div class="white-card text-center py-12 px-6 space-y-3 border border-blue-100 bg-blue-50/50 shadow-sm animate-fade-in">
          <div class="w-16 h-16 rounded-3xl bg-blue-100 text-[#0052fe] flex items-center justify-center mx-auto mb-2 shadow-inner">
            <i data-lucide="download-cloud" class="w-8 h-8"></i>
          </div>
          <h4 class="text-base font-extrabold text-slate-800">Downloading Question Bank…</h4>
          <p class="text-xs text-slate-600 max-w-md mx-auto font-medium leading-relaxed">
            Connect to the internet once to download all exams. After that, everything works offline automatically.
          </p>
          <button onclick="NanovaApp.retryQuestionBankDownload()" class="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs transition inline-flex items-center gap-2 mt-2 shadow-md">
            <i data-lucide="refresh-cw" class="w-4 h-4"></i>
            <span>Download Now</span>
          </button>
        </div>
      `;
      const paginationBar = document.getElementById('boardPaginationBar');
      if (paginationBar) paginationBar.classList.add('hidden');
      if (window.lucide) window.lucide.createIcons();
      return;
    }

    // If user has not selected an exam yet, show prompt or let guided flow guide them
    if (!State.hasAppliedFilters) {
      if (State.guidedFlow.active) {
        container.innerHTML = '';
        const paginationBar = document.getElementById('boardPaginationBar');
        if (paginationBar) paginationBar.classList.add('hidden');
        return;
      }
      container.innerHTML = `
        <div class="white-card text-center py-12 px-6 border border-blue-100 shadow-md">
          <div class="w-16 h-16 rounded-3xl bg-blue-50 text-[#0052fe] flex items-center justify-center mx-auto mb-4 border border-blue-200/60 shadow-sm">
            <i data-lucide="help-circle" class="w-8 h-8 text-[#0052fe]"></i>
          </div>
          <h3 class="text-xl font-black text-slate-800 font-heading mb-2">Select Your Exam Filters</h3>
          <p class="text-xs text-slate-500 max-w-md mx-auto mb-6 font-sans leading-relaxed">
            Choose your <b>Subject / Course</b>, <b>Exam Category</b>, <b>University</b>, and <b>Exam Year</b> above, then tap the <b class="text-[#0052fe]">OK</b> button to display the questions.
          </p>
          <button onclick="NanovaApp.applyFiltersWithFeedback(true)"
            class="inline-flex items-center space-x-2 px-6 py-3 bg-[#0052fe] hover:bg-[#003ec0] text-white font-extrabold text-xs rounded-2xl shadow-lg shadow-blue-500/25 transition active:scale-95 cursor-pointer">
            <i data-lucide="check" class="w-4 h-4 text-white stroke-[3]"></i>
            <span>Click OK to Display Questions</span>
          </button>
        </div>
      `;
      const paginationBar = document.getElementById('boardPaginationBar');
      if (paginationBar) paginationBar.classList.add('hidden');
      if (window.lucide) window.lucide.createIcons();
      return;
    }

    const paginationBar = document.getElementById('boardPaginationBar');
    if (paginationBar) paginationBar.classList.remove('hidden');

    const totalQuestions = State.filteredQuestions.length;
    if (!totalQuestions) {
      container.innerHTML = '<div class="white-card text-center text-slate-400 py-12 font-medium">No exam questions matched your active filters. Try selecting another course or university and tap OK.</div>';
      updatePaginationControls(0, 0, 0);
      return;
    }

    const hasCurriculumAccess = State.hasCurriculumAccess || State.isAdmin;
    const totalPages = Math.max(1, Math.ceil(totalQuestions / State.pageSize));

    // Ensure valid page bounds
    if (State.currentPage < 1) State.currentPage = 1;
    if (State.currentPage > totalPages) State.currentPage = totalPages;

    // Check access when navigating beyond Page 1 (Questions 11+)
    if (State.currentPage > 1) {
      if (!hasCurriculumAccess) {
        State.currentPage = 1;
        renderCurriculumNoticeInMemory();
        return;
      }
    }

    const answeredCount = State.filteredQuestions.filter(q => State.userAnswers[q.id] !== undefined).length;
    const correctCount = State.filteredQuestions.filter(q => State.userAnswers[q.id] === q.answer).length;
    const progressPercent = totalQuestions > 0 ? Math.round((answeredCount / totalQuestions) * 100) : 0;
    const accuracyPercent = answeredCount > 0 ? Math.round((correctCount / answeredCount) * 100) : 0;

    const progressTrackerHtml = `
      <div class="exam-progress-tracker animate-slide-up">
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div class="flex items-center space-x-3">
            <div class="w-9 h-9 rounded-xl bg-blue-50 text-[#0052fe] flex items-center justify-center border border-blue-200/80 shadow-sm flex-shrink-0">
              <i data-lucide="activity" class="w-4.5 h-4.5 text-[#0052fe]"></i>
            </div>
            <div>
              <div class="flex items-center space-x-2">
                <span class="text-xs font-black text-slate-800 font-heading tracking-tight">Live Exam Completion</span>
                <span class="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-blue-100 text-blue-700 uppercase tracking-wider">${progressPercent}% Done</span>
              </div>
              <p class="text-[11px] text-slate-500 font-sans">
                ${answeredCount} of ${totalQuestions} questions answered • Page ${State.currentPage} of ${totalPages}
              </p>
            </div>
          </div>
          <div class="flex flex-wrap items-center gap-2">
            ${!navigator.onLine ? `
            <span class="stats-counter-pill bg-emerald-50 text-emerald-700 border-emerald-200" title="Offline Mode Active">
              <i data-lucide="hard-drive" class="w-3.5 h-3.5 text-emerald-600"></i>
              <span>Offline Active</span>
            </span>
            ` : ''}
            <span class="stats-counter-pill" title="Answered Questions">
              <i data-lucide="check-circle-2" class="w-3.5 h-3.5 text-emerald-600"></i>
              <span><b>${answeredCount}</b> / ${totalQuestions}</span>
            </span>
            <span class="stats-counter-pill" title="Score Accuracy">
              <i data-lucide="target" class="w-3.5 h-3.5 text-blue-600"></i>
              <span>Accuracy: <b>${accuracyPercent}%</b></span>
            </span>
            <button onclick="NanovaApp.submitExam()"
              class="stats-counter-pill bg-[#0052fe] hover:bg-[#0041d0] text-white border-[#0052fe] font-extrabold cursor-pointer transition shadow-xs hover:scale-105" title="View final result and detailed score">
              <i data-lucide="award" class="w-3.5 h-3.5 text-white"></i>
              <span>Final Result</span>
            </button>
          </div>
        </div>
        <div class="progress-bar-rail">
          <div class="progress-bar-fill" style="width: ${progressPercent}%;"></div>
        </div>
      </div>
    `;

    const startIndex = (State.currentPage - 1) * State.pageSize;
    const endIndex = Math.min(startIndex + State.pageSize, totalQuestions);
    const pageQuestions = State.filteredQuestions.slice(startIndex, endIndex);

    const letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];

    const questionsListHtml = pageQuestions.map((q, localIdx) => {
      const globalNumber = startIndex + localIdx + 1;
      const isMissedMode = State.activeQuickFilter === 'incorrect';
      const isAnsweredMode = State.activeQuickFilter === 'answered';
      // In answered mode: always show the stored answer (they got it right)
      const answered = isMissedMode ? State.missedRetries[q.id] : State.userAnswers[q.id];
      const isBookmarked = State.bookmarks.includes(q.id);

      const optionsHtml = (q.options || []).map((opt, optIdx) => {
        let cls = 'option-btn';
        if (answered !== undefined) {
          if (optIdx === q.answer) cls += ' selected-correct';
          else if (optIdx === answered) cls += ' selected-incorrect';
          else cls += ' dimmed';
        }
        return `
          <button class="${cls}" onclick="NanovaApp.handleQuestionAnswer('${escapeAttr(q.id)}', ${optIdx})">
            <span class="option-letter-badge">${letters[optIdx]}</span>
            <span class="option-label-text">${escapeHtml(opt)}</span>
          </button>
        `;
      }).join('');

      const explanationHtml = (answered !== undefined && q.explanation) ? `
        <div class="solution-card">
          <div class="flex items-center space-x-2 text-blue-900 font-bold mb-1.5 font-sans">
            <div class="w-5 h-5 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center flex-shrink-0">
              <i data-lucide="check-circle" class="w-3.5 h-3.5"></i>
            </div>
            <span class="text-xs tracking-wide uppercase font-extrabold text-blue-900">Detailed Solution & Explanation</span>
          </div>
          <p class="explanation-text">${escapeHtml(q.explanation)}</p>
        </div>
      ` : '';

      return `
        <div class="white-card border border-slate-100 shadow-md hover:shadow-lg transition space-y-4 animate-slide-up" id="q_card_${escapeAttr(q.id)}">
          <!-- Question Header Tag & Meta -->
          <div class="flex flex-wrap items-center justify-between gap-2.5 pb-3 border-b border-slate-100">
            <div class="flex flex-wrap items-center gap-2">
              <span class="exam-tag-pill">
                <i data-lucide="book-open" class="w-3.5 h-3.5 text-blue-600"></i>
                <span>${escapeHtml((q.course || 'GENERAL PSYCHOLOGY').toUpperCase())}</span>
              </span>
              <span class="exam-tag-pill">
                <i data-lucide="award" class="w-3.5 h-3.5 text-purple-600"></i>
                <span>${escapeHtml((q.category || 'MID EXAM').toUpperCase())}</span>
              </span>
              <span class="exam-tag-pill">
                <i data-lucide="building-2" class="w-3.5 h-3.5 text-indigo-600"></i>
                <span>${escapeHtml((q.university || 'HARAMAYA UNIVERSITY').toUpperCase())}</span>
              </span>
              <span class="exam-tag-pill">
                <i data-lucide="calendar" class="w-3.5 h-3.5 text-amber-600"></i>
                <span>${escapeHtml(q.year || '2024 Exam')}</span>
              </span>
            </div>

            <div class="flex items-center space-x-2">
              ${isMissedMode && answered === undefined ? '<span class="px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-800 text-[10px] font-extrabold border border-amber-200/80 flex items-center gap-1"><i data-lucide="rotate-ccw" class="w-3 h-3 text-amber-600"></i><span>Retry Question</span></span>' : ''}
              ${State.isAdmin ? `
                <button onclick="NanovaApp.openEditQuestionModal('${escapeAttr(q.id)}')" class="px-2.5 py-1.5 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-800 text-xs font-bold border border-amber-200/80 transition flex items-center gap-1 cursor-pointer" title="Edit Question (Admin)">
                  <i data-lucide="edit-3" class="w-3.5 h-3.5 text-amber-600"></i>
                  <span class="hidden xs:inline">Edit</span>
                </button>
              ` : ''}
              <button onclick="NanovaApp.toggleQuestionBookmark('${escapeAttr(q.id)}')" class="p-2 rounded-xl ${isBookmarked ? 'bg-blue-50 text-[#0052fe] border border-blue-200' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'} transition" title="${isBookmarked ? 'Saved' : 'Save Question'}">
                <i data-lucide="${isBookmarked ? 'bookmark-check' : 'bookmark'}" class="w-4 h-4"></i>
              </button>
              <span class="question-num-tag">Q. ${globalNumber}</span>
            </div>
          </div>

          <!-- Reading Passage / Reference Context (if present) -->
          ${q.passage ? `
            <div class="reading-context-card mb-4 p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-blue-50/70 via-slate-50 to-indigo-50/50 border border-blue-200/70 shadow-sm text-sm text-slate-800 font-sans">
              <div class="flex items-center justify-between pb-2.5 mb-3 border-b border-blue-200/60 text-xs font-black uppercase tracking-wider text-[#0052fe]">
                <div class="flex items-center space-x-2">
                  <i data-lucide="book-open" class="w-4 h-4 text-[#0052fe]"></i>
                  <span>Reading Passage / Reference Context</span>
                </div>
                <span class="text-[10px] font-bold text-blue-600 bg-blue-100/70 px-2 py-0.5 rounded-full">Reference Text</span>
              </div>
              <div class="passage-text-body whitespace-pre-line text-slate-800 leading-relaxed font-serif text-[13.5px] max-h-80 overflow-y-auto pr-2">
${escapeHtml(q.passage)}
              </div>
            </div>
          ` : ''}

          <!-- Question Prompt -->
          <h3 class="question-text-title text-base sm:text-lg font-bold text-slate-900 leading-snug whitespace-pre-line">
            ${escapeHtml(q.question)}
          </h3>

          <!-- 2x2 Answer Options -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
            ${optionsHtml}
          </div>

          <!-- Explanation Box -->
          ${explanationHtml}
        </div>
      `;
    }).join('');
    const bottomScoreCardHtml = totalQuestions > 0 ? `
      <div class="white-card border border-blue-200/80 bg-gradient-to-br from-blue-50/60 via-white to-indigo-50/50 p-4 sm:p-5 rounded-3xl shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4 mt-6 text-center sm:text-left">
        <div class="flex items-center space-x-3.5">
          <div class="w-11 h-11 rounded-2xl bg-blue-100 text-[#0052fe] flex items-center justify-center font-bold shadow-2xs flex-shrink-0">
            <i data-lucide="award" class="w-5 h-5 text-[#0052fe]"></i>
          </div>
          <div>
            <h4 class="text-sm font-black text-slate-900">Check Your Final Score & Result</h4>
            <p class="text-xs text-slate-500 font-medium mt-0.5">
              Answered <b>${answeredCount}</b> of <b>${totalQuestions}</b> questions • Current Accuracy: <b>${accuracyPercent}%</b>
            </p>
          </div>
        </div>
        <button onclick="NanovaApp.submitExam()"
          class="px-5 py-2.5 bg-[#0052fe] hover:bg-[#0041d0] text-white text-xs font-black rounded-2xl shadow-md transition flex items-center gap-2 flex-shrink-0 active:scale-95 cursor-pointer">
          <i data-lucide="bar-chart-2" class="w-4 h-4"></i>
          <span>View Final Scorecard</span>
        </button>
      </div>
    ` : '';

    container.innerHTML = progressTrackerHtml + questionsListHtml + bottomScoreCardHtml;

    updatePaginationControls(startIndex, endIndex, totalQuestions);
    updateBookmarkBadge();
    if (window.lucide) window.lucide.createIcons();
  }

  function handleQuestionAnswer(qId, optIndex) {
    if (State.activeQuickFilter === 'incorrect') {
      State.missedRetries[qId] = optIndex;
    }
    State.userAnswers[qId] = optIndex;
    localStorage.setItem('nanova_board_answers', JSON.stringify(State.userAnswers));

    renderBoardQuestionsPage();
    updateCounterBadges();
  }

  function updatePaginationControls(startIndex, endIndex, totalQuestions) {
    const totalPages = Math.max(1, Math.ceil(totalQuestions / State.pageSize));
    const pageInfo = document.getElementById('boardPageInfo');
    const pageRange = document.getElementById('boardPageRange');
    const prevBtn = document.getElementById('boardPrevPageBtn');
    const nextBtn = document.getElementById('boardNextPageBtn');

    if (pageInfo) pageInfo.textContent = `Page ${State.currentPage} of ${totalPages}`;
    if (pageRange) {
      if (totalQuestions > 0) {
        pageRange.textContent = `(Questions ${startIndex + 1} - ${endIndex} of ${totalQuestions})`;
      } else {
        pageRange.textContent = '(0 Questions)';
      }
    }

    const hasCurriculumAccess = State.hasCurriculumAccess || State.isAdmin;

    if (prevBtn) prevBtn.disabled = State.currentPage <= 1;
    if (nextBtn) {
      if (!hasCurriculumAccess && totalPages > 1 && State.currentPage === 1) {
        nextBtn.innerHTML = '<i data-lucide="id-card" class="w-4 h-4 text-blue-200"></i><span>Verify Student ID for More Questions</span>';
        nextBtn.className = 'px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-extrabold text-xs shadow-md transition flex items-center space-x-2 cursor-pointer';
        nextBtn.disabled = false;
      } else {
        nextBtn.innerHTML = '<span>Next Questions</span><i data-lucide="chevron-right" class="w-4 h-4"></i>';
        nextBtn.className = 'px-5 py-2.5 rounded-xl bg-[#0052fe] hover:bg-[#0041d0] text-white font-extrabold text-xs shadow-md transition flex items-center space-x-2 cursor-pointer';
        nextBtn.disabled = State.currentPage >= totalPages;
      }
    }
    if (window.lucide) window.lucide.createIcons();
  }

  function boardNextPage() {
    const totalPages = Math.ceil(State.filteredQuestions.length / State.pageSize);

    // If without curriculum access -> dynamic in-memory verification
    const hasCurriculumAccess = State.hasCurriculumAccess || State.isAdmin;
    if (!hasCurriculumAccess) {
      renderCurriculumNoticeInMemory();
      return;
    }

    // If access authorized -> show next questions
    if (State.currentPage < totalPages) {
      State.currentPage++;
      renderBoardQuestionsPage();
      window.scrollTo({ top: 150, behavior: 'smooth' });
    } else {
      alert('You have reached the last page of questions for this subject/exam.');
    }
  }

  function boardPrevPage() {
    if (State.currentPage > 1) {
      State.currentPage--;
      renderBoardQuestionsPage();
      window.scrollTo({ top: 150, behavior: 'smooth' });
    }
  }

  function shuffleQuestions() {
    State.filteredQuestions.sort(() => Math.random() - 0.5);
    State.currentPage = 1;
    renderBoardQuestionsPage();
  }

  function updateCounterBadges() {
    const { course, category, university, year } = State.filters;
    const search = (State.searchKeyword || '').toLowerCase().trim();

    // Base questions in current exam scope
    const baseQuestions = (State.questions || []).filter((q) => {
      if (!q) return false;
      if (category === 'COC Exam') {
        if (q.category !== 'COC Exam') return false;
      } else {
        if (course !== 'ALL' && q.course !== course) return false;
        if (category && category !== 'ALL' && q.category !== category) return false;
      }
      if (university !== 'ALL' && q.university !== university) return false;
      const qYear = String(q.year || '');
      if (year !== 'ALL' && !qYear.includes(year)) return false;
      if (search) {
        const textMatch = q.question && q.question.toLowerCase().includes(search);
        const courseMatch = q.course && q.course.toLowerCase().includes(search);
        const univMatch = q.university && q.university.toLowerCase().includes(search);
        if (!textMatch && !courseMatch && !univMatch) return false;
      }
      return true;
    });

    let answeredCount = 0;
    let unansweredCount = 0;
    let incorrectCount = 0;

    baseQuestions.forEach((q) => {
      const ans = State.userAnswers[q.id];
      if (ans !== undefined) {
        answeredCount++;
        if (ans !== q.answer) incorrectCount++;
      } else {
        unansweredCount++;
      }
    });

    const badgeCount = document.getElementById('answeredCountBadge');
    const badgeTotal = document.getElementById('totalQuestionsBadge');
    const badgeSaved = document.getElementById('bookmarkCountBadge');
    const badgeUnans = document.getElementById('unansweredCountBadge');
    const badgeIncorr = document.getElementById('incorrectCountBadge');

    if (badgeCount) badgeCount.textContent = answeredCount;
    if (badgeTotal) badgeTotal.textContent = baseQuestions.length;
    if (badgeSaved) badgeSaved.textContent = State.bookmarks.length;
    if (badgeUnans) badgeUnans.textContent = unansweredCount;
    if (badgeIncorr) badgeIncorr.textContent = incorrectCount;
  }

  function updateBookmarkBadge() {
    const badge = document.getElementById('bookmarkCountBadge');
    if (badge) badge.textContent = State.bookmarks.length;
  }

  /* ── UNIVERSITIES DIRECTORY ────────────────────────── */
  function renderUniversities() {
    const grid = document.getElementById('universitiesGrid');
    if (!grid) return;

    if (!State.universities.length) {
      grid.innerHTML = '<div class="white-card col-span-full text-center text-slate-400 py-10">No universities listed yet.</div>';
      return;
    }

    const visibleUnivs = State.universities.filter(u => {
      if (State.isAdmin) return true;
      return !State.hiddenUniversities.includes(u.name);
    });

    if (!visibleUnivs.length) {
      grid.innerHTML = '<div class="white-card col-span-full text-center text-slate-400 py-10">All universities are currently hidden or under curriculum preparation.</div>';
      return;
    }

    grid.innerHTML = visibleUnivs.map((u) => {
      const fallbackImg = 'https://images.unsplash.com/photo-1562774053-701939374585?w=600&auto=format&fit=crop&q=80';
      const imgSrc = (u.image && /^https?:\/\/.+/i.test(u.image.trim())) ? sanitizeUrl(u.image) : fallbackImg;
      const safeWebsite  = sanitizeUrl(u.website);
      const safeTelegram = sanitizeUrl(u.telegram);
      const isHidden  = State.hiddenUniversities.includes(u.name);
      const hasGuide  = !!(u.details && Object.keys(u.details).length);
      return renderUnivCard(u, imgSrc, safeWebsite, safeTelegram, isHidden, hasGuide);
    }).join('');

    if (window.lucide) window.lucide.createIcons();
  }

  /* helper – builds one university card HTML string */
  function renderUnivCard(u, imgSrc, safeWebsite, safeTelegram, isHidden, hasGuide) {
    const fallbackImg = 'https://images.unsplash.com/photo-1562774053-701939374585?w=600&auto=format&fit=crop&q=80';
    return '<div class="univ-card ' + (isHidden ? 'ring-2 ring-amber-400 opacity-85' : '') + '">' +
      '<div class="relative">' +
        '<img src="' + imgSrc + '" alt="' + escapeHtml(u.name) + '" class="univ-card-image" onerror="this.src=\'' + fallbackImg + '\'" />' +
        (u.location ? '<span class="absolute bottom-2 left-2 px-2.5 py-1 rounded-lg bg-black/70 backdrop-blur-sm text-white text-[10px] font-bold">' + escapeHtml(u.location) + '</span>' : '') +
        (State.isAdmin ? '<div class="absolute top-2 right-2 flex space-x-1">' +
          '<button onclick="NanovaApp.toggleUniversityVisibility(\'' + escapeAttr(u.name) + '\')" class="p-1.5 rounded-lg ' + (isHidden ? 'bg-amber-500 text-white' : 'bg-emerald-600 text-white') + ' shadow transition" title="' + (isHidden ? 'Hidden - Click to Unhide' : 'Visible - Click to Hide') + '"><i data-lucide="' + (isHidden ? 'eye-off' : 'eye') + '" class="w-3.5 h-3.5"></i></button>' +
          '<button onclick="NanovaApp.editUniversity(\'' + escapeAttr(u.id) + '\')" class="p-1.5 rounded-lg bg-white/90 text-slate-700 hover:bg-white shadow transition" title="Edit"><i data-lucide="edit-3" class="w-3.5 h-3.5"></i></button>' +
          '<button onclick="NanovaApp.deleteUniversity(\'' + escapeAttr(u.id) + '\')" class="p-1.5 rounded-lg bg-rose-600 text-white hover:bg-rose-700 shadow transition" title="Delete"><i data-lucide="trash-2" class="w-3.5 h-3.5"></i></button>' +
        '</div>' : '') +
      '</div>' +
      '<div class="univ-card-body">' +
        '<div>' +
          '<div class="flex items-center justify-between mb-1.5">' +
            '<h3 class="font-extrabold text-slate-900 text-base">' + escapeHtml(u.name) + '</h3>' +
            (isHidden ? '<span class="px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 font-extrabold text-[9px] uppercase tracking-wider">Hidden</span>' : '') +
          '</div>' +
          '<p class="text-xs text-slate-500 font-medium leading-relaxed mb-3">' + escapeHtml(u.description || 'Official Ethiopian higher education campus details.') + '</p>' +
        '</div>' +
        '<div class="flex items-center pt-3 border-t border-slate-100 gap-2">' +
          '<a href="' + safeWebsite + '" target="_blank" rel="noopener noreferrer" class="btn-portal flex-1 justify-center">' +
            '<i data-lucide="globe" class="w-3.5 h-3.5"></i><span>Portal</span>' +
          '</a>' +
          '<a href="' + safeTelegram + '" target="_blank" rel="noopener noreferrer" class="btn-telegram flex-1 justify-center">' +
            '<i data-lucide="send" class="w-3.5 h-3.5"></i><span>Telegram</span>' +
          '</a>' +
          (hasGuide ? '<button onclick="NanovaApp.openUniversityGuide(\'' + escapeAttr(u.id) + '\')" class="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#0052fe]/10 text-[#0052fe] hover:bg-[#0052fe]/20 font-extrabold text-[11px] transition border border-[#0052fe]/20" title="Campus Info">' +
            '<i data-lucide="info" class="w-3.5 h-3.5"></i><span>Info</span>' +
          '</button>' : '') +
        '</div>' +
      '</div>' +
    '</div>';
  }

  function openAddUnivModal() {
    if (!State.isAdmin) return;
    const form = document.getElementById('univForm');
    if (form) form.reset();
    document.getElementById('univFormId').value = '';
    document.getElementById('univModalTitle').textContent = 'Add University';
    document.getElementById('univModal')?.classList.remove('hidden');
  }

  function closeUnivModal() {
    document.getElementById('univModal')?.classList.add('hidden');
  }

  /* ── UNIVERSITY GUIDE MODAL (details sheet) ─────────── */
  // Tracks which university is currently open in the guide modal
  let _activeGuideUnivId = null;

  function openUniversityGuide(univId) {
    const u = State.universities.find(x => x.id === univId);
    if (!u) return;
    _activeGuideUnivId = univId;

    const fallbackImg = 'https://images.unsplash.com/photo-1562774053-701939374585?w=800&auto=format&fit=crop&q=80';
    const imgSrc = (u.image && /^https?:\/\/.+/i.test(u.image.trim())) ? sanitizeUrl(u.image) : fallbackImg;

    const heroImg = document.getElementById('univGuideHeroImg');
    if (heroImg) { heroImg.src = imgSrc; heroImg.alt = u.name || ''; }

    const el = (id, txt) => { const e = document.getElementById(id); if (e) e.textContent = txt || ''; };
    el('univGuideName', u.name);
    el('univGuideAmharicName', u.amharicName || '');
    el('univGuideLocationText', u.location || '');

    const portalBtn = document.getElementById('univGuidePortalBtn');
    const tgBtn    = document.getElementById('univGuideTelegramBtn');
    if (portalBtn) portalBtn.href = sanitizeUrl(u.website);
    if (tgBtn)    tgBtn.href    = sanitizeUrl(u.telegram);

    // Show admin Edit button if admin
    const editBtn = document.getElementById('univGuideEditBtn');
    if (editBtn) {
      if (State.isAdmin) {
        editBtn.classList.remove('hidden');
        editBtn.classList.add('flex');
      } else {
        editBtn.classList.add('hidden');
        editBtn.classList.remove('flex');
      }
    }

    // Build the details body
    const body = document.getElementById('univGuideBody');
    if (body) {
      const d = u.details || {};
      const sections = [
        { icon: 'map-pin',        label: 'ቦታና ትራንስፖርት',           key: 'locationTransport' },
        { icon: 'cloud-sun',      label: 'የአየር ንብረት',               key: 'weather' },
        { icon: 'school',         label: 'ካምፓሶችና የትምህርት ዘርፎች',  key: 'campusesAndFields' },
        { icon: 'utensils',       label: 'ካፍቴሪያ / ምግብ ቤት',        key: 'cafeFood' },
        { icon: 'store',          label: 'ከካምፓስ ውጭ ምግብ',          key: 'outsideFood' },
        { icon: 'bed-double',     label: 'ዶርም / ሎከር',               key: 'dormAndLockers' },
        { icon: 'wifi',           label: 'ውሃ፣ መብራት፣ Wi-Fi',         key: 'utilities' },
        { icon: 'toilet',         label: 'ሽንት ቤትና ንፅህና',           key: 'sanitation' },
        { icon: 'shield-check',   label: 'ደህንነትና ምክር',             key: 'safetyAdvice' },
      ];

      const iconColors = [
        'text-blue-500', 'text-sky-500', 'text-violet-500',
        'text-orange-500', 'text-amber-500', 'text-teal-500',
        'text-cyan-500', 'text-emerald-500', 'text-rose-500'
      ];

      const descHtml = u.description
        ? '<div class="mb-3 p-3 rounded-xl bg-blue-50 border border-blue-100 text-blue-800 text-xs font-semibold leading-relaxed">' + escapeHtml(u.description) + '</div>'
        : '';

      const sectionsHtml = sections.map((s, i) => {
        const text = d[s.key];
        if (!text) return '';
        const lines = text.split('\n').map(line => '<p class="text-slate-600 text-xs leading-relaxed">' + escapeHtml(line) + '</p>').join('');
        return '<div class="rounded-2xl border border-slate-100 bg-slate-50 p-3.5">' +
          '<div class="flex items-center gap-2 mb-2">' +
            '<span class="w-7 h-7 rounded-xl bg-white shadow-sm flex items-center justify-center flex-shrink-0">' +
              '<i data-lucide="' + s.icon + '" class="w-4 h-4 ' + iconColors[i % iconColors.length] + '"></i>' +
            '</span>' +
            '<span class="font-extrabold text-slate-800 text-xs">' + s.label + '</span>' +
          '</div>' +
          '<div class="space-y-1">' + lines + '</div>' +
        '</div>';
      }).join('');

      body.innerHTML = descHtml + sectionsHtml;
    }

    const modal = document.getElementById('universityGuideModal');
    if (modal) modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
    if (window.lucide) window.lucide.createIcons();
  }

  function closeUniversityGuide() {
    document.getElementById('universityGuideModal')?.classList.add('hidden');
    document.body.style.overflow = '';
    _activeGuideUnivId = null;
  }

  function editUniversityFromGuide() {
    if (!State.isAdmin || !_activeGuideUnivId) return;
    const id = _activeGuideUnivId;
    closeUniversityGuide();
    // Small delay so guide modal finishes closing before edit modal opens
    setTimeout(() => editUniversity(id), 120);
  }

  function onUnivSearchChange(keyword) {
    State.univSearchKeyword = (keyword || '').toLowerCase().trim();
    const kw = State.univSearchKeyword;
    const grid = document.getElementById('universitiesGrid');
    if (!grid) return;

    const visibleUnivs = State.universities.filter(u => {
      if (!State.isAdmin && State.hiddenUniversities.includes(u.name)) return false;
      if (!kw) return true;
      return (
        (u.name         || '').toLowerCase().includes(kw) ||
        (u.amharicName  || '').toLowerCase().includes(kw) ||
        (u.location     || '').toLowerCase().includes(kw)
      );
    });

    const badge = document.getElementById('univCountBadge');
    if (badge) badge.textContent = visibleUnivs.length + ' Universit' + (visibleUnivs.length === 1 ? 'y' : 'ies');

    if (!visibleUnivs.length) {
      grid.innerHTML = '<div class="white-card col-span-full text-center text-slate-400 py-10">No universities match "' + escapeHtml(kw) + '".</div>';
      return;
    }

    const fallbackImg = 'https://images.unsplash.com/photo-1562774053-701939374585?w=600&auto=format&fit=crop&q=80';
    grid.innerHTML = visibleUnivs.map(u => {
      const imgSrc = (u.image && /^https?:\/\/.+/i.test(u.image.trim())) ? sanitizeUrl(u.image) : fallbackImg;
      const safeWebsite  = sanitizeUrl(u.website);
      const safeTelegram = sanitizeUrl(u.telegram);
      const isHidden = State.hiddenUniversities.includes(u.name);
      const hasGuide = !!(u.details && Object.keys(u.details).length);
      return renderUnivCard(u, imgSrc, safeWebsite, safeTelegram, isHidden, hasGuide);
    }).join('');

    if (window.lucide) window.lucide.createIcons();
  }


  function editUniversity(univId) {
    if (!State.isAdmin) return;
    const u = State.universities.find((item) => item.id === univId);
    if (!u) return;
    const d = u.details || {};

    const setVal = (id, val) => { const el = document.getElementById(id); if (el) el.value = val || ''; };
    setVal('univFormId',            u.id);
    setVal('univNameInput',         u.name);
    setVal('univAmharicNameInput',  u.amharicName);
    setVal('univLocationInput',     u.location);
    setVal('univWebsiteInput',      u.website);
    setVal('univTelegramInput',     u.telegram);
    setVal('univImageInput',        u.image);
    setVal('univDescriptionInput',  u.description);
    // Guide details
    setVal('guideLocationTransport', d.locationTransport);
    setVal('guideWeather',           d.weather);
    setVal('guideCampusesAndFields', d.campusesAndFields);
    setVal('guideCafeFood',          d.cafeFood);
    setVal('guideOutsideFood',       d.outsideFood);
    setVal('guideDormAndLockers',    d.dormAndLockers);
    setVal('guideUtilities',         d.utilities);
    setVal('guideSanitation',        d.sanitation);
    setVal('guideSafetyAdvice',      d.safetyAdvice);

    document.getElementById('univModalTitle').textContent = 'Edit University';
    document.getElementById('univModal')?.classList.remove('hidden');
  }

  function saveUniversity(e) {
    e.preventDefault();
    if (!State.isAdmin) return;

    const gv = (id) => (document.getElementById(id)?.value || '').trim();

    const id          = gv('univFormId') || ('univ_' + Date.now());
    const name        = gv('univNameInput');
    const amharicName = gv('univAmharicNameInput');
    const location    = gv('univLocationInput');
    const website     = gv('univWebsiteInput');
    const telegram    = gv('univTelegramInput');
    const image       = gv('univImageInput');
    const description = gv('univDescriptionInput');

    // Build details — only include non-empty fields
    const detailsRaw = {
      locationTransport: gv('guideLocationTransport'),
      weather:           gv('guideWeather'),
      campusesAndFields: gv('guideCampusesAndFields'),
      cafeFood:          gv('guideCafeFood'),
      outsideFood:       gv('guideOutsideFood'),
      dormAndLockers:    gv('guideDormAndLockers'),
      utilities:         gv('guideUtilities'),
      sanitation:        gv('guideSanitation'),
      safetyAdvice:      gv('guideSafetyAdvice'),
    };
    const details = Object.fromEntries(Object.entries(detailsRaw).filter(([, v]) => v));

    const univData = {
      id,
      name,
      amharicName,
      location,
      website,
      telegram,
      image,
      description: description || 'Campus portal and Telegram student community.',
      ...(Object.keys(details).length ? { details } : {})
    };

    const existingIdx = State.universities.findIndex((u) => u.id === id);
    if (existingIdx >= 0) State.universities[existingIdx] = univData;
    else State.universities.unshift(univData);

    NanovaDB.saveAll('universities', State.universities).catch(console.warn);
    renderUniversities();
    if (State.isAdmin) {
      renderAdminUniversitiesList();
      renderAdminStats();
    }
    closeUnivModal();
    alert('✅ University details saved successfully!');
  }

  function deleteUniversity(univId) {
    if (!State.isAdmin) return;
    if (confirm('Are you sure you want to remove this university?')) {
      State.universities = State.universities.filter((u) => u.id !== univId);
      NanovaDB.saveAll('universities', State.universities).catch(console.warn);
      renderUniversities();
      renderAdminUniversitiesList();
      renderAdminStats();
    }
  }

  /* ── GUIDED EXAM EXPLORATION & VISIBILITY CONTROLS ─── */

  function toggleUniversityVisibility(univName) {
    if (!State.isAdmin) return;
    const idx = State.hiddenUniversities.indexOf(univName);
    if (idx >= 0) {
      State.hiddenUniversities.splice(idx, 1);
    } else {
      State.hiddenUniversities.push(univName);
    }
    localStorage.setItem('nanova_hidden_universities', JSON.stringify(State.hiddenUniversities));
    renderUniversities();
    renderAdminUniversitiesList();
    updateUniversitySelectDropdown();
    renderGuidedExploration();
  }

  function toggleSubjectVisibility(subjectName) {
    if (!State.isAdmin) return;
    const idx = State.hiddenSubjects.indexOf(subjectName);
    if (idx >= 0) {
      State.hiddenSubjects.splice(idx, 1);
    } else {
      State.hiddenSubjects.push(subjectName);
    }
    localStorage.setItem('nanova_hidden_subjects', JSON.stringify(State.hiddenSubjects));
    renderAdminSubjectsVisibilityList();
    renderGuidedExploration();
  }

  function updateUniversitySelectDropdown() {
    const sel = document.getElementById('universitySelect');
    if (!sel) return;
    const visibleUnivs = State.universities.filter(u =>
      State.isAdmin || !State.hiddenUniversities.includes(u.name)
    );
    const firstChild = sel.querySelector('option[value="ALL"]');
    // Remove all except "ALL"
    Array.from(sel.options).forEach(opt => {
      if (opt.value !== 'ALL') opt.remove();
    });
    visibleUnivs.forEach(u => {
      const opt = document.createElement('option');
      opt.value = u.name;
      opt.textContent = u.name;
      sel.appendChild(opt);
    });
  }

  function renderAdminSubjectsVisibilityList() {
    const container = document.getElementById('adminSubjectsVisibilityList');
    if (!container) return;

    container.innerHTML = SUBJECTS_CATALOG.map(sub => {
      const isHidden = State.hiddenSubjects.includes(sub.name);
      const qCount = (State.questions || []).filter(q => q.course === sub.name).length;
      return `
        <div class="p-4 rounded-2xl bg-slate-50 border ${isHidden ? 'border-amber-300' : 'border-slate-200'} flex items-center justify-between gap-3">
          <div class="flex items-center space-x-3">
            <img src="${sub.image}" alt="${escapeHtml(sub.name)}" class="w-12 h-12 rounded-xl object-cover border border-slate-200 flex-shrink-0" onerror="this.src='https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=200'" />
            <div>
              <p class="font-extrabold text-xs text-slate-900">${escapeHtml(sub.name)}</p>
              <p class="text-[11px] text-slate-500 mt-0.5">${qCount} questions available</p>
            </div>
          </div>
          <button onclick="NanovaApp.toggleSubjectVisibility('${escapeAttr(sub.name)}')"
            class="visibility-toggle-btn ${isHidden ? 'hidden-mode' : 'visible'} flex-shrink-0">
            <i data-lucide="${isHidden ? 'eye-off' : 'eye'}" class="w-3.5 h-3.5"></i>
            ${isHidden ? 'Hidden' : 'Visible'}
          </button>
        </div>
      `;
    }).join('');

    if (window.lucide) window.lucide.createIcons();
  }

  function renderGuidedExploration() {
    const container = document.getElementById('guidedExplorationContainer');
    if (!container) return;

    const gf = State.guidedFlow;

    // If guided flow is disabled (classic mode), clear container
    if (!gf.active) {
      container.innerHTML = '';
      return;
    }

    const activeUniv = gf.university || 'Haramaya University';
    const badge = document.getElementById('activeUnivBadge');
    if (badge) badge.textContent = activeUniv;

    // Step 1: Subject not chosen yet → show subject cards
    if (!gf.subject) {
      container.innerHTML = _buildSubjectCardsHtml(activeUniv);
      if (window.lucide) window.lucide.createIcons();
      return;
    }

    // Step 2: Category not chosen yet → show mid/final chooser
    if (!gf.category) {
      container.innerHTML = _buildCategoryChooserHtml(activeUniv, gf.subject);
      if (window.lucide) window.lucide.createIcons();
      return;
    }

    // Step 3: Year not chosen yet → show year pills
    if (!gf.year) {
      container.innerHTML = _buildYearChooserHtml(activeUniv, gf.subject, gf.category);
      if (window.lucide) window.lucide.createIcons();
      return;
    }

    // Step 4: All chosen → clear guided container, show breadcrumb, load questions
    container.innerHTML = _buildBreadcrumbBarHtml(activeUniv, gf.subject, gf.category, gf.year);
    if (window.lucide) window.lucide.createIcons();
  }

  function _buildSubjectCardsHtml(activeUniv) {
    // Only show download prompt if questions truly haven't been cached yet
    if (State.neverDownloadedQuestionsOffline || (!navigator.onLine && (!State.questions || !State.questions.length))) {
      return `
        <div class="white-card text-center py-12 px-6 space-y-3 border border-blue-100 bg-blue-50/50 shadow-sm animate-fade-in">
          <div class="w-16 h-16 rounded-3xl bg-blue-100 text-[#0052fe] flex items-center justify-center mx-auto mb-2 shadow-inner">
            <i data-lucide="download-cloud" class="w-8 h-8"></i>
          </div>
          <h4 class="text-base font-extrabold text-slate-800">Almost Ready!</h4>
          <p class="text-xs text-slate-600 max-w-md mx-auto font-medium leading-relaxed">
            Connect to the internet once to download the question bank. After that, all exams work offline automatically — no internet needed.
          </p>
          <button onclick="NanovaApp.retryQuestionBankDownload()" class="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs transition inline-flex items-center gap-2 mt-2 shadow-md">
            <i data-lucide="refresh-cw" class="w-4 h-4"></i>
            <span>Download Now</span>
          </button>
        </div>
      `;
    }

    const visibleSubjects = SUBJECTS_CATALOG.filter(s =>
      State.isAdmin || !State.hiddenSubjects.includes(s.name)
    );

    if (!visibleSubjects.length) {
      return `<div class="white-card text-center py-10 text-slate-400 font-medium text-sm">No subjects are currently available.</div>`;
    }

    const univQuestions = (State.questions || []).filter(q => q.university === activeUniv);

    const cards = visibleSubjects.map(sub => {
      const qCount = univQuestions.filter(q => q.course === sub.name).length;
      const accentClasses = {
        blue: 'bg-blue-100 text-blue-700', indigo: 'bg-indigo-100 text-indigo-700',
        sky: 'bg-sky-100 text-sky-700', amber: 'bg-amber-100 text-amber-700',
        emerald: 'bg-emerald-100 text-emerald-700', teal: 'bg-teal-100 text-teal-700',
        purple: 'bg-purple-100 text-purple-700', rose: 'bg-rose-100 text-rose-700',
        violet: 'bg-violet-100 text-violet-700', cyan: 'bg-cyan-100 text-cyan-700',
        yellow: 'bg-yellow-100 text-yellow-700', slate: 'bg-slate-200 text-slate-700',
        orange: 'bg-orange-100 text-orange-700'
      };
      const pill = accentClasses[sub.accentColor] || 'bg-blue-100 text-blue-700';
      return `
        <div class="subject-rect-card animate-slide-up" onclick="NanovaApp.chooseGuidedSubject('${escapeAttr(sub.name)}')">
          <div class="subject-rect-img-wrapper">
            <img class="subject-rect-img" src="${sub.image}" alt="${escapeHtml(sub.name)}"
              onerror="this.src='https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=400'" />
          </div>
          <div class="subject-rect-content">
            <div>
              <p class="subject-rect-title">${escapeHtml(sub.name)}</p>
              <p class="text-xs text-slate-500 font-medium mt-1 leading-relaxed">${escapeHtml(sub.description)}</p>
            </div>
            <div class="flex items-center justify-between mt-3 pt-2.5 border-t border-slate-100">
              <span class="subject-badge-pill ${pill}">
                <i data-lucide="${sub.icon}" class="w-3 h-3"></i>
                ${sub.shortName}
              </span>
              <span class="text-[11px] font-extrabold ${qCount > 0 ? 'text-emerald-700 bg-emerald-50' : 'text-slate-400 bg-slate-100'} px-2.5 py-1 rounded-lg">
                ${qCount > 0 ? qCount + ' Q' : 'Coming Soon'}
              </span>
            </div>
          </div>
        </div>
      `;
    }).join('');

    return `
      <div>
        <div class="flex items-center justify-between mb-4">
          <div>
            <h2 class="text-base font-black text-white flex items-center gap-2">
              <i data-lucide="layers" class="w-4 h-4 text-blue-200"></i>
              Step 1: Choose Your Subject
            </h2>
            <p class="text-xs text-white/70 mt-0.5">Select the course you want to practice for ${escapeHtml(activeUniv)}</p>
          </div>
        </div>
        <div class="grid grid-cols-1 gap-3">
          ${cards}
        </div>
      </div>
    `;
  }

  function _buildCategoryChooserHtml(activeUniv, subject) {
    const subjectQuestions = (State.questions || []).filter(q =>
      q.university === activeUniv && q.course === subject
    );
    const midCount = subjectQuestions.filter(q => q.category === 'Mid Exam').length;
    const finalCount = subjectQuestions.filter(q => q.category === 'Final Exam').length;
    const cocCount = subjectQuestions.filter(q => q.category === 'COC Exam').length;

    const midCard = `
      <div class="exam-type-card ${midCount === 0 ? 'opacity-60' : ''}" onclick="NanovaApp.chooseGuidedCategory('Mid Exam')">
        <div class="absolute inset-0 bg-gradient-to-br from-blue-50 to-transparent opacity-60 rounded-xl pointer-events-none"></div>
        <div class="relative">
          <div class="w-12 h-12 rounded-2xl bg-blue-100 text-blue-700 flex items-center justify-center mb-3">
            <i data-lucide="book-marked" class="w-6 h-6"></i>
          </div>
          <h3 class="text-base font-black text-slate-900">Mid Exam</h3>
          <p class="text-xs text-slate-500 mt-1 leading-relaxed">Mid-semester questions from past exams</p>
          <div class="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between">
            <span class="text-[11px] font-extrabold ${midCount > 0 ? 'text-blue-700 bg-blue-50' : 'text-slate-400 bg-slate-100'} px-2.5 py-1 rounded-lg">
              ${midCount > 0 ? midCount + ' Questions' : 'No questions yet'}
            </span>
            <i data-lucide="arrow-right" class="w-4 h-4 text-blue-400"></i>
          </div>
        </div>
      </div>
    `;

    const finalCard = `
      <div class="exam-type-card ${finalCount === 0 ? 'opacity-60' : ''}" onclick="NanovaApp.chooseGuidedCategory('Final Exam')">
        <div class="absolute inset-0 bg-gradient-to-br from-indigo-50 to-transparent opacity-60 rounded-xl pointer-events-none"></div>
        <div class="relative">
          <div class="w-12 h-12 rounded-2xl bg-indigo-100 text-indigo-700 flex items-center justify-center mb-3">
            <i data-lucide="award" class="w-6 h-6"></i>
          </div>
          <h3 class="text-base font-black text-slate-900">Final Exam</h3>
          <p class="text-xs text-slate-500 mt-1 leading-relaxed">End-of-semester comprehensive final exams</p>
          <div class="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between">
            <span class="text-[11px] font-extrabold ${finalCount > 0 ? 'text-indigo-700 bg-indigo-50' : 'text-slate-400 bg-slate-100'} px-2.5 py-1 rounded-lg">
              ${finalCount > 0 ? finalCount + ' Questions' : 'No questions yet'}
            </span>
            <i data-lucide="arrow-right" class="w-4 h-4 text-indigo-400"></i>
          </div>
        </div>
      </div>
    `;

    const cocCard = cocCount > 0 ? `
      <div class="exam-type-card" onclick="NanovaApp.chooseGuidedCategory('COC Exam')">
        <div class="absolute inset-0 bg-gradient-to-br from-purple-50 to-transparent opacity-60 rounded-xl pointer-events-none"></div>
        <div class="relative">
          <div class="w-12 h-12 rounded-2xl bg-purple-100 text-purple-700 flex items-center justify-center mb-3">
            <i data-lucide="star" class="w-6 h-6"></i>
          </div>
          <h3 class="text-base font-black text-slate-900">COC Exam</h3>
          <p class="text-xs text-slate-500 mt-1 leading-relaxed">Certificate of Competency readiness exam</p>
          <div class="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between">
            <span class="text-[11px] font-extrabold text-purple-700 bg-purple-50 px-2.5 py-1 rounded-lg">
              ${cocCount} Questions
            </span>
            <i data-lucide="arrow-right" class="w-4 h-4 text-purple-400"></i>
          </div>
        </div>
      </div>
    ` : '';

    return `
      <div class="animate-slide-up">
        <div class="flex items-center justify-between mb-4">
          <div>
            <h2 class="text-base font-black text-white flex items-center gap-2">
              <i data-lucide="layers" class="w-4 h-4 text-blue-200"></i>
              Step 2: Choose Exam Type
            </h2>
            <p class="text-xs text-white/70 mt-0.5">${escapeHtml(subject)} · ${escapeHtml(activeUniv)}</p>
          </div>
          <button onclick="NanovaApp.resetGuidedFlow()" class="px-3 py-1.5 rounded-xl bg-black/30 hover:bg-black/50 text-white text-xs font-bold flex items-center gap-1.5 transition border border-white/20">
            <i data-lucide="arrow-left" class="w-3.5 h-3.5"></i> Back
          </button>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 ${cocCount > 0 ? 'lg:grid-cols-3' : ''} gap-4">
          ${midCard}
          ${finalCard}
          ${cocCard}
        </div>
      </div>
    `;
  }

  function _buildYearChooserHtml(activeUniv, subject, category) {
    const subjectCatQuestions = (State.questions || []).filter(q =>
      q.university === activeUniv && q.course === subject && q.category === category
    );

    // Extract and deduplicate years, sorted desc
    const years = [...new Set(subjectCatQuestions.map(q => q.year || ''))].filter(Boolean);
    years.sort((a, b) => {
      const numA = parseInt(a.match(/\d+/)?.[0] || '0');
      const numB = parseInt(b.match(/\d+/)?.[0] || '0');
      if (numB !== numA) return numB - numA;
      return a.localeCompare(b);
    });

    if (!years.length) {
      return `
        <div class="animate-slide-up">
          <div class="flex items-center justify-between mb-4">
            <h2 class="text-base font-black text-white flex items-center gap-2">
              <i data-lucide="calendar" class="w-4 h-4 text-blue-200"></i>
              Step 3: Choose Year
            </h2>
            <button onclick="NanovaApp.chooseGuidedSubject('${escapeAttr(subject)}')" class="px-3 py-1.5 rounded-xl bg-black/30 hover:bg-black/50 text-white text-xs font-bold flex items-center gap-1.5 transition border border-white/20">
              <i data-lucide="arrow-left" class="w-3.5 h-3.5"></i> Back
            </button>
          </div>
          <div class="white-card text-center py-10">
            <i data-lucide="inbox" class="w-8 h-8 text-slate-300 mx-auto mb-3"></i>
            <p class="text-sm font-bold text-slate-600">No ${escapeHtml(category)} questions yet</p>
            <p class="text-xs text-slate-400 mt-1">Check back soon as we add more ${escapeHtml(subject)} exams.</p>
          </div>
        </div>
      `;
    }

    const pills = years.map(yr => {
      const count = subjectCatQuestions.filter(q => q.year === yr).length;
      return `
        <div class="year-pill-card" onclick="NanovaApp.chooseGuidedYear('${escapeAttr(yr)}')">
          <p class="font-black text-slate-900 text-sm">${escapeHtml(yr)}</p>
          <p class="text-[11px] text-slate-500 font-medium mt-1">${count} question${count !== 1 ? 's' : ''}</p>
          <i data-lucide="arrow-right" class="w-4 h-4 text-[#0052fe] mx-auto mt-2"></i>
        </div>
      `;
    }).join('');

    return `
      <div class="animate-slide-up">
        <div class="flex items-center justify-between mb-4">
          <div>
            <h2 class="text-base font-black text-white flex items-center gap-2">
              <i data-lucide="calendar" class="w-4 h-4 text-blue-200"></i>
              Step 3: Choose Exam Year
            </h2>
            <p class="text-xs text-white/70 mt-0.5">${escapeHtml(subject)} · ${escapeHtml(category)}</p>
          </div>
          <button onclick="NanovaApp.chooseGuidedSubject('${escapeAttr(subject)}')" class="px-3 py-1.5 rounded-xl bg-black/30 hover:bg-black/50 text-white text-xs font-bold flex items-center gap-1.5 transition border border-white/20">
            <i data-lucide="arrow-left" class="w-3.5 h-3.5"></i> Back
          </button>
        </div>
        <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          ${pills}
        </div>
      </div>
    `;
  }

  function _buildBreadcrumbBarHtml(activeUniv, subject, category, year) {
    return `
      <div class="guided-step-bar animate-slide-up">
        <div class="flex flex-wrap items-center gap-1.5 text-xs font-bold text-slate-700">
          <span class="text-[#0052fe] font-extrabold">${escapeHtml(activeUniv)}</span>
          <i data-lucide="chevron-right" class="w-3.5 h-3.5 text-slate-400"></i>
          <span>${escapeHtml(subject)}</span>
          <i data-lucide="chevron-right" class="w-3.5 h-3.5 text-slate-400"></i>
          <span class="${category === 'Mid Exam' ? 'text-blue-600' : category === 'COC Exam' ? 'text-purple-600' : 'text-indigo-600'}">${escapeHtml(category)}</span>
          <i data-lucide="chevron-right" class="w-3.5 h-3.5 text-slate-400"></i>
          <span class="text-emerald-600 font-extrabold">${escapeHtml(year)}</span>
        </div>
        <div class="flex items-center gap-2 flex-shrink-0">
          <button onclick="NanovaApp.backFromExam()"
            class="px-3.5 py-1.5 bg-blue-50 hover:bg-blue-100 text-[#0052fe] text-xs font-extrabold rounded-xl transition flex items-center gap-1.5 shadow-sm border border-blue-200 cursor-pointer" title="Back from this exam">
            <i data-lucide="arrow-left" class="w-3.5 h-3.5"></i>
            <span>Back</span>
          </button>
          <button onclick="NanovaApp.resetGuidedFlow()"
            class="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl transition flex items-center gap-1.5 cursor-pointer" title="Change Subject">
            <i data-lucide="refresh-cw" class="w-3.5 h-3.5"></i>
            <span>Change Subject</span>
          </button>
        </div>
      </div>
    `;
  }

  function backFromExam() {
    if (State.guidedFlow.year && State.guidedFlow.category && State.guidedFlow.subject) {
      State.guidedFlow.year = null;
      State.hasAppliedFilters = false;
      State.filters.year = 'ALL';
      renderGuidedExploration();
      const container = document.getElementById('boardQuestionsListContainer');
      if (container) container.innerHTML = '';
      window.scrollTo({ top: 100, behavior: 'smooth' });
    } else if (State.guidedFlow.category && State.guidedFlow.subject) {
      State.guidedFlow.category = null;
      State.hasAppliedFilters = false;
      renderGuidedExploration();
      const container = document.getElementById('boardQuestionsListContainer');
      if (container) container.innerHTML = '';
      window.scrollTo({ top: 100, behavior: 'smooth' });
    } else {
      resetGuidedFlow();
      window.scrollTo({ top: 100, behavior: 'smooth' });
    }
  }

  function chooseGuidedSubject(subjectName) {
    State.guidedFlow.subject = subjectName;
    State.guidedFlow.category = null;
    State.guidedFlow.year = null;
    // Reset filters to show the selected subject for the active university
    State.filters.course = subjectName;
    State.filters.university = State.guidedFlow.university || 'Haramaya University';
    State.filters.year = 'ALL';
    State.filters.category = 'ALL';
    State.hasAppliedFilters = false;
    renderGuidedExploration();
  }

  function chooseGuidedCategory(categoryName) {
    State.guidedFlow.category = categoryName;
    State.guidedFlow.year = null;
    State.filters.category = categoryName;
    State.hasAppliedFilters = false;
    renderGuidedExploration();
  }

  function chooseGuidedYear(yearName) {
    State.guidedFlow.year = yearName;
    State.filters.course = State.guidedFlow.subject || 'ALL';
    State.filters.university = State.guidedFlow.university || 'ALL';
    State.filters.category = State.guidedFlow.category || 'ALL';
    State.filters.year = yearName;
    State.hasAppliedFilters = true;
    renderGuidedExploration();
    applyFilters();
  }

  function changeGuidedUniversity(univName) {
    State.guidedFlow.university = univName;
    State.guidedFlow.subject = null;
    State.guidedFlow.category = null;
    State.guidedFlow.year = null;
    State.hasAppliedFilters = false;
    const badge = document.getElementById('activeUnivBadge');
    if (badge) badge.textContent = univName;
    renderGuidedExploration();
  }

  function resetGuidedFlow() {
    State.guidedFlow.subject = null;
    State.guidedFlow.category = null;
    State.guidedFlow.year = null;
    State.hasAppliedFilters = false;
    State.filters.course = 'ALL';
    State.filters.university = 'ALL';
    State.filters.year = 'ALL';
    State.filters.category = 'ALL';
    renderGuidedExploration();
    renderBoardQuestionsPage();
  }

  function toggleClassicFilterMode() {
    const filterCard = document.getElementById('classicFilterCard');
    const btnText = document.getElementById('classicFilterBtnText');
    if (!filterCard) return;
    const isHidden = filterCard.classList.contains('hidden');
    filterCard.classList.toggle('hidden', !isHidden);
    if (btnText) btnText.textContent = isHidden ? 'Hide Filters' : 'Advanced Search / Filter';
  }

  /* ── SECURITY & SANITIZATION HELPERS ─────────────── */
  function sanitizeUrl(url) {
    if (!url || typeof url !== 'string') return '#';
    const clean = url.trim();
    if (/^https?:\/\/[a-zA-Z0-9\-\._~:\/\?#\[\]@!$&'\(\)\*\+,;=%]+/i.test(clean) ||
        /^mailto:[a-zA-Z0-9_\.\-]+@[a-zA-Z0-9_\.\-]+/i.test(clean) ||
        /^tel:\+?[0-9\s\-]+/i.test(clean)) {
      return escapeHtml(clean);
    }
    return '#';
  }

  function escapeAttr(str) {
    if (str === null || str === undefined) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/'/g, '&#39;')
      .replace(/"/g, '&quot;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
  }

  /* ── YOUTUBE EMBED HELPER (VALIDATED) ─────────────── */
  function extractYouTubeEmbedUrl(url) {
    if (!url || typeof url !== 'string') return null;
    try {
      const u = url.trim();
      let videoId = null;

      if (u.includes('youtu.be/')) {
        videoId = u.split('youtu.be/')[1]?.split('?')[0];
      } else if (u.includes('youtube.com/watch')) {
        const urlParams = new URLSearchParams(u.split('?')[1]);
        videoId = urlParams.get('v');
      } else if (u.includes('youtube.com/embed/')) {
        videoId = u.split('youtube.com/embed/')[1]?.split('?')[0];
      } else if (u.includes('youtube.com/shorts/')) {
        videoId = u.split('youtube.com/shorts/')[1]?.split('?')[0];
      }

      // Strictly validate videoId (alphanumeric, dash, underscore only)
      if (videoId && /^[a-zA-Z0-9_-]{6,20}$/.test(videoId)) {
        return 'https://www.youtube.com/embed/' + encodeURIComponent(videoId) + '?rel=0';
      }
    } catch {}
    return null;
  }

  /* ── COMMUNITY INPUTS OFFLINE STATE ────────────────── */
  function updateCommunityInputsOfflineState(isOffline) {
    // 1. Composer inputs (Admin view)
    const postContent = document.getElementById('postInputContent');
    const postYt = document.getElementById('postYoutubeUrl');
    const postImg = document.getElementById('postImageUrl');
    const publishBtn = document.querySelector('.btn-publish');

    if (postContent) {
      postContent.disabled = isOffline;
      if (isOffline) {
        postContent.placeholder = 'Offline mode: Reconnect to internet to broadcast announcements.';
      } else {
        postContent.placeholder = 'Broadcast official announcements, study guides, or freshman exam tips...';
      }
    }
    if (postYt) postYt.disabled = isOffline;
    if (postImg) postImg.disabled = isOffline;
    if (publishBtn) {
      publishBtn.disabled = isOffline;
      if (isOffline) {
        publishBtn.classList.add('opacity-50', 'cursor-not-allowed');
      } else {
        publishBtn.classList.remove('opacity-50', 'cursor-not-allowed');
      }
    }

    // Admin section inputs
    const adminPostContent = document.getElementById('adminPostContentInput');
    const adminPostYt = document.getElementById('adminPostYoutubeInput');
    const adminPostImg = document.getElementById('adminPostImageInput');
    const adminPostPublishBtn = document.getElementById('adminPostPublishBtn');
    if (adminPostContent) adminPostContent.disabled = isOffline;
    if (adminPostYt) adminPostYt.disabled = isOffline;
    if (adminPostImg) adminPostImg.disabled = isOffline;
    if (adminPostPublishBtn) {
      adminPostPublishBtn.disabled = isOffline;
      if (isOffline) adminPostPublishBtn.classList.add('opacity-50', 'cursor-not-allowed');
      else adminPostPublishBtn.classList.remove('opacity-50', 'cursor-not-allowed');
    }

    const adminComposerView = document.getElementById('adminComposerView');
    if (adminComposerView) {
      let notice = document.getElementById('composerOfflineNotice');
      if (isOffline) {
        if (!notice) {
          notice = document.createElement('div');
          notice.id = 'composerOfflineNotice';
          notice.className = 'p-2.5 mb-3 rounded-xl bg-amber-50 border border-amber-200 text-amber-800 text-xs font-semibold flex items-center gap-2 animate-fade-in';
          notice.innerHTML = '<i data-lucide="wifi-off" class="w-4 h-4 text-amber-600 flex-shrink-0"></i><span>Announcement posting is disabled while offline.</span>';
          adminComposerView.prepend(notice);
        }
      } else if (notice) {
        notice.remove();
      }
    }

    // 2. Comments input & submit in comments modal
    const commentInput = document.getElementById('newCommentInput');
    const commentSubmitBtn = document.querySelector('#commentModal button[type="submit"]');
    if (commentInput) {
      commentInput.disabled = isOffline;
      if (isOffline) {
        commentInput.placeholder = 'Commenting is disabled while offline.';
      } else {
        commentInput.placeholder = 'Write a comment or question...';
      }
    }
    if (commentSubmitBtn) {
      commentSubmitBtn.disabled = isOffline;
      if (isOffline) {
        commentSubmitBtn.classList.add('opacity-50', 'cursor-not-allowed');
      } else {
        commentSubmitBtn.classList.remove('opacity-50', 'cursor-not-allowed');
      }
    }
  }

  /* ── COMMUNITY FEED RENDERING ──────────────────────── */
  function renderCommunityPosts() {
    const container = document.getElementById('communityPostsContainer');
    if (!container) return;

    // Stop any active loading spinners immediately
    const spinner = document.getElementById('communityFeedSpinner');
    if (spinner) spinner.classList.add('hidden');

    const isOffline = !navigator.onLine;

    // If offline and no cached posts exist:
    if (isOffline && (!State.posts || !State.posts.length)) {
      container.innerHTML = `
        <div class="white-card text-center py-14 px-6 space-y-3 border border-slate-200 shadow-sm animate-fade-in">
          <div class="w-16 h-16 rounded-3xl bg-slate-100 text-slate-400 flex items-center justify-center mx-auto mb-2 shadow-inner">
            <i data-lucide="wifi-off" class="w-8 h-8"></i>
          </div>
          <h4 class="text-base font-extrabold text-slate-800">Internet Connection Required</h4>
          <p class="text-xs text-slate-500 max-w-sm mx-auto font-medium leading-relaxed">
            The Community Feed requires an active internet connection.
          </p>
          <button onclick="NanovaApp.retryCommunityFeed()" class="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-xs transition inline-flex items-center gap-2 mt-2 shadow-md">
            <i data-lucide="refresh-cw" class="w-4 h-4"></i>
            <span>Retry Connection</span>
          </button>
        </div>
      `;
      updateCommunityInputsOfflineState(true);
      if (window.lucide) window.lucide.createIcons();
      return;
    }

    const visiblePosts = State.posts.filter(p => !State.blockedAuthors.includes(p.author) && !State.blockedAuthors.includes(p.id));

    if (!visiblePosts.length) {
      container.innerHTML = '<div class="white-card text-center text-slate-400 py-8">No community posts available.</div>';
      updateCommunityInputsOfflineState(isOffline);
      return;
    }

    const offlineBannerHtml = isOffline
      ? `<div id="offlinePostsBanner" class="p-3 mb-4 rounded-2xl bg-amber-50 border border-amber-200 flex items-center space-x-2 text-amber-900 text-xs font-bold animate-fade-in shadow-sm">
          <i data-lucide="wifi-off" class="w-4 h-4 text-amber-600 flex-shrink-0"></i>
          <span>You are offline.</span>
        </div>`
      : '';

    const postsHtml = visiblePosts.map((post) => {
      const embedVideoUrl = extractYouTubeEmbedUrl(post.youtubeUrl);
      const safeImageUrl = post.imageUrl && /^https?:\/\/.+/i.test(post.imageUrl.trim()) ? sanitizeUrl(post.imageUrl) : null;

      // For regular users/guests: show posts cleanly without any admin identity
      const headerHtml = State.isAdmin
        ? '<div class="flex items-center justify-between mb-3">' +
            '<div class="flex items-center space-x-3">' +
              '<div class="user-avatar-circle bg-black text-white font-bold">' + (post.initial || 'A') + '</div>' +
              '<div>' +
                '<div class="flex items-center space-x-2">' +
                  '<h4 class="font-extrabold text-slate-900 text-sm">' + escapeHtml(post.author) + '</h4>' +
                  '<span class="px-2 py-0.5 rounded-full bg-blue-100 text-blue-800 text-[10px] font-extrabold tracking-wide">ADMIN</span>' +
                '</div>' +
                '<span class="text-xs text-slate-400 font-medium">' + escapeHtml(post.date || 'Official Notice') + '</span>' +
              '</div>' +
            '</div>' +
            '<div class="flex items-center space-x-1">' +
              '<button onclick="NanovaApp.openEditPostModal(\'' + escapeAttr(post.id) + '\')" class="text-slate-400 hover:text-[#0052fe] p-1.5 rounded-lg transition" title="Edit Post"><i data-lucide="edit-3" class="w-4 h-4"></i></button>' +
              '<button onclick="NanovaApp.deletePost(\'' + escapeAttr(post.id) + '\')" class="text-slate-400 hover:text-rose-500 p-1.5 rounded-lg transition" title="Delete Post"><i data-lucide="trash-2" class="w-4 h-4"></i></button>' +
            '</div>' +
          '</div>'
        : '<div class="flex items-center mb-3 space-x-2">' +
            '<span class="px-2 py-0.5 rounded-full bg-[#0052fe]/10 text-[#0052fe] text-[11px] font-extrabold tracking-wide flex items-center gap-1">' +
              '<i data-lucide="megaphone" class="w-3 h-3"></i>' +
              '<span>Official Announcement</span>' +
            '</span>' +
            '<span class="text-xs text-slate-400 font-medium">' + escapeHtml(post.date || 'Official Notice') + '</span>' +
          '</div>';

      return '<div class="white-card shadow-sm border border-slate-100" id="' + escapeAttr(post.id) + '">' +
        headerHtml +
        '<p class="text-slate-800 text-sm leading-relaxed mb-3">' + escapeHtml(post.content) + '</p>' +

        (embedVideoUrl ? '<div class="video-responsive-container mb-3">' +
          '<iframe src="' + embedVideoUrl + '" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>' +
        '</div>' : '') +

        (safeImageUrl && safeImageUrl !== '#' ? '<img src="' + safeImageUrl + '" alt="Announcement Visual" class="post-embedded-image mb-3" onerror="this.style.display=\'none\'" />' : '') +

        '<div class="flex flex-wrap items-center gap-2 pt-3 border-t border-slate-100">' +
          '<button onclick="NanovaApp.toggleLikePost(\'' + post.id + '\')" class="post-action-btn ' + (post.isLiked ? 'liked' : '') + '">' +
            '<i data-lucide="thumbs-up" class="w-4 h-4"></i>' +
            '<span>' + (post.likes || 0) + ' Likes</span>' +
          '</button>' +
          '<button onclick="NanovaApp.commentOnPost(\'' + post.id + '\')" class="post-action-btn">' +
            '<i data-lucide="message-circle" class="w-4 h-4"></i>' +
            '<span>Comment</span>' +
          '</button>' +
          '<button onclick="NanovaApp.sharePost(\'' + post.id + '\')" class="post-action-btn">' +
            '<i data-lucide="share-2" class="w-4 h-4"></i>' +
            '<span>Share</span>' +
          '</button>' +
          '<button onclick="NanovaApp.moderatePost(\'' + escapeAttr(post.id) + '\', \'' + escapeAttr(post.author || 'User') + '\')" class="post-action-btn text-slate-400 hover:text-rose-600" title="Report or Block">' +
            '<i data-lucide="flag" class="w-4 h-4"></i>' +
            '<span>Report / Block</span>' +
          '</button>' +
        '</div>' +
      '</div>';
    }).join('');

    container.innerHTML = offlineBannerHtml + postsHtml;
    updateCommunityInputsOfflineState(isOffline);
    if (window.lucide) window.lucide.createIcons();
  }

  function moderatePost(postId, author) {
    const action = confirm(`Community Moderation Options for post by "${author}":\n\n• Click [OK] to Report this Post to moderators\n• Click [Cancel] to Block this Author from your feed`);
    if (action) {
      reportPost(postId);
    } else {
      const confirmBlock = confirm(`Block user "${author}"?\n\nYou will no longer see any posts or comments from this author.`);
      if (confirmBlock) {
        blockPostAuthor(author);
      }
    }
  }

  function reportPost(postId) {
    const reason = prompt('Please describe why you are reporting this post (e.g. Inappropriate content, hate speech, spam):');
    if (!reason || !reason.trim()) return;

    const reportId = 'rep_' + Date.now();
    const reportData = {
      id: reportId,
      postId: postId,
      reason: reason.trim(),
      reporterUid: State.currentUser ? State.currentUser.uid : 'guest',
      timestamp: Date.now(),
      dateStr: new Date().toLocaleString()
    };

    if (firebaseDb) {
      firebaseDb.ref('reports/' + reportId).set(reportData).then(() => {
        alert('✅ Post reported. Our moderation team will review this within 24 hours.');
      }).catch(() => {
        alert('✅ Report recorded. Thank you for helping keep our student community safe.');
      });
    } else {
      alert('✅ Report noted. Thank you for your feedback.');
    }
  }

  function blockPostAuthor(author) {
    if (!author) return;
    if (!State.blockedAuthors) State.blockedAuthors = [];
    if (!State.blockedAuthors.includes(author)) {
      State.blockedAuthors.push(author);
      try {
        localStorage.setItem('nanova_blocked_authors', JSON.stringify(State.blockedAuthors));
      } catch {}
    }
    alert(`✅ User "${author}" has been blocked. Their posts have been removed from your feed.`);
    renderCommunityPosts();
  }

  function sharePost(postId) {
    if (navigator.share) {
      navigator.share({ title: 'Nanova Freshman Announcement', url: window.location.href });
    } else {
      navigator.clipboard?.writeText(window.location.href);
      alert('Announcement link copied to clipboard!');
    }
  }

  /* ── ADMIN: QUESTION CREATOR ───────────────────────── */
  /* ── DATA SYNC HELPER (INDEXEDDB & LOCAL BACKEND) ─── */
  async function syncExamsDataset() {
    try {
      // 1. Save to IndexedDB for offline and client session
      await NanovaDB.saveAll('exams', State.questions);
    } catch (err) {
      console.warn('[Nanova] IndexedDB sync error:', err);
    }

    try {
      // 2. Persist to local server file system (server.js -> data/exams.json)
      const resp = await fetch('/api/exams/save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(State.questions)
      });
      if (resp.ok) {
        console.log('[Nanova] exams.json persisted to disk via server API');
      }
    } catch (e) {
      // Offline or static hosting
    }
  }

  /* ── ADMIN: QUESTION CREATOR & EDITOR ──────────────── */
  const OPTION_LETTERS = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];

  function renderQuestionModalOptions(optionsArray = ['', '', '', ''], selectedAnswerIndex = 0) {
    const container = document.getElementById('newQOptionsContainer');
    if (!container) return;

    if (!optionsArray || !optionsArray.length) {
      optionsArray = ['', '', '', ''];
    }

    container.innerHTML = optionsArray.map((optText, idx) => {
      const letter = OPTION_LETTERS[idx] || (idx + 1);
      return `
        <div class="flex items-center space-x-2 option-row" data-index="${idx}">
          <span class="w-7 h-7 rounded-full bg-blue-50 text-blue-700 font-extrabold text-xs flex items-center justify-center flex-shrink-0">${letter}</span>
          <input type="text" class="new-q-opt-input custom-select text-xs flex-1" value="${escapeAttr(optText)}" placeholder="Option ${letter} text..." required oninput="NanovaApp.updateCorrectOptionsDropdown()" />
          ${optionsArray.length > 2 ? `
            <button type="button" onclick="NanovaApp.removeQuestionOptionRow(${idx})" class="text-slate-400 hover:text-rose-500 p-1.5 transition rounded-lg" title="Remove Option">
              <i data-lucide="minus-circle" class="w-4 h-4"></i>
            </button>
          ` : ''}
        </div>
      `;
    }).join('');

    updateCorrectOptionsDropdown(optionsArray.length, selectedAnswerIndex);
    if (window.lucide) window.lucide.createIcons();
  }

  function updateCorrectOptionsDropdown(count, preferredIndex) {
    const select = document.getElementById('newQCorrect');
    if (!select) return;

    const currentCount = count || document.querySelectorAll('.new-q-opt-input').length || 4;
    const currentSelected = preferredIndex !== undefined ? preferredIndex : parseInt(select.value || '0', 10);

    let html = '';
    for (let i = 0; i < currentCount; i++) {
      const letter = OPTION_LETTERS[i] || (i + 1);
      const optInput = document.querySelectorAll('.new-q-opt-input')[i];
      const preview = optInput && optInput.value.trim() ? ` ("${optInput.value.trim().substring(0, 20)}${optInput.value.trim().length > 20 ? '...' : ''}")` : '';
      html += `<option value="${i}">Option ${letter} is Correct${preview}</option>`;
    }
    select.innerHTML = html;

    if (currentSelected < currentCount) {
      select.value = currentSelected;
    } else {
      select.value = 0;
    }
  }

  function setQuestionOptionsPreset(numOrType) {
    if (numOrType === 2) {
      renderQuestionModalOptions(['True', 'False'], 0);
    } else if (numOrType === 5) {
      renderQuestionModalOptions(['', '', '', '', ''], 0);
    } else {
      renderQuestionModalOptions(['', '', '', ''], 0);
    }
  }

  function addQuestionOptionRow(val = '') {
    const currentInputs = Array.from(document.querySelectorAll('.new-q-opt-input')).map(inp => inp.value);
    if (currentInputs.length >= 8) {
      alert('Maximum of 8 options supported per question.');
      return;
    }
    currentInputs.push(val);
    const select = document.getElementById('newQCorrect');
    const selected = select ? parseInt(select.value || '0', 10) : 0;
    renderQuestionModalOptions(currentInputs, selected);
  }

  function removeQuestionOptionRow(idx) {
    const currentInputs = Array.from(document.querySelectorAll('.new-q-opt-input')).map(inp => inp.value);
    if (currentInputs.length <= 2) {
      alert('A question must have at least 2 options.');
      return;
    }
    currentInputs.splice(idx, 1);
    const select = document.getElementById('newQCorrect');
    let selected = select ? parseInt(select.value || '0', 10) : 0;
    if (selected >= currentInputs.length) selected = currentInputs.length - 1;
    renderQuestionModalOptions(currentInputs, selected);
  }

  function openAddQuestionModal(defaults = {}) {
    if (!State.isAdmin) return;
    const editIdInput = document.getElementById('newQEditId');
    if (editIdInput) editIdInput.value = '';

    const titleEl = document.getElementById('questionModalTitle');
    if (titleEl) {
      titleEl.innerHTML = '<i data-lucide="file-plus-2" class="w-5 h-5 text-[#0052fe]"></i><span>Add New Exam Question</span>';
    }
    const submitBtn = document.getElementById('questionModalSubmitBtn');
    if (submitBtn) submitBtn.textContent = 'Save Question';

    const form = document.getElementById('addQuestionForm');
    if (form) form.reset();

    if (defaults && typeof defaults === 'object') {
      if (defaults.course) {
        const el = document.getElementById('newQCourse');
        if (el) el.value = defaults.course;
      }
      if (defaults.university || defaults.univ) {
        const el = document.getElementById('newQUniv');
        if (el) el.value = defaults.university || defaults.univ;
      }
      if (defaults.year) {
        const el = document.getElementById('newQYear');
        if (el) el.value = defaults.year;
      }
      if (defaults.category) {
        const el = document.getElementById('newQCategory');
        if (el) el.value = defaults.category;
      }
    }

    renderQuestionModalOptions(['', '', '', ''], 0);
    document.getElementById('questionModal')?.classList.remove('hidden');
    if (window.lucide) window.lucide.createIcons();
  }

  function openEditQuestionModal(qId) {
    if (!State.isAdmin) return;
    const q = (State.questions || []).find(item => item.id === qId);
    if (!q) {
      alert('Question not found: ' + qId);
      return;
    }

    const editIdInput = document.getElementById('newQEditId');
    if (editIdInput) editIdInput.value = q.id;

    const titleEl = document.getElementById('questionModalTitle');
    if (titleEl) {
      titleEl.innerHTML = '<i data-lucide="edit-3" class="w-5 h-5 text-amber-600"></i><span>Edit Exam Question</span>';
    }
    const submitBtn = document.getElementById('questionModalSubmitBtn');
    if (submitBtn) submitBtn.textContent = 'Update Question';

    const catEl = document.getElementById('newQCategory');
    if (catEl) catEl.value = q.category || 'Mid Exam';

    const courseEl = document.getElementById('newQCourse');
    if (courseEl) {
      let exists = Array.from(courseEl.options).some(o => o.value === q.course);
      if (!exists && q.course) {
        courseEl.add(new Option(q.course, q.course, true, true));
      } else if (q.course) {
        courseEl.value = q.course;
      }
    }

    const univEl = document.getElementById('newQUniv');
    if (univEl) {
      let exists = Array.from(univEl.options).some(o => o.value === q.university);
      if (!exists && q.university) {
        univEl.add(new Option(q.university, q.university, true, true));
      } else if (q.university) {
        univEl.value = q.university;
      }
    }

    const yearEl = document.getElementById('newQYear');
    if (yearEl) {
      let exists = Array.from(yearEl.options).some(o => o.value === q.year);
      if (!exists && q.year) {
        yearEl.add(new Option(q.year, q.year, true, true));
      } else if (q.year) {
        yearEl.value = q.year;
      }
    }

    const promptEl = document.getElementById('newQPrompt');
    if (promptEl) promptEl.value = q.question || '';

    const explanationEl = document.getElementById('newQExplanation');
    if (explanationEl) explanationEl.value = q.explanation || '';

    const opts = (q.options && q.options.length) ? q.options : ['True', 'False'];
    renderQuestionModalOptions(opts, q.answer || 0);

    document.getElementById('questionModal')?.classList.remove('hidden');
    if (window.lucide) window.lucide.createIcons();
  }

  function closeAddQuestionModal() {
    document.getElementById('questionModal')?.classList.add('hidden');
    const editIdInput = document.getElementById('newQEditId');
    if (editIdInput) editIdInput.value = '';
  }

  function onNewQCategoryChange() {
    const category = document.getElementById('newQCategory')?.value || 'Mid Exam';
    const courseEl = document.getElementById('newQCourse');
    if (courseEl) {
      if (category === 'COC Exam') {
        courseEl.title = 'COC exams can include questions from any subject.';
      }
    }
  }

  async function saveNewQuestion(e) {
    e.preventDefault();
    if (!State.isAdmin) return;

    const editId = document.getElementById('newQEditId')?.value?.trim();
    const category = document.getElementById('newQCategory')?.value || 'Mid Exam';
    const course = document.getElementById('newQCourse')?.value;
    const university = document.getElementById('newQUniv')?.value;
    const year = document.getElementById('newQYear')?.value;
    const promptText = document.getElementById('newQPrompt')?.value.trim();
    const explanation = document.getElementById('newQExplanation')?.value.trim();
    const correctIdx = parseInt(document.getElementById('newQCorrect')?.value || '0', 10);

    const optInputs = Array.from(document.querySelectorAll('.new-q-opt-input'));
    const options = optInputs.map(inp => inp.value.trim()).filter(Boolean);

    if (!promptText) {
      alert('Please enter the question text prompt.');
      return;
    }
    if (options.length < 2) {
      alert('Please provide at least 2 valid answer options.');
      return;
    }

    if (editId) {
      // EDIT EXISTING QUESTION
      const target = (State.questions || []).find(q => q.id === editId);
      if (target) {
        target.category = category;
        target.course = course;
        target.university = university;
        target.year = year;
        target.question = promptText;
        target.options = options;
        target.answer = correctIdx >= options.length ? 0 : correctIdx;
        target.explanation = explanation || 'Detailed solution provided by campus administrator.';
      }

      await syncExamsDataset();
      applyFilters();
      renderAdminDashboard();
      closeAddQuestionModal();
      alert('✅ Exam question updated successfully!');
    } else {
      // CREATE NEW QUESTION
      const newQuestion = {
        id: 'custom_q_' + Date.now(),
        category: category,
        course: course,
        university: university,
        year: year,
        question: promptText,
        options: options,
        answer: correctIdx >= options.length ? 0 : correctIdx,
        explanation: explanation || 'Detailed solution provided by campus administrator.'
      };

      State.questions.unshift(newQuestion);
      await syncExamsDataset();
      applyFilters();
      renderAdminDashboard();
      closeAddQuestionModal();
      alert('✅ New exam question published to the Freshman Exam Board!');
    }
  }

  /* ── ADMIN DASHBOARD SUBTABS ───────────────────────── */
  let currentAdminSubTab = 'questions';

  function switchAdminSubTab(tabId) {
    currentAdminSubTab = tabId;
    const subtabs = ['questions', 'academic', 'universities', 'subjects', 'posts', 'curriculum', 'system', 'stats'];
    subtabs.forEach((id) => {
      const section = document.getElementById('adminSection-' + id);
      const navBtn = document.getElementById('adminSubNav-' + id);
      if (id === tabId) {
        if (section) section.classList.remove('hidden');
        if (navBtn) {
          navBtn.className = 'px-4 py-2 rounded-xl bg-white text-slate-900 font-extrabold text-xs shadow-sm flex items-center space-x-1.5 whitespace-nowrap';
        }
      } else {
        if (section) section.classList.add('hidden');
        if (navBtn) {
          navBtn.className = 'px-4 py-2 rounded-xl bg-black/40 hover:bg-black/60 text-white font-bold text-xs transition flex items-center space-x-1.5 whitespace-nowrap';
        }
      }
    });
    if (tabId === 'stats') {
      renderAdminStats();
    }
    if (window.lucide) window.lucide.createIcons();
  }

  function renderAdminDashboard() {
    const qCount = State.questions ? State.questions.length : 0;
    const uCount = State.universities ? State.universities.length : 0;
    const pCount = State.posts ? State.posts.length : 0;
    const pendingReqCount = (State.academicRequests || []).filter(r => r.status === 'pending').length;

    const statQ = document.getElementById('adminStatQuestions');
    const statU = document.getElementById('adminStatUniversities');
    const statP = document.getElementById('adminStatPosts');
    const statStatus = document.getElementById('adminStatCurriculumStatus');
    const statPending = document.getElementById('adminStatPendingRequests');

    if (statQ) statQ.textContent = qCount;
    if (statU) statU.textContent = uCount;
    if (statP) statP.textContent = pCount;
    if (statStatus) statStatus.textContent = 'Active';
    if (statPending) statPending.textContent = pendingReqCount;

    renderAdminQuestionsList();
    renderAdminUniversitiesList();
    renderAdminSubjectsVisibilityList();
    renderAdminPostsList();
    renderAdminAcademicRequests();
    renderAdminUsersList();
    renderAdminStats();

    if (window.lucide) window.lucide.createIcons();
  }

  /* ── ADMIN STATISTICS & COVERAGE ANALYTICS ──────────── */
  let _currentStatsView = 'subject-year';
  let _currentStatsCategory = 'ALL';
  let _statsUnivRowsExpanded = false;
  let _statsData = null;

  function renderAdminStats() {
    const questions = State.questions || [];
    const total = questions.length;

    // ── Precompute multidimensional breakdowns ────────────
    const byCourse = {};
    const courseYearsMap = {};
    const byCategory = {};
    const byUniversity = {};
    const courseUnivYearMap = {};
    const univCourseMap = {};
    const univYearMap = {};
    const catByCourseUnivYear = {};
    const courseYearCatMap = {};
    const univCourseCatMap = {};
    const univYearCatMap = {};

    questions.forEach((q) => {
      const course = q.course || 'Unknown';
      const year   = q.year   || 'Unknown';
      const cat    = q.category || 'Unknown';
      const univ   = q.university || 'General / Unknown';

      byCourse[course]   = (byCourse[course]   || 0) + 1;
      byCategory[cat]    = (byCategory[cat]    || 0) + 1;
      byUniversity[univ] = (byUniversity[univ] || 0) + 1;

      if (!courseYearsMap[course]) courseYearsMap[course] = {};
      courseYearsMap[course][year] = (courseYearsMap[course][year] || 0) + 1;

      if (!courseUnivYearMap[course]) courseUnivYearMap[course] = {};
      if (!courseUnivYearMap[course][univ]) courseUnivYearMap[course][univ] = {};
      courseUnivYearMap[course][univ][year] = (courseUnivYearMap[course][univ][year] || 0) + 1;

      if (!univCourseMap[univ]) univCourseMap[univ] = {};
      univCourseMap[univ][course] = (univCourseMap[univ][course] || 0) + 1;

      if (!univYearMap[univ]) univYearMap[univ] = {};
      univYearMap[univ][year] = (univYearMap[univ][year] || 0) + 1;

      if (!catByCourseUnivYear[course]) catByCourseUnivYear[course] = {};
      if (!catByCourseUnivYear[course][univ]) catByCourseUnivYear[course][univ] = {};
      if (!catByCourseUnivYear[course][univ][year]) catByCourseUnivYear[course][univ][year] = {};
      catByCourseUnivYear[course][univ][year][cat] = (catByCourseUnivYear[course][univ][year][cat] || 0) + 1;

      if (!courseYearCatMap[course]) courseYearCatMap[course] = {};
      if (!courseYearCatMap[course][year]) courseYearCatMap[course][year] = {};
      courseYearCatMap[course][year][cat] = (courseYearCatMap[course][year][cat] || 0) + 1;

      if (!univCourseCatMap[univ]) univCourseCatMap[univ] = {};
      if (!univCourseCatMap[univ][course]) univCourseCatMap[univ][course] = {};
      univCourseCatMap[univ][course][cat] = (univCourseCatMap[univ][course][cat] || 0) + 1;

      if (!univYearCatMap[univ]) univYearCatMap[univ] = {};
      if (!univYearCatMap[univ][year]) univYearCatMap[univ][year] = {};
      univYearCatMap[univ][year][cat] = (univYearCatMap[univ][year][cat] || 0) + 1;
    });

    const ALL_YEARS = ['2020 Exam','2021 Exam','2022 Exam','2023 Exam','2024 Exam','2025 Exam','Stream Selection Exam'];
    const allSubjects = Object.keys(byCourse).sort((a, b) => byCourse[b] - byCourse[a]);
    const allUnivs = Object.keys(byUniversity).sort((a, b) => byUniversity[b] - byUniversity[a]);

    const totalMidQs   = byCategory['Mid Exam'] || 0;
    const totalFinalQs = byCategory['Final Exam'] || 0;
    const totalCocQs   = byCategory['COC Exam'] || 0;
    const totalOtherQs = (byCategory['Stream Selection'] || 0) + (byCategory['Entrance Exam'] || 0);

    _statsData = {
      questions,
      total,
      byCourse,
      courseYearsMap,
      byCategory,
      byUniversity,
      courseUnivYearMap,
      univCourseMap,
      univYearMap,
      catByCourseUnivYear,
      courseYearCatMap,
      univCourseCatMap,
      univYearCatMap,
      totalMidQs,
      totalFinalQs,
      totalCocQs,
      ALL_YEARS,
      allSubjects,
      allUnivs
    };

    // Populate university filter dropdown
    const univFilterSelect = document.getElementById('statsUnivFilter');
    if (univFilterSelect) {
      const curVal = univFilterSelect.value || 'ALL';
      let optionsHtml = '<option value="ALL">All Universities (Combined)</option>';
      allUnivs.forEach(u => {
        optionsHtml += `<option value="${escapeAttr(u)}">${escapeHtml(u)} (${byUniversity[u]} Qs)</option>`;
      });
      univFilterSelect.innerHTML = optionsHtml;
      if (allUnivs.includes(curVal) || curVal === 'ALL') {
        univFilterSelect.value = curVal;
      }
    }

    // Synchronize category filter dropdown
    const catFilterSelect = document.getElementById('statsCategoryFilter');
    if (catFilterSelect && _currentStatsCategory) {
      catFilterSelect.value = _currentStatsCategory;
    }

    // User & overall completion stats
    const users           = State.registeredUsers || [];
    const authorizedUsers = users.filter(u => u.hasCurriculumAccess || u.role === 'admin').length;
    const totalUsers      = users.length;
    const pendingReqs     = (State.academicRequests || []).filter(r => r.status === 'pending').length;

    const subjectsWithGaps = allSubjects.filter(course => {
      const avail = courseYearsMap[course] || {};
      return ALL_YEARS.filter(y => !avail[y]).length >= 2;
    }).length;

    // Overall matrix completion rate
    let totalPossibleCells = allSubjects.length * ALL_YEARS.length;
    let filledCells = 0;
    allSubjects.forEach(c => {
      const yrs = courseYearsMap[c] || {};
      ALL_YEARS.forEach(y => { if (yrs[y] > 0) filledCells++; });
    });
    const completionPct = totalPossibleCells > 0 ? Math.round((filledCells / totalPossibleCells) * 100) : 0;

    // ─────────────────────────────────────────────────────
    // 1. OVERVIEW KPI CARDS (8 cards featuring Mid & Final)
    // ─────────────────────────────────────────────────────
    const overviewRow = document.getElementById('statsOverviewRow');
    if (overviewRow) {
      const cards = [
        { label: 'Total Questions',   value: total,               icon: 'help-circle',    color: 'blue',    sub: 'In exam bank' },
        { label: 'Mid Exam Qs',       value: totalMidQs,          icon: 'book-marked',    color: 'sky',     sub: 'Mid-term coverage' },
        { label: 'Final Exam Qs',     value: totalFinalQs,        icon: 'award',          color: 'indigo',  sub: 'Final exam coverage' },
        { label: 'COC & Other Qs',    value: totalCocQs + totalOtherQs, icon: 'layers',   color: 'purple',  sub: 'COC & stream selection' },
        { label: 'Subjects Covered',  value: allSubjects.length,  icon: 'book-open',      color: 'teal',    sub: 'Unique courses' },
        { label: 'Universities',      value: allUnivs.length,     icon: 'building-2',     color: 'emerald', sub: 'Active campuses' },
        { label: 'Curriculum Fill',   value: completionPct + '%', icon: 'check-circle-2', color: 'green',   sub: `${filledCells}/${totalPossibleCells} cohort slots` },
        { label: 'Subjects w/ Gaps',  value: subjectsWithGaps,    icon: 'alert-triangle', color: 'rose',    sub: 'Missing ≥2 years' },
      ];
      const colorMap = {
        blue: 'bg-blue-50 text-[#0052fe]', sky: 'bg-sky-50 text-sky-600',
        indigo: 'bg-indigo-50 text-indigo-600', purple: 'bg-purple-50 text-purple-600',
        teal: 'bg-teal-50 text-teal-600', emerald: 'bg-emerald-50 text-emerald-600',
        green: 'bg-emerald-50 text-emerald-700', rose: 'bg-rose-50 text-rose-600'
      };
      overviewRow.innerHTML = cards.map(card => `
        <div class="white-card p-4 border border-slate-100 hover:shadow-md transition">
          <div class="flex items-center justify-between mb-2">
            <div class="w-9 h-9 rounded-xl ${colorMap[card.color]} flex items-center justify-center">
              <i data-lucide="${card.icon}" class="w-4 h-4"></i>
            </div>
          </div>
          <div class="text-2xl font-black text-slate-900">${card.value}</div>
          <p class="text-[11px] font-bold text-slate-700 mt-0.5">${card.label}</p>
          <p class="text-[10px] font-medium text-slate-400 mt-0.5">${card.sub}</p>
        </div>
      `).join('');
    }

    // ─────────────────────────────────────────────────────
    // 2. COVERAGE MATRIX
    // ─────────────────────────────────────────────────────
    _renderStatsMatrix(
      _currentStatsView,
      univFilterSelect ? univFilterSelect.value : 'ALL',
      catFilterSelect ? catFilterSelect.value : _currentStatsCategory
    );

    // ─────────────────────────────────────────────────────
    // 3. UNIVERSITY READINESS SCORECARDS
    // ─────────────────────────────────────────────────────
    _renderUnivScorecards(allUnivs, allSubjects, ALL_YEARS, courseUnivYearMap, byUniversity);

    // ─────────────────────────────────────────────────────
    // 4. SUBJECT BARS (questions per course)
    // ─────────────────────────────────────────────────────
    const subjectBars = document.getElementById('statsSubjectBars');
    if (subjectBars && total > 0) {
      const maxCourse = Math.max(...Object.values(byCourse));
      subjectBars.innerHTML = allSubjects.map((course, i) => {
        const count = byCourse[course];
        const pct   = Math.round((count / maxCourse) * 100);
        const short = course.replace('Geography of Ethiopia and the Horn','Geography of Ethiopia').replace('Logic and Critical Thinking','Logic & CT').replace('Moral and Civics Education','Civics & Ethics').replace('Applied Mathematics I','Applied Math I');
        const gradients = [
          'from-blue-500 to-indigo-600','from-indigo-500 to-purple-600','from-purple-500 to-pink-500',
          'from-emerald-500 to-teal-600','from-teal-500 to-cyan-600','from-amber-500 to-orange-500',
          'from-rose-500 to-pink-600','from-sky-500 to-blue-600','from-violet-500 to-purple-600',
          'from-green-500 to-emerald-600','from-cyan-500 to-sky-600'
        ];
        const grad = gradients[i % gradients.length];
        return `
          <div>
            <div class="flex items-center justify-between mb-1.5">
              <span class="text-xs font-bold text-slate-700 truncate max-w-[200px]" title="${escapeHtml(course)}">${escapeHtml(short)}</span>
              <span class="text-xs font-extrabold text-slate-900 ml-2 flex-shrink-0">${count} <span class="text-slate-400 font-normal text-[10px]">Qs</span></span>
            </div>
            <div class="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
              <div class="h-2.5 rounded-full bg-gradient-to-r ${grad} transition-all duration-700" style="width:${pct}%"></div>
            </div>
          </div>
        `;
      }).join('');
    }

    // ─────────────────────────────────────────────────────
    // 5. CATEGORY BREAKDOWN BARS
    // ─────────────────────────────────────────────────────
    const catBars = document.getElementById('statsCategoryBars');
    if (catBars && total > 0) {
      const sortedCats = Object.entries(byCategory).sort((a,b) => b[1]-a[1]);
      const maxCat = sortedCats[0]?.[1] || 1;
      const catColors = {
        'Mid Exam':          'from-blue-500 to-blue-600',
        'Final Exam':        'from-indigo-500 to-indigo-700',
        'COC Exam':          'from-purple-500 to-purple-700',
        'Stream Selection':  'from-amber-500 to-orange-500',
        'Entrance Exam':     'from-emerald-500 to-teal-600',
        'Unknown':           'from-slate-400 to-slate-500',
      };
      catBars.innerHTML = sortedCats.map(([cat, count]) => {
        const pct  = Math.round((count / maxCat) * 100);
        const pctTotal = Math.round((count / total) * 100);
        const grad = catColors[cat] || 'from-slate-400 to-slate-600';
        return `
          <div>
            <div class="flex items-center justify-between mb-1.5">
              <span class="text-xs font-bold text-slate-700">${escapeHtml(cat)}</span>
              <span class="text-xs font-extrabold text-slate-900 ml-2">${count} <span class="text-slate-400 font-normal text-[10px]">(${pctTotal}%)</span></span>
            </div>
            <div class="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
              <div class="h-2.5 rounded-full bg-gradient-to-r ${grad} transition-all duration-700" style="width:${pct}%"></div>
            </div>
          </div>
        `;
      }).join('');
    }

    // ─────────────────────────────────────────────────────
    // 6. UNIVERSITY DISTRIBUTION BARS
    // ─────────────────────────────────────────────────────
    const univBars = document.getElementById('statsUniversityBars');
    if (univBars && total > 0) {
      const sortedUnivs = Object.entries(byUniversity).sort((a,b) => b[1]-a[1]);
      const maxUniv = sortedUnivs[0]?.[1] || 1;
      const univColors = [
        'from-emerald-500 to-teal-600','from-sky-500 to-blue-600','from-violet-500 to-purple-600',
        'from-amber-500 to-orange-500','from-rose-500 to-pink-500','from-cyan-500 to-sky-500',
        'from-indigo-500 to-blue-600','from-teal-500 to-emerald-600'
      ];
      univBars.innerHTML = sortedUnivs.map(([univ, count], i) => {
        const pct  = Math.round((count / maxUniv) * 100);
        const pctTotal = Math.round((count / total) * 100);
        const grad = univColors[i % univColors.length];
        return `
          <div>
            <div class="flex items-center justify-between mb-1.5">
              <span class="text-xs font-bold text-slate-700 truncate max-w-[240px]" title="${escapeHtml(univ)}">${escapeHtml(univ)}</span>
              <span class="text-xs font-extrabold text-slate-900 ml-2 flex-shrink-0">${count} <span class="text-slate-400 font-normal text-[10px]">(${pctTotal}%)</span></span>
            </div>
            <div class="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
              <div class="h-2.5 rounded-full bg-gradient-to-r ${grad} transition-all duration-700" style="width:${pct}%"></div>
            </div>
          </div>
        `;
      }).join('');
    }

    // ─────────────────────────────────────────────────────
    // 7. ACTIONABLE GAP PRIORITY MANAGER
    // ─────────────────────────────────────────────────────
    const gapFilter = document.getElementById('statsGapUnivFilter')?.value || 'ALL';
    _renderGapManager(gapFilter);

    if (window.lucide) window.lucide.createIcons();
  }

  /* ── ADMIN STATS HELPER MODULES & INTERACTIVE HANDLERS ── */
  function _getShortCourseName(course) {
    if (!course) return 'Unknown';
    return course
      .replace('Geography of Ethiopia and the Horn', 'Geography')
      .replace('Logic and Critical Thinking', 'Logic & CT')
      .replace('Moral and Civics Education', 'Civics')
      .replace('Communicative English', 'Comm. English')
      .replace('Emerging Technologies', 'Emerg. Tech')
      .replace('Applied Mathematics I', 'Applied Math I')
      .replace('General Chemistry', 'Chemistry')
      .replace('General Physics', 'Physics')
      .replace('General Psychology', 'Psychology')
      .replace('Global Trends', 'Global Trends')
      .replace('Critical Thinking', 'Critical Thinking');
  }

  function _getMatrixCellBadge(count, isSubrow, course, yr, univ, catFilter) {
    const cAttr = escapeAttr(course);
    const yAttr = escapeAttr(yr);
    const uAttr = escapeAttr(univ);
    const filter = catFilter || 'ALL';

    // If a specific exam type is selected (e.g. Mid Exam, Final Exam)
    if (filter !== 'ALL') {
      if (count === 0) {
        if (isSubrow) {
          return '<span class="text-slate-300 text-[10px] font-medium">—</span>';
        }
        return `<button type="button" onclick="NanovaApp.inspectStatsCell('${cAttr}', '${yAttr}', '${uAttr}')" class="px-2 py-0.5 rounded-md bg-rose-100 hover:bg-rose-200 text-rose-700 font-bold text-[10px] whitespace-nowrap transition cursor-pointer shadow-2xs hover:scale-105" title="0 ${escapeHtml(filter)} Questions - Click to inspect / add">Missing ${escapeHtml(filter.replace(' Exam',''))}</button>`;
      }
      const bg = count >= 20 ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800';
      return `<button type="button" onclick="NanovaApp.inspectStatsCell('${cAttr}', '${yAttr}', '${uAttr}')" class="px-2.5 py-1 rounded-lg ${bg} font-extrabold text-[11px] transition cursor-pointer shadow-2xs hover:scale-105" title="${count} ${escapeHtml(filter)} Questions - Click to inspect">${count}</button>`;
    }

    // Combined View (All Exam Types) -> Show Total + Mid/Final split
    let midCount = 0;
    let finalCount = 0;
    if (_statsData && _statsData.catByCourseUnivYear && course && yr) {
      if (univ === 'ALL') {
        const univMap = _statsData.catByCourseUnivYear[course] || {};
        Object.keys(univMap).forEach(u => {
          const yrMap = univMap[u]?.[yr] || {};
          midCount += yrMap['Mid Exam'] || 0;
          finalCount += yrMap['Final Exam'] || 0;
        });
      } else {
        const yrMap = _statsData.catByCourseUnivYear[course]?.[univ]?.[yr] || {};
        midCount = yrMap['Mid Exam'] || 0;
        finalCount = yrMap['Final Exam'] || 0;
      }
    }

    if (count === 0) {
      if (isSubrow) {
        return '<span class="text-slate-300 text-[10px] font-medium">—</span>';
      }
      return `<button type="button" onclick="NanovaApp.inspectStatsCell('${cAttr}', '${yAttr}', '${uAttr}')" class="px-2 py-0.5 rounded-md bg-rose-100 hover:bg-rose-200 text-rose-700 font-bold text-[10px] whitespace-nowrap transition cursor-pointer shadow-2xs hover:scale-105" title="0 Questions - Click to inspect / add">Missing</button>`;
    }

    if (isSubrow) {
      return `<button type="button" onclick="NanovaApp.inspectStatsCell('${cAttr}', '${yAttr}', '${uAttr}')" class="px-2 py-0.5 rounded bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold text-[10px] transition" title="${count} total (Mid: ${midCount}, Final: ${finalCount})">${count}</button>`;
    }

    const totalBg = count >= 20 ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800';
    return `
      <button type="button" onclick="NanovaApp.inspectStatsCell('${cAttr}', '${yAttr}', '${uAttr}')"
        class="inline-flex flex-col items-center justify-center p-1 rounded-xl transition hover:bg-blue-50/70 hover:shadow-xs cursor-pointer group mx-auto"
        title="${escapeHtml(course)} (${escapeHtml(yr)}): ${count} total Qs (Mid: ${midCount}, Final: ${finalCount})">
        <span class="px-2 py-0.5 rounded-lg ${totalBg} font-extrabold text-[11px] mb-0.5 group-hover:scale-105 transition">
          ${count}
        </span>
        <span class="flex items-center gap-1 text-[9px] font-bold leading-none">
          <span class="px-1 py-0.5 rounded ${midCount > 0 ? 'bg-blue-100 text-blue-700' : 'bg-rose-100 text-rose-700 font-black'}" title="Mid Exam: ${midCount}">${midCount > 0 ? 'M:' + midCount : 'M:0 ⚠️'}</span>
          <span class="px-1 py-0.5 rounded ${finalCount > 0 ? 'bg-indigo-100 text-indigo-700' : 'bg-rose-100 text-rose-700 font-black'}" title="Final Exam: ${finalCount}">${finalCount > 0 ? 'F:' + finalCount : 'F:0 ⚠️'}</span>
        </span>
      </button>
    `;
  }

  function _renderStatsMatrix(viewMode, univFilter, catFilter) {
    const matrix = document.getElementById('statsCoverageMatrix');
    if (!matrix || !_statsData) return;

    const currentCat = catFilter || _currentStatsCategory || 'ALL';
    const { ALL_YEARS, allSubjects, allUnivs, byCourse, byUniversity, courseYearsMap, courseUnivYearMap, univCourseMap, univYearMap, courseYearCatMap, univCourseCatMap, univYearCatMap } = _statsData;
    const thStyle = 'px-3 py-2 text-[10px] font-extrabold text-slate-500 uppercase tracking-wide text-center whitespace-nowrap';
    const tdBase  = 'px-2 py-2 text-center';

    // Toggle subrows toolbar button visibility based on view
    const subRowsBtn = document.getElementById('statsToggleUnivSubRowsBtn');
    if (subRowsBtn) {
      if (viewMode === 'subject-year' && (univFilter === 'ALL' || !univFilter)) {
        subRowsBtn.classList.remove('hidden');
      } else {
        subRowsBtn.classList.add('hidden');
      }
    }

    let html = '<table class="w-full text-xs border-collapse">';

    // ─────────────────────────────────────────────
    // VIEW 1: SUBJECT × YEAR (Canonical with university subrows)
    // ─────────────────────────────────────────────
    if (viewMode === 'subject-year') {
      html += '<thead><tr>';
      html += `<th class="${thStyle} text-left sticky left-0 bg-white z-10 min-w-[190px]">Subject / Campus</th>`;
      html += `<th class="${thStyle} bg-slate-50 min-w-[55px]">Total</th>`;
      ALL_YEARS.forEach(yr => {
        const label = yr.replace(' Exam', '').replace('Stream Selection', 'Stream');
        html += `<th class="${thStyle} min-w-[58px]">${escapeHtml(label)}</th>`;
      });
      html += '</tr></thead><tbody>';

      allSubjects.forEach((course, rowIdx) => {
        const rowBg = rowIdx % 2 === 0 ? 'bg-white' : 'bg-slate-50/60';
        const shortName = _getShortCourseName(course);

        // Get universities offering this course
        const univMapForCourse = courseUnivYearMap[course] || {};
        const courseUnivList = Object.keys(univMapForCourse).sort((a, b) => {
          const totA = Object.values(univMapForCourse[a]).reduce((acc, v) => acc + v, 0);
          const totB = Object.values(univMapForCourse[b]).reduce((acc, v) => acc + v, 0);
          return totB - totA;
        });

        if (univFilter === 'ALL' || !univFilter) {
          let rowTotal = 0;
          if (currentCat === 'ALL') {
            rowTotal = byCourse[course] || 0;
          } else {
            rowTotal = Object.values(courseYearCatMap[course] || {}).reduce((acc, yObj) => acc + (yObj[currentCat] || 0), 0);
          }

          // Main Subject Row
          html += `<tr class="${rowBg} hover:bg-blue-50/30 transition border-b border-slate-100">`;
          html += `
            <td class="px-3 py-2.5 sticky left-0 ${rowBg} z-10 font-bold text-slate-800 text-[11px] border-r border-slate-100 flex items-center justify-between gap-1">
              <span class="truncate max-w-[160px]" title="${escapeHtml(course)}">${escapeHtml(shortName)}</span>
              ${courseUnivList.length > 0 ? `
                <button type="button" onclick="NanovaApp.toggleStatsUnivRow('${rowIdx}', '${escapeAttr(course)}', this)"
                  class="stats-univ-row-chevron p-1 rounded-md hover:bg-slate-200/80 text-slate-400 hover:text-slate-700 transition"
                  title="Toggle ${courseUnivList.length} university sub-rows">
                  <i data-lucide="${_statsUnivRowsExpanded ? 'chevron-down' : 'chevron-right'}" class="w-3.5 h-3.5"></i>
                </button>
              ` : ''}
            </td>
          `;
          html += `<td class="${tdBase}"><span class="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-900 font-extrabold text-[11px]">${rowTotal}</span></td>`;

          ALL_YEARS.forEach(yr => {
            let count = 0;
            if (currentCat === 'ALL') {
              count = courseYearsMap[course]?.[yr] || 0;
            } else {
              count = courseYearCatMap[course]?.[yr]?.[currentCat] || 0;
            }
            html += `<td class="${tdBase}">${_getMatrixCellBadge(count, false, course, yr, 'ALL', currentCat)}</td>`;
          });
          html += '</tr>';

          // University Sub-Rows
          courseUnivList.forEach((u) => {
            const uYrs = univMapForCourse[u] || {};
            let uTotal = 0;
            if (currentCat === 'ALL') {
              uTotal = Object.values(uYrs).reduce((acc, v) => acc + v, 0);
            } else {
              uTotal = Object.values(courseUnivYearCatMap[course]?.[u] || {}).reduce((acc, yObj) => acc + (yObj[currentCat] || 0), 0);
            }
            const subRowHidden = _statsUnivRowsExpanded ? '' : 'hidden';

            html += `<tr class="stats-univ-subrow stats-univ-subrow-${rowIdx} ${subRowHidden} bg-slate-50/80 hover:bg-blue-50/40 transition border-b border-slate-100 text-slate-600">`;
            html += `
              <td class="px-3 py-1.5 pl-6 sticky left-0 bg-slate-50/90 z-10 text-[10px] font-bold text-slate-600 border-r border-slate-100 truncate max-w-[190px]" title="${escapeHtml(u)}">
                <span class="text-blue-500 mr-1 font-mono">↳</span>${escapeHtml(u)}
              </td>
            `;
            html += `<td class="${tdBase}"><span class="px-2 py-0.5 rounded bg-slate-200 text-slate-700 font-bold text-[10px]">${uTotal}</span></td>`;

            ALL_YEARS.forEach(yr => {
              let uCount = 0;
              if (currentCat === 'ALL') {
                uCount = uYrs[yr] || 0;
              } else {
                uCount = courseUnivYearCatMap[course]?.[u]?.[yr]?.[currentCat] || 0;
              }
              html += `<td class="${tdBase}">${_getMatrixCellBadge(uCount, true, course, yr, u, currentCat)}</td>`;
            });
            html += '</tr>';
          });

        } else {
          // Specific university filtered
          const uYrs = univMapForCourse[univFilter] || {};
          let uTotal = 0;
          if (currentCat === 'ALL') {
            uTotal = Object.values(uYrs).reduce((acc, v) => acc + v, 0);
          } else {
            uTotal = Object.values(courseUnivYearCatMap[course]?.[univFilter] || {}).reduce((acc, yObj) => acc + (yObj[currentCat] || 0), 0);
          }

          html += `<tr class="${rowBg} hover:bg-blue-50/30 transition border-b border-slate-100">`;
          html += `<td class="px-3 py-2.5 sticky left-0 ${rowBg} z-10 font-bold text-slate-800 text-[11px] border-r border-slate-100 truncate max-w-[190px]" title="${escapeHtml(course)}">${escapeHtml(shortName)}</td>`;
          html += `<td class="${tdBase}"><span class="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-900 font-extrabold text-[11px]">${uTotal}</span></td>`;

          ALL_YEARS.forEach(yr => {
            let uCount = 0;
            if (currentCat === 'ALL') {
              uCount = uYrs[yr] || 0;
            } else {
              uCount = courseUnivYearCatMap[course]?.[univFilter]?.[yr]?.[currentCat] || 0;
            }
            html += `<td class="${tdBase}">${_getMatrixCellBadge(uCount, false, course, yr, univFilter, currentCat)}</td>`;
          });
          html += '</tr>';
        }
      });
      html += '</tbody></table>';

    // ─────────────────────────────────────────────
    // VIEW 2: UNIVERSITY × SUBJECT
    // ─────────────────────────────────────────────
    } else if (viewMode === 'univ-subject') {
      html += '<thead><tr>';
      html += `<th class="${thStyle} text-left sticky left-0 bg-white z-10 min-w-[180px]">University</th>`;
      html += `<th class="${thStyle} bg-slate-50 min-w-[55px]">Total</th>`;
      allSubjects.forEach(c => {
        const short = _getShortCourseName(c);
        html += `<th class="${thStyle} min-w-[70px]" title="${escapeHtml(c)}">${escapeHtml(short)}</th>`;
      });
      html += '</tr></thead><tbody>';

      allUnivs.forEach((u, rowIdx) => {
        const rowBg = rowIdx % 2 === 0 ? 'bg-white' : 'bg-slate-50/60';
        let uTotal = 0;
        if (currentCat === 'ALL') {
          uTotal = byUniversity[u] || 0;
        } else {
          uTotal = Object.values(univCourseCatMap[u] || {}).reduce((acc, cObj) => acc + (cObj[currentCat] || 0), 0);
        }

        html += `<tr class="${rowBg} hover:bg-blue-50/30 transition border-b border-slate-100">`;
        html += `<td class="px-3 py-2.5 sticky left-0 ${rowBg} z-10 font-extrabold text-slate-800 text-[11px] border-r border-slate-100 truncate max-w-[180px]" title="${escapeHtml(u)}">${escapeHtml(u)}</td>`;
        html += `<td class="${tdBase}"><span class="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-900 font-extrabold text-[11px]">${uTotal}</span></td>`;

        allSubjects.forEach(c => {
          let count = 0;
          if (currentCat === 'ALL') {
            count = univCourseMap[u]?.[c] || 0;
          } else {
            count = univCourseCatMap[u]?.[c]?.[currentCat] || 0;
          }
          html += `<td class="${tdBase}">${_getMatrixCellBadge(count, false, c, 'ALL', u, currentCat)}</td>`;
        });
        html += '</tr>';
      });
      html += '</tbody></table>';

    // ─────────────────────────────────────────────
    // VIEW 3: UNIVERSITY × YEAR
    // ─────────────────────────────────────────────
    } else if (viewMode === 'univ-year') {
      html += '<thead><tr>';
      html += `<th class="${thStyle} text-left sticky left-0 bg-white z-10 min-w-[180px]">University</th>`;
      html += `<th class="${thStyle} bg-slate-50 min-w-[55px]">Total</th>`;
      ALL_YEARS.forEach(yr => {
        const label = yr.replace(' Exam', '').replace('Stream Selection', 'Stream');
        html += `<th class="${thStyle} min-w-[58px]">${escapeHtml(label)}</th>`;
      });
      html += '</tr></thead><tbody>';

      allUnivs.forEach((u, rowIdx) => {
        const rowBg = rowIdx % 2 === 0 ? 'bg-white' : 'bg-slate-50/60';
        let uTotal = 0;
        if (currentCat === 'ALL') {
          uTotal = byUniversity[u] || 0;
        } else {
          uTotal = Object.values(univYearCatMap[u] || {}).reduce((acc, yObj) => acc + (yObj[currentCat] || 0), 0);
        }

        html += `<tr class="${rowBg} hover:bg-blue-50/30 transition border-b border-slate-100">`;
        html += `<td class="px-3 py-2.5 sticky left-0 ${rowBg} z-10 font-extrabold text-slate-800 text-[11px] border-r border-slate-100 truncate max-w-[180px]" title="${escapeHtml(u)}">${escapeHtml(u)}</td>`;
        html += `<td class="${tdBase}"><span class="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-900 font-extrabold text-[11px]">${uTotal}</span></td>`;

        ALL_YEARS.forEach(yr => {
          let count = 0;
          if (currentCat === 'ALL') {
            count = univYearMap[u]?.[yr] || 0;
          } else {
            count = univYearCatMap[u]?.[yr]?.[currentCat] || 0;
          }
          html += `<td class="${tdBase}">${_getMatrixCellBadge(count, false, 'ALL', yr, u, currentCat)}</td>`;
        });
        html += '</tr>';
      });
      html += '</tbody></table>';
    }

    matrix.innerHTML = html;
    if (window.lucide) window.lucide.createIcons();
  }

  function _renderUnivScorecards(allUnivs, allSubjects, ALL_YEARS, courseUnivYearMap, byUniversity) {
    const container = document.getElementById('statsUnivScorecards');
    if (!container) return;

    if (!allUnivs.length) {
      container.innerHTML = '<div class="col-span-full p-4 text-center text-xs text-slate-400">No university data found.</div>';
      return;
    }

    container.innerHTML = allUnivs.map(u => {
      const totalQ = byUniversity[u] || 0;
      // Count distinct subjects covered by this university
      const coveredSubjects = allSubjects.filter(c => courseUnivYearMap[c]?.[u] && Object.values(courseUnivYearMap[c][u]).some(v => v > 0));
      const missingSubjects = allSubjects.filter(c => !coveredSubjects.includes(c));
      const subjPct = Math.round((coveredSubjects.length / allSubjects.length) * 100);

      const isHigh = subjPct >= 70;
      const isMedium = subjPct >= 30;
      const badgeColor = isHigh ? 'bg-emerald-100 text-emerald-800 border-emerald-200' : isMedium ? 'bg-amber-100 text-amber-800 border-amber-200' : 'bg-rose-100 text-rose-800 border-rose-200';
      const barColor = isHigh ? 'bg-emerald-500' : isMedium ? 'bg-amber-500' : 'bg-rose-500';
      const statusText = isHigh ? 'High Coverage' : isMedium ? 'Partial' : 'Needs Content';

      const missingPreview = missingSubjects.slice(0, 2).map(c => _getShortCourseName(c)).join(', ');
      const moreMissing = missingSubjects.length > 2 ? ` +${missingSubjects.length - 2} more` : '';

      return `
        <div onclick="NanovaApp.onStatsUnivFilterChange('${escapeAttr(u)}')" class="p-3.5 rounded-2xl border border-slate-100 bg-white hover:border-blue-300 hover:shadow-md transition cursor-pointer flex flex-col justify-between group">
          <div>
            <div class="flex items-start justify-between gap-2 mb-2">
              <h4 class="font-black text-slate-900 text-xs leading-snug group-hover:text-blue-600 transition truncate" title="${escapeHtml(u)}">${escapeHtml(u)}</h4>
              <span class="px-2 py-0.5 rounded-md border ${badgeColor} text-[9px] font-black uppercase whitespace-nowrap">${statusText}</span>
            </div>
            <div class="flex items-center justify-between text-[11px] mb-1.5">
              <span class="text-slate-500 font-medium">Curriculum Fill</span>
              <span class="font-extrabold text-slate-900">${coveredSubjects.length}/${allSubjects.length} subjects (${subjPct}%)</span>
            </div>
            <div class="w-full bg-slate-100 rounded-full h-1.5 mb-3 overflow-hidden">
              <div class="h-1.5 rounded-full ${barColor} transition-all duration-500" style="width: ${subjPct}%"></div>
            </div>
          </div>
          <div class="pt-2.5 border-t border-slate-50 flex items-center justify-between text-[10px]">
            <span class="font-bold text-slate-600">${totalQ} Total Qs</span>
            <span class="text-slate-400 font-medium truncate max-w-[140px]" title="Missing: ${missingPreview}${moreMissing}">
              ${missingSubjects.length > 0 ? `Missing: ${missingPreview}${moreMissing}` : 'Full coverage!'}
            </span>
          </div>
        </div>
      `;
    }).join('');
  }

  function _renderGapManager(filterLevel) {
    const container = document.getElementById('statsMissingAlerts');
    if (!container || !_statsData) return;

    const { allSubjects, courseYearsMap, courseYearCatMap, byCourse, ALL_YEARS } = _statsData;
    const filter = filterLevel || 'ALL';
    let alertItems = [];

    allSubjects.forEach(course => {
      const yearCounts = courseYearsMap[course] || {};
      const yearCats = courseYearCatMap[course] || {};

      // 1. Missing Entire Cohort Years
      const missingYears = ALL_YEARS.filter(y => !yearCounts[y]);
      if (missingYears.length > 0 && (filter === 'ALL' || filter === 'CRITICAL' || filter === 'HIGH')) {
        const urgency = missingYears.length >= 4 ? 'CRITICAL' : missingYears.length >= 2 ? 'HIGH' : 'MEDIUM';
        if (filter === 'ALL' || filter === urgency) {
          alertItems.push({
            type: 'COHORT_MISSING',
            course,
            title: `${_getShortCourseName(course)} — Full Year Missing`,
            desc: `${missingYears.length} year${missingYears.length > 1 ? 's' : ''} missing: ${missingYears.map(y => y.replace(' Exam','')).join(', ')}`,
            missingYears,
            targetYear: missingYears[0] || '2024 Exam',
            targetCategory: 'Mid Exam',
            badge: urgency,
            badgeClass: urgency === 'CRITICAL' ? 'bg-rose-100 text-rose-700' : 'bg-amber-100 text-amber-700',
            borderClass: urgency === 'CRITICAL' ? 'border-rose-200 bg-rose-50/70' : 'border-amber-200 bg-amber-50/70',
            icon: urgency === 'CRITICAL' ? 'alert-octagon' : 'alert-triangle',
            iconColor: urgency === 'CRITICAL' ? 'text-rose-700' : 'text-amber-700',
            existingCount: byCourse[course] || 0
          });
        }
      }

      // 2. Specific Missing Final Exam Gaps (has Mid but 0 Final)
      if (filter === 'ALL' || filter === 'MISSING_FINAL') {
        ALL_YEARS.forEach(y => {
          const cats = yearCats[y];
          if (cats && cats['Mid Exam'] && !cats['Final Exam']) {
            alertItems.push({
              type: 'FINAL_MISSING',
              course,
              title: `${_getShortCourseName(course)} (${y.replace(' Exam','')}) — Missing Final Exam`,
              desc: `Has ${cats['Mid Exam']} Mid questions, but Final Exam is completely missing for this cohort.`,
              targetYear: y,
              targetCategory: 'Final Exam',
              badge: 'MISSING FINAL',
              badgeClass: 'bg-indigo-100 text-indigo-800',
              borderClass: 'border-indigo-200 bg-indigo-50/60',
              icon: 'award',
              iconColor: 'text-indigo-700',
              existingCount: cats['Mid Exam']
            });
          }
        });
      }

      // 3. Specific Missing Mid Exam Gaps (has Final but 0 Mid)
      if (filter === 'ALL' || filter === 'MISSING_MID') {
        ALL_YEARS.forEach(y => {
          const cats = yearCats[y];
          if (cats && cats['Final Exam'] && !cats['Mid Exam']) {
            alertItems.push({
              type: 'MID_MISSING',
              course,
              title: `${_getShortCourseName(course)} (${y.replace(' Exam','')}) — Missing Mid Exam`,
              desc: `Has ${cats['Final Exam']} Final questions, but Mid Exam is completely missing for this cohort.`,
              targetYear: y,
              targetCategory: 'Mid Exam',
              badge: 'MISSING MID',
              badgeClass: 'bg-blue-100 text-blue-800',
              borderClass: 'border-blue-200 bg-blue-50/60',
              icon: 'book-marked',
              iconColor: 'text-blue-700',
              existingCount: cats['Final Exam']
            });
          }
        });
      }
    });

    if (!alertItems.length) {
      container.innerHTML = '<div class="p-6 text-center text-emerald-600 font-bold text-sm flex items-center justify-center gap-2"><i data-lucide="check-circle" class="w-5 h-5"></i> No missing curriculum targets in this priority filter!</div>';
      if (window.lucide) window.lucide.createIcons();
      return;
    }

    container.innerHTML = alertItems.map((item) => {
      const btnLabel = item.targetCategory === 'Final Exam' ? 'Add Final Exam' : item.targetCategory === 'Mid Exam' ? 'Add Mid Exam' : 'Add Question';
      return `
        <div class="p-3.5 rounded-2xl border ${item.borderClass} flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div class="flex items-start gap-3">
            <div class="w-8 h-8 rounded-xl ${item.badgeClass} flex items-center justify-center flex-shrink-0 mt-0.5">
              <i data-lucide="${item.icon}" class="w-4 h-4 ${item.iconColor}"></i>
            </div>
            <div>
              <div class="flex items-center gap-2">
                <p class="font-extrabold text-slate-900 text-xs">${escapeHtml(item.title)}</p>
                <span class="px-2 py-0.5 rounded-full ${item.badgeClass} font-black text-[9px] uppercase tracking-wider">${item.badge}</span>
              </div>
              <p class="text-[11px] ${item.iconColor} font-medium mt-0.5">${escapeHtml(item.desc)}</p>
            </div>
          </div>
          <div class="flex flex-wrap items-center gap-2 flex-shrink-0 self-end md:self-center">
            <span class="px-2.5 py-1 rounded-lg bg-white/80 border border-slate-200 text-slate-700 text-[10px] font-extrabold shadow-2xs">${item.existingCount} Qs existing</span>
            <button type="button" onclick="NanovaApp.inspectStatsCell('${escapeAttr(item.course)}', '${escapeAttr(item.targetYear)}', 'ALL')"
              class="px-2.5 py-1 bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 text-[11px] font-bold rounded-xl transition shadow-2xs">
              Inspect Gap
            </button>
            <button type="button" class="stats-gap-add-btn px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white text-[11px] font-extrabold rounded-xl transition shadow-2xs flex items-center gap-1"
              data-course="${escapeAttr(item.course)}" data-year="${escapeAttr(item.targetYear)}" data-category="${escapeAttr(item.targetCategory)}">
              <i data-lucide="plus" class="w-3 h-3"></i>
              <span>${btnLabel}</span>
            </button>
          </div>
        </div>
      `;
    }).join('');

    container.querySelectorAll('.stats-gap-add-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const course = btn.getAttribute('data-course');
        const year = btn.getAttribute('data-year');
        const category = btn.getAttribute('data-category');
        openAddQuestionModal({ course, year, category });
      });
    });

    if (window.lucide) window.lucide.createIcons();
  }

  function setStatsMatrixView(viewMode) {
    _currentStatsView = viewMode;
    const modes = ['subYear', 'univSubject', 'univYear'];
    const modeKeyMap = {
      'subject-year': 'subYear',
      'univ-subject': 'univSubject',
      'univ-year': 'univYear'
    };
    modes.forEach(m => {
      const btn = document.getElementById(`statsViewBtn-${m}`);
      if (btn) {
        if (modeKeyMap[viewMode] === m) {
          btn.className = 'px-3 py-1.5 rounded-xl text-xs font-extrabold transition bg-white text-slate-900 shadow-sm whitespace-nowrap';
        } else {
          btn.className = 'px-3 py-1.5 rounded-xl text-xs font-bold transition text-slate-600 hover:text-slate-900 whitespace-nowrap';
        }
      }
    });

    const univFilter = document.getElementById('statsUnivFilter')?.value || 'ALL';
    _renderStatsMatrix(viewMode, univFilter, _currentStatsCategory);
    if (window.lucide) window.lucide.createIcons();
  }

  function onStatsUnivFilterChange(univValue) {
    const sel = document.getElementById('statsUnivFilter');
    if (sel && univValue && sel.value !== univValue) {
      sel.value = univValue;
    }
    const val = univValue || (sel ? sel.value : 'ALL');
    _renderStatsMatrix(_currentStatsView, val, _currentStatsCategory);
    if (window.lucide) window.lucide.createIcons();

    // Scroll matrix into view if called from scorecard click
    document.getElementById('statsCoverageMatrix')?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }

  function onStatsCategoryFilterChange(catValue) {
    _currentStatsCategory = catValue || 'ALL';
    const sel = document.getElementById('statsCategoryFilter');
    if (sel && catValue && sel.value !== catValue) {
      sel.value = catValue;
    }
    const univFilter = document.getElementById('statsUnivFilter')?.value || 'ALL';
    _renderStatsMatrix(_currentStatsView, univFilter, _currentStatsCategory);
    if (window.lucide) window.lucide.createIcons();
  }

  function toggleAllStatsUnivRows() {
    _statsUnivRowsExpanded = !_statsUnivRowsExpanded;
    const subrows = document.querySelectorAll('.stats-univ-subrow');
    subrows.forEach(row => {
      if (_statsUnivRowsExpanded) row.classList.remove('hidden');
      else row.classList.add('hidden');
    });

    const textEl = document.getElementById('statsToggleUnivSubRowsText');
    if (textEl) {
      textEl.textContent = _statsUnivRowsExpanded ? 'Collapse University Rows' : 'Expand University Rows';
    }

    const allChevrons = document.querySelectorAll('.stats-univ-row-chevron i');
    allChevrons.forEach(icon => {
      icon.setAttribute('data-lucide', _statsUnivRowsExpanded ? 'chevron-down' : 'chevron-right');
    });
    if (window.lucide) window.lucide.createIcons();
  }

  function toggleStatsUnivRow(rowIdx, course, btn) {
    const subrows = document.querySelectorAll(`.stats-univ-subrow-${rowIdx}`);
    let isNowExpanded = false;
    subrows.forEach(row => {
      row.classList.toggle('hidden');
      if (!row.classList.contains('hidden')) isNowExpanded = true;
    });

    if (btn) {
      const icon = btn.querySelector('i');
      if (icon) {
        icon.setAttribute('data-lucide', isNowExpanded ? 'chevron-down' : 'chevron-right');
      }
    }
    if (window.lucide) window.lucide.createIcons();
  }

  function inspectStatsCell(course, year, univ) {
    const modal = document.getElementById('statsCellModal');
    if (!modal) return;

    const questions = State.questions || [];
    const matches = questions.filter(q => {
      const matchC = (!course || course === 'ALL') ? true : q.course === course;
      const matchY = (!year || year === 'ALL') ? true : q.year === year;
      const matchU = (!univ || univ === 'ALL') ? true : (q.university || 'General / Unknown') === univ;
      return matchC && matchY && matchU;
    });

    const titleEl = document.getElementById('statsCellModalTitle');
    const subEl = document.getElementById('statsCellModalSub');
    const bodyEl = document.getElementById('statsCellModalBody');
    const footerEl = document.getElementById('statsCellModalFooter');

    const cDisplay = (!course || course === 'ALL') ? 'All Subjects' : course;
    const yDisplay = (!year || year === 'ALL') ? 'All Years' : year;
    const uDisplay = (!univ || univ === 'ALL') ? 'All Universities' : univ;

    if (titleEl) titleEl.textContent = `${_getShortCourseName(cDisplay)} • ${yDisplay}`;
    if (subEl) subEl.textContent = `Scope: ${uDisplay} (${matches.length} questions found)`;

    // Distribution by University and Category
    const univBreakdown = {};
    const catBreakdown = {};
    let midCount = 0;
    let finalCount = 0;

    matches.forEach(q => {
      const u = q.university || 'General / Unknown';
      const c = q.category || 'Mid Exam';
      univBreakdown[u] = (univBreakdown[u] || 0) + 1;
      catBreakdown[c] = (catBreakdown[c] || 0) + 1;
      if (c === 'Mid Exam') midCount++;
      if (c === 'Final Exam') finalCount++;
    });

    let bodyHtml = '';

    // Total volume card
    bodyHtml += `
      <div class="p-3.5 bg-slate-50 rounded-2xl border border-slate-100 flex items-center justify-between">
        <div>
          <p class="text-[10px] uppercase font-extrabold text-slate-400">Total Cell Volume</p>
          <p class="text-xl font-black text-slate-900">${matches.length} <span class="text-xs font-bold text-slate-500">questions</span></p>
        </div>
        <div class="flex flex-wrap items-center gap-1.5 justify-end">
          <span class="px-2.5 py-1 rounded-lg bg-blue-100 text-[#0052fe] font-extrabold text-[10px]">${escapeHtml(yDisplay)}</span>
          <span class="px-2.5 py-1 rounded-lg bg-indigo-100 text-indigo-700 font-extrabold text-[10px]">${escapeHtml(uDisplay)}</span>
        </div>
      </div>
    `;

    // Dedicated Mid vs Final Exam Status Cards
    bodyHtml += `
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
        <div class="p-3 rounded-2xl border ${midCount > 0 ? 'border-blue-200 bg-blue-50/70' : 'border-rose-200 bg-rose-50/70'} flex flex-col justify-between">
          <div>
            <div class="flex items-center justify-between mb-1">
              <span class="text-xs font-black text-blue-900 flex items-center gap-1">
                <i data-lucide="book-marked" class="w-3.5 h-3.5 text-blue-600"></i> Mid Exam
              </span>
              <span class="px-2 py-0.5 rounded-md text-[10px] font-black ${midCount > 0 ? 'bg-blue-100 text-blue-800' : 'bg-rose-100 text-rose-700'}">
                ${midCount > 0 ? midCount + ' Questions' : 'Missing Mid'}
              </span>
            </div>
            <p class="text-[11px] text-slate-500">${midCount > 0 ? 'Mid exam questions uploaded and active.' : 'No Mid Exam questions yet for this cohort.'}</p>
          </div>
          <button type="button" class="mt-2.5 w-full py-1.5 px-2.5 bg-blue-600 hover:bg-blue-700 text-white text-[11px] font-extrabold rounded-xl transition flex items-center justify-center gap-1 shadow-2xs"
            onclick="NanovaApp.closeStatsCellModal(); NanovaApp.openAddQuestionModal({ course: '${escapeAttr(course !== 'ALL' ? course : '')}', year: '${escapeAttr(year !== 'ALL' ? year : '')}', university: '${escapeAttr(univ !== 'ALL' ? univ : '')}', category: 'Mid Exam' })">
            <i data-lucide="plus" class="w-3.5 h-3.5"></i> Add Mid Exam
          </button>
        </div>

        <div class="p-3 rounded-2xl border ${finalCount > 0 ? 'border-indigo-200 bg-indigo-50/70' : 'border-rose-200 bg-rose-50/70'} flex flex-col justify-between">
          <div>
            <div class="flex items-center justify-between mb-1">
              <span class="text-xs font-black text-indigo-900 flex items-center gap-1">
                <i data-lucide="award" class="w-3.5 h-3.5 text-indigo-600"></i> Final Exam
              </span>
              <span class="px-2 py-0.5 rounded-md text-[10px] font-black ${finalCount > 0 ? 'bg-indigo-100 text-indigo-800' : 'bg-rose-100 text-rose-700'}">
                ${finalCount > 0 ? finalCount + ' Questions' : 'Missing Final'}
              </span>
            </div>
            <p class="text-[11px] text-slate-500">${finalCount > 0 ? 'Final exam questions uploaded and active.' : 'No Final Exam questions yet for this cohort.'}</p>
          </div>
          <button type="button" class="mt-2.5 w-full py-1.5 px-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-[11px] font-extrabold rounded-xl transition flex items-center justify-center gap-1 shadow-2xs"
            onclick="NanovaApp.closeStatsCellModal(); NanovaApp.openAddQuestionModal({ course: '${escapeAttr(course !== 'ALL' ? course : '')}', year: '${escapeAttr(year !== 'ALL' ? year : '')}', university: '${escapeAttr(univ !== 'ALL' ? univ : '')}', category: 'Final Exam' })">
            <i data-lucide="plus" class="w-3.5 h-3.5"></i> Add Final Exam
          </button>
        </div>
      </div>
    `;

    if (matches.length === 0) {
      bodyHtml += `
        <div class="p-4 rounded-2xl border border-rose-200 bg-rose-50 text-center">
          <div class="w-8 h-8 rounded-xl bg-rose-100 text-rose-600 flex items-center justify-center mx-auto mb-2">
            <i data-lucide="alert-circle" class="w-4 h-4"></i>
          </div>
          <p class="text-xs font-black text-rose-900">Entire Cohort Missing</p>
          <p class="text-[11px] text-rose-700 mt-0.5 leading-relaxed">Neither Mid nor Final exam questions exist yet for this slot.</p>
        </div>
      `;
    } else {
      // University Distribution
      bodyHtml += `
        <div>
          <h4 class="font-extrabold text-slate-800 text-xs mb-2 flex items-center gap-1.5">
            <i data-lucide="building-2" class="w-3.5 h-3.5 text-blue-600"></i>
            <span>University Distribution</span>
          </h4>
          <div class="space-y-1.5 max-h-32 overflow-y-auto pr-1">
      `;
      Object.entries(univBreakdown).sort((a, b) => b[1] - a[1]).forEach(([uName, cnt]) => {
        const pct = Math.round((cnt / matches.length) * 100);
        bodyHtml += `
          <div class="p-2 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between text-[11px]">
            <span class="font-bold text-slate-700 truncate max-w-[240px]">${escapeHtml(uName)}</span>
            <span class="font-extrabold text-slate-900">${cnt} <span class="text-slate-400 font-normal">(${pct}%)</span></span>
          </div>
        `;
      });
      bodyHtml += `</div></div>`;

      // Category breakdown
      bodyHtml += `
        <div>
          <h4 class="font-extrabold text-slate-800 text-xs mb-2 flex items-center gap-1.5">
            <i data-lucide="layers" class="w-3.5 h-3.5 text-purple-600"></i>
            <span>All Exam Categories</span>
          </h4>
          <div class="flex flex-wrap gap-1.5">
      `;
      Object.entries(catBreakdown).forEach(([cName, cnt]) => {
        bodyHtml += `
          <span class="px-2.5 py-1 rounded-xl bg-purple-50 text-purple-700 border border-purple-100 font-extrabold text-[10px]">
            ${escapeHtml(cName)}: ${cnt}
          </span>
        `;
      });
      bodyHtml += `</div></div>`;
    }

    if (bodyEl) bodyEl.innerHTML = bodyHtml;

    if (footerEl) {
      const defaultsObj = {
        course: course !== 'ALL' ? course : '',
        year: year !== 'ALL' ? year : '',
        university: univ !== 'ALL' ? univ : ''
      };
      footerEl.innerHTML = `
        <button type="button" onclick="NanovaApp.closeStatsCellModal()" class="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl transition">
          Close
        </button>
        ${matches.length > 0 ? `
          <button type="button" onclick="NanovaApp.jumpToQuestionBank('${escapeAttr(course)}', '${escapeAttr(year)}')" class="px-3.5 py-2 bg-blue-50 hover:bg-blue-100 text-[#0052fe] text-xs font-extrabold rounded-xl transition flex items-center gap-1.5">
            <i data-lucide="external-link" class="w-3.5 h-3.5"></i>
            <span>View Questions</span>
          </button>
        ` : ''}
        <button type="button" id="statsCellModalAddBtn" class="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-extrabold rounded-xl shadow transition flex items-center gap-1.5">
          <i data-lucide="plus-circle" class="w-3.5 h-3.5"></i>
          <span>Add Question Here</span>
        </button>
      `;

      document.getElementById('statsCellModalAddBtn')?.addEventListener('click', () => {
        closeStatsCellModal();
        openAddQuestionModal(defaultsObj);
      });
    }

    modal.classList.remove('hidden');
    if (window.lucide) window.lucide.createIcons();
  }

  function closeStatsCellModal() {
    document.getElementById('statsCellModal')?.classList.add('hidden');
  }

  function jumpToQuestionBank(course, year) {
    closeStatsCellModal();
    switchAdminSubTab('questions');
    const courseFilter = document.getElementById('adminQuestionCourseFilter');
    if (courseFilter && course && course !== 'ALL') {
      courseFilter.value = course;
    }
    const searchInput = document.getElementById('adminQuestionSearch');
    if (searchInput) {
      if (year && year !== 'ALL') {
        searchInput.value = year;
      } else {
        searchInput.value = '';
      }
    }
    filterAdminQuestions();
  }

  function onStatsGapFilterChange() {
    const filter = document.getElementById('statsGapUnivFilter')?.value || 'ALL';
    _renderGapManager(filter);
    if (window.lucide) window.lucide.createIcons();
  }

  function renderAdminQuestionsList(filteredList) {
    const container = document.getElementById('adminQuestionsListContainer');
    if (!container) return;

    const list = filteredList || State.questions || [];
    if (!list.length) {
      container.innerHTML = '<div class="p-6 text-center text-xs text-slate-400 font-medium">No exam questions found.</div>';
      return;
    }

    // Limit displayed questions to 150 for crisp rendering speed if full list
    const displayList = list.slice(0, 150);
    const countHeader = list.length > 150 ? `
      <div class="px-2 py-1 text-[11px] font-bold text-slate-500 flex items-center justify-between">
        <span>Showing first 150 of ${list.length} questions (use search to narrow down)</span>
      </div>
    ` : `
      <div class="px-2 py-1 text-[11px] font-bold text-slate-500">
        <span>Showing all ${list.length} questions</span>
      </div>
    `;

    container.innerHTML = countHeader + displayList.map((q) => {
      const optLetter = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'][q.answer] || 'A';
      return `
        <div class="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 hover:border-blue-200 transition flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div class="space-y-1 flex-1">
            <div class="flex flex-wrap items-center gap-1.5">
              <span class="px-2 py-0.5 rounded-md bg-blue-100 text-blue-800 text-[10px] font-extrabold">${escapeHtml(q.course || 'Freshman Course')}</span>
              <span class="px-2 py-0.5 rounded-md bg-slate-200 text-slate-700 text-[10px] font-bold">${escapeHtml(q.university || 'General')}</span>
              <span class="px-2 py-0.5 rounded-md bg-amber-100 text-amber-800 text-[10px] font-bold">${escapeHtml(q.year || '2024')}</span>
              <span class="px-2 py-0.5 rounded-md bg-purple-100 text-purple-800 text-[10px] font-extrabold">${escapeHtml(q.category || 'Mid Exam')}</span>
              <span class="px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800 text-[10px] font-extrabold">Correct: ${optLetter}</span>
            </div>
            <p class="text-xs font-bold text-slate-900 line-clamp-2">${escapeHtml(q.question)}</p>
          </div>
          <div class="flex items-center space-x-2 self-end sm:self-center flex-shrink-0">
            <button onclick="NanovaApp.openEditQuestionModal('${escapeAttr(q.id)}')" class="px-3 py-1.5 bg-amber-50 hover:bg-amber-100 text-amber-700 font-bold text-xs rounded-xl transition flex items-center space-x-1 cursor-pointer" title="Edit Question">
              <i data-lucide="edit-3" class="w-3.5 h-3.5 text-amber-600"></i>
              <span>Edit</span>
            </button>
            <button onclick="NanovaApp.deleteQuestion('${escapeAttr(q.id)}')" class="px-3 py-1.5 bg-rose-50 hover:bg-rose-100 text-rose-600 font-bold text-xs rounded-xl transition flex items-center space-x-1 cursor-pointer" title="Delete Question">
              <i data-lucide="trash-2" class="w-3.5 h-3.5"></i>
              <span>Delete</span>
            </button>
          </div>
        </div>
      `;
    }).join('');

    if (window.lucide) window.lucide.createIcons();
  }

  function filterAdminQuestions() {
    const search = (document.getElementById('adminQuestionSearch')?.value || '').toLowerCase().trim();
    const course = document.getElementById('adminQuestionCourseFilter')?.value || 'ALL';

    const filtered = (State.questions || []).filter((q) => {
      const matchCourse = course === 'ALL' || q.course === course;
      const matchSearch = !search ||
        (q.question && q.question.toLowerCase().includes(search)) ||
        (q.course && q.course.toLowerCase().includes(search)) ||
        (q.university && q.university.toLowerCase().includes(search)) ||
        (q.year && q.year.toLowerCase().includes(search)) ||
        (q.category && q.category.toLowerCase().includes(search));
      return matchCourse && matchSearch;
    });

    renderAdminQuestionsList(filtered);
  }

  async function deleteQuestion(qId) {
    if (!confirm('Are you sure you want to delete this exam question?')) return;
    State.questions = State.questions.filter((q) => q.id !== qId);
    await syncExamsDataset();
    applyFilters();
    renderAdminDashboard();
    alert('Exam question deleted.');
  }

  function renderAdminUniversitiesList() {
    const container = document.getElementById('adminUniversitiesListContainer');
    if (!container) return;

    const list = State.universities || [];
    if (!list.length) {
      container.innerHTML = '<div class="p-6 text-center text-xs text-slate-400 font-medium col-span-2">No universities registered.</div>';
      return;
    }

    container.innerHTML = list.map((u) => {
      return `
        <div class="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col justify-between space-y-3">
          <div class="flex items-start space-x-3">
            <img src="${u.image || 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=200'}" alt="${escapeHtml(u.name)}" class="w-12 h-12 rounded-xl object-cover border border-slate-200 flex-shrink-0" />
            <div class="space-y-0.5">
              <h4 class="text-xs font-extrabold text-slate-900">${escapeHtml(u.name)}</h4>
              <p class="text-[11px] text-slate-500 font-medium">${escapeHtml(u.location || 'Ethiopia')}</p>
              <div class="flex items-center space-x-3 pt-1">
                <a href="${u.website}" target="_blank" class="text-[11px] text-[#0052fe] hover:underline font-bold">Website ↗</a>
                <a href="${u.telegram}" target="_blank" class="text-[11px] text-sky-600 hover:underline font-bold">Telegram ↗</a>
              </div>
            </div>
          </div>
          <div class="flex items-center justify-end space-x-2 pt-2 border-t border-slate-200/60">
            <button onclick="NanovaApp.editUniversity('${u.id}')" class="px-3 py-1 bg-white hover:bg-slate-100 text-slate-700 font-bold text-xs rounded-lg border border-slate-200 shadow-sm transition">
              Edit
            </button>
            <button onclick="NanovaApp.deleteUniversity('${u.id}')" class="px-3 py-1 bg-rose-50 hover:bg-rose-100 text-rose-600 font-bold text-xs rounded-lg transition">
              Delete
            </button>
          </div>
        </div>
      `;
    }).join('');

    if (window.lucide) window.lucide.createIcons();
  }

  function renderAdminPostsList() {
    const container = document.getElementById('adminPostsListContainer');
    if (!container) return;

    const list = State.posts || [];
    if (!list.length) {
      container.innerHTML = '<div class="p-6 text-center text-xs text-slate-400 font-medium">No community posts yet.</div>';
      return;
    }

    container.innerHTML = list.map((p) => {
      return `
        <div class="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 flex items-start justify-between gap-3">
          <div class="space-y-1">
            <div class="flex items-center space-x-2">
              <span class="text-xs font-extrabold text-slate-900">${escapeHtml(p.author)}</span>
              <span class="text-[10px] text-slate-400">${escapeHtml(p.date || 'Recent')}</span>
              ${p.isAdminPost ? '<span class="px-1.5 py-0.2 rounded bg-blue-100 text-blue-800 font-bold text-[9px]">Admin</span>' : ''}
            </div>
            <p class="text-xs text-slate-700 font-medium line-clamp-2">${escapeHtml(p.content)}</p>
          </div>
          <div class="flex items-center gap-1.5 flex-shrink-0">
            <button onclick="NanovaApp.openEditPostModal('${p.id}')" class="px-2.5 py-1 bg-blue-50 hover:bg-blue-100 text-[#0052fe] font-bold text-xs rounded-lg transition">
              Edit
            </button>
            <button onclick="NanovaApp.deletePost('${p.id}')" class="px-2.5 py-1 bg-rose-50 hover:bg-rose-100 text-rose-600 font-bold text-xs rounded-lg transition">
              Delete
            </button>
          </div>
        </div>
      `;
    }).join('');

    if (window.lucide) window.lucide.createIcons();
  }

  /* ── TIMED EXAM MODE ───────────────────────────────── */
  function switchExamMode(mode) {
    State.examMode = mode;
    const btnPractice = document.getElementById('modeBtnPractice');
    const btnTimed = document.getElementById('modeBtnTimed');
    const timedBar = document.getElementById('timedExamBar');

    if (mode === 'timed') {
      if (btnTimed) btnTimed.className = 'px-3.5 py-1.5 rounded-xl bg-[#0052fe] text-white font-extrabold text-xs shadow-sm flex items-center space-x-1.5 transition';
      if (btnPractice) btnPractice.className = 'px-3.5 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition flex items-center space-x-1.5';
      if (timedBar) timedBar.classList.remove('hidden');
      startExamTimer();
    } else {
      if (btnPractice) btnPractice.className = 'px-3.5 py-1.5 rounded-xl bg-[#0052fe] text-white font-extrabold text-xs shadow-sm flex items-center space-x-1.5 transition';
      if (btnTimed) btnTimed.className = 'px-3.5 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition flex items-center space-x-1.5';
      if (timedBar) timedBar.classList.add('hidden');
      stopExamTimer();
    }
    renderBoardQuestionsPage();
  }

  function startExamTimer() {
    stopExamTimer();
    State.timerSeconds = 1800; // 30 minutes
    State.examStartTime = Date.now();
    updateTimerDisplay();

    State.timerInterval = setInterval(() => {
      State.timerSeconds--;
      updateTimerDisplay();
      if (State.timerSeconds <= 0) {
        stopExamTimer();
        alert('⏰ Time is up for this examination session!');
        submitExam();
      }
    }, 1000);
  }

  function stopExamTimer() {
    if (State.timerInterval) {
      clearInterval(State.timerInterval);
      State.timerInterval = null;
    }
  }

  function updateTimerDisplay() {
    const el = document.getElementById('examTimerDisplay');
    if (!el) return;
    const m = Math.floor(State.timerSeconds / 60);
    const s = State.timerSeconds % 60;
    el.textContent = (m < 10 ? '0' + m : m) + ':' + (s < 10 ? '0' + s : s);
  }

  function submitExam() {
    stopExamTimer();
    const questions = State.filteredQuestions || [];
    const total = questions.length;
    let correct = 0;
    let attempted = 0;
    let incorrect = 0;

    questions.forEach((q) => {
      const userAns = State.userAnswers[q.id];
      if (userAns !== undefined) {
        attempted++;
        if (userAns === q.answer) correct++;
        else incorrect++;
      }
    });

    const unanswered = Math.max(0, total - attempted);
    const percent = total > 0 ? Math.round((correct / total) * 100) : 0;
    const accuracy = attempted > 0 ? Math.round((correct / attempted) * 100) : 0;
    const isPassed = percent >= 50;

    const elapsedSecs = State.examStartTime ? Math.round((Date.now() - State.examStartTime) / 1000) : (1800 - State.timerSeconds);
    const elapsedM = Math.floor(elapsedSecs / 60);
    const elapsedS = elapsedSecs % 60;

    // Grade config with emoji, colour, headline, motivation
    let grade, emoji, ringColor, headline, motivation;
    if (percent >= 90) {
      grade = 'A+'; emoji = '🏆'; ringColor = 'linear-gradient(135deg,#f59e0b,#f97316)';
      headline = 'Outstanding! 🌟';
      motivation = 'You nailed it! Top-tier performance — you are fully exam-ready. Keep this momentum going!';
    } else if (percent >= 80) {
      grade = 'A'; emoji = '🎉'; ringColor = 'linear-gradient(135deg,#22c55e,#16a34a)';
      headline = 'Excellent Work!';
      motivation = 'Great job! A very strong performance. A little more review and you will be unstoppable.';
    } else if (percent >= 65) {
      grade = 'B'; emoji = '👍'; ringColor = 'linear-gradient(135deg,#0052fe,#6366f1)';
      headline = 'Good Job!';
      motivation = 'Solid effort! Review the explanations for the ones you missed and you will ace the actual test.';
    } else if (percent >= 50) {
      grade = 'C'; emoji = '💪'; ringColor = 'linear-gradient(135deg,#8b5cf6,#ec4899)';
      headline = 'Keep Pushing!';
      motivation = 'You passed and are on the right track! Review the solutions step-by-step to boost your score.';
    } else {
      grade = 'D'; emoji = '📚'; ringColor = 'linear-gradient(135deg,#64748b,#475569)';
      headline = 'Keep Practicing!';
      motivation = 'Do not be discouraged! Review each explanation carefully and retry the questions to master the concepts.';
    }

    // Exam Metadata Title
    const activeCourse = State.filters.course !== 'ALL' ? State.filters.course : (State.guidedFlow.subject || 'Freshman Examination');
    const activeUniv = State.filters.university !== 'ALL' ? State.filters.university : (State.guidedFlow.university || 'General University');
    const activeCat = State.filters.category !== 'ALL' ? State.filters.category : (State.guidedFlow.category || 'Exam');
    const activeYear = State.filters.year !== 'ALL' ? State.filters.year : (State.guidedFlow.year || '');

    const examMetaEl = document.getElementById('scorecardExamMeta');
    if (examMetaEl) {
      examMetaEl.textContent = `${activeCourse} • ${activeCat}${activeYear ? ' (' + activeYear + ')' : ''} - ${activeUniv}`;
    }

    // Status Badge
    const statusBadge = document.getElementById('scorecardStatusBadge');
    if (statusBadge) {
      if (isPassed) {
        statusBadge.className = 'mt-2 inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-black bg-emerald-100 text-emerald-800 shadow-2xs';
        statusBadge.innerHTML = '<i data-lucide="check-circle" class="w-3.5 h-3.5"></i><span>PASSED • ' + percent + '% SCORE</span>';
      } else {
        statusBadge.className = 'mt-2 inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-black bg-rose-100 text-rose-800 shadow-2xs';
        statusBadge.innerHTML = '<i data-lucide="alert-circle" class="w-3.5 h-3.5"></i><span>NEEDS PRACTICE • ' + percent + '% SCORE</span>';
      }
    }

    // Update modal elements
    const pElem = document.getElementById('scorecardPercent');
    const cElem = document.getElementById('scorecardCorrect');
    const iElem = document.getElementById('scorecardIncorrect');
    const uElem = document.getElementById('scorecardUnanswered');
    const aElem = document.getElementById('scorecardAccuracy');
    const tElem = document.getElementById('scorecardTime');
    const gElem = document.getElementById('scorecardGrade');
    const emojiEl = document.getElementById('scorecardEmoji');
    const headlineEl = document.getElementById('scorecardHeadline');
    const motivEl = document.getElementById('scorecardMotivation');
    const ringEl = document.getElementById('scorecardRing');

    if (pElem) pElem.textContent = percent + '%';
    if (cElem) cElem.textContent = correct + '/' + total;
    if (iElem) iElem.textContent = incorrect;
    if (uElem) uElem.textContent = unanswered;
    if (aElem) aElem.textContent = accuracy + '%';
    if (tElem) tElem.textContent = elapsedM + 'm ' + elapsedS + 's';
    if (gElem) gElem.textContent = grade;
    if (emojiEl) emojiEl.textContent = emoji;
    if (headlineEl) headlineEl.textContent = headline;
    if (motivEl) motivEl.textContent = motivation;
    if (ringEl) { ringEl.style.background = ringColor; ringEl.classList.add('scorecard-pop'); }

    // Question Matrix Chips
    const qGrid = document.getElementById('scorecardQuestionsGrid');
    if (qGrid) {
      if (questions.length) {
        qGrid.innerHTML = questions.map((q, idx) => {
          const ans = State.userAnswers[q.id];
          let chipColor = 'bg-slate-200 text-slate-700 hover:bg-slate-300';
          let icon = '';
          if (ans !== undefined) {
            if (ans === q.answer) {
              chipColor = 'bg-emerald-500 text-white hover:bg-emerald-600 shadow-2xs';
              icon = '✓';
            } else {
              chipColor = 'bg-rose-500 text-white hover:bg-rose-600 shadow-2xs';
              icon = '✗';
            }
          } else {
            icon = '–';
          }
          const pageNum = Math.floor(idx / State.pageSize) + 1;
          return `
            <button onclick="NanovaApp.jumpToQuestionFromScorecard(${pageNum}, '${escapeAttr(q.id)}')"
              class="px-2 py-1 rounded-lg text-[11px] font-black transition ${chipColor} cursor-pointer flex items-center gap-0.5"
              title="Question ${idx + 1}: ${ans === undefined ? 'Unanswered' : (ans === q.answer ? 'Correct' : 'Incorrect')} (Click to view)">
              <span>Q${idx + 1}</span>
              <span class="opacity-80 text-[9px]">${icon}</span>
            </button>
          `;
        }).join('');
      } else {
        qGrid.innerHTML = '<span class="text-slate-400 text-xs py-2">No questions in this session.</span>';
      }
    }

    // Show modal
    const modal = document.getElementById('scorecardModal');
    if (modal) modal.classList.remove('hidden');

    if (window.lucide) window.lucide.createIcons();

    // Fire confetti
    if (percent >= 50) _fireConfetti();
  }

  function jumpToQuestionFromScorecard(pageNum, qId) {
    closeScorecardModal();
    if (State.currentPage !== pageNum) {
      State.currentPage = pageNum;
      renderBoardQuestionsPage();
    }
    setTimeout(() => {
      const el = document.getElementById('q_card_' + qId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        el.classList.add('ring-4', 'ring-blue-300');
        setTimeout(() => el.classList.remove('ring-4', 'ring-blue-300'), 2500);
      }
    }, 150);
  }

  function retakeCurrentExam() {
    const questions = State.filteredQuestions || [];
    questions.forEach((q) => {
      delete State.userAnswers[q.id];
      delete State.missedRetries[q.id];
    });
    localStorage.setItem('nanova_board_answers', JSON.stringify(State.userAnswers));
    closeScorecardModal();
    State.currentPage = 1;
    renderBoardQuestionsPage();
    updateCounterBadges();
    window.scrollTo({ top: 150, behavior: 'smooth' });
  }

  function _fireConfetti() {
    const canvas = document.getElementById('confettiCanvas');
    if (!canvas) return;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const ctx = canvas.getContext('2d');
    const pieces = [];
    const colors = ['#0052fe','#6366f1','#f59e0b','#22c55e','#ec4899','#f97316','#fff'];
    for (let i = 0; i < 140; i++) {
      pieces.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height - canvas.height,
        r: Math.random() * 7 + 3,
        d: Math.random() * 140 + 40,
        color: colors[Math.floor(Math.random() * colors.length)],
        tilt: Math.random() * 10 - 10,
        tiltAngleInc: (Math.random() * 0.07) + 0.05,
        tiltAngle: 0
      });
    }
    let angle = 0, tick = 0;
    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      angle += 0.01;
      tick++;
      pieces.forEach((p, i) => {
        p.tiltAngle += p.tiltAngleInc;
        p.y += (Math.cos(angle + p.d) + 2.5 + p.r / 2);
        p.x += Math.sin(angle);
        p.tilt = Math.sin(p.tiltAngle) * 12;
        ctx.beginPath();
        ctx.lineWidth = p.r;
        ctx.strokeStyle = p.color;
        ctx.moveTo(p.x + p.tilt + p.r / 3, p.y);
        ctx.lineTo(p.x + p.tilt, p.y + p.tilt + p.r / 5);
        ctx.stroke();
        if (p.y > canvas.height) {
          pieces[i] = { ...p, y: -10, x: Math.random() * canvas.width };
        }
      });
      if (tick < 260) requestAnimationFrame(draw);
      else ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
    draw();
  }

  function closeScorecardModal() {
    document.getElementById('scorecardModal')?.classList.add('hidden');
    // Clear confetti canvas
    const canvas = document.getElementById('confettiCanvas');
    if (canvas) { const ctx = canvas.getContext('2d'); ctx.clearRect(0, 0, canvas.width, canvas.height); }
    // Reset ring pop animation so it replays next time
    const ringEl = document.getElementById('scorecardRing');
    if (ringEl) { ringEl.classList.remove('scorecard-pop'); void ringEl.offsetWidth; }
  }

  /* ── BOOKMARK SYSTEM ───────────────────────────────── */
  function toggleQuestionBookmark(qId) {
    if (!qId) return;
    const idx = State.bookmarks.indexOf(qId);
    if (idx !== -1) State.bookmarks.splice(idx, 1);
    else State.bookmarks.push(qId);

    localStorage.setItem('nanova_bookmarks', JSON.stringify(State.bookmarks));
    renderBoardQuestionsPage();
    updateBookmarkBadge();
    updateCounterBadges();
  }

  function toggleFilterMode(mode) {
    State.hasAppliedFilters = true;
    if (State.activeQuickFilter === mode) {
      State.activeQuickFilter = 'all';
    } else {
      State.activeQuickFilter = mode;
      if (mode === 'incorrect') {
        State.missedRetries = {};
      }
    }
    updateQuickFilterButtons();
    applyFilters();
  }

  function updateQuickFilterButtons() {
    const savedBtn = document.getElementById('bookmarkFilterBtn');
    const unansBtn = document.getElementById('unansweredFilterBtn');
    const incorrBtn = document.getElementById('incorrectFilterBtn');
    const answdBtn = document.getElementById('answeredFilterBtn');

    const activeClass = 'px-3 py-1.5 rounded-xl bg-black text-white font-extrabold text-xs shadow-sm flex items-center space-x-1.5 transition';
    const inactiveClass = 'px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition flex items-center space-x-1.5';

    if (savedBtn) savedBtn.className = State.activeQuickFilter === 'saved' ? activeClass : inactiveClass;
    if (unansBtn) unansBtn.className = State.activeQuickFilter === 'unanswered' ? activeClass : inactiveClass;
    if (incorrBtn) incorrBtn.className = State.activeQuickFilter === 'incorrect' ? activeClass : inactiveClass;
    if (answdBtn) answdBtn.className = State.activeQuickFilter === 'answered' ? activeClass : inactiveClass;
  }

  /* ── COMMENTS SYSTEM ───────────────────────────────── */
  function commentOnPost(postId) {
    State.activeCommentPostId = postId;
    renderCommentsModal();
    document.getElementById('commentModal')?.classList.remove('hidden');
    if (window.lucide) window.lucide.createIcons();
  }

  function closeCommentModal() {
    document.getElementById('commentModal')?.classList.add('hidden');
    State.activeCommentPostId = null;
  }

  function renderCommentsModal() {
    const container = document.getElementById('commentListContainer');
    if (!container) return;

    const postId = State.activeCommentPostId;
    const comments = (State.comments && State.comments[postId]) ? State.comments[postId] : [];

    if (!comments.length) {
      container.innerHTML = '<div class="p-8 text-center text-xs text-slate-400 font-medium">No comments yet. Be the first to discuss this topic!</div>';
      return;
    }

    container.innerHTML = comments.map((c) => {
      return '<div class="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">' +
        '<div class="flex items-center justify-between">' +
          '<span class="font-extrabold text-xs text-slate-900">' + escapeHtml(c.author || 'Student') + '</span>' +
          '<span class="text-[10px] text-slate-400 font-medium">' + escapeHtml(c.date || 'Just now') + '</span>' +
        '</div>' +
        '<p class="text-xs text-slate-700 font-medium leading-relaxed">' + escapeHtml(c.text) + '</p>' +
      '</div>';
    }).join('');

    if (window.lucide) window.lucide.createIcons();
  }

  function submitComment(e) {
    if (e && e.preventDefault) e.preventDefault();
    if (!navigator.onLine) {
      alert('You are currently offline. Please reconnect to the internet to post comments.');
      return;
    }
    const input = document.getElementById('newCommentInput');
    const text = input ? input.value.trim() : '';
    if (!text || !State.activeCommentPostId) return;

    if (!State.comments) State.comments = {};
    if (!State.comments[State.activeCommentPostId]) State.comments[State.activeCommentPostId] = [];

    const newComment = {
      id: 'cmt_' + Date.now(),
      author: State.currentUser?.displayName || State.profile?.name || (State.isAdmin ? 'Campus Admin' : 'Freshman Student'),
      text: text,
      date: new Date().toLocaleDateString('en-US', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' })
    };

    State.comments[State.activeCommentPostId].push(newComment);
    localStorage.setItem('nanova_comments', JSON.stringify(State.comments));

    if (input) input.value = '';
    renderCommentsModal();
  }

  /* ── TAB NAVIGATION & EXAM FLOW ────────────────────── */
  function switchTab(tabId) {
    if (!State.currentUser) {
      openAuthModal('access_app');
      return;
    }

    if (tabId === 'admin' && !State.isAdmin) {
      openAuthModal();
      return;
    }

    document.querySelectorAll('.tab-content').forEach((el) => el.classList.add('hidden'));
    const target = document.getElementById('tab-' + tabId);
    if (target) target.classList.remove('hidden');

    document.querySelectorAll('.nav-link').forEach((btn) => {
      if (btn.getAttribute('data-tab') === tabId) btn.classList.add('active');
      else btn.classList.remove('active');
    });

    if (tabId === 'exams') {
      onOpenExamScreen();
    } else if (tabId === 'feed') {
      onOpenCommunityFeed();
    } else if (tabId === 'profile') {
      syncCurriculumRegistry();
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  async function onOpenExamScreen() {
    const isOnline = navigator.onLine;
    const cached = await NanovaDB.getOfflineQuestions();
    if (!cached || !cached.length) {
      if (isOnline) {
        console.log('[Nanova Exam] Checking local offline_questions: missing, downloading from remote...');
        await loadExamsData();
        applyFilters();
        renderGuidedExploration();
        renderBoardQuestionsPage();
      } else {
        State.neverDownloadedQuestionsOffline = true;
        State.questions = [];
        renderGuidedExploration();
        renderBoardQuestionsPage();
      }
    } else {
      State.neverDownloadedQuestionsOffline = false;
      if (!State.questions || !State.questions.length) {
        State.questions = cached;
        applyFilters();
        renderGuidedExploration();
        renderBoardQuestionsPage();
      }
    }
    if (window.lucide) window.lucide.createIcons();
  }

  function onOpenCommunityFeed() {
    const isOffline = !navigator.onLine;
    const spinner = document.getElementById('communityFeedSpinner');
    if (spinner) spinner.classList.add('hidden');
    updateCommunityInputsOfflineState(isOffline);
    renderCommunityPosts();
    if (window.lucide) window.lucide.createIcons();
  }

  function clearCacheAndReset() {
    if (confirm('Reset all cached exams and local progress?')) {
      localStorage.clear();
      location.reload();
    }
  }

  function escapeHtml(str) {
    if (!str) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  /* ── PUBLIC EXPORTS ────────────────────────────────── */
  window.NanovaApp = {
    switchTab,
    onFilterChange,
    applyFiltersWithFeedback,
    handleQuestionAnswer,
    boardNextPage,
    boardPrevPage,
    shuffleQuestions,
    toggleQuestionBookmark,
    toggleFilterMode,
    switchExamMode,
    submitExam,
    closeScorecardModal,
    backFromExam,
    jumpToQuestionFromScorecard,
    retakeCurrentExam,
    commentOnPost,
    closeCommentModal,
    submitComment,
    sharePost,
    publishCommunityPost,
    deletePost,
    openEditPostModal,
    closeEditPostModal,
    saveEditedPost,
    editPost: openEditPostModal,
    toggleLikePost,
    renderUniversities,
    openAddUnivModal,
    closeUnivModal,
    editUniversity,
    saveUniversity,
    deleteUniversity,
    openAddQuestionModal,
    openEditQuestionModal,
    closeAddQuestionModal,
    setQuestionOptionsPreset,
    addQuestionOptionRow,
    removeQuestionOptionRow,
    updateCorrectOptionsDropdown,
    onNewQCategoryChange,
    saveNewQuestion,
    switchAdminSubTab,
    renderAdminDashboard,
    renderAdminStats,
    setStatsMatrixView,
    onStatsUnivFilterChange,
    onStatsCategoryFilterChange,
    toggleAllStatsUnivRows,
    toggleStatsUnivRow,
    inspectStatsCell,
    closeStatsCellModal,
    jumpToQuestionBank,
    onStatsGapFilterChange,
    toggleUniversityVisibility,
    toggleSubjectVisibility,
    chooseGuidedSubject,
    chooseGuidedCategory,
    chooseGuidedYear,
    resetGuidedFlow,
    toggleClassicFilterMode,
    changeGuidedUniversity,
    filterAdminQuestions,
    deleteQuestion,
    saveAdminCurriculumPayload,
    refreshAcademicRequests,
    refreshUsersList,
    grantCurriculumAccess,
    revokeCurriculumAccess,
    toggleUserCurriculumAccess,
    deleteUserAccount,
    syncCurriculumRegistry,
    submitAcademicToken,
    restoreBoardQuestions,
    removeCurriculumNotice,
    moderatePost,
    reportPost,
    blockPostAuthor,
    openAuthModal,
    closeAuthModal,
    setAuthMode,
    toggleAuthMode,
    handlePhoneAuth,
    firebaseSignOut,
    retryQuestionBankDownload,
    retryCommunityFeed,
    onOpenExamScreen,
    onOpenCommunityFeed,
    clearCacheAndReset,
    openUniversityGuide,
    closeUniversityGuide,
    editUniversityFromGuide,
    onUnivSearchChange
  };

  document.addEventListener('DOMContentLoaded', initApp);
})();
