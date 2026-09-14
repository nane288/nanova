const fs = require('fs');
const path = require('path');

const examsPath = path.join(__dirname, '..', 'data', 'exams.json');
const exams = JSON.parse(fs.readFileSync(examsPath, 'utf8'));

const newQuestions = [
  // --- PART ONE: MODALS AND INFINITIVES (Advice Matching) ---
  {
    id: "eng-hu-2021-final-01",
    university: "Haramaya University",
    year: "2021 Exam",
    course: "Communicative English",
    category: "Final Exam",
    question: "Select the most appropriate advice expression: 'I am feeling sick. I ate too much and I have a bad stomach ache.'",
    options: [
      "You shouldn't eat excessive food.",
      "I don't think they should get married.",
      "You had better go now or you'll be late.",
      "We had better take an umbrella."
    ],
    answer: 0,
    explanation: "Giving advice regarding overeating and stomach illness: 'You shouldn't eat excessive food.'"
  },
  {
    id: "eng-hu-2021-final-02",
    university: "Haramaya University",
    year: "2021 Exam",
    course: "Communicative English",
    category: "Final Exam",
    question: "Select the most appropriate advice: 'Traffic rules force people to avoid anything that may cause an accident. The traffic police get a man on the motorbike who isn't wearing a headdress...'",
    options: [
      "That is dangerous. You should wear a helmet.",
      "You ought not to go to bed so late.",
      "Try running once a week.",
      "We had better not take an umbrella."
    ],
    answer: 0,
    explanation: "For riding a motorbike safely without a headdress/helmet: 'That is dangerous. You should wear a helmet.'"
  },
  {
    id: "eng-hu-2021-final-03",
    university: "Haramaya University",
    year: "2021 Exam",
    course: "Communicative English",
    category: "Final Exam",
    question: "Select the most appropriate advice: 'You are going out for a walk with Jack. It looks as if it might rain. (You say to Jack)'",
    options: [
      "We had better take an umbrella.",
      "We had better not take an umbrella.",
      "I had better not. I have got a lot to do.",
      "Set the alarm clock before you go to bed."
    ],
    answer: 0,
    explanation: "When it looks like rain before going for a walk: 'We had better take an umbrella.'"
  },
  {
    id: "eng-hu-2021-final-04",
    university: "Haramaya University",
    year: "2021 Exam",
    course: "Communicative English",
    category: "Final Exam",
    question: "Select the most appropriate advice: 'I visited my doctor and he told me that I should lose weight. Therefore, tell me what I can do since I don't have too much time to go to the gym, and I never like to follow a strict diet.'",
    options: [
      "Try running once a week.",
      "You had better see a doctor.",
      "I don't think they should get married.",
      "You shouldn't eat excessive food."
    ],
    answer: 0,
    explanation: "Giving feasible exercise advice without requiring gym time or strict dieting: 'Try running once a week.'"
  },
  {
    id: "eng-hu-2021-final-05",
    university: "Haramaya University",
    year: "2021 Exam",
    course: "Communicative English",
    category: "Final Exam",
    question: "Select the most appropriate response: 'I want to enjoy the night at Cinema. Are you going out tonight?'",
    options: [
      "I had better not. I have got a lot to do.",
      "You had better go now or you'll be late.",
      "We had better take an umbrella.",
      "That is dangerous. You should wear a helmet."
    ],
    answer: 0,
    explanation: "Politely declining an invitation due to busy workload: 'I had better not. I have got a lot to do.'"
  },
  {
    id: "eng-hu-2021-final-06",
    university: "Haramaya University",
    year: "2021 Exam",
    course: "Communicative English",
    category: "Final Exam",
    question: "Select the most appropriate advice: 'Your friends Peter and Ana are planning to get married. But their family and friends did not agree with them. And you think it's a bad idea.'",
    options: [
      "I don't think they should get married.",
      "You ought not to go to bed so late.",
      "You shouldn't eat excessive food.",
      "Try running once a week."
    ],
    answer: 0,
    explanation: "Expressing an opinion on an ill-advised marriage: 'I don't think they should get married.'"
  },
  {
    id: "eng-hu-2021-final-07",
    university: "Haramaya University",
    year: "2021 Exam",
    course: "Communicative English",
    category: "Final Exam",
    question: "Select the most appropriate advice: 'Lemma is your classmate, and he is late for almost all classes. The teacher reminded him to let it be the last time to come to morning class after it begins.'",
    options: [
      "Set the alarm clock before you go to bed.",
      "We had better take an umbrella.",
      "I had better not. I have got a lot to do.",
      "I don't think they should get married."
    ],
    answer: 0,
    explanation: "Advice to prevent chronic morning tardiness: 'Set the alarm clock before you go to bed.'"
  },
  {
    id: "eng-hu-2021-final-08",
    university: "Haramaya University",
    year: "2021 Exam",
    course: "Communicative English",
    category: "Final Exam",
    question: "Select the most appropriate advice: 'You have an appointment in ten minutes with your friends. Your mother received a call from them and reminded you not to upset them.'",
    options: [
      "You had better go now or you'll be late.",
      "That is dangerous. You should wear a helmet.",
      "You shouldn't eat excessive food.",
      "We had better not take an umbrella."
    ],
    answer: 0,
    explanation: "Urging someone to leave immediately for a pending appointment: 'You had better go now or you'll be late.'"
  },

  // --- PART TWO: READING COMPREHENSION ---
  {
    id: "eng-hu-2021-final-09",
    university: "Haramaya University",
    year: "2021 Exam",
    course: "Communicative English",
    category: "Final Exam",
    question: "According to the reading passage on legal insanity, one of the author's main points about the legal concept of responsibility is that:",
    options: [
      "The phrase 'not guilty by reason of insanity' has made our legal system more efficient.",
      "Responsibility and guilt are legal concepts, and their meanings can be modified.",
      "Knowing right from wrong is a simple matter of admitting the truth to oneself.",
      "People can become severely disturbed without a word of warning to anyone."
    ],
    answer: 1,
    explanation: "Throughout Western legal history (1724, 1843 McNaghten, 1970s American Law Institute), definitions of legal responsibility have evolved and been modified across time."
  },
  {
    id: "eng-hu-2021-final-10",
    university: "Haramaya University",
    year: "2021 Exam",
    course: "Communicative English",
    category: "Final Exam",
    question: "Based on the passage, the primary purpose for the 1970s redefinition of insanity proposed by the American Law Institute was to:",
    options: [
      "Eliminate the insanity defense from American courtrooms.",
      "More precisely define the concepts of responsibility and intellectual capacity.",
      "Redefine legal insanity so that it might include as many criminals as possible.",
      "Apply the McNaghten Rule only to trials involving cases of mistaken identity."
    ],
    answer: 1,
    explanation: "The ALI rule sought to clarify 'substantial capacity' and 'appreciate' rather than pure intellectual knowledge, creating a more precise standard."
  },
  {
    id: "eng-hu-2021-final-11",
    university: "Haramaya University",
    year: "2021 Exam",
    course: "Communicative English",
    category: "Final Exam",
    question: "From information in the third and fourth paragraphs, it can reasonably be inferred that the legal definition of insanity was changed in the 1970s after:",
    options: [
      "Federal courts won a dispute with state courts over a proposal made by the American Law Institute.",
      "The doctrine of 'irresistible impulse' was found to contradict accepted notions of justice.",
      "Proponents of the McNaghten Rule had been using the insanity defense in far too many murder trials.",
      "Several courts found that justice was not always best served when the McNaghten Rule was applied."
    ],
    answer: 3,
    explanation: "Dissatisfaction with the rigid McNaghten standard (which required total incapacity or simple intellectual knowing of right from wrong) led courts to adopt broader and fairer guidelines."
  },
  {
    id: "eng-hu-2021-final-12",
    university: "Haramaya University",
    year: "2021 Exam",
    course: "Communicative English",
    category: "Final Exam",
    question: "According to the explanation provided in the fourth paragraph, use of the word 'appreciate' in the phrase 'to appreciate the wrongfulness' instead of 'know' implies which of the following?",
    options: [
      "The difference between right and wrong is something people feel rather than know, which makes deciding legal responsibility difficult.",
      "To know implies certainty, and distinguishing right from wrong is often a subjective matter in determining legal responsibility.",
      "The word appreciate suggests that an action and that action's implications must be understood for there to be legal responsibility.",
      "An insane person would 'know' something the way a sane person would 'know' something, and be able to appreciate that knowledge, too."
    ],
    answer: 2,
    explanation: "Paragraph 4 explains: 'The use of the word appreciate rather than know implies that intellectual awareness of right or wrong is not enough; individuals must have some understanding of the moral or legal consequences of their behavior before they can be held criminally responsible.'"
  },
  {
    id: "eng-hu-2021-final-13",
    university: "Haramaya University",
    year: "2021 Exam",
    course: "Communicative English",
    category: "Final Exam",
    question: "The passage indicates that the McNaghten case became the basis for future decisions about legal insanity because:",
    options: [
      "The House of Lords upheld the verdict of the court despite considerable political pressure.",
      "There had been an increase in cases of murder involving mistaken identity arising from delusions.",
      "McNaghten was unable to convince the jury at his trial that he was incoherent and insane.",
      "McNaghten used a gun to commit murder, thus aggravating the crime in the jury's mind."
    ],
    answer: 0,
    explanation: "Even though Queen Victoria called on the House of Lords to review the decision, the decision was upheld and formal written rules for legal insanity were established."
  },
  {
    id: "eng-hu-2021-final-14",
    university: "Haramaya University",
    year: "2021 Exam",
    course: "Communicative English",
    category: "Final Exam",
    question: "The passage states that McNaghten wanted to kill the English prime minister because the Scotsman thought that he:",
    options: [
      "Would establish a confusing legal precedent.",
      "Had been rejected by Peel's secretary.",
      "Would be better off in a mental hospital.",
      "Had been wronged by the minister."
    ],
    answer: 3,
    explanation: "McNaghten suffered from paranoid delusions that he was being persecuted/wronged by Prime Minister Sir Robert Peel."
  },
  {
    id: "eng-hu-2021-final-15",
    university: "Haramaya University",
    year: "2021 Exam",
    course: "Communicative English",
    category: "Final Exam",
    question: "According to the passage, one of the reasons some mental health and legal groups want to abolish the insanity defense is that:",
    options: [
      "Even clever lawyers are confused about when to use and when not to use it.",
      "Juries that must sort out conflicting testimony become confused, and justice suffers.",
      "When it is invoked, even if the case is won, the punishment often ends up being too lenient.",
      "Innocent defendants are too often being punished unfairly by unsympathetic juries."
    ],
    answer: 1,
    explanation: "Paragraph 5 notes that opposing psychiatrists and psychologists present contradictory evidence which is 'confusing to the jury and do little to help the cause of justice.'"
  },
  {
    id: "eng-hu-2021-final-16",
    university: "Haramaya University",
    year: "2021 Exam",
    course: "Communicative English",
    category: "Final Exam",
    question: "The passage suggests that individuals who use the insanity defense:",
    options: [
      "Are not permitted to do so unless it can be proved beforehand that they are really insane.",
      "Should be tried, convicted, and punished whether or not they are really insane.",
      "Are legally responsible for their actions even if a jury decides they are not guilty.",
      "Might risk a lifelong confinement even if acquitted by a jury, if the acquittal is based on insanity."
    ],
    answer: 3,
    explanation: "Paragraph 5 highlights that acquittal by reason of insanity often leads to 'an indeterminate sentence to an institution for the criminally insane that may confine a person for life.'"
  },
  {
    id: "eng-hu-2021-final-17",
    university: "Haramaya University",
    year: "2021 Exam",
    course: "Communicative English",
    category: "Final Exam",
    question: "According to the passage, a lawyer contemplating using insanity as a defense for a client should do which of the following?",
    options: [
      "Carefully evaluate using the defense, since in actual practice it rarely works.",
      "Assemble for trial a team of expert witnesses with a wide range of viewpoints on mental illness.",
      "Make sure that the doctrine of 'irresistible impulse' is not used by the prosecution in his or her client's trial.",
      "Recommend that the client be acquitted because he or she has been judged criminally insane by a doctor."
    ],
    answer: 0,
    explanation: "Paragraph 6 indicates that 'lawyers, knowing that an insanity plea is apt to fail, tend to use it only as a last resort' because actual cases of acquittal are quite rare."
  },
  {
    id: "eng-hu-2021-final-18",
    university: "Haramaya University",
    year: "2021 Exam",
    course: "Communicative English",
    category: "Final Exam",
    question: "One of the main points made in the last paragraph is that insanity pleas were:",
    options: [
      "Unconvincing to most juries in California in 1980.",
      "Used in most cases in California in 1980.",
      "Often successful in California in 1980.",
      "Popular with lawyers in California in 1980."
    ],
    answer: 0,
    explanation: "The data shows only 259 out of 52,000 defendants in California in 1980 successfully pleaded insanity, proving juries were unpersuaded in the overwhelming majority of cases."
  },

  // --- PART TWO: Reference Questions ---
  {
    id: "eng-hu-2021-final-19",
    university: "Haramaya University",
    year: "2021 Exam",
    course: "Communicative English",
    category: "Final Exam",
    question: "In the sentence: 'Should individuals whose mental faculties are impaired be held responsible for their actions?', the word 'their' refers to:",
    options: [
      "Individuals whose mental faculties are impaired",
      "Social scientists",
      "Criminal offenders",
      "Members of the legal profession"
    ],
    answer: 0,
    explanation: "'Their' is the third-person plural possessive adjective referring to 'individuals whose mental faculties are impaired'."
  },
  {
    id: "eng-hu-2021-final-20",
    university: "Haramaya University",
    year: "2021 Exam",
    course: "Communicative English",
    category: "Final Exam",
    question: "In paragraph 2: '...a man was not responsible for an act if \"he does not know what he is doing, no more than... a wild beast.\"', the pronoun 'he' refers to:",
    options: [
      "A man / an accused defendant",
      "The English prime minister",
      "A wild beast",
      "The English court"
    ],
    answer: 0,
    explanation: "'He' refers back to 'a man' standing trial for an alleged criminal act."
  },
  {
    id: "eng-hu-2021-final-21",
    university: "Haramaya University",
    year: "2021 Exam",
    course: "Communicative English",
    category: "Final Exam",
    question: "In paragraph 2: 'He was judged not responsible by reason of insanity and sent to a mental hospital...', the pronoun 'He' refers to:",
    options: [
      "McNaghten",
      "Sir Robert Peel",
      "Peel's secretary",
      "The English court"
    ],
    answer: 0,
    explanation: "'He' refers to Daniel McNaghten, who was tried and acquitted by reason of insanity."
  },
  {
    id: "eng-hu-2021-final-22",
    university: "Haramaya University",
    year: "2021 Exam",
    course: "Communicative English",
    category: "Final Exam",
    question: "In paragraph 5: 'Some also argue that the abuse of the insanity plea by clever lawyers has allowed too many criminals to escape conviction.', the word 'Some' refers to:",
    options: [
      "Some legal and mental health experts / critics",
      "Some criminal defendants",
      "Some jurors",
      "Some mental hospital patients"
    ],
    answer: 0,
    explanation: "'Some' refers to some of the legal and mental health professionals who recommend abolishing the insanity plea."
  },
  {
    id: "eng-hu-2021-final-23",
    university: "Haramaya University",
    year: "2021 Exam",
    course: "Communicative English",
    category: "Final Exam",
    question: "In paragraph 6: 'lawyers, knowing that an insanity plea is apt to fail, tend to use it only as a last resort.', the pronoun 'it' refers to:",
    options: [
      "The insanity plea / insanity defense",
      "A criminal act",
      "Conviction",
      "A jury"
    ],
    answer: 0,
    explanation: "'It' refers directly to 'an insanity plea'."
  },

  // --- PART TWO: Vocabulary Questions ---
  {
    id: "eng-hu-2021-final-24",
    university: "Haramaya University",
    year: "2021 Exam",
    course: "Communicative English",
    category: "Final Exam",
    question: "Find the word in paragraph 1 that means 'connected with or based on the law':",
    options: [
      "Legal",
      "Social",
      "Criminal",
      "Impaired"
    ],
    answer: 0,
    explanation: "'Legal' means relating to, appointed, or required by the law."
  },
  {
    id: "eng-hu-2021-final-25",
    university: "Haramaya University",
    year: "2021 Exam",
    course: "Communicative English",
    category: "Final Exam",
    question: "Find the word in paragraph 2 that means 'not able to do something':",
    options: [
      "Incapable",
      "Severely",
      "Civilized",
      "Paranoid"
    ],
    answer: 0,
    explanation: "'Incapable' means unable to do or achieve something."
  },
  {
    id: "eng-hu-2021-final-26",
    university: "Haramaya University",
    year: "2021 Exam",
    course: "Communicative English",
    category: "Final Exam",
    question: "Find the word in paragraph 2 that means 'meaningless, foolish, or having no sense':",
    options: [
      "Senseless",
      "Delusion",
      "Verdict",
      "Standard"
    ],
    answer: 0,
    explanation: "'Senseless' means lacking meaning, purpose, or common sense (as in 'senseless ramblings')."
  },
  {
    id: "eng-hu-2021-final-27",
    university: "Haramaya University",
    year: "2021 Exam",
    course: "Communicative English",
    category: "Final Exam",
    question: "Find the word in paragraph 2 that means 'extremely or to a very great degree':",
    options: [
      "Severely",
      "Apparently",
      "Mistakenly",
      "Incapable"
    ],
    answer: 0,
    explanation: "'Severely' means to an extreme or very harsh degree (as in 'severely disturbed')."
  },
  {
    id: "eng-hu-2021-final-28",
    university: "Haramaya University",
    year: "2021 Exam",
    course: "Communicative English",
    category: "Final Exam",
    question: "Find the term in paragraph 4 that refers to 'a psychological condition or illness that impairs normal cognitive functioning':",
    options: [
      "Mental disease or defect",
      "Substantial capacity",
      "Conform",
      "Intellectual awareness"
    ],
    answer: 0,
    explanation: "'Mental disease or defect' is the formal statutory term in the ALI standard defining psychological illness."
  },
  {
    id: "eng-hu-2021-final-29",
    university: "Haramaya University",
    year: "2021 Exam",
    course: "Communicative English",
    category: "Final Exam",
    question: "Find the word in paragraph 5 that means 'a judgment or verdict that a person is not guilty of the crime with which they have been charged':",
    options: [
      "Acquittal",
      "Conviction",
      "Parole",
      "Sentence"
    ],
    answer: 0,
    explanation: "'Acquittal' is the legal judgment that an accused defendant is not guilty of the charges."
  },

  // --- PART THREE: TENSES ---
  {
    id: "eng-hu-2021-final-30",
    university: "Haramaya University",
    year: "2021 Exam",
    course: "Communicative English",
    category: "Final Exam",
    question: "All students have ________ and ________ their assignment that ________ by a Physics teacher a week ago.",
    options: [
      "did / submitted / was given",
      "done / submitted / gave",
      "will do / submit / given",
      "done / submitted / was given"
    ],
    answer: 3,
    explanation: "Present perfect takes past participles: 'have done and submitted', followed by past passive for an event a week ago: 'that was given by a Physics teacher'."
  },
  {
    id: "eng-hu-2021-final-31",
    university: "Haramaya University",
    year: "2021 Exam",
    course: "Communicative English",
    category: "Final Exam",
    question: "Gemechu: '________? Have you ever had standard rash before?' Sufian: 'No, I haven't, but I have had fever.'",
    options: [
      "Are you fever",
      "Do you",
      "Have you got a rash",
      "Are you"
    ],
    answer: 2,
    explanation: "'Have you got a rash?' correctly pairs present perfect with the doctor/patient medical enquiry."
  },
  {
    id: "eng-hu-2021-final-32",
    university: "Haramaya University",
    year: "2021 Exam",
    course: "Communicative English",
    category: "Final Exam",
    question: "Hilina always ________ on time but this semester she ________ late every morning.",
    options: [
      "get / will get up",
      "gets / is getting up",
      "got / gets up",
      "went / gets up"
    ],
    answer: 1,
    explanation: "Habitual regular action takes simple present ('always gets'), while a temporary ongoing state this semester takes present continuous ('is getting up')."
  },
  {
    id: "eng-hu-2021-final-33",
    university: "Haramaya University",
    year: "2021 Exam",
    course: "Communicative English",
    category: "Final Exam",
    question: "Father: 'I will buy you the smart laptop if you pass the entrance exam of your choice.' Son: 'Wow! I'll be working hard. I hope you ________ your promise!'",
    options: [
      "keep",
      "will keep",
      "keeps",
      "kept"
    ],
    answer: 1,
    explanation: "'I hope you will keep your promise' correctly uses modal/future 'will keep' to refer to a future commitment."
  },
  {
    id: "eng-hu-2021-final-34",
    university: "Haramaya University",
    year: "2021 Exam",
    course: "Communicative English",
    category: "Final Exam",
    question: "A severe headache ________ through natural remedies and rest before resorting to modern pharmaceuticals.",
    options: [
      "can manage",
      "had withdrawn",
      "can managed",
      "may be managed"
    ],
    answer: 3,
    explanation: "Passive modal construction: modal auxiliary 'may' + 'be' + past participle 'managed' ('may be managed')."
  },

  // --- PART FOUR: ACTIVE & PASSIVE CONSTRUCTIONS ---
  {
    id: "eng-hu-2021-final-35",
    university: "Haramaya University",
    year: "2021 Exam",
    course: "Communicative English",
    category: "Final Exam",
    question: "Choose the correct form: 'Dining on Ethiopian cultural food _____ (characterize) by the ritual of breaking Injera...'",
    options: [
      "is characterized",
      "characterizes",
      "characterized",
      "is characterizing"
    ],
    answer: 0,
    explanation: "Present simple passive: subject 'Dining' is singular, requiring 'is characterized'."
  },
  {
    id: "eng-hu-2021-final-36",
    university: "Haramaya University",
    year: "2021 Exam",
    course: "Communicative English",
    category: "Final Exam",
    question: "Choose the correct form: '\"Injera\" _____ (place) on the plate with a variety of dishes decoratively arranged around it.'",
    options: [
      "is placed",
      "places",
      "was placed",
      "has placed"
    ],
    answer: 0,
    explanation: "Present simple passive: 'is placed'."
  },
  {
    id: "eng-hu-2021-final-37",
    university: "Haramaya University",
    year: "2021 Exam",
    course: "Communicative English",
    category: "Final Exam",
    question: "Choose the correct form: '\"Injera\", our staple bread, is flat bread _____ (make) of \"Teff\", a fine grain unique to Ethiopia.'",
    options: [
      "made",
      "makes",
      "is making",
      "making"
    ],
    answer: 0,
    explanation: "Reduced passive relative clause: 'flat bread made of Teff' (short for 'which is made of Teff')."
  },
  {
    id: "eng-hu-2021-final-38",
    university: "Haramaya University",
    year: "2021 Exam",
    course: "Communicative English",
    category: "Final Exam",
    question: "Choose the correct form: '\"Wot\" is a dipping sauce which _____ (prepare) using a variety of meats, fish, and vegetables.'",
    options: [
      "is prepared",
      "prepares",
      "prepared",
      "has prepared"
    ],
    answer: 0,
    explanation: "Present simple passive with relative pronoun 'which': 'is prepared'."
  },
  {
    id: "eng-hu-2021-final-39",
    university: "Haramaya University",
    year: "2021 Exam",
    course: "Communicative English",
    category: "Final Exam",
    question: "Choose the correct form: '\"Wot\" _____ (cook) with \"Berbere\" which may range from very mild to spicy hot.'",
    options: [
      "is cooked",
      "cooks",
      "was cooked",
      "cooked"
    ],
    answer: 0,
    explanation: "Present simple passive: 'is cooked'."
  },
  {
    id: "eng-hu-2021-final-40",
    university: "Haramaya University",
    year: "2021 Exam",
    course: "Communicative English",
    category: "Final Exam",
    question: "Choose the correct form: 'Ethiopian cultural dishes _____ (prepare) with a distinctive variety of unique spices...'",
    options: [
      "are prepared",
      "is prepared",
      "prepare",
      "preparing"
    ],
    answer: 0,
    explanation: "Plural subject 'dishes' requires plural present passive 'are prepared'."
  },
  {
    id: "eng-hu-2021-final-41",
    university: "Haramaya University",
    year: "2021 Exam",
    course: "Communicative English",
    category: "Final Exam",
    question: "Choose the correct form: 'To help you _____ (make) the best choice for this truly different dining experience...'",
    options: [
      "make",
      "making",
      "made",
      "to making"
    ],
    answer: 0,
    explanation: "The verb 'help' is followed by an object and a bare infinitive (or to-infinitive): 'help you make'."
  },

  // --- PART FIVE: CONDITIONALS ---
  {
    id: "eng-hu-2021-final-42",
    university: "Haramaya University",
    year: "2021 Exam",
    course: "Communicative English",
    category: "Final Exam",
    question: "Complete the conditional: 'Had you come with us, you _____ (see) an interesting film.'",
    options: [
      "would have seen",
      "would see",
      "saw",
      "will see"
    ],
    answer: 0,
    explanation: "Inverted third conditional ('Had you come...') requires 'would have' + past participle ('would have seen') in the main clause."
  },
  {
    id: "eng-hu-2021-final-43",
    university: "Haramaya University",
    year: "2021 Exam",
    course: "Communicative English",
    category: "Final Exam",
    question: "Complete the conditional: 'Wait—don't tell me. If you _____ (tell) me you will spoil its ending.'",
    options: [
      "tell",
      "told",
      "had told",
      "will tell"
    ],
    answer: 0,
    explanation: "First conditional: 'if' + present simple ('tell'), main clause future ('you will spoil')."
  },
  {
    id: "eng-hu-2021-final-44",
    university: "Haramaya University",
    year: "2021 Exam",
    course: "Communicative English",
    category: "Final Exam",
    question: "Complete the conditional: '...what would have been your childhood like if you _____ (be born) in a different family?'",
    options: [
      "had been born",
      "were born",
      "would be born",
      "are born"
    ],
    answer: 0,
    explanation: "Third conditional referring to a past counterfactual event requires past perfect passive: 'had been born'."
  },
  {
    id: "eng-hu-2021-final-45",
    university: "Haramaya University",
    year: "2021 Exam",
    course: "Communicative English",
    category: "Final Exam",
    question: "Complete the conditional: 'If I _____ (have) a different family, I wouldn't have grown up here in Harar.'",
    options: [
      "had had",
      "had",
      "would have",
      "have"
    ],
    answer: 0,
    explanation: "Third conditional 'if' clause requires past perfect: 'had had'."
  },
  {
    id: "eng-hu-2021-final-46",
    university: "Haramaya University",
    year: "2021 Exam",
    course: "Communicative English",
    category: "Final Exam",
    question: "Complete the conditional: 'And if you hadn't grown up here, I _____ (not meet) you.'",
    options: [
      "wouldn't have met",
      "wouldn't meet",
      "didn't meet",
      "won't meet"
    ],
    answer: 0,
    explanation: "Third conditional main clause requires 'wouldn't have' + past participle ('wouldn't have met')."
  },
  {
    id: "eng-hu-2021-final-47",
    university: "Haramaya University",
    year: "2021 Exam",
    course: "Communicative English",
    category: "Final Exam",
    question: "Complete the conditional: 'Hadn't I _____ (study) hard, I could have failed that course.'",
    options: [
      "studied",
      "study",
      "studying",
      "have studied"
    ],
    answer: 0,
    explanation: "Inverted third conditional with auxiliary 'hadn't' takes past participle 'studied'."
  },
  {
    id: "eng-hu-2021-final-48",
    university: "Haramaya University",
    year: "2021 Exam",
    course: "Communicative English",
    category: "Final Exam",
    question: "Complete the conditional: 'If one studies hard, he/she _____ (pass) any exam successfully.'",
    options: [
      "will pass",
      "would pass",
      "would have passed",
      "passed"
    ],
    answer: 0,
    explanation: "First conditional general rule: 'studies hard' -> 'will pass' (or passes)."
  },
  {
    id: "eng-hu-2021-final-49",
    university: "Haramaya University",
    year: "2021 Exam",
    course: "Communicative English",
    category: "Final Exam",
    question: "Complete the conditional: 'I _____ (not get) A's unless I study hard.'",
    options: [
      "won't get",
      "wouldn't get",
      "wouldn't have got",
      "didn't get"
    ],
    answer: 0,
    explanation: "'Unless' clause with present simple ('unless I study hard') requires future/modal in main clause: 'I won't get A's'."
  },
  {
    id: "eng-hu-2021-final-50",
    university: "Haramaya University",
    year: "2021 Exam",
    course: "Communicative English",
    category: "Final Exam",
    question: "Complete the conditional: 'If I _____ (be) you, I would try to do better on the next examination also.'",
    options: [
      "were",
      "was",
      "am",
      "had been"
    ],
    answer: 0,
    explanation: "Second conditional subjunctive for advice: 'If I were you, I would...'"
  },
  {
    id: "eng-hu-2021-final-51",
    university: "Haramaya University",
    year: "2021 Exam",
    course: "Communicative English",
    category: "Final Exam",
    question: "Complete the conditional: 'I am happy to discuss with you on this issue if you _____ (have) time tomorrow.'",
    options: [
      "have",
      "had",
      "will have",
      "would have"
    ],
    answer: 0,
    explanation: "Real condition referring to future availability requires present simple in the if-clause: 'if you have time tomorrow'."
  }
];

// Check unique IDs
const existingIds = new Set(exams.map(e => e.id));
const duplicates = newQuestions.filter(q => existingIds.has(q.id));
if (duplicates.length > 0) {
  console.error('Error: duplicate IDs found:', duplicates.map(d => d.id));
  process.exit(1);
}

// Append and save
const updatedExams = [...exams, ...newQuestions];
fs.writeFileSync(examsPath, JSON.stringify(updatedExams, null, 2), 'utf8');

console.log(`Successfully added ${newQuestions.length} questions to Haramaya University English 2021 Final Exam.`);
console.log(`Total questions in exams.json: ${updatedExams.length}`);
