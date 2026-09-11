const fs = require('fs');
const path = require('path');

const examsPath = path.resolve(__dirname, '../data/exams.json');
const exams = JSON.parse(fs.readFileSync(examsPath, 'utf8'));

const newHararQuestions = [
  // Part I: True / False Items (1 - 5)
  {
    id: 'hu-psy-harar-tf-01',
    university: 'Haramaya University',
    year: '2022 Exam',
    course: 'General Psychology',
    question: 'True or False: We use monocular cues to determine closeness and binocular cues to determine farness.',
    options: ['True', 'False'],
    answer: 1,
    explanation: 'Both monocular cues and binocular cues contribute to distance and depth perception; binocular cues operate primarily at closer ranges (< few meters), not specifically for farness.',
    category: 'Mid Exam'
  },
  {
    id: 'hu-psy-harar-tf-02',
    university: 'Haramaya University',
    year: '2022 Exam',
    course: 'General Psychology',
    question: 'True or False: A researcher who wants to establish evidence for a cause-effect relationship between variables may use correlational research.',
    options: ['True', 'False'],
    answer: 1,
    explanation: 'Correlational research establishes association, not causation. Only an experimental design with manipulated independent variables can establish cause-and-effect relationships.',
    category: 'Mid Exam'
  },
  {
    id: 'hu-psy-harar-tf-03',
    university: 'Haramaya University',
    year: '2022 Exam',
    course: 'General Psychology',
    question: 'True or False: Humanistic psychologists believe that each person is the chief architect of his/her behavior.',
    options: ['True', 'False'],
    answer: 0,
    explanation: 'Humanistic psychology emphasizes human agency, personal responsibility, free will, and conscious self-direction.',
    category: 'Mid Exam'
  },
  {
    id: 'hu-psy-harar-tf-04',
    university: 'Haramaya University',
    year: '2022 Exam',
    course: 'General Psychology',
    question: 'True or False: Operant conditioning is considered as an independent form of learning.',
    options: ['True', 'False'],
    answer: 0,
    explanation: 'Operant (instrumental) conditioning is established as a distinct, independent learning paradigm alongside classical conditioning and observational learning.',
    category: 'Mid Exam'
  },
  {
    id: 'hu-psy-harar-tf-05',
    university: 'Haramaya University',
    year: '2022 Exam',
    course: 'General Psychology',
    question: 'True or False: The amount of change required to notice the change in a stimulus is called the just noticeable difference.',
    options: ['True', 'False'],
    answer: 0,
    explanation: 'The Just Noticeable Difference (JND), or difference threshold, is the minimum amount by which a stimulus must change for an observer to detect the difference.',
    category: 'Mid Exam'
  },

  // Part II: Multiple Choice (1 - 15)
  {
    id: 'hu-psy-harar-mc-01',
    university: 'Haramaya University',
    year: '2022 Exam',
    course: 'General Psychology',
    question: 'Which one of the following best describes the field of developmental psychology?',
    options: [
      'The study of how we grow and change from conception to death.',
      'The study of how we grow and change in infancy and childhood.',
      'The study of physical, cognitive, and psychosocial growth in children.',
      'The study of emotions, personality, and social relationships.'
    ],
    answer: 0,
    explanation: 'Developmental psychology investigates human physical, cognitive, and psychosocial changes across the entire lifespan from conception to death.',
    category: 'Mid Exam'
  },
  {
    id: 'hu-psy-harar-mc-02',
    university: 'Haramaya University',
    year: '2022 Exam',
    course: 'General Psychology',
    question: 'Which one of the following is a learned behavior?',
    options: [
      'Baby crawling',
      'Spider spinning a web',
      'Fear of spiders',
      'Pulling your hand away after touching a hot object'
    ],
    answer: 2,
    explanation: 'Web-spinning is an instinct, pulling away from heat is a spinal reflex, and crawling is biological maturation. A specific fear of spiders is an acquired, learned response.',
    category: 'Mid Exam'
  },
  {
    id: 'hu-psy-harar-mc-03',
    university: 'Haramaya University',
    year: '2022 Exam',
    course: 'General Psychology',
    question: 'Which schedule of reinforcement results in the slowest acquisition of behavior?',
    options: [
      'Fixed ratio',
      'Fixed interval',
      'Variable ratio',
      'Variable interval'
    ],
    answer: 3,
    explanation: 'Variable-interval reinforcement produces the slowest, most gradual acquisition rate among operant schedules, while delivering high resistance to extinction.',
    category: 'Mid Exam'
  },
  {
    id: 'hu-psy-harar-mc-04',
    university: 'Haramaya University',
    year: '2022 Exam',
    course: 'General Psychology',
    question: 'A cup of milk would require a certain amount of sugar before you could detect a sweet taste. This example indicates:',
    options: [
      'Absolute threshold',
      'Difference threshold',
      'Sensory threshold',
      'Threshold'
    ],
    answer: 0,
    explanation: 'The absolute threshold is the minimum stimulus intensity necessary for a sensory system to detect its presence at least 50% of the time.',
    category: 'Mid Exam'
  },
  {
    id: 'hu-psy-harar-mc-05',
    university: 'Haramaya University',
    year: '2022 Exam',
    course: 'General Psychology',
    question: 'Which of the following psychologists are capable of examining the validity of eyewitness testimony?',
    options: [
      'Counseling psychologists',
      'Health psychologists',
      'Clinical psychologists',
      'Forensic psychologists'
    ],
    answer: 3,
    explanation: 'Forensic psychologists apply psychological science to the justice system, including evaluating the reliability of eyewitness memory.',
    category: 'Mid Exam'
  },
  {
    id: 'hu-psy-harar-mc-06',
    university: 'Haramaya University',
    year: '2022 Exam',
    course: 'General Psychology',
    question: 'On a recent visit to the doctor, Kedir was given a painful injection. Since then, Kedir not only refuses to go to the same doctor, but also will not go to see any doctor or dentist. Kedir refusal behavior is an example of:',
    options: [
      'Stimulus generalization',
      'Stimulus discrimination',
      'Extinction',
      'Punishment'
    ],
    answer: 0,
    explanation: 'Stimulus generalization occurs when a conditioned response transfers to other stimuli that resemble the original conditioned stimulus.',
    category: 'Mid Exam'
  },
  {
    id: 'hu-psy-harar-mc-07',
    university: 'Haramaya University',
    year: '2022 Exam',
    course: 'General Psychology',
    question: 'The process of becoming less sensitive to unchanging stimulus is referred to as:',
    options: [
      'Sensory deprivation',
      'Signal detection',
      'Sensory overload',
      'Sensory adaptation'
    ],
    answer: 3,
    explanation: 'Sensory adaptation is the declining sensitivity of sensory receptors following prolonged, constant stimulation.',
    category: 'Mid Exam'
  },
  {
    id: 'hu-psy-harar-mc-08',
    university: 'Haramaya University',
    year: '2022 Exam',
    course: 'General Psychology',
    question: 'Classical conditioning differs from operant conditioning in that:',
    options: [
      'The learner plays a more active role in classical conditioning.',
      'Behavior learned in classical conditioning is deliberate & goal directed',
      'The response almost occurs prior to the stimulus in classical conditioning.',
      'The response in classical conditioning is reflexive.'
    ],
    answer: 3,
    explanation: 'Classical conditioning deals with automatic, involuntary, and reflexive responses, whereas operant conditioning deals with voluntary, emitted actions.',
    category: 'Mid Exam'
  },
  {
    id: 'hu-psy-harar-mc-09',
    university: 'Haramaya University',
    year: '2022 Exam',
    course: 'General Psychology',
    question: 'If you had sight in only one eye, which of the following depth cues could you NOT use?',
    options: [
      'Texture gradient',
      'Convergence',
      'Interposition',
      'Shading'
    ],
    answer: 1,
    explanation: 'Convergence is a binocular cue that depends on the coordinated muscular movement of both eyes turning inward.',
    category: 'Mid Exam'
  },
  {
    id: 'hu-psy-harar-mc-10',
    university: 'Haramaya University',
    year: '2022 Exam',
    course: 'General Psychology',
    question: 'The schedule of reinforcement associated with playing slot machines and other types of gambling is:',
    options: [
      'Fixed ratio',
      'Variable ratio',
      'Fixed interval',
      'Variable interval'
    ],
    answer: 1,
    explanation: 'Gambling devices reward users on a Variable Ratio schedule based on an unpredictable number of attempts.',
    category: 'Mid Exam'
  },
  {
    id: 'hu-psy-harar-mc-11',
    university: 'Haramaya University',
    year: '2022 Exam',
    course: 'General Psychology',
    question: 'All of the following are true about behaviorism, EXCEPT:',
    options: [
      'The first few years are decisive in personality development.',
      'People are born neither good nor bad.',
      'Learning takes the lion\'s share for our behaviors.',
      'Human beings are infinitely changeable.'
    ],
    answer: 0,
    explanation: 'Decisive early childhood determination is a core psychoanalytic claim (Freud), not behaviorism. Behaviorism views personality as continuously shaped by environment.',
    category: 'Mid Exam'
  },
  {
    id: 'hu-psy-harar-mc-12',
    university: 'Haramaya University',
    year: '2022 Exam',
    course: 'General Psychology',
    question: 'What does the deduction of salary of an employee who was showing misconduct in an organization represent?',
    options: [
      'Negative punishment',
      'Negative reinforcement',
      'Positive punishment',
      'Positive reinforcement'
    ],
    answer: 0,
    explanation: 'Salary deduction removes a desired reward (money) following an undesirable behavior to decrease that behavior, representing negative punishment.',
    category: 'Mid Exam'
  },
  {
    id: 'hu-psy-harar-mc-13',
    university: 'Haramaya University',
    year: '2022 Exam',
    course: 'General Psychology',
    question: 'Being in an overcrowded room with lots of people talking, Mr \'x\' is attempting to ignore the flooding of information and focused on only what is important for him. This process is known as:',
    options: [
      'Sensory deprivation',
      'Sensory overload',
      'Selective attention',
      'Sensory adaptation'
    ],
    answer: 2,
    explanation: 'Selective attention allows an individual to focus on a chosen auditory or visual stream while filtering out extraneous stimuli.',
    category: 'Mid Exam'
  },
  {
    id: 'hu-psy-harar-mc-14',
    university: 'Haramaya University',
    year: '2022 Exam',
    course: 'General Psychology',
    question: 'Suppose a one-year old child is playing with a toy near an electrical outlet. He sticks part of the toy into the outlet. He gets shocked, becomes frightened, and begins to cry. For several days after that experience, he shows fear when his mother gives him the toy and he refuses to play with it. In classical conditioning, the toy represents:',
    options: [
      'Conditioned stimulus',
      'Unconditioned stimulus',
      'Unconditioned response',
      'Conditioned response'
    ],
    answer: 0,
    explanation: 'The toy was a neutral stimulus that, after being paired with electrical shock (UCS), became a Conditioned Stimulus (CS) producing fear (CR).',
    category: 'Mid Exam'
  },
  {
    id: 'hu-psy-harar-mc-15',
    university: 'Haramaya University',
    year: '2022 Exam',
    course: 'General Psychology',
    question: 'You are shown a picture of your grandfather\'s face, but the eyes and mouth are obstructed. You still recognize it as a picture of your grandfather. Which type of principle best explains this example of perception?',
    options: [
      'Figure-ground principle',
      'Closure',
      'Proximity',
      'Good continuation'
    ],
    answer: 1,
    explanation: 'The Gestalt principle of Closure explains how our mind automatically completes missing contours to perceive a complete, meaningful image.',
    category: 'Mid Exam'
  },

  // Part III: Completion Items (1 - 3)
  {
    id: 'hu-psy-harar-comp-01',
    university: 'Haramaya University',
    year: '2022 Exam',
    course: 'General Psychology',
    question: 'Our visual ability to perceive the world in three dimensions and judging the distance of an object is said to be:',
    options: [
      'Depth perception',
      'Visual acuity',
      'Feature detection',
      'Sensory adaptation'
    ],
    answer: 0,
    explanation: 'Depth perception is the cognitive and visual ability to judge distance and three-dimensional spatial relationships.',
    category: 'Mid Exam'
  },
  {
    id: 'hu-psy-harar-comp-02',
    university: 'Haramaya University',
    year: '2022 Exam',
    course: 'General Psychology',
    question: 'A branch of psychology that studies about the relationship between psychological factors and physical ailments is called:',
    options: [
      'Health psychology',
      'Clinical psychology',
      'Counseling psychology',
      'Forensic psychology'
    ],
    answer: 0,
    explanation: 'Health psychology focuses on how psychological, emotional, and social factors interact with physical illness and health.',
    category: 'Mid Exam'
  },
  {
    id: 'hu-psy-harar-comp-03',
    university: 'Haramaya University',
    year: '2022 Exam',
    course: 'General Psychology',
    question: 'Which school of thought argues that psychology should focus on how the mind allows people to adapt to the real world?',
    options: [
      'Functionalism (William James)',
      'Structuralism (Edward Titchener)',
      'Psychoanalysis (Sigmund Freud)',
      'Gestalt Psychology (Max Wertheimer)'
    ],
    answer: 0,
    explanation: 'Functionalism, founded by William James, emphasized the adaptive evolutionary purpose of conscious mental processes.',
    category: 'Mid Exam'
  },

  // Part IV: Supply Items - Scenario 1 (Ikram Harar Campus) (1A, 1B, 1C)
  {
    id: 'hu-psy-harar-sc1-01',
    university: 'Haramaya University',
    year: '2022 Exam',
    course: 'General Psychology',
    question: 'Ikram is conducting her senior essay entitled \"Examining the relationship between parenting style and aggressive behavior among first year students in Harar campus\". Which research method should Ikram employ?',
    options: [
      'Correlational Research',
      'Experimental Research',
      'Case Study',
      'Naturalistic Observation'
    ],
    answer: 0,
    explanation: 'Because the objective is to assess the relationship between parenting styles and aggression without experimental manipulation, correlational research is required.',
    category: 'Mid Exam'
  },
  {
    id: 'hu-psy-harar-sc1-02',
    university: 'Haramaya University',
    year: '2022 Exam',
    course: 'General Psychology',
    question: 'In Ikram\'s study examining the relationship between parenting style and aggressive behavior among first year students in Harar campus, what is the Independent (Predictor) variable?',
    options: [
      'Parenting style',
      'Aggressive behavior',
      'Students in Harar campus',
      'Academic semester'
    ],
    answer: 0,
    explanation: 'Parenting style is the predictor/independent variable that is hypothesized to influence the student behavior.',
    category: 'Mid Exam'
  },
  {
    id: 'hu-psy-harar-sc1-03',
    university: 'Haramaya University',
    year: '2022 Exam',
    course: 'General Psychology',
    question: 'In Ikram\'s study examining the relationship between parenting style and aggressive behavior among first year students in Harar campus, what is the Dependent (Criterion) variable?',
    options: [
      'Aggressive behavior',
      'Parenting style',
      'Campus enrollment',
      'Family size'
    ],
    answer: 0,
    explanation: 'Aggressive behavior is the criterion/dependent variable being measured.',
    category: 'Mid Exam'
  },

  // Part IV: Supply Items - Scenario 2 (Kalkidan Classical Conditioning) (2A, 2B, 2C, 2D)
  {
    id: 'hu-psy-harar-sc2-01',
    university: 'Haramaya University',
    year: '2022 Exam',
    course: 'General Psychology',
    question: 'Kalkidan was narrowly missed by a bus while listening to her favorite song. Later, hearing the song on the radio causes her hands to shake and her to cry. In this scenario, what is the Conditioned Stimulus (CS)?',
    options: [
      'Her favorite song',
      'The near-miss bus accident',
      'Shaking hands and crying',
      'The busy street'
    ],
    answer: 0,
    explanation: 'The favorite song was a neutral stimulus paired with the traumatic near-miss, becoming the Conditioned Stimulus (CS).',
    category: 'Mid Exam'
  },
  {
    id: 'hu-psy-harar-sc2-02',
    university: 'Haramaya University',
    year: '2022 Exam',
    course: 'General Psychology',
    question: 'In Kalkidan\'s near-miss bus accident scenario, what is the Conditioned Response (CR)?',
    options: [
      'Shaking hands and crying when hearing the song a week later',
      'Stepping into the road',
      'Listening to the radio',
      'The bus speeding past'
    ],
    answer: 0,
    explanation: 'The conditioned response is the learned emotional/physiological reaction (hand shaking and crying) triggered by the conditioned song alone.',
    category: 'Mid Exam'
  },
  {
    id: 'hu-psy-harar-sc2-03',
    university: 'Haramaya University',
    year: '2022 Exam',
    course: 'General Psychology',
    question: 'In Kalkidan\'s near-miss bus accident scenario, what is the Unconditioned Stimulus (UCS)?',
    options: [
      'The traumatic near-miss accident with the speeding bus',
      'Her favorite song',
      'The MP3 player',
      'The bedroom radio'
    ],
    answer: 0,
    explanation: 'The life-threatening bus near-miss is the natural, unlearned stimulus that inherently produces fear and shock (UCS).',
    category: 'Mid Exam'
  },
  {
    id: 'hu-psy-harar-sc2-04',
    university: 'Haramaya University',
    year: '2022 Exam',
    course: 'General Psychology',
    question: 'In Kalkidan\'s near-miss bus accident scenario, what is the Unconditioned Response (UCR)?',
    options: [
      'Immediate fear, shock, and trembling caused by the near-death bus accident',
      'Hearing the song on the radio',
      'Turning off the MP3 player',
      'Stepping onto the sidewalk'
    ],
    answer: 0,
    explanation: 'The automatic, unlearned physiological terror and crying directly elicited by the near-fatal bus event is the Unconditioned Response (UCR).',
    category: 'Mid Exam'
  }
];

console.log('Total new Harar Mid Exam questions to add:', newHararQuestions.length);

const combined = [...exams, ...newHararQuestions];
console.log('New total exams in dataset:', combined.length);
fs.writeFileSync(examsPath, JSON.stringify(combined, null, 2), 'utf8');
console.log('Successfully saved to data/exams.json');
