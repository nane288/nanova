const fs = require('fs');
const exams = JSON.parse(fs.readFileSync('./data/exams.json', 'utf8'));

let midOverflow = 0, finalOverflow = 0;
const midCounts = {}, finalCounts = {};

exams.forEach(q => {
  const cat = (q.category || '').trim();
  const key = q.course + ' | ' + q.year + ' | ' + (q.university || 'Unknown');
  if (cat.includes('Mid')) {
    midCounts[key] = (midCounts[key] || 0) + 1;
  } else if (cat.includes('Final')) {
    finalCounts[key] = (finalCounts[key] || 0) + 1;
  }
});

console.log('=== MID EXAMS (limit: 30) ===');
for (const [k, count] of Object.entries(midCounts).sort()) {
  const flag = count > 30 ? ' ⚠️ OVER 30' : '';
  if (count > 30) midOverflow++;
  if (flag) console.log(count + '\t' + k + flag);
}
if (midOverflow === 0) console.log('✅ All Mid Exams: 0 violations!');

console.log('\n=== FINAL EXAMS (limit: 50) ===');
for (const [k, count] of Object.entries(finalCounts).sort()) {
  const flag = count > 50 ? ' ⚠️ OVER 50' : '';
  if (count > 50) finalOverflow++;
  if (flag) console.log(count + '\t' + k + flag);
}
if (finalOverflow === 0) console.log('✅ All Final Exams: 0 violations!');

console.log('\n=== SUMMARY ===');
console.log('Total questions:', exams.length);
console.log('Mid violations:', midOverflow);
console.log('Final violations:', finalOverflow);

// Also list any "borderline" cases (>25 Mid, >40 Final)
console.log('\n--- Mid Exams 25-30 (borderline) ---');
for (const [k, count] of Object.entries(midCounts).sort()) {
  if (count >= 25 && count <= 30) console.log(count + '\t' + k);
}
console.log('\n--- Final Exams 40-50 (borderline) ---');
for (const [k, count] of Object.entries(finalCounts).sort()) {
  if (count >= 40 && count <= 50) console.log(count + '\t' + k);
}
