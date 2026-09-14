// Add Haramaya University Math 1011 Final Exam (2023) – Paper B (Instructor: Mohammed Sani)
// All questions are unique from the existing math-hu-2023-final set
const fs = require('fs');
const path = require('path');

const EXAMS_PATH = path.resolve(__dirname, '../data/exams.json');
const data = JSON.parse(fs.readFileSync(EXAMS_PATH, 'utf8'));

const newQuestions = [
  // ─── PART I: TRUE / FALSE (5 questions) ─────────────────────────────────
  {
    id: 'math-hu-2023-final-b-tf-01',
    course: 'Applied Mathematics I',
    university: 'Haramaya University',
    year: '2023 Exam',
    category: 'Final Exam',
    question: 'True or False: Let f : A → B be a relation, then the domain of f is always equal to A.',
    options: ['True', 'False'],
    answer: 1,
    explanation: 'FALSE. The domain of a relation f : A → B is the set of all first elements of its ordered pairs, which is a subset of A, but not necessarily equal to A. The set A is the source (or input set), and the domain is only those elements of A that are actually mapped to something.'
  },
  {
    id: 'math-hu-2023-final-b-tf-02',
    course: 'Applied Mathematics I',
    university: 'Haramaya University',
    year: '2023 Exam',
    category: 'Final Exam',
    question: 'True or False: A function is one-to-one if and only if no horizontal line intersects its graph more than once.',
    options: ['True', 'False'],
    answer: 0,
    explanation: 'TRUE. This is the horizontal line test: a function f is one-to-one (injective) if and only if every horizontal line y = c intersects the graph of f at most once. If a horizontal line hits the graph at two points, then two different x-values give the same output, violating injectivity.'
  },
  {
    id: 'math-hu-2023-final-b-tf-03',
    course: 'Applied Mathematics I',
    university: 'Haramaya University',
    year: '2023 Exam',
    category: 'Final Exam',
    question: 'True or False: If f(x) = x / (x − 1), then the domain of (f ∘ f)(x) is the set of all real numbers.',
    options: ['True', 'False'],
    answer: 1,
    explanation: 'FALSE. (f ∘ f)(x) = f(f(x)). First f(x) = x/(x−1) requires x ≠ 1. Then f(f(x)) = f(x/(x−1)) = (x/(x−1)) / (x/(x−1) − 1) = (x/(x−1)) / (1/(x−1)) = x. Although the simplified result equals x, we must exclude values where f is undefined: x ≠ 1 (f(x) undefined) and x/(x−1) ≠ 1 (which gives 0 = −1, impossible). So the domain is ℝ \\ {1}, not all real numbers.'
  },
  {
    id: 'math-hu-2023-final-b-tf-04',
    course: 'Applied Mathematics I',
    university: 'Haramaya University',
    year: '2023 Exam',
    category: 'Final Exam',
    question: 'True or False: Two lines with positive slopes are non-perpendicular lines.',
    options: ['True', 'False'],
    answer: 0,
    explanation: 'TRUE. Two lines are perpendicular if and only if the product of their slopes equals −1 (m₁ · m₂ = −1). If both slopes are positive, their product is positive, which can never equal −1. Therefore, two lines with positive slopes cannot be perpendicular.'
  },
  {
    id: 'math-hu-2023-final-b-tf-05',
    course: 'Applied Mathematics I',
    university: 'Haramaya University',
    year: '2023 Exam',
    category: 'Final Exam',
    question: 'True or False: A circle is a set of points in a plane which are equidistant from a fixed point in the plane.',
    options: ['True', 'False'],
    answer: 0,
    explanation: 'TRUE. By definition, a circle is the locus (set) of all points in a plane that are at a fixed distance (the radius r) from a fixed point (the center). This is precisely the standard definition of a circle.'
  },

  // ─── PART II: MULTIPLE CHOICE (10 questions) ────────────────────────────
  {
    id: 'math-hu-2023-final-b-mc-01',
    course: 'Applied Mathematics I',
    university: 'Haramaya University',
    year: '2023 Exam',
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
    explanation: 'All four statements are true. Let z = a + bi and w = c + di. Then: Re(z+w) = a+c = Re(z)+Re(w) ✓; Im(z+w) = b+d = Im(z)+Im(w) ✓; zw = (ac−bd)+(ad+bc)i, so Re(zw) = ac−bd = Re(z)Re(w)−Im(z)Im(w) ✓; Im(zw) = ad+bc = Re(z)Im(w)+Re(w)Im(z) ✓. Answer: E (All).'
  },
  {
    id: 'math-hu-2023-final-b-mc-02',
    course: 'Applied Mathematics I',
    university: 'Haramaya University',
    year: '2023 Exam',
    category: 'Final Exam',
    question: 'The value of |i⁵⁰ + i⁵² + i⁵⁴ + i⁵⁶| is:',
    options: ['1', '-1', '2', '0'],
    answer: 3,
    explanation: 'Powers of i cycle with period 4: i¹=i, i²=−1, i³=−i, i⁴=1. So: i⁵⁰ = i^(4·12+2) = i² = −1; i⁵² = i^(4·13) = 1; i⁵⁴ = i^(4·13+2) = i² = −1; i⁵⁶ = i^(4·14) = 1. Sum = −1 + 1 − 1 + 1 = 0. |0| = 0. Answer: D.'
  },
  {
    id: 'math-hu-2023-final-b-mc-03',
    course: 'Applied Mathematics I',
    university: 'Haramaya University',
    year: '2023 Exam',
    category: 'Final Exam',
    question: 'The range of a relation R = {(x, x²) : x is a prime number less than 13} is:',
    options: [
      '{2, 3, 5, 7}',
      '{2, 3, 5, 7, 11}',
      '{4, 9, 25, 49, 121}',
      '{1, 4, 9, 25, 49, 121}'
    ],
    answer: 2,
    explanation: 'Primes less than 13 are: 2, 3, 5, 7, 11. The relation R pairs each prime x with x², so R = {(2,4),(3,9),(5,25),(7,49),(11,121)}. The range is the set of second elements: {4, 9, 25, 49, 121}. Answer: C.'
  },
  {
    id: 'math-hu-2023-final-b-mc-04',
    course: 'Applied Mathematics I',
    university: 'Haramaya University',
    year: '2023 Exam',
    category: 'Final Exam',
    question: 'If the ordered pairs (a + 2, 4) and (5, 2a + b) are equal, then (a, b) is:',
    options: ['(2, −2)', '(5, 1)', '(3, 10)', '(3, −2)'],
    answer: 3,
    explanation: 'Two ordered pairs are equal iff their corresponding components are equal. So: a + 2 = 5 → a = 3. And 4 = 2a + b → 4 = 2(3) + b → 4 = 6 + b → b = −2. Therefore (a, b) = (3, −2). Answer: D.'
  },
  {
    id: 'math-hu-2023-final-b-mc-05',
    course: 'Applied Mathematics I',
    university: 'Haramaya University',
    year: '2023 Exam',
    category: 'Final Exam',
    question: 'Let f = {(0,1),(2,0),(3,4),(4,2),(5,7)} and g = {(0,2),(1,0),(2,4),(−4,2),(7,0)}. Then the range of f ∘ g is:',
    options: ['{0, 1, 2}', '{−4, 1, 0, 2, 7}', '{1, 2, 3, 4, 5}', '{0, 2, 3, 4, 5}'],
    answer: 0,
    explanation: 'f ∘ g means apply g first, then f. Computing: g(0)=2 → f(2)=0; g(1)=0 → f(0)=1; g(2)=4 → f(4)=2; g(−4)=2 → f(2)=0; g(7)=0 → f(0)=1. So f∘g = {(0,0),(1,1),(2,2),(−4,0),(7,1)}. Range = {0, 1, 2}. Answer: A.'
  },
  {
    id: 'math-hu-2023-final-b-mc-06',
    course: 'Applied Mathematics I',
    university: 'Haramaya University',
    year: '2023 Exam',
    category: 'Final Exam',
    question: 'Suppose that when the polynomial p(x) is divided by x − 5, the quotient is 3x⁴ − 5x² + 2x − 5 with a remainder of 4. Then we conclude that:',
    options: [
      'x − 4 is a factor of p(x) and 4 is a zero of p(x)',
      'x + 5 is not a factor of p(x) and −5 is not a zero of p(x)',
      'x − 5 is a factor of p(x) and −5 is a zero of p(x)',
      'x − 5 is not a factor of p(x) and 5 is not a zero of p(x)'
    ],
    answer: 3,
    explanation: 'By the division algorithm: p(x) = (x−5)(3x⁴−5x²+2x−5) + 4. Since the remainder is 4 ≠ 0, by the Factor Theorem, x−5 is NOT a factor of p(x). Also p(5) = 4 ≠ 0, so 5 is NOT a zero of p(x). Answer: D.'
  },
  {
    id: 'math-hu-2023-final-b-mc-07',
    course: 'Applied Mathematics I',
    university: 'Haramaya University',
    year: '2023 Exam',
    category: 'Final Exam',
    question: 'Which type of asymptote will never intersect the graph of a rational function?',
    options: ['Horizontal', 'Oblique', 'Vertical', 'Slant'],
    answer: 2,
    explanation: 'A vertical asymptote of a rational function occurs where the denominator is zero (and numerator is nonzero), making the function undefined at that x-value. Therefore the graph can NEVER cross or touch a vertical asymptote. Horizontal and oblique/slant asymptotes, on the other hand, CAN be crossed by the graph. Answer: C. Vertical.'
  },
  {
    id: 'math-hu-2023-final-b-mc-08',
    course: 'Applied Mathematics I',
    university: 'Haramaya University',
    year: '2023 Exam',
    category: 'Final Exam',
    question: 'Let C be a circle of radius 4 centered at (2, 2). Which one of the following is true about the point P(5, 0)?',
    options: [
      'P is inside the circle C',
      'P is outside of the circle C',
      'P is on the circle C',
      'All of the above'
    ],
    answer: 0,
    explanation: 'Compute the distance from P(5,0) to center (2,2): d = √((5−2)² + (0−2)²) = √(9 + 4) = √13 ≈ 3.61. Since √13 < 4 (the radius), point P lies INSIDE circle C. Answer: A.'
  },
  {
    id: 'math-hu-2023-final-b-mc-09',
    course: 'Applied Mathematics I',
    university: 'Haramaya University',
    year: '2023 Exam',
    category: 'Final Exam',
    question: 'Which of the following pairs of lines are perpendicular?',
    options: [
      '3x − 6y + 1 = 0 and x − 2y = 3',
      '2x − y + 1 = 0 and 2x + 4y = 3',
      'y = 3x + 2 and y + 3x = 2',
      'x/3 + y/2 = 1 and 4x + 6y − 12 = 0'
    ],
    answer: 1,
    explanation: 'Lines are perpendicular iff m₁·m₂ = −1. Check option B: 2x−y+1=0 → y=2x+1, so m₁=2. 2x+4y=3 → y=−x/2+3/4, so m₂=−1/2. Product: 2·(−1/2)=−1 ✓. Check others: A: both have m=1/2 (parallel). C: m₁=3, m₂=−3, product=−9≠−1. D: both simplify to y=−(2/3)x+2 (same line). Answer: B.'
  },
  {
    id: 'math-hu-2023-final-b-mc-10',
    course: 'Applied Mathematics I',
    university: 'Haramaya University',
    year: '2023 Exam',
    category: 'Final Exam',
    question: 'Among the following, which one does NOT represent an equation of a circle?',
    options: [
      'x² + y² + 2x − 2y + 3 = 0',
      'x² + y² − 2x + 4y + 1 = 0',
      'x² + y² − 8x + 12y + 36 = 0',
      'x² + y² − 4x − 6y + 3 = 0'
    ],
    answer: 0,
    explanation: 'For x²+y²+Dx+Ey+F=0 to be a circle, the radius² = (D/2)²+(E/2)²−F must be positive. Check A: r²=(1)²+(−1)²−3=1+1−3=−1<0. A negative radius² means no real circle exists. B: r²=1+4−1=4>0 ✓. C: r²=16+36−36=16>0 ✓. D: r²=4+9−3=10>0 ✓. Answer: A.'
  },

  // ─── PART III: SHORT ANSWER ──────────────────────────────────────────────
  {
    id: 'math-hu-2023-final-b-sa-01a',
    course: 'Applied Mathematics I',
    university: 'Haramaya University',
    year: '2023 Exam',
    category: 'Final Exam',
    question: 'Given z = 3i / (−1 − i), find the conjugate of z.',
    options: [
      '−3/2 + (3/2)i',
      '3/2 − (3/2)i',
      '3/2 + (3/2)i',
      '−3/2 − (3/2)i'
    ],
    answer: 0,
    explanation: 'Multiply numerator and denominator by the conjugate of (−1−i), which is (−1+i): z = 3i(−1+i) / [(−1−i)(−1+i)] = (−3i+3i²) / (1+1) = (−3i−3)/2 = −3/2 − (3/2)i. The conjugate z̄ = −3/2 + (3/2)i.'
  },
  {
    id: 'math-hu-2023-final-b-sa-01b',
    course: 'Applied Mathematics I',
    university: 'Haramaya University',
    year: '2023 Exam',
    category: 'Final Exam',
    question: 'Given z = 3i / (−1 − i), find the modulus of z.',
    options: ['3√2 / 2', '3/2', '√2', '3'],
    answer: 0,
    explanation: 'From z = −3/2 − (3/2)i, the modulus is |z| = √((−3/2)² + (−3/2)²) = √(9/4 + 9/4) = √(9/2) = 3/√2 = 3√2/2.'
  },
  {
    id: 'math-hu-2023-final-b-sa-01c',
    course: 'Applied Mathematics I',
    university: 'Haramaya University',
    year: '2023 Exam',
    category: 'Final Exam',
    question: 'Given z = 3i / (−1 − i), find the multiplicative inverse of z.',
    options: [
      '−1/3 + (1/3)i',
      '1/3 − (1/3)i',
      '−1/3 − (1/3)i',
      '1/3 + (1/3)i'
    ],
    answer: 0,
    explanation: 'z = −3/2 − (3/2)i, so z̄ = −3/2 + (3/2)i and |z|² = 9/2. The multiplicative inverse is 1/z = z̄/|z|² = (−3/2 + (3/2)i)/(9/2) = (−3/2 + (3/2)i)·(2/9) = −1/3 + (1/3)i.'
  },
  {
    id: 'math-hu-2023-final-b-sa-01d',
    course: 'Applied Mathematics I',
    university: 'Haramaya University',
    year: '2023 Exam',
    category: 'Final Exam',
    question: 'Given z = 3i / (−1 − i), find the principal argument of z.',
    options: ['−3π/4', '3π/4', '−π/4', '5π/4'],
    answer: 0,
    explanation: 'z = −3/2 − (3/2)i lies in the third quadrant (both Re and Im are negative). The reference angle is arctan(|Im|/|Re|) = arctan(1) = π/4. For the third quadrant, the principal argument is −π + π/4 = −3π/4 (keeping it in (−π, π]).'
  },
  {
    id: 'math-hu-2023-final-b-sa-01e',
    course: 'Applied Mathematics I',
    university: 'Haramaya University',
    year: '2023 Exam',
    category: 'Final Exam',
    question: 'Given z = 3i / (−1 − i), find the polar form of z.',
    options: [
      '(3√2/2)(cos(−3π/4) + i sin(−3π/4))',
      '(3√2/2)(cos(3π/4) + i sin(3π/4))',
      '(3/2)(cos(−3π/4) + i sin(−3π/4))',
      '√2 (cos(−3π/4) + i sin(−3π/4))'
    ],
    answer: 0,
    explanation: 'The polar form is z = r(cosθ + i sinθ) where r = |z| = 3√2/2 and θ = Arg(z) = −3π/4. So z = (3√2/2)(cos(−3π/4) + i sin(−3π/4)).'
  },
  {
    id: 'math-hu-2023-final-b-sa-02',
    course: 'Applied Mathematics I',
    university: 'Haramaya University',
    year: '2023 Exam',
    category: 'Final Exam',
    question: 'If (7x − 2y) + (3x + 2y)i = 4i, find x and y.',
    options: ['x = 2/5, y = 7/5', 'x = 4/3, y = 0', 'x = 0, y = 4/3', 'x = 1, y = 7/2'],
    answer: 0,
    explanation: 'Equate real and imaginary parts: Real: 7x − 2y = 0 → y = 7x/2. Imaginary: 3x + 2y = 4. Substituting: 3x + 2(7x/2) = 4 → 3x + 7x = 4 → 10x = 4 → x = 2/5. Then y = 7(2/5)/2 = 7/5. So x = 2/5, y = 7/5.'
  },
  {
    id: 'math-hu-2023-final-b-sa-03a',
    course: 'Applied Mathematics I',
    university: 'Haramaya University',
    year: '2023 Exam',
    category: 'Final Exam',
    question: 'Let A = {1,2,3,4} and R be a relation on A defined by R = {(a,b) : a,b ∈ A, a is a multiple of b}. Find the relation R.',
    options: [
      '{(1,1),(2,1),(2,2),(3,1),(3,3),(4,1),(4,2),(4,4)}',
      '{(1,1),(2,2),(3,3),(4,4)}',
      '{(2,1),(3,1),(4,1),(4,2)}',
      '{(1,2),(1,3),(1,4),(2,4)}'
    ],
    answer: 0,
    explanation: 'a is a multiple of b means a = kb for some positive integer k. Checking all pairs: 1 is a multiple of 1 → (1,1); 2 is a multiple of 1 and 2 → (2,1),(2,2); 3 is a multiple of 1 and 3 → (3,1),(3,3); 4 is a multiple of 1, 2, and 4 → (4,1),(4,2),(4,4). So R = {(1,1),(2,1),(2,2),(3,1),(3,3),(4,1),(4,2),(4,4)}.'
  },
  {
    id: 'math-hu-2023-final-b-sa-03b',
    course: 'Applied Mathematics I',
    university: 'Haramaya University',
    year: '2023 Exam',
    category: 'Final Exam',
    question: 'Let A = {1,2,3,4} and R = {(a,b) : a,b ∈ A, a is a multiple of b}. Find the domain of R.',
    options: ['{1, 2, 3, 4}', '{1, 2}', '{1, 2, 3}', '{2, 3, 4}'],
    answer: 0,
    explanation: 'The domain of R is the set of all first elements: from {(1,1),(2,1),(2,2),(3,1),(3,3),(4,1),(4,2),(4,4)}, the first elements are {1,2,3,4}. Domain = {1,2,3,4} = A.'
  },
  {
    id: 'math-hu-2023-final-b-sa-03c',
    course: 'Applied Mathematics I',
    university: 'Haramaya University',
    year: '2023 Exam',
    category: 'Final Exam',
    question: 'Let A = {1,2,3,4} and R = {(a,b) : a,b ∈ A, a is a multiple of b}. Find the range of R.',
    options: ['{1, 2, 3, 4}', '{1, 2, 4}', '{1, 2, 3}', '{1, 2}'],
    answer: 0,
    explanation: 'The range of R is the set of all second elements: from {(1,1),(2,1),(2,2),(3,1),(3,3),(4,1),(4,2),(4,4)}, the second elements are {1,2,3,4}. Range = {1,2,3,4}.'
  },
  {
    id: 'math-hu-2023-final-b-sa-03d',
    course: 'Applied Mathematics I',
    university: 'Haramaya University',
    year: '2023 Exam',
    category: 'Final Exam',
    question: 'Let A = {1,2,3,4} and R = {(a,b) : a,b ∈ A, a is a multiple of b}. Find R⁻¹.',
    options: [
      '{(1,1),(1,2),(2,2),(1,3),(3,3),(1,4),(2,4),(4,4)}',
      '{(1,1),(2,2),(3,3),(4,4)}',
      '{(1,2),(1,3),(1,4),(2,4)}',
      '{(1,1),(2,1),(2,2),(3,1),(3,3),(4,1),(4,2),(4,4)}'
    ],
    answer: 0,
    explanation: 'R⁻¹ is obtained by swapping each pair in R: {(1,1),(2,1),(2,2),(3,1),(3,3),(4,1),(4,2),(4,4)} → swapping gives {(1,1),(1,2),(2,2),(1,3),(3,3),(1,4),(2,4),(4,4)}.'
  },
  {
    id: 'math-hu-2023-final-b-sa-04',
    course: 'Applied Mathematics I',
    university: 'Haramaya University',
    year: '2023 Exam',
    category: 'Final Exam',
    question: 'Find the domain of f(x) = √(16 − x²) / x.',
    options: ['[−4, 0) ∪ (0, 4]', '(−4, 4)', '[−4, 4]', '(−∞, −4) ∪ (4, ∞)'],
    answer: 0,
    explanation: 'Two conditions: (1) 16 − x² ≥ 0 → x² ≤ 16 → −4 ≤ x ≤ 4. (2) x ≠ 0 (denominator). Combining: x ∈ [−4, 4] and x ≠ 0. Domain = [−4, 0) ∪ (0, 4].'
  },
  {
    id: 'math-hu-2023-final-b-sa-05',
    course: 'Applied Mathematics I',
    university: 'Haramaya University',
    year: '2023 Exam',
    category: 'Final Exam',
    question: 'Find the inverse function of f(x) = (x − 1) / (2x + 3).',
    options: [
      'f⁻¹(x) = (3x + 1) / (1 − 2x)',
      'f⁻¹(x) = (x + 1) / (2x − 3)',
      'f⁻¹(x) = (2x + 1) / (3x − 1)',
      'f⁻¹(x) = (x − 3) / (2x + 1)'
    ],
    answer: 0,
    explanation: 'Let y = (x−1)/(2x+3). Swap x and y: x = (y−1)/(2y+3). Solve for y: x(2y+3) = y−1 → 2xy+3x = y−1 → 2xy−y = −1−3x → y(2x−1) = −(1+3x) → y = −(3x+1)/(2x−1) = (3x+1)/(1−2x). So f⁻¹(x) = (3x+1)/(1−2x), domain: x ≠ 1/2.'
  },
  {
    id: 'math-hu-2023-final-b-sa-06a',
    course: 'Applied Mathematics I',
    university: 'Haramaya University',
    year: '2023 Exam',
    category: 'Final Exam',
    question: 'The polynomial equation 2x³ − 5x² + cx − 5 = 0 (c ∈ ℝ) has a root 1 − 2i. Find the other two roots.',
    options: [
      '1 + 2i and 1/2',
      '1 + 2i and −1/2',
      '−1 + 2i and 5',
      '1 − 2i and 5/2'
    ],
    answer: 0,
    explanation: 'Since coefficients are real, complex roots come in conjugate pairs. So 1+2i is also a root. The quadratic factor is (x−(1−2i))(x−(1+2i)) = (x−1)²+4 = x²−2x+5. Dividing: 2x³−5x²+cx−5 ÷ (x²−2x+5) gives quotient 2x−1 (with c=12). So the third root is from 2x−1=0, i.e., x=1/2. The three roots are: 1−2i, 1+2i, and 1/2.'
  },
  {
    id: 'math-hu-2023-final-b-sa-06b',
    course: 'Applied Mathematics I',
    university: 'Haramaya University',
    year: '2023 Exam',
    category: 'Final Exam',
    question: 'The polynomial equation 2x³ − 5x² + cx − 5 = 0 has root 1 − 2i. Find the value of c.',
    options: ['12', '−12', '5', '−5'],
    answer: 0,
    explanation: 'Since 1−2i is a root and coefficients are real, so is 1+2i. Quadratic factor: x²−2x+5. Divide 2x³−5x²+cx−5 by x²−2x+5: the quotient must be 2x−1 (to give third root 1/2). Expanding: (x²−2x+5)(2x−1) = 2x³−x²−4x²+2x+10x−5 = 2x³−5x²+12x−5. Matching coefficients: c = 12.'
  },
  {
    id: 'math-hu-2023-final-b-sa-07',
    course: 'Applied Mathematics I',
    university: 'Haramaya University',
    year: '2023 Exam',
    category: 'Final Exam',
    question: 'Find the exact value of tanh(2 ln 5).',
    options: ['312/313', '624/626', '25/13', '313/312'],
    answer: 0,
    explanation: 'tanh(t) = (eᵗ − e⁻ᵗ)/(eᵗ + e⁻ᵗ). With t = 2ln5: e^(2ln5) = (e^(ln5))² = 25 and e^(−2ln5) = 1/25. So tanh(2ln5) = (25 − 1/25)/(25 + 1/25) = [(625−1)/25]/[(625+1)/25] = 624/626 = 312/313.'
  },
  {
    id: 'math-hu-2023-final-b-sa-08a',
    course: 'Applied Mathematics I',
    university: 'Haramaya University',
    year: '2023 Exam',
    category: 'Final Exam',
    question: 'The line x + cy = 1 has slope m = 4. Find the value of c.',
    options: ['−1/4', '1/4', '4', '−4'],
    answer: 0,
    explanation: 'Rewriting x + cy = 1 as y = (1−x)/c = 1/c − (1/c)x, the slope is −1/c. Setting −1/c = 4 gives c = −1/4.'
  },
  {
    id: 'math-hu-2023-final-b-sa-08b',
    course: 'Applied Mathematics I',
    university: 'Haramaya University',
    year: '2023 Exam',
    category: 'Final Exam',
    question: 'The line x + cy = 1 passes through (−2, 1). Find the value of c.',
    options: ['3', '−3', '1/3', '−1/3'],
    answer: 0,
    explanation: 'Substituting (−2, 1) into x + cy = 1: −2 + c(1) = 1 → c = 3.'
  },
  {
    id: 'math-hu-2023-final-b-sa-08c',
    course: 'Applied Mathematics I',
    university: 'Haramaya University',
    year: '2023 Exam',
    category: 'Final Exam',
    question: 'For the line x + cy = 1 to be a vertical line, find the value of c.',
    options: ['0', '1', 'undefined', '∞'],
    answer: 0,
    explanation: 'A vertical line has the form x = k (no y-term). For x + cy = 1 to be vertical, the coefficient of y must be zero: c = 0. The line becomes x = 1, which is vertical.'
  },
  {
    id: 'math-hu-2023-final-b-sa-09',
    course: 'Applied Mathematics I',
    university: 'Haramaya University',
    year: '2023 Exam',
    category: 'Final Exam',
    question: 'Given P(−3, 3) and Q(7, 8), find the coordinate of point R on segment PQ such that |PR| : |RQ| = 2 : 3.',
    options: ['(1, 5)', '(2, 6)', '(0, 5)', '(1, 6)'],
    answer: 0,
    explanation: 'Using the section formula for internal division in ratio m:n = 2:3: R = ((m·x₂ + n·x₁)/(m+n), (m·y₂ + n·y₁)/(m+n)) = ((2·7 + 3·(−3))/5, (2·8 + 3·3)/5) = ((14−9)/5, (16+9)/5) = (5/5, 25/5) = (1, 5).'
  },

  // ─── PART IV: WORK OUT ───────────────────────────────────────────────────
  {
    id: 'math-hu-2023-final-b-wo-01',
    course: 'Applied Mathematics I',
    university: 'Haramaya University',
    year: '2023 Exam',
    category: 'Final Exam',
    question: 'Find the three cube roots of the complex number z = −8i.',
    options: [
      '√3 − i, 2i, −√3 − i',
      '√3 + i, −2i, −√3 + i',
      '2 − 2i, 2i, −2 − 2i',
      '1 − i, 2i, −1 − i'
    ],
    answer: 0,
    explanation: 'Write z = −8i in polar form: |z|=8, Arg(z)=−π/2. So z = 8·cis(−π/2). The cube roots are: ∛8·cis((−π/2 + 2kπ)/3) for k=0,1,2. ∛8=2. k=0: 2·cis(−π/6) = 2(cos30°−i·sin30°) = 2(√3/2 − i/2) = √3 − i. k=1: 2·cis(−π/6+2π/3) = 2·cis(π/2) = 2i. k=2: 2·cis(−π/6+4π/3) = 2·cis(7π/6) = 2(−√3/2−i/2) = −√3 − i.'
  },
  {
    id: 'math-hu-2023-final-b-wo-02a',
    course: 'Applied Mathematics I',
    university: 'Haramaya University',
    year: '2023 Exam',
    category: 'Final Exam',
    question: 'For f(x) = (x − 2)/(x² − 4), find the domain of f.',
    options: [
      '(−∞, −2) ∪ (−2, 2) ∪ (2, +∞)',
      '(−∞, 2) ∪ (2, +∞)',
      '(−2, 2)',
      '(−∞, −2) ∪ (−2, +∞)'
    ],
    answer: 0,
    explanation: 'x²−4 = (x−2)(x+2) = 0 gives x = 2 or x = −2. Both must be excluded from the domain. Domain = ℝ \\ {−2, 2} = (−∞,−2) ∪ (−2,2) ∪ (2,+∞).'
  },
  {
    id: 'math-hu-2023-final-b-wo-02b',
    course: 'Applied Mathematics I',
    university: 'Haramaya University',
    year: '2023 Exam',
    category: 'Final Exam',
    question: 'For f(x) = (x − 2)/(x² − 4), find the intercepts.',
    options: [
      'No x-intercept; y-intercept at (0, 1/2)',
      'x-intercept at (2, 0); y-intercept at (0, 1/2)',
      'x-intercept at (0, 0); no y-intercept',
      'No x-intercept; no y-intercept'
    ],
    answer: 0,
    explanation: 'Simplify: f(x) = (x−2)/[(x−2)(x+2)] = 1/(x+2) for x ≠ 2 (hole at x=2). x-intercept: set f(x)=0 → 1/(x+2)=0, which has no solution. So there is NO x-intercept (there is a removable discontinuity/hole at (2, 1/4)). y-intercept: x=0 → f(0)=1/(0+2)=1/2. y-intercept at (0, 1/2).'
  },
  {
    id: 'math-hu-2023-final-b-wo-02c',
    course: 'Applied Mathematics I',
    university: 'Haramaya University',
    year: '2023 Exam',
    category: 'Final Exam',
    question: 'For f(x) = (x − 2)/(x² − 4), find all asymptotes.',
    options: [
      'Vertical: x = −2; Horizontal: y = 0; Hole at x = 2',
      'Vertical: x = 2 and x = −2; Horizontal: y = 0',
      'Vertical: x = −2; Oblique: y = x',
      'Vertical: x = −2; Horizontal: y = 1'
    ],
    answer: 0,
    explanation: 'Simplified form: f(x) = 1/(x+2), x ≠ 2. Vertical asymptote: x = −2 (denominator = 0 and not cancelled). At x = 2: both numerator and denominator are 0 → removable discontinuity (hole at (2, 1/4)), NOT a vertical asymptote. Horizontal asymptote: degree of numerator (0 in 1/(x+2)) < degree of denominator (1) → y = 0. No oblique asymptote.'
  }
];

// Check for duplicate IDs
const existingIds = new Set(data.map(q => q.id));
const dupes = newQuestions.filter(q => existingIds.has(q.id));
if (dupes.length > 0) {
  console.error('DUPLICATE IDs found:', dupes.map(q => q.id));
  process.exit(1);
}

const updated = [...data, ...newQuestions];
fs.writeFileSync(EXAMS_PATH, JSON.stringify(updated, null, 2), 'utf8');
console.log(`✅ Added ${newQuestions.length} questions. Total now: ${updated.length}`);
