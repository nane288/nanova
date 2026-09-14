// Add Haramaya University 2024 COC Exam questions
const fs = require('fs');
const path = require('path');

const EXAMS_PATH = path.resolve(__dirname, '../data/exams.json');
const data = JSON.parse(fs.readFileSync(EXAMS_PATH, 'utf8'));

const newQuestions = [
  // ── Global Trend (Q1 - Q4) ──
  {
    id: "hu-2024-coc-glt-01",
    university: "Haramaya University",
    year: "2024 Exam",
    course: "Global Trends",
    question: "In due course of understanding National interest, Operational philosophy criteria undertakes the following styles except,",
    options: [
      "Incremental style",
      "Trial and error approach",
      "Stick and carrot approach",
      "Synoptic style of operation"
    ],
    answer: 2,
    explanation: "In foreign policy analysis, the operational philosophy of decision-makers includes styles such as synoptic style, incremental style, and trial-and-error approach. The 'stick and carrot' approach is an instrument/tactic of diplomacy and statecraft (incentives and coercion), not an operational philosophy style.",
    category: "COC Exam"
  },
  {
    id: "hu-2024-coc-glt-02",
    university: "Haramaya University",
    year: "2024 Exam",
    course: "Global Trends",
    question: "Foreign policy of the state involves general purpose and priorities of goals as well as specific strategies and instruments. The minimum goal states would like to achieve in its foreign policy is;",
    options: [
      "Diplomacy",
      "Political goal",
      "Economic diplomacy",
      "Survival"
    ],
    answer: 3,
    explanation: "In international relations and foreign policy, the most fundamental, irreducible core goal of every sovereign state is survival (self-preservation, territorial integrity, and defense of sovereignty).",
    category: "COC Exam"
  },
  {
    id: "hu-2024-coc-glt-03",
    university: "Haramaya University",
    year: "2024 Exam",
    course: "Global Trends",
    question: "Which one of the following statements is incorrect regarding Developmental State Paradigm?",
    options: [
      "It has been advocated as a proof for the growth of East Asian economy",
      "It advocates the minimal and laissez-faire approach of economy",
      "It advocates for the robust role of the state in the process of structural transformation.",
      "It supports active participation of private sector in economy"
    ],
    answer: 1,
    explanation: "The Developmental State paradigm emphasizes strong state intervention, strategic planning, and structural transformation (as exemplified by East Asian economies). It explicitly rejects the minimal state, laissez-faire free-market approach of neoliberalism.",
    category: "COC Exam"
  },
  {
    id: "hu-2024-coc-glt-04",
    university: "Haramaya University",
    year: "2024 Exam",
    course: "Global Trends",
    question: "In the distribution of political power in international relation where the relations are vulnerable for 'zero-sum game politics' is:",
    options: [
      "Multi-polarity",
      "Uni-polarity",
      "Bi-polarity",
      "Sovereignty"
    ],
    answer: 2,
    explanation: "In a bipolar international system (like the Cold War era between the US and the USSR), global power is split between two rival superpowers. Any gain for one side is perceived as a direct loss for the other, making relations highly vulnerable to zero-sum game politics.",
    category: "COC Exam"
  },

  // ── Communicative English Language Skills II (Q13 - Q17) ──
  {
    id: "hu-2024-coc-eng-13",
    university: "Haramaya University",
    year: "2024 Exam",
    course: "Communicative English",
    question: "Mr Jack was inaugurated as our new manager.",
    options: [
      "introduced",
      "elected",
      "nominated",
      "appointed"
    ],
    answer: 3,
    explanation: "'Inaugurate' in this professional organizational context means to formally induct or install someone into an official position or role, which corresponds closely to being appointed.",
    category: "COC Exam"
  },
  {
    id: "hu-2024-coc-eng-14",
    university: "Haramaya University",
    year: "2024 Exam",
    course: "Communicative English",
    question: "Which one of the following is punctuated correctly?",
    options: [
      "\"I was to come to the airport\" he said.",
      "\"I was to come to the airport.\" he said.",
      "\"I was to come to the airport,\" he said.",
      "\"I was to come to the airport,\" he said"
    ],
    answer: 2,
    explanation: "Option C is punctuated correctly: in direct speech preceding a dialogue tag, a comma is placed inside the closing quotation mark, the reporting pronoun begins with a lowercase letter ('he'), and the full sentence ends with a period.",
    category: "COC Exam"
  },
  {
    id: "hu-2024-coc-eng-15",
    university: "Haramaya University",
    year: "2024 Exam",
    course: "Communicative English",
    question: "I am working for a construction company _____ head office is in Leeds.",
    options: [
      "which",
      "whose",
      "that",
      "whom"
    ],
    answer: 1,
    explanation: "'Whose' is the possessive relative pronoun used for persons and entities/companies alike (referring to the company's head office).",
    category: "COC Exam"
  },
  {
    id: "hu-2024-coc-eng-16",
    university: "Haramaya University",
    year: "2024 Exam",
    course: "Communicative English",
    question: "There are a lot of black clouds in the sky. It _______.",
    options: [
      "is going to rain",
      "rains",
      "must rain",
      "will rain"
    ],
    answer: 0,
    explanation: "'Be going to' is used when predicting a future event based on observable present evidence ('a lot of black clouds in the sky').",
    category: "COC Exam"
  },
  {
    id: "hu-2024-coc-eng-17",
    university: "Haramaya University",
    year: "2024 Exam",
    course: "Communicative English",
    question: "I haven't seen that dress before. It ______ a new one.",
    options: [
      "may be",
      "might be",
      "can be",
      "must be"
    ],
    answer: 3,
    explanation: "'Must be' expresses strong logical deduction and high certainty based on evidence (having never seen the dress before).",
    category: "COC Exam"
  },

  // ── Social Anthropology (Q18 - Q21) ──
  {
    id: "hu-2024-coc-ant-18",
    university: "Haramaya University",
    year: "2024 Exam",
    course: "Social Anthropology",
    question: "The followings are the central assumption of the primordial model of ethnicity except____.",
    options: [
      "Ethnic membership of individuals and groups are subjective",
      "Ethnic boundaries are immutable",
      "Common ancestry determines ethnicity and ethnic identity",
      "Ethnicity is birth ascribed identity"
    ],
    answer: 0,
    explanation: "The primordialist model views ethnicity as fixed, biologically given, objective, and deeply rooted in ancestral heritage and immutable boundaries. Viewing ethnicity as subjective, fluid, and situational belongs to the constructivist/instrumentalist model.",
    category: "COC Exam"
  },
  {
    id: "hu-2024-coc-ant-19",
    university: "Haramaya University",
    year: "2024 Exam",
    course: "Social Anthropology",
    question: "Which one of the following is not correct about cultural relativism?",
    options: [
      "Appreciating cultural diversity",
      "Accepting and respecting other cultures",
      "Trying to understand every culture and its elements in terms of their own contexts",
      "Viewing others cultures from our cultures' point of view"
    ],
    answer: 3,
    explanation: "Evaluating other cultures through the standards and prejudices of one's own culture is called 'ethnocentrism'. Cultural relativism advocates the opposite: understanding and appreciating each culture within its own unique context.",
    category: "COC Exam"
  },
  {
    id: "hu-2024-coc-ant-20",
    university: "Haramaya University",
    year: "2024 Exam",
    course: "Social Anthropology",
    question: "Humanity stands for the human species, a group of life forms with the following characteristics, except______",
    options: [
      "Using complex sets of ideas called culture to survive",
      "Using modern language to communicate ideas",
      "Relatively small teeth for primates of our size",
      "Relatively small brains for primates of our size"
    ],
    answer: 3,
    explanation: "Humans are distinctively characterized by having relatively large brains compared to primates of similar body size (a high encephalization quotient), along with culture, language, and small teeth.",
    category: "COC Exam"
  },
  {
    id: "hu-2024-coc-ant-21",
    university: "Haramaya University",
    year: "2024 Exam",
    course: "Social Anthropology",
    question: "Which one of the following is wrongly matched about the feature of anthropology?",
    options: [
      "Its approach → holistic and relativistic",
      "Research approach → qualitative research",
      "Broad scope → interested in all human beings",
      "Comparative perspective → ethic view"
    ],
    answer: 3,
    explanation: "Anthropology uses cross-cultural comparative perspectives across societies. In anthropological fieldwork, the perspectives are 'emic' (insider view) and 'etic' (outsider/analytical view); 'ethic view' is an erroneous pairing.",
    category: "COC Exam"
  },

  // ── Moral and Civic Education (Q22 - Q25) ──
  {
    id: "hu-2024-coc-civ-22",
    university: "Haramaya University",
    year: "2024 Exam",
    course: "Moral and Civics Education",
    question: "Among the following statements, which one correctly describes morality and ethics?",
    options: [
      "A good person or action has certain desirable qualities.",
      "Ethical problems are hardly more general and theoretical.",
      "Morality refers to the philosophical study of values and of what constitutes good and bad human conduct.",
      "Moral problems are hardly specific problems"
    ],
    answer: 0,
    explanation: "Option A is correct. In contrast, ethics (not morality) is the philosophical inquiry into values and conduct (making C incorrect); ethical problems ARE general/theoretical (making B incorrect); and moral problems ARE specific, practical concerns (making D incorrect).",
    category: "COC Exam"
  },
  {
    id: "hu-2024-coc-civ-23",
    university: "Haramaya University",
    year: "2024 Exam",
    course: "Moral and Civics Education",
    question: "Among the following, which one is not true regarding the Ethiopian nationality proclamation law No 378/2003?",
    options: [
      "The proclamation asserts that Ethiopian nationals shall be hardly deprived of his/her Ethiopian nationality",
      "The proclamation asserts that Ethiopian national shall be deemed to have substituted his/her Ethiopian nationality",
      "The proclamation asserts that Ethiopian national shall be deemed to have voluntarily renounced his/her Ethiopian nationality.",
      "The proclamation asserts that Ethiopian national shall be deprived of his or her Ethiopian nationality if committed serious crime"
    ],
    answer: 3,
    explanation: "Under Article 33 of the FDRE Constitution and Proclamation No. 378/2003, no Ethiopian citizen can be involuntarily stripped of Ethiopian nationality, even for committing a serious crime.",
    category: "COC Exam"
  },
  {
    id: "hu-2024-coc-civ-24",
    university: "Haramaya University",
    year: "2024 Exam",
    course: "Moral and Civics Education",
    question: "Among the following statements, which one is not the explicit criticism of Communitarian school of thought?",
    options: [
      "It doesn't pressurize individuals to surrender their particular identities otherwise.",
      "It is hostile towards individual rights and autonomy - even that it is authoritarian since it melts the self into the society.",
      "It pushes people to sacrifice large parts of their individual differences in order to follow shared values.",
      "Communities are dominated by power elites or that one group within a community will force others to abide by its values."
    ],
    answer: 0,
    explanation: "Critics of communitarianism argue that it DOES exert excessive pressure on individuals to conform to collective identities and sacrifices individual rights (B, C, D). Stating that 'It doesn't pressurize individuals...' is the opposite of the criticism leveled against it.",
    category: "COC Exam"
  },
  {
    id: "hu-2024-coc-civ-25",
    university: "Haramaya University",
    year: "2024 Exam",
    course: "Moral and Civics Education",
    question: "Among the following statements, which one is the drawback of a written constitution?",
    options: [
      "It leads to the state of confusion. Controversies often arise over different provisions of the constitution having their place in the usages and customs of the country.",
      "It is so dynamic and viable to prevent the chances of popular uprisings.",
      "A written constitution becomes a play thing in the hands of the lawyers and the courts.",
      "It is easily accessible to citizens that enable them to monitor the behavior of their government thus preventing the emergency of dictatorship"
    ],
    answer: 2,
    explanation: "A well-known disadvantage of written constitutions is their legalistic rigidity, causing frequent constitutional litigation such that it 'becomes a plaything in the hands of lawyers and courts.' Option A describes unwritten constitutions, while B and D describe advantages.",
    category: "COC Exam"
  },

  // ── Introduction to Emerging Technologies (Q26 - Q30) ──
  {
    id: "hu-2024-coc-emte-26",
    university: "Haramaya University",
    year: "2024 Exam",
    course: "Emerging Technologies",
    question: "Which one of the following is odd?",
    options: [
      "HTC Vive",
      "Google Cardboard",
      "Oculus Rift",
      "Magic Leap One"
    ],
    answer: 3,
    explanation: "HTC Vive, Google Cardboard, and Oculus Rift are dedicated Virtual Reality (VR) headsets. In contrast, Magic Leap One is an Augmented Reality (AR) / Mixed Reality (MR) spatial computing device.",
    category: "COC Exam"
  },
  {
    id: "hu-2024-coc-emte-27",
    university: "Haramaya University",
    year: "2024 Exam",
    course: "Emerging Technologies",
    question: "Which of the followings cannot be the possible reasons of clustering computer?",
    options: [
      "To invest more resource",
      "For resource pooling",
      "Individual computers are often inadequate for handling big data",
      "To increase the computational power of computers"
    ],
    answer: 0,
    explanation: "Clustering is implemented to pool computing resources, scale computing power, and handle big data workloads cost-effectively. 'To invest more resource' (incurring unnecessary expenditure/resource consumption) is not a purpose or reason for clustering.",
    category: "COC Exam"
  },
  {
    id: "hu-2024-coc-emte-28",
    university: "Haramaya University",
    year: "2024 Exam",
    course: "Emerging Technologies",
    question: "Which one of the following statements is incorrect?",
    options: [
      "Deep learning is the computations of multiplayer neural network feasible.",
      "Artificial intelligence is a techniques which enables machines to mimic human behavior.",
      "Data science is the extractions of knowledge from data by using different techniques and algorithms.",
      "Machine learning is a subset of deep learning technique which uses statistical methods to enable machine to improve with experience."
    ],
    answer: 3,
    explanation: "Statement D is incorrect: Deep learning is a specialized subset of machine learning (DL ⊂ ML ⊂ AI), not the other way around.",
    category: "COC Exam"
  },
  {
    id: "hu-2024-coc-emte-29",
    university: "Haramaya University",
    year: "2024 Exam",
    course: "Emerging Technologies",
    question: "What level of Artificial Intelligence maturity has been described as \"What should I always do\"?",
    options: [
      "Prediction",
      "Prevention",
      "Suggestion",
      "Automation"
    ],
    answer: 3,
    explanation: "In AI decision maturity stages: Prediction addresses 'What will happen?'; Suggestion addresses 'What should I do?'; and Automation addresses 'What should I always do?' through continuous, autonomous decision execution.",
    category: "COC Exam"
  },
  {
    id: "hu-2024-coc-emte-30",
    university: "Haramaya University",
    year: "2024 Exam",
    course: "Emerging Technologies",
    question: "Suppose a robber stole your smart mobile phone from your pocket. But your smartphone has a sensor that determines its exact location. By using this sensor, you are able to track the phone as the thief moves from place to place, and you recover the lost phone by tracing its exact coordinates. What type of sensor did your mobile phone use?",
    options: [
      "Application Sensor",
      "Motion Sensors",
      "Environmental Sensor",
      "Position Sensor"
    ],
    answer: 3,
    explanation: "Sensors that determine physical position, geographical coordinates, and spatial tracking (such as GPS) are categorized as Position / Location Sensors.",
    category: "COC Exam"
  }
];

// Check if any ID already exists
const existingIds = new Set(data.map(q => q.id));
let addedCount = 0;

for (const q of newQuestions) {
  if (!existingIds.has(q.id)) {
    data.push(q);
    existingIds.add(q.id);
    addedCount++;
  } else {
    console.log(`Skipping already existing ID: ${q.id}`);
  }
}

fs.writeFileSync(EXAMS_PATH, JSON.stringify(data, null, 2), 'utf8');
console.log(`Successfully added ${addedCount} questions. Total questions in database: ${data.length}`);
