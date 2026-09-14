const fs = require('fs');
const { execSync } = require('child_process');
const exams = JSON.parse(fs.readFileSync('./data/exams.json', 'utf8'));

// === PSY 2023 HU Final ===
// hu-psy-2023-final-* (46 Qs) + hu-psy-final-14-* (44 Qs) = 90 total
// "14" in "final-14" likely means Ethiopian calendar year 2014 = Gregorian 2021/2022

// Check if hu-psy-final-14-* also appears in any other year
const psy_14 = exams.filter(q => q.id && q.id.startsWith('hu-psy-final-14-'));
console.log('=== hu-psy-final-14-* across all years ===');
psy_14.forEach(q => console.log('  ', q.id, '| year:', q.year, '| cat:', q.category));

// Check hu-psy-2023-final-* question text compared to 2022 final
const psy2023_final = exams.filter(q => q.id && q.id.startsWith('hu-psy-2023-final-'));
const psy2022_final = exams.filter(q => 
  q.course === 'General Psychology' &&
  q.year === '2022 Exam' &&
  (q.category || '').includes('Final')
);
console.log('\n=== Psy 2023 final (hu-psy-2023-final-*): ', psy2023_final.length, 'Qs ===');
console.log('=== Psy 2022 final (hu-psy-exam-*): ', psy2022_final.length, 'Qs ===');

// Check exact text match to detect cross-year duplicates
const psy2022Text = new Set(psy2022_final.map(q => q.question.trim().toLowerCase()));
let matchCount = 0;
psy2023_final.forEach(q => {
  if (psy2022Text.has(q.question.trim().toLowerCase())) {
    matchCount++;
    console.log('  DUPLICATE FOUND:', q.id, '->', q.question.substring(0, 60));
  }
});
console.log('\nPsy 2023 final Qs that match Psy 2022 final text:', matchCount);

// Check hu-psy-final-14-* vs psy 2022
const psy_14_text = psy_14.map(q => q.question.trim().toLowerCase());
const psy2022_text = psy2022_final.map(q => q.question.trim().toLowerCase());
let match14 = 0;
psy_14.forEach(q => {
  if (psy2022Text.has(q.question.trim().toLowerCase())) {
    match14++;
    console.log('  MATCH 14 vs 2022:', q.id, '->', q.question.substring(0, 60));
  }
});
console.log('\nhu-psy-final-14-* Qs that match Psy 2022 text:', match14);

// Check hu-psy-final-14-* vs psy 2021 final
const psy2021_final = exams.filter(q =>
  q.course === 'General Psychology' &&
  q.year === '2021 Exam' &&
  (q.category || '').includes('Final')
);
console.log('\nPsy 2021 Final count:', psy2021_final.length);
const psy2021Text = new Set(psy2021_final.map(q => q.question.trim().toLowerCase()));
let match14vs21 = 0;
psy_14.forEach(q => {
  if (psy2021Text.has(q.question.trim().toLowerCase())) {
    match14vs21++;
  }
});
console.log('hu-psy-final-14-* Qs matching Psy 2021 text:', match14vs21);

// === MATH 2023 ===
// math-hu-2023-final-* (set A, 24 Qs) + math-hu-2023-final-b-* (set B, 38 Qs) = 62
// Check if Set A vs Set B are two separate exam sessions (e.g. regular vs makeup)
// or if Set B questions appear elsewhere
const mathA = exams.filter(q => q.id && q.id.startsWith('math-hu-2023-final-') && !q.id.startsWith('math-hu-2023-final-b-'));
const mathB = exams.filter(q => q.id && q.id.startsWith('math-hu-2023-final-b-'));
console.log('\n=== Math 2023 HU Final ===');
console.log('Set A (math-hu-2023-final-*):', mathA.length, 'questions');
console.log('Set B (math-hu-2023-final-b-*):', mathB.length, 'questions');

// Check for text overlap between Set A and Set B
const mathAText = new Set(mathA.map(q => q.question.trim().toLowerCase()));
let mathDups = 0;
mathB.forEach(q => {
  if (mathAText.has(q.question.trim().toLowerCase())) {
    mathDups++;
    console.log('  MATH A-B DUPLICATE:', q.id);
  }
});
console.log('Math Set A vs B text duplicates:', mathDups);

// Check Math 2022 vs 2023 Set B
const math2022_final = exams.filter(q =>
  q.course === 'Applied Mathematics I' &&
  q.year === '2022 Exam' &&
  (q.category || '').includes('Final')
);
const math2022Text = new Set(math2022_final.map(q => q.question.trim().toLowerCase()));
let mathB_2022_match = 0;
mathB.forEach(q => {
  if (math2022Text.has(q.question.trim().toLowerCase())) {
    mathB_2022_match++;
    console.log('  Math B matches 2022:', q.id, '->', q.question.substring(0, 50));
  }
});
console.log('Math Set B Qs matching 2022 final text:', mathB_2022_match);
