const fs = require('fs');
const path = require('path');

const examsPath = path.resolve(__dirname, '../data/exams.json');
const exams = JSON.parse(fs.readFileSync(examsPath, 'utf8'));

// 1. Update the 2013 E.C. exam (hu-crit-final-*) from '2022 Exam' to '2021 Exam'
let updated2021Count = 0;
exams.forEach((q) => {
  if (q.id && q.id.startsWith('hu-crit-final-')) {
    q.year = '2021 Exam';
    updated2021Count++;
  }
});
console.log(`Updated ${updated2021Count} questions of 2013 E.C. final exam to year '2021 Exam'.`);

// 2. Define the new 40 questions from Haramaya University 2014 E.C. (2022 G.C.) Final Exam
const newQuestions = [
  // PART ONE: MULTIPLE CHOICE (1 - 30)
  {
    id: 'hu-logic-2022-final-mc-01',
    university: 'Haramaya University',
    year: '2022 Exam',
    course: 'Logic and Critical Thinking',
    category: 'Final Exam',
    question: 'What is the converse of the proposition "No humans are morally perfect beings"?',
    options: [
      'All humans are morally perfect beings.',
      'No morally perfect beings are humans.',
      'All humans are non morally perfect beings.',
      'No non humans are non morally perfect beings.',
      'Some humans are morally perfect beings.'
    ],
    answer: 1,
    explanation: 'Conversion consists of switching the subject and predicate terms. For the E-proposition ("No S are P"), the converse is "No P are S", which yields "No morally perfect beings are humans". Conversion is logically valid for E and I propositions.'
  },
  {
    id: 'hu-logic-2022-final-mc-02',
    university: 'Haramaya University',
    year: '2022 Exam',
    course: 'Logic and Critical Thinking',
    category: 'Final Exam',
    question: 'What is the obverse of the proposition "All boxers who admire Hurricane Carter are winners"?',
    options: [
      'All winners are boxers who admire Hurricane Carter.',
      'No boxers who admire Hurricane Carter are winners.',
      'No boxers who admire Hurricane Carter are non winners.',
      'Some boxers who admire Hurricane Carter are winners.',
      'Some boxers who admire Hurricane Carter are non winners.'
    ],
    answer: 2,
    explanation: 'Obversion requires changing the quality of the proposition (from affirmative to negative, or vice versa) and replacing the predicate term with its term complement. For the A-proposition "All S are P", the obverse is "No S are non-P", giving "No boxers who admire Hurricane Carter are non winners".'
  },
  {
    id: 'hu-logic-2022-final-mc-03',
    university: 'Haramaya University',
    year: '2022 Exam',
    course: 'Logic and Critical Thinking',
    category: 'Final Exam',
    question: 'What is the contrapositive of the following proposition? "All bureaucrats are spies"',
    options: [
      'All spies are bureaucrats.',
      'Some bureaucrats are spies.',
      'All non spies are non bureaucrats.',
      'No bureaucrats are spies.',
      'Some spies are not non bureaucrats.'
    ],
    answer: 2,
    explanation: 'Contraposition consists of switching the subject and predicate terms and replacing both with their term complements. For the A-proposition ("All S are P"), the contrapositive is "All non-P are non-S", resulting in "All non spies are non bureaucrats".'
  },
  {
    id: 'hu-logic-2022-final-mc-04',
    university: 'Haramaya University',
    year: '2022 Exam',
    course: 'Logic and Critical Thinking',
    category: 'Final Exam',
    question: 'Which one of the following statement is false about the meaning of critical thinking?',
    options: [
      'It is an active, persistent and careful consideration of beliefs and knowledge and their grounds.',
      'It is being thoughtful about the problems and questions.',
      'It involves knowing the method of logical reasoning.',
      'It is thinking about our beliefs and conceptions.',
      'None.'
    ],
    answer: 4,
    explanation: 'All of the statements (A, B, C, and D) are accurate characterizations of critical thinking according to classical definitions (such as John Dewey\'s). Therefore, none of the statements is false.'
  },
  {
    id: 'hu-logic-2022-final-mc-05',
    university: 'Haramaya University',
    year: '2022 Exam',
    course: 'Logic and Critical Thinking',
    category: 'Final Exam',
    question: 'What is the main idea of logical correctness?',
    options: [
      'It is concerned with true information.',
      'It is about getting detail and certain knowledge.',
      'It requires that our reasoning must be correct.',
      'It requires that we should have clarity of ideas.',
      'All.'
    ],
    answer: 2,
    explanation: 'Logical correctness as a standard of critical thinking means that our reasoning must be valid or cogent—drawing warranted conclusions from the given premises. Accuracy is concerned with factual truth, and clarity with understandability.'
  },
  {
    id: 'hu-logic-2022-final-mc-06',
    university: 'Haramaya University',
    year: '2022 Exam',
    course: 'Logic and Critical Thinking',
    category: 'Final Exam',
    question: 'Which statement is true about fairness?',
    options: [
      'It refers to deep and thorough thinking.',
      'It refers to treating the idea of our opponent as equal.',
      'We should collect relevant information.',
      'Our ideas must be reasonable.',
      'We should be emotional.'
    ],
    answer: 1,
    explanation: 'Fairness as a standard of critical thinking requires being open-minded, impartial, free of distorting bias, and giving equal and objective consideration to opposing viewpoints.'
  },
  {
    id: 'hu-logic-2022-final-mc-07',
    university: 'Haramaya University',
    year: '2022 Exam',
    course: 'Logic and Critical Thinking',
    category: 'Final Exam',
    question: 'Which one of the following is true about the sufficiency principle?',
    options: [
      'It requires that the structure of argument must be sound.',
      'It requires that argument should have relevant premises.',
      'It requires that the premises of an argument must be acceptable.',
      'It requires that the premises must be right in numbers and weight.',
      'Argument should provide effective response for the idea of their opponent.'
    ],
    answer: 3,
    explanation: 'The sufficiency principle of good argument demands that the premises presented must be sufficient in quantity, kind, and evidential weight to justify accepting the conclusion.'
  },
  {
    id: 'hu-logic-2022-final-mc-08',
    university: 'Haramaya University',
    year: '2022 Exam',
    course: 'Logic and Critical Thinking',
    category: 'Final Exam',
    question: 'Which one of the following is true about the principle of charity?',
    options: [
      'It states that the purpose of argument is to discover the truth.',
      'It requires that participant of a rational discussion should acknowledge their limitation.',
      'It requires that when we reformulate the ideas of our opponents we should formulate the strongest version which is consistent with the original ideas of our opponent.',
      'It requires that our language should be free of obscurity.',
      'None.'
    ],
    answer: 2,
    explanation: 'The principle of charity requires that one interpret an opponent\'s argument in the strongest, most rational, and most plausible form possible before critiquing it.'
  },
  {
    id: 'hu-logic-2022-final-mc-09',
    university: 'Haramaya University',
    year: '2022 Exam',
    course: 'Logic and Critical Thinking',
    category: 'Final Exam',
    question: 'Which of the following statement is true about the suspending judgment principle?',
    options: [
      'It requires that one should postpone decision if no position is defended with argument.',
      'It requires that issues have to be resolved once the good principles of good argument are met.',
      'It requires that the duty to proof an idea should fall on those who set forth reasons.',
      'It requires that issues should be understood clearly.',
      'None.'
    ],
    answer: 0,
    explanation: 'The principle of suspending judgment states that if no position is successfully defended or if the arguments for opposing views are equally balanced, one should withhold or postpone judgment.'
  },
  {
    id: 'hu-logic-2022-final-mc-10',
    university: 'Haramaya University',
    year: '2022 Exam',
    course: 'Logic and Critical Thinking',
    category: 'Final Exam',
    question: 'Which one of the following is false about the characteristics of critical thinkers?',
    options: [
      'Critical thinkers have skills at understanding, analyzing and evaluating arguments.',
      'Critical thinkers know that their thinking might be influenced by barriers of critical thinking.',
      'Critical thinker believes that truth is universal and subjective.',
      'Critical thinkers have clarity of language and understanding.',
      'Critical thinkers are open-minded.'
    ],
    answer: 2,
    explanation: 'Critical thinkers recognize that objective truth is independent of subjective personal whim or arbitrary feeling; believing truth is merely subjective is relativistic thinking, which is a barrier to critical thinking.'
  },
  {
    id: 'hu-logic-2022-final-mc-11',
    university: 'Haramaya University',
    year: '2022 Exam',
    course: 'Logic and Critical Thinking',
    category: 'Final Exam',
    question: 'Which one of the following is false about the benefit of critical thinking?',
    options: [
      'Critical thinking enriches personal life.',
      'Critical thinking helps us to express ideas in ways that are clear and precise.',
      'Critical thinking guarantees that our personal opinions are infallible and will never be challenged.',
      'Critical thinking helps in making informed and rational career and life decisions.',
      'None.'
    ],
    answer: 2,
    explanation: 'Critical thinking does not grant infallibility or shield one from scrutiny; rather, it cultivates intellectual humility, fallibilism, and continuous willingness to re-examine beliefs.'
  },
  {
    id: 'hu-logic-2022-final-mc-12',
    university: 'Haramaya University',
    year: '2022 Exam',
    course: 'Logic and Critical Thinking',
    category: 'Final Exam',
    question: 'Which of the following is an example of an informal fallacy of weak induction?',
    options: [
      'Appeal to pity',
      'Argument against the person',
      'Straw man',
      'Appeal to force',
      'Hasty generalization'
    ],
    answer: 4,
    explanation: 'Hasty generalization, slippery slope, and weak analogy are classic fallacies of weak induction, where premises are relevant but lack sufficient inductive strength.'
  },
  {
    id: 'hu-logic-2022-final-mc-13',
    university: 'Haramaya University',
    year: '2022 Exam',
    course: 'Logic and Critical Thinking',
    category: 'Final Exam',
    question: 'What kind of fallacy is committed when an arguer distorts or misrepresents an opponent\'s position to make it easier to attack?',
    options: [
      'Straw man',
      'Red herring',
      'Missing the point',
      'Appeal to force',
      'Complex question'
    ],
    answer: 0,
    explanation: 'The straw man fallacy is committed when someone distorts, exaggerates, or oversimplifies an opponent\'s argument to knock it down more easily.'
  },
  {
    id: 'hu-logic-2022-final-mc-14',
    university: 'Haramaya University',
    year: '2022 Exam',
    course: 'Logic and Critical Thinking',
    category: 'Final Exam',
    question: 'What kind of fallacy is committed when the arguer diverts the attention of the audience by changing the subject to an extraneous issue?',
    options: [
      'Straw man',
      'Red herring',
      'Suppressed evidence',
      'False dichotomy',
      'Begging the question'
    ],
    answer: 1,
    explanation: 'The red herring fallacy occurs when an arguer introduces an irrelevant topic to divert attention away from the original issue.'
  },
  {
    id: 'hu-logic-2022-final-mc-15',
    university: 'Haramaya University',
    year: '2022 Exam',
    course: 'Logic and Critical Thinking',
    category: 'Final Exam',
    question: 'What kind of fallacy is committed by: "You really think that drugs should be legalized? Think again. Dad will cut you out of the inheritance if you keep saying that."?',
    options: [
      'Appeal to pity',
      'Appeal to people',
      'Straw man',
      'Appeal to force',
      'Accident'
    ],
    answer: 3,
    explanation: 'Appeal to force (argumentum ad baculum) occurs when an arguer uses a physical or psychological threat of harm/loss instead of logical evidence to force acceptance of a conclusion.'
  },
  {
    id: 'hu-logic-2022-final-mc-16',
    university: 'Haramaya University',
    year: '2022 Exam',
    course: 'Logic and Critical Thinking',
    category: 'Final Exam',
    question: '"Either men are superior to women, or women are superior to men. Men are not superior to women. Hence, women are superior to men." What kind of fallacy is it?',
    options: [
      'Straw man',
      'Red herring',
      'Missing the point',
      'False dichotomy',
      'Composition'
    ],
    answer: 3,
    explanation: 'False dichotomy (either-or fallacy) is committed when two alternatives are presented as exhaustive when in fact other plausible alternatives (such as equality) exist.'
  },
  {
    id: 'hu-logic-2022-final-mc-17',
    university: 'Haramaya University',
    year: '2022 Exam',
    course: 'Logic and Critical Thinking',
    category: 'Final Exam',
    question: 'Have you stopped beating your wife? What kind of fallacy could be committed with such question?',
    options: [
      'Ambiguity',
      'Amphiboly',
      'Complex question',
      'Division',
      'Composition'
    ],
    answer: 2,
    explanation: 'A complex question (loaded question) embeds a presupposition so that any direct answer ("yes" or "no") confirms an incriminating premise that has not been established.'
  },
  {
    id: 'hu-logic-2022-final-mc-18',
    university: 'Haramaya University',
    year: '2022 Exam',
    course: 'Logic and Critical Thinking',
    category: 'Final Exam',
    question: 'What is slippery slope?',
    options: [
      'It occurs when a conclusion makes definite assertion without conclusive evidences.',
      'It occurs when generalization are made on the basis of unrepresentative sample.',
      'It occurs when chain of reactions are presented as if there is causal relation when there is no sufficient reasons that the chain reactions occur.',
      'It occurs when there is similarity between two things.',
      'It occurs when we accept an idea as true because it is mentioned by knowledgeable person.'
    ],
    answer: 2,
    explanation: 'The slippery slope fallacy occurs when an arguer claims that a first step will inevitably lead to a chain reaction of undesirable events without providing sufficient evidence for the inevitability of the cascade.'
  },
  {
    id: 'hu-logic-2022-final-mc-19',
    university: 'Haramaya University',
    year: '2022 Exam',
    course: 'Logic and Critical Thinking',
    category: 'Final Exam',
    question: 'What is the fallacy of division?',
    options: [
      'It occurs when the property of the part given wrongly to the whole.',
      'When the property of the whole is given wrongly to the part.',
      'It occurs when ambiguous word exists in argument.',
      'It occurs when the premise is ambiguous.',
      'It occurs when the argument ignores the major premises.'
    ],
    answer: 1,
    explanation: 'The fallacy of division occurs when an arguer erroneously transfers an attribute of a whole (or class) onto its constituent individual parts (or members).'
  },
  {
    id: 'hu-logic-2022-final-mc-20',
    university: 'Haramaya University',
    year: '2022 Exam',
    course: 'Logic and Critical Thinking',
    category: 'Final Exam',
    question: 'No one has successfully proved the existence of extra territorial beings. Thus we must conclude that such ideas are false. What kind of fallacy is committed?',
    options: [
      'Appeal to pity',
      'Appeal to force',
      'Appeal to ignorance',
      'Appeal to unqualified authority',
      'Hasty generalization'
    ],
    answer: 2,
    explanation: 'Appeal to ignorance (argumentum ad ignorantiam) occurs when lack of evidence or inability to prove a proposition is treated as definitive proof of its opposite.'
  },
  {
    id: 'hu-logic-2022-final-mc-21',
    university: 'Haramaya University',
    year: '2022 Exam',
    course: 'Logic and Critical Thinking',
    category: 'Final Exam',
    question: 'Your Honor, my client does not deserve a year in prison. He has small children that need a father and a wife that needs a husband. What kind of fallacy is it?',
    options: [
      'Appeal to pity',
      'Appeal to force',
      'Appeal to people',
      'Argument against the person',
      'Accident'
    ],
    answer: 0,
    explanation: 'Appeal to pity (argumentum ad misericordiam) occurs when an arguer attempts to evoke pity or sympathy to win acceptance of a conclusion rather than offering relevant arguments.'
  },
  {
    id: 'hu-logic-2022-final-mc-22',
    university: 'Haramaya University',
    year: '2022 Exam',
    course: 'Logic and Critical Thinking',
    category: 'Final Exam',
    question: 'Last time I visited a small clinic and the clerk man overcharges me. Yesterday my friend George visited a medium clinic and he also over charged. Currently clinics are a collection of business firms that overcharge patients. What kind of fallacy is it?',
    options: [
      'False cause',
      'Unqualified authority',
      'Hasty generalization',
      'Weak analogy',
      'Slippery slope'
    ],
    answer: 2,
    explanation: 'Hasty generalization occurs when a broad conclusion about an entire group or class is drawn from an unrepresentative or too small sample (only two instances).'
  },
  {
    id: 'hu-logic-2022-final-mc-23',
    university: 'Haramaya University',
    year: '2022 Exam',
    course: 'Logic and Critical Thinking',
    category: 'Final Exam',
    question: 'For the last six months whenever I go to physics examination, I fail the examination before I am encountered with black cats. The reason for my failure is clear: black cats are the cause of bad lucks. What kind of fallacy is it?',
    options: [
      'Appeal to force',
      'Appeal to pity',
      'False cause',
      'Weak analogy',
      'Composition'
    ],
    answer: 2,
    explanation: 'False cause (specifically post hoc ergo propter hoc) occurs when one assumes that because one event precedes another, the first event is the cause of the second without real causal evidence.'
  },
  {
    id: 'hu-logic-2022-final-mc-24',
    university: 'Haramaya University',
    year: '2022 Exam',
    course: 'Logic and Critical Thinking',
    category: 'Final Exam',
    question: 'Prof. Girum, a professor in biotechnology, argued that Ethiopia has to revise its constitution since the source of chaos in the country directly springs from the constitutions. In light of his expertise we should conclude that his ideas must be true. What kind of fallacy is it?',
    options: [
      'Suppressed evidence',
      'Unqualified authority',
      'False dichotomy',
      'Composition',
      'Division'
    ],
    answer: 1,
    explanation: 'Appeal to unqualified authority (argumentum ad verecundiam) occurs when citing an authority who lacks genuine expertise in the field under discussion (biotechnology vs. constitutional law).'
  },
  {
    id: 'hu-logic-2022-final-mc-25',
    university: 'Haramaya University',
    year: '2022 Exam',
    course: 'Logic and Critical Thinking',
    category: 'Final Exam',
    question: 'Each of the parts of this airplane is very light. Therefore, the airplane itself is very light. What kind of fallacy is it?',
    options: [
      'Appeal to force',
      'Composition',
      'Division',
      'Begging the question',
      'Complex question'
    ],
    answer: 1,
    explanation: 'The fallacy of composition occurs when an arguer mistakenly attributes a feature belonging to individual parts onto the entire whole.'
  },
  {
    id: 'hu-logic-2022-final-mc-26',
    university: 'Haramaya University',
    year: '2022 Exam',
    course: 'Logic and Critical Thinking',
    category: 'Final Exam',
    question: 'Which one of the following statement is false about the proposition "Some diamonds are not valuable objects?"',
    options: [
      'The quantifier is "no"',
      'The subject term is "diamonds"',
      'The copula is "are not"',
      'The predicate is "valuable objects".',
      'None.'
    ],
    answer: 0,
    explanation: 'In the standard-form categorical proposition "Some diamonds are not valuable objects" (O-proposition), the quantifier is "Some", not "no". Hence statement A is false.'
  },
  {
    id: 'hu-logic-2022-final-mc-27',
    university: 'Haramaya University',
    year: '2022 Exam',
    course: 'Logic and Critical Thinking',
    category: 'Final Exam',
    question: 'Some celebrities are highly moral people. Which one of the following is false?',
    options: [
      'Both the subject and the predicate are distributed.',
      'The letter name is I',
      'The quality is affirmative.',
      'The quantity is particular.',
      'None.'
    ],
    answer: 0,
    explanation: 'For an I-type categorical proposition ("Some S are P"), neither the subject nor the predicate term is distributed. Thus stating that both are distributed is false.'
  },
  {
    id: 'hu-logic-2022-final-mc-28',
    university: 'Haramaya University',
    year: '2022 Exam',
    course: 'Logic and Critical Thinking',
    category: 'Final Exam',
    question: 'All liars are harmful people. Which one of the following is true about the diagram of this proposition?',
    options: [
      'There is shade mark in the common areas of the circle of liars and harmful people.',
      'There is a shade mark in the areas of liars outside of harmful people.',
      'There is "X" mark in the common areas of liars and harmful people.',
      'There is "X" marks in the areas of harmful people outside of liars.',
      'There is "X" marks in the areas of liars outside of harmful people.'
    ],
    answer: 1,
    explanation: 'In a Venn diagram for an A-proposition ("All S are P"), the area representing the subject set outside the predicate set (Area 1: S without P) is completely shaded to denote emptiness.'
  },
  {
    id: 'hu-logic-2022-final-mc-29',
    university: 'Haramaya University',
    year: '2022 Exam',
    course: 'Logic and Critical Thinking',
    category: 'Final Exam',
    question: 'If the proposition "All cougars are carnivores," is true, then which of the following propositions is false based on Boolean interpretation?',
    options: [
      'Some cougars are carnivores.',
      'No cougars are carnivores.',
      'Some cougars are not carnivores.',
      'All.',
      'None.'
    ],
    answer: 2,
    explanation: 'In the modern Boolean square of opposition, the only relation that is unconditionally valid is the contradictory relation between A and O (and between E and I). If A ("All cougars are carnivores") is true, its contradictory O ("Some cougars are not carnivores") is necessarily false.'
  },
  {
    id: 'hu-logic-2022-final-mc-30',
    university: 'Haramaya University',
    year: '2022 Exam',
    course: 'Logic and Critical Thinking',
    category: 'Final Exam',
    question: 'If the proposition "Some grapes are seedless fruit", is true then which one of the following proposition is false based on Boolean interpretation?',
    options: [
      'All grapes are seedless fruit.',
      'Some grapes are not seedless fruit.',
      'No grapes are seedless fruit.',
      'Some non grapes are seedless fruit.',
      'Some seedless fruit are grapes.'
    ],
    answer: 2,
    explanation: 'In Boolean logic, the I proposition and the E proposition are contradictories. If the I proposition ("Some grapes are seedless fruit") is true, its contradictory E proposition ("No grapes are seedless fruit") is unconditionally false.'
  },

  // PART TWO: MATCHING (31 - 35)
  {
    id: 'hu-logic-2022-final-mt-31',
    university: 'Haramaya University',
    year: '2022 Exam',
    course: 'Logic and Critical Thinking',
    category: 'Final Exam',
    question: 'Match the concept with its barrier to critical thinking: "Superiority bias" is an aspect of:',
    options: [
      'Socio-centrism',
      'Wishful thinking',
      'Relativism',
      'Egocentrism',
      'Stereotype'
    ],
    answer: 3,
    explanation: 'Superiority bias (the self-serving tendency to overrate oneself compared to others) is a core component of egocentrism (self-centered thinking).'
  },
  {
    id: 'hu-logic-2022-final-mt-32',
    university: 'Haramaya University',
    year: '2022 Exam',
    course: 'Logic and Critical Thinking',
    category: 'Final Exam',
    question: 'Match the concept with its barrier to critical thinking: "Conformism" is an aspect of:',
    options: [
      'Socio-centrism',
      'Wishful thinking',
      'Relativism',
      'Egocentrism',
      'Stereotype'
    ],
    answer: 0,
    explanation: 'Conformism (uncritically conforming beliefs and actions to group standards) is a principal manifestation of socio-centrism (group-centered thinking).'
  },
  {
    id: 'hu-logic-2022-final-mt-33',
    university: 'Haramaya University',
    year: '2022 Exam',
    course: 'Logic and Critical Thinking',
    category: 'Final Exam',
    question: 'Match the concept with its barrier to critical thinking: "Treating members of certain social class as identical" refers to:',
    options: [
      'Socio-centrism',
      'Wishful thinking',
      'Relativism',
      'Egocentrism',
      'Stereotype'
    ],
    answer: 4,
    explanation: 'Stereotyping involves holding generalized, fixed beliefs that all members of a specific social group or class share identical attributes.'
  },
  {
    id: 'hu-logic-2022-final-mt-34',
    university: 'Haramaya University',
    year: '2022 Exam',
    course: 'Logic and Critical Thinking',
    category: 'Final Exam',
    question: 'Match the concept with its barrier to critical thinking: "The view that truth is a matter of opinion" is:',
    options: [
      'Socio-centrism',
      'Wishful thinking',
      'Relativism',
      'Egocentrism',
      'Stereotype'
    ],
    answer: 2,
    explanation: 'Relativism (specifically subjectivism) is the epistemological view that truth is merely a matter of subjective opinion rather than objective reality.'
  },
  {
    id: 'hu-logic-2022-final-mt-35',
    university: 'Haramaya University',
    year: '2022 Exam',
    course: 'Logic and Critical Thinking',
    category: 'Final Exam',
    question: 'Match the concept with its barrier to critical thinking: "Consider an idea as true because one desires it to be true" is:',
    options: [
      'Socio-centrism',
      'Wishful thinking',
      'Relativism',
      'Egocentrism',
      'Stereotype'
    ],
    answer: 1,
    explanation: 'Wishful thinking occurs when someone believes something is true simply because they strongly desire or wish it to be true, without evidential support.'
  },

  // PART THREE: TRUE / FALSE (36 - 40)
  {
    id: 'hu-logic-2022-final-tf-36',
    university: 'Haramaya University',
    year: '2022 Exam',
    course: 'Logic and Critical Thinking',
    category: 'Final Exam',
    question: 'True or False: Based on Aristotelian interpretation of categorical proposition, if the truth value of "A" propositions is known, then the truth value of "I" proposition is logically undetermined.',
    options: [
      'True',
      'False'
    ],
    answer: 1,
    explanation: 'In the Aristotelian (traditional) square of opposition, subalternation holds: truth trickles down. If an "A" proposition is known to be true, its corresponding subaltern "I" proposition is necessarily TRUE, not undetermined.'
  },
  {
    id: 'hu-logic-2022-final-tf-37',
    university: 'Haramaya University',
    year: '2022 Exam',
    course: 'Logic and Critical Thinking',
    category: 'Final Exam',
    question: 'True or False: The difference between Boolean and Aristotelian interpretation is over particular statements.',
    options: [
      'True',
      'False'
    ],
    answer: 1,
    explanation: 'The difference between Boolean and Aristotelian interpretations concerns existential import in universal statements (A and E propositions). Both interpretations assign existential import to particular statements (I and O propositions).'
  },
  {
    id: 'hu-logic-2022-final-tf-38',
    university: 'Haramaya University',
    year: '2022 Exam',
    course: 'Logic and Critical Thinking',
    category: 'Final Exam',
    question: 'True or False: Critical thinking helps us to make foolish personal decisions.',
    options: [
      'True',
      'False'
    ],
    answer: 1,
    explanation: 'Critical thinking equips individuals to avoid biased, impulsive, and foolish choices by promoting rational evaluation of evidence and consequences.'
  },
  {
    id: 'hu-logic-2022-final-tf-39',
    university: 'Haramaya University',
    year: '2022 Exam',
    course: 'Logic and Critical Thinking',
    category: 'Final Exam',
    question: 'True or False: Fallacies occur only when the reasoning in arguments are mistaken.',
    options: [
      'True',
      'False'
    ],
    answer: 1,
    explanation: 'Fallacies can arise from false premises, manipulative rhetoric, linguistic ambiguities, or illicit presuppositions, not merely defects in inferential reasoning.'
  },
  {
    id: 'hu-logic-2022-final-tf-40',
    university: 'Haramaya University',
    year: '2022 Exam',
    course: 'Logic and Critical Thinking',
    category: 'Final Exam',
    question: 'True or False: Fallacy of relevance occurs when the premises of an argument presuppose the conclusion.',
    options: [
      'True',
      'False'
    ],
    answer: 1,
    explanation: 'Presupposing the conclusion in the premises is begging the question (petitio principii), which is a fallacy of presumption, not a fallacy of relevance.'
  }
];

// Append the new questions to exams array
exams.push(...newQuestions);

fs.writeFileSync(examsPath, JSON.stringify(exams, null, 2), 'utf8');
console.log(`Successfully added ${newQuestions.length} new questions. Total questions now: ${exams.length}`);
