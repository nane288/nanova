const fs = require('fs');
const path = require('path');

const EXAMS_PATH = path.resolve(__dirname, '../data/exams.json');
let data = JSON.parse(fs.readFileSync(EXAMS_PATH, 'utf8'));

// Map of hu-2022-nat-* to unified hu-2022-coc-*
let index = 1;
data = data.map(q => {
  if (q.id && q.id.startsWith('hu-2022-nat-')) {
    const padNum = String(index).padStart(2, '0');
    index++;
    return {
      ...q,
      id: `hu-2022-coc-${padNum}`,
      course: 'Freshman COC',
      category: 'COC Exam',
      university: 'Haramaya University',
      year: '2022 Exam'
    };
  }
  return q;
});

fs.writeFileSync(EXAMS_PATH, JSON.stringify(data, null, 2), 'utf8');
console.log(`Successfully unified 30 questions for 2022 COC. Total questions: ${data.length}`);
