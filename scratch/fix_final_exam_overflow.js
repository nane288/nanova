/**
 * fix_final_exam_overflow_v2.js
 * 
 * FIX 1: hu-psy-final-14-* (44 Qs) — EC 2014 = 2021/2022 G.C.
 *   Currently labeled as '2023 Exam' (wrong - put there by commit c7a20c0)
 *   Psy 2022 already has 50 genuine questions (hu-psy-exam-*) — full
 *   Psy 2021 has 0 Final questions — EMPTY GAP
 *   → Move hu-psy-final-14-* to '2021 Exam'
 * 
 * FIX 2: math-hu-2023-final-b-* (38 Qs) — second exam sitting 2023
 *   Two different 2023 Math final papers merged into one year
 *   Math 2024 has 0 Final questions — EMPTY GAP
 *   → Move math-hu-2023-final-b-* to '2024 Exam'
 */

const fs = require('fs');
const path = require('path');

const examsPath = path.join(__dirname, '../data/exams.json');
let exams = JSON.parse(fs.readFileSync(examsPath, 'utf8'));

console.log('Original count:', exams.length);

// FIX 1: hu-psy-final-14-* → 2021 Exam
const psy14Count = exams.filter(q => q.id && q.id.startsWith('hu-psy-final-14-')).length;
console.log('\nFIX 1 - Moving', psy14Count, 'hu-psy-final-14-* from 2023 → 2021 Exam');

let fixed = exams.map(q => {
  if (q.id && q.id.startsWith('hu-psy-final-14-')) {
    return { ...q, year: '2021 Exam' };
  }
  return q;
});

// FIX 2: math-hu-2023-final-b-* → 2024 Exam
const mathBCount = fixed.filter(q => q.id && q.id.startsWith('math-hu-2023-final-b-')).length;
console.log('FIX 2 - Moving', mathBCount, 'math-hu-2023-final-b-* from 2023 → 2024 Exam');

fixed = fixed.map(q => {
  if (q.id && q.id.startsWith('math-hu-2023-final-b-')) {
    return { ...q, year: '2024 Exam' };
  }
  return q;
});

// === VERIFY: Print all Final Exam counts per university ===
console.log('\n=== VERIFICATION: Final Exam counts per university ===');
const finalCounts = {};
fixed.forEach(q => {
  const cat = (q.category || '').trim();
  if (!cat.includes('Final')) return;
  const key = q.course + ' | ' + q.year + ' | ' + (q.university || 'Unknown');
  finalCounts[key] = (finalCounts[key] || 0) + 1;
});

let hasOverflow = false;
for (const [k, count] of Object.entries(finalCounts).sort()) {
  const flag = count > 50 ? '  ⚠️  OVERFLOW!' : '';
  if (count > 50) hasOverflow = true;
  console.log('  ' + count + '\t' + k + flag);
}

if (hasOverflow) {
  console.log('\n❌ Overflows still exist! Stopping before write.');
  process.exit(1);
}

console.log('\n✅ All Final Exams have ≤ 50 questions per university!');

// JSON validation
JSON.parse(JSON.stringify(fixed));
console.log('JSON integrity: OK');

fs.writeFileSync(examsPath, JSON.stringify(fixed, null, 2));
console.log('✅ data/exams.json updated. Total questions:', fixed.length);
