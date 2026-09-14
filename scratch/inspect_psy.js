const fs = require('fs');
const exams = JSON.parse(fs.readFileSync('./data/exams.json', 'utf8'));

console.log('=== PSYCHOLOGY 2022 MID (Original 32 questions) ===');
const psy2022_orig = exams.filter(q => q.course === 'General Psychology' && q.year === '2022 Exam' && !q.id.startsWith('hu-psy-harar'));
console.log('Count:', psy2022_orig.length);
const types2022 = {};
psy2022_orig.forEach(q => {
  const prefix = q.id.replace(/-\d+$/, '');
  types2022[prefix] = (types2022[prefix] || 0) + 1;
});
console.log('Types in 2022 orig:', types2022);

console.log('\n=== PSYCHOLOGY 2023 MID (52 questions) ===');
const psy2023 = exams.filter(q => q.course === 'General Psychology' && q.year === '2023 Exam' && q.university === 'Haramaya University');
console.log('Count:', psy2023.length);
const types2023 = {};
psy2023.forEach(q => {
  const prefix = q.id.replace(/-\d+$/, '');
  types2023[prefix] = (types2023[prefix] || 0) + 1;
});
console.log('Types in 2023 HU:', types2023);

console.log('\n=== Check git log or commits for psyc-hu-2023-mid-s2 ===');
