const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');
const appJs = fs.readFileSync('app.js', 'utf8');

console.log('--- HTML Structure Verification ---');
console.log('1. landingPage exists:', html.includes('id="landingPage"'));
console.log('2. mainAppContainer exists:', html.includes('id="mainAppContainer"'));
console.log('3. tab-exams exists:', html.includes('id="tab-exams"'));
console.log('4. tab-universities exists:', html.includes('id="tab-universities"'));
console.log('5. tab-feed exists:', html.includes('id="tab-feed"'));
console.log('6. tab-profile exists:', html.includes('id="tab-profile"'));
console.log('7. tab-admin exists:', html.includes('id="tab-admin"'));
console.log('8. mainNavTabs starts hidden:', html.includes('id="mainNavTabs" class="hidden'));

// Verify tabs nesting inside mainAppContainer
const mainAppStart = html.indexOf('id="mainAppContainer"');
const mainAppEnd = html.indexOf('<!-- END mainAppContainer -->');
const examsPos = html.indexOf('id="tab-exams"');
const univPos = html.indexOf('id="tab-universities"');
const feedPos = html.indexOf('id="tab-feed"');
const profPos = html.indexOf('id="tab-profile"');
const adminPos = html.indexOf('id="tab-admin"');
const landingPos = html.indexOf('id="landingPage"');

console.log('9. Landing is before mainAppContainer:', landingPos < mainAppStart);
console.log('10. All 5 tabs are strictly inside mainAppContainer:',
  examsPos > mainAppStart && examsPos < mainAppEnd &&
  univPos > mainAppStart && univPos < mainAppEnd &&
  feedPos > mainAppStart && feedPos < mainAppEnd &&
  profPos > mainAppStart && profPos < mainAppEnd &&
  adminPos > mainAppStart && adminPos < mainAppEnd
);

console.log('\n--- JS Logic Verification ---');
console.log('11. app.js manages landingPage:', appJs.includes("document.getElementById('landingPage')"));
console.log('12. app.js manages mainAppContainer:', appJs.includes("document.getElementById('mainAppContainer')"));
console.log('13. app.js manages mainNavTabs:', appJs.includes("document.getElementById('mainNavTabs')"));
console.log('14. switchTab blocks unauthenticated users:', appJs.includes("if (!State.currentUser) {\n      openAuthModal('access_app');\n      return;\n    }"));
console.log('15. firebaseSignOut calls updateProfileUI:', appJs.includes("updateProfileUI();\n    updateAdminUI();\n    renderBoardQuestionsPage();\n    alert('Logged out.');"));

console.log('\n✅ All checks evaluated.');
