const fs = require('fs');
const { execSync } = require('child_process');
const exams = JSON.parse(fs.readFileSync('./data/exams.json', 'utf8'));

// === MATH 2023 HU Final (62 Qs) ===
const math2023 = exams.filter(q =>
  q.course === 'Applied Mathematics I' &&
  q.year === '2023 Exam' &&
  q.university === 'Haramaya University' &&
  (q.category || '').includes('Final')
);
console.log('=== Math 2023 HU Final:', math2023.length, '===');
const mathTypes = {};
math2023.forEach(q => {
  const prefix = q.id.replace(/-\d+$/, '');
  mathTypes[prefix] = (mathTypes[prefix] || 0) + 1;
});
console.log('ID prefixes:', mathTypes);
console.log('First few IDs:', math2023.slice(0, 5).map(q => q.id));
console.log('Last few IDs:', math2023.slice(-5).map(q => q.id));

// === PSY 2023 HU Final (90 Qs) ===
const psy2023 = exams.filter(q =>
  q.course === 'General Psychology' &&
  q.year === '2023 Exam' &&
  q.university === 'Haramaya University' &&
  (q.category || '').includes('Final')
);
console.log('\n=== Psy 2023 HU Final:', psy2023.length, '===');
const psyTypes = {};
psy2023.forEach(q => {
  const prefix = q.id.replace(/-\d+$/, '');
  psyTypes[prefix] = (psyTypes[prefix] || 0) + 1;
});
console.log('ID prefixes:', psyTypes);

// === PSY 2022 HU Final (50 Qs exactly - check for merge) ===
const psy2022 = exams.filter(q =>
  q.course === 'General Psychology' &&
  q.year === '2022 Exam' &&
  q.university === 'Haramaya University' &&
  (q.category || '').includes('Final')
);
console.log('\n=== Psy 2022 HU Final:', psy2022.length, '===');
const psy22Types = {};
psy2022.forEach(q => {
  const prefix = q.id.replace(/-\d+$/, '');
  psy22Types[prefix] = (psy22Types[prefix] || 0) + 1;
});
console.log('ID prefixes:', psy22Types);

// === GEOGRAPHY 2024 HU Final (50 Qs exactly) ===
const geo2024 = exams.filter(q =>
  q.course === 'Geography of Ethiopia and the Horn' &&
  q.year === '2024 Exam' &&
  q.university === 'Haramaya University' &&
  (q.category || '').includes('Final')
);
console.log('\n=== Geo 2024 HU Final:', geo2024.length, '===');
const geoTypes = {};
geo2024.forEach(q => {
  const prefix = q.id.replace(/-\d+$/, '');
  geoTypes[prefix] = (geoTypes[prefix] || 0) + 1;
});
console.log('ID prefixes:', geoTypes);
