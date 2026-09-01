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
  let googleProvider = null;

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
      googleProvider = new firebase.auth.GoogleAuthProvider();
      googleProvider.addScope('email');
      googleProvider.addScope('profile');
      googleProvider.setCustomParameters({ prompt: 'select_account' });
      console.log('[Firebase] Initialized with Google Auth Provider for: nanova-st');
    }
  } catch (err) {
    console.warn('[Firebase] Init notice:', err.message);
  }

  /* ── INDEXEDDB PERSISTENCE (OFFLINE EXAM ENGINE) ─── */
  const NanovaDB = {
    dbName: 'NanovaBoardDB_v4',
    version: 4,
    db: null,

    async init() {
      return new Promise((resolve, reject) => {
        const req = indexedDB.open(this.dbName, this.version);
        req.onupgradeneeded = (e) => {
          const db = e.target.result;
          if (!db.objectStoreNames.contains('exams')) db.createObjectStore('exams', { keyPath: 'id' });
          if (!db.objectStoreNames.contains('posts')) db.createObjectStore('posts', { keyPath: 'id' });
          if (!db.objectStoreNames.contains('universities')) db.createObjectStore('universities', { keyPath: 'id' });
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

  /* ── APPLICATION STATE ─────────────────────────────── */
  const State = {
    profile: { name: 'Student', university: 'Haramaya University', stream: 'Natural Science', email: '' },
    currentUser: null,
    isAdmin: false,
    isPaid: false,
    pageSize: 10,
    currentPage: 1,
    paymentSettings: {
      price: 50,
      telebirr: '+251 91 234 5678',
      cbe: '1000234567890 (Commercial Bank of Ethiopia)',
      ebirr: '+251 91 234 5678 (E-Birr)',
      instructions: 'Send 50 ETB via Telebirr, CBE Birr, or E-Birr and confirm to instantly unlock all freshman questions.'
    },
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
    posts: [],
    paymentRequests: [],
    registeredUsers: [],
    activeCommentPostId: null,
    comments: JSON.parse(localStorage.getItem('nanova_comments') || '{}'),
    filters: {
      course: 'ALL',
      university: 'ALL',
      year: 'ALL',
      category: 'ALL'
    },
    hasAppliedFilters: false
  };

  /* ── INITIALIZATION ────────────────────────────────── */
  async function initApp() {
    loadSavedLocalState();
    await NanovaDB.init().catch(console.warn);
    await loadExamsData();
    await loadUniversities();
    await loadPostsFromFirebase();
    await loadPaymentSettingsFromFirebase();
    initFirebaseAuthListener();
    applyFilters();
    updateFilterSummaryText();
    renderUniversities();
    renderCommunityPosts();
    updateAdminUI();
    updateCounterBadges();
    if (window.lucide) window.lucide.createIcons();
    console.log('[Nanova] Engine Initialized with 10-Question Pagination & 3 Payment Options (Telebirr, CBE, E-Birr)');
  }

  function loadSavedLocalState() {
    try {
      const p = localStorage.getItem('nanova_profile');
      if (p) Object.assign(State.profile, JSON.parse(p));
      const ans = localStorage.getItem('nanova_board_answers');
      if (ans) State.userAnswers = JSON.parse(ans);
      const savedPay = localStorage.getItem('nanova_payment_settings');
      if (savedPay) Object.assign(State.paymentSettings, JSON.parse(savedPay));
    } catch {}
    updateProfileUI();
  }

  function updateProfileUI() {
    const btn = document.getElementById('profileAvatarBtn');
    if (btn) {
      if (State.currentUser) {
        const init = State.profile.name ? State.profile.name[0].toUpperCase() : (State.currentUser.email ? State.currentUser.email[0].toUpperCase() : 'U');
        const displayName = State.profile.name || State.currentUser.email?.split('@')[0] || 'User';
        btn.className = 'px-3 py-1.5 rounded-2xl bg-white text-slate-900 font-extrabold text-xs flex items-center space-x-2 border-2 border-white/80 hover:bg-blue-50 transition shadow-lg shadow-blue-900/30';
        btn.innerHTML = `
          <span class="w-6 h-6 rounded-xl bg-blue-100 text-[#0052fe] font-black text-xs flex items-center justify-center">${init}</span>
          <span class="hidden sm:inline font-extrabold text-xs text-slate-800 max-w-[100px] truncate">${escapeHtml(displayName)}</span>
        `;
      } else {
        btn.className = 'px-3.5 py-1.5 rounded-2xl bg-white text-[#0052fe] font-black text-xs flex items-center space-x-1.5 border-2 border-white hover:bg-blue-50 transition shadow-lg shadow-blue-900/30';
        btn.innerHTML = `
          <i data-lucide="user" class="w-4 h-4 text-[#0052fe]"></i>
          <span>Login</span>
        `;
      }
    }

    const profInit = document.getElementById('profileLargeInitial');
    const pName = document.getElementById('profileLargeName');
    const pUniv = document.getElementById('profileLargeUniv');
    if (profInit) profInit.textContent = State.profile.name ? State.profile.name[0].toUpperCase() : 'S';
    if (pName) pName.textContent = State.currentUser ? (State.profile.name || State.currentUser.email?.split('@')[0] || 'Student Account') : 'Guest Student';
    if (pUniv) pUniv.textContent = State.profile.university || 'Haramaya University';

    if (window.lucide) window.lucide.createIcons();
  }

  /* ── FIREBASE AUTHENTICATION FLOWS ─────────────────── */
  let authMode = 'signin';

  function initFirebaseAuthListener() {
    if (!firebaseAuth) return;

    // Handle return from Google redirect sign-in (no popup, no password)
    if (firebaseAuth.getRedirectResult) {
      firebaseAuth.getRedirectResult().catch((err) => {
        if (err && err.code !== 'auth/user-cancelled') {
          console.warn('[Google Redirect]', err.message);
        }
      });
    }

    firebaseAuth.onAuthStateChanged(async (user) => {
      if (user) {
        State.currentUser = user;
        const email = (user.email || '').toLowerCase().trim();
        State.profile.name = user.displayName || email.split('@')[0] || 'Student';
        State.profile.email = email;

        // Admin is determined ONLY by Firebase role field — no emails in source code
        State.isAdmin = false;

        // Synchronize / Listen to User Document in Firebase
        if (firebaseDb) {
          try {
            const userRef = firebaseDb.ref('users/' + user.uid);
            userRef.on('value', (snap) => {
              const uData = snap.val();
              if (uData) {
                State.isAdmin = uData.role === 'admin';
                State.isPaid = State.isAdmin || !!uData.isPaid;
              } else {
                // New user — register as student by default
                userRef.set({
                  uid: user.uid,
                  email: user.email || '',
                  displayName: State.profile.name,
                  role: 'student',
                  isPaid: false,
                  createdAt: Date.now()
                }).catch(console.warn);
                State.isAdmin = false;
                State.isPaid = false;
              }
              updateAdminUI();
              renderBoardQuestionsPage();
            });
          } catch (e) {
            console.warn('[Firebase RTDB User Listener]', e);
          }
        } else {
          State.isPaid = false;
        }

        localStorage.setItem('nanova_profile', JSON.stringify(State.profile));
        updateProfileUI();
        updateAdminUI();
        if (State.isAdmin) {
          loadPaymentRequestsAndUsers();
        }
        console.log('[Firebase Auth] User:', email, '| Admin:', State.isAdmin, '| Paid:', State.isPaid);
      } else {
        State.currentUser = null;
        State.isAdmin = false;
        State.isPaid = false;
        updateProfileUI();
        updateAdminUI();
        renderBoardQuestionsPage();
        console.log('[Firebase Auth] Signed out');
      }
      if (window.lucide) window.lucide.createIcons();
    });
  }

  function openAuthModal() {
    if (State.currentUser) {
      const email = State.currentUser.email || State.profile.email;
      const confirmed = confirm('Signed in as: ' + email + '\n\nWould you like to Sign Out?');
      if (confirmed) {
        firebaseSignOut();
      }
    } else {
      document.getElementById('authModal')?.classList.remove('hidden');
    }
  }

  function closeAuthModal() {
    document.getElementById('authModal')?.classList.add('hidden');
  }

  function toggleAuthMode() {
    authMode = authMode === 'signin' ? 'signup' : 'signin';
    const title = document.getElementById('authModalTitle');
    const submitBtn = document.getElementById('authSubmitBtn');
    const togglePrompt = document.getElementById('authTogglePrompt');
    const toggleBtn = document.getElementById('authToggleBtn');

    if (authMode === 'signup') {
      if (title) title.textContent = 'Create Nanova Account';
      if (submitBtn) submitBtn.textContent = 'Register Account';
      if (togglePrompt) togglePrompt.textContent = 'Already have an account?';
      if (toggleBtn) toggleBtn.textContent = 'Sign In';
    } else {
      if (title) title.textContent = 'Sign In to Nanova';
      if (submitBtn) submitBtn.textContent = 'Sign In';
      if (togglePrompt) togglePrompt.textContent = "Don't have an account?";
      if (toggleBtn) toggleBtn.textContent = 'Create Account';
    }
  }

  async function handleEmailAuth(e) {
    e.preventDefault();
    if (!firebaseAuth) {
      alert('Firebase Auth is initializing, please try again in a moment.');
      return;
    }

    const email = document.getElementById('authEmailInput')?.value.trim();
    const pass = document.getElementById('authPasswordInput')?.value;
    const submitBtn = document.getElementById('authSubmitBtn');

    if (!email || !pass) return;
    if (submitBtn) { submitBtn.textContent = 'Authenticating...'; submitBtn.disabled = true; }

    try {
      if (authMode === 'signup') {
        await firebaseAuth.createUserWithEmailAndPassword(email, pass);
      } else {
        await firebaseAuth.signInWithEmailAndPassword(email, pass);
      }
      closeAuthModal();
    } catch (err) {
      alert('❌ ' + err.message);
    } finally {
      if (submitBtn) {
        submitBtn.textContent = authMode === 'signup' ? 'Register Account' : 'Sign In';
        submitBtn.disabled = false;
      }
    }
  }

  async function handleGoogleSignIn() {
    if (!firebaseAuth || !googleProvider) {
      alert('Google Sign-In is initializing. Please try again.');
      return;
    }
    try {
      await firebaseAuth.signInWithPopup(googleProvider);
      closeAuthModal();
    } catch (err) {
      if (err.code === 'auth/popup-blocked') {
        console.info('[Google Sign-In] Popup blocked, falling back to redirect...');
        await firebaseAuth.signInWithRedirect(googleProvider);
      } else if (err.code === 'auth/operation-not-allowed') {
        alert('Google Sign-In is not enabled in Firebase Console. Go to Firebase Console -> Authentication -> Sign-in method -> Enable Google.');
      } else if (err.code === 'auth/unauthorized-domain') {
        alert('This domain (' + window.location.hostname + ') is not authorized in Firebase. Add it under Firebase Console -> Authentication -> Settings -> Authorized domains.');
      } else if (err.code !== 'auth/popup-closed-by-user' && err.code !== 'auth/cancelled-popup-request') {
        console.error('[Google Sign-In Error]', err);
        alert('Google Sign-In Error: ' + (err.message || err.code));
      }
    }
  }

  async function firebaseSignOut() {
    if (firebaseAuth) {
      await firebaseAuth.signOut();
    }
    State.currentUser = null;
    State.isAdmin = false;
    State.isPaid = false;
    updateAdminUI();
    renderBoardQuestionsPage();
    alert('Logged out of Firebase.');
  }

  /* ── ADMIN UI & ROLE CONTROLS ──────────────────────── */
  function updateAdminUI() {
    const adminNavBtn = document.getElementById('adminNavBtn');
    const composerCard = document.getElementById('composerCard');
    const adminLockedBox = document.getElementById('adminLockedBox');
    const adminUnlockedBox = document.getElementById('adminUnlockedBox');
    const addUnivBtn = document.getElementById('addUnivBtn');
    const addQuestionBtn = document.getElementById('addQuestionBtn');

    if (State.isAdmin) {
      if (adminNavBtn) adminNavBtn.classList.remove('hidden');
      if (composerCard) composerCard.classList.remove('hidden');
      if (adminLockedBox) adminLockedBox.classList.add('hidden');
      if (adminUnlockedBox) adminUnlockedBox.classList.remove('hidden');
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
      if (adminUnlockedBox) adminUnlockedBox.classList.add('hidden');
      if (addUnivBtn) addUnivBtn.classList.add('hidden');
      if (addQuestionBtn) addQuestionBtn.classList.add('hidden');
    }

    const freeNotice = document.getElementById('freeLimitNotice');
    if (freeNotice) {
      if (!State.isPaid && !State.isAdmin) {
        freeNotice.classList.remove('hidden');
      } else {
        freeNotice.classList.add('hidden');
      }
    }

    updateProfileUI();
    if (window.lucide) window.lucide.createIcons();
  }

  /* ── DATA FETCHING (EXAMS STAY ON JSON) ─────────────── */
  async function loadExamsData() {
    try {
      const resp = await fetch('./data/exams.json');
      if (resp.ok) {
        let text = await resp.text();
        if (text.charCodeAt(0) === 0xFEFF) text = text.slice(1);
        const data = JSON.parse(text);

        let allQs = [];
        if (Array.isArray(data)) {
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
        }

        if (allQs.length) {
          State.questions = allQs;
          NanovaDB.saveAll('exams', allQs).catch(console.warn);
        }
      }
    } catch (e) {
      console.warn('[Nanova] JSON fetch error, checking offline DB:', e);
      try {
        const cached = await NanovaDB.getAll('exams');
        if (cached && cached.length) State.questions = cached;
      } catch (err) {
        console.warn('[Nanova] DB error:', err);
      }
    }

    if (!State.questions.length) {
      State.questions = DEFAULT_QUESTIONS;
    }
  }

  async function loadUniversities() {
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
  }

  /* ── COMMUNITY FEED (FIREBASE HANDLED) ─────────────── */
  async function loadPostsFromFirebase() {
    if (firebaseDb) {
      try {
        const postsRef = firebaseDb.ref('posts');
        postsRef.on('value', (snap) => {
          const val = snap.val();
          if (val) {
            State.posts = Object.values(val).sort((a, b) => (b.timestamp || 0) - (a.timestamp || 0));
          } else {
            loadFallbackAnnouncements();
          }
          renderCommunityPosts();
          if (State.isAdmin) renderAdminPostsList();
        });
        return;
      } catch (e) {
        console.warn('[Firebase RTDB Posts]', e);
      }
    }
    await loadFallbackAnnouncements();
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
        }
      } else {
        State.posts = DEFAULT_POSTS;
      }
    } catch {
      State.posts = DEFAULT_POSTS;
    }
    renderCommunityPosts();
  }

  function publishCommunityPost(e) {
    if (e && e.preventDefault) e.preventDefault();
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

  /* ── 3 PAYMENT METHODS CONFIG (TELEBIRR, CBE, E-BIRR) ── */
  async function loadPaymentSettingsFromFirebase() {
    if (firebaseDb) {
      try {
        firebaseDb.ref('settings/payment').on('value', (snap) => {
          const val = snap.val();
          if (val) {
            Object.assign(State.paymentSettings, val);
            localStorage.setItem('nanova_payment_settings', JSON.stringify(State.paymentSettings));
            updatePaywallUI();
          }
        });
      } catch (e) {
        console.warn('[Firebase RTDB Payment Settings]', e);
      }
    }
    updatePaywallUI();
  }

  function saveAdminPaymentSettings(e) {
    if (e && e.preventDefault) e.preventDefault();
    if (!State.isAdmin) {
      alert('Only administrators can update payment configuration.');
      return;
    }

    const telebirr = document.getElementById('adminTelebirrInput')?.value.trim();
    const cbe = document.getElementById('adminCbeInput')?.value.trim();
    const ebirr = document.getElementById('adminEbirrInput')?.value.trim();
    const price = parseInt(document.getElementById('adminPriceInput')?.value || '50', 10);
    const instructions = document.getElementById('adminInstructionsInput')?.value.trim();

    if (!telebirr || !cbe) {
      alert('Please provide Telebirr and CBE accounts.');
      return;
    }

    const settings = {
      telebirr: telebirr || '+251 91 234 5678',
      cbe: cbe || '1000234567890',
      ebirr: ebirr || '+251 91 234 5678',
      price: price || 50,
      instructions: instructions || 'Send payment and confirm to unlock unlimited freshman exam access.'
    };

    State.paymentSettings = settings;
    localStorage.setItem('nanova_payment_settings', JSON.stringify(settings));

    if (firebaseDb) {
      firebaseDb.ref('settings/payment').set(settings).then(() => {
        alert('✅ Payment configuration (Telebirr, CBE & E-Birr) saved to Firebase!');
      }).catch((err) => {
        alert('Saved locally. Firebase error: ' + err.message);
      });
    } else {
      alert('✅ Payment settings saved.');
    }

    updatePaywallUI();
    renderAdminDashboard();
  }

  function updatePaywallUI() {
    const s = State.paymentSettings;
    const tDisplay = document.getElementById('paywallTelebirrDisplay');
    const cDisplay = document.getElementById('paywallCbeDisplay');
    const eDisplay = document.getElementById('paywallEbirrDisplay');

    if (tDisplay) tDisplay.textContent = s.telebirr;
    if (cDisplay) cDisplay.textContent = s.cbe;
    if (eDisplay) eDisplay.textContent = s.ebirr || '+251 91 234 5678';

    const tInput = document.getElementById('adminTelebirrInput');
    const cInput = document.getElementById('adminCbeInput');
    const eInput = document.getElementById('adminEbirrInput');
    const pInput = document.getElementById('adminPriceInput');
    const iInput = document.getElementById('adminInstructionsInput');

    if (tInput) tInput.value = s.telebirr;
    if (cInput) cInput.value = s.cbe;
    if (eInput) eInput.value = s.ebirr || '+251 91 234 5678';
    if (pInput) pInput.value = s.price;
    if (iInput) iInput.value = s.instructions;

    const statPrice = document.getElementById('adminStatPrice');
    if (statPrice) statPrice.textContent = s.price + ' ETB';
  }

  /* ── PAYMENT REQUESTS & USER MANAGEMENT (ADMIN) ────── */
  function verifyPaymentReference(e) {
    if (e && e.preventDefault) e.preventDefault();
    const refInput = document.getElementById('paywallTxRefInput');
    const txRef = (refInput ? refInput.value : '').trim();

    if (!txRef || txRef.length < 3) {
      alert('Please enter a valid Transaction ID or SMS confirmation from Telebirr, CBE, or E-Birr.');
      return;
    }

    if (!State.currentUser) {
      alert('Please sign in or register an account before submitting a payment verification.');
      openAuthModal();
      return;
    }

    const reqId = 'req_' + Date.now();
    const reqData = {
      id: reqId,
      uid: State.currentUser.uid,
      userEmail: State.currentUser.email || State.profile.email,
      userName: State.profile.name || 'Freshman Student',
      txRef: txRef,
      amount: State.paymentSettings.price,
      status: 'pending',
      timestamp: Date.now(),
      dateStr: new Date().toLocaleString()
    };

    if (firebaseDb) {
      firebaseDb.ref('paymentRequests/' + reqId).set(reqData).then(() => {
        firebaseDb.ref('users/' + State.currentUser.uid + '/paymentRequest').set(reqData).catch(console.warn);
        hidePaywallModal();
        alert('✅ Payment Request Submitted to Admin!\n\nTransaction Ref: ' + txRef + '\nThe administrator will verify your transaction and approve your full access shortly.');
      }).catch((err) => {
        alert('Submission error: ' + err.message);
      });
    } else {
      hidePaywallModal();
      alert('✅ Payment verification recorded. The campus admin will review it.');
    }
  }

  function loadPaymentRequestsAndUsers() {
    if (!firebaseDb || !State.isAdmin) return;

    // Load Payment Requests
    firebaseDb.ref('paymentRequests').on('value', (snap) => {
      const val = snap.val();
      State.paymentRequests = val ? Object.values(val).sort((a, b) => (b.timestamp || 0) - (a.timestamp || 0)) : [];
      renderAdminPaymentRequests();

      const pending = State.paymentRequests.filter((r) => r.status === 'pending').length;
      const statP = document.getElementById('adminStatPendingRequests');
      const badge = document.getElementById('pendingRequestsBadge');
      if (statP) statP.textContent = pending;
      if (badge) {
        badge.textContent = pending;
        if (pending > 0) badge.classList.remove('hidden');
        else badge.classList.add('hidden');
      }
    });

    // Load Users
    firebaseDb.ref('users').on('value', (snap) => {
      const val = snap.val();
      State.registeredUsers = val ? Object.values(val) : [];
      renderAdminUsersList();
    });
  }

  function renderAdminPaymentRequests() {
    const container = document.getElementById('adminPaymentRequestsList');
    if (!container) return;

    if (!State.paymentRequests.length) {
      container.innerHTML = '<div class="p-6 text-center text-xs text-slate-400 font-medium">No payment verification requests submitted yet.</div>';
      return;
    }

    container.innerHTML = State.paymentRequests.map((req) => {
      const isPending = req.status === 'pending';
      return `
        <div class="p-3.5 rounded-2xl bg-slate-50 border ${isPending ? 'border-amber-300 ring-2 ring-amber-100' : 'border-slate-200'} flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div class="space-y-1">
            <div class="flex items-center space-x-2">
              <span class="font-extrabold text-xs text-slate-900">${escapeHtml(req.userName || 'Student')}</span>
              <span class="text-[11px] text-slate-500 font-mono">(${escapeHtml(req.userEmail)})</span>
              <span class="px-2 py-0.5 rounded-full text-[10px] font-extrabold ${isPending ? 'bg-amber-100 text-amber-800' : 'bg-emerald-100 text-emerald-800'}">
                ${req.status.toUpperCase()}
              </span>
            </div>
            <div class="flex items-center space-x-3 text-xs">
              <span class="font-mono font-bold text-[#0052fe]">Tx: ${escapeHtml(req.txRef)}</span>
              <span class="text-slate-400 font-medium">${escapeHtml(req.dateStr || 'Recent')}</span>
              <span class="font-bold text-slate-700">${req.amount || 50} ETB</span>
            </div>
          </div>
          <div class="flex items-center space-x-2 self-end sm:self-center flex-shrink-0">
            ${isPending ? `
              <button onclick="NanovaApp.acceptPayment('${req.id}', '${req.uid}')" class="px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs rounded-xl shadow-sm transition flex items-center space-x-1">
                <i data-lucide="check" class="w-3.5 h-3.5"></i>
                <span>Accept Payment</span>
              </button>
              <button onclick="NanovaApp.rejectPayment('${req.id}', '${req.uid}')" class="px-3 py-1.5 bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold text-xs rounded-xl transition">
                Reject
              </button>
            ` : `
              <button onclick="NanovaApp.revokePayment('${req.id}', '${req.uid}')" class="px-3 py-1.5 bg-rose-50 hover:bg-rose-100 text-rose-600 font-bold text-xs rounded-xl transition">
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
      container.innerHTML = '<div class="p-6 text-center text-xs text-slate-400 font-medium">No registered users in database.</div>';
      return;
    }

    container.innerHTML = State.registeredUsers.map((u) => {
      const isAdm = u.role === 'admin';
      const isPaid = isAdm || !!u.isPaid;
      return `
        <div class="p-3 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between gap-3">
          <div class="space-y-0.5">
            <div class="flex items-center space-x-2">
              <span class="font-extrabold text-xs text-slate-900">${escapeHtml(u.displayName || u.email?.split('@')[0] || 'User')}</span>
              <span class="px-2 py-0.5 rounded-full text-[9px] font-extrabold ${isAdm ? 'bg-indigo-100 text-indigo-800' : 'bg-slate-200 text-slate-700'}">
                ${(u.role || 'student').toUpperCase()}
              </span>
              <span class="px-2 py-0.5 rounded-full text-[9px] font-extrabold ${isPaid ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'}">
                ${isPaid ? 'PAID UNLIMITED' : 'FREE PREVIEW (10 Qs)'}
              </span>
            </div>
            <p class="text-[11px] text-slate-500 font-mono">${escapeHtml(u.email || 'No email')}</p>
          </div>
          <div class="flex items-center space-x-2 flex-shrink-0">
            ${!isAdm ? `
              <button onclick="NanovaApp.toggleUserPaidStatus('${u.uid}', ${!isPaid})" class="px-2.5 py-1 bg-white hover:bg-slate-100 text-slate-700 text-xs font-bold rounded-lg border border-slate-200 transition">
                ${isPaid ? 'Set Free' : 'Grant Paid'}
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

  function acceptPayment(reqId, uid) {
    if (!State.isAdmin) return;
    if (firebaseDb) {
      firebaseDb.ref('paymentRequests/' + reqId + '/status').set('approved');
      if (uid) firebaseDb.ref('users/' + uid + '/isPaid').set(true);
      alert('✅ Payment accepted! User has been granted full 300+ exam access.');
    }
  }

  function rejectPayment(reqId, uid) {
    if (!State.isAdmin) return;
    if (confirm('Reject this payment verification request?')) {
      if (firebaseDb) {
        firebaseDb.ref('paymentRequests/' + reqId + '/status').set('rejected');
        if (uid) firebaseDb.ref('users/' + uid + '/isPaid').set(false);
      }
    }
  }

  function revokePayment(reqId, uid) {
    if (!State.isAdmin) return;
    if (confirm('Revoke paid access for this student?')) {
      if (firebaseDb) {
        firebaseDb.ref('paymentRequests/' + reqId + '/status').set('revoked');
        if (uid) firebaseDb.ref('users/' + uid + '/isPaid').set(false);
      }
    }
  }

  function toggleUserPaidStatus(uid, newStatus) {
    if (!State.isAdmin || !firebaseDb) return;
    firebaseDb.ref('users/' + uid + '/isPaid').set(newStatus).then(() => {
      alert(`User status updated to: ${newStatus ? 'PAID' : 'FREE'}`);
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

  function refreshPaymentRequests() {
    loadPaymentRequestsAndUsers();
  }

  function refreshUsersList() {
    loadPaymentRequestsAndUsers();
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

    // If user has not clicked OK yet, show instructional prompt
    if (!State.hasAppliedFilters) {
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

    const isUnlocked = State.isPaid || State.isAdmin;
    const totalPages = Math.max(1, Math.ceil(totalQuestions / State.pageSize));

    // Ensure valid page bounds
    if (State.currentPage < 1) State.currentPage = 1;
    if (State.currentPage > totalPages) State.currentPage = totalPages;

    // Free users can only access Page 1 (questions 1 to 10)
    if (!isUnlocked && State.currentPage > 1) {
      State.currentPage = 1;
      showPaywallModal();
    }

    const startIndex = (State.currentPage - 1) * State.pageSize;
    const endIndex = Math.min(startIndex + State.pageSize, totalQuestions);
    const pageQuestions = State.filteredQuestions.slice(startIndex, endIndex);

    const letters = ['A', 'B', 'C', 'D'];

    container.innerHTML = pageQuestions.map((q, localIdx) => {
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
        <div class="bg-blue-50 border border-blue-200 rounded-2xl p-4 mt-4 text-sm text-slate-800 animate-fade-in">
          <div class="flex items-center space-x-2 text-blue-800 font-bold mb-1.5">
            <i data-lucide="check-circle" class="w-4 h-4 text-blue-600"></i>
            <span>Detailed Solution & Explanation</span>
          </div>
          <p class="leading-relaxed text-slate-700">${escapeHtml(q.explanation)}</p>
        </div>
      ` : '';

      return `
        <div class="white-card border border-slate-100 shadow-md hover:shadow-lg transition space-y-4" id="q_card_${escapeAttr(q.id)}">
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
              <button onclick="NanovaApp.toggleQuestionBookmark('${escapeAttr(q.id)}')" class="p-2 rounded-xl ${isBookmarked ? 'bg-blue-50 text-[#0052fe] border border-blue-200' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'} transition" title="${isBookmarked ? 'Saved' : 'Save Question'}">
                <i data-lucide="${isBookmarked ? 'bookmark-check' : 'bookmark'}" class="w-4 h-4"></i>
              </button>
              <span class="question-num-tag">Q. ${globalNumber}</span>
            </div>
          </div>

          <!-- Question Prompt -->
          <h3 class="question-text-title text-base sm:text-lg font-bold text-slate-900 leading-snug">
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

    if (prevBtn) prevBtn.disabled = State.currentPage <= 1;
    if (nextBtn) {
      const isUnlocked = State.isPaid || State.isAdmin;
      if (!isUnlocked && State.currentPage === 1 && totalPages > 1) {
        nextBtn.innerHTML = '<span>Unlock the Next Questions</span><i data-lucide="lock" class="w-4 h-4"></i>';
      } else {
        nextBtn.innerHTML = '<span>Next Questions</span><i data-lucide="chevron-right" class="w-4 h-4"></i>';
        nextBtn.disabled = State.currentPage >= totalPages;
      }
    }
  }

  function boardNextPage() {
    const totalPages = Math.ceil(State.filteredQuestions.length / State.pageSize);
    const isUnlocked = State.isPaid || State.isAdmin;

    if (!isUnlocked) {
      showPaywallModal();
      return;
    }

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
    const baseQuestions = State.questions.filter((q) => {
      if (category === 'COC Exam') {
        if (q.category !== 'COC Exam') return false;
      } else {
        if (course !== 'ALL' && q.course !== course) return false;
        if (category && category !== 'ALL' && q.category !== category) return false;
      }
      if (university !== 'ALL' && q.university !== university) return false;
      if (year !== 'ALL' && !q.year.includes(year)) return false;
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

    grid.innerHTML = State.universities.map((u) => {
      const fallbackImg = 'https://images.unsplash.com/photo-1562774053-701939374585?w=600&auto=format&fit=crop&q=80';
      const imgSrc = (u.image && /^https?:\/\/.+/i.test(u.image.trim())) ? sanitizeUrl(u.image) : fallbackImg;
      const safeWebsite = sanitizeUrl(u.website);
      const safeTelegram = sanitizeUrl(u.telegram);

      return '<div class="univ-card">' +
        '<div class="relative">' +
          '<img src="' + imgSrc + '" alt="' + escapeHtml(u.name) + '" class="univ-card-image" onerror="this.src=\'' + fallbackImg + '\'" />' +
          (u.location ? '<span class="absolute bottom-2 left-2 px-2.5 py-1 rounded-lg bg-black/70 backdrop-blur-sm text-white text-[10px] font-bold">' + escapeHtml(u.location) + '</span>' : '') +
          (State.isAdmin ? '<div class="absolute top-2 right-2 flex space-x-1">' +
            '<button onclick="NanovaApp.editUniversity(\'' + escapeAttr(u.id) + '\')" class="p-1.5 rounded-lg bg-white/90 text-slate-700 hover:bg-white shadow transition" title="Edit"><i data-lucide="edit-3" class="w-3.5 h-3.5"></i></button>' +
            '<button onclick="NanovaApp.deleteUniversity(\'' + escapeAttr(u.id) + '\')" class="p-1.5 rounded-lg bg-rose-600 text-white hover:bg-rose-700 shadow transition" title="Delete"><i data-lucide="trash-2" class="w-3.5 h-3.5"></i></button>' +
          '</div>' : '') +
        '</div>' +
        '<div class="univ-card-body">' +
          '<div>' +
            '<h3 class="font-extrabold text-slate-900 text-base mb-1.5">' + escapeHtml(u.name) + '</h3>' +
            '<p class="text-xs text-slate-500 font-medium leading-relaxed mb-4">' + escapeHtml(u.description || 'Official Ethiopian higher education campus details.') + '</p>' +
          '</div>' +
          '<div class="flex items-center justify-between pt-3 border-t border-slate-100 gap-2">' +
            '<a href="' + safeWebsite + '" target="_blank" rel="noopener noreferrer" class="btn-portal flex-1 justify-center">' +
              '<i data-lucide="globe" class="w-3.5 h-3.5"></i>' +
              '<span>Portal</span>' +
            '</a>' +
            '<a href="' + safeTelegram + '" target="_blank" rel="noopener noreferrer" class="btn-telegram flex-1 justify-center">' +
              '<i data-lucide="send" class="w-3.5 h-3.5"></i>' +
              '<span>Telegram</span>' +
            '</a>' +
          '</div>' +
        '</div>' +
      '</div>';
    }).join('');

    if (window.lucide) window.lucide.createIcons();
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

  function editUniversity(univId) {
    if (!State.isAdmin) return;
    const u = State.universities.find((item) => item.id === univId);
    if (!u) return;

    document.getElementById('univFormId').value = u.id;
    document.getElementById('univNameInput').value = u.name || '';
    document.getElementById('univWebsiteInput').value = u.website || '';
    document.getElementById('univTelegramInput').value = u.telegram || '';
    document.getElementById('univImageInput').value = u.image || '';
    document.getElementById('univLocationInput').value = u.location || '';
    document.getElementById('univModalTitle').textContent = 'Edit University';

    document.getElementById('univModal')?.classList.remove('hidden');
  }

  function saveUniversity(e) {
    e.preventDefault();
    if (!State.isAdmin) return;

    const id = document.getElementById('univFormId')?.value || ('univ_' + Date.now());
    const name = document.getElementById('univNameInput')?.value.trim();
    const website = document.getElementById('univWebsiteInput')?.value.trim();
    const telegram = document.getElementById('univTelegramInput')?.value.trim();
    const image = document.getElementById('univImageInput')?.value.trim();
    const location = document.getElementById('univLocationInput')?.value.trim();

    const univData = {
      id,
      name,
      website,
      telegram,
      image,
      location,
      description: 'Campus portal and Telegram student community.'
    };

    const existingIdx = State.universities.findIndex((u) => u.id === id);
    if (existingIdx >= 0) State.universities[existingIdx] = univData;
    else State.universities.unshift(univData);

    NanovaDB.saveAll('universities', State.universities).catch(console.warn);
    renderUniversities();
    closeUnivModal();
    alert('✅ University details saved successfully!');
  }

  function deleteUniversity(univId) {
    if (!State.isAdmin) return;
    if (confirm('Are you sure you want to remove this university?')) {
      State.universities = State.universities.filter((u) => u.id !== univId);
      NanovaDB.saveAll('universities', State.universities).catch(console.warn);
      renderUniversities();
    }
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

  /* ── COMMUNITY FEED RENDERING ──────────────────────── */
  function renderCommunityPosts() {
    const container = document.getElementById('communityPostsContainer');
    if (!container) return;

    if (!State.posts.length) {
      container.innerHTML = '<div class="white-card text-center text-slate-400 py-8">No official announcements yet.</div>';
      return;
    }

    container.innerHTML = State.posts.map((post) => {
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
            '<button onclick="NanovaApp.deletePost(\'' + escapeAttr(post.id) + '\')" class="text-slate-400 hover:text-rose-500 p-1.5 rounded-lg transition" title="Delete Post"><i data-lucide="trash-2" class="w-4 h-4"></i></button>' +
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

        '<div class="flex items-center space-x-4 pt-3 border-t border-slate-100">' +
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
        '</div>' +
      '</div>';
    }).join('');

    if (window.lucide) window.lucide.createIcons();
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
  function openAddQuestionModal() {
    if (!State.isAdmin) return;
    const form = document.getElementById('addQuestionForm');
    if (form) form.reset();
    document.getElementById('questionModal')?.classList.remove('hidden');
  }

  function closeAddQuestionModal() {
    document.getElementById('questionModal')?.classList.add('hidden');
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

  function saveNewQuestion(e) {
    e.preventDefault();
    if (!State.isAdmin) return;

    const category = document.getElementById('newQCategory')?.value || 'Mid Exam';
    const course = document.getElementById('newQCourse')?.value;
    const university = document.getElementById('newQUniv')?.value;
    const year = document.getElementById('newQYear')?.value;
    const promptText = document.getElementById('newQPrompt')?.value.trim();
    const optA = document.getElementById('newQOptA')?.value.trim();
    const optB = document.getElementById('newQOptB')?.value.trim();
    const optC = document.getElementById('newQOptC')?.value.trim();
    const optD = document.getElementById('newQOptD')?.value.trim();
    const correctIdx = parseInt(document.getElementById('newQCorrect')?.value || '0', 10);
    const explanation = document.getElementById('newQExplanation')?.value.trim();

    if (!promptText || !optA || !optB || !optC || !optD) {
      alert('Please fill out all question fields and options.');
      return;
    }

    const newQuestion = {
      id: 'custom_q_' + Date.now(),
      category: category,
      course: course,
      university: university,
      year: year,
      question: promptText,
      options: [optA, optB, optC, optD],
      answer: correctIdx,
      explanation: explanation || 'Detailed solution provided by campus administrator.'
    };

    State.questions.unshift(newQuestion);
    applyFilters();
    closeAddQuestionModal();
    alert('✅ New exam question published to the Freshman Exam Board!');
  }

  /* ── ADMIN DASHBOARD SUBTABS ───────────────────────── */
  let currentAdminSubTab = 'questions';

  function switchAdminSubTab(tabId) {
    currentAdminSubTab = tabId;
    const subtabs = ['questions', 'requests', 'universities', 'posts', 'payment', 'system'];
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
    if (window.lucide) window.lucide.createIcons();
  }

  function renderAdminDashboard() {
    const qCount = State.questions ? State.questions.length : 0;
    const uCount = State.universities ? State.universities.length : 0;
    const pCount = State.posts ? State.posts.length : 0;
    const price = State.paymentSettings.price || 50;

    const statQ = document.getElementById('adminStatQuestions');
    const statU = document.getElementById('adminStatUniversities');
    const statP = document.getElementById('adminStatPosts');
    const statPrice = document.getElementById('adminStatPrice');

    if (statQ) statQ.textContent = qCount;
    if (statU) statU.textContent = uCount;
    if (statP) statP.textContent = pCount;
    if (statPrice) statPrice.textContent = price + ' ETB';

    renderAdminQuestionsList();
    renderAdminUniversitiesList();
    renderAdminPostsList();
    renderAdminPaymentRequests();
    renderAdminUsersList();

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

    container.innerHTML = list.map((q) => {
      const optLetter = ['A', 'B', 'C', 'D'][q.answer] || 'A';
      return `
        <div class="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 hover:border-blue-200 transition flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div class="space-y-1 flex-1">
            <div class="flex flex-wrap items-center gap-1.5">
              <span class="px-2 py-0.5 rounded-md bg-blue-100 text-blue-800 text-[10px] font-extrabold">${escapeHtml(q.course || 'Freshman Course')}</span>
              <span class="px-2 py-0.5 rounded-md bg-slate-200 text-slate-700 text-[10px] font-bold">${escapeHtml(q.university || 'General')}</span>
              <span class="px-2 py-0.5 rounded-md bg-amber-100 text-amber-800 text-[10px] font-bold">${escapeHtml(q.year || '2024')}</span>
              <span class="px-2 py-0.5 rounded-md bg-blue-100 text-blue-800 text-[10px] font-extrabold">Correct: ${optLetter}</span>
            </div>
            <p class="text-xs font-bold text-slate-900 line-clamp-2">${escapeHtml(q.question)}</p>
          </div>
          <div class="flex items-center space-x-2 self-end sm:self-center flex-shrink-0">
            <button onclick="NanovaApp.deleteQuestion('${q.id}')" class="px-3 py-1.5 bg-rose-50 hover:bg-rose-100 text-rose-600 font-bold text-xs rounded-xl transition flex items-center space-x-1">
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
        (q.university && q.university.toLowerCase().includes(search));
      return matchCourse && matchSearch;
    });

    renderAdminQuestionsList(filtered);
  }

  function deleteQuestion(qId) {
    if (!confirm('Are you sure you want to delete this exam question?')) return;
    State.questions = State.questions.filter((q) => q.id !== qId);
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
          <button onclick="NanovaApp.deletePost('${p.id}')" class="px-2.5 py-1 bg-rose-50 hover:bg-rose-100 text-rose-600 font-bold text-xs rounded-lg transition flex-shrink-0">
            Delete
          </button>
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

    questions.forEach((q) => {
      const userAns = State.userAnswers[q.id];
      if (userAns !== undefined) {
        attempted++;
        if (userAns === q.answer) correct++;
      }
    });

    const percent = total > 0 ? Math.round((correct / total) * 100) : 0;
    const elapsedSecs = State.examStartTime ? Math.round((Date.now() - State.examStartTime) / 1000) : (1800 - State.timerSeconds);
    const elapsedM = Math.floor(elapsedSecs / 60);
    const elapsedS = elapsedSecs % 60;

    let grade = 'NEEDS REVIEW';
    if (percent >= 90) grade = 'EXCELLENT (A+)';
    else if (percent >= 80) grade = 'VERY GOOD (A)';
    else if (percent >= 65) grade = 'GOOD (B)';
    else if (percent >= 50) grade = 'SATISFACTORY (C)';

    const pElem = document.getElementById('scorecardPercent');
    const cElem = document.getElementById('scorecardCorrect');
    const tElem = document.getElementById('scorecardTime');
    const gElem = document.getElementById('scorecardGrade');

    if (pElem) pElem.textContent = percent + '%';
    if (cElem) cElem.textContent = correct + ' / ' + total + ' (' + attempted + ' attempted)';
    if (tElem) tElem.textContent = elapsedM + 'm ' + elapsedS + 's';
    if (gElem) gElem.textContent = grade;

    document.getElementById('scorecardModal')?.classList.remove('hidden');
    if (window.lucide) window.lucide.createIcons();
  }

  function closeScorecardModal() {
    document.getElementById('scorecardModal')?.classList.add('hidden');
    switchExamMode('practice');
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

  /* ── TAB NAVIGATION & PAYWALL MODALS ───────────────── */
  function switchTab(tabId) {
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

    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function showPaywallModal() {
    document.getElementById('paywallModal')?.classList.remove('hidden');
    updatePaywallUI();
  }

  function hidePaywallModal() {
    document.getElementById('paywallModal')?.classList.add('hidden');
  }

  function processPayment() {
    if (!State.currentUser) {
      alert('Please sign in or register with Firebase first so your payment can be assigned to your account.');
      openAuthModal();
      return;
    }
    const txPrompt = prompt('Enter your Telebirr, CBE, or E-Birr Transaction ID to submit payment verification to Admin:');
    if (txPrompt && txPrompt.trim().length >= 3) {
      const refInput = document.getElementById('paywallTxRefInput');
      if (refInput) refInput.value = txPrompt.trim();
      verifyPaymentReference();
    }
  }

  function copyPaymentDetail(text, btnId) {
    if (!text) return;
    const cleanText = text.trim();
    navigator.clipboard?.writeText(cleanText).then(() => {
      const btn = document.getElementById(btnId);
      if (btn) {
        const orig = btn.textContent;
        btn.textContent = 'Copied!';
        setTimeout(() => { btn.textContent = orig; }, 2000);
      }
    }).catch(() => {
      prompt('Copy payment details:', cleanText);
    });
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
    commentOnPost,
    closeCommentModal,
    submitComment,
    sharePost,
    publishCommunityPost,
    deletePost,
    toggleLikePost,
    renderUniversities,
    openAddUnivModal,
    closeUnivModal,
    editUniversity,
    saveUniversity,
    deleteUniversity,
    openAddQuestionModal,
    closeAddQuestionModal,
    onNewQCategoryChange,
    saveNewQuestion,
    switchAdminSubTab,
    renderAdminDashboard,
    filterAdminQuestions,
    deleteQuestion,
    saveAdminPaymentSettings,
    refreshPaymentRequests,
    refreshUsersList,
    acceptPayment,
    rejectPayment,
    revokePayment,
    toggleUserPaidStatus,
    deleteUserAccount,
    showPaywallModal,
    hidePaywallModal,
    processPayment,
    copyPaymentDetail,
    verifyPaymentReference,
    openAuthModal,
    closeAuthModal,
    toggleAuthMode,
    handleEmailAuth,
    handleGoogleSignIn,
    firebaseSignOut,
    clearCacheAndReset
  };

  document.addEventListener('DOMContentLoaded', initApp);
})();
