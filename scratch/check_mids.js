const fs = require('fs');
const exams = JSON.parse(fs.readFileSync('./data/exams.json', 'utf8'));

const counts = {};
exams.forEach(q => {
  const cat = (q.category || (q.id && q.id.includes('mid') ? 'Mid Exam' : 'Final Exam')).trim();
  const key = q.course + ' | ' + q.year + ' | ' + cat;
  if (!counts[key]) counts[key] = { total: 0, byUniv: {} };
  counts[key].total++;
  const u = q.university || 'Unknown';
  counts[key].byUniv[u] = (counts[key].byUniv[u] || 0) + 1;
});

console.log('--- ALL MID EXAM COUNTS ---');
for (const [k, v] of Object.entries(counts)) {
  if (k.includes('Mid')) {
    console.log(k + ' -> Total: ' + v.total, JSON.stringify(v.byUniv));
  }
}
