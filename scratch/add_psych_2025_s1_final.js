const fs = require('fs');

const questions = [
  {
    question: "An enduring characteristics and behavior that comprise a person's unique adjustment to life is called",
    options: ["Motivation", "Personality", "Lifeskills", "Emotion"],
    answer: 1,
    explanation: "Personality is defined as the enduring characteristics and behaviors that comprise a person's unique adjustment to life — encompassing thoughts, feelings, and actions across different situations."
  },
  {
    question: "Behavioral therapists assume that abnormal behavior is the result of inappropriate learning",
    options: ["False", "True"],
    answer: 1,
    explanation: "True. The behavioral perspective holds that abnormal behavior is acquired through faulty learning processes (e.g., conditioning, reinforcement of maladaptive patterns) and can therefore be unlearned through therapy."
  },
  {
    question: "James has been having an affair but feels guilty. To cope, he starts accusing his wife, Sarah, of being unfaithful, checking her phone and questioning her whereabouts. This refers to",
    options: ["Displacement", "Repression", "Projection", "Denial"],
    answer: 2,
    explanation: "Projection is the defense mechanism where an individual attributes their own unacceptable thoughts or feelings to others. James projects his own guilt and unfaithfulness onto his wife."
  },
  {
    question: "Which of the following is a key component of emotion?",
    options: [
      "A purely cognitive assessment of a situation",
      "A voluntary reflex",
      "A fixed pattern of behavior triggered by a specific stimulus",
      "A subjective experience"
    ],
    answer: 3,
    explanation: "A subjective experience (the feeling component) is a key component of emotion. Emotions involve subjective feelings, physiological arousal, and behavioral expression."
  },
  {
    question: "Ego operates according to __________, superego operates according to __________",
    options: [
      "Pleasure principle, reality principle",
      "Moral principle, reality principle",
      "Pleasure principle, moral principle",
      "Reality principle, moral principle"
    ],
    answer: 3,
    explanation: "According to Freud, the Ego operates on the reality principle (mediating between id and reality), while the Superego operates on the moral principle (representing internalized societal rules and ideals)."
  },
  {
    question: "In Roger's humanistic theory, 'unconditional positive regard' refers to",
    options: [
      "Providing unwavering acceptance and love to a person, regardless of their behavior",
      "Recognizing and praising a person's positive qualities while ignoring their flaws",
      "Offering support only when a person is making progress toward self-improvement",
      "Accepting and valuing someone only when they meet certain conditions"
    ],
    answer: 0,
    explanation: "Carl Rogers defined unconditional positive regard as the complete acceptance and support of a person regardless of what they say or do. It is central to his person-centered therapy."
  },
  {
    question: "Which one of the following statements is not true about the humanistic theory of personality?",
    options: [
      "Unconscious mind is the shelter of all human motives",
      "Man is naturally good",
      "People should be allowed to organize and control their behavior",
      "A person who is restricted by societal rules will not become a man of excellence"
    ],
    answer: 0,
    explanation: "The statement 'unconscious mind is the shelter of all human motives' belongs to psychoanalytic theory (Freud), not humanistic theory. Humanistic theory emphasizes conscious experience, free will, and human potential."
  },
  {
    question: "John Tyson has strong aggressive impulses but channels them into competitive boxing, where he excels. He enjoys the physical contact and the challenge of competing with others, and his aggressive energy. This ego defense mechanism is",
    options: ["Reaction formation", "Projection", "Sublimation", "Displacement"],
    answer: 2,
    explanation: "Sublimation is the defense mechanism of redirecting unacceptable impulses into socially acceptable activities. John channels aggressive impulses into boxing — a socially sanctioned outlet."
  },
  {
    question: "Which of the following is not necessary in the process of self-actualization?",
    options: [
      "Unconditional positive regard",
      "When a real self and ideal self matches",
      "Conditional positive regard",
      "Exploring one's genetic potential"
    ],
    answer: 3,
    explanation: "Exploring one's genetic potential is not a necessary condition for self-actualization in Rogers' theory. Rogers emphasized unconditional positive regard, congruence between real and ideal self, and empathy as conditions for growth."
  },
  {
    question: "Which of the following is true regarding statistical deviation in defining abnormality?",
    options: [
      "It always aligns perfectly with subjective distress",
      "Any deviation from the average is automatically considered abnormal",
      "It's the most reliable criterion for diagnosing psychological disorders",
      "It's important to consider cultural context when determining abnormality"
    ],
    answer: 3,
    explanation: "Statistical deviation alone is insufficient to define abnormality. Cultural context is critical — what is statistically rare may be normal in one culture but not another (e.g., hearing voices in some spiritual traditions)."
  },
  {
    question: "Tesema, a 45-year-old, has a rigid routine he MUST follow every morning. He checks the stove multiple times, arranges his belongings in a specific order, and repeats certain phrases silently to himself. If he deviates from this routine, he experiences intense anxiety and feels compelled to start over. He recalls his parents were very rigid with routines and did not like any change in life. Which perspective would emphasize the connection between Tesema's rituals and his experiences with his parents?",
    options: ["Cognitive perspective", "Psychoanalytic perspective", "Learning perspective", "Biological perspective"],
    answer: 2,
    explanation: "The learning perspective emphasizes how behavior is acquired through observation and modeling. Tesema's rituals can be explained by learning theory — he learned rigid routines by observing his parents, and this behavior was reinforced over time."
  },
  {
    question: "James, who secretly dislikes his mother, and cannot accept this view, generously loves and is caring toward her. Which defense mechanism would subscribe to explain this person?",
    options: ["Denial", "Reaction formation", "Rationalization", "Projection"],
    answer: 1,
    explanation: "Reaction formation is the defense mechanism where a person converts an unacceptable feeling into its opposite. James's unconscious hostility toward his mother is converted into exaggerated love and care."
  },
  {
    question: "Which one of the following is not true about Ego structure of personality?",
    options: ["Pleasure principle", "Psychological aspect", "Rational thinking", "Conscious"],
    answer: 0,
    explanation: "The pleasure principle belongs to the Id, not the Ego. The Ego operates on the reality principle and is characterized by rational thinking, psychological mediation, and conscious awareness."
  },
  {
    question: "Which part of our personality satisfies the demands of the id and reduces libido only in ways that will not lead to negative consequences?",
    options: ["Super ego", "Ego", "Ego ideal"],
    answer: 1,
    explanation: "The Ego mediates between the id's demands and external reality, finding ways to satisfy drives (reduce libido) without causing negative consequences. It operates on the reality principle."
  },
  {
    question: "Which one of the following is not true about instinct approaches of motivation?",
    options: [
      "Motivation is innate behavior",
      "Motivation is primarily biologically based",
      "Motivation is naturally programmed in an organism",
      "Motivation is learned behavior"
    ],
    answer: 3,
    explanation: "The instinct approach holds that motivation is innate, biologically based, and naturally programmed. 'Motivation is learned behavior' contradicts the instinct approach — that characteristic belongs to learning/behavioral theories."
  },
  {
    question: "Personality is solely determined by genetics and does not change over time.",
    options: ["False", "True"],
    answer: 0,
    explanation: "False. Personality is shaped by both genetics and environment (nature and nurture). Research shows personality traits can change across the lifespan due to experiences, therapy, and life events."
  },
  {
    question: "Which of the following traits from the Big Five theory best describes Bekele's emotional instability, as it manifested through his sensitivity, self-doubt, impulsiveness, frequent conflicts in relationships, and profound creativity that fueled his impactful songwriting?",
    options: ["Openness", "Agreeableness", "Neuroticism", "Extraversion"],
    answer: 2,
    explanation: "Neuroticism (emotional instability) is characterized by anxiety, moodiness, irritability, and self-doubt. Bekele's sensitivity, impulsiveness, and frequent emotional conflicts align with high neuroticism."
  },
  {
    question: "Which one of the following is not a type of personality disorder?",
    options: ["Histrionic", "Schizoid", "Paranoid", "Panic"],
    answer: 3,
    explanation: "Panic is an anxiety disorder, not a personality disorder. Personality disorders include Histrionic, Schizoid, Paranoid, Borderline, Narcissistic, and others classified in DSM-5 Cluster A, B, and C."
  },
  {
    question: "Maslow believed that if the real self and ideal self are matched anybody can achieve full functioning.",
    options: ["False", "True"],
    answer: 0,
    explanation: "False. The concept of real self and ideal self matching leading to full functioning is Carl Rogers' idea, not Maslow's. Maslow's theory centers on the hierarchy of needs and self-actualization."
  },
  {
    question: "John believed that motivation is the outcome of expectations and goals we have for different things. Which one of the following approaches did John believe in?",
    options: ["Cognitive approach", "Drive reduction approach", "Drive reduction approach", "Incentive approach"],
    answer: 0,
    explanation: "The cognitive approach to motivation emphasizes mental processes — expectations, goals, and beliefs — as drivers of behavior. John's belief that motivation comes from expectations and goals fits the cognitive perspective."
  },
  {
    question: "A client who seeks constant attention from others, exaggerates small details, and acts very dramatically falls into which of the following personality disorders?",
    options: [
      "Narcissistic personality disorder",
      "Avoidant personality disorder",
      "Histrionic personality disorder",
      "Borderline personality disorder"
    ],
    answer: 2,
    explanation: "Histrionic Personality Disorder is characterized by excessive emotionality, attention-seeking behavior, dramatic expression, and exaggerated emotions — matching the client's description."
  },
  {
    question: "According to Carl Rogers, people will achieve healthy psychological growth toward self-actualization when:",
    options: [
      "Their real self and ideal self are matched",
      "They are given conditional positive regard",
      "Their real self and ideal self are mismatched",
      "Their good behavior is reinforced based on reasonable conditions"
    ],
    answer: 0,
    explanation: "Carl Rogers believed that when the real self (who you are) and ideal self (who you want to be) are congruent, individuals experience psychological well-being and move toward self-actualization."
  },
  {
    question: "Jackson's doctor feels that her genetic predispositions are factors that have interacted to produce psychological breakdown. The doctor's explanation can be best described as:",
    options: ["Biological perspective", "Psychological perspective", "Cognitive perspective", "Learning perspective"],
    answer: 0,
    explanation: "The biological perspective explains psychological disorders in terms of genetics, brain chemistry, neurological factors, and other biological mechanisms. The doctor's focus on genetic predispositions is clearly biological."
  },
  {
    question: "The correct order of Maslow's hierarchy of needs in humanistic approach to motivation, from lowest to highest is:",
    options: [
      "Physiological, esteem, love and belongingness, safety, self-actualization",
      "Physiological, safety, love and belongingness, esteem, self-actualization",
      "Safety, physiological, esteem, love and belongingness, self-actualization",
      "Self-actualization, esteem, love and belongingness, safety, physiological"
    ],
    answer: 1,
    explanation: "Maslow's hierarchy from lowest (most basic) to highest: 1) Physiological, 2) Safety, 3) Love and Belongingness, 4) Esteem, 5) Self-Actualization. Lower needs must generally be met before higher ones."
  },
  {
    question: "Sarah, a 28-year-old, is experiencing a major depressive episode. She is plagued by negative thoughts about herself, constantly telling herself things like, 'I'm worthless,' 'I'm a failure,' and 'No one likes me.' She dwells on past mistakes and struggles to find any positives in her life. Which perspective would MOST likely focus on Sarah's case?",
    options: ["Biological perspective", "Learning perspective", "Psychoanalytic perspective", "Cognitive perspective"],
    answer: 3,
    explanation: "The cognitive perspective focuses on maladaptive thought patterns as causes of psychological distress. Sarah's negative self-talk and cognitive distortions ('I'm worthless', 'I'm a failure') are classic targets of cognitive therapy."
  },
  {
    question: "Which approach of personality would be likely to agree with a statement 'personality can be determined by the innate goodness of people and their desire to growth'?",
    options: ["Trait theory", "Psychoanalysis theory", "Humanistic theory", "Learning theory"],
    answer: 2,
    explanation: "Humanistic theory (Rogers, Maslow) emphasizes the innate goodness of human beings and their natural drive toward growth and self-actualization. This aligns directly with the statement."
  },
  {
    question: "According to Maslow the real journey of human life begins with satisfying physiological needs.",
    options: ["False", "True"],
    answer: 1,
    explanation: "True. Maslow placed physiological needs (food, water, shelter, sleep) at the base of his hierarchy. These must be satisfied first before an individual can pursue higher-level needs."
  },
  {
    question: "The psychoanalysis perspective is the theoretical orientation that emphasizes __________ as the determinants of personality.",
    options: ["Biological function", "Unconscious mind", "Learned response", "Cognitive structure"],
    answer: 1,
    explanation: "Psychoanalysis (Freud) emphasizes the unconscious mind — repressed memories, desires, and conflicts — as the primary determinant of personality and behavior."
  },
  {
    question: "A part of our personality which contains the sum of all the acceptable behavior that the child has learned about from parents and others in the society is called:",
    options: ["Super ego", "Ego", "Conscience", "Ego-ideal"],
    answer: 3,
    explanation: "The Ego-ideal is the part of the superego that contains internalized standards of acceptable and admirable behavior learned from parents and society — representing what the person aspires to be."
  },
  {
    question: "Which one of the following describes Trait theories of personality?",
    options: [
      "Identifying and measuring consistent patterns of behavior, thoughts, and feelings",
      "Understanding the unconscious conflicts that drive behavior",
      "Exploring how individuals learn through reinforcement and punishment",
      "Analyzing the impact of social and cultural factors on personality development"
    ],
    answer: 0,
    explanation: "Trait theories (e.g., Big Five, Allport) focus on identifying and measuring stable, consistent patterns of behavior, thoughts, and feelings that distinguish individuals from one another."
  },
  {
    question: "According to the Cannon-Bard theory of emotion:",
    options: [
      "Physiological changes precede and cause emotional experience",
      "Emotional experience precedes and causes physiological changes",
      "Cognitive appraisal is the primary determinant of emotional experience",
      "Emotional experience and physiological changes occur at the same time"
    ],
    answer: 3,
    explanation: "The Cannon-Bard theory proposes that emotional experience and physiological arousal occur simultaneously and independently — triggered by the thalamus sending signals to both the cortex (emotion) and body (arousal) at the same time."
  },
  {
    question: "Conditional positive regard is accepting and supporting an individual regardless of their feelings, thoughts, and behaviors.",
    options: ["False", "True"],
    answer: 0,
    explanation: "False. That definition describes unconditional positive regard. Conditional positive regard means acceptance and love are given only when the person meets certain conditions or standards set by others."
  },
  {
    question: "Which component of life skills refers to the process of identifying a gap between an actual state and a desired state and taking action to resolve the deficiency?",
    options: ["Self-esteem", "Decision making", "Critical thinking", "Problem-solving"],
    answer: 3,
    explanation: "Problem-solving involves recognizing a discrepancy between the current situation and the desired outcome, then taking systematic steps to close that gap. It is a core life skill."
  },
  {
    question: "Carl works hard to get A's on his report card because his mother pays him 25 dollars for each one. Carl's behavior is being influenced by:",
    options: ["Human motivation", "Drive-reduction theory", "Extrinsic motivation", "Hierarchy of needs"],
    answer: 2,
    explanation: "Extrinsic motivation involves engaging in behavior for external rewards (money, praise, grades). Carl is motivated by the monetary reward from his mother, not by internal satisfaction in learning."
  },
  {
    question: "Which one of the following is the characteristic of a person who scores low in agreeableness?",
    options: ["Hard to get along with", "Calm and confident", "Friendly and easygoing", "Maintain the status quo"],
    answer: 0,
    explanation: "In the Big Five model, low agreeableness is associated with being antagonistic, uncooperative, suspicious, and difficult to get along with, in contrast to high agreeableness which involves warmth and cooperativeness."
  },
  {
    question: "Drive-reduction approach suggests that if we lack something, we will be motivated to increase it.",
    options: ["True", "False"],
    answer: 0,
    explanation: "True. Drive-reduction theory (Hull) proposes that biological deficits (e.g., hunger, thirst) create drives (tension), which motivate behavior to reduce that tension and restore homeostasis."
  },
  {
    question: "Social phobia is an irrational fear of some specific object or situation.",
    options: ["False", "True"],
    answer: 0,
    explanation: "False. Social phobia (Social Anxiety Disorder) is an irrational fear of social situations where one might be evaluated or embarrassed. An irrational fear of a specific object or situation is a specific phobia, not social phobia."
  },
  {
    question: "Cognitive therapy is a method based on identifying unconscious thoughts and emotions.",
    options: ["False", "True"],
    answer: 0,
    explanation: "False. Cognitive therapy (Aaron Beck) focuses on identifying and challenging conscious maladaptive thoughts and cognitive distortions, not unconscious ones. Identifying unconscious thoughts is characteristic of psychoanalytic therapy."
  },
  {
    question: "A person who spends hours each day washing their hands, even when they aren't dirty, may be exhibiting symptoms of:",
    options: ["Social phobia", "General anxiety disorder", "Obsessive-compulsive disorder", "Simple phobia"],
    answer: 2,
    explanation: "Obsessive-Compulsive Disorder (OCD) is characterized by intrusive obsessions and repetitive compulsions (like excessive hand-washing) performed to reduce anxiety, even when logically unnecessary."
  },
  {
    question: "All of the following statements referring to the definition of personality are correct except:",
    options: [
      "Personality is used as a means of explaining the stability in a person's behavior",
      "An individual's unique way of integrating the various psychological dimensions",
      "A distinctive pattern of individual's adaptation to the situations of his or her life",
      "An unpredictable set of responses to environmental stimuli"
    ],
    answer: 3,
    explanation: "Personality is defined by consistency and predictability of behavior across situations. 'An unpredictable set of responses' contradicts the very definition of personality, which emphasizes stable and enduring patterns."
  },
  {
    question: "Henry believed that negative thinking led to a psychological disorder. Henry's assumption indicates __________ perspectives.",
    options: ["Socio-cultural", "Cognitive", "Learning", "Psychoanalysis"],
    answer: 1,
    explanation: "The cognitive perspective emphasizes that distorted or irrational thinking patterns cause psychological disorders. Aaron Beck and Albert Ellis both link negative cognitions (like cognitive distortions) to depression and other disorders."
  },
  {
    question: "John is responsible, self-disciplined, and punctual at the workplace. According to trait theory of personality, John has __________ types of personality.",
    options: ["Agreeableness", "Conscientiousness", "Extraversion", "Openness"],
    answer: 1,
    explanation: "Conscientiousness in the Big Five model is characterized by being organized, responsible, self-disciplined, dependable, and goal-directed — perfectly matching John's description."
  },
  {
    question: "Which hierarchy of Maslow's theory indicates that an individual possesses friendship and intimacy?",
    options: ["Safety need", "Self-actualization", "Love and Belongingness", "Esteem needs"],
    answer: 2,
    explanation: "The Love and Belongingness level (3rd tier in Maslow's hierarchy) encompasses the need for friendships, intimacy, family connections, and a sense of belonging to social groups."
  },
  {
    question: "Personality disorder is inflexible patterns of thinking, feeling, and behavior in situations and times.",
    options: ["True", "False"],
    answer: 0,
    explanation: "True. Personality disorders are defined as enduring, inflexible, and pervasive patterns of inner experience and behavior that deviate markedly from cultural expectations and cause distress or impairment."
  },
  {
    question: "According to drive reduction theory, motivation is primarily derived from:",
    options: [
      "The desire to achieve personal goals",
      "The pursuit of external rewards",
      "The necessity to fulfill basic biological drives",
      "The influence of social factors"
    ],
    answer: 2,
    explanation: "Drive reduction theory (Clark Hull) proposes that motivation arises from biological needs that create drives (states of tension). Satisfying these drives (hunger, thirst, etc.) reduces tension and restores homeostasis."
  },
  {
    question: "Emotion is a conscious experience that enables us to react to external stimuli.",
    options: ["False", "True"],
    answer: 1,
    explanation: "True. Emotion involves a conscious subjective experience (feeling), physiological arousal, and behavioral responses. It enables organisms to respond adaptively to environmental stimuli."
  },
  {
    question: "Life skills are essential abilities that an individual learns to overcome day-to-day challenges.",
    options: ["False", "True"],
    answer: 1,
    explanation: "True. Life skills are adaptive and positive behaviors that enable individuals to deal effectively with the demands and challenges of everyday life — including problem-solving, communication, and emotional regulation."
  },
  {
    question: "Zinabu has a free weekend and is struggling to decide what to do. On the one hand, she could go to a music festival with her friends, which she knows will be fun and exciting. On the other hand, she has the opportunity to stay home, relax, and catch up on some much-needed rest. Both options appeal to her, but she can only choose one. What type of motivational conflict is Zinabu MOST likely experiencing?",
    options: [
      "Multiple approach-Avoidance conflict",
      "Avoidance-Avoidance conflict",
      "Approach-Avoidance conflict",
      "Approach-Approach conflict"
    ],
    answer: 3,
    explanation: "Approach-Approach conflict occurs when a person must choose between two equally desirable options. Zinabu finds both options (festival and rest) appealing, but can only choose one — a classic approach-approach conflict."
  },
  {
    question: "According to Psychoanalysis theory, the unconscious mind is a vital part of personality.",
    options: ["False", "True"],
    answer: 1,
    explanation: "True. Freud's psychoanalytic theory places the unconscious mind at the center of personality. It contains repressed memories, desires, and conflicts that influence behavior without the person's awareness."
  },
  {
    question: "A man who was the victim of a car accident fully recovered from the physical injuries is feeling pain back even though there is no sign of injury. The man is most likely suffering from:",
    options: [
      "Panic disorder",
      "Post-traumatic Stress disorder",
      "Generalized Anxiety Disorder",
      "Obsessive-compulsive disorder"
    ],
    answer: 1,
    explanation: "Post-Traumatic Stress Disorder (PTSD) can cause somatic symptoms such as phantom pain, flashbacks, and physical sensations re-experienced after trauma, even when there is no current physical injury."
  }
];

const data = JSON.parse(fs.readFileSync('data/exams.json', 'utf8'));

const newEntries = questions.map((q, i) => ({
  id: `psyc-hu-2025-s1-final-${String(i + 1).padStart(2, '0')}`,
  university: "Haramaya University",
  year: "2025 Exam",
  course: "General Psychology",
  category: "Final Exam",
  question: q.question,
  options: q.options,
  answer: q.answer,
  explanation: q.explanation
}));

const updated = [...data, ...newEntries];
fs.writeFileSync('data/exams.json', JSON.stringify(updated, null, 2));
console.log(`✅ Added ${newEntries.length} questions. Total: ${updated.length}`);
console.log('IDs:', newEntries.map(e => e.id).join(', '));
