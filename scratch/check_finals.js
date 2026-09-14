const fs = require('fs');
const exams = JSON.parse(fs.readFileSync('./data/exams.json', 'utf8'));

console.log('=== FINAL EXAM COUNTS PER UNIVERSITY ===\n');
const finalCounts = {};
exams.forEach(q => {
  const cat = (q.category || '').trim();
  if (!cat.includes('Final')) return;
  const key = q.course + ' | ' + q.year + ' | ' + (q.university || 'Unknown');
  if (!finalCounts[key]) finalCounts[key] = { total: 0, ids: [] };
  finalCounts[key].total++;
  finalCounts[key].ids.push(q.id);
});

let hasOverflow = false;
for (const [k, v] of Object.entries(finalCounts).sort()) {
  const flag = v.total > 50 ? '  ⚠️  OVERFLOW!' : '';
  if (v.total > 50) hasOverflow = true;
  console.log(v.total + '\t' + k + flag);
}

console.log('\n=== TOTAL PER COURSE+YEAR (ALL UNIVERSITIES COMBINED) ===\n');
const combined = {};
exams.forEach(q => {
  const cat = (q.category || '').trim();
  if (!cat.includes('Final')) return;
  const key = q.course + ' | ' + q.year;
  combined[key] = (combined[key] || 0) + 1;
});
for (const [k, v] of Object.entries(combined).sort()) {
  const flag = v > 50 ? '  ⚠️' : '';
  console.log(v + '\t' + k + flag);
}

if (!hasOverflow) {
  console.log('\n✅ No per-university Final Exam has > 50 questions');
} else {
  console.log('\n❌ Overflows found! Investigation needed.');
}
