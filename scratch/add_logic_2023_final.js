// Haramaya University Logic / Critical Thinking Final Exam 2023
// Total questions: 38
const questions = [
  {
    "id": "hu-logic-2023-final-mc-01",
    "university": "Haramaya University",
    "year": "2023 Exam",
    "course": "Logic and Critical Thinking",
    "category": "Final Exam",
    "question": "Which description best defines the Burden Proof Principle in an argument?",
    "options": [
      "Accepting reasons as they are forwarded by someone else.",
      "Being accountable for providing justifications for one's own assertion.",
      "Entitlement for the clarification of terms and concepts.",
      "Rushing to the conclusion without taking into consideration of different viewpoints.",
      "Whenever someone shifting position to someone else."
    ],
    "answer": 1,
    "explanation": "The burden of proof principle requires that the participant who makes an assertion or initiates an argument must accept the responsibility (accountability) of providing adequate reasons and evidence to justify it."
  },
  {
    "id": "hu-logic-2023-final-mc-02",
    "university": "Haramaya University",
    "year": "2023 Exam",
    "course": "Logic and Critical Thinking",
    "category": "Final Exam",
    "question": "Which one of the following principle of Critical Thinking states that everyone needs to be open to the possibilities of his/her initial position may be wrong or have weakness?",
    "options": [
      "The Charity principle",
      "The Suspension of Judgment Principle",
      "The Resolution Principle",
      "The Fallibility Principle",
      "The Principle of Clarity"
    ],
    "answer": 3,
    "explanation": "The fallibility principle requires participants in a critical dialogue to acknowledge from the outset that their own initial position may be mistaken, incomplete, or open to revision upon receiving stronger reasons."
  },
  {
    "id": "hu-logic-2023-final-mc-03",
    "university": "Haramaya University",
    "year": "2023 Exam",
    "course": "Logic and Critical Thinking",
    "category": "Final Exam",
    "question": "The Principle of Critical Thinking which tell us that the purpose of argument or debate is to discover truth or what is the most rational and justifiable position on an issue is:",
    "options": [
      "The Burden Proof Principle",
      "The Truth-Seeking Principle",
      "The Sufficiency Principle",
      "The Rebuttal principle",
      "The Accountability Principle."
    ],
    "answer": 1,
    "explanation": "The truth-seeking principle asserts that the central goal of any constructive rational inquiry or debate is to seek the truth or the most justified position, rather than to win at all costs."
  },
  {
    "id": "hu-logic-2023-final-mc-04",
    "university": "Haramaya University",
    "year": "2023 Exam",
    "course": "Logic and Critical Thinking",
    "category": "Final Exam",
    "question": "Given the categorical proposition, 'All banks are financial institutions'. If the quality but not the quantity is changed, the resulting obverse proposition is:",
    "options": [
      "Some banks are not financial institutions.",
      "Some banks are financial institutions.",
      "No banks are non-financial institutions.",
      "All banks are not financial institutions.",
      "No banks are financial institutions."
    ],
    "answer": 2,
    "explanation": "Obversion changes the quality (from affirmative 'All... are' to negative 'No... are') and replaces the predicate with its complement ('financial institutions' ⟹ 'non-financial institutions'), producing 'No banks are non-financial institutions'."
  },
  {
    "id": "hu-logic-2023-final-mc-17",
    "university": "Haramaya University",
    "year": "2023 Exam",
    "course": "Logic and Critical Thinking",
    "category": "Final Exam",
    "question": "Given that 'No dogs are fish. Therefore no non-fish are non-dog'. This argument is -",
    "options": [
      "Valid, contraposition.",
      "Invalid, illicit contrary.",
      "Invalid, illicit obversion.",
      "Invalid, illicit contraposition.",
      "Valid, obversion."
    ],
    "answer": 3,
    "explanation": "Contraposition is valid only for A and O propositions. Performing contraposition on an E-proposition ('No S are P' ⟹ 'No non-P are non-S') is logically invalid and commits the fallacy of illicit contraposition."
  },
  {
    "id": "hu-logic-2023-final-mc-18",
    "university": "Haramaya University",
    "year": "2023 Exam",
    "course": "Logic and Critical Thinking",
    "category": "Final Exam",
    "question": "If the given proposition, 'No birds are mammals' is false, then which of the following proposition is true (based on Boolean stand point)?",
    "options": [
      "All birds are mammals.",
      "Some birds are mammals.",
      "No non birds are mammals.",
      "Some birds are not mammals.",
      "No non mammals are non birds."
    ],
    "answer": 1,
    "explanation": "Under Boolean interpretation, the contradictory of an E proposition ('No S are P') is an I proposition ('Some S are P'). If the E proposition is false, its contradictory I proposition ('Some birds are mammals') is necessarily true."
  },
  {
    "id": "hu-logic-2023-final-mc-19",
    "university": "Haramaya University",
    "year": "2023 Exam",
    "course": "Logic and Critical Thinking",
    "category": "Final Exam",
    "question": "Identify the correct fallacy from the following argument: 'For the last thirty years the quality of education in Ethiopia has been deteriorate. The reason is obvious teachers are not doing their job.'",
    "options": [
      "Post hoc ergo propter hoc.",
      "Pro causa non causa.",
      "Oversimplification.",
      "Slippery slope.",
      "Suppressed evidence."
    ],
    "answer": 2,
    "explanation": "The fallacy of oversimplification occurs when a complex, multifaceted phenomenon with many contributing socioeconomic factors is attributed to a single simplistic cause."
  },
  {
    "id": "hu-logic-2023-final-mc-20",
    "university": "Haramaya University",
    "year": "2023 Exam",
    "course": "Logic and Critical Thinking",
    "category": "Final Exam",
    "question": "What kind of fallacy is committed by the following argument? 'Dr. Ahmed Abdo, a physician by training, has argued that the inflation in Ethiopia will continue for the next 20 years. On the basis of his expertise as a medical doctor, his argument is indeed true.'",
    "options": [
      "Appeal to ignorance.",
      "Unqualified authority.",
      "False cause.",
      "Ad hominem circumstantial.",
      "Slippery slope."
    ],
    "answer": 1,
    "explanation": "Appeal to unqualified authority (argumentum ad verecundiam) occurs when an arguer cites someone as an expert who lacks credentials in the field under discussion (a medical doctor cited on macroeconomic inflation)."
  },
  {
    "id": "hu-logic-2023-final-mc-21",
    "university": "Haramaya University",
    "year": "2023 Exam",
    "course": "Logic and Critical Thinking",
    "category": "Final Exam",
    "question": "Your Honor, it's true that I killed my parents. I fully admit that I murdered them in cold blood. But I should get a light sentence. After all, I am an orphan. What fallacy is committed?",
    "options": [
      "Appeal to force.",
      "Appeal to pity.",
      "Appeal to people.",
      "Against the person."
    ],
    "answer": 1,
    "explanation": "Appeal to pity (argumentum ad misericordiam) occurs when the arguer attempts to evoke pity or sympathy to support a conclusion instead of presenting legitimate relevant reasons."
  },
  {
    "id": "hu-logic-2023-final-mc-22",
    "university": "Haramaya University",
    "year": "2023 Exam",
    "course": "Logic and Critical Thinking",
    "category": "Final Exam",
    "question": "So many people these days are against prayer in the public schools! Of course, the assumptions underlying this view include (a) that there is no God, (b) that only matter exists, and (c) that life is essentially meaningless. That is why we must fight against these people who seek to remove prayer from our public schools. The arguer committed the fallacy of...",
    "options": [
      "Red herring.",
      "Accident.",
      "Straw man.",
      "Missing the point.",
      "Appeal to ignorance."
    ],
    "answer": 2,
    "explanation": "The straw man fallacy is committed when an arguer distorts or exaggerates an opponent's position (claiming opponents of school prayer believe life is meaningless and God does not exist) to make it easier to attack."
  },
  {
    "id": "hu-logic-2023-final-mc-23",
    "university": "Haramaya University",
    "year": "2023 Exam",
    "course": "Logic and Critical Thinking",
    "category": "Final Exam",
    "question": "Of course, it is reasonable to believe that we have been visited by extraterrestrial beings. After all, plenty of skeptics have tried, but none has been able to disprove that such visitations have occurred. Identify the fallacy of weak induction committed in this argument.",
    "options": [
      "Unqualified authority.",
      "Appeal to ignorance.",
      "Weak analogy.",
      "False cause.",
      "Slippery slope."
    ],
    "answer": 1,
    "explanation": "Appeal to ignorance (argumentum ad ignorantiam) occurs when an arguer asserts that something must be true simply because nobody has succeeded in disproving it."
  },
  {
    "id": "hu-logic-2023-final-mc-24",
    "university": "Haramaya University",
    "year": "2023 Exam",
    "course": "Logic and Critical Thinking",
    "category": "Final Exam",
    "question": "Each of the parts of this airplane is very light. Therefore, the airplane itself is very light. What kind of fallacy is committed in this argument?",
    "options": [
      "False dichotomy.",
      "Suppressed evidence.",
      "Composition.",
      "Division.",
      "Equivocation."
    ],
    "answer": 2,
    "explanation": "Fallacy of composition occurs when an attribute belonging to the individual parts is erroneously transferred to the whole object."
  },
  {
    "id": "hu-logic-2023-final-mc-25",
    "university": "Haramaya University",
    "year": "2023 Exam",
    "course": "Logic and Critical Thinking",
    "category": "Final Exam",
    "question": "Every American is either a Republican or a Democrat. Dr. Porter is an American, but she is not a Republican. So, she must be a Democrat. What is the nature of the fallacy?",
    "options": [
      "Unqualified authority.",
      "Appeal to ignorance.",
      "Begging the question.",
      "False dichotomy.",
      "Complex question."
    ],
    "answer": 3,
    "explanation": "False dichotomy (either-or fallacy) occurs when two alternative options are presented as mutually exhaustive while ignoring legitimate other possibilities (such as Independents)."
  },
  {
    "id": "hu-logic-2023-final-mc-26",
    "university": "Haramaya University",
    "year": "2023 Exam",
    "course": "Logic and Critical Thinking",
    "category": "Final Exam",
    "question": "I have worn these socks to the last five baseball games. Each time, I've gotten a base hit. So, these are my lucky socks. I play better when I wear them. What kind of fallacy is it?",
    "options": [
      "Suppressed evidence.",
      "Begging the question.",
      "False cause.",
      "Complex question.",
      "False dichotomy."
    ],
    "answer": 2,
    "explanation": "False cause (post hoc ergo propter hoc) occurs when someone presumes a causal relationship based merely on sequential occurrence in time."
  },
  {
    "id": "hu-logic-2023-final-mc-27",
    "university": "Haramaya University",
    "year": "2023 Exam",
    "course": "Logic and Critical Thinking",
    "category": "Final Exam",
    "question": "Why do all philosophical problems turn out, in the final analysis, just to be a question of how to define terms? What kind of fallacy is it?",
    "options": [
      "Unqualified authority.",
      "Appeal to ignorance.",
      "Begging the question.",
      "Complex question.",
      "Composition."
    ],
    "answer": 3,
    "explanation": "A complex question is a loaded question that presupposes an unproven assertion (that all philosophical problems are merely questions of definition) within the question itself."
  },
  {
    "id": "hu-logic-2023-final-mc-28",
    "university": "Haramaya University",
    "year": "2023 Exam",
    "course": "Logic and Critical Thinking",
    "category": "Final Exam",
    "question": "The word critical thinking refers:",
    "options": [
      "Fault- finding principle.",
      "Using careless judgment.",
      "An attempt to win argument.",
      "Ignoring evidence from the argument.",
      "An ability to make sound judgment."
    ],
    "answer": 4,
    "explanation": "Critical thinking refers to the disciplined intellectual ability to analyze, evaluate, and synthesize information to make reasonable, sound judgments."
  },
  {
    "id": "hu-logic-2023-final-mc-29",
    "university": "Haramaya University",
    "year": "2023 Exam",
    "course": "Logic and Critical Thinking",
    "category": "Final Exam",
    "question": "Which of the following statements correctly represent Critical Thinking Skills?",
    "options": [
      "We all possess the same amount of critical thinking skills and must choose to use it our daily life.",
      "Some people are born without any critical thinking skills, and therefore, cannot expect to think critically.",
      "We all have some level of skill in critical thinking and we have the capacity to improve those skills.",
      "Critical thinking skills cannot be improved overtime-you must simple do the best with what you have.",
      "Critical thinking skills are always being acquired through habits, but not through formal education."
    ],
    "answer": 2,
    "explanation": "All human beings possess foundational cognitive abilities for critical thinking, and these skills can be continuously developed, improved, and mastered through education and practice."
  },
  {
    "id": "hu-logic-2023-final-mc-30",
    "university": "Haramaya University",
    "year": "2023 Exam",
    "course": "Logic and Critical Thinking",
    "category": "Final Exam",
    "question": "The Principle of Charity in Critical Thinking means:",
    "options": [
      "The idea that we should interpret the argument or objection in the strongest way possible.",
      "The idea that we only see the good in argument that aligns with our beliefs.",
      "The idea that one should give justifiable reasons for one's own argument.",
      "The idea that one should interpret the argument in line the way the arguer meant to convey.",
      "The idea that one should be entitled for clarification of terms and concepts."
    ],
    "answer": 0,
    "explanation": "The principle of charity requires interpreting an opponent's argument in its strongest, most plausible, and most rational form before attempting to critique it."
  },
  {
    "id": "hu-logic-2023-final-tf-31",
    "university": "Haramaya University",
    "year": "2023 Exam",
    "course": "Logic and Critical Thinking",
    "category": "Final Exam",
    "question": "True or False: If the one changes the quality and quantity of the proposition, 'Some artificial hearts are mechanisms that are prone to failure.' it will be, 'All artificial hearts are mechanisms that are prone to failure.'",
    "options": [
      "True",
      "False"
    ],
    "answer": 1,
    "explanation": "False. 'Some S are P' is a particular affirmative proposition. Changing both quantity (particular to universal) and quality (affirmative to negative) results in 'No artificial hearts are mechanisms that are prone to failure', not 'All...'."
  },
  {
    "id": "hu-logic-2023-final-tf-32",
    "university": "Haramaya University",
    "year": "2023 Exam",
    "course": "Logic and Critical Thinking",
    "category": "Final Exam",
    "question": "True or False: In identifying arguments as informal fallacies, we typically must look beyond the content to the form of the argument.",
    "options": [
      "True",
      "False"
    ],
    "answer": 1,
    "explanation": "False. Formal fallacies are identified by looking at the form or structure, whereas informal fallacies can only be detected by analyzing the content and context of the argument."
  },
  {
    "id": "hu-logic-2023-final-tf-33",
    "university": "Haramaya University",
    "year": "2023 Exam",
    "course": "Logic and Critical Thinking",
    "category": "Final Exam",
    "question": "True or False: Critical thinking is, primarily a negative form of criticism, suited only for intellectuals.",
    "options": [
      "True",
      "False"
    ],
    "answer": 1,
    "explanation": "False. Critical thinking is constructive and practical, aimed at arriving at sound judgments and solving problems, and is valuable for all people in everyday life."
  },
  {
    "id": "hu-logic-2023-final-tf-34",
    "university": "Haramaya University",
    "year": "2023 Exam",
    "course": "Logic and Critical Thinking",
    "category": "Final Exam",
    "question": "True or False: According to Boolean interpretation, universal propositions must have an existential import.",
    "options": [
      "True",
      "False"
    ],
    "answer": 1,
    "explanation": "False. Under the Boolean interpretation, universal propositions ('All' and 'No') make no claim about whether members of the subject class actually exist and have no existential import."
  },
  {
    "id": "hu-logic-2023-final-tf-35",
    "university": "Haramaya University",
    "year": "2023 Exam",
    "course": "Logic and Critical Thinking",
    "category": "Final Exam",
    "question": "True or False: According to Aristotelian interpretation, if categorical propositions have contradictory relations, then they necessarily have opposite truth values.",
    "options": [
      "True",
      "False"
    ],
    "answer": 0,
    "explanation": "True. In categorical logic, contradictory propositions (A and O, E and I) always have opposite truth values; if one is true, the other is false."
  },
  {
    "id": "hu-logic-2023-final-tf-36",
    "university": "Haramaya University",
    "year": "2023 Exam",
    "course": "Logic and Critical Thinking",
    "category": "Final Exam",
    "question": "True or False: Appeal to Pity fallacy occurs when the writer appeals to fear by threatening the audience with negative consequences if his/her claim is not accepted.",
    "options": [
      "True",
      "False"
    ],
    "answer": 1,
    "explanation": "False. Appealing to fear or threatening negative consequences is the Appeal to Force (argumentum ad baculum), not Appeal to Pity."
  },
  {
    "id": "hu-logic-2023-final-tf-37",
    "university": "Haramaya University",
    "year": "2023 Exam",
    "course": "Logic and Critical Thinking",
    "category": "Final Exam",
    "question": "True or False: The proposition, 'All non-tigers are non-feline', is the contraposition of the proposition, 'No tiger is feline'.",
    "options": [
      "True",
      "False"
    ],
    "answer": 1,
    "explanation": "False. The contrapositive of 'No tiger is feline' (No S are P) is 'No non-feline is non-tiger' (No non-P are non-S), not 'All non-tigers are non-feline'."
  },
  {
    "id": "hu-logic-2023-final-tf-38",
    "university": "Haramaya University",
    "year": "2023 Exam",
    "course": "Logic and Critical Thinking",
    "category": "Final Exam",
    "question": "True or False: The proposition, 'No white-collar workers are non-high-income group', is the obverse of the following proposition, 'All white-collar workers are high income groups'",
    "options": [
      "True",
      "False"
    ],
    "answer": 0,
    "explanation": "True. The obverse of an A-proposition ('All S are P') changes quality to negative and replaces the predicate with its complement, giving 'No S are non-P'."
  },
  {
    "id": "hu-logic-2023-final-tf-39",
    "university": "Haramaya University",
    "year": "2023 Exam",
    "course": "Logic and Critical Thinking",
    "category": "Final Exam",
    "question": "True or False: The following argument is valid based on Aristotelian interpretation, 'All ants are insects. So, some ants are insects'.",
    "options": [
      "True",
      "False"
    ],
    "answer": 0,
    "explanation": "True. Under Aristotelian logic, universal propositions about existing things carry existential import, making the subalternation from 'All S are P' to 'Some S are P' logically valid."
  },
  {
    "id": "hu-logic-2023-final-tf-40",
    "university": "Haramaya University",
    "year": "2023 Exam",
    "course": "Logic and Critical Thinking",
    "category": "Final Exam",
    "question": "True or False: The following argument is valid, 'Some students are genius. Thus, Some non-geniuses are non-students.'",
    "options": [
      "True",
      "False"
    ],
    "answer": 1,
    "explanation": "False. This argument performs contraposition on an I-proposition ('Some S are P' ⟹ 'Some non-P are non-S'), which is an invalid operation (illicit contraposition)."
  },
  {
    "id": "hu-logic-2023-final-sa-01",
    "university": "Haramaya University",
    "year": "2023 Exam",
    "course": "Logic and Critical Thinking",
    "category": "Final Exam",
    "question": "A kind of fallacy in which the mistake could be identified through mere analysis of the structure of the argument is __________.",
    "options": [
      "Formal fallacy",
      "Informal fallacy",
      "Fallacy of relevance",
      "Fallacy of ambiguity"
    ],
    "answer": 0,
    "explanation": "A formal fallacy is an error in deductive logic that can be identified solely by examining the structural or grammatical form of the argument."
  },
  {
    "id": "hu-logic-2023-final-sa-02",
    "university": "Haramaya University",
    "year": "2023 Exam",
    "course": "Logic and Critical Thinking",
    "category": "Final Exam",
    "question": "According to the traditional square of opposition, the contradictory to the proposition 'All people are mortal' is __________.",
    "options": [
      "Some people are not mortal",
      "No people are mortal",
      "Some people are mortal",
      "All mortals are people"
    ],
    "answer": 0,
    "explanation": "The contradictory of an A proposition ('All S are P') is an O proposition ('Some S are not P'). Therefore, the contradictory of 'All people are mortal' is 'Some people are not mortal'."
  },
  {
    "id": "hu-logic-2023-final-sa-03",
    "university": "Haramaya University",
    "year": "2023 Exam",
    "course": "Logic and Critical Thinking",
    "category": "Final Exam",
    "question": "An inclination to judge other's cultures in terms of the values of one's own culture refers to __________.",
    "options": [
      "Ethnocentrism",
      "Egocentrism",
      "Cultural relativism",
      "Subjectivism"
    ],
    "answer": 0,
    "explanation": "Ethnocentrism is the tendency to view one's own culture as superior and to judge other cultures by the standards, norms, and values of one's own culture."
  },
  {
    "id": "hu-logic-2023-final-sa-04",
    "university": "Haramaya University",
    "year": "2023 Exam",
    "course": "Logic and Critical Thinking",
    "category": "Final Exam",
    "question": "Which principle of critical thinking goes in line with the notion of 'no one is perfect'? __________.",
    "options": [
      "The Fallibility Principle",
      "The Charity Principle",
      "The Sufficiency Principle",
      "The Rebuttal Principle"
    ],
    "answer": 0,
    "explanation": "The fallibility principle reflects the acknowledgment that human reasoning is imperfect and that anyone engaged in discussion must be willing to admit their position may be flawed."
  },
  {
    "id": "hu-logic-2023-final-sa-05",
    "university": "Haramaya University",
    "year": "2023 Exam",
    "course": "Logic and Critical Thinking",
    "category": "Final Exam",
    "question": "An attribute of categorical proposition that can be determined by whether the proposition affirms or denies the class membership is __________.",
    "options": [
      "Quality",
      "Quantity",
      "Distribution",
      "Copula"
    ],
    "answer": 0,
    "explanation": "Quality refers to whether a proposition is affirmative (affirming class membership) or negative (denying class membership)."
  },
  {
    "id": "hu-logic-2023-final-sa-06",
    "university": "Haramaya University",
    "year": "2023 Exam",
    "course": "Logic and Critical Thinking",
    "category": "Final Exam",
    "question": "If an arguer violates the burden of proof principle, then he/she would commit the fallacy of __________.",
    "options": [
      "Appeal to ignorance (argumentum ad ignorantiam)",
      "Begging the question",
      "Straw man",
      "False dichotomy"
    ],
    "answer": 0,
    "explanation": "Demanding that an opponent disprove an unverified claim instead of presenting evidence oneself violates the burden of proof, committing the fallacy of appeal to ignorance."
  },
  {
    "id": "hu-logic-2023-final-sa-07",
    "university": "Haramaya University",
    "year": "2023 Exam",
    "course": "Logic and Critical Thinking",
    "category": "Final Exam",
    "question": "All persons in Ethiopia have equal rights. Therefore, Haramaya University should admit all students and applicants regardless of their high school records and low status of University entrance scores. The arguer committed the fallacy of __________.",
    "options": [
      "Accident",
      "Hasty generalization",
      "False cause",
      "Appeal to pity"
    ],
    "answer": 0,
    "explanation": "The fallacy of accident is committed when a broad constitutional or legal rule (equal rights) is improperly applied to a specific context (university academic admission requirements) that has valid exceptional criteria."
  },
  {
    "id": "hu-logic-2023-final-sa-08",
    "university": "Haramaya University",
    "year": "2023 Exam",
    "course": "Logic and Critical Thinking",
    "category": "Final Exam",
    "question": "One form of socio-centrism where individuals blindly follow the crowd or group standard is said to be __________.",
    "options": [
      "Conformism (groupthink)",
      "Ethnocentrism",
      "Superiority bias",
      "Self-serving bias"
    ],
    "answer": 0,
    "explanation": "Conformism is the uncritical tendency to conform to group norms, peer pressure, or crowd standards without rational evaluation."
  },
  {
    "id": "hu-logic-2023-final-sa-09",
    "university": "Haramaya University",
    "year": "2023 Exam",
    "course": "Logic and Critical Thinking",
    "category": "Final Exam",
    "question": "It is a philosophical view which assumes truth is a matter of individual or group opinion is __________.",
    "options": [
      "Relativism (subjectivism)",
      "Objectivism",
      "Rationalism",
      "Dogmatism"
    ],
    "answer": 0,
    "explanation": "Relativism is the philosophical stance asserting that truth is not objective or universal, but instead subjective and dependent on individual opinion or cultural perspective."
  },
  {
    "id": "hu-logic-2023-final-sa-10",
    "university": "Haramaya University",
    "year": "2023 Exam",
    "course": "Logic and Critical Thinking",
    "category": "Final Exam",
    "question": "It is one principle of good argument which requires that there should be large number of strong premises in the argument is said to be __________.",
    "options": [
      "The Sufficiency Principle",
      "The Rebuttal Principle",
      "The Structural Principle",
      "The Acceptability Principle"
    ],
    "answer": 0,
    "explanation": "The sufficiency principle requires that the premises offered in support of a claim be sufficient in quantity, quality, and weight to establish the conclusion."
  }
];
module.exports = questions;
