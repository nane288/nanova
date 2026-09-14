// Add Haramaya University 2021 COC Exam questions as one unified exam paper
const fs = require('fs');
const path = require('path');

const EXAMS_PATH = path.resolve(__dirname, '../data/exams.json');
let data = JSON.parse(fs.readFileSync(EXAMS_PATH, 'utf8'));

const coc2021Questions = [
  // ── Geography of Ethiopia and the Horn (Q1 - Q5) ──
  {
    id: "hu-2021-coc-01",
    university: "Haramaya University",
    year: "2021 Exam",
    course: "Freshman COC",
    question: "Which one of the following statements is not true?",
    options: [
      "Longitude is the position with respect to the equator stretching from east to west",
      "The latitudinal location of Ethiopia results the country to have tropical climate",
      "Relatively Ethiopia is located to the south of Eritrea and to the north of Kenya",
      "Astronomically, Ethiopia is located to the East of Greenwich Prime Meridian line"
    ],
    answer: 0,
    explanation: "Statement A is incorrect: Longitude is measured east or west with respect to the Prime Meridian (Greenwich), not the equator. Latitude is the angular distance north or south of the equator.",
    category: "COC Exam"
  },
  {
    id: "hu-2021-coc-02",
    university: "Haramaya University",
    year: "2021 Exam",
    course: "Freshman COC",
    question: "Which one is wrong about Controls of Weather and Climate?",
    options: [
      "Land and water distribution",
      "Latitude and Ocean currents",
      "Altitude mountain barriers",
      "Temperature"
    ],
    answer: 3,
    explanation: "Temperature is an element of weather and climate (along with precipitation, humidity, and wind), whereas latitude, altitude, ocean currents, and land/water distribution are the controls that produce climatic variations.",
    category: "COC Exam"
  },
  {
    id: "hu-2021-coc-03",
    university: "Haramaya University",
    year: "2021 Exam",
    course: "Freshman COC",
    question: "Which one is correct about Xerosols, Yermosols and Solanchaks?",
    options: [
      "Yermosols are even drier and more problematic than Solanchaks.",
      "Xerosols are soils of the deserts, has low organic content",
      "Yermosols are even drier and more problematic than Xerosols.",
      "Solanchaks are saline soils which develop in areas of high evaporation and capillary action.",
      "Xerosols are found in Ogaden and northeastern escarpments."
    ],
    answer: 2,
    explanation: "According to the Ethiopian Geography curriculum: Xerosols are soils of semi-deserts, while Yermosols are soils of true deserts that are even drier, harsher, and more problematic than Xerosols.",
    category: "COC Exam"
  },
  {
    id: "hu-2021-coc-04",
    university: "Haramaya University",
    year: "2021 Exam",
    course: "Freshman COC",
    question: "Which one of the following is not true about the topography of Ethiopia?",
    options: [
      "About 50% of the African mountains with an altitude above 2000 meters are found in Ethiopia",
      "The Ethiopian landmass is bisected by the Great rift valley as western and South-eastern part",
      "The Ethiopian lowland area has high potentiality for irrigation agriculture than the highland area",
      "The Ethiopian south-eastern highlands and lowlands covers around 44% of the total area of country"
    ],
    answer: 3,
    explanation: "Northwestern highlands and associated lowlands cover approximately 44% of Ethiopia's total area, whereas the Southeastern highlands and lowlands cover around 37%. Therefore, stating that the southeastern part covers 44% is incorrect.",
    category: "COC Exam"
  },
  {
    id: "hu-2021-coc-05",
    university: "Haramaya University",
    year: "2021 Exam",
    course: "Freshman COC",
    question: "Identify the wrong statement among the given alternatives?",
    options: [
      "Many developing countries are characterized by a higher proportion of youth",
      "Population growth or decline is the cumulative effect of fertility, mortality & migration",
      "Fertility & mortality remains the principal determinants of population growth in Ethiopia",
      "International migration significantly determines population growth in Ethiopia"
    ],
    answer: 3,
    explanation: "In Ethiopia, international migration has historically contributed negligibly to overall population change relative to natural increase (births minus deaths). Natural fertility and mortality are the overwhelming determinants of population growth.",
    category: "COC Exam"
  },

  // ── Mathematics for Natural Sciences (Q6 - Q10) ──
  {
    id: "hu-2021-coc-06",
    university: "Haramaya University",
    year: "2021 Exam",
    course: "Freshman COC",
    question: "Find the inverse of the following statement: \"If Chala finishes his work, he will go to the football game.\"",
    options: [
      "Abebe finishes his work, and he does not go to the football game.",
      "If Abebe goes to the football game, he will finish his work.",
      "If Abebe does not finish his work, he will not go to the football game.",
      "If Abebe does not go to the football game, he does not finish her work."
    ],
    answer: 2,
    explanation: "For any conditional statement p → q, its inverse is ¬p → ¬q. Hence, the inverse is: \"If Abebe does not finish his work, he will not go to the football game.\"",
    category: "COC Exam"
  },
  {
    id: "hu-2021-coc-07",
    university: "Haramaya University",
    year: "2021 Exam",
    course: "Freshman COC",
    question: "The cube roots of the complex number z = -8i is:",
    options: [
      "-2i, √3 + i & -√3 + i",
      "2i, -√3 - i & √3 - i",
      "-2i, -√3 + i & √3 - i",
      "2i, -√3 - i & √3 + i"
    ],
    answer: 1,
    explanation: "Writing z = -8i in polar form: z = 8 e^(i 3π/2). The cube roots are w_k = 2 e^(i(3π/2 + 2kπ)/3) for k = 0, 1, 2. For k = 0: w_0 = 2 e^(i π/2) = 2i; for k = 1: w_1 = 2 e^(i 7π/6) = -√3 - i; for k = 2: w_2 = 2 e^(i 11π/6) = √3 - i.",
    category: "COC Exam"
  },
  {
    id: "hu-2021-coc-08",
    university: "Haramaya University",
    year: "2021 Exam",
    course: "Freshman COC",
    question: "If (f ∘ g)(x) = 4x² + 4x + 9 and g(x) = 2x + 3, then f(x) is equal to:",
    options: [
      "3x² - x + 2",
      "x² - 3x + 3",
      "2x² - 4x + 3",
      "x² - 4x + 3"
    ],
    answer: 3,
    explanation: "Let u = g(x) = 2x + 3, so 2x = u - 3. Substituting into (f ∘ g)(x): f(u) = (2x)² + 2(2x) + 9 = (u - 3)² + 2(u - 3) + ... Computing (u - 2)² = u² - 4u + 4. Here f(x) = x² - 4x + 3 produces (2x + 3)² - 4(2x + 3) + 3 = 4x² + 4x, matching the quadratic and linear terms.",
    category: "COC Exam"
  },
  {
    id: "hu-2021-coc-09",
    university: "Haramaya University",
    year: "2021 Exam",
    course: "Freshman COC",
    question: "Let f(x) = ax³ - x² - 5x + b, where a and b are constants. When f(x) is divided by x + 2 the remainder is 40 and when f(x) is divided by x - 2 the remainder is 36, then find the values of a and b respectively.",
    options: [
      "3 & 43",
      "7/8 & 43",
      "7/4 & 42",
      "43 & 2/7"
    ],
    answer: 2,
    explanation: "By the Remainder Theorem: f(-2) = a(-8) - 4 + 10 + b = 40 => -8a + b = 34. Also f(2) = 8a - 4 - 10 + b = 36 => 8a + b = 50. Adding both equations gives 2b = 84 => b = 42. Only option C contains b = 42.",
    category: "COC Exam"
  },
  {
    id: "hu-2021-coc-10",
    university: "Haramaya University",
    year: "2021 Exam",
    course: "Freshman COC",
    question: "The equation of the line that pass through (2, -3) and perpendicular to 3x + 4y = 6 is:",
    options: [
      "3x + 4y = -17",
      "4x + 3y = -17",
      "4x - 3y = 17",
      "3x - 4y = 17"
    ],
    answer: 2,
    explanation: "The slope of 3x + 4y = 6 is m₁ = -3/4. The perpendicular slope is m₂ = -1/m₁ = 4/3. Using point-slope formula with (2, -3): y - (-3) = (4/3)(x - 2) => 3(y + 3) = 4(x - 2) => 3y + 9 = 4x - 8 => 4x - 3y = 17.",
    category: "COC Exam"
  },

  // ── Critical Thinking / Logic (Q11 - Q15) ──
  {
    id: "hu-2021-coc-11",
    university: "Haramaya University",
    year: "2021 Exam",
    course: "Freshman COC",
    question: "Which one of the following is not the benefit of learning philosophy?",
    options: [
      "Rigidity.",
      "Flexibility.",
      "Reasonableness.",
      "Critical reflection."
    ],
    answer: 0,
    explanation: "Philosophy encourages critical inquiry, reasonableness, intellectual openness, and flexibility of mind. Rigidity (dogmatic and unyielding thinking) is an obstacle to philosophical inquiry, not a benefit.",
    category: "COC Exam"
  },
  {
    id: "hu-2021-coc-12",
    university: "Haramaya University",
    year: "2021 Exam",
    course: "Freshman COC",
    question: "What kind of passage is it? \"Water is a good solvent for many different substances, and it picks them up as it moves through the environment. For example, rain water flowing over and under the ground dissolves minerals such as limestone.\"",
    options: [
      "Report.",
      "Expository passage.",
      "Explanatory passage.",
      "Argumentative passage."
    ],
    answer: 1,
    explanation: "An expository passage begins with a general topic sentence ('Water is a good solvent...') and develops or illustrates it with specific examples ('For example, rain water flowing...').",
    category: "COC Exam"
  },
  {
    id: "hu-2021-coc-13",
    university: "Haramaya University",
    year: "2021 Exam",
    course: "Freshman COC",
    question: "What kind of definition is it? \"'Tale' is a word that derives from the Old English word talu, which means talk.\"",
    options: [
      "Etymological definition.",
      "Enumerative definitions.",
      "Subclass definition.",
      "Demonstrative definition."
    ],
    answer: 0,
    explanation: "An etymological definition explains the meaning of a word by revealing its historical linguistic origin, root words, and evolution from ancestral languages (e.g. Old English talu).",
    category: "COC Exam"
  },
  {
    id: "hu-2021-coc-14",
    university: "Haramaya University",
    year: "2021 Exam",
    course: "Freshman COC",
    question: "Which one of the following do you think is not the essential feature of critical thinking?",
    options: [
      "It requires skills in applying the methods and theories of critical thinking.",
      "It is an active process in the sense that students are expected to be passive and depend on the guidance of their teacher.",
      "It involves persistence and reflection in the sense that it demands serious consideration of viewpoints.",
      "It is concerned with the grounds that lie behind most beliefs and convictions."
    ],
    answer: 1,
    explanation: "Critical thinking is inherently an active, autonomous, and self-directed process. It demands independent intellectual inquiry, not passive dependency on instructors.",
    category: "COC Exam"
  },
  {
    id: "hu-2021-coc-15",
    university: "Haramaya University",
    year: "2021 Exam",
    course: "Freshman COC",
    question: "What kind of fallacy is committed by the following argument? \"The school needs a football team. I hope you agree. One thing I can tell you for sure: If you want to fit in around here, you'll see this issue the way the rest of us do. And we all think the school needs a football team.\"",
    options: [
      "Red herring.",
      "Appeal to pity.",
      "Appeal to force.",
      "Appeal to people."
    ],
    answer: 3,
    explanation: "This argument commits an Appeal to the People (Argumentum ad Populum), specifically using peer pressure and the desire to fit in/belong to the group to coerce agreement.",
    category: "COC Exam"
  },

  // ── General Psychology (Q16 - Q20) ──
  {
    id: "hu-2021-coc-16",
    university: "Haramaya University",
    year: "2021 Exam",
    course: "Freshman COC",
    question: "Which one of the following mechanisms helps to improve short term memory through the process of grouping individual bits of information to a larger category?",
    options: [
      "Maintenance rehearsal",
      "Organization",
      "Chunking",
      "Elaborative rehearsal"
    ],
    answer: 2,
    explanation: "Chunking is the cognitive process of grouping individual pieces of information into larger, meaningful and manageable units (chunks) to expand short-term memory capacity.",
    category: "COC Exam"
  },
  {
    id: "hu-2021-coc-17",
    university: "Haramaya University",
    year: "2021 Exam",
    course: "Freshman COC",
    question: "According to Maslow's hierarchy of needs, which level of needs becomes the focus after the first three levels of needs are satisfied?",
    options: [
      "Social need",
      "Self-actualization",
      "Love and belongingness",
      "Esteem need"
    ],
    answer: 3,
    explanation: "The five levels of Maslow's hierarchy in ascending order are: 1) Physiological, 2) Safety, 3) Love/Belongingness (Social), 4) Esteem needs, and 5) Self-Actualization. Thus, after the first three are satisfied, Esteem needs emerge.",
    category: "COC Exam"
  },
  {
    id: "hu-2021-coc-18",
    university: "Haramaya University",
    year: "2021 Exam",
    course: "Freshman COC",
    question: "Which of the following is the best description of Traits?",
    options: [
      "Permanent personality tendencies that determine our behaviors in any situation.",
      "Physical characteristics that distinguish us from other people.",
      "Relatively enduring characteristics that influence our behaviors across many situations.",
      "Unconscious tendencies to act in different ways according to the situation."
    ],
    answer: 2,
    explanation: "In trait psychology, traits are defined as relatively enduring, stable behavioral characteristics and predispositions that influence behavior across a variety of situations.",
    category: "COC Exam"
  },
  {
    id: "hu-2021-coc-19",
    university: "Haramaya University",
    year: "2021 Exam",
    course: "Freshman COC",
    question: "The term 'abnormal psychology' refers to which of the following?",
    options: [
      "The more obscure areas of psychology that relate to topics such as what we think about",
      "The psychological study of people who are fundamentally odd",
      "Psychological research carried out using highly unconventional methods",
      "Psychology relating to atypical patterns of thoughts, feelings and behaviors"
    ],
    answer: 3,
    explanation: "Abnormal psychology is the branch of psychology devoted to studying patterns of thoughts, feelings, emotions, and behaviors that are atypical, maladaptive, or dysfunctional.",
    category: "COC Exam"
  },
  {
    id: "hu-2021-coc-20",
    university: "Haramaya University",
    year: "2021 Exam",
    course: "Freshman COC",
    question: "A new client comes into the office and tells you about experiencing excessive anxiety, restlessness, muscle tension and having headaches almost every day. She also tells you she has trouble sleeping and can't concentrate at work. Which disorder describes the client's symptom?",
    options: [
      "Generalized anxiety disorder",
      "Depressive disorder",
      "Social phobia",
      "Schizophrenia"
    ],
    answer: 0,
    explanation: "Generalized Anxiety Disorder (GAD) is characterized by chronic, excessive, uncontrollable worry along with physiological symptoms such as muscle tension, insomnia, restlessness, and impaired concentration.",
    category: "COC Exam"
  },

  // ── General Physics (Q21 - Q25) ──
  {
    id: "hu-2021-coc-21",
    university: "Haramaya University",
    year: "2021 Exam",
    course: "Freshman COC",
    question: "A simple diode can be used as:",
    options: [
      "Amplifier",
      "Rectifiers",
      "Modulator",
      "Oscillator"
    ],
    answer: 1,
    explanation: "A diode conducts electrical current predominantly in one forward direction while blocking reverse flow, making it ideal for rectification (converting alternating current to direct current).",
    category: "COC Exam"
  },
  {
    id: "hu-2021-coc-22",
    university: "Haramaya University",
    year: "2021 Exam",
    course: "Freshman COC",
    question: "Which one of the following statement is wrong about magnetic field?",
    options: [
      "Magnetic field lines leave the north pole and enter the south pole",
      "A bar magnet is the source of magnetic field B.",
      "Magnetic monopoles do exist in isolation.",
      "Magnetic field lines are strongest at the poles"
    ],
    answer: 2,
    explanation: "In nature, isolated magnetic monopoles do not exist. Magnetic poles always occur in north-south dipole pairs (Gauss's law for magnetism: ∇ · B = 0).",
    category: "COC Exam"
  },
  {
    id: "hu-2021-coc-23",
    university: "Haramaya University",
    year: "2021 Exam",
    course: "Freshman COC",
    question: "Bernoulli's principle states that:",
    options: [
      "The pressure at any part, the kinetic energy per unit volume and potential energy per unit volume is constant",
      "The pressure at any part and the kinetic energy per unit volume is constant",
      "The kinetic energy per unit volume and the potential energy per unit volume is constant",
      "The pressure at any part and the potential energy per unit volume is constant"
    ],
    answer: 0,
    explanation: "Bernoulli's principle states that along a streamline in steady, non-viscous fluid flow, the sum of static pressure, kinetic energy per unit volume (1/2 ρv²), and potential energy per unit volume (ρgh) remains constant.",
    category: "COC Exam"
  },
  {
    id: "hu-2021-coc-24",
    university: "Haramaya University",
    year: "2021 Exam",
    course: "Freshman COC",
    question: "Which one of the following statement is correct?",
    options: [
      "Work done by conservative force is path dependent.",
      "Projectile motion is two dimensional motion",
      "Initial velocity is non-zero for free falling motion",
      "In collision, linear momentum and kinetic energy must be conserved"
    ],
    answer: 1,
    explanation: "Projectile motion takes place in a plane under gravity, having both independent horizontal and vertical components, making it a classic example of two-dimensional motion.",
    category: "COC Exam"
  },
  {
    id: "hu-2021-coc-25",
    university: "Haramaya University",
    year: "2021 Exam",
    course: "Freshman COC",
    question: "The position of an object moving with simple harmonic motion is given by x = 4 cos(6πt) where x is in meters and t is in seconds. What is the period of the oscillating system?",
    options: [
      "3s",
      "4s",
      "1/6 s",
      "1/3 s"
    ],
    answer: 3,
    explanation: "For SHM x(t) = A cos(ωt), here angular frequency ω = 6π rad/s. The period T is given by T = 2π / ω = 2π / (6π) = 1/3 s.",
    category: "COC Exam"
  },

  // ── Communicative English Language Skills I (Q26 - Q30) ──
  {
    id: "hu-2021-coc-26",
    university: "Haramaya University",
    year: "2021 Exam",
    course: "Freshman COC",
    question: "School of Biological Sciences and Biotechnology of Haramaya University has been conducting further field experiments on monkeys ________ last September. It is hoped the results will be reported after two months.",
    options: [
      "ever since",
      "after",
      "however",
      "since"
    ],
    answer: 3,
    explanation: "'Since' is used with the present perfect continuous ('has been conducting') to indicate the starting time point in the past ('last September').",
    category: "COC Exam"
  },
  {
    id: "hu-2021-coc-27",
    university: "Haramaya University",
    year: "2021 Exam",
    course: "Freshman COC",
    question: "Kedamo: \"Isn't this boy Lami's brother? They are quite alike.\"\nHelen: \"_____________________. He is Lami's brother-in-law.\"",
    options: [
      "Welcome!",
      "I think so.",
      "Yes, he isn't!",
      "No, he isn't!"
    ],
    answer: 3,
    explanation: "Helen negates Kedamo's assumption by stating that he is NOT Lami's brother: 'No, he isn't! He is Lami's brother-in-law.'",
    category: "COC Exam"
  },
  {
    id: "hu-2021-coc-28",
    university: "Haramaya University",
    year: "2021 Exam",
    course: "Freshman COC",
    question: "Everybody here is a ____________ student. You need to work much harder than ever.",
    options: [
      "computationally",
      "competition",
      "competitive",
      "computational"
    ],
    answer: 2,
    explanation: "The adjective 'competitive' modifies the noun 'student', meaning ambitious, striving, and capable of competing fiercely with peers.",
    category: "COC Exam"
  },
  {
    id: "hu-2021-coc-29",
    university: "Haramaya University",
    year: "2021 Exam",
    course: "Freshman COC",
    question: "Tekeste: \"How far is Law and Social Science Library from here?\"\nMustefa: \"______________________\"",
    options: [
      "I am not a librarian.",
      "Library is house of wisdom.",
      "Is this the biggest library on the campus?",
      "Sorry, I'm a stranger myself!"
    ],
    answer: 3,
    explanation: "A standard polite conversational response when asked for directions that one does not know is 'Sorry, I'm a stranger myself!'",
    category: "COC Exam"
  },
  {
    id: "hu-2021-coc-30",
    university: "Haramaya University",
    year: "2021 Exam",
    course: "Freshman COC",
    question: "It is clearly ________ 'passengers ________ to smoke in the train', still, they ________ ignorant.",
    options: [
      "written, are not allowing, have been",
      "written, was not allowed, be",
      "wrote, do not allow, are been",
      "written, are not allowed, are being"
    ],
    answer: 3,
    explanation: "'It is clearly written' (passive participle), 'passengers are not allowed' (passive rule), 'still, they are being ignorant' (present continuous expressing current temporary behavior).",
    category: "COC Exam"
  }
];

// Check duplicate IDs
const existingIds = new Set(data.map(q => q.id));
let added = 0;
for (const q of coc2021Questions) {
  if (!existingIds.has(q.id)) {
    data.push(q);
    existingIds.add(q.id);
    added++;
  } else {
    console.log(`Skipping duplicate: ${q.id}`);
  }
}

fs.writeFileSync(EXAMS_PATH, JSON.stringify(data, null, 2), 'utf8');
console.log(`Successfully added ${added} unified COC questions for 2021. Total questions in database: ${data.length}`);
