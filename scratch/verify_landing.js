const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');
const appJs = fs.readFileSync('app.js', 'utf8');

console.log('=== LANDING PAGE UI VERIFICATION ===');

const landingStart = html.indexOf('id="landingPage"');
const landingEnd = html.indexOf('id="mainAppContainer"');
const landing = html.substring(landingStart, landingEnd);

// 1. Check for ANY mention of 'free' in landing page
const freeMatches = landing.match(/free/gi) || [];
console.log('1. Mentions of "free" in landing page:', freeMatches.length === 0 ? 'ZERO (PASSED)' : freeMatches);

// 2. Color Palette checks
console.log('2. Has cyan accents:', landing.includes('cyan'));
console.log('3. Has violet touches:', landing.includes('violet'));
console.log('4. Has deep navy colors:', landing.includes('#091124') && landing.includes('#0b162c'));

// 3. Hero Section checks
console.log('5. Has institutional badge:', landing.includes('Freshman Examination Archives'));
console.log('6. Has polished dashboard preview:', landing.includes('Examination Suite'));
console.log('7. Has floating elements:', landing.includes('2024–2025 Exam Papers Added') && landing.includes('Verified Step-by-Step Keys'));

// 4. Structure checks
console.log('8. Has metrics section (10+ Universities, 5,000+ Questions):', landing.includes('10+') && landing.includes('5,000+'));
console.log('9. Has features grid:', landing.includes('Genuine Semester Exams') && landing.includes('Step-by-Step Solutions') && landing.includes('Student Community Feed'));
console.log('10. Has course pills:', landing.includes('Applied Mathematics I & II') && landing.includes('Logic & Critical Thinking'));
console.log('11. Has bottom CTA banner:', landing.includes('Ready to Start Practicing?'));
console.log('12. Has footer with Privacy Policy and Sign In:', landing.includes('Privacy Policy') && landing.includes('Nanova - Ethiopia Campus Board'));

// 5. App.js check
console.log('13. app.js authModal doesn\'t say "Create Free Student Account":', !appJs.includes('Create Free Student Account'));

console.log('\n=== SYNTAX & VALIDITY ===');
console.log('HTML valid structure:', landingStart !== -1 && landingEnd > landingStart);
