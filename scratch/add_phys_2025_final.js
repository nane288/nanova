const fs = require('fs');

const questions = [
  {
    question: "Among the following, what is thermodynamics broadly concerned with?",
    options: [
      "Transfer of energy and its transformations",
      "Study of forces and motion",
      "Properties of light",
      "Behavior of electric charges"
    ],
    answer: 0,
    explanation: "Thermodynamics is the branch of physics that deals with the relationships between heat, work, temperature, and energy. It broadly concerns the transfer of energy and its transformations between different forms."
  },
  {
    question: "In which types of wave motion, the particles of the medium vibrate parallel to the direction of propagation of the wave?",
    options: [
      "Transverse wave",
      "Electromagnetic wave",
      "Mechanical wave",
      "Longitudinal wave"
    ],
    answer: 3,
    explanation: "In longitudinal waves, particles oscillate back and forth parallel (along) the direction of wave propagation — creating compressions and rarefactions. Sound waves are a classic example."
  },
  {
    question: "A simple pendulum with a length of 4 m oscillates on the surface of an unknown planet. What is the surface gravity on the planet if the period of oscillations is 4 s?",
    options: [
      "6.25 m/s²",
      "9.42 m/s²",
      "9.86 m/s²",
      "3.14 m/s²"
    ],
    answer: 2,
    explanation: "Using T = 2π√(L/g), solving for g: g = 4π²L/T² = 4π²(4)/(4²) = 4π²/4 = π² ≈ 9.87 m/s² ≈ 9.86 m/s². The planet's surface gravity is approximately π² m/s²."
  },
  {
    question: "The period of oscillation of a simple pendulum is independent of the",
    options: [
      "length of the pendulum",
      "amplitude of oscillation for a large angle",
      "acceleration due to gravity and mass",
      "mass of the bob"
    ],
    answer: 3,
    explanation: "The period formula T = 2π√(L/g) shows that the period depends on length (L) and gravitational acceleration (g), but NOT on the mass of the bob. This was famously demonstrated by Galileo."
  },
  {
    question: "In the Doppler Effect, when the source of the sound is moving away from a stationary observer, the frequency observed by the observer will be",
    options: [
      "the same as the emitted frequency",
      "higher than the emitted frequency",
      "lower than the emitted frequency",
      "zero"
    ],
    answer: 2,
    explanation: "When a sound source moves away from an observer, the sound waves are stretched (longer wavelength), resulting in a lower observed frequency. This is the red-shift analogue in sound — a key feature of the Doppler Effect."
  },
  {
    question: "A 1.75 kg particle moves as a function of time as follows: x(t) = 4cos(1.33t rad/s), where distance is measured in meters and time in seconds. What is the spring constant?",
    options: [
      "1.01 N/m",
      "2.33 N/m",
      "1.32 N/m",
      "3.10 N/m"
    ],
    answer: 3,
    explanation: "For SHM, x(t) = A·cos(ωt), so ω = 1.33 rad/s. The spring constant k = mω² = 1.75 × (1.33)² = 1.75 × 1.7689 ≈ 3.10 N/m."
  },
  {
    question: "What is the nature of the image formed by a plane mirror?",
    options: [
      "Real and upright",
      "Virtual and inverted",
      "Real and inverted",
      "Virtual and upright"
    ],
    answer: 3,
    explanation: "A plane mirror always forms a virtual image (cannot be projected on a screen) that is upright (same orientation as the object), laterally inverted, and the same size as the object, located behind the mirror."
  },
  {
    question: "Suppose that three point charges are placed along a straight line and the electrostatic force on the middle charge is zero. What can we conclude about the charges?",
    options: [
      "The charge at the ends must have opposite sign",
      "The signs of the three charges should be the same",
      "The charge at the middle and at the left end should have the same sign",
      "The charge at the ends must have the same sign"
    ],
    answer: 3,
    explanation: "For the net force on the middle charge to be zero, the forces from the two end charges must be equal and opposite. This requires the end charges to have the same sign, so they both either attract or repel the middle charge in opposite directions."
  },
  {
    question: "If a battery has an electromotive force (EMF) of 12 V and internal resistance of 1 Ω, what is the terminal voltage when connected to a 5 Ω resistor?",
    options: [
      "12 V",
      "10 V",
      "11 V",
      "9 V"
    ],
    answer: 1,
    explanation: "Current I = EMF/(R + r) = 12/(5 + 1) = 2 A. Terminal voltage V = EMF - I·r = 12 - (2)(1) = 10 V. The voltage drop across the internal resistance reduces the terminal voltage."
  },
  {
    question: "When two resistances are connected in series, their equivalent resistance is 100 ohms and when connected in parallel to each other its value is 24 ohms. Therefore, the two resistances are",
    options: [
      "20 ohms and 80 ohms",
      "30 ohms and 70 ohms",
      "50 ohms and 50 ohms",
      "40 ohms and 60 ohms"
    ],
    answer: 3,
    explanation: "Series: R1 + R2 = 100. Parallel: R1·R2/(R1+R2) = 24, so R1·R2 = 2400. Solving: R1 and R2 are roots of x² - 100x + 2400 = 0. Discriminant = 10000 - 9600 = 400, √400 = 20. R1 = (100+20)/2 = 60Ω, R2 = 40Ω."
  },
  {
    question: "Wire A has twice the length and twice the radius of wire B. Both wires are made from the same material. If wire B has a resistance R, what is the resistance of wire A?",
    options: [
      "4R",
      "2R",
      "R",
      "R/2"
    ],
    answer: 3,
    explanation: "R = ρL/A. Wire A: L_A = 2L, r_A = 2r so A_A = π(2r)² = 4πr² = 4A. R_A = ρ(2L)/(4A) = (1/2)(ρL/A) = R/2. Doubling length doubles resistance, but quadrupling cross-sectional area reduces it by 4, giving net R/2."
  },
  {
    question: "A metal rod has a linear expansion coefficient of α = 2×10⁻⁵ /°C. Assuming its original length is L₀ = 1 m, by how much will the rod expand if the temperature increases by 50°C?",
    options: [
      "0.01 m",
      "0.005 m",
      "0.002 m",
      "0.001 m"
    ],
    answer: 3,
    explanation: "Using ΔL = α·L₀·ΔT = (2×10⁻⁵)(1)(50) = 100×10⁻⁵ = 1×10⁻³ m = 0.001 m. The rod expands by 1 mm."
  },
  {
    question: "Which statement about magnetic field lines is correct?",
    options: [
      "They begin and end at distinct magnetic monopoles",
      "They can cross each other under certain conditions",
      "They form continuous closed loops",
      "They always align with the direction of magnetic force"
    ],
    answer: 2,
    explanation: "Magnetic field lines always form continuous closed loops — they exit from the north pole of a magnet and re-enter at the south pole, forming complete loops. Unlike electric field lines, they have no beginning or end (no magnetic monopoles exist)."
  },
  {
    question: "In an adiabatic process, which of the following is true?",
    options: [
      "The volume remains constant",
      "No heat is exchanged between the system and its surroundings",
      "The temperature remains constant",
      "The pressure remains constant"
    ],
    answer: 1,
    explanation: "An adiabatic process is one in which no heat is transferred to or from the system (Q = 0). The first law gives ΔU = -W, meaning the internal energy changes only due to work done."
  },
  {
    question: "The amount of heat required to convert 1 kg of a liquid into a solid without any change in the temperature of the solid itself is",
    options: [
      "Latent Heat of fusion",
      "Latent Heat of solidification",
      "Latent heat of condensation",
      "Specific heat capacity"
    ],
    answer: 1,
    explanation: "Latent heat of solidification is the heat released (or required in reverse) when 1 kg of liquid converts to solid at constant temperature. It is the heat involved in the liquid-to-solid phase transition."
  },
  {
    question: "The heat transfer mechanism by the actual motion of the molecules of a substance is",
    options: [
      "Conduction",
      "Thermal equilibrium",
      "Convection",
      "Radiation"
    ],
    answer: 2,
    explanation: "Convection is heat transfer by the bulk movement (actual motion) of molecules in fluids (liquids and gases). Hot fluid rises and cool fluid sinks, creating convection currents that carry thermal energy."
  },
  {
    question: "If 10 J energy is released by the system in the form of heat and 30 J of work done on the system, the change in internal energy according to the first law of thermodynamics is",
    options: [
      "40 J",
      "60 J",
      "-20 J",
      "20 J"
    ],
    answer: 3,
    explanation: "First Law: ΔU = Q + W (where Q is heat added to system, W is work done on system). Heat released by system means Q = -10 J; work done on system means W = +30 J. ΔU = -10 + 30 = +20 J."
  },
  {
    question: "A 3.00-g lead bullet at 30.0°C is fired at a speed of 240 m/s into a large block of ice at 0°C, in which it becomes embedded. What quantity of ice melts? (Specific heat of lead = 128 J/kg·°C, Latent heat of fusion of ice = 333,000 J/kg)",
    options: [
      "0.294 mg",
      "294 mg",
      "294 kg",
      "294 g"
    ],
    answer: 1,
    explanation: "Heat from bullet: KE = ½mv² = ½(0.003)(240²) = 86.4 J; heat from cooling bullet = mcΔT = (0.003)(128)(30) = 11.52 J. Total Q = 97.92 J. Mass of ice melted = Q/L_f = 97.92/333000 ≈ 2.94×10⁻⁴ kg = 294 mg."
  },
  {
    question: "Which of the following statements is correct about thermal expansion?",
    options: [
      "Solids and liquids contract when heated",
      "Expansion occurs only in gases and not in solids or liquids",
      "Thermal expansion occurs because molecules vibrate with greater amplitude at higher temperatures",
      "The coefficient of linear expansion is the same for all materials"
    ],
    answer: 2,
    explanation: "Thermal expansion occurs because as temperature increases, molecules gain kinetic energy and vibrate with greater amplitude, causing them to occupy more space on average. This applies to solids, liquids, and gases, though to different extents."
  },
  {
    question: "A train is moving away from a stationary observer at a velocity of v = 30 m/s. If the speed of sound is 343 m/s and the train's horn emits a frequency of 500 Hz, what is the observed frequency?",
    options: [
      "548 Hz",
      "550 Hz",
      "460 Hz",
      "500 Hz"
    ],
    answer: 2,
    explanation: "Doppler formula (source moving away): f' = f × v_sound/(v_sound + v_source) = 500 × 343/(343 + 30) = 500 × 343/373 ≈ 500 × 0.9196 ≈ 459.8 Hz ≈ 460 Hz."
  },
  {
    question: "Faraday's Law of Electromagnetic Induction states that the induced EMF in a circuit is proportional to the",
    options: [
      "total area enclosed by the circuit",
      "strength of the applied magnetic field",
      "rate at which the magnetic flux through the circuit changes",
      "length of the conductor in the magnetic field"
    ],
    answer: 2,
    explanation: "Faraday's Law states: EMF = -dΦ/dt, where Φ is magnetic flux. The induced EMF is directly proportional to the rate of change of magnetic flux through the circuit — not to static field strength or area alone."
  },
  {
    question: "A single loop of wire with an area of 1000 cm² is in a uniform magnetic field perpendicular to the plane of the loop and is decreasing at a constant rate of 0.20 T/s. If the loop has a resistance of 0.50 Ω, what is the current induced in the loop?",
    options: [
      "0.40 A",
      "0.30 A",
      "0.04 A",
      "0.76 A"
    ],
    answer: 2,
    explanation: "Area = 1000 cm² = 0.1 m². Induced EMF = dΦ/dt = A × (dB/dt) = 0.1 × 0.20 = 0.02 V. Current I = EMF/R = 0.02/0.50 = 0.04 A."
  },
  {
    question: "A diode is an electronic component that permits current to flow",
    options: [
      "in both forward and reverse directions",
      "Only when subjected to high temperatures",
      "Only under reverse bias conditions",
      "Only in a single direction under forward bias"
    ],
    answer: 3,
    explanation: "A diode allows current to flow only in one direction — from anode to cathode — when forward biased (anode positive relative to cathode). Under reverse bias, it blocks current flow (except at breakdown voltage)."
  },
  {
    question: "What element is commonly used to dope silicon to create P-type semiconductors?",
    options: [
      "Antimony",
      "Phosphorus",
      "Boron",
      "Arsenic"
    ],
    answer: 2,
    explanation: "Boron (Group III, with 3 valence electrons) is used to create P-type semiconductors. When added to silicon (Group IV), boron creates 'holes' (positive charge carriers). Antimony, phosphorus, and arsenic (Group V) create N-type semiconductors."
  },
  {
    question: "What is the SI unit of magnetic field?",
    options: [
      "Tesla",
      "Ampere",
      "Coulomb",
      "Weber"
    ],
    answer: 0,
    explanation: "The SI unit of magnetic field (magnetic flux density) is the Tesla (T), named after Nikola Tesla. 1 Tesla = 1 Wb/m² = 1 kg/(A·s²). Weber is the unit of magnetic flux, not field strength."
  },
  {
    question: "The current in a loop circuit with resistance R₁ is 2.0 A. The current is reduced to 1.6 A when an additional resistor R₂ = 6.0 Ω is added in series with R₁. What is the value of R₁?",
    options: [
      "15.00 Ω",
      "12.00 Ω",
      "10.00 Ω",
      "24.00 Ω"
    ],
    answer: 3,
    explanation: "With R₁ alone: V = I₁R₁ = 2.0R₁. With R₁ + R₂: V = I₂(R₁ + R₂) = 1.6(R₁ + 6). Setting equal: 2.0R₁ = 1.6R₁ + 9.6 → 0.4R₁ = 9.6 → R₁ = 24 Ω."
  },
  {
    question: "According to Coulomb's Law, the electrostatic force between two charges is directly proportional to the",
    options: [
      "product of their masses",
      "product of the charges",
      "sum of the charges",
      "square of the distance between them"
    ],
    answer: 1,
    explanation: "Coulomb's Law: F = k|q₁q₂|/r². The force is directly proportional to the product of the magnitudes of the two charges (q₁·q₂) and inversely proportional to the square of the distance between them."
  },
  {
    question: "What is the current I₃ in the 2.00 Ω resistor in a circuit where Kirchhoff's laws give I₃ = -1.0 A?",
    options: [
      "-3.0 A",
      "2.0 A",
      "-2.0 A",
      "-1.0 A"
    ],
    answer: 3,
    explanation: "Applying Kirchhoff's current and voltage laws to the circuit, the current through the 2.00 Ω resistor is I₃ = -1.0 A. The negative sign indicates the actual current flows opposite to the assumed positive direction."
  },
  {
    question: "Which of the following symbols represents a two-input NOR gate with one output?",
    options: [
      "AND gate symbol",
      "NAND gate symbol",
      "NOR gate symbol",
      "OR gate symbol"
    ],
    answer: 2,
    explanation: "A NOR gate is represented by an OR gate symbol with a small circle (bubble) at the output, indicating inversion. Its output is LOW (0) when any input is HIGH (1), and HIGH (0) only when all inputs are LOW."
  },
  {
    question: "From the following symbols of circuits, which one represents a P-N-P transistor?",
    options: [
      "NPN transistor symbol (arrow pointing outward at emitter)",
      "PNP transistor symbol (arrow pointing inward at emitter E)",
      "FET transistor symbol",
      "MOSFET transistor symbol"
    ],
    answer: 1,
    explanation: "In a PNP transistor symbol, the emitter arrow points inward toward the base, representing conventional current flowing into the emitter. In an NPN transistor, the emitter arrow points outward away from the base."
  }
];

const data = JSON.parse(fs.readFileSync('data/exams.json', 'utf8'));

const newEntries = questions.map((q, i) => ({
  id: `phys-hu-2025-final-${String(i + 1).padStart(2, '0')}`,
  university: "Haramaya University",
  year: "2025 Exam",
  course: "General Physics",
  category: "Final Exam",
  question: q.question,
  options: q.options,
  answer: q.answer,
  explanation: q.explanation
}));

const updated = [...data, ...newEntries];
fs.writeFileSync('data/exams.json', JSON.stringify(updated, null, 2));
console.log(`✅ Added ${newEntries.length} questions. Total: ${updated.length}`);
console.log('IDs range:', newEntries[0].id, '→', newEntries[newEntries.length - 1].id);
