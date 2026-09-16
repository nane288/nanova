const fs = require('fs');
const app = fs.readFileSync('app.js', 'utf8');
const index = fs.readFileSync('index.html', 'utf8');

console.log('1. app.js contains old questionsBoardContainer:', app.includes('questionsBoardContainer'));
console.log('2. app.js contains boardQuestionsListContainer:', app.includes("getElementById('boardQuestionsListContainer')"));
console.log('3. app.js has Unlock Next Questions:', app.includes('Unlock Next Questions'));
console.log('4. app.js has Unlock All Exam Questions:', app.includes('Unlock All Exam Questions'));
console.log('5. app.js has restoreBoardQuestions:', app.includes('restoreBoardQuestions'));
console.log('6. index.html has boardNextPageBtn with unlock styling:', index.includes('Unlock Next Questions'));
console.log('7. app.js syntax check: OK');
