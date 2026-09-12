const fs = require('fs');
const path = require('path');

const examsPath = path.resolve(__dirname, '../data/exams.json');
const exams = JSON.parse(fs.readFileSync(examsPath, 'utf8'));

const newQuestions = [
  // PART I: TRUE / FALSE (1 - 10)
  {
    id: 'hu-psy-final-14-tf-01',
    university: 'Haramaya University',
    year: '2022 Exam',
    course: 'General Psychology',
    category: 'Final Exam',
    question: 'True or False: Motivation refers to the internal and external factors that energize, direct, and sustain behavior.',
    options: ['True', 'False'],
    answer: 0,
    explanation: 'Motivation is defined in psychology as the internal processes and external stimuli that initiate, guide, energize, and maintain goal-directed behavior.'
  },
  {
    id: 'hu-psy-final-14-tf-02',
    university: 'Haramaya University',
    year: '2022 Exam',
    course: 'General Psychology',
    category: 'Final Exam',
    question: 'True or False: Emotions involve physiological arousal, but cognitive interpretations are not an essential component.',
    options: ['True', 'False'],
    answer: 1,
    explanation: 'Cognitive appraisal and interpretation are essential components of emotion (as demonstrated in cognitive theories like Schachter-Singer and Lazarus\'s appraisal theory), alongside physiological arousal and behavioral expression.'
  },
  {
    id: 'hu-psy-final-14-tf-03',
    university: 'Haramaya University',
    year: '2022 Exam',
    course: 'General Psychology',
    category: 'Final Exam',
    question: 'True or False: The Cannon-Bard theory states that emotional experiences result from the perception of physiological changes.',
    options: ['True', 'False'],
    answer: 1,
    explanation: 'The Cannon-Bard theory argues that physiological arousal and emotional experiences occur simultaneously and independently. It is the James-Lange theory that claims emotions result from perceiving physiological changes.'
  },
  {
    id: 'hu-psy-final-14-tf-04',
    university: 'Haramaya University',
    year: '2022 Exam',
    course: 'General Psychology',
    category: 'Final Exam',
    question: 'True or False: Personality is solely determined by genetic factors and is not influenced by environmental experiences.',
    options: ['True', 'False'],
    answer: 1,
    explanation: 'Personality develops through an intricate interaction between genetic/biological predispositions and environmental factors (parenting, culture, social experiences).'
  },
  {
    id: 'hu-psy-final-14-tf-05',
    university: 'Haramaya University',
    year: '2022 Exam',
    course: 'General Psychology',
    category: 'Final Exam',
    question: 'True or False: The humanistic theory of personality emphasizes the importance of personal growth and self-actualization.',
    options: ['True', 'False'],
    answer: 0,
    explanation: 'Humanistic psychology (championed by Carl Rogers and Abraham Maslow) focuses on human potential, subjective experience, free will, self-actualization, and inherent drive for personal growth.'
  },
  {
    id: 'hu-psy-final-14-tf-06',
    university: 'Haramaya University',
    year: '2022 Exam',
    course: 'General Psychology',
    category: 'Final Exam',
    question: 'True or False: Psychological disorders are only caused by biological factors.',
    options: ['True', 'False'],
    answer: 1,
    explanation: 'Modern psychopathology utilizes the biopsychosocial model, recognizing that psychological disorders result from a complex combination of biological, psychological, and sociocultural factors.'
  },
  {
    id: 'hu-psy-final-14-tf-07',
    university: 'Haramaya University',
    year: '2022 Exam',
    course: 'General Psychology',
    category: 'Final Exam',
    question: 'True or False: Cognitive-behavioral therapy is an effective treatment technique for various psychological disorders.',
    options: ['True', 'False'],
    answer: 0,
    explanation: 'Cognitive-Behavioral Therapy (CBT) is an empirically supported, highly effective intervention for depression, anxiety disorders, PTSD, and many other psychological conditions.'
  },
  {
    id: 'hu-psy-final-14-tf-08',
    university: 'Haramaya University',
    year: '2022 Exam',
    course: 'General Psychology',
    category: 'Final Exam',
    question: 'True or False: Life skills only pertain to practical abilities and have no connection to emotional well-being.',
    options: ['True', 'False'],
    answer: 1,
    explanation: 'Life skills encompass psychosocial and interpersonal competencies (e.g., self-awareness, emotional regulation, coping with stress) that directly foster emotional and psychological well-being.'
  },
  {
    id: 'hu-psy-final-14-tf-09',
    university: 'Haramaya University',
    year: '2022 Exam',
    course: 'General Psychology',
    category: 'Final Exam',
    question: 'True or False: Conditional positive regard plays an important role in the process of self-actualization.',
    options: ['True', 'False'],
    answer: 1,
    explanation: 'According to Carl Rogers, unconditional positive regard fosters self-actualization, whereas conditional positive regard creates conditions of worth and incongruence between the real self and ideal self.'
  },
  {
    id: 'hu-psy-final-14-tf-10',
    university: 'Haramaya University',
    year: '2022 Exam',
    course: 'General Psychology',
    category: 'Final Exam',
    question: 'True or False: In humanistic therapy, the psychologist has a minimal role, no more than creating a favorable environment for the patient.',
    options: ['True', 'False'],
    answer: 0,
    explanation: 'In person-centered (humanistic) therapy, the therapist is a non-directive facilitator whose primary role is providing core facilitative conditions (empathy, congruence, unconditional positive regard) so clients can self-heal.'
  },

  // PART II: MATCHING (11 - 15)
  {
    id: 'hu-psy-final-14-mt-11',
    university: 'Haramaya University',
    year: '2022 Exam',
    course: 'General Psychology',
    category: 'Final Exam',
    question: 'Match the personality description with the correct Big Five trait: "Organized and responsible behavior"',
    options: [
      'Openness',
      'Conscientiousness',
      'Extraversion',
      'Agreeableness',
      'Neuroticism'
    ],
    answer: 1,
    explanation: 'Conscientiousness is characterized by high levels of organization, dependability, responsibility, self-discipline, and goal-directed persistence.'
  },
  {
    id: 'hu-psy-final-14-mt-12',
    university: 'Haramaya University',
    year: '2022 Exam',
    course: 'General Psychology',
    category: 'Final Exam',
    question: 'Match the personality description with the correct Big Five trait: "Compassionate and cooperative nature"',
    options: [
      'Openness',
      'Conscientiousness',
      'Extraversion',
      'Agreeableness',
      'Neuroticism'
    ],
    answer: 3,
    explanation: 'Agreeableness reflects prosocial tendencies including empathy, altruism, cooperativeness, compassion, and trust towards others.'
  },
  {
    id: 'hu-psy-final-14-mt-13',
    university: 'Haramaya University',
    year: '2022 Exam',
    course: 'General Psychology',
    category: 'Final Exam',
    question: 'Match the personality description with the correct Big Five trait: "The tendency for negative emotions"',
    options: [
      'Openness',
      'Conscientiousness',
      'Extraversion',
      'Agreeableness',
      'Neuroticism'
    ],
    answer: 4,
    explanation: 'Neuroticism describes emotional instability and the disposition to experience negative affects such as anxiety, anger, depression, and vulnerability.'
  },
  {
    id: 'hu-psy-final-14-mt-14',
    university: 'Haramaya University',
    year: '2022 Exam',
    course: 'General Psychology',
    category: 'Final Exam',
    question: 'Match the personality description with the correct Big Five trait: "Appreciation for art and new experiences"',
    options: [
      'Openness',
      'Conscientiousness',
      'Extraversion',
      'Agreeableness',
      'Neuroticism'
    ],
    answer: 0,
    explanation: 'Openness to Experience involves intellectual curiosity, imagination, aesthetic sensitivity, unconventional values, and enthusiasm for novel ideas and experiences.'
  },
  {
    id: 'hu-psy-final-14-mt-15',
    university: 'Haramaya University',
    year: '2022 Exam',
    course: 'General Psychology',
    category: 'Final Exam',
    question: 'Match the personality description with the correct Big Five trait: "Sociable and outgoing personality"',
    options: [
      'Openness',
      'Conscientiousness',
      'Extraversion',
      'Agreeableness',
      'Neuroticism'
    ],
    answer: 2,
    explanation: 'Extraversion is marked by sociability, assertiveness, talkativeness, energy, and a tendency to seek stimulation in the company of others.'
  },

  // PART III: COMPLETION ITEMS (16 - 20)
  {
    id: 'hu-psy-final-14-cp-16',
    university: 'Haramaya University',
    year: '2022 Exam',
    course: 'General Psychology',
    category: 'Final Exam',
    question: 'According to Abraham Maslow, the term used to describe the tendency of certain individuals to become what they can be is called:',
    options: [
      'Self-Actualization',
      'Self-Esteem',
      'Self-Concept',
      'Self-Efficacy'
    ],
    answer: 0,
    explanation: 'Maslow defined self-actualization as the ultimate psychological need to realize one\'s full potential and become everything that one is capable of becoming.'
  },
  {
    id: 'hu-psy-final-14-cp-17',
    university: 'Haramaya University',
    year: '2022 Exam',
    course: 'General Psychology',
    category: 'Final Exam',
    question: 'A type of motivation in which people engage in tasks that they find inherently satisfying and enjoyable is known as:',
    options: [
      'Extrinsic motivation',
      'Intrinsic motivation',
      'Incentive motivation',
      'Biological drive'
    ],
    answer: 1,
    explanation: 'Intrinsic motivation occurs when an individual performs an activity for its own inherent satisfaction and enjoyment rather than for an external consequence or reward.'
  },
  {
    id: 'hu-psy-final-14-cp-18',
    university: 'Haramaya University',
    year: '2022 Exam',
    course: 'General Psychology',
    category: 'Final Exam',
    question: 'A type of phobia in which a person gets fear of a place or situation where escape is impossible if something could go wrong is named as:',
    options: [
      'Claustrophobia',
      'Social phobia',
      'Agoraphobia',
      'Acrophobia'
    ],
    answer: 2,
    explanation: 'Agoraphobia is an anxiety disorder characterized by marked fear or anxiety about being in situations where escape might be difficult or help unavailable in the event of panic-like symptoms.'
  },
  {
    id: 'hu-psy-final-14-cp-19',
    university: 'Haramaya University',
    year: '2022 Exam',
    course: 'General Psychology',
    category: 'Final Exam',
    question: 'The theory that suggests that people are motivated by the desire to reduce internal tension caused by unmet needs or physiological imbalances is known as:',
    options: [
      'Arousal theory',
      'Drive-reduction theory',
      'Incentive theory',
      'Cognitive dissonance theory'
    ],
    answer: 1,
    explanation: 'Clark Hull\'s drive-reduction theory posits that biological needs create internal states of tension (drives) that organisms are motivated to reduce to maintain homeostasis.'
  },
  {
    id: 'hu-psy-final-14-cp-20',
    university: 'Haramaya University',
    year: '2022 Exam',
    course: 'General Psychology',
    category: 'Final Exam',
    question: 'A psychological disorder characterized by persistent feelings of sadness, hopelessness, and a lack of interest or pleasure in daily activities is called:',
    options: [
      'Bipolar Disorder',
      'Schizophrenia',
      'Major Depressive Disorder',
      'Generalized Anxiety Disorder'
    ],
    answer: 2,
    explanation: 'Major Depressive Disorder is characterized by persistent depressed mood, anhedonia (loss of interest or pleasure), feelings of worthlessness, fatigue, and impaired daily functioning.'
  },

  // PART IV: MULTIPLE CHOICE (21 - 44)
  {
    id: 'hu-psy-final-14-mc-21',
    university: 'Haramaya University',
    year: '2022 Exam',
    course: 'General Psychology',
    category: 'Final Exam',
    question: 'Tamiru is a freshman student at Haramaya University. He wants to join the journalism department, but his family advises him to join the accounting department instead. According to Carl Rogers\'s theory, this situation indicates:',
    options: [
      'Unconditioned positive regard',
      'Conditioned positive regard',
      'Positive regard',
      'Fully functioning'
    ],
    answer: 1,
    explanation: 'Conditioned positive regard occurs when parental acceptance and approval are contingent upon meeting specific expectations (conditions of worth), such as pursuing a family-chosen career.'
  },
  {
    id: 'hu-psy-final-14-mc-22',
    university: 'Haramaya University',
    year: '2022 Exam',
    course: 'General Psychology',
    category: 'Final Exam',
    question: 'Among the following dimensions of trait theory, which is the basic emotional style of a person who may be easygoing?',
    options: [
      'Agreeableness',
      'Extroversion',
      'Openness',
      'Neuroticism'
    ],
    answer: 0,
    explanation: 'Agreeableness represents a person\'s interpersonal style; individuals scoring high in agreeableness tend to be trusting, good-natured, cooperative, tolerant, and easygoing.'
  },
  {
    id: 'hu-psy-final-14-mc-23',
    university: 'Haramaya University',
    year: '2022 Exam',
    course: 'General Psychology',
    category: 'Final Exam',
    question: 'Dawud is a pessimistic person. He hates his friends; however, he claims as if all of his friends hate him. Dawud uses what type of defense mechanism?',
    options: [
      'Projection',
      'Displacement',
      'Repression',
      'Rationalization'
    ],
    answer: 0,
    explanation: 'Projection is a defense mechanism whereby an individual attributes their own unacceptable feelings, impulses, or motives (e.g., hating his friends) onto other people.'
  },
  {
    id: 'hu-psy-final-14-mc-24',
    university: 'Haramaya University',
    year: '2022 Exam',
    course: 'General Psychology',
    category: 'Final Exam',
    question: 'In one of your courses, you are required to make a presentation. After you face the audience and examiner, you become terrified and experience bodily changes. The theory of emotion consistent with this example is:',
    options: [
      'Schachter-Singer theory',
      'James-Lange theory',
      'Cannon-Bard theory',
      'None of the above'
    ],
    answer: 1,
    explanation: 'The James-Lange theory posits that emotional experience is triggered by the perception of one\'s own physiological/bodily reactions to an emotional stimulus.'
  },
  {
    id: 'hu-psy-final-14-mc-25',
    university: 'Haramaya University',
    year: '2022 Exam',
    course: 'General Psychology',
    category: 'Final Exam',
    question: 'If you are devoting much of your energy and effort to being a well-known and recognized person, then, according to Abraham Maslow, you are in one of the following hierarchies:',
    options: [
      'Self-actualization',
      'Esteem needs',
      'Belongingness needs',
      'Safety needs'
    ],
    answer: 1,
    explanation: 'Esteem needs in Maslow\'s hierarchy include the desire for status, reputation, recognition, attention, prestige, and appreciation from others.'
  },
  {
    id: 'hu-psy-final-14-mc-26',
    university: 'Haramaya University',
    year: '2022 Exam',
    course: 'General Psychology',
    category: 'Final Exam',
    question: 'According to the cognitive theory, what is the underlying force of motivation?',
    options: [
      'Goals that people set',
      'Appraisal of the event',
      'Incentives',
      'Unsatisfied needs'
    ],
    answer: 1,
    explanation: 'Cognitive theories of motivation stress cognitive appraisal—how an individual evaluates, perceives, and interprets situations, expectations, and personal control.'
  },
  {
    id: 'hu-psy-final-14-mc-27',
    university: 'Haramaya University',
    year: '2022 Exam',
    course: 'General Psychology',
    category: 'Final Exam',
    question: 'Sarah failed in love with Mogos, and he refused to accept her love relationship request; she claimed that since he is nervous he is disgusting. Sarah uses what type of defense mechanism?',
    options: [
      'Reaction formation',
      'Displacement',
      'Repression',
      'Rationalization'
    ],
    answer: 0,
    explanation: 'Reaction formation is a defense mechanism in which unacceptable or painful feelings (unrequited attraction and affection) are unconsciously converted into their exact opposites (intense contempt and claims that he is disgusting).'
  },
  {
    id: 'hu-psy-final-14-mc-28',
    university: 'Haramaya University',
    year: '2022 Exam',
    course: 'General Psychology',
    category: 'Final Exam',
    question: 'According to Freud\'s psychoanalytic theory, which statement best describes the function of the ego?',
    options: [
      'It represents the moral and ethical standards internalized by society.',
      'It operates based on instincts and seeks immediate pleasure.',
      'It operates unconsciously and contains repressed desires and memories.',
      'It employs rationality and problem-solving to meet the individual\'s needs.'
    ],
    answer: 3,
    explanation: 'The ego operates on the reality principle, utilizing realistic thinking, problem-solving, and rationality to satisfy the id\'s impulses in socially acceptable and safe ways.'
  },
  {
    id: 'hu-psy-final-14-mc-29',
    university: 'Haramaya University',
    year: '2022 Exam',
    course: 'General Psychology',
    category: 'Final Exam',
    question: 'According to Sigmund Freud\'s psychoanalytic theory, which component of the personality operates on the pleasure principle and seeks immediate gratification of basic needs and desires?',
    options: [
      'Id',
      'Ego',
      'Superego',
      'Conscious mind'
    ],
    answer: 0,
    explanation: 'The id is the completely unconscious component of personality present at birth that operates entirely on the pleasure principle, demanding immediate satisfaction of urges.'
  },
  {
    id: 'hu-psy-final-14-mc-30',
    university: 'Haramaya University',
    year: '2022 Exam',
    course: 'General Psychology',
    category: 'Final Exam',
    question: 'The real self, in the context of self-concept, refers to:',
    options: [
      'The self that is consistent with societal expectations and norms',
      'The self that is based on our subjective perception of ourselves',
      'The self that represents our genetic predispositions and traits',
      'The self that is shaped by the feedback and evaluations of others'
    ],
    answer: 1,
    explanation: 'In Rogers\'s humanistic theory, the real self (actual self) is an individual\'s personal perception of their actual abilities, traits, and feelings.'
  },
  {
    id: 'hu-psy-final-14-mc-31',
    university: 'Haramaya University',
    year: '2022 Exam',
    course: 'General Psychology',
    category: 'Final Exam',
    question: 'Trying to decide whether to suffer from a toothache or go to the dentist (whom you greatly fear) is most likely an example of:',
    options: [
      'Approach-approach conflict',
      'Approach-avoidance conflict',
      'Avoidance-avoidance conflict',
      'Multiple approach-avoidance conflict'
    ],
    answer: 2,
    explanation: 'An avoidance-avoidance conflict occurs when an individual must choose between two undesirable, negative, or painful alternatives.'
  },
  {
    id: 'hu-psy-final-14-mc-32',
    university: 'Haramaya University',
    year: '2022 Exam',
    course: 'General Psychology',
    category: 'Final Exam',
    question: 'According to Carl Rogers, the ideal self refers to:',
    options: [
      'The perception of how others view us',
      'The self that is consistent with our values and beliefs',
      'The self we aspire to be and the goals we strive for',
      'The self that represents our innate biological tendencies'
    ],
    answer: 2,
    explanation: 'The ideal self is the person an individual wishes, aspires, or strives to be, encompassing their goals, values, and ultimate ambitions.'
  },
  {
    id: 'hu-psy-final-14-mc-33',
    university: 'Haramaya University',
    year: '2022 Exam',
    course: 'General Psychology',
    category: 'Final Exam',
    question: 'In Freud\'s psychoanalytic theory, the superego represents the internalized ideals and moral standards of society. Which statement best describes the role of the superego?',
    options: [
      'It seeks immediate gratification and operates on the pleasure principle.',
      'It mediates between the demands of the id and the constraints of the external world.',
      'It represents the conscious awareness of the individual\'s desires and motivations.',
      'It serves as the moral conscience and strives for perfection and moral excellence.'
    ],
    answer: 3,
    explanation: 'The superego contains the moral conscience and the ego ideal, striving for moral perfection and judging actions with feelings of pride or guilt.'
  },
  {
    id: 'hu-psy-final-14-mc-34',
    university: 'Haramaya University',
    year: '2022 Exam',
    course: 'General Psychology',
    category: 'Final Exam',
    question: 'Which of the following best represents an intrinsic motivational factor?',
    options: [
      'Receiving a monetary reward for completing a task',
      'Feeling accomplished after achieving a personal goal',
      'Being praised by others for your performance',
      'Competing with others to win a prize'
    ],
    answer: 1,
    explanation: 'A personal sense of achievement and self-fulfillment is an internal psychological reward, characteristic of intrinsic motivation.'
  },
  {
    id: 'hu-psy-final-14-mc-35',
    university: 'Haramaya University',
    year: '2022 Exam',
    course: 'General Psychology',
    category: 'Final Exam',
    question: 'Helen is experiencing conflicting motives as she tries to decide between going on a vacation and saving money for a new car. This is an example of:',
    options: [
      'Approach-approach conflict',
      'Approach-avoidance conflict',
      'Avoidance-avoidance conflict',
      'Multiple approach-avoidance conflict'
    ],
    answer: 0,
    explanation: 'An approach-approach conflict arises when a person must choose between two attractive, desirable, and positive goals.'
  },
  {
    id: 'hu-psy-final-14-mc-36',
    university: 'Haramaya University',
    year: '2022 Exam',
    course: 'General Psychology',
    category: 'Final Exam',
    question: 'Jamal is experiencing a range of emotions, including an increased heart rate, sweaty palms, and a feeling of fear. According to the Cannon-Bard theory, what is the relationship between his physiological changes and emotional experience?',
    options: [
      'The physiological changes cause the emotional experience',
      'The emotional experience causes the physiological changes',
      'The physiological changes and emotional experience are unrelated',
      'The physiological changes and emotional experiences occur simultaneously'
    ],
    answer: 3,
    explanation: 'The Cannon-Bard theory maintains that sensory information sent to the thalamus triggers emotional experience in the cortex and autonomic arousal in the sympathetic nervous system simultaneously.'
  },
  {
    id: 'hu-psy-final-14-mc-37',
    university: 'Haramaya University',
    year: '2022 Exam',
    course: 'General Psychology',
    category: 'Final Exam',
    question: 'Life skills encompass a wide range of abilities that enable individuals to:',
    options: [
      'Develop specialized expertise in a particular area',
      'Maintain healthy interpersonal relationships',
      'Acquire knowledge of psychological principles',
      'Assess and treat psychological disorders'
    ],
    answer: 1,
    explanation: 'Life skills are psychosocial capabilities that help people deal effectively with the challenges of everyday life, including effective communication, empathy, and maintaining healthy interpersonal relations.'
  },
  {
    id: 'hu-psy-final-14-mc-38',
    university: 'Haramaya University',
    year: '2022 Exam',
    course: 'General Psychology',
    category: 'Final Exam',
    question: 'Selam is facing a difficult decision and is carefully considering all available information before choosing a course of action. Which cognitive process is she engaged in?',
    options: [
      'Critical thinking',
      'Problem-solving',
      'Decision-making',
      'Self-awareness'
    ],
    answer: 2,
    explanation: 'Decision-making is the cognitive process of evaluating alternatives and selecting a specific course of action among several possibilities.'
  },
  {
    id: 'hu-psy-final-14-mc-39',
    university: 'Haramaya University',
    year: '2022 Exam',
    course: 'General Psychology',
    category: 'Final Exam',
    question: 'Amsalu is attending a workshop on communication skills to improve her ability to express herself effectively and listen actively. Which life skill is she focusing on?',
    options: [
      'Self-confidence',
      'Reflective communication',
      'Interpersonal relationships',
      'Critical thinking'
    ],
    answer: 1,
    explanation: 'Reflective communication involves active listening, paraphrasing, clarifying, and conveying thoughts thoughtfully and respectfully.'
  },
  {
    id: 'hu-psy-final-14-mc-40',
    university: 'Haramaya University',
    year: '2022 Exam',
    course: 'General Psychology',
    category: 'Final Exam',
    question: 'Melkamu has a strong belief in his abilities and trusts himself to overcome challenges and succeed. Which component of life skills does this represent?',
    options: [
      'Decision-making',
      'Self-confidence',
      'Interpersonal relationships',
      'Reflective communication'
    ],
    answer: 1,
    explanation: 'Self-confidence (or self-efficacy) is the belief in one\'s own capability to accomplish tasks, overcome obstacles, and achieve goals.'
  },
  {
    id: 'hu-psy-final-14-mc-41',
    university: 'Haramaya University',
    year: '2022 Exam',
    course: 'General Psychology',
    category: 'Final Exam',
    question: 'Which perspective believes abnormality is caused by the inability of the ego to manage the conflict between the demand of the ID and the superego?',
    options: [
      'Psychoanalytic',
      'Cognitive',
      'Learning',
      'Biological'
    ],
    answer: 0,
    explanation: 'The psychoanalytic perspective (Freudian theory) posits that psychological disorders and neurotic symptoms stem from unresolved intrapsychic conflicts between id impulses and superego demands.'
  },
  {
    id: 'hu-psy-final-14-mc-42',
    university: 'Haramaya University',
    year: '2022 Exam',
    course: 'General Psychology',
    category: 'Final Exam',
    question: 'According to DSM-5, which one is not included in anxiety disorder?',
    options: [
      'Specific Phobia',
      'Agora Phobia',
      'Panic Attack',
      'Paranoid'
    ],
    answer: 3,
    explanation: 'Paranoid refers to Paranoid Personality Disorder (or schizophrenia with paranoia), which is categorized under personality disorders or psychotic disorders, not anxiety disorders in DSM-5.'
  },
  {
    id: 'hu-psy-final-14-mc-43',
    university: 'Haramaya University',
    year: '2022 Exam',
    course: 'General Psychology',
    category: 'Final Exam',
    question: 'According to Freud\'s theory, the unconscious tactics that prevent threatening material from surfacing are known as:',
    options: [
      'Defense Mechanism',
      'Ego Ideal',
      'Ego',
      'Super Ego'
    ],
    answer: 0,
    explanation: 'Defense mechanisms are psychological strategies unconsciously deployed by the ego to protect against anxiety from unacceptable or threatening thoughts and impulses.'
  },
  {
    id: 'hu-psy-final-14-mc-44',
    university: 'Haramaya University',
    year: '2022 Exam',
    course: 'General Psychology',
    category: 'Final Exam',
    question: 'The scientific study of psychological disorders is called:',
    options: [
      'Psychotherapy',
      'Clinical Psychology',
      'Abnormality',
      'Psychopathology'
    ],
    answer: 3,
    explanation: 'Psychopathology is the scientific study of psychological disorders, including their symptoms, causes (etiology), and manifestation.'
  }
];

exams.push(...newQuestions);

fs.writeFileSync(examsPath, JSON.stringify(exams, null, 2), 'utf8');
console.log(`Added ${newQuestions.length} questions. New total questions: ${exams.length}`);
