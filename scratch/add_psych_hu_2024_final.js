const fs = require('fs');
const path = require('path');

const examsPath = path.join(__dirname, '..', 'data', 'exams.json');
const exams = JSON.parse(fs.readFileSync(examsPath, 'utf8'));

const newQuestions = [
  // --- Part I: True/False Items ---
  {
    id: "hu-psy-2024-final-tf-01",
    university: "Haramaya University",
    year: "2024 Exam",
    course: "General Psychology",
    category: "Final Exam",
    question: "Sensory memory is generally thought of as having small capacity and long duration.",
    options: ["True", "False"],
    answer: 1,
    explanation: "Sensory memory has a very large (virtually unlimited) capacity, but an extremely brief duration (typically milliseconds to a few seconds)."
  },
  {
    id: "hu-psy-2024-final-tf-02",
    university: "Haramaya University",
    year: "2024 Exam",
    course: "General Psychology",
    category: "Final Exam",
    question: "Personality can be predicted well when the behaviors of an individual are aggregated or averaged across different situations.",
    options: ["True", "False"],
    answer: 0,
    explanation: "According to the principle of aggregation, while personality traits might not predict a single specific behavior, they accurately predict aggregated or average behavior across multiple situations over time."
  },
  {
    id: "hu-psy-2024-final-tf-03",
    university: "Haramaya University",
    year: "2024 Exam",
    course: "General Psychology",
    category: "Final Exam",
    question: "Learning theorists argue that personality is primarily a matter of making conscious choices and rational decisions.",
    options: ["True", "False"],
    answer: 1,
    explanation: "Learning/behavioral theorists argue that personality is shaped primarily by environmental stimuli, conditioning, patterns of reinforcement, and punishment, rather than conscious rational choices (which is more central to humanistic or cognitive views)."
  },
  {
    id: "hu-psy-2024-final-tf-04",
    university: "Haramaya University",
    year: "2024 Exam",
    course: "General Psychology",
    category: "Final Exam",
    question: "Unconditional positive regard plays an important role in the process of self-actualization than conditional positive regard.",
    options: ["True", "False"],
    answer: 0,
    explanation: "Carl Rogers' humanistic theory emphasizes that unconditional positive regard is essential for healthy psychological growth and self-actualization, whereas conditional positive regard creates conditions of worth that hinder growth."
  },
  {
    id: "hu-psy-2024-final-tf-05",
    university: "Haramaya University",
    year: "2024 Exam",
    course: "General Psychology",
    category: "Final Exam",
    question: "Memory trace theory states that memories simply fade with time if they are not accessed now and then.",
    options: ["True", "False"],
    answer: 0,
    explanation: "Decay theory (or memory trace decay theory) posits that physical memory traces (engrams) automatically fade and erode over time if they are not periodically rehearsed or retrieved."
  },
  {
    id: "hu-psy-2024-final-tf-06",
    university: "Haramaya University",
    year: "2024 Exam",
    course: "General Psychology",
    category: "Final Exam",
    question: "A mere deviation from the mass is a sufficient condition to define abnormality.",
    options: ["True", "False"],
    answer: 1,
    explanation: "Statistical deviation alone is not a sufficient criterion for defining psychological abnormality, as non-harmful or highly positive exceptional traits (e.g., genius intelligence) deviate from the average without being abnormal/pathological."
  },
  {
    id: "hu-psy-2024-final-tf-07",
    university: "Haramaya University",
    year: "2024 Exam",
    course: "General Psychology",
    category: "Final Exam",
    question: "A mood state that vacillates between depression and mania is called bipolar disorder.",
    options: ["True", "False"],
    answer: 0,
    explanation: "Bipolar disorder is defined by alternating episodes of emotional highs (mania or hypomania) and lows (depression)."
  },
  {
    id: "hu-psy-2024-final-tf-08",
    university: "Haramaya University",
    year: "2024 Exam",
    course: "General Psychology",
    category: "Final Exam",
    question: "The conscious mind contains all the things of which a person is aware at any moment.",
    options: ["True", "False"],
    answer: 0,
    explanation: "In Freud's topographic model of mind, the conscious layer encompasses everything a person is actively aware of at a given moment."
  },

  // --- Part II: Completion Items ---
  {
    id: "hu-psy-2024-final-comp-01",
    university: "Haramaya University",
    year: "2024 Exam",
    course: "General Psychology",
    category: "Final Exam",
    question: "A psycho-sexual stage where children's sexual feelings remain inactive is termed as __________.",
    options: [
      "Latency stage",
      "Phallic stage",
      "Anal stage",
      "Genital stage"
    ],
    answer: 0,
    explanation: "During Freud's latency stage (around 6 years to puberty), sexual impulses remain dormant/inactive as focus shifts toward social and academic skills."
  },
  {
    id: "hu-psy-2024-final-comp-02",
    university: "Haramaya University",
    year: "2024 Exam",
    course: "General Psychology",
    category: "Final Exam",
    question: "The process of grouping or packing of information into higher order units that can be remembered as single units is called __________.",
    options: [
      "Chunking",
      "Rehearsal",
      "Encoding",
      "Consolidation"
    ],
    answer: 0,
    explanation: "Chunking is the cognitive strategy of organizing smaller bits of information into meaningful, larger units to expand short-term memory capacity."
  },
  {
    id: "hu-psy-2024-final-comp-03",
    university: "Haramaya University",
    year: "2024 Exam",
    course: "General Psychology",
    category: "Final Exam",
    question: "A psychological defense mechanism that involves expressing sexual or aggressive behavior through indirect socially acceptable outlets is called __________.",
    options: [
      "Sublimation",
      "Projection",
      "Displacement",
      "Reaction formation"
    ],
    answer: 0,
    explanation: "Sublimation converts unpalatable unconscious drives (like primitive aggression or sexual impulses) into constructive, socially valued activities."
  },
  {
    id: "hu-psy-2024-final-comp-04",
    university: "Haramaya University",
    year: "2024 Exam",
    course: "General Psychology",
    category: "Final Exam",
    question: "A type of motivation in which individuals act because the action leads to an outcome that is external to a person is called __________.",
    options: [
      "Extrinsic motivation",
      "Intrinsic motivation",
      "Biological motivation",
      "Implicit motivation"
    ],
    answer: 0,
    explanation: "Extrinsic motivation drives behavior performed for external rewards or to avoid external consequences rather than internal satisfaction."
  },

  // --- Part III: Multiple Choice Items ---
  {
    id: "hu-psy-2024-final-mc-01",
    university: "Haramaya University",
    year: "2024 Exam",
    course: "General Psychology",
    category: "Final Exam",
    question: "After cheating in a business transaction, Tilahun reduces his guilt by stating that 'everyone does it.' Which defense mechanism best applies to this scenario?",
    options: [
      "Rationalization",
      "Denial",
      "Sublimation",
      "Reaction formation"
    ],
    answer: 0,
    explanation: "Rationalization involves offering self-justifying or plausible excuses ('everyone does it') in place of the real, guilt-inducing reasons for one's actions."
  },
  {
    id: "hu-psy-2024-final-mc-02",
    university: "Haramaya University",
    year: "2024 Exam",
    course: "General Psychology",
    category: "Final Exam",
    question: "You are trying to learn a speech. In order to increase your chances of recalling the whole speech from memory, you should give extra practice time to the:",
    options: [
      "Middle of the speech",
      "Beginning of the speech",
      "End of the speech",
      "Beginning and end of the speech"
    ],
    answer: 0,
    explanation: "Due to the serial position effect (primacy and recency effects), people naturally remember the beginning and end of a list/speech best, while items in the middle are most prone to being forgotten and need extra practice."
  },
  {
    id: "hu-psy-2024-final-mc-03",
    university: "Haramaya University",
    year: "2024 Exam",
    course: "General Psychology",
    category: "Final Exam",
    question: "All of the following are true about the behaviorist view of personality, except:",
    options: [
      "The first few years are decisive in personality development.",
      "People are born neither good nor bad.",
      "Learning takes the lion's share for our behaviors.",
      "Human beings are infinitely changeable."
    ],
    answer: 0,
    explanation: "The idea that early childhood years fix/decide adult personality is a fundamental premise of Freud's Psychoanalytic theory, whereas Behaviorists view personality as continuously adaptable and malleable across the lifespan through new conditioning."
  },
  {
    id: "hu-psy-2024-final-mc-04",
    university: "Haramaya University",
    year: "2024 Exam",
    course: "General Psychology",
    category: "Final Exam",
    question: "Which one of the following is an example of an elaborative rehearsal that could be used to learn the names of a group of people?",
    options: [
      "Writing a list of names",
      "Looking at each face and saying the name over and over",
      "Rehearsing the names in alphabetical order",
      "Reading the names many times"
    ],
    answer: 1,
    explanation: "Elaborative rehearsal involves actively linking new information to existing knowledge or sensory cues (e.g., connecting a face directly to a name) rather than simple rote repetition."
  },
  {
    id: "hu-psy-2024-final-mc-05",
    university: "Haramaya University",
    year: "2024 Exam",
    course: "General Psychology",
    category: "Final Exam",
    question: "Which one of the following is the characteristic of the super ego?",
    options: [
      "It is ruled by pleasure principle",
      "It operates in logical thinking",
      "It strives for perfection",
      "It is the executive body of personality"
    ],
    answer: 2,
    explanation: "The superego represents moral standards and ideal goals, striving relentlessly for perfection rather than mere reality or pleasure."
  },
  {
    id: "hu-psy-2024-final-mc-06",
    university: "Haramaya University",
    year: "2024 Exam",
    course: "General Psychology",
    category: "Final Exam",
    question: "Samuel was driving home. All of a sudden he couldn't breathe, he broke out into a sweat & his heart began racing and he thought he was going to die. This scenario characterizes:",
    options: [
      "Generalized anxiety Disorder",
      "PTSD",
      "Major depressive disorder",
      "Panic Disorder"
    ],
    answer: 3,
    explanation: "Abrupt episodes of severe terror, breathlessness, racing heart rate, and an impending fear of death define a classic panic attack characteristic of Panic Disorder."
  },
  {
    id: "hu-psy-2024-final-mc-07",
    university: "Haramaya University",
    year: "2024 Exam",
    course: "General Psychology",
    category: "Final Exam",
    question: "Almaz's husband died 2 years ago. However, she continues to set a place for him at the dinner table. This is an example of:",
    options: [
      "Repression",
      "Denial",
      "Projection",
      "Regression"
    ],
    answer: 1,
    explanation: "Refusing to acknowledge an objective reality (acting as though a deceased spouse is still present) is the defense mechanism of Denial."
  },
  {
    id: "hu-psy-2024-final-mc-08",
    university: "Haramaya University",
    year: "2024 Exam",
    course: "General Psychology",
    category: "Final Exam",
    question: "Which alternative holds the correct order of the Maslow's hierarchy of needs?",
    options: [
      "Physiological needs - Safety needs - Esteem needs - Love needs - Self-actualization",
      "Physiological needs - Love needs - Safety needs - Esteem needs - Self-actualization",
      "Physiological needs - Esteem needs - Love needs - Safety needs - Self-actualization",
      "Physiological needs - Safety needs - Love needs - Esteem needs - Self-actualization"
    ],
    answer: 3,
    explanation: "Maslow's hierarchy ascends sequentially from fundamental physical needs to higher psychological fulfillment: Physiological → Safety → Love/Belongingness → Esteem → Self-Actualization."
  },
  {
    id: "hu-psy-2024-final-mc-09",
    university: "Haramaya University",
    year: "2024 Exam",
    course: "General Psychology",
    category: "Final Exam",
    question: "Which of the following perspective believe that unhealthy personality is caused by disturbed internal dialogue?",
    options: [
      "Learning perspective",
      "Biological perspective",
      "Psychoanalytic perspective",
      "Cognitive perspective"
    ],
    answer: 3,
    explanation: "The cognitive approach highlights internal self-talk, negative automatic thoughts, and internal dialogue as core determinants of psychological health or dysfunction."
  },
  {
    id: "hu-psy-2024-final-mc-10",
    university: "Haramaya University",
    year: "2024 Exam",
    course: "General Psychology",
    category: "Final Exam",
    question: "Helen felt hunger and desperately craving for food. She said to her mother 'oh this kids are very hungry, do you have some food?' Which defense mechanism she used?",
    options: [
      "Reaction formation",
      "Undoing",
      "Projection",
      "Sublimation"
    ],
    answer: 2,
    explanation: "Attributing one's own unacknowledged feeling, impulse, or desire onto others (saying 'these kids are hungry' instead of admitting one's own desperate hunger) is an example of Projection."
  },
  {
    id: "hu-psy-2024-final-mc-11",
    university: "Haramaya University",
    year: "2024 Exam",
    course: "General Psychology",
    category: "Final Exam",
    question: "Boys sexual attractions to their mothers and jealousy of their fathers is called __________.",
    options: [
      "Electra complex",
      "Oedipus complex",
      "Penis envy",
      "Castration anxiety"
    ],
    answer: 1,
    explanation: "Freud's psychosexual framework terms a boy's unconscious attachment to his mother and rivalry toward his father the Oedipus complex."
  },
  {
    id: "hu-psy-2024-final-mc-12",
    university: "Haramaya University",
    year: "2024 Exam",
    course: "General Psychology",
    category: "Final Exam",
    question: "Mr. Gemechu when he met his friend after a long time, he recalled his past events, situations, and personal experiences with him. This type of memory is known as __________.",
    options: [
      "Explicit memory",
      "Episodic memory",
      "Semantic memory",
      "Implicit memory"
    ],
    answer: 1,
    explanation: "Episodic memory stores personally experienced autobiographical events and specific past situations tied to a particular time and place."
  },
  {
    id: "hu-psy-2024-final-mc-13",
    university: "Haramaya University",
    year: "2024 Exam",
    course: "General Psychology",
    category: "Final Exam",
    question: "Which one of the following is not the characteristic of 'id' structure of personality?",
    options: [
      "It is amoral",
      "It operate at conscious level",
      "It is irrational",
      "It is the source of energy"
    ],
    answer: 1,
    explanation: "The id resides entirely within the unconscious mind and operates on the pleasure principle without conscious awareness."
  },
  {
    id: "hu-psy-2024-final-mc-14",
    university: "Haramaya University",
    year: "2024 Exam",
    course: "General Psychology",
    category: "Final Exam",
    question: "Earlier learned information interferes and cause to forget the later learned information is known as:",
    options: [
      "Proactive interference",
      "Retroactive interference",
      "Motivated forgetting",
      "Cue dependent forgetting"
    ],
    answer: 0,
    explanation: "Proactive interference occurs when older, previously stored information hinders the recall of newer information."
  },
  {
    id: "hu-psy-2024-final-mc-15",
    university: "Haramaya University",
    year: "2024 Exam",
    course: "General Psychology",
    category: "Final Exam",
    question: "All of the following characterize a person fixated at the anal stage, except:",
    options: [
      "Messy",
      "Stingy",
      "Nail biting",
      "Punctual"
    ],
    answer: 2,
    explanation: "Nail biting is typically associated with fixation at the oral stage. Anal fixation produces traits associated with retentiveness/expulsion (e.g., messiness, stinginess, perfectionism/punctuality)."
  },
  {
    id: "hu-psy-2024-final-mc-16",
    university: "Haramaya University",
    year: "2024 Exam",
    course: "General Psychology",
    category: "Final Exam",
    question: "According to Humanistic perspective, Psychological problems arises from __________.",
    options: [
      "Our quality of internal dialogue",
      "Inability of Ego to manage the opposing demands of the id and the superego",
      "Improper working of chemicals in the brain",
      "Failure to find meaning in life and fulfill the required potential"
    ],
    answer: 3,
    explanation: "Humanistic psychology identifies psychological distress as stemming from blocked self-actualization, conditions of worth, and failure to realize one's full potential."
  },
  {
    id: "hu-psy-2024-final-mc-17",
    university: "Haramaya University",
    year: "2024 Exam",
    course: "General Psychology",
    category: "Final Exam",
    question: "Assume that Elsa must either go to Canada or marry her friend live in her homeland; so which motivational conflict Elsa potentially faced with in her choice of one?",
    options: [
      "Approach-approach",
      "Avoidance-avoidance conflict",
      "Approach-avoidance conflict",
      "Multiple Approach-avoidance conflict"
    ],
    answer: 0,
    explanation: "An approach-approach conflict arises when an individual must choose between two desirable and appealing outcomes."
  },
  {
    id: "hu-psy-2024-final-mc-18",
    university: "Haramaya University",
    year: "2024 Exam",
    course: "General Psychology",
    category: "Final Exam",
    question: "Forgetting can happen due to intentionally pushing down the painful experiences into unconscious mind; which explanation is best suited for such situation of forgetting?",
    options: [
      "Encoding failure",
      "Proactive interference",
      "Cue dependent forgetting",
      "Motivated forgetting"
    ],
    answer: 3,
    explanation: "Motivated forgetting (specifically repression or conscious suppression) occurs when distressing or painful memories are actively blocked from awareness."
  },
  {
    id: "hu-psy-2024-final-mc-19",
    university: "Haramaya University",
    year: "2024 Exam",
    course: "General Psychology",
    category: "Final Exam",
    question: "In which of the psycho-sexual stage is pleasure derived from fondling the genitals?",
    options: [
      "Oral stage",
      "Anal stage",
      "Phallic stage",
      "Latency stage"
    ],
    answer: 2,
    explanation: "During the phallic stage (ages 3–6), the primary erogenous zone shifts to the genitals."
  },
  {
    id: "hu-psy-2024-final-mc-20",
    university: "Haramaya University",
    year: "2024 Exam",
    course: "General Psychology",
    category: "Final Exam",
    question: "Among the following theory of emotion, which one is suggested to come up with the explanation that emotion and physiological arousal occur at the same time?",
    options: [
      "Schachter-Singer theory",
      "William James theory",
      "Cannon-Bard theory of emotion",
      "James-Lange theory of emotion"
    ],
    answer: 2,
    explanation: "The Cannon-Bard theory asserts that emotional experiences and bodily physiological reactions occur simultaneously and independently."
  },
  {
    id: "hu-psy-2024-final-mc-21",
    university: "Haramaya University",
    year: "2024 Exam",
    course: "General Psychology",
    category: "Final Exam",
    question: "Solomon wants to buy a new MP3 player in a local electronics store, but he doesn't have enough money to pay for it; which structure of Solomon's personality would advise him to take time and buy it when he gets the money needed?",
    options: [
      "Ego",
      "Id",
      "Super ego",
      "Libido"
    ],
    answer: 0,
    explanation: "The Ego operates on the reality principle, delaying gratification and planning realistic ways to satisfy desires without negative consequences."
  },
  {
    id: "hu-psy-2024-final-mc-22",
    university: "Haramaya University",
    year: "2024 Exam",
    course: "General Psychology",
    category: "Final Exam",
    question: "Which one of the following best describes individuals with low neuroticism score?",
    options: [
      "More likely to experience negative emotions",
      "Less likely to interpret ordinary situations as threatening",
      "Hesitate to make decisions alone",
      "Less interested in leisure & social activities"
    ],
    answer: 1,
    explanation: "Low neuroticism is characterized by emotional stability, calmness, and resilience, making individuals less prone to perceiving ordinary situations as distressing or threatening."
  }
];

// Verify IDs are unique
const existingIds = new Set(exams.map(e => e.id));
const duplicates = newQuestions.filter(q => existingIds.has(q.id));
if (duplicates.length > 0) {
  console.error('Error: duplicate IDs found:', duplicates.map(d => d.id));
  process.exit(1);
}

// Append new questions
const updatedExams = [...exams, ...newQuestions];
fs.writeFileSync(examsPath, JSON.stringify(updatedExams, null, 2), 'utf8');

console.log(`Successfully added ${newQuestions.length} Haramaya University Psychology 2024 Final Exam questions.`);
console.log(`Total questions in exams.json: ${updatedExams.length}`);
