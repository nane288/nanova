const fs = require('fs');
const path = require('path');

const examsPath = path.join(__dirname, '..', 'data', 'exams.json');
const exams = JSON.parse(fs.readFileSync(examsPath, 'utf8'));

const newQuestions = [
  {
    id: "hu-crit-final-mc-41",
    university: "Haramaya University",
    year: "2021 Exam",
    course: "Logic and Critical Thinking",
    category: "Final Exam",
    question: "The doctrine that advocates the idea that truth is a matter of opinion is:",
    options: [
      "Socio-centrism",
      "Cultural relativism",
      "Subjectivism",
      "Objectivism",
      "Universalism"
    ],
    answer: 2,
    explanation: "Subjectivism is the relativistic claim that truth is not objective or independent of the observer, but is strictly a matter of personal opinion, belief, or feelings."
  },
  {
    id: "hu-crit-final-mc-42",
    university: "Haramaya University",
    year: "2021 Exam",
    course: "Logic and Critical Thinking",
    category: "Final Exam",
    question: "Social Darwinists such as Herbert Spencer hold that the development and structure of human societies can be explained in terms of evolutionary principles such as the survival of the fittest. But I reject Social Darwinism because Spencer was a real bonehead. What kind of fallacy is committed?",
    options: [
      "Appeal to force",
      "Appeal to people",
      "Tu quoque",
      "Ad hominem abusive",
      "Ad hominem circumstantial"
    ],
    answer: 3,
    explanation: "Ad hominem abusive is committed when an arguer attacks or insults the person's character or intelligence ('Spencer was a real bonehead') instead of addressing the merits of their substantive claim."
  },
  {
    id: "hu-crit-final-mc-43",
    university: "Haramaya University",
    year: "2021 Exam",
    course: "Logic and Critical Thinking",
    category: "Final Exam",
    question: "Intelligent, refined people insist on the best wines. And our Old World Merlot is the best red wine available. Obviously, Old World Merlot is for you. What fallacy is committed?",
    options: [
      "Division",
      "Complex question",
      "False dichotomy",
      "Appeal to the people (Snobbery)",
      "Vanity"
    ],
    answer: 3,
    explanation: "Appeal to the people via snobbery attempts to persuade the audience by associating the conclusion with being part of an elite, intelligent, or refined group."
  },
  {
    id: "hu-crit-final-mc-44",
    university: "Haramaya University",
    year: "2021 Exam",
    course: "Logic and Critical Thinking",
    category: "Final Exam",
    question: "The school needs a football team. I hope you agree. One thing I can tell you for sure: If you want to fit in around here, you'll see this issue the way the rest of us do. And we all think the school needs a football team. What fallacy is committed?",
    options: [
      "Appeal to pity",
      "Appeal to the people (Bandwagon / Peer pressure)",
      "Accident",
      "Red herring",
      "Straw man"
    ],
    answer: 1,
    explanation: "This argument uses the desire to fit in, group pressure, and conformism ('If you want to fit in around here...') to win assent rather than offering relevant evidence."
  },
  {
    id: "hu-crit-final-mc-45",
    university: "Haramaya University",
    year: "2021 Exam",
    course: "Logic and Critical Thinking",
    category: "Final Exam",
    question: "My grandfather Joe is a child. No child should have to work for a living. So, Grandfather Joe should not have to work for a living. What kind of fallacy is committed?",
    options: [
      "Amphiboly",
      "Equivocation",
      "Complex question",
      "Begging the question",
      "Composition"
    ],
    answer: 1,
    explanation: "The fallacy of equivocation occurs because the term 'child' shifts meaning between premises: first used metaphorically (an elderly dependent person) and second used in its literal legal/chronological sense (a minor)."
  },
  {
    id: "hu-crit-final-mc-46",
    university: "Haramaya University",
    year: "2021 Exam",
    course: "Logic and Critical Thinking",
    category: "Final Exam",
    question: "The quality of a categorical proposition is either affirmative or negative depending on whether:",
    options: [
      "It has existential import.",
      "It affirms or denies class membership.",
      "It denotes one or more classes.",
      "The classes it denotes are empty or have at least one member.",
      "It is particular or universal."
    ],
    answer: 1,
    explanation: "In formal logic, the 'quality' of a categorical proposition refers to whether it affirms class membership (A and I propositions) or denies class membership (E and O propositions). Quantity refers to whether it is universal or particular."
  },
  {
    id: "hu-crit-final-mc-47",
    university: "Haramaya University",
    year: "2021 Exam",
    course: "Logic and Critical Thinking",
    category: "Final Exam",
    question: "Consider the following: 'Either you are with us or you are against us.' The fallacy committed in this argument is:",
    options: [
      "Begging the question",
      "Complex question",
      "False dichotomy",
      "Suppressed evidence",
      "Amphiboly"
    ],
    answer: 2,
    explanation: "A false dichotomy (false dilemma) presents two extreme alternatives as the only possibilities when in fact other reasonable intermediate alternatives exist."
  },
  {
    id: "hu-crit-final-mc-48",
    university: "Haramaya University",
    year: "2021 Exam",
    course: "Logic and Critical Thinking",
    category: "Final Exam",
    question: "Consider the following immediate inference: 'Some students are lovers of logic. Therefore, ______________' Using the modern square of opposition (Boolean interpretation), which alternative makes this immediate inference valid?",
    options: [
      "It is false that all students are lovers of logic.",
      "It is true that no students are lovers of logic.",
      "It is false that some students are lovers of logic.",
      "It is false that no students are lovers of logic.",
      "Some non-students are lovers of logic."
    ],
    answer: 3,
    explanation: "On the modern square of opposition, contradictory propositions always have opposite truth values. 'Some students are lovers of logic' (I proposition) is the contradictory of 'No students are lovers of logic' (E proposition). If the I proposition is true, then its contradictory E must be false ('It is false that no students are lovers of logic')."
  },
  {
    id: "hu-crit-final-mc-49",
    university: "Haramaya University",
    year: "2021 Exam",
    course: "Logic and Critical Thinking",
    category: "Final Exam",
    question: "If you were to make a Venn diagram for the categorical proposition 'It is false that All S are P.', what would you do? (Region 1 = S only, Region 2 = S ∩ P, Region 3 = P only)",
    options: [
      "Shade all of area 1",
      "Shade all of area 2",
      "Shade all of area 3",
      "Put an X in area 1",
      "Put an X in area 2"
    ],
    answer: 3,
    explanation: "'All S are P' states that area 1 (S outside of P) is empty (shaded). Saying 'It is false that All S are P' is logically equivalent to the contradictory O proposition: 'Some S are not P', which asserts there exists at least one member in area 1, represented by placing an 'X' in area 1."
  },
  {
    id: "hu-crit-final-mc-50",
    university: "Haramaya University",
    year: "2021 Exam",
    course: "Logic and Critical Thinking",
    category: "Final Exam",
    question: "A fallacy that is committed when an arguer draws a conclusion based on a sample that is too small or not randomly selected is:",
    options: [
      "Weak analogy",
      "Appeal to ignorance",
      "Unqualified authority",
      "Hasty generalization",
      "False cause"
    ],
    answer: 3,
    explanation: "Hasty generalization (converse accident) occurs when a general conclusion is drawn from a sample that is unrepresentative, atypical, or too small."
  },
  {
    id: "hu-crit-final-mc-51",
    university: "Haramaya University",
    year: "2021 Exam",
    course: "Logic and Critical Thinking",
    category: "Final Exam",
    question: "When two categorical propositions necessarily have opposite truth values in every situation, they stand in a __________ relationship.",
    options: [
      "Contrary",
      "Subcontrary",
      "Subalternation",
      "Contradictory",
      "Superalternation"
    ],
    answer: 3,
    explanation: "Contradictory propositions (A & O, and E & I) are exact logical opposites: if one is true, the other must be false, and vice versa."
  },
  {
    id: "hu-crit-final-mc-52",
    university: "Haramaya University",
    year: "2021 Exam",
    course: "Logic and Critical Thinking",
    category: "Final Exam",
    question: "The principle which requires that each participant in a discussion of a disputed issue should be willing to accept the fact that he or she is mistaken, which means that one must acknowledge that one's own initial view may not be the most defensible position on the question is:",
    options: [
      "Truth seeking principle",
      "Fallibility principle",
      "Principle of charity",
      "Resolution principle",
      "Suspension of judgment principle"
    ],
    answer: 1,
    explanation: "The fallibility principle in critical thinking demands intellectual humility—accepting from the outset that one's initial position may be incorrect and being willing to concede when shown superior evidence."
  },
  {
    id: "hu-crit-final-mc-53",
    university: "Haramaya University",
    year: "2021 Exam",
    course: "Logic and Critical Thinking",
    category: "Final Exam",
    question: "The principle which requires that the responsibility of providing evidence for any position usually rests on the participant who sets forth the argument is:",
    options: [
      "The relevance principle",
      "The consistency principle",
      "The burden of proof principle",
      "The logical correctness principle",
      "The clarity principle"
    ],
    answer: 2,
    explanation: "The burden of proof principle requires that whoever advances a claim or affirmative position bears the obligation to provide adequate supporting justification."
  }
];

// Append and save
const updatedExams = [...exams, ...newQuestions];
fs.writeFileSync(examsPath, JSON.stringify(updatedExams, null, 2), 'utf8');

console.log(`Successfully added ${newQuestions.length} questions to Haramaya University Logic 2021 Final Exam.`);
console.log(`Total questions in exams.json: ${updatedExams.length}`);
