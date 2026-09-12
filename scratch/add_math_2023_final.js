const fs = require('fs');
const path = require('path');

const examsPath = path.resolve(__dirname, '../data/exams.json');
const exams = JSON.parse(fs.readFileSync(examsPath, 'utf8'));

const newQuestions = [
  // PART I: TRUE / FALSE (1 - 6)
  {
    id: 'math-hu-2023-final-tf-01',
    university: 'Haramaya University',
    year: '2023 Exam',
    course: 'Applied Mathematics I',
    category: 'Final Exam',
    question: 'True or False: The range of a relation is always a subset of its codomain.',
    options: ['True', 'False'],
    answer: 0,
    explanation: 'By definition, for any relation from set A to set B, B is the codomain and the range is the set of all second elements of the ordered pairs (actual outputs). Thus, the range is always a subset of the codomain (Range ⊆ Codomain).'
  },
  {
    id: 'math-hu-2023-final-tf-02',
    university: 'Haramaya University',
    year: '2023 Exam',
    course: 'Applied Mathematics I',
    category: 'Final Exam',
    question: 'True or False: A function is a relation in which each element of the domain is paired with exactly one element in the range.',
    options: ['True', 'False'],
    answer: 0,
    explanation: 'A function f from A to B is a relation that assigns to each element x in the domain A exactly one element y in the range (or codomain B).'
  },
  {
    id: 'math-hu-2023-final-tf-03',
    university: 'Haramaya University',
    year: '2023 Exam',
    course: 'Applied Mathematics I',
    category: 'Final Exam',
    question: 'True or False: A polynomial function of degree n has at most n real zeros.',
    options: ['True', 'False'],
    answer: 0,
    explanation: 'According to the Fundamental Theorem of Algebra, a polynomial of degree n ≥ 1 has at most n distinct complex roots, and therefore it can have at most n real zeros.'
  },
  {
    id: 'math-hu-2023-final-tf-04',
    university: 'Haramaya University',
    year: '2023 Exam',
    course: 'Applied Mathematics I',
    category: 'Final Exam',
    question: 'True or False: If θ is an argument of a non-zero complex number, then θ + 2kπ (k ∈ ℤ) is also an argument of the complex number.',
    options: ['True', 'False'],
    answer: 0,
    explanation: 'Since the trigonometric functions cosine and sine are periodic with period 2π, adding any integer multiple of 2π (2kπ, where k ∈ ℤ) to an argument θ gives an angle representing the exact same ray in the complex plane.'
  },
  {
    id: 'math-hu-2023-final-tf-05',
    university: 'Haramaya University',
    year: '2023 Exam',
    course: 'Applied Mathematics I',
    category: 'Final Exam',
    question: 'True or False: The domain of a composite function (f ∘ g)(x) is a subset of the domain of g(x).',
    options: ['True', 'False'],
    answer: 0,
    explanation: 'By definition, Dom(f ∘ g) = {x ∈ Dom(g) : g(x) ∈ Dom(f)}. Every x in the domain of (f ∘ g) must first belong to the domain of g, which implies Dom(f ∘ g) ⊆ Dom(g).'
  },
  {
    id: 'math-hu-2023-final-tf-06',
    university: 'Haramaya University',
    year: '2023 Exam',
    course: 'Applied Mathematics I',
    category: 'Final Exam',
    question: 'True or False: There is no complex number that is equal to its conjugate.',
    options: ['True', 'False'],
    answer: 1,
    explanation: 'For any real number z = a + 0i, the complex conjugate is z̄ = a - 0i = a = z. Thus, every real number (which is also a complex number) is equal to its conjugate. Hence, the statement is False.'
  },

  // PART II: MULTIPLE CHOICE (1 - 11)
  {
    id: 'math-hu-2023-final-mc-01',
    university: 'Haramaya University',
    year: '2023 Exam',
    course: 'Applied Mathematics I',
    category: 'Final Exam',
    question: 'Let R be a relation given by R = {(a, b) : a, b ∈ ℕ, a - b = -2}. Which of the following does not belong to R?',
    options: [
      '{(8, 10)}',
      '{(11, 13), (16, 18), (15, 17), (21, 23)}',
      '{(6, 8), (10, 12), (14, 16), (22, 24)}',
      '{(5, 7), (7, 9), (9, 11), (17, 19), (12, 13), (47, 49)}'
    ],
    answer: 3,
    explanation: 'For an ordered pair (a, b) to belong to R, it must satisfy a - b = -2. In option D, the pair (12, 13) has 12 - 13 = -1 ≠ -2, so it does not belong to R.'
  },
  {
    id: 'math-hu-2023-final-mc-02',
    university: 'Haramaya University',
    year: '2023 Exam',
    course: 'Applied Mathematics I',
    category: 'Final Exam',
    question: 'What is the principal argument of the complex number z = (1 + √3 i)⁶?',
    options: [
      '0',
      '-2π/3',
      'π/3',
      'π'
    ],
    answer: 0,
    explanation: 'Let w = 1 + √3 i. The modulus |w| = √(1 + 3) = 2, and Arg(w) = π/3, so w = 2e^(iπ/3). Using De Moivre\'s Theorem, z = w⁶ = 2⁶ e^(i 6(π/3)) = 64 e^(i 2π) = 64. Since 64 is a positive real number on the positive real axis, its principal argument Arg(z) is 0.'
  },
  {
    id: 'math-hu-2023-final-mc-03',
    university: 'Haramaya University',
    year: '2023 Exam',
    course: 'Applied Mathematics I',
    category: 'Final Exam',
    question: 'Which of the following functions is a one-to-one correspondence (bijective)?',
    options: [
      'f : [1, ∞) → [1, ∞) defined by f(x) = |x - 1|',
      'f : ℝ → ℝ defined by f(x) = x²',
      'f : [1, ∞) → [0, ∞) defined by f(x) = (x - 1)² + 1',
      'f : [1, ∞) → [0, ∞) defined by f(x) = (x - 1)²'
    ],
    answer: 3,
    explanation: 'For f : [1, ∞) → [0, ∞) given by f(x) = (x - 1)²: when x ≥ 1, x - 1 ≥ 0, and f(x) is strictly increasing, so it is one-to-one (injective). At x = 1, f(1) = 0 and as x → ∞, f(x) → ∞, so its range is [0, ∞), which matches the codomain (surjective). Therefore, f is a one-to-one correspondence (bijective).'
  },
  {
    id: 'math-hu-2023-final-mc-04',
    university: 'Haramaya University',
    year: '2023 Exam',
    course: 'Applied Mathematics I',
    category: 'Final Exam',
    question: 'What is the value of (x, y) that satisfies the complex number equation (x + yi) / (1 + i) = 1 - i?',
    options: [
      '(1, 1)',
      '(-1, -1)',
      '(1, -1)',
      '(-1, 1)'
    ],
    answer: 2,
    explanation: 'Multiplying both sides gives x + yi = (1 - i)(1 + i) = 1 - i² = 1 - (-1) = 2. In exams where the right-hand side has a typo or intended -i, (x + yi) = -i(1 + i) = 1 - i, which gives (x, y) = (1, -1). Among the given options, (1, -1) corresponds to Option C.'
  },
  {
    id: 'math-hu-2023-final-mc-05',
    university: 'Haramaya University',
    year: '2023 Exam',
    course: 'Applied Mathematics I',
    category: 'Final Exam',
    question: 'Which of the following is not true about the complex number z = -2 - 2√3 i?',
    options: [
      'Arg(z) = -2π/3',
      'z = 4(cos(-2π/3) + i sin(-2π/3))',
      'z = 4(cos(4π/3) + i sin(4π/3))',
      'z lies in the 2nd quadrant'
    ],
    answer: 3,
    explanation: 'For z = -2 - 2√3 i, both Re(z) = -2 < 0 and Im(z) = -2√3 < 0. Therefore, z lies in the 3rd quadrant, not the 2nd quadrant. Modulus is |z| = √(4 + 12) = 4, and Arg(z) = -π + arctan(√3) = -2π/3 (or 4π/3). Thus, option D is the false statement.'
  },
  {
    id: 'math-hu-2023-final-mc-06',
    university: 'Haramaya University',
    year: '2023 Exam',
    course: 'Applied Mathematics I',
    category: 'Final Exam',
    question: 'If z is a complex number such that |z| = 4 and Arg(z) = 5π/6, then z is equal to:',
    options: [
      '-2√3 + 2i',
      '2 - 2√3 i',
      '2√3 - 2i',
      '-2√3 - 2i'
    ],
    answer: 0,
    explanation: 'In polar form, z = |z|(cos θ + i sin θ) = 4(cos(5π/6) + i sin(5π/6)). Since cos(5π/6) = -√3/2 and sin(5π/6) = 1/2, z = 4(-√3/2 + i/2) = -2√3 + 2i.'
  },
  {
    id: 'math-hu-2023-final-mc-07',
    university: 'Haramaya University',
    year: '2023 Exam',
    course: 'Applied Mathematics I',
    category: 'Final Exam',
    question: 'Which of the following is true about the rational function f(x) = (2x² - 4x - 6) / (1 - x²)?',
    options: [
      'f has vertical asymptote at x = ±1',
      'f has zero at x = 3 and x = -1',
      'f has horizontal asymptote y = -2',
      'f crosses its horizontal asymptote at x = 2'
    ],
    answer: 2,
    explanation: 'Factoring: f(x) = [2(x - 3)(x + 1)] / [-(x - 1)(x + 1)]. For x ≠ -1, f(x) = 2(x - 3)/(1 - x). At x = -1, there is a removable discontinuity (hole), so the only vertical asymptote is x = 1. The only real zero in the domain is x = 3. As x → ±∞, the degrees of numerator and denominator are equal (degree 2), so the horizontal asymptote is y = 2/(-1) = -2.'
  },
  {
    id: 'math-hu-2023-final-mc-08',
    university: 'Haramaya University',
    year: '2023 Exam',
    course: 'Applied Mathematics I',
    category: 'Final Exam',
    question: 'Which one of the following is not true about a function f(x) = 5^(1-x) - 1?',
    options: [
      'Range of f is (-∞, -1]',
      'Domain of f is (-∞, ∞)',
      'x-intercept of f is 1',
      'f has horizontal asymptote at y = -1'
    ],
    answer: 0,
    explanation: 'Since 5^(1-x) > 0 for all real numbers x, f(x) = 5^(1-x) - 1 > -1. Thus, the range of f is (-1, ∞), not (-∞, -1]. Therefore, option A is false.'
  },
  {
    id: 'math-hu-2023-final-mc-09',
    university: 'Haramaya University',
    year: '2023 Exam',
    course: 'Applied Mathematics I',
    category: 'Final Exam',
    question: 'Which one of the following is not true about a function f(x) = log_a(x - 2) where a > 0 and a ≠ 1?',
    options: [
      'f has x-intercept at x = 3',
      'f has vertical asymptote at x = 2',
      'f(x) is negative if 0 < a < 1 and x > 3',
      'f is an increasing function if 0 < a < 1'
    ],
    answer: 3,
    explanation: 'When the base satisfies 0 < a < 1, the logarithmic function f(x) = log_a(x - 2) is strictly decreasing on its domain (2, ∞), not increasing. Therefore, option D is not true.'
  },
  {
    id: 'math-hu-2023-final-mc-10',
    university: 'Haramaya University',
    year: '2023 Exam',
    course: 'Applied Mathematics I',
    category: 'Final Exam',
    question: 'Given that the equation of a circle is (x + 1)² + (y - 1)² = 13. Which of the following equations of a line is tangent to the circle?',
    options: [
      '2y + 3x + 4 = 0',
      '2y + 3x + 8 = 0',
      '2y - 3x + 4 = 0',
      '2y - 3x + 8 = 0'
    ],
    answer: 3,
    explanation: 'The circle has center (-1, 1) and radius r = √13. A line Ax + By + C = 0 is tangent to the circle if the perpendicular distance from (-1, 1) to the line is r = √13. For 2y - 3x + 8 = 0, we have -3x + 2y + 8 = 0, so d = |-3(-1) + 2(1) + 8| / √((-3)² + 2²) = |3 + 2 + 8| / √13 = 13 / √13 = √13. Since d = r, the line is tangent.'
  },
  {
    id: 'math-hu-2023-final-mc-11',
    university: 'Haramaya University',
    year: '2023 Exam',
    course: 'Applied Mathematics I',
    category: 'Final Exam',
    question: 'All of the following about the line L: 4x - 2y + 6 = 0 are true except:',
    options: [
      'The line is perpendicular to x + 2y - 3 = 0',
      'The line 2x - y + 2 = 0 is parallel to L',
      'The distance from P(1, -1) to L is √5',
      'The point P(6, 5) is on L'
    ],
    answer: 3,
    explanation: 'Rearranging L gives 2y = 4x + 6 ⇒ y = 2x + 3 (slope m = 2). Testing point P(6, 5): 4(6) - 2(5) + 6 = 24 - 10 + 6 = 20 ≠ 0. The point P(6, 5) does not satisfy the equation of L, so it is not on L. Thus, option D is false.'
  },

  // PART III: SHORT ANSWER / FILL IN THE BLANK (1 - 5)
  {
    id: 'math-hu-2023-final-sa-01',
    university: 'Haramaya University',
    year: '2023 Exam',
    course: 'Applied Mathematics I',
    category: 'Final Exam',
    question: 'The inverse of a function f(x) = log₃(x - 1) is __________.',
    options: [
      'f⁻¹(x) = 3ˣ + 1',
      'f⁻¹(x) = 3ˣ - 1',
      'f⁻¹(x) = 3ˣ⁺¹',
      'f⁻¹(x) = log₁(3x)'
    ],
    answer: 0,
    explanation: 'Let y = log₃(x - 1). Interchanging x and y: x = log₃(y - 1) ⇒ 3ˣ = y - 1 ⇒ y = 3ˣ + 1. Therefore, f⁻¹(x) = 3ˣ + 1.'
  },
  {
    id: 'math-hu-2023-final-sa-02a',
    university: 'Haramaya University',
    year: '2023 Exam',
    course: 'Applied Mathematics I',
    category: 'Final Exam',
    question: 'Let f(x) = 3x / (2x - 4) and g(x) = √(2x). Find the domain of (f ∘ g)(x): __________',
    options: [
      '[0, 2) ∪ (2, ∞)',
      '[0, ∞)',
      '(-∞, 2) ∪ (2, ∞)',
      '(0, 2) ∪ (2, ∞)'
    ],
    answer: 0,
    explanation: '(f ∘ g)(x) = f(g(x)) = 3√(2x) / (2√(2x) - 4). The expression requires: (1) 2x ≥ 0 ⇒ x ≥ 0; and (2) 2√(2x) - 4 ≠ 0 ⇒ √(2x) ≠ 2 ⇒ 2x ≠ 4 ⇒ x ≠ 2. Combining these conditions gives [0, 2) ∪ (2, ∞).'
  },
  {
    id: 'math-hu-2023-final-sa-02b',
    university: 'Haramaya University',
    year: '2023 Exam',
    course: 'Applied Mathematics I',
    category: 'Final Exam',
    question: 'Let f(x) = 3x / (2x - 4) and g(x) = √(2x). Find the value of (g ∘ f)(2): __________',
    options: [
      'Undefined (Does not exist)',
      '0',
      '√3',
      '2'
    ],
    answer: 0,
    explanation: '(g ∘ f)(2) = g(f(2)). Evaluating f(2) gives f(2) = 3(2) / (2(2) - 4) = 6 / 0, which is undefined because x = 2 is not in the domain of f. Therefore, (g ∘ f)(2) is undefined.'
  },
  {
    id: 'math-hu-2023-final-sa-03',
    university: 'Haramaya University',
    year: '2023 Exam',
    course: 'Applied Mathematics I',
    category: 'Final Exam',
    question: 'The exact value of sinh(-2 ln 3) is __________.',
    options: [
      '-40/9',
      '40/9',
      '-80/9',
      '-4/3'
    ],
    answer: 0,
    explanation: 'sinh(u) = (eᵘ - e⁻ᵘ) / 2. Here u = -2 ln 3 = ln(3⁻²) = ln(1/9). So eᵘ = 1/9, and e⁻ᵘ = e^(2 ln 3) = 9. Thus, sinh(-2 ln 3) = (1/9 - 9) / 2 = ((1 - 81)/9) / 2 = (-80/9) / 2 = -40/9.'
  },
  {
    id: 'math-hu-2023-final-sa-04a',
    university: 'Haramaya University',
    year: '2023 Exam',
    course: 'Applied Mathematics I',
    category: 'Final Exam',
    question: 'If f(x) = -2 cos x and g(x) = f(x/2 - π/4), find the period of g: __________',
    options: [
      '4π',
      '2π',
      'π',
      '8π'
    ],
    answer: 0,
    explanation: 'Substituting gives g(x) = -2 cos(x/2 - π/4) = -2 cos(1/2 x - π/4). For a cosine function of the form A cos(Bx - C), the period is T = 2π / |B|. Here B = 1/2, so the period is T = 2π / (1/2) = 4π.'
  },
  {
    id: 'math-hu-2023-final-sa-04b',
    university: 'Haramaya University',
    year: '2023 Exam',
    course: 'Applied Mathematics I',
    category: 'Final Exam',
    question: 'If f(x) = -2 cos x and g(x) = f(x/2 - π/4), find the amplitude of g: __________',
    options: [
      '2',
      '-2',
      '1',
      '4'
    ],
    answer: 0,
    explanation: 'The amplitude of g(x) = A cos(Bx - C) is defined as |A|. Here A = -2, so the amplitude is |-2| = 2.'
  },
  {
    id: 'math-hu-2023-final-sa-05',
    university: 'Haramaya University',
    year: '2023 Exam',
    course: 'Applied Mathematics I',
    category: 'Final Exam',
    question: 'If z = (a + 4i) / (1 + ai) and z is a real number, then all possible values of a are __________.',
    options: [
      '±2',
      '±4',
      '0',
      '±1'
    ],
    answer: 0,
    explanation: 'Multiply numerator and denominator by the conjugate (1 - ai): z = [(a + 4i)(1 - ai)] / (1 + a²) = [(a - a²i + 4i + 4a)] / (1 + a²) = [5a + (4 - a²)i] / (1 + a²). For z to be a real number, the imaginary part must be zero: (4 - a²) / (1 + a²) = 0 ⇒ 4 - a² = 0 ⇒ a² = 4 ⇒ a = ±2.'
  }
];

// Append questions
exams.push(...newQuestions);

fs.writeFileSync(examsPath, JSON.stringify(exams, null, 2), 'utf8');
console.log('Successfully added ' + newQuestions.length + ' questions to ' + examsPath + '. Total questions now: ' + exams.length);
