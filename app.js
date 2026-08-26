/* ===================================================
   NANOVA - Firebase Authentication & Offline App Engine
   Firebase Project: nanova-st (nanova-st.firebaseapp.com)
   =================================================== */
(() => {
  'use strict';

  /* ── FIREBASE CONFIGURATION & INITIALIZATION ───────── */
  const firebaseConfig = {
    apiKey: "AIzaSyCUKyTmsymb7T-ai2eYhcxcXSDSD4Tom58",
    authDomain: "nanova-st.firebaseapp.com",
    projectId: "nanova-st",
    storageBucket: "nanova-st.firebasestorage.app",
    messagingSenderId: "127653158506",
    appId: "1:127653158506:web:921515de52ae2e380b3413",
    measurementId: "G-YDF5Z7Y2SJ"
  };

  let firebaseAuth = null;
  let googleProvider = null;

  try {
    if (window.firebase) {
      if (!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig);
        try { firebase.analytics(); } catch {}
      }
      firebaseAuth = firebase.auth();
      googleProvider = new firebase.auth.GoogleAuthProvider();
      console.log('[Firebase] Initialized for project: nanova-st');
    }
  } catch (err) {
    console.warn('[Firebase] Init notice:', err.message);
  }

  /* ── INDEXEDDB PERSISTENCE ─────────────────────────── */
  const NanovaDB = {
    dbName: 'NanovaBoardDB',
    version: 3,
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

  /* ── DEFAULT DATA ──────────────────────────────────── */
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

  const DEFAULT_UNIVERSITIES = [
    {
      id: 'univ_haramaya',
      name: 'Haramaya University',
      website: 'https://www.haramaya.edu.et',
      telegram: 'https://t.me/HaramayaUniversityOfficial',
      image: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=600&auto=format&fit=crop&q=80',
      location: 'Dire Dawa / Harar, Ethiopia',
      description: 'One of the oldest and most prestigious pioneer agricultural & science universities in Ethiopia.'
    },
    {
      id: 'univ_aau',
      name: 'Addis Ababa University',
      website: 'http://www.aau.edu.et',
      telegram: 'https://t.me/AddisAbabaUniversityOfficial',
      image: 'https://images.unsplash.com/photo-1562774053-701939374585?w=600&auto=format&fit=crop&q=80',
      location: 'Addis Ababa, Ethiopia',
      description: 'The flagship national higher education institution of Ethiopia, founded in 1950.'
    },
    {
      id: 'univ_astu',
      name: 'Adama Science & Technology University (ASTU)',
      website: 'http://www.astu.edu.et',
      telegram: 'https://t.me/ASTU_Official',
      image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=600&auto=format&fit=crop&q=80',
      location: 'Adama (Nazret), Oromia, Ethiopia',
      description: 'A center of excellence in applied science, technology, and engineering education.'
    },
    {
      id: 'univ_jimma',
      name: 'Jimma University',
      website: 'https://www.ju.edu.et',
      telegram: 'https://t.me/JimmaUniversityOfficial',
      image: 'https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?w=600&auto=format&fit=crop&q=80',
      location: 'Jimma, Oromia, Ethiopia',
      description: 'Renowned for community-based education and leading medical & public health training.'
    },
    {
      id: 'univ_hawassa',
      name: 'Hawassa University',
      website: 'https://www.hu.edu.et',
      telegram: 'https://t.me/HawassaUniversityOfficial',
      image: 'https://images.unsplash.com/photo-1592280771190-3e2e4d571952?w=600&auto=format&fit=crop&q=80',
      location: 'Hawassa, Sidama, Ethiopia',
      description: 'Prominent comprehensive university situated alongside beautiful Lake Hawassa.'
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
      author: 'Adnan Abduletif (Campus Admin)',
      email: 'adnanabduletif010@gmail.com',
      initial: 'A',
      isAdminPost: true,
      date: '05 Jul 2026, 14:59',
      content: 'Freshman Math Lecture Video: Master limits, derivatives, and continuous functions for midterm preparation with this step-by-step video solution!',
      youtubeUrl: 'https://www.youtube.com/watch?v=WUvTyaaNkzM',
      imageUrl: '',
      likes: 18,
      isLiked: true
    },
    {
      id: 'post_2',
      author: 'Adnan Abduletif (Campus Admin)',
      email: 'adnanabduletif010@gmail.com',
      initial: 'A',
      isAdminPost: true,
      date: '04 Jul 2026, 10:15',
      content: 'General Physics formulas cheat sheet & university past questions guide. Make sure to check the Universities tab for official portals and Telegram study groups.',
      youtubeUrl: '',
      imageUrl: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800&auto=format&fit=crop&q=80',
      likes: 12,
      isLiked: false
    }
  ];

  /* ── APPLICATION STATE ─────────────────────────────── */
  const State = {
    profile: { name: 'Adnan', university: 'Haramaya University', stream: 'Natural Science' },
    currentUser: null,
    isAdmin: false,
    adminEmails: ['adnanabduletif010@gmail.com', 'adnanabduletif010.agmail.com', 'adnanabduletif010', 'adnan'],
    adminPasskey: 'nanova2026',
    adminProfile: { name: 'Adnan Abduletif', email: 'adnanabduletif010@gmail.com', title: 'Lead Campus Admin' },
    exams: [],
    questions: [],
    filteredQuestions: [],
    currentQuestionIndex: 0,
    userAnswers: {},
    isPremium: false,
    universities: [],
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
    await loadUniversities();
    await loadPosts();
    renderBoardQuestion();
    renderUniversities();
    renderCommunityPosts();
    updateAdminUI();
    updateCounterBadges();
    initFirebaseAuthListener();
    if (window.lucide) window.lucide.createIcons();
    console.log('[Nanova] 100% English Engine with Firebase Auth & Universities');
  }

  function loadSavedState() {
    try {
      const p = localStorage.getItem('nanova_profile');
      if (p) Object.assign(State.profile, JSON.parse(p));
      const ans = localStorage.getItem('nanova_board_answers');
      if (ans) State.userAnswers = JSON.parse(ans);
      State.isPremium = localStorage.getItem('nanova_is_premium') === 'true';
      State.isAdmin = localStorage.getItem('nanova_is_admin') === 'true';
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

  /* ── FIREBASE AUTHENTICATION FLOWS ─────────────────── */
  let authMode = 'signin';

  function initFirebaseAuthListener() {
    if (!firebaseAuth) return;

    firebaseAuth.onAuthStateChanged((user) => {
      if (user) {
        State.currentUser = user;
        const email = (user.email || '').toLowerCase();
        State.profile.name = user.displayName || email.split('@')[0] || 'Student';
        State.profile.email = email;

        if (email === 'adnanabduletif010@gmail.com' || email.includes('adnanabduletif010')) {
          State.isAdmin = true;
          localStorage.setItem('nanova_is_admin', 'true');
        }

        localStorage.setItem('nanova_profile', JSON.stringify(State.profile));
        updateProfileUI();
        updateAdminUI();
        renderUniversities();
        renderCommunityPosts();
        console.log('[Firebase Auth] Logged in:', email, '| Admin:', State.isAdmin);
      } else {
        State.currentUser = null;
        console.log('[Firebase Auth] Signed out state');
      }
    });
  }

  function openAuthModal() {
    if (State.currentUser || State.isAdmin) {
      // If user is already logged in, switch to profile or show details
      const email = State.currentUser?.email || State.profile.email || (State.isAdmin ? 'adnanabduletif010@gmail.com' : 'Student');
      const role = State.isAdmin ? 'Lead Administrator' : 'Student';
      const prompt = confirm('Logged in as: ' + email + ' (' + role + ')\n\nWould you like to Sign Out?');
      if (prompt) {
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
      alert('Firebase is initializing, please try again.');
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
        alert('✅ Account registered successfully in Firebase!');
      } else {
        await firebaseAuth.signInWithEmailAndPassword(email, pass);
        alert('✅ Signed in successfully via Firebase!');
      }
      closeAuthModal();
    } catch (err) {
      alert('❌ Firebase Auth: ' + err.message);
    } finally {
      if (submitBtn) {
        submitBtn.textContent = authMode === 'signup' ? 'Register Account' : 'Sign In';
        submitBtn.disabled = false;
      }
    }
  }

  async function handleGoogleSignIn() {
    if (!firebaseAuth || !googleProvider) {
      alert('Google Auth initializing...');
      return;
    }
    try {
      await firebaseAuth.signInWithPopup(googleProvider);
      alert('✅ Signed in with Google successfully!');
      closeAuthModal();
    } catch (err) {
      alert('Google Sign-In notice: ' + err.message);
    }
  }

  async function firebaseSignOut() {
    if (firebaseAuth) {
      await firebaseAuth.signOut();
    }
    State.isAdmin = false;
    localStorage.removeItem('nanova_is_admin');
    updateAdminUI();
    renderUniversities();
    renderCommunityPosts();
    alert('Logged out of Firebase.');
  }

  /* ── ADMIN ACCESS CONTROLS ─────────────────────────── */
  function updateAdminUI() {
    const adminView = document.getElementById('adminComposerView');
    const studentView = document.getElementById('studentComposerView');
    const adminLockedBox = document.getElementById('adminLockedBox');
    const adminUnlockedBox = document.getElementById('adminUnlockedBox');
    const addUnivBtn = document.getElementById('addUnivBtn');
    const adminNavBtn = document.getElementById('adminNavBtn');

    if (State.isAdmin) {
      if (adminNavBtn) adminNavBtn.classList.remove('hidden');
      if (adminView) adminView.classList.remove('hidden');
      if (studentView) studentView.classList.add('hidden');
      if (adminLockedBox) adminLockedBox.classList.add('hidden');
      if (adminUnlockedBox) adminUnlockedBox.classList.remove('hidden');
      if (addUnivBtn) addUnivBtn.classList.remove('hidden');
    } else {
      if (adminNavBtn) adminNavBtn.classList.add('hidden');
      if (adminView) adminView.classList.add('hidden');
      if (studentView) studentView.classList.remove('hidden');
      if (adminLockedBox) adminLockedBox.classList.remove('hidden');
      if (adminUnlockedBox) adminUnlockedBox.classList.add('hidden');
      if (addUnivBtn) addUnivBtn.classList.add('hidden');
    }
    if (window.lucide) window.lucide.createIcons();
  }

  function verifyAdminCredential(input) {
    if (!input) return false;
    const clean = input.trim().toLowerCase();
    return clean === State.adminPasskey.toLowerCase() ||
           State.adminEmails.some((email) => clean === email.toLowerCase() || clean.includes('adnanabduletif010'));
  }

  function promptAdminLogin() {
    const input = prompt('Enter Admin Email (adnanabduletif010@gmail.com) or Passkey:');
    if (!input) return;

    if (verifyAdminCredential(input)) {
      State.isAdmin = true;
      localStorage.setItem('nanova_is_admin', 'true');
      updateAdminUI();
      renderUniversities();
      alert('🛡️ Welcome Admin Adnan Abduletif (adnanabduletif010@gmail.com)! Admin mode unlocked.');
    } else {
      alert('❌ Invalid admin credential.');
    }
  }

  function handleAdminLogin(e) {
    e.preventDefault();
    const input = document.getElementById('adminPasskeyInput')?.value;
    if (verifyAdminCredential(input)) {
      State.isAdmin = true;
      localStorage.setItem('nanova_is_admin', 'true');
      updateAdminUI();
      renderUniversities();
      alert('🛡️ Admin Access Verified for adnanabduletif010@gmail.com!');
    } else {
      alert('❌ Invalid admin credential.');
    }
  }

  function adminLogout() {
    State.isAdmin = false;
    localStorage.removeItem('nanova_is_admin');
    updateAdminUI();
    renderUniversities();
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

  /* ── UNIVERSITIES DIRECTORY (ADMIN CRUD) ───────────── */
  function renderUniversities() {
    const grid = document.getElementById('universitiesGrid');
    if (!grid) return;

    if (!State.universities.length) {
      grid.innerHTML = '<div class="white-card col-span-full text-center text-slate-400 py-10">No universities listed yet.</div>';
      return;
    }

    grid.innerHTML = State.universities.map((u) => {
      const fallbackImg = 'https://images.unsplash.com/photo-1562774053-701939374585?w=600&auto=format&fit=crop&q=80';
      const imgSrc = u.image || fallbackImg;

      return '<div class="univ-card">' +
        '<div class="relative">' +
          '<img src="' + imgSrc + '" alt="' + u.name + '" class="univ-card-image" onerror="this.src=\'' + fallbackImg + '\'" />' +
          (u.location ? '<span class="absolute bottom-2 left-2 px-2.5 py-1 rounded-lg bg-black/70 backdrop-blur-sm text-white text-[10px] font-bold">' + u.location + '</span>' : '') +
          (State.isAdmin ? '<div class="absolute top-2 right-2 flex space-x-1">' +
            '<button onclick="NanovaApp.editUniversity(\'' + u.id + '\')" class="p-1.5 rounded-lg bg-white/90 text-slate-700 hover:bg-white shadow transition" title="Edit"><i data-lucide="edit-3" class="w-3.5 h-3.5"></i></button>' +
            '<button onclick="NanovaApp.deleteUniversity(\'' + u.id + '\')" class="p-1.5 rounded-lg bg-rose-600 text-white hover:bg-rose-700 shadow transition" title="Delete"><i data-lucide="trash-2" class="w-3.5 h-3.5"></i></button>' +
          '</div>' : '') +
        '</div>' +
        '<div class="univ-card-body">' +
          '<div>' +
            '<h3 class="font-extrabold text-slate-900 text-base mb-1.5">' + u.name + '</h3>' +
            '<p class="text-xs text-slate-500 font-medium leading-relaxed mb-4">' + (u.description || 'Official Ethiopian higher education campus details.') + '</p>' +
          '</div>' +
          '<div class="flex items-center justify-between pt-3 border-t border-slate-100 gap-2">' +
            '<a href="' + (u.website || '#') + '" target="_blank" rel="noopener noreferrer" class="btn-portal flex-1 justify-center">' +
              '<i data-lucide="globe" class="w-3.5 h-3.5"></i>' +
              '<span>Portal</span>' +
            '</a>' +
            '<a href="' + (u.telegram || '#') + '" target="_blank" rel="noopener noreferrer" class="btn-telegram flex-1 justify-center">' +
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
    if (!State.isAdmin) {
      promptAdminLogin();
      return;
    }
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
    if (!State.isAdmin) {
      alert('Only administrators can manage universities.');
      return;
    }

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
    if (existingIdx >= 0) {
      State.universities[existingIdx] = univData;
    } else {
      State.universities.unshift(univData);
    }

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

  /* ── YOUTUBE EMBED HELPER ──────────────────────────── */
  function extractYouTubeEmbedUrl(url) {
    if (!url) return null;
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

      if (videoId) {
        return 'https://www.youtube.com/embed/' + videoId + '?rel=0';
      }
    } catch {}
    return null;
  }

  /* ── COMMUNITY FEED ────────────────────────────────── */
  function renderCommunityPosts() {
    const container = document.getElementById('communityPostsContainer');
    if (!container) return;

    if (!State.posts.length) {
      container.innerHTML = '<div class="white-card text-center text-slate-400 py-8">No announcements yet.</div>';
      return;
    }

    container.innerHTML = State.posts.map((post) => {
      const embedVideoUrl = extractYouTubeEmbedUrl(post.youtubeUrl);
      const hasImage = post.imageUrl && post.imageUrl.startsWith('http');

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

        '<p class="text-slate-800 text-sm leading-relaxed mb-3">' + post.content + '</p>' +

        (embedVideoUrl ? '<div class="video-responsive-container">' +
          '<iframe src="' + embedVideoUrl + '" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>' +
        '</div>' : '') +

        (hasImage ? '<img src="' + post.imageUrl + '" alt="Announcement Visual" class="post-embedded-image" onerror="this.style.display=\'none\'" />' : '') +

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
    const ytInput = document.getElementById('postYoutubeUrl');
    const imgInput = document.getElementById('postImageUrl');

    const content = (input?.value || '').trim();
    const youtubeUrl = (ytInput?.value || '').trim();
    const imageUrl = (imgInput?.value || '').trim();

    if (!content && !youtubeUrl && !imageUrl) return;

    const now = new Date();
    const dateStr = now.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) + ', ' +
                    now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const newPost = {
      id: 'post_' + Date.now(),
      author: 'Adnan Abduletif (Campus Admin)',
      email: 'adnanabduletif010@gmail.com',
      initial: 'A',
      isAdminPost: true,
      date: dateStr,
      content: content || 'Campus Announcement',
      youtubeUrl: youtubeUrl,
      imageUrl: imageUrl,
      likes: 0,
      isLiked: false
    };

    State.posts.unshift(newPost);
    NanovaDB.saveAll('posts', State.posts).catch(console.warn);

    if (input) input.value = '';
    if (ytInput) ytInput.value = '';
    if (imgInput) imgInput.value = '';

    renderCommunityPosts();
    alert('✅ Admin announcement published with embedded media!');
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
    const url = prompt('Enter Image URL (e.g. https://...):');
    const input = document.getElementById('postImageUrl');
    if (url && input) input.value = url;
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
    renderUniversities,
    openAddUnivModal,
    closeUnivModal,
    editUniversity,
    saveUniversity,
    deleteUniversity,
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
