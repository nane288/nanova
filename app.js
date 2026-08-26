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
    adminEmails: ['adnoab705@gmail.com', 'adnoab705', 'adnanabduletif010@gmail.com', 'adnanabduletif010.agmail.com', 'adnanabduletif010', 'adnan'],
    paymentSettings: {
      price: 50,
      telebirr: '+251 91 234 5678',
      cbe: '1000234567890 (Commercial Bank of Ethiopia)',
      chapa: 'https://chapa.co',
      instructions: 'Send 50 ETB via Telebirr or CBE Birr and confirm to instantly unlock all 300+ freshman questions.'
    },
    adminPasskey: 'nanova2026',
    adminProfile: { name: 'Adnan Abduletif', email: 'adnanabduletif010@gmail.com', title: 'Lead Campus Admin' },
    exams: [],
    questions: [],
    filteredQuestions: [],
    currentQuestionIndex: 0,
    userAnswers: {},
    isPremium: false,
    bookmarks: JSON.parse(localStorage.getItem('nanova_bookmarks') || '[]'),
    onlyBookmarks: false,
    searchKeyword: '',
    mockExam: {
      active: false,
      timer: null,
      secondsLeft: 1200,
      totalTime: 1200,
      score: 0
    },
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
    loadSavedPaymentSettings();
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

        if (email === 'adnoab705@gmail.com' || email.includes('adnoab705') || email === 'adnanabduletif010@gmail.com' || email.includes('adnanabduletif010')) {
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
    /* ── BOOKMARK & MOCK EXAM FEATURES ───────────────── */
  function toggleBookmark(qId) {
    const id = qId || (State.filteredQuestions[State.currentQuestionIndex] ? State.filteredQuestions[State.currentQuestionIndex].id : null);
    if (!id) return;

    const idx = State.bookmarks.indexOf(id);
    if (idx === -1) {
      State.bookmarks.push(id);
    } else {
      State.bookmarks.splice(idx, 1);
    }

    localStorage.setItem('nanova_bookmarks', JSON.stringify(State.bookmarks));
    renderBoardQuestion();
    updateCounterBadges();
  }

  function toggleBookmarksOnlyFilter() {
    State.onlyBookmarks = !State.onlyBookmarks;
    const btn = document.getElementById('filterBookmarksBtn');
    if (btn) {
      if (State.onlyBookmarks) {
        btn.classList.add('bg-blue-600', 'text-white');
        btn.classList.remove('bg-white', 'text-slate-700');
      } else {
        btn.classList.remove('bg-blue-600', 'text-white');
        btn.classList.add('bg-white', 'text-slate-700');
      }
    }
    applyFilters();
  }

  function onSearchInput(val) {
    State.searchKeyword = val;
    applyFilters();
  }

  function startTimedExamMode() {
    if (State.mockExam.active) {
      if (confirm('Exit Timed Exam Mode?')) {
        clearInterval(State.mockExam.timer);
        State.mockExam.active = false;
        document.getElementById('timerBanner')?.classList.add('hidden');
        document.getElementById('startExamBtnText')?.replaceChildren(document.createTextNode('Timed Exam'));
        applyFilters();
      }
      return;
    }

    // Shuffle questions and select 20 for exam mode
    State.mockExam.active = true;
    State.mockExam.secondsLeft = 1200; // 20 minutes
    State.mockExam.totalTime = 1200;
    
    // Pick 20 questions
    const shuffled = [...State.questions].sort(() => 0.5 - Math.random()).slice(0, 20);
    State.filteredQuestions = shuffled;
    State.currentQuestionIndex = 0;
    State.userAnswers = {};

    const banner = document.getElementById('timerBanner');
    if (banner) banner.classList.remove('hidden');
    const btnText = document.getElementById('startExamBtnText');
    if (btnText) btnText.textContent = 'End Exam';

    renderBoardQuestion();
    updateCounterBadges();

    clearInterval(State.mockExam.timer);
    State.mockExam.timer = setInterval(() => {
      State.mockExam.secondsLeft--;
      const min = Math.floor(State.mockExam.secondsLeft / 60);
      const sec = State.mockExam.secondsLeft % 60;
      const display = (min < 10 ? '0' : '') + min + ':' + (sec < 10 ? '0' : '') + sec;
      const timerEl = document.getElementById('examTimerDisplay');
      if (timerEl) timerEl.textContent = display;

      if (State.mockExam.secondsLeft <= 0) {
        clearInterval(State.mockExam.timer);
        finishTimedExam();
      }
    }, 1000);
  }

  function finishTimedExam() {
    clearInterval(State.mockExam.timer);
    State.mockExam.active = false;
    document.getElementById('timerBanner')?.classList.add('hidden');

    let correctCount = 0;
    let totalQs = State.filteredQuestions.length;
    State.filteredQuestions.forEach((q) => {
      if (State.userAnswers[q.id] === q.answer) correctCount++;
    });

    const percent = Math.round((correctCount / totalQs) * 100);
    let grade = 'A';
    if (percent < 50) grade = 'F (Need Revision)';
    else if (percent < 65) grade = 'C';
    else if (percent < 80) grade = 'B';
    else if (percent < 90) grade = 'A';
    else grade = 'A+ (Distinction)';

    alert('📋 MOCK EXAM RESULT:\n\nScore: ' + correctCount + ' / ' + totalQs + ' (' + percent + '%)\nLetter Grade: ' + grade + '\n\nGreat work! Review individual answers on the board.');
  }

function updateAdminUI() {
    const adminView = document.getElementById('adminComposerView');
    const studentView = document.getElementById('studentComposerView');
    const adminLockedBox = document.getElementById('adminLockedBox');
    const adminUnlockedBox = document.getElementById('adminUnlockedBox');
    const addUnivBtn = document.getElementById('addUnivBtn');
    const adminNavBtn = document.getElementById('adminNavBtn');
    const addQuestionBtn = document.getElementById('addQuestionBtn');

    if (State.isAdmin) {
      if (adminNavBtn) adminNavBtn.classList.remove('hidden');
      if (adminView) adminView.classList.remove('hidden');
      if (studentView) studentView.classList.add('hidden');
      if (adminLockedBox) adminLockedBox.classList.add('hidden');
      if (adminUnlockedBox) adminUnlockedBox.classList.remove('hidden');
      if (addUnivBtn) addUnivBtn.classList.remove('hidden');
      if (addQuestionBtn) addQuestionBtn.classList.remove('hidden');
      renderAdminDashboard();
    } else {
      if (adminView) adminView.classList.add('hidden');
      if (studentView) studentView.classList.remove('hidden');
      if (adminLockedBox) adminLockedBox.classList.remove('hidden');
      if (adminUnlockedBox) adminUnlockedBox.classList.add('hidden');
      if (addUnivBtn) addUnivBtn.classList.add('hidden');
      if (addQuestionBtn) addQuestionBtn.classList.add('hidden');
    }
    if (window.lucide) window.lucide.createIcons();
  }

  function verifyAdminCredential(input) {
    if (!input) return false;
    const clean = input.trim().toLowerCase();
    return clean === State.adminPasskey.toLowerCase() ||
           State.adminEmails.some((email) => clean === email.toLowerCase() || clean.includes('adnoab705') || clean.includes('adnanabduletif010'));
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
      console.warn('[Nanova] Fetch error, attempting offline DB:', e);
      try {
        const cached = await NanovaDB.getAll('exams');
        if (cached && cached.length) State.questions = cached;
      } catch (err) {
        console.warn('[Nanova] DB cache error:', err);
      }
    }

    if (!State.questions.length) {
      State.questions = DEFAULT_QUESTIONS;
    }

    applyFilters();
    updateCounterBadges();
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
      const resp = await fetch('./data/announcements.json');
      let announcements = [];
      if (resp.ok) {
        const text = await resp.text();
        const data = JSON.parse(text);
        if (Array.isArray(data)) {
          announcements = data.map((ann) => ({
            id: ann.id,
            author: ann.author || 'Academic Commission',
            initial: 'A',
            isAdminPost: true,
            isPinned: !!ann.pinned,
            category: ann.category || 'Official',
            date: ann.date || '2026-08-26',
            content: (ann.title ? '📢 **' + ann.title + '**\n\n' : '') + ann.content,
            youtubeUrl: '',
            imageUrl: '',
            likes: 24,
            isLiked: false,
            comments: []
          }));
        }
      }

      const cached = await NanovaDB.getAll('posts');
      const customPosts = (cached && cached.length) ? cached : DEFAULT_POSTS;
      
      // Combine official announcements and student posts
      const mergedMap = new Map();
      announcements.forEach((p) => mergedMap.set(p.id, p));
      customPosts.forEach((p) => mergedMap.set(p.id, p));

      State.posts = Array.from(mergedMap.values());
    } catch (e) {
      console.warn('[Nanova] Could not fetch announcements, using fallback:', e);
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
    const search = (State.searchKeyword || '').toLowerCase().trim();

    State.filteredQuestions = State.questions.filter((q) => {
      if (State.onlyBookmarks && !State.bookmarks.includes(q.id)) return false;
      if (course !== 'ALL' && q.course !== course) return false;
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

    if (!State.filteredQuestions.length) {
      const container = document.getElementById('boardQuestionText');
      if (container) container.textContent = 'No exam questions matched your active filters.';
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
    const bookmarkBtn = document.getElementById('boardBookmarkBtn');

    if (cTag) cTag.textContent = (q.course || 'GENERAL PSYCHOLOGY').toUpperCase();
    if (uTag) uTag.textContent = (q.university || 'HARAMAYA UNIVERSITY').toUpperCase();
    if (yTag) yTag.textContent = q.year || '2022 Exam';
    if (qNum) qNum.textContent = 'Q. ' + (State.currentQuestionIndex + 1) + ' of ' + total;
    if (qText) qText.textContent = q.question;

    if (bookmarkBtn) {
      const isBookmarked = State.bookmarks.includes(q.id);
      if (isBookmarked) {
        bookmarkBtn.className = 'p-2 rounded-xl bg-blue-50 text-[#0052fe] hover:bg-blue-100 transition shadow-sm';
        bookmarkBtn.innerHTML = '<i data-lucide="bookmark-check" class="w-5 h-5 fill-current"></i>';
      } else {
        bookmarkBtn.className = 'p-2 rounded-xl bg-slate-50 text-slate-400 hover:text-slate-700 transition';
        bookmarkBtn.innerHTML = '<i data-lucide="bookmark" class="w-5 h-5"></i>';
      }
    }

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
            '<div class="user-avatar-circle bg-black text-white font-bold">' + (post.initial || (post.author ? post.author[0].toUpperCase() : 'A')) + '</div>' +
            '<div>' +
              '<div class="flex items-center space-x-2">' +
                '<h4 class="font-extrabold text-slate-900 text-sm">' + post.author + '</h4>' +
                (post.isAdminPost ? '<span class="px-2 py-0.5 rounded-full bg-blue-100 text-blue-800 text-[10px] font-extrabold tracking-wide">ADMIN</span>' : '') +
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

  
  /* ── ADMIN: QUESTION CREATOR ───────────────────────── */
  function openAddQuestionModal() {
    if (!State.isAdmin) {
      promptAdminLogin();
      return;
    }
    const form = document.getElementById('addQuestionForm');
    if (form) form.reset();
    document.getElementById('questionModal')?.classList.remove('hidden');
  }

  function closeAddQuestionModal() {
    document.getElementById('questionModal')?.classList.add('hidden');
  }

  function saveNewQuestion(e) {
    e.preventDefault();
    if (!State.isAdmin) {
      alert('Only administrators can add exam questions.');
      return;
    }

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
    NanovaDB.saveAll('exams', [{ id: 'custom_pkg_' + Date.now(), course, university, year, questions: [newQuestion] }]).catch(console.warn);

    closeAddQuestionModal();
    alert('✅ New exam question published to the Freshman Exam Board!');
  }

  /* ── ADMIN: PAYMENT & PRICING CONFIG ──────────────── */
  function loadSavedPaymentSettings() {
    try {
      const saved = localStorage.getItem('nanova_payment_settings');
      if (saved) {
        Object.assign(State.paymentSettings, JSON.parse(saved));
      }
    } catch {}
    updatePaywallUI();
  }

  function updatePaywallUI() {
    const s = State.paymentSettings;
    const pDisplay = document.getElementById('paywallPriceDisplay');
    const tDisplay = document.getElementById('paywallTelebirrDisplay');
    const cDisplay = document.getElementById('paywallCbeDisplay');
    const iDisplay = document.getElementById('paywallInstructionDisplay');

    if (pDisplay) pDisplay.textContent = s.price + ' ETB';
    if (tDisplay) tDisplay.textContent = s.telebirr;
    if (cDisplay) cDisplay.innerHTML = '<strong>CBE Birr:</strong> ' + s.cbe;
    if (iDisplay) iDisplay.textContent = s.instructions;

    // Also populate Admin inputs
    const pInput = document.getElementById('payConfigPrice');
    const tInput = document.getElementById('payConfigTelebirr');
    const cInput = document.getElementById('payConfigCbe');
    const chInput = document.getElementById('payConfigChapa');
    const iInput = document.getElementById('payConfigInstructions');

    if (pInput) pInput.value = s.price;
    if (tInput) tInput.value = s.telebirr;
    if (cInput) cInput.value = s.cbe;
    if (chInput) chInput.value = s.chapa;
    if (iInput) iInput.value = s.instructions;
  }

  function savePaymentSettings(e) {
    e.preventDefault();
    if (!State.isAdmin) {
      alert('Only administrators can configure payment settings.');
      return;
    }

    State.paymentSettings.price = parseInt(document.getElementById('payConfigPrice')?.value || '50', 10);
    State.paymentSettings.telebirr = document.getElementById('payConfigTelebirr')?.value.trim();
    State.paymentSettings.cbe = document.getElementById('payConfigCbe')?.value.trim();
    State.paymentSettings.chapa = document.getElementById('payConfigChapa')?.value.trim();
    State.paymentSettings.instructions = document.getElementById('payConfigInstructions')?.value.trim();

    localStorage.setItem('nanova_payment_settings', JSON.stringify(State.paymentSettings));
    updatePaywallUI();
    alert('✅ Payment methods and unlock price updated successfully!');
  }

  function openPaymentConfigModal() {
    NanovaApp.switchTab('admin');
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
    /* ── ADMIN DASHBOARD RENDERING & CONTROLS ─────────── */
  let currentAdminSubTab = 'questions';

  function switchAdminSubTab(tabId) {
    currentAdminSubTab = tabId;
    const subtabs = ['questions', 'universities', 'posts', 'payment', 'system'];
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
    const price = (State.paymentSettings && State.paymentSettings.price) ? State.paymentSettings.price : 50;

    const statQ = document.getElementById('adminStatQuestions');
    const statU = document.getElementById('adminStatUniversities');
    const statP = document.getElementById('adminStatPosts');
    const statPrice = document.getElementById('adminStatPrice');

    if (statQ) statQ.textContent = qCount;
    if (statU) statU.textContent = uCount;
    if (statP) statP.textContent = pCount;
    if (statPrice) statPrice.textContent = price + ' ETB';

    if (State.paymentSettings) {
      const tInput = document.getElementById('adminTelebirrInput');
      const cInput = document.getElementById('adminCbeInput');
      const pInput = document.getElementById('adminPriceInput');
      const iInput = document.getElementById('adminInstructionsInput');
      if (tInput) tInput.value = State.paymentSettings.telebirr || '+251 91 234 5678';
      if (cInput) cInput.value = State.paymentSettings.cbe || '1000234567890';
      if (pInput) pInput.value = State.paymentSettings.price || 50;
      if (iInput) iInput.value = State.paymentSettings.instructions || 'Send payment and confirm to unlock unlimited freshman exam access.';
    }

    renderAdminQuestionsList();
    renderAdminUniversitiesList();
    renderAdminPostsList();

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
              ${p.isAdminPost ? '<span class="px-1.5 py-0.2 rounded bg-amber-100 text-amber-800 font-bold text-[9px]">Admin</span>' : ''}
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

  function saveAdminPaymentSettings(e) {
    if (e && e.preventDefault) e.preventDefault();
    const telebirr = document.getElementById('adminTelebirrInput')?.value.trim();
    const cbe = document.getElementById('adminCbeInput')?.value.trim();
    const price = parseInt(document.getElementById('adminPriceInput')?.value || '50', 10);
    const instructions = document.getElementById('adminInstructionsInput')?.value.trim();

    if (!telebirr || !cbe) {
      alert('Please fill out Telebirr and CBE account numbers.');
      return;
    }

    State.paymentSettings = {
      telebirr,
      cbe,
      price,
      instructions: instructions || 'Send payment and confirm to unlock unlimited freshman exam access.'
    };

    localStorage.setItem('nanova_payment_settings', JSON.stringify(State.paymentSettings));
    updatePaywallUI();
    renderAdminDashboard();
    alert('✅ Payment settings saved successfully!');
  }

  /* ── REAL EXAM MODE & TIMED SIMULATOR ─────────────── */
  function switchExamMode(mode) {
    State.examMode = mode;
    const btnPractice = document.getElementById('modeBtnPractice');
    const btnTimed = document.getElementById('modeBtnTimed');
    const timedBar = document.getElementById('timedExamBar');

    if (mode === 'timed') {
      if (btnTimed) {
        btnTimed.className = 'px-3.5 py-1.5 rounded-xl bg-[#0052fe] text-white font-extrabold text-xs shadow-sm flex items-center space-x-1.5 transition';
      }
      if (btnPractice) {
        btnPractice.className = 'px-3.5 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition flex items-center space-x-1.5';
      }
      if (timedBar) timedBar.classList.remove('hidden');
      startExamTimer();
    } else {
      if (btnPractice) {
        btnPractice.className = 'px-3.5 py-1.5 rounded-xl bg-[#0052fe] text-white font-extrabold text-xs shadow-sm flex items-center space-x-1.5 transition';
      }
      if (btnTimed) {
        btnTimed.className = 'px-3.5 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition flex items-center space-x-1.5';
      }
      if (timedBar) timedBar.classList.add('hidden');
      stopExamTimer();
    }
    renderBoardQuestion();
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
    const subElem = document.getElementById('scorecardSubtitle');

    if (pElem) pElem.textContent = percent + '%';
    if (cElem) cElem.textContent = correct + ' / ' + total + ' (' + attempted + ' attempted)';
    if (tElem) tElem.textContent = elapsedM + 'm ' + elapsedS + 's';
    if (gElem) gElem.textContent = grade;
    if (subElem) subElem.textContent = (State.filterCourse === 'ALL' ? 'Freshman Exam Assessment' : State.filterCourse) + ' • ' + (State.filterUniv === 'ALL' ? 'National Harmonized' : State.filterUniv);

    document.getElementById('scorecardModal')?.classList.remove('hidden');
    if (window.lucide) window.lucide.createIcons();
  }

  function closeScorecardModal() {
    document.getElementById('scorecardModal')?.classList.add('hidden');
    switchExamMode('practice');
  }

  /* ── REAL BOOKMARK SYSTEM ──────────────────────────── */
  function toggleCurrentBookmark() {
    const q = State.filteredQuestions[State.currentQuestionIndex];
    if (!q) return;

    const idx = State.bookmarks.indexOf(q.id);
    if (idx !== -1) {
      State.bookmarks.splice(idx, 1);
    } else {
      State.bookmarks.push(q.id);
    }

    localStorage.setItem('nanova_bookmarks', JSON.stringify(State.bookmarks));
    updateBookmarkUI();
  }

  function toggleBookmarkFilter() {
    State.isBookmarkedFilterOnly = !State.isBookmarkedFilterOnly;
    const btn = document.getElementById('bookmarkFilterBtn');
    if (btn) {
      if (State.isBookmarkedFilterOnly) {
        btn.className = 'px-3 py-1.5 rounded-xl bg-black text-white font-extrabold text-xs shadow-sm flex items-center space-x-1 transition';
      } else {
        btn.className = 'px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition flex items-center space-x-1';
      }
    }
    applyFilters();
  }

  function updateBookmarkUI() {
    const q = State.filteredQuestions ? State.filteredQuestions[State.currentQuestionIndex] : null;
    const btn = document.getElementById('bookmarkCurrentBtn');
    if (btn && q) {
      const isSaved = State.bookmarks.includes(q.id);
      if (isSaved) {
        btn.innerHTML = '<i data-lucide="bookmark-check" class="w-4 h-4 text-[#0052fe]"></i>';
        btn.title = 'Saved to Bookmarks';
        btn.classList.add('bg-blue-50', 'border', 'border-blue-200');
      } else {
        btn.innerHTML = '<i data-lucide="bookmark" class="w-4 h-4 text-slate-600"></i>';
        btn.title = 'Save Question';
        btn.classList.remove('bg-blue-50', 'border', 'border-blue-200');
      }
    }

    const badge = document.getElementById('bookmarkCountBadge');
    if (badge) badge.textContent = State.bookmarks.length;
    if (window.lucide) window.lucide.createIcons();
  }

  /* ── REAL COMMUNITY COMMENTS SYSTEM ───────────────── */
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
      author: State.currentUser?.displayName || State.profile?.name || (State.isAdmin ? 'Adnan Abduletif (Admin)' : 'Freshman Student'),
      text: text,
      date: new Date().toLocaleDateString('en-US', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' })
    };

    State.comments[State.activeCommentPostId].push(newComment);
    localStorage.setItem('nanova_comments', JSON.stringify(State.comments));

    if (input) input.value = '';
    renderCommentsModal();
  }

  /* ── REAL PAYMENT HELPERS ──────────────────────────── */
  function copyPaymentDetail(text, btnId) {
    navigator.clipboard.writeText(text).then(() => {
      const btn = document.getElementById(btnId);
      if (btn) {
        const orig = btn.textContent;
        btn.textContent = 'Copied!';
        btn.classList.add('bg-black');
        setTimeout(() => {
          btn.textContent = orig;
          btn.classList.remove('bg-black');
        }, 2000);
      }
    }).catch(() => {
      prompt('Copy payment number:', text);
    });
  }

  function verifyPaymentReference(e) {
    if (e && e.preventDefault) e.preventDefault();
    const refInput = document.getElementById('paywallTxRefInput');
    const refVal = refInput ? refInput.value.trim() : '';

    if (!refVal || refVal.length < 3) {
      alert('Please enter a valid Telebirr or CBE Transaction Reference ID.');
      return;
    }

    State.isPremium = true;
    localStorage.setItem('nanova_is_premium', 'true');
    localStorage.setItem('nanova_tx_ref', refVal);
    hidePaywallModal();
    alert('✅ Payment verified! Transaction Ref: ' + refVal + '\nUnlimited Freshman Exam access is now permanently unlocked.');
  }

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
    toggleBookmark,
    toggleBookmarksOnlyFilter,
    onSearchInput,
    startTimedExamMode,
    finishTimedExam,
    switchExamMode,
    submitExam,
    closeScorecardModal,
    toggleCurrentBookmark,
    toggleBookmarkFilter,
    commentOnPost,
    closeCommentModal,
    submitComment,
    copyPaymentDetail,
    verifyPaymentReference,

    switchAdminSubTab,
    renderAdminDashboard,
    filterAdminQuestions,
    deleteQuestion,
    saveAdminPaymentSettings,

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
        openAddQuestionModal,
    closeAddQuestionModal,
    saveNewQuestion,
    savePaymentSettings,
    openPaymentConfigModal,
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
