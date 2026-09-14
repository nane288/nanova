const fs = require('fs');
const exams = JSON.parse(fs.readFileSync('./data/exams.json', 'utf8'));

const grouped = {};
exams.forEach(q => {
  const cat = (q.category || '').includes('Mid') ? 'Mid' : ((q.category || '').includes('Final') ? 'Final' : 'Other');
  const univ = q.university || 'Unknown';
  const key = q.course + ' | ' + cat + ' | ' + univ;
  if (!grouped[key]) grouped[key] = {};
  grouped[key][q.year] = (grouped[key][q.year] || 0) + 1;
});

for (const [key, years] of Object.entries(grouped).sort()) {
  const yearStr = Object.entries(years)
    .sort()
    .map(([yr, count]) => `${yr}: ${count}`)
    .join(', ');
  console.log(`${key} => ${yearStr}`);
}
