const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');
const appJs = fs.readFileSync('app.js', 'utf8');

console.log('=== ACADEMIC YEAR VERIFICATION ===');

const authMatch = html.match(/<select id="authYearInput"[\s\S]*?<\/select>/);
console.log('1. authYearInput includes 2019 E.C. (2026/2027):', authMatch && authMatch[0].includes('2019 E.C. (2026/2027)'));
console.log('2. authYearInput includes 2018 E.C. (2025/2026):', authMatch && authMatch[0].includes('2018 E.C. (2025/2026)'));
console.log('3. authYearInput includes 2017 E.C. (2024/2025):', authMatch && authMatch[0].includes('2017 E.C. (2024/2025)'));
console.log('4. authYearInput includes 2016 E.C. (2023/2024):', authMatch && authMatch[0].includes('2016 E.C. (2023/2024)'));
console.log('5. authYearInput includes 2015 E.C. (2022/2023):', authMatch && authMatch[0].includes('2015 E.C. (2022/2023)'));
console.log('6. authYearInput includes 2014 E.C. (2021/2022):', authMatch && authMatch[0].includes('2014 E.C. (2021/2022)'));

const profMatch = html.match(/<select id="profileYearSelect"[\s\S]*?<\/select>/);
console.log('7. profileYearSelect exists and includes 2019 E.C.:', profMatch && profMatch[0].includes('2019 E.C. (2026/2027)'));

console.log('8. Old mismatched "2017 E.C. (2025/2026)" in index.html:', html.includes('2017 E.C. (2025/2026)'));
console.log('9. Old mismatched "2017 E.C. (2025/2026)" in app.js:', appJs.includes('2017 E.C. (2025/2026)'));
console.log('10. app.js default state academicYear set to 2019 E.C.:', appJs.includes("academicYear: '2019 E.C. (2026/2027)'"));
console.log('11. NanovaApp exports saveStudentProfile:', appJs.includes('saveStudentProfile,'));

console.log('\n✅ All checks evaluated successfully.');
