const fs = require('fs');
const exams = JSON.parse(fs.readFileSync('./data/exams.json', 'utf8'));

// === Check what years currently have Psy Final data ===
console.log('=== Psy Final Exams by Year (HU only) ===');
['2020 Exam','2021 Exam','2022 Exam','2023 Exam','2024 Exam'].forEach(yr => {
  const qs = exams.filter(q => q.course === 'General Psychology' && q.year === yr && q.university === 'Haramaya University' && (q.category||'').includes('Final'));
  console.log(yr + ':', qs.length, qs.length > 0 ? '- IDs: ' + [...new Set(qs.map(q => q.id.replace(/-\d+$/,'')))].join(', ') : '(empty)');
});

// === Check what years have Math Final data ===
console.log('\n=== Math Final Exams by Year (HU only) ===');
['2020 Exam','2021 Exam','2022 Exam','2023 Exam','2024 Exam'].forEach(yr => {
  const qs = exams.filter(q => q.course === 'Applied Mathematics I' && q.year === yr && q.university === 'Haramaya University' && (q.category||'').includes('Final'));
  console.log(yr + ':', qs.length, qs.length > 0 ? '- IDs: ' + [...new Set(qs.map(q => q.id.replace(/-\d+$/,'')))].join(', ') : '(empty)');
});

// === hu-psy-exam-* - what year is it supposed to be? ===
const psyExam = exams.filter(q => q.id && q.id.startsWith('hu-psy-exam-'));
console.log('\nhu-psy-exam-* current year:', [...new Set(psyExam.map(q => q.year))]);
console.log('Count:', psyExam.length);
// Show first question topic
console.log('Sample:', psyExam[0].question.substring(0, 80));
console.log('Topics: all from one exam booklet? Check last question:');
console.log('Last:', psyExam[psyExam.length-1].question.substring(0, 80));

// Math-b - what topics does it cover vs set A?
const mathA = exams.filter(q => q.id && q.id.startsWith('math-hu-2023-final-') && !q.id.startsWith('math-hu-2023-final-b-'));
const mathB = exams.filter(q => q.id && q.id.startsWith('math-hu-2023-final-b-'));
console.log('\n=== Math 2023 Set A topics ===');
mathA.forEach(q => console.log(' ', q.id, '|', q.question.substring(0, 60)));
console.log('\n=== Math 2023 Set B first 5 ===');
mathB.slice(0,5).forEach(q => console.log(' ', q.id, '|', q.question.substring(0, 60)));
