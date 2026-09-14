const { execSync } = require('child_process');

// Find commits for specific questions
const log1 = execSync('git log -S "hu-psy-mid-tf-01" --oneline -n5', { cwd: __dirname + '/..' }).toString();
console.log('Psy mid-tf-01 commits:', log1);

const log2 = execSync('git log -S "eng-hu-2023-mid-rc-01" --oneline -n5', { cwd: __dirname + '/..' }).toString();
console.log('English rc-01 commits:', log2);

// Look at the actual Psy 2022 32 questions — are they all from one exam?
const fs = require('fs');
const exams = JSON.parse(fs.readFileSync(__dirname + '/../data/exams.json', 'utf8'));

const psy2022 = exams.filter(q => 
  q.course === 'General Psychology' && 
  q.year === '2022 Exam' && 
  q.id.startsWith('hu-psy-mid-')
);
console.log('\nPsy 2022 original hu-psy-mid-* count:', psy2022.length);
psy2022.forEach(q => console.log(' ', q.id, '|', q.type || 'no-type', '|', q.question.substring(0, 60)));

// Check if rc-15 exists
const eng15 = exams.find(q => q.id === 'eng-hu-2023-mid-rc-15');
console.log('\neng-hu-2023-mid-rc-15 exists?', !!eng15);

// Check English exam - are rc, tns, adv from one exam booklet?
const eng2023 = exams.filter(q => 
  q.course === 'Communicative English' && 
  q.year === '2023 Exam' && 
  q.university === 'Haramaya University' &&
  (q.category || '').includes('Mid')
);
console.log('\nEnglish 2023 HU Mid question IDs:');
eng2023.forEach(q => console.log(' ', q.id));
