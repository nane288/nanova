// Add Haramaya University Math 1011 Final Exam 2021
const fs = require('fs');
const path = require('path');

const EXAMS_PATH = path.resolve(__dirname, '../data/exams.json');
const data = JSON.parse(fs.readFileSync(EXAMS_PATH, 'utf8'));

const newQuestions = [
  // ─── PART I: TRUE / FALSE ────────────────────────────────────────────────
  {
    id: 'math-hu-2021-final-tf-01',
    course: 'Applied Mathematics I',
    university: 'Haramaya University',
    year: '2021 Exam',
    category: 'Final Exam',
    question: 'True or False: Let f : A → B be a relation, then the domain of f is always equal to A.',
    options: ['True', 'False'],
    answer: 1,
    explanation: 'FALSE. The domain of a relation f : A → B is the set of all first elements of its ordered pairs, which is a subset of A but not necessarily equal to A. A is the source set; the domain is only those elements of A that are actually paired with something in B.'
  },
  {
    id: 'math-hu-2021-final-tf-02',
    course: 'Applied Mathematics I',
    university: 'Haramaya University',
    year: '2021 Exam',
    category: 'Final Exam',
    question: 'True or False: A function is one-to-one if and only if no horizontal line intersects its graph more than once.',
    options: ['True', 'False'],
    answer: 0,
    explanation: 'TRUE. This is the horizontal line test: a function f is one-to-one (injective) if and only if every horizontal line y = c intersects the graph of f at most once.'
  },
  {
    id: 'math-hu-2021-final-tf-03',
    course: 'Applied Mathematics I',
    university: 'Haramaya University',
    year: '2021 Exam',
    category: 'Final Exam',
    question: 'True or False: If f(x) = x / (x − 1), then the domain of (f ∘ f)(x) is the set of all real numbers.',
    options: ['True', 'False'],
    answer: 1,
    explanation: 'FALSE. (f ∘ f)(x) = f(f(x)). f(x) = x/(x−1) is undefined at x = 1. Also f(f(x)) simplifies to x, but the domain must exclude x = 1 (where f is undefined). So domain = ℝ \\ {1}, not all real numbers.'
  },
  {
    id: 'math-hu-2021-final-tf-04',
    course: 'Applied Mathematics I',
    university: 'Haramaya University',
    year: '2021 Exam',
    category: 'Final Exam',
    question: 'True or False: Two lines with positive slopes are non-perpendicular lines.',
    options: ['True', 'False'],
    answer: 0,
    explanation: 'TRUE. For two lines to be perpendicular, the product of their slopes must equal −1. If both slopes are positive, their product is positive and can never equal −1. So two lines with positive slopes are always non-perpendicular.'
  },
  {
    id: 'math-hu-2021-final-tf-05',
    course: 'Applied Mathematics I',
    university: 'Haramaya University',
    year: '2021 Exam',
    category: 'Final Exam',
    question: 'True or False: A circle is a set of points in a plane which are equidistant from a fixed point in the plane.',
    options: ['True', 'False'],
    answer: 0,
    explanation: 'TRUE. By definition, a circle is the locus of all points in a plane at a fixed distance (radius r) from a fixed point (the center). This is the standard definition of a circle.'
  },

  // ─── PART II: MULTIPLE CHOICE ────────────────────────────────────────────
  {
    id: 'math-hu-2021-final-mc-01',
    course: 'Applied Mathematics I',
    university: 'Haramaya University',
    year: '2021 Exam',
    category: 'Final Exam',
    question: 'Let z and w be complex numbers. Then, which one of the following is true?\nA. Re(z + w) = Re(z) + Re(w)\nB. Im(z + w) = Im(z) + Im(w)\nC. Re(zw) = Re(z)Re(w) − Im(z)Im(w)\nD. Im(zw) = Re(z)Im(w) + Re(w)Im(z)\nE. All of the above',
    options: [
      'Re(z + w) = Re(z) + Re(w)',
      'Im(z + w) = Im(z) + Im(w)',
      'Re(zw) = Re(z)Re(w) − Im(z)Im(w)',
      'Im(zw) = Re(z)Im(w) + Re(w)Im(z)',
      'All of the above'
    ],
    answer: 4,
    explanation: 'All four statements are true. Let z = a+bi and w = c+di. Then: Re(z+w)=a+c ✓; Im(z+w)=b+d ✓; zw=(ac−bd)+(ad+bc)i, so Re(zw)=ac−bd=Re(z)Re(w)−Im(z)Im(w) ✓; Im(zw)=ad+bc=Re(z)Im(w)+Re(w)Im(z) ✓. Answer: E.'
  },
  {
    id: 'math-hu-2021-final-mc-02',
    course: 'Applied Mathematics I',
    university: 'Haramaya University',
    year: '2021 Exam',
    category: 'Final Exam',
    question: 'The value of |i⁵⁰ + i⁵² + i⁵⁴ + i⁵⁶| is:',
    options: ['1', '−1', '2', '0'],
    answer: 3,
    explanation: 'Powers of i cycle with period 4. i⁵⁰ = i^(4·12+2) = i² = −1; i⁵² = i^(4·13) = 1; i⁵⁴ = i² = −1; i⁵⁶ = i^(4·14) = 1. Sum = −1+1−1+1 = 0. |0| = 0. Answer: D.'
  },
  {
    id: 'math-hu-2021-final-mc-03',
    course: 'Applied Mathematics I',
    university: 'Haramaya University',
    year: '2021 Exam',
    category: 'Final Exam',
    question: 'The range of the relation R = {(x, x²) : x is a prime number less than 13} is:',
    options: [
      '{2, 3, 5, 7}',
      '{2, 3, 5, 7, 11}',
      '{4, 9, 25, 49, 121}',
      '{1, 4, 9, 25, 49, 121}'
    ],
    answer: 2,
    explanation: 'Primes less than 13: 2, 3, 5, 7, 11. Squaring each: 4, 9, 25, 49, 121. Range = {4, 9, 25, 49, 121}. Answer: C.'
  },
  {
    id: 'math-hu-2021-final-mc-04',
    course: 'Applied Mathematics I',
    university: 'Haramaya University',
    year: '2021 Exam',
    category: 'Final Exam',
    question: 'If the ordered pairs (a + 2, 4) and (5, 2a + b) are equal, then (a, b) is:',
    options: ['(2, −2)', '(5, 1)', '(3, 10)', '(3, −2)'],
    answer: 3,
    explanation: 'Equal ordered pairs → equal components: a + 2 = 5 → a = 3. And 4 = 2(3) + b → b = −2. So (a, b) = (3, −2). Answer: D.'
  },
  {
    id: 'math-hu-2021-final-mc-05',
    course: 'Applied Mathematics I',
    university: 'Haramaya University',
    year: '2021 Exam',
    category: 'Final Exam',
    question: 'Let f = {(0,1),(2,0),(3,4),(4,2),(5,7)} and g = {(0,2),(1,0),(2,4),(−4,2),(7,0)}. Then the range of f ∘ g is:',
    options: ['{0, 1, 2}', '{−4, 1, 0, 2, 7}', '{1, 2, 3, 4, 5}', '{0, 2, 3, 4, 5}'],
    answer: 0,
    explanation: 'Apply g first, then f: g(0)=2→f(2)=0; g(1)=0→f(0)=1; g(2)=4→f(4)=2; g(−4)=2→f(2)=0; g(7)=0→f(0)=1. Range of f∘g = {0, 1, 2}. Answer: A.'
  },
  {
    id: 'math-hu-2021-final-mc-06',
    course: 'Applied Mathematics I',
    university: 'Haramaya University',
    year: '2021 Exam',
    category: 'Final Exam',
    question: 'When polynomial p(x) is divided by x − 5, the quotient is 3x⁴ − 5x² + 2x − 5 with remainder 4. Then:',
    options: [
      'x − 4 is a factor of p(x) and 4 is a zero of p(x)',
      'x + 5 is not a factor of p(x) and −5 is not a zero of p(x)',
      'x − 5 is a factor of p(x) and −5 is a zero of p(x)',
      'x − 5 is not a factor of p(x) and 5 is not a zero of p(x)'
    ],
    answer: 3,
    explanation: 'p(x) = (x−5)(3x⁴−5x²+2x−5) + 4. Since remainder = 4 ≠ 0, by the Factor Theorem x−5 is NOT a factor and p(5) = 4 ≠ 0, so 5 is NOT a zero. Answer: D.'
  },
  {
    id: 'math-hu-2021-final-mc-07',
    course: 'Applied Mathematics I',
    university: 'Haramaya University',
    year: '2021 Exam',
    category: 'Final Exam',
    question: 'Which type of asymptote will never intersect the graph of a rational function?',
    options: ['Horizontal', 'Oblique', 'Vertical', 'Slant'],
    answer: 2,
    explanation: 'A vertical asymptote occurs where the denominator is zero, making the function undefined there. The graph can NEVER cross a vertical asymptote. Horizontal and oblique/slant asymptotes can be crossed. Answer: C.'
  },
  {
    id: 'math-hu-2021-final-mc-08',
    course: 'Applied Mathematics I',
    university: 'Haramaya University',
    year: '2021 Exam',
    category: 'Final Exam',
    question: 'Let C be a circle of radius 4 centered at (2, 2). Which is true about point P(5, 0)?',
    options: [
      'P is inside the circle C',
      'P is outside of the circle C',
      'P is on the circle C',
      'All of the above'
    ],
    answer: 0,
    explanation: 'Distance from P(5,0) to center (2,2): d = √((5−2)²+(0−2)²) = √(9+4) = √13 ≈ 3.61. Since √13 < 4 (radius), P is INSIDE circle C. Answer: A.'
  },
  {
    id: 'math-hu-2021-final-mc-09',
    course: 'Applied Mathematics I',
    university: 'Haramaya University',
    year: '2021 Exam',
    category: 'Final Exam',
    question: 'Which of the following pairs of lines are perpendicular?',
    options: [
      '3x − 6y + 1 = 0 and x − 2y = 3',
      '2x − y + 1 = 0 and 2x + 4y = 3',
      'y = 3x + 2 and y + 3x = 2',
      'x/3 + y/2 = 1 and 4x + 6y − 12 = 0'
    ],
    answer: 1,
    explanation: 'Check B: 2x−y+1=0 → m₁=2; 2x+4y=3 → m₂=−1/2. Product: 2×(−1/2)=−1 ✓ perpendicular. A: both m=1/2 (parallel). C: m₁=3, m₂=−3, product=−9≠−1. D: both same line. Answer: B.'
  },
  {
    id: 'math-hu-2021-final-mc-10',
    course: 'Applied Mathematics I',
    university: 'Haramaya University',
    year: '2021 Exam',
    category: 'Final Exam',
    question: 'Among the following, which one does NOT represent an equation of a circle?',
    options: [
      'x² + y² + 2x − 2y + 3 = 0',
      'x² + y² − 2x + 4y + 1 = 0',
      'x² + y² − 8x + 12y + 36 = 0',
      'x² + y² − 4x − 6y + 3 = 0'
    ],
    answer: 0,
    explanation: 'For x²+y²+Dx+Ey+F=0, radius² = (D/2)²+(E/2)²−F must be > 0. A: r²=1+1−3=−1<0 → NOT a circle. B: r²=1+4−1=4>0 ✓. C: r²=16+36−36=16>0 ✓. D: r²=4+9−3=10>0 ✓. Answer: A.'
  },

  // ─── PART III: SHORT ANSWER ──────────────────────────────────────────────
  {
    id: 'math-hu-2021-final-sa-01a',
    course: 'Applied Mathematics I',
    university: 'Haramaya University',
    year: '2021 Exam',
    category: 'Final Exam',
    question: 'Given z = 3i / (−1 − i), find the conjugate of z.',
    options: ['−3/2 + (3/2)i', '3/2 − (3/2)i', '3/2 + (3/2)i', '−3/2 − (3/2)i'],
    answer: 0,
    explanation: 'Multiply by conjugate of denominator: z = 3i(−1+i)/[(−1)²+(1)²] = (−3i+3i²)/2 = (−3−3i)/2 = −3/2 − (3/2)i. Conjugate z̄ = −3/2 + (3/2)i.'
  },
  {
    id: 'math-hu-2021-final-sa-01b',
    course: 'Applied Mathematics I',
    university: 'Haramaya University',
    year: '2021 Exam',
    category: 'Final Exam',
    question: 'Given z = 3i / (−1 − i), find the modulus of z.',
    options: ['3√2 / 2', '3/2', '√2', '3'],
    answer: 0,
    explanation: 'z = −3/2 − (3/2)i. |z| = √((3/2)²+(3/2)²) = √(9/2) = 3/√2 = 3√2/2.'
  },
  {
    id: 'math-hu-2021-final-sa-01c',
    course: 'Applied Mathematics I',
    university: 'Haramaya University',
    year: '2021 Exam',
    category: 'Final Exam',
    question: 'Given z = 3i / (−1 − i), find the multiplicative inverse of z.',
    options: ['−1/3 + (1/3)i', '1/3 − (1/3)i', '−1/3 − (1/3)i', '1/3 + (1/3)i'],
    answer: 0,
    explanation: '1/z = z̄/|z|². z̄ = −3/2+(3/2)i, |z|² = 9/2. So 1/z = (−3/2+(3/2)i)/(9/2) = (−3/2+(3/2)i)·(2/9) = −1/3+(1/3)i.'
  },
  {
    id: 'math-hu-2021-final-sa-01d',
    course: 'Applied Mathematics I',
    university: 'Haramaya University',
    year: '2021 Exam',
    category: 'Final Exam',
    question: 'Given z = 3i / (−1 − i), find the principal argument of z.',
    options: ['−3π/4', '3π/4', '−π/4', '5π/4'],
    answer: 0,
    explanation: 'z = −3/2 − (3/2)i is in the third quadrant. Reference angle = arctan(1) = π/4. Principal argument = −π + π/4 = −3π/4 (in range (−π, π]).'
  },
  {
    id: 'math-hu-2021-final-sa-01e',
    course: 'Applied Mathematics I',
    university: 'Haramaya University',
    year: '2021 Exam',
    category: 'Final Exam',
    question: 'Given z = 3i / (−1 − i), find the polar form of z.',
    options: [
      '(3√2/2)(cos(−3π/4) + i sin(−3π/4))',
      '(3√2/2)(cos(3π/4) + i sin(3π/4))',
      '(3/2)(cos(−3π/4) + i sin(−3π/4))',
      '√2(cos(−3π/4) + i sin(−3π/4))'
    ],
    answer: 0,
    explanation: 'Polar form: z = r(cosθ + i sinθ) with r = 3√2/2 and θ = −3π/4. So z = (3√2/2)(cos(−3π/4) + i sin(−3π/4)).'
  },
  {
    id: 'math-hu-2021-final-sa-02',
    course: 'Applied Mathematics I',
    university: 'Haramaya University',
    year: '2021 Exam',
    category: 'Final Exam',
    question: 'If (7x − 2y) + (3x + 2y)i = 4i, find x and y.',
    options: ['x = 2/5, y = 7/5', 'x = 4/3, y = 0', 'x = 0, y = 2', 'x = 1, y = 7/2'],
    answer: 0,
    explanation: 'Equate real and imaginary parts. Real: 7x − 2y = 0 → y = 7x/2. Imaginary: 3x + 2y = 4. Substitute: 3x + 7x = 4 → 10x = 4 → x = 2/5, y = 7/5.'
  },
  {
    id: 'math-hu-2021-final-sa-03a',
    course: 'Applied Mathematics I',
    university: 'Haramaya University',
    year: '2021 Exam',
    category: 'Final Exam',
    question: 'Let A = {1,2,3,4} and R = {(a,b) : a,b ∈ A, a is a multiple of b}. Find the relation R.',
    options: [
      '{(1,1),(2,1),(2,2),(3,1),(3,3),(4,1),(4,2),(4,4)}',
      '{(1,1),(2,2),(3,3),(4,4)}',
      '{(2,1),(3,1),(4,1),(4,2)}',
      '{(1,2),(1,3),(1,4),(2,4)}'
    ],
    answer: 0,
    explanation: 'a is a multiple of b: 1 is multiple of 1→(1,1); 2 is multiple of 1,2→(2,1),(2,2); 3 is multiple of 1,3→(3,1),(3,3); 4 is multiple of 1,2,4→(4,1),(4,2),(4,4). R = {(1,1),(2,1),(2,2),(3,1),(3,3),(4,1),(4,2),(4,4)}.'
  },
  {
    id: 'math-hu-2021-final-sa-03b',
    course: 'Applied Mathematics I',
    university: 'Haramaya University',
    year: '2021 Exam',
    category: 'Final Exam',
    question: 'Let A = {1,2,3,4} and R = {(a,b) : a is a multiple of b}. Find the domain of R.',
    options: ['{1, 2, 3, 4}', '{1, 2}', '{2, 3, 4}', '{1, 2, 3}'],
    answer: 0,
    explanation: 'Domain = set of all first elements = {1, 2, 3, 4}.'
  },
  {
    id: 'math-hu-2021-final-sa-03c',
    course: 'Applied Mathematics I',
    university: 'Haramaya University',
    year: '2021 Exam',
    category: 'Final Exam',
    question: 'Let A = {1,2,3,4} and R = {(a,b) : a is a multiple of b}. Find the range of R.',
    options: ['{1, 2, 3, 4}', '{1, 2, 4}', '{1, 2, 3}', '{1, 4}'],
    answer: 0,
    explanation: 'Range = set of all second elements from R = {1, 2, 3, 4}.'
  },
  {
    id: 'math-hu-2021-final-sa-03d',
    course: 'Applied Mathematics I',
    university: 'Haramaya University',
    year: '2021 Exam',
    category: 'Final Exam',
    question: 'Let A = {1,2,3,4} and R = {(a,b) : a is a multiple of b}. Find R⁻¹.',
    options: [
      '{(1,1),(1,2),(2,2),(1,3),(3,3),(1,4),(2,4),(4,4)}',
      '{(1,1),(2,2),(3,3),(4,4)}',
      '{(1,2),(1,3),(1,4),(2,4)}',
      '{(1,1),(2,1),(2,2),(3,1),(3,3),(4,1),(4,2),(4,4)}'
    ],
    answer: 0,
    explanation: 'R⁻¹ swaps each pair: {(1,1),(2,1),(2,2),(3,1),(3,3),(4,1),(4,2),(4,4)} → {(1,1),(1,2),(2,2),(1,3),(3,3),(1,4),(2,4),(4,4)}.'
  },
  {
    id: 'math-hu-2021-final-sa-04',
    course: 'Applied Mathematics I',
    university: 'Haramaya University',
    year: '2021 Exam',
    category: 'Final Exam',
    question: 'Find the domain of f(x) = √(16 − x²) / x.',
    options: ['[−4, 0) ∪ (0, 4]', '(−4, 4)', '[−4, 4]', '(−∞, −4) ∪ (4, ∞)'],
    answer: 0,
    explanation: 'Need 16−x² ≥ 0 → −4 ≤ x ≤ 4, and x ≠ 0. Domain = [−4, 0) ∪ (0, 4].'
  },
  {
    id: 'math-hu-2021-final-sa-05',
    course: 'Applied Mathematics I',
    university: 'Haramaya University',
    year: '2021 Exam',
    category: 'Final Exam',
    question: 'Find the inverse function of f(x) = (x − 1) / (2x + 3).',
    options: [
      'f⁻¹(x) = (3x + 1) / (1 − 2x)',
      'f⁻¹(x) = (x + 1) / (2x − 3)',
      'f⁻¹(x) = (2x + 1) / (3x − 1)',
      'f⁻¹(x) = (x − 3) / (2x + 1)'
    ],
    answer: 0,
    explanation: 'Let y=(x−1)/(2x+3). Swap: x=(y−1)/(2y+3). Solve: x(2y+3)=y−1 → 2xy−y=−1−3x → y(2x−1)=−(3x+1) → y=(3x+1)/(1−2x). So f⁻¹(x)=(3x+1)/(1−2x).'
  },
  {
    id: 'math-hu-2021-final-sa-06a',
    course: 'Applied Mathematics I',
    university: 'Haramaya University',
    year: '2021 Exam',
    category: 'Final Exam',
    question: 'The equation 2x³ − 5x² + cx − 5 = 0 has root 1 − 2i. Find the other two roots.',
    options: ['1 + 2i and 1/2', '1 + 2i and −1/2', '−1 + 2i and 5', '1 − 2i and 5/2'],
    answer: 0,
    explanation: 'Real coefficients → 1+2i is also a root. Quadratic factor: (x−1)²+4 = x²−2x+5. Dividing: 2x³−5x²+cx−5 ÷ (x²−2x+5) = 2x−1. Third root: x = 1/2. Other roots: 1+2i and 1/2.'
  },
  {
    id: 'math-hu-2021-final-sa-06b',
    course: 'Applied Mathematics I',
    university: 'Haramaya University',
    year: '2021 Exam',
    category: 'Final Exam',
    question: 'The equation 2x³ − 5x² + cx − 5 = 0 has root 1 − 2i. Find the value of c.',
    options: ['12', '−12', '5', '−5'],
    answer: 0,
    explanation: '(x²−2x+5)(2x−1) = 2x³−5x²+12x−5. Matching coefficients gives c = 12.'
  },
  {
    id: 'math-hu-2021-final-sa-07',
    course: 'Applied Mathematics I',
    university: 'Haramaya University',
    year: '2021 Exam',
    category: 'Final Exam',
    question: 'Find the exact value of tanh(2 ln 5).',
    options: ['312/313', '624/626', '25/13', '313/312'],
    answer: 0,
    explanation: 'e^(2ln5)=25, e^(−2ln5)=1/25. tanh(2ln5)=(25−1/25)/(25+1/25)=624/626=312/313.'
  },
  {
    id: 'math-hu-2021-final-sa-08a',
    course: 'Applied Mathematics I',
    university: 'Haramaya University',
    year: '2021 Exam',
    category: 'Final Exam',
    question: 'For the line x + cy = 1 with slope m = 4, find c.',
    options: ['−1/4', '1/4', '4', '−4'],
    answer: 0,
    explanation: 'Slope = −1/c = 4 → c = −1/4.'
  },
  {
    id: 'math-hu-2021-final-sa-08b',
    course: 'Applied Mathematics I',
    university: 'Haramaya University',
    year: '2021 Exam',
    category: 'Final Exam',
    question: 'For the line x + cy = 1 passing through (−2, 1), find c.',
    options: ['3', '−3', '1/3', '−1/3'],
    answer: 0,
    explanation: 'Substitute (−2,1): −2 + c(1) = 1 → c = 3.'
  },
  {
    id: 'math-hu-2021-final-sa-08c',
    course: 'Applied Mathematics I',
    university: 'Haramaya University',
    year: '2021 Exam',
    category: 'Final Exam',
    question: 'For the line x + cy = 1 to be a vertical line, find c.',
    options: ['0', '1', 'undefined', '∞'],
    answer: 0,
    explanation: 'For a vertical line x = k, the y term must vanish: c = 0. The line becomes x = 1 (vertical).'
  },
  {
    id: 'math-hu-2021-final-sa-09',
    course: 'Applied Mathematics I',
    university: 'Haramaya University',
    year: '2021 Exam',
    category: 'Final Exam',
    question: 'Given P(−3, 3) and Q(7, 8), find point R on PQ such that |PR| : |RQ| = 2 : 3.',
    options: ['(1, 5)', '(2, 6)', '(0, 5)', '(1, 6)'],
    answer: 0,
    explanation: 'Section formula (internal, ratio 2:3): R = ((2·7+3·(−3))/5, (2·8+3·3)/5) = ((14−9)/5, (16+9)/5) = (1, 5).'
  },

  // ─── PART IV: WORK OUT ───────────────────────────────────────────────────
  {
    id: 'math-hu-2021-final-wo-01',
    course: 'Applied Mathematics I',
    university: 'Haramaya University',
    year: '2021 Exam',
    category: 'Final Exam',
    question: 'Find the three cube roots of the complex number z = −8i.',
    options: [
      '√3 − i, 2i, −√3 − i',
      '√3 + i, −2i, −√3 + i',
      '2 − 2i, 2i, −2 − 2i',
      '1 − i, 2i, −1 − i'
    ],
    answer: 0,
    explanation: 'z = −8i = 8·cis(−π/2). Cube roots: 2·cis((−π/2+2kπ)/3), k=0,1,2. k=0: 2·cis(−π/6)=√3−i; k=1: 2·cis(π/2)=2i; k=2: 2·cis(7π/6)=−√3−i.'
  },
  {
    id: 'math-hu-2021-final-wo-02a',
    course: 'Applied Mathematics I',
    university: 'Haramaya University',
    year: '2021 Exam',
    category: 'Final Exam',
    question: 'For the rational function f(x) = (x − 2)/(x² − 4), find the domain.',
    options: [
      '(−∞,−2) ∪ (−2,2) ∪ (2,+∞)',
      '(−∞,2) ∪ (2,+∞)',
      '(−2, 2)',
      '(−∞,−2) ∪ (−2,+∞)'
    ],
    answer: 0,
    explanation: 'x²−4=(x−2)(x+2)=0 at x=2 and x=−2. Exclude both. Domain = (−∞,−2)∪(−2,2)∪(2,+∞).'
  },
  {
    id: 'math-hu-2021-final-wo-02b',
    course: 'Applied Mathematics I',
    university: 'Haramaya University',
    year: '2021 Exam',
    category: 'Final Exam',
    question: 'For f(x) = (x − 2)/(x² − 4), find the intercepts.',
    options: [
      'No x-intercept; y-intercept at (0, 1/2)',
      'x-intercept at (2,0); y-intercept at (0, 1/2)',
      'x-intercept at (0,0); no y-intercept',
      'No x-intercept; no y-intercept'
    ],
    answer: 0,
    explanation: 'Simplified: f(x) = 1/(x+2) for x≠2 (hole at x=2). x-intercept: 1/(x+2)=0 → no solution. y-intercept: f(0)=1/2. Result: no x-intercept; y-intercept (0, 1/2).'
  },
  {
    id: 'math-hu-2021-final-wo-02c',
    course: 'Applied Mathematics I',
    university: 'Haramaya University',
    year: '2021 Exam',
    category: 'Final Exam',
    question: 'For f(x) = (x − 2)/(x² − 4), find all asymptotes.',
    options: [
      'Vertical: x = −2; Horizontal: y = 0; Hole at x = 2',
      'Vertical: x = 2 and x = −2; Horizontal: y = 0',
      'Vertical: x = −2; Oblique: y = x',
      'Vertical: x = −2; Horizontal: y = 1'
    ],
    answer: 0,
    explanation: 'Simplified to 1/(x+2). Vertical asymptote: x=−2. At x=2: removable hole at (2, 1/4). Horizontal asymptote: y=0 (degree numerator < denominator). No oblique asymptote.'
  }
];

const existingIds = new Set(data.map(q => q.id));
const dupes = newQuestions.filter(q => existingIds.has(q.id));
if (dupes.length > 0) {
  console.error('DUPLICATE IDs:', dupes.map(q => q.id));
  process.exit(1);
}

const updated = [...data, ...newQuestions];
fs.writeFileSync(EXAMS_PATH, JSON.stringify(updated, null, 2), 'utf8');
console.log(`✅ Added ${newQuestions.length} questions. Total now: ${updated.length}`);
