const fs = require('fs');
const path = require('path');

const examsPath = path.join(__dirname, '..', 'data', 'exams.json');
const exams = JSON.parse(fs.readFileSync(examsPath, 'utf8'));

// Passages Definition
const PASSAGE_COVID_2020 = `What sets good and bad leaders apart in the coronavirus era?
(Lawrence Hamilton, The Conversation: June 7, 2020)

Crises bring out the best and worst of politicians and populations. Folly, fear and fortitude are on display everywhere. In the main, democracies have fared better than non-democracies in handling the coronavirus pandemic. But the record is very varied indeed. What explains this? What can be done about it?

Among democratic regimes, at the one extreme we have seen denialism, the denigration of scientific advice and an obsession with putting the economy before lives. This is especially evident in the United States and Brazil. At the other we have witnessed the organized, prudent, empathetic responses of countries such as South Korea, New Zealand, and Finland. South African president Cyril Ramaphosa initially did very well, but some subsequent decisions might damage his good record.

The USA and Brazilian responses to the pandemic, led by President Donald Trump and President Jair Bolsonaro, have been characterized by secretive, narcissistic, paranoid, hubristic and impulsive decision-making. These actions have endangered the lives and livelihoods of their residents, over which they have a duty of care. The data bears this out well. Despite having arrived on their shores relatively late, the pandemic has ripped through their populations, with no sign of abating. They lead in infections and deaths.

At the other extreme, a common denominator has been a firm attempt by political leaders to "follow the science" and control the spread of the virus and fake news from the outset. A combination of transparency, prudence, empathy, timing and courage has produced excellent results in South Korea, New Zealand and Finland.

South Africa's response has been lauded, though it is beginning to attract criticism for heavy-handed policing and some inexplicable decisions.

What becomes clear is that in these fast-moving and life-defining times in democracies a great deal depends on the quality of the elected leadership. Democracies that happen to have leaders who simultaneously engage empathetically with those they govern and are informed by good science are best able to deal with the crisis. They gather clear-eyed knowledge of their countries' particular circumstances, and display courage and timing in making critical and sometimes unpopular decisions. They are able to overcome many of the challenges that the pandemic throws up.

Democracy helps, but it is not the deciding factor. What matters most is what kind of leader is in place, where his or her priorities lie: the well-being of the populace or the interests of a small group. Four of the top five performing countries in terms of lives saved and control of the spread of the virus have women leaders: New Zealand's Jacinda Ardern, Finland's Sanna Marin, Germany's Angela Merkel and Taiwan's Tsai Ing-wen. These women display empathy and firm focus on the well-being of their populations.

Politicians judge best when they listen to their populations and learn from the science. That is why democracy is uniquely placed to engender good judgements, as the Indian economist Amartya Sen argued with regard to famines, and I have argued elsewhere. Yet, it would be mistaken to think that democracy guarantees good judgement. If the purveyors of conspiracy theories and exemplars of prejudice are also your democratic leaders, democracy itself cannot resolve things. It only gives citizens the power to remove those leaders at the next election.

In the current crisis, Ramaphosa has done a much better job than Trump and Bolsonaro. He was off to a great start. He acted firmly, quickly, with clear justification and impressive results. South Africans have just emerged from one of the most severe lockdowns imposed anywhere in the world. This kept the infection rate nearly as low as that of South Korea, though it is now shooting up. During this period, however, there have been at least two problematic decisions that undermine public trust and thus how people may behave.

The first is the decision to ban the sale of tobacco. Even if we could distinguish sharply between basic needs and other needs - something I dispute - the idea that addiction to smoking falls into the latter category, and that, along with the fact that COVID-19 is a respiratory disease, justifies the ban, is misguided. For an addict, the need for a cigarette may often trump even the need for vital nutrition. The second is the decision to allow religious gatherings to resume under lockdown level 3. Having spent so long restricting gatherings, to now allow larger gatherings seems like folly. It is well known - cases abound from South Africa to South Korea - that, like funerals, large religious gatherings are super-spreading events.

Along with the ban on tobacco products and the incorrect assumption that the state could directly meet the basic nutritional needs of the population via the delivery of food parcels, the response to the religious lobby is reminiscent of Juvenal's comment under imperial Rome some two thousand years ago that all the people really want is "bread and circuses". This is not what people want or need. They require the power to express their actual needs and interests and the democratic means to ensure that government responds to these. In sum, Ramaphosa's good leadership has been undermined by a paternalistic attitude to people's needs and seeming deference to South Africa's powerful religious lobby.

Two things can be learnt from the varied responses to the coronavirus crisis. First, we must use it to find a roadmap for how we can properly make the health and well-being of a state's population the raison d'être of its government. The first thing to identify is that health is not the "absence of disease" but the status we each have when our ever-changing needs are optimally satisfied. For this, we need a politics that allows us to express and assess our needs, and determine who is best placed to represent us in responding to these needs, all in non-dominating conditions. Second, given that it is no accident that those leaders who have responded worst to this crisis have also been the main sources of countless conspiracy theories and misinformation, we must learn to keep oligarchs away from political power. Under representative democracy, bar outright revolution, we do not have the power to affect the everyday decisions of our representatives, but we can keep those with exclusive social and economic interests out of positions of political power.`;

const PASSAGE_REPORTED_SPEECH_2020 = `Direct Report Version:
Ms. N. said, "You must sing for me." "I'm dying, after all."
"I have never sung for a patient before," John said; "this visit isn't about me; it is about you."
"But you must," she insisted.
"You are asking me to cross a boundary - that invisible line in medicine that marks the edges of professional behavior appropriate to our clinical roles. We learn in medical school to maintain a distance between ourselves and our patients," he explained.

Indirect Report Version:
Ms. N., who was suffering from malignant bowel obstruction, asked John Wales, who was her home palliative care physician, to sing for her, although she (23) _____ at the gate of death. He told her that he had never sung for a patient before, and (24) _____ visit isn't about (25) _____; it was about (26) _____. However, Ms. N. insisted that (27) _____ had to. John Wales explained that (28) _____ (29) _____ asking (30) _____ to cross a boundary: that invisible line in medicine that marks the edges of professional behavior appropriate to (31) _____ clinical roles. He said that (32) _____ learned in medical school to maintain a distance between (33) _____ and (34) _____ patients.`;

const PASSAGE_LOVE_LUST_2020 = `Love vs. Lust (Word Bank: are considered | where | he | whom | considered | must | it | who | which | whose)

Love is something that is cultivated between two people and grows over time, through getting to know him or her and experiencing life's many ups and downs together. (35) _____ involves commitment, time, mutual trust, and acceptance.

Lust, on the other hand, has to do with the sex-driven sensations that draw people toward one another initially and is fueled primarily by the urge to procreate. Characterized by sex hormones and idealistic infatuation, lust blurs our ability to see a person for (36) _____ he or she truly is, and consequently, it may or may not lead to a long-term relationship.`;

const PASSAGE_PHARMACOLOGY_2020 = `Pharmacology (Word Bank: are considered | where | he | whom | considered | must | it | who | which | whose)

Pharmacology is a branch of medicine, biology and pharmaceutical sciences concerned with drug or medication action, (37) _____ a drug may be defined as any artificial, natural, or endogenous (from within the body) molecule (38) _____ exerts a biochemical or physiological effect on the cell, tissue, organ, or organism (sometimes the word pharmacon is used as a term to encompass these endogenous and exogenous bioactive species). More specifically, it is the study of the interactions that occur between a living organism and chemicals that affect normal or abnormal biochemical function. If substances have medicinal properties, they (39) _____ pharmaceuticals.`;

const PASSAGE_PIAGET_2020 = `Jean Piaget and Cognitive Development

[1] Jean Piaget was a Swiss psychologist renowned for his pioneering work in child development. Originally trained as a botanist, he developed one of the most important theories of cognitive development in the field of developmental psychology.

[2] Moving to Paris after his doctoral studies, Piaget worked at a school for boys and assisted in scoring Alfred Binet's early intelligence tests. While grading the tests, Piaget noticed patterns of consistent errors made by younger children that older children and adults did not make. He formed a hypothesis that young children thought differently than adults. This was the germ of what would eventually become his theory of progressive, distinct stages of cognitive development that people go through universally as they grow.

[3] Piaget began interviewing children using a clinical method of developing an in-depth, multidimensional profile of each individual child rather than standardized testing.

[4] Piaget has been called a great pioneer of constructivism, the theory that people build knowledge based on interactions between their thoughts and experiences. Piaget proposed in his theory that in learning, just as in biology, humans adapt to their environments through processes of assimilation and accommodation. As infants interact with their surroundings, they form mental constructs to represent their world, which he called schemata. In assimilation, new information is fitted into an existing schema. In accommodation, the schema itself is modified to fit the new experience.

[5] Piaget watched his own children, and those of his university professor colleagues, as they learned about their surroundings. He concluded that infants are in a sensorimotor stage of cognitive development, wherein they get information through their senses, engage in motor activities, and receive feedback from the environment about the effects of their motor actions.

[6] Around age two, children enter the preoperational stage, which lasts until around age seven. During this stage, children exhibit egocentrism—the inability to perceive a situation from another person's point of view. Another feature of preoperational thought is magical thinking—the belief that their thoughts or actions cause unrelated external events. Furthermore, children at this stage have not yet acquired conservation: the ability to retain mentally such properties as amount, number, or volume despite superficial alterations in appearance.

[7] In the following stage of concrete operations, which lasts until around age 11, children begin to think logically and perform what Piaget termed mental operations regarding tangible objects. They no longer think egocentrically and grasp the principles of conservation and reversibility.

[8] In Piaget's stage of formal operations, which begins just before puberty and continues into adolescence and adulthood, youngsters develop the ability to perform wholly mental operations involving abstract hypotheses and systematic deductive reasoning. This influenced later developmental psychologists like Lawrence Kohlberg, who used it as a basis for his own developmental theory of moral reasoning, which expanded on the foundations that Piaget had provided.`;

const PASSAGE_INSANITY_2021 = `Legal Responsibility and the Insanity Defense

[1] How should the law treat a mentally disturbed person who commits a criminal offense? Should individuals whose mental faculties are impaired be held responsible for their actions? These questions are of concern to social scientists, to members of the legal profession, and to individuals who work with criminal offenders.

[2] Over the centuries, an important part of Western law has been the concept that a civilized society should not punish a person who is mentally incapable of controlling his or her conduct. In 1724, an English court maintained that a man was not responsible for an act if "he does not know what he is doing, no more than... a wild beast." Modern standards of legal responsibility, however, have been based on the McNaghten decision of 1843. McNaghten, a Scotsman, suffered the paranoid delusion that he was being persecuted by the English prime minister, Sir Robert Peel. In an attempt to kill Peel, he mistakenly shot Peel's secretary. Everyone involved in the trial was convinced by McNaghten's senseless ramblings that he was insane. He was judged not responsible by reason of insanity and sent to a mental hospital, where he remained until his death. But Queen Victoria was not pleased with the verdict—apparently she felt that political assassinations should not be taken lightly—and called on the House of Lords to review the decision. The decision was upheld and rules for the legal definition of insanity were put into writing. The McNaghten Rule states that a defendant may be found "not guilty by reason of insanity" only if he were so severely disturbed at the time of his act that he did not know what he was doing, or that if he did know what he was doing, he did not know it was wrong.

[3] The McNaghten Rule was adopted in the United States, and the distinction of knowing right from wrong remained the basis of most decisions of legal insanity for over a century. Some states added to their statutes the doctrine of "irresistible impulse," which recognizes that some mentally ill individuals may respond correctly when asked if a particular act is morally right or wrong but still be unable to control their behavior.

[4] During the 1970s, a number of state and federal courts adopted a broader legal definition of insanity proposed by the American Law Institute, which states: "A person is not responsible for criminal conduct if at the time of such conduct, as a result of mental disease or defect, he lacks substantial capacity either to appreciate the wrongfulness of his conduct or to conform his conduct to the requirements of the law." The word substantial suggests that "any" incapacity is not enough to avoid criminal responsibility but that "total" incapacity is not required either. The use of the word appreciate rather than know implies that intellectual awareness of right or wrong is not enough; individuals must have some understanding of the moral or legal consequences of their behavior before they can be held criminally responsible.

[5] The problem of legal responsibility in the case of mentally disordered individuals is currently a topic of intense debate, and a number of legal and mental health professionals have recommended abolishing the insanity plea as a defense. The reasons for this recommendation are varied. Many experts believe that the current courtroom procedures—in which psychiatrists and psychologists for the prosecution and the defense present contradictory evidence as to the defendant's mental state—are confusing to the jury and do little to help the cause of justice. Some also argue that the abuse of the insanity plea by clever lawyers has allowed too many criminals to escape conviction. Others claim that acquittal by reason of insanity often leads to a worse punishment (an indeterminate sentence to an institution for the criminally insane that may confine a person for life) than being convicted and sent to prison (with the possibility of parole in a few years).

[6] Despite the current controversy, actual cases of acquittal by reason of insanity are quite rare. Jurors seem reluctant to believe that people are not morally responsible for their acts, and lawyers, knowing that an insanity plea is apt to fail, tend to use it only as a last resort. In California in 1980, only 259 defendants (out of approximately 52,000) were successful in pleading not guilty by reason of insanity.
(Adapted from Atkinson & Atkinson, Introduction to Psychology)`;

const PASSAGE_ADVICE_BANK_2021 = `PART ONE: MODALS AND INFINITIVES FOR GIVING ADVICE
Match expressions in Column 'A' with Column 'B' without distorting meaning for giving advice:

Column 'B' Advice Options Bank:
A. I don't think they should get married.
B. I had better not. I have got a lot to do.
C. Try running once a week.
D. We had better not take an umbrella.
E. You shouldn't eat excessive food.
F. You had better go now or you'll be late.
G. You ought not to go to bed so late.
H. That is dangerous. You should wear a helmet.
I. We had better take an umbrella.
J. Set the alarm clock before you go to bed.
K. You had better see a doctor.`;

const PASSAGE_ETHIOPIAN_FOOD_2021 = `PART FOUR: ACTIVE & PASSIVE VOICE
Read the text below and choose the correct active or passive present verb form:

Ethiopian Cultural Food
Dining on Ethiopian cultural food (35) ________ (characterize) by the ritual of breaking "Injera" and scooping food from a common plate, signifying the bonds of friendship.

The traditional way of eating is with fingers. "Injera" (36) ________ (place) on the plate with a variety of dishes decoratively arranged around it. A small portion of "Injera" is torn off and wrapped around a mouthful of the selected dish.

"Injera", our staple bread, is flat bread (37) ________ (make) of "Teff", a fine grain unique to Ethiopia. "Wot" is a dipping sauce which (38) ________ (prepare) using a variety of meats, fish, and vegetables. "Wot" (39) ________ (cook) with "Berbere" (Ethiopian seasoning prepared from matured red chili pepper and other exotic spices) which may range from very mild to spicy hot. "Alicha" is a more mildly spiced dipping sauce prepared with a variety of meats or vegetables.

Ethiopian cultural dishes (40) ________ (prepare) with a distinctive variety of unique spices for an unforgettably striking dimension to exotic cookery. To help you (41) ________ (make) the best choice for this truly different and exciting dining experience, we offer the following descriptions...`;

const PASSAGE_DEBOUL_CHALTU_2021 = `PART FIVE: CONDITIONALS
Read the dialogue below between Deboul and Chaltu and choose the correct verb forms:

Deboul: We had a great time at John's house last Sunday. Why didn't you come?
Chaltu: I had to study for my midterm examinations.
Deboul: We rented 'Back to the Future'. It's about a kid who time travels back to his parents' high school days. He changes his own future. At the end, his parents...
Chaltu: Had you come with us, you (42) ________ (see) an interesting film.
Deboul: Yeah? What?
Chaltu: Wait—don't tell me. If you (43) ________ (tell) me you will spoil its ending. I want to see it myself.
Deboul: OK. But have you ever thought about that?
Chaltu: About what?
Deboul: About how things could be different. You grew up here in Harar, and you're almost an adult now. However, what would have been your childhood like if you (44) ________ (be born) in a different family?
Chaltu: Let's see. If I (45) ________ (have) a different family, I wouldn't have grown up here in Harar.
Deboul: And if you hadn't grown up here, I (46) ________ (not meet) you.
Chaltu: That's true. By the way, how did you do on the exam?
Deboul: I passed. Hadn't I (47) ________ (study) hard, I could have failed that course.
Chaltu: That is true. If one studies hard, he/she (48) ________ (pass) any exam successfully.
Deboul: That's easy for you to say. You always get A's.
Chaltu: Sometimes I don't. It's not automatic. I (49) ________ (not get) A's unless I study hard.
Deboul: I suppose you're right.
Chaltu: If I (50) ________ (be) you, I would try to do better on the next examination also.
Deboul: I am happy to discuss with you on this issue if you (51) ________ (have) time tomorrow.
Chaltu: It sounds great. Thank you and goodbye.
Deboul: Thank you, too. Goodbye!`;

let updatedCount = 0;

exams.forEach(q => {
  // 1. Haramaya 2020 Final Exam
  if (q.id && q.id.startsWith('eng-hu-2020-covid-')) {
    const num = parseInt(q.id.replace('eng-hu-2020-covid-', ''));
    if (num >= 1 && num <= 22) {
      q.passage = PASSAGE_COVID_2020;
      updatedCount++;
    } else if (num >= 23 && num <= 34) {
      q.passage = PASSAGE_REPORTED_SPEECH_2020;
      updatedCount++;
    } else if (num >= 35 && num <= 36) {
      q.passage = PASSAGE_LOVE_LUST_2020;
      updatedCount++;
    } else if (num >= 37 && num <= 39) {
      q.passage = PASSAGE_PHARMACOLOGY_2020;
      updatedCount++;
    }
  } else if (q.id && q.id.startsWith('eng-hu-2020-final-mc-')) {
    const num = parseInt(q.id.replace('eng-hu-2020-final-mc-', ''));
    if (num >= 6 && num <= 25) {
      q.passage = PASSAGE_PIAGET_2020;
      updatedCount++;
    }
  }

  // 2. Haramaya 2021 Final Exam
  if (q.id && q.id.startsWith('eng-hu-2021-final-')) {
    const num = parseInt(q.id.replace('eng-hu-2021-final-', ''));
    if (num >= 1 && num <= 8) {
      q.passage = PASSAGE_ADVICE_BANK_2021;
      updatedCount++;
    } else if (num >= 9 && num <= 29) {
      q.passage = PASSAGE_INSANITY_2021;
      updatedCount++;
    } else if (num >= 35 && num <= 41) {
      q.passage = PASSAGE_ETHIOPIAN_FOOD_2021;
      updatedCount++;
    } else if (num >= 42 && num <= 51) {
      q.passage = PASSAGE_DEBOUL_CHALTU_2021;
      updatedCount++;
    }
  }
});

fs.writeFileSync(examsPath, JSON.stringify(exams, null, 2), 'utf8');
console.log(`Updated ${updatedCount} English exam questions with full reading passages, dialogues, and cloze texts.`);
