/**
 * fix_mid_exam_overflow.js (v2)
 * 
 * Only removes CONFIRMED duplicates and fixes WRONG year assignments.
 * Does NOT modify genuine single-booklet exams even if they have 32-34 questions.
 * 
 * FIX 1: Remove 30 duplicate questions (hu-psy-harar-*) from Psy 2022
 *   - Confirmed 100% match with 2021 exam content
 *   - Psy 2022 drops from 62 → 32 (genuine single booklet)
 * 
 * FIX 2: Move 28 Psy 2023 Set-2 questions (psyc-hu-2023-mid-s2-*) to 2020 Exam
 *   - Two separate exam sets were merged into 2023
 *   - 2020 had 0 Psychology Mid questions before this fix
 */

const fs = require('fs');
const path = require('path');

const examsPath = path.join(__dirname, '../data/exams.json');
let exams = JSON.parse(fs.readFileSync(examsPath, 'utf8'));

const originalCount = exams.length;
console.log('Original question count:', originalCount);

// FIX 1: Remove confirmed duplicate harar questions from Psy 2022
const duplicateIds = new Set(
  exams
    .filter(q => q.id && q.id.startsWith('hu-psy-harar-'))
    .map(q => q.id)
);
console.log('\nFIX 1 - Removing', duplicateIds.size, 'duplicate Psy 2022 harar questions...');

let fixed = exams.filter(q => !duplicateIds.has(q.id));
console.log('After Fix 1:', fixed.length, '(removed:', exams.length - fixed.length, ')');

// FIX 2: Move Psy 2023 Set-2 to 2020 Exam
const set2Count = fixed.filter(q => q.id && q.id.startsWith('psyc-hu-2023-mid-s2-')).length;
console.log('\nFIX 2 - Moving', set2Count, 'Psy 2023 Set-2 questions to 2020 Exam...');

fixed = fixed.map(q => {
  if (q.id && q.id.startsWith('psyc-hu-2023-mid-s2-')) {
    return { ...q, year: '2020 Exam' };
  }
  return q;
});

// VERIFY: Print all Mid exam counts per university
console.log('\n=== VERIFICATION: Mid Exam counts per university after fixes ===');
const midCounts = {};
fixed.forEach(q => {
  const cat = (q.category || '').trim();
  if (!cat.includes('Mid')) return;
  const key = q.course + ' | ' + q.year + ' | ' + (q.university || 'Unknown');
  midCounts[key] = (midCounts[key] || 0) + 1;
});

// Print and flag any merged/duplicate overflow (only flag > 34 as problematic)
let hasRealOverflow = false;
for (const [k, count] of Object.entries(midCounts).sort()) {
  const flag = count > 34 ? ' ⚠️  SUSPICIOUS OVERFLOW!' : '';
  if (count > 34) hasRealOverflow = true;
  console.log('  ' + count + '\t' + k + flag);
}

if (hasRealOverflow) {
  console.log('\n❌ Suspicious overflows still exist! Investigate before writing.');
  process.exit(1);
}
console.log('\n✅ All Mid exams look clean! (32 and 34 accepted as genuine single booklets)');

// Validate JSON integrity
const testJson = JSON.parse(JSON.stringify(fixed));
console.log('JSON integrity check: OK -', testJson.length, 'questions');

// Write
fs.writeFileSync(examsPath, JSON.stringify(fixed, null, 2));
console.log('\n✅ data/exams.json written successfully.');
console.log('Final count:', fixed.length);
console.log('Net removed:', originalCount - fixed.length, '(only confirmed duplicates)');
