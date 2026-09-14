const fs = require('fs');
const path = require('path');

const examsPath = path.join(__dirname, '..', 'data', 'exams.json');
const exams = JSON.parse(fs.readFileSync(examsPath, 'utf8'));

const newQuestions = [
  // --- Part I: Comprehension Questions ---
  {
    id: "eng-hu-2020-covid-01",
    university: "Haramaya University",
    year: "2020 Exam",
    course: "Communicative English",
    category: "Final Exam",
    question: "According to the passage 'What sets good and bad leaders apart in the coronavirus era?', which one of the following characteristics is FALSE about good leaders?",
    options: [
      "Listen to their citizens and use science",
      "Never make decisions disliked by their people",
      "Prioritize things to be done",
      "Never allow fake news disturb them"
    ],
    answer: 1,
    explanation: "Paragraph 6 clearly states that good leaders 'display courage and timing in making critical and sometimes unpopular decisions.' Therefore, saying they 'never make decisions disliked by their people' is false."
  },
  {
    id: "eng-hu-2020-covid-02",
    university: "Haramaya University",
    year: "2020 Exam",
    course: "Communicative English",
    category: "Final Exam",
    question: "In the passage, Hamilton seems to assess the extent and severity of the COVID-19 crisis primarily based on:",
    options: [
      "Democracies and non-democracies",
      "Developed and underdeveloped regions",
      "Lost lives and prevalence of the virus",
      "Women leaders and male leaders"
    ],
    answer: 2,
    explanation: "The author measures the crisis by outcome data: 'lives saved and control of the spread of the virus' and notes that poorly performing nations 'lead in infections and deaths'."
  },
  {
    id: "eng-hu-2020-covid-03",
    university: "Haramaya University",
    year: "2020 Exam",
    course: "Communicative English",
    category: "Final Exam",
    question: "Based on the passage, what does the author think about South African President Cyril Ramaphosa's leadership?",
    options: [
      "A best leader",
      "Among the worst leaders",
      "A religious leader",
      "Neither the best nor the worst leader"
    ],
    answer: 3,
    explanation: "The author takes a nuanced view: Ramaphosa was 'off to a great start' and 'acted firmly... kept the infection rate nearly as low as South Korea,' but made 'problematic decisions' (banning tobacco, allowing religious gatherings) showing paternalism, making him neither entirely the best nor the worst."
  },
  {
    id: "eng-hu-2020-covid-04",
    university: "Haramaya University",
    year: "2020 Exam",
    course: "Communicative English",
    category: "Final Exam",
    question: "The best sub-title for the ideas discussed in paragraphs 6, 7, and 8 of the passage could be:",
    options: [
      "Democracy and coronavirus pandemic",
      "Women leaders in Europe",
      "The power of citizens",
      "Leadership and democracy"
    ],
    answer: 3,
    explanation: "These paragraphs explore how democracy provides a framework, but elected leadership quality and priorities are the actual deciding factors in saving lives."
  },
  {
    id: "eng-hu-2020-covid-05",
    university: "Haramaya University",
    year: "2020 Exam",
    course: "Communicative English",
    category: "Final Exam",
    question: "Which one of the following assertions is TRUE, according to Lawrence Hamilton?",
    options: [
      "Health is more than being free from disease",
      "Women are better than men",
      "Religious assembly should not be prohibited",
      "Democracy guarantees good judgment."
    ],
    answer: 0,
    explanation: "The author explicitly defines health in the final paragraph: 'health is not the \"absence of disease\" but the status we each have when our ever-changing needs are optimally satisfied.'"
  },
  {
    id: "eng-hu-2020-covid-06",
    university: "Haramaya University",
    year: "2020 Exam",
    course: "Communicative English",
    category: "Final Exam",
    question: "According to the concluding recommendations of the passage, citizens must:",
    options: [
      "Not worry too much about COVID-19",
      "Remove their leaders in the next election",
      "Be satisfied with bread only",
      "Prevent self-interested individuals (oligarchs) from power"
    ],
    answer: 3,
    explanation: "Hamilton writes: 'we must learn to keep oligarchs away from political power... keep those with exclusive social and economic interests out of positions of political power.'"
  },
  {
    id: "eng-hu-2020-covid-07",
    university: "Haramaya University",
    year: "2020 Exam",
    course: "Communicative English",
    category: "Final Exam",
    question: "Which one of the following facts is TRUE about the United States and Brazil as discussed in the text?",
    options: [
      "Their leaders are open and kind to their people",
      "They are found in the same continent",
      "They are led by elected leaders",
      "The leaders have focused on the well-being of their citizens"
    ],
    answer: 2,
    explanation: "The passage introduces both under 'democratic regimes' led by elected presidents Donald Trump and Jair Bolsonaro."
  },
  {
    id: "eng-hu-2020-covid-08",
    university: "Haramaya University",
    year: "2020 Exam",
    course: "Communicative English",
    category: "Final Exam",
    question: "In the last paragraph of the passage, Hamilton:",
    options: [
      "Summarizes the discussion",
      "Answers the question: what is to be done?",
      "Explains the difference",
      "Hypothesizes"
    ],
    answer: 1,
    explanation: "The last paragraph begins: 'Two things can be learnt from the varied responses... find a roadmap for how we can properly make the health and well-being... the raison d'être of its government,' answering the opening question 'What can be done about it?'"
  },
  {
    id: "eng-hu-2020-covid-09",
    university: "Haramaya University",
    year: "2020 Exam",
    course: "Communicative English",
    category: "Final Exam",
    question: "Look at the title of the article ('What sets good and bad leaders apart in the coronavirus era?'). According to the author, their ________ sets them apart:",
    options: [
      "Education",
      "Life experience",
      "Wealth",
      "Priority"
    ],
    answer: 3,
    explanation: "Hamilton explicitly notes: 'What matters most is what kind of leader is in place, where his or her priorities lie: the well-being of the populace or the interests of a small group.'"
  },
  {
    id: "eng-hu-2020-covid-10",
    university: "Haramaya University",
    year: "2020 Exam",
    course: "Communicative English",
    category: "Final Exam",
    question: "Based on the article's date (June 7, 2020) and the exam context, the article was published:",
    options: [
      "A year ago",
      "Last month",
      "Seven years ago",
      "Recently"
    ],
    answer: 3,
    explanation: "The article was published on June 7, 2020, which was recent relative to the 2020 examination period."
  },

  // --- Part I: Reference Questions ---
  {
    id: "eng-hu-2020-covid-11",
    university: "Haramaya University",
    year: "2020 Exam",
    course: "Communicative English",
    category: "Final Exam",
    question: "In the passage: 'In the main, democracies have fared better than non-democracies... But the record is very varied indeed. What explains this?' The word 'this' refers to:",
    options: [
      "The record",
      "Democracies did better",
      "The variation in democratic performance",
      "The crisis"
    ],
    answer: 2,
    explanation: "'This' refers to the fact that the record among democracies is very varied (some doing exceptionally well while others performed terribly)."
  },
  {
    id: "eng-hu-2020-covid-12",
    university: "Haramaya University",
    year: "2020 Exam",
    course: "Communicative English",
    category: "Final Exam",
    question: "In the sentence: 'Among democratic regimes, at the one extreme we have seen denialism... At the other we have witnessed the organized, prudent, empathetic responses...', the pronoun 'we' refers to:",
    options: [
      "Politicians",
      "Americans",
      "Researchers",
      "The public / observers in society"
    ],
    answer: 3,
    explanation: "'We' is used inclusively by the author to refer to observers, readers, and global society witnessing the pandemic response."
  },
  {
    id: "eng-hu-2020-covid-13",
    university: "Haramaya University",
    year: "2020 Exam",
    course: "Communicative English",
    category: "Final Exam",
    question: "In the passage: 'South Africans have just emerged from one of the most severe lockdowns imposed anywhere in the world. This kept the infection rate nearly as low as that of South Korea...', the word 'This' refers to:",
    options: [
      "South Africa",
      "The lockdown",
      "Public trust",
      "People's behavior"
    ],
    answer: 1,
    explanation: "'This' directly refers to the severe lockdown imposed by the South African government."
  },
  {
    id: "eng-hu-2020-covid-14",
    university: "Haramaya University",
    year: "2020 Exam",
    course: "Communicative English",
    category: "Final Exam",
    question: "In the sentence: 'This kept the infection rate nearly as low as that of South Korea, though it is now shooting up.', the pronoun 'it' refers to:",
    options: [
      "The infection rate",
      "COVID-19",
      "The lockdown",
      "The crisis"
    ],
    answer: 0,
    explanation: "'It' refers to 'the infection rate' which was previously low but now shooting up."
  },
  {
    id: "eng-hu-2020-covid-15",
    university: "Haramaya University",
    year: "2020 Exam",
    course: "Communicative English",
    category: "Final Exam",
    question: "In the sentence: 'Even if we could distinguish sharply between basic needs and other needs - something I dispute - the idea that addiction to smoking falls into the latter category...', the phrase 'the latter' refers to:",
    options: [
      "Other needs",
      "Respiratory disease",
      "Basic needs",
      "Smoking"
    ],
    answer: 0,
    explanation: "In the dichotomy 'basic needs (former) and other needs (latter)', 'the latter' refers to 'other needs'."
  },
  {
    id: "eng-hu-2020-covid-16",
    university: "Haramaya University",
    year: "2020 Exam",
    course: "Communicative English",
    category: "Final Exam",
    question: "In the sentence: 'Two things can be learnt from the varied responses to the coronavirus crisis. First, we must use it to find a roadmap...', the pronoun 'it' refers to:",
    options: [
      "COVID-19",
      "The coronavirus crisis (the experience/response)",
      "The government",
      "Well-being"
    ],
    answer: 1,
    explanation: "'It' refers back to 'the coronavirus crisis' / the lessons learned from the crisis."
  },

  // --- Part I: Vocabulary Questions ---
  {
    id: "eng-hu-2020-covid-17",
    university: "Haramaya University",
    year: "2020 Exam",
    course: "Communicative English",
    category: "Final Exam",
    question: "What is the most likely meaning of the word 'lauded' as used in: 'South Africa's response has been lauded, though it is beginning to attract criticism'?",
    options: [
      "Strongly stressed",
      "Condemned",
      "Praised",
      "Lowered"
    ],
    answer: 2,
    explanation: "'Lauded' means highly praised, commended, or acclaimed."
  },
  {
    id: "eng-hu-2020-covid-18",
    university: "Haramaya University",
    year: "2020 Exam",
    course: "Communicative English",
    category: "Final Exam",
    question: "What is the meaning of 'engender' in: 'That is why democracy is uniquely placed to engender good judgements'?",
    options: [
      "Threaten",
      "Endanger",
      "Produce / generate",
      "Prohibit"
    ],
    answer: 2,
    explanation: "To 'engender' means to cause, generate, produce, or bring about."
  },
  {
    id: "eng-hu-2020-covid-19",
    university: "Haramaya University",
    year: "2020 Exam",
    course: "Communicative English",
    category: "Final Exam",
    question: "What is the meaning of 'purveyors' in: 'If the purveyors of conspiracy theories and exemplars of prejudice are also your democratic leaders'?",
    options: [
      "Filters",
      "Spreaders / promoters",
      "Lovers",
      "Fighters"
    ],
    answer: 1,
    explanation: "A 'purveyor' is someone who spreads, promotes, or provides goods or ideas to others."
  },
  {
    id: "eng-hu-2020-covid-20",
    university: "Haramaya University",
    year: "2020 Exam",
    course: "Communicative English",
    category: "Final Exam",
    question: "What is the meaning of 'deference' in: 'seeming deference to South Africa's powerful religious lobby'?",
    options: [
      "Variation",
      "Opposition",
      "Agreement",
      "Respectful submission"
    ],
    answer: 3,
    explanation: "'Deference' means humble submission, yielding, or showing respectful compliance to another's wishes."
  },
  {
    id: "eng-hu-2020-covid-21",
    university: "Haramaya University",
    year: "2020 Exam",
    course: "Communicative English",
    category: "Final Exam",
    question: "What is the meaning of the French loan phrase 'raison d'être' in: 'make the health and well-being of a state's population the raison d'être of its government'?",
    options: [
      "Reason / ultimate purpose for existence",
      "Financial profit",
      "Weakness",
      "Emergency measure"
    ],
    answer: 0,
    explanation: "'Raison d'être' literally means 'reason for being'—the fundamental purpose or essential reason for an entity's existence."
  },
  {
    id: "eng-hu-2020-covid-22",
    university: "Haramaya University",
    year: "2020 Exam",
    course: "Communicative English",
    category: "Final Exam",
    question: "What is the meaning of 'bar' in: 'Under representative democracy, bar outright revolution, we do not have the power to affect the everyday decisions...'?",
    options: [
      "Except (apart from)",
      "Metal pole",
      "Blockade",
      "Also"
    ],
    answer: 0,
    explanation: "As a preposition, 'bar' means 'except for' or 'excluding' ('bar outright revolution' = except in the case of outright revolution)."
  },

  // --- Part II: Grammar (Indirect Reported Speech) ---
  {
    id: "eng-hu-2020-covid-23",
    university: "Haramaya University",
    year: "2020 Exam",
    course: "Communicative English",
    category: "Final Exam",
    question: "Complete blank (23) in indirect speech: 'Ms. N., who was suffering from malignant bowel obstruction, asked John Wales, who was her home palliative care physician, to sing for her, although she _____ (23) at the gate of death.'",
    options: [
      "is",
      "was",
      "were",
      "has been"
    ],
    answer: 1,
    explanation: "In reported speech shifting from direct present ('I'm dying'), the past tense 'was' is required: 'she was at the gate of death'."
  },
  {
    id: "eng-hu-2020-covid-24",
    university: "Haramaya University",
    year: "2020 Exam",
    course: "Communicative English",
    category: "Final Exam",
    question: "Complete blank (24) in indirect speech: 'He told her that he had never sung for a patient before, and _____ (24) visit wasn't about him...'",
    options: [
      "this",
      "that",
      "these",
      "those"
    ],
    answer: 1,
    explanation: "Direct demonstrative 'this' shifts to 'that' in indirect reported speech ('that visit')."
  },
  {
    id: "eng-hu-2020-covid-25",
    university: "Haramaya University",
    year: "2020 Exam",
    course: "Communicative English",
    category: "Final Exam",
    question: "Complete blank (25) in indirect speech: '...that visit wasn't about _____ (25); it was about her.'",
    options: [
      "me",
      "him",
      "he",
      "his"
    ],
    answer: 1,
    explanation: "The first-person object pronoun 'me' (referring to Dr. John Wales) shifts to third-person object pronoun 'him'."
  },
  {
    id: "eng-hu-2020-covid-26",
    university: "Haramaya University",
    year: "2020 Exam",
    course: "Communicative English",
    category: "Final Exam",
    question: "Complete blank (26) in indirect speech: '...it was about _____ (26).'",
    options: [
      "you",
      "her",
      "she",
      "hers"
    ],
    answer: 1,
    explanation: "The second-person pronoun 'you' (referring to Ms. N.) shifts to the third-person feminine object pronoun 'her'."
  },
  {
    id: "eng-hu-2020-covid-27",
    university: "Haramaya University",
    year: "2020 Exam",
    course: "Communicative English",
    category: "Final Exam",
    question: "Complete blank (27) in indirect speech: 'However, Ms. N. insisted that _____ (27) had to.'",
    options: [
      "I",
      "she",
      "he",
      "they"
    ],
    answer: 2,
    explanation: "Ms. N. insisted to Dr. John Wales ('you must'), which shifts in reported speech to 'he had to'."
  },
  {
    id: "eng-hu-2020-covid-28",
    university: "Haramaya University",
    year: "2020 Exam",
    course: "Communicative English",
    category: "Final Exam",
    question: "Complete blank (28) in indirect speech: 'John Wales explained that _____ (28) was asking him to cross a boundary...'",
    options: [
      "you",
      "she",
      "he",
      "it"
    ],
    answer: 1,
    explanation: "Dr. Wales addressed Ms. N. ('You are asking me...'), shifting to third-person subject pronoun 'she'."
  },
  {
    id: "eng-hu-2020-covid-29",
    university: "Haramaya University",
    year: "2020 Exam",
    course: "Communicative English",
    category: "Final Exam",
    question: "Complete blank (29) in indirect speech: 'John Wales explained that she _____ (29) asking him to cross a boundary...'",
    options: [
      "is",
      "was",
      "are",
      "were"
    ],
    answer: 1,
    explanation: "Present continuous 'are asking' backshifts to past continuous 'was asking'."
  },
  {
    id: "eng-hu-2020-covid-30",
    university: "Haramaya University",
    year: "2020 Exam",
    course: "Communicative English",
    category: "Final Exam",
    question: "Complete blank (30) in indirect speech: '...she was asking _____ (30) to cross a boundary...'",
    options: [
      "me",
      "him",
      "his",
      "he"
    ],
    answer: 1,
    explanation: "Direct 'asking me' shifts to 'asking him' (referring to Dr. John Wales)."
  },
  {
    id: "eng-hu-2020-covid-31",
    university: "Haramaya University",
    year: "2020 Exam",
    course: "Communicative English",
    category: "Final Exam",
    question: "Complete blank (31) in indirect speech: '...appropriate to _____ (31) clinical roles.'",
    options: [
      "our",
      "their",
      "his",
      "her"
    ],
    answer: 1,
    explanation: "First-person plural possessive 'our clinical roles' shifts to third-person plural 'their clinical roles'."
  },
  {
    id: "eng-hu-2020-covid-32",
    university: "Haramaya University",
    year: "2020 Exam",
    course: "Communicative English",
    category: "Final Exam",
    question: "Complete blank (32) in indirect speech: 'He said that _____ (32) learned in medical school to maintain a distance...'",
    options: [
      "we",
      "they",
      "he",
      "you"
    ],
    answer: 1,
    explanation: "Direct 'We learn in medical school' shifts to 'they learned in medical school'."
  },
  {
    id: "eng-hu-2020-covid-33",
    university: "Haramaya University",
    year: "2020 Exam",
    course: "Communicative English",
    category: "Final Exam",
    question: "Complete blank (33) in indirect speech: '...to maintain a distance between _____ (33) and their patients.'",
    options: [
      "ourselves",
      "themselves",
      "himself",
      "them"
    ],
    answer: 1,
    explanation: "Reflexive pronoun 'ourselves' shifts to third-person plural reflexive 'themselves'."
  },
  {
    id: "eng-hu-2020-covid-34",
    university: "Haramaya University",
    year: "2020 Exam",
    course: "Communicative English",
    category: "Final Exam",
    question: "Complete blank (34) in indirect speech: '...between themselves and _____ (34) patients.'",
    options: [
      "our",
      "their",
      "his",
      "her"
    ],
    answer: 1,
    explanation: "Possessive pronoun 'our patients' shifts to 'their patients'."
  },

  // --- Part II: Cloze / Word Bank ---
  {
    id: "eng-hu-2020-covid-35",
    university: "Haramaya University",
    year: "2020 Exam",
    course: "Communicative English",
    category: "Final Exam",
    question: "Fill in blank (35) from the word bank: 'Love is something that is cultivated between two people and grows over time... _____ (35) involves commitment, time, mutual trust, and acceptance.'",
    options: [
      "It",
      "He",
      "Which",
      "Who"
    ],
    answer: 0,
    explanation: "'It' is the personal subject pronoun referring back to the abstract singular noun 'Love'."
  },
  {
    id: "eng-hu-2020-covid-36",
    university: "Haramaya University",
    year: "2020 Exam",
    course: "Communicative English",
    category: "Final Exam",
    question: "Fill in blank (36) from the word bank: '...lust blurs our ability to see a person for _____ (36) he or she truly is, and consequently, it may or may not lead to a long-term relationship.'",
    options: [
      "who",
      "whom",
      "which",
      "whose"
    ],
    answer: 0,
    explanation: "In modern English grammar, predicate nominative after the linking verb 'is' takes 'who'."
  },
  {
    id: "eng-hu-2020-covid-37",
    university: "Haramaya University",
    year: "2020 Exam",
    course: "Communicative English",
    category: "Final Exam",
    question: "Fill in blank (37) from the word bank: 'Pharmacology is a branch of medicine, biology and pharmaceutical sciences concerned with drug or medication action, _____ (37) a drug may be defined as any artificial, natural, or endogenous molecule...'",
    options: [
      "where",
      "which",
      "who",
      "whom"
    ],
    answer: 0,
    explanation: "'Where' is used here as a relative adverb meaning 'in which discipline / context'."
  },
  {
    id: "eng-hu-2020-covid-38",
    university: "Haramaya University",
    year: "2020 Exam",
    course: "Communicative English",
    category: "Final Exam",
    question: "Fill in blank (38) from the word bank: '...any artificial, natural, or endogenous molecule _____ (38) exerts a biochemical or physiological effect on the cell, tissue, organ, or organism...'",
    options: [
      "which",
      "who",
      "whom",
      "where"
    ],
    answer: 0,
    explanation: "'Which' is the relative pronoun used to refer to inanimate objects and molecules ('molecule which exerts...')."
  },
  {
    id: "eng-hu-2020-covid-39",
    university: "Haramaya University",
    year: "2020 Exam",
    course: "Communicative English",
    category: "Final Exam",
    question: "Fill in blank (39) from the word bank: 'If substances have medicinal properties, they _____ (39) pharmaceuticals.'",
    options: [
      "are considered",
      "considered",
      "must",
      "where"
    ],
    answer: 0,
    explanation: "Passive voice in present tense requires auxiliary verb + past participle: 'they are considered pharmaceuticals'."
  }
];

// Verify IDs are unique
const existingIds = new Set(exams.map(e => e.id));
const duplicates = newQuestions.filter(q => existingIds.has(q.id));
if (duplicates.length > 0) {
  console.error('Error: duplicate IDs found:', duplicates.map(d => d.id));
  process.exit(1);
}

// Append and save
const updatedExams = [...exams, ...newQuestions];
fs.writeFileSync(examsPath, JSON.stringify(updatedExams, null, 2), 'utf8');

console.log(`Successfully added ${newQuestions.length} questions to Haramaya University English 2020 Final Exam.`);
console.log(`Total questions in exams.json: ${updatedExams.length}`);
