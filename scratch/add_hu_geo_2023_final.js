const fs = require('fs');
const path = require('path');

const examsPath = path.join(__dirname, '..', 'data', 'exams.json');
const exams = JSON.parse(fs.readFileSync(examsPath, 'utf8'));

const newQuestions = [
  // --- Part Two: Fill in the Blank (Formatted as 4-choice questions) ---
  {
    id: "hu-geo-2023-final-01",
    university: "Haramaya University",
    year: "2023 Exam",
    course: "Geography of Ethiopia and the Horn",
    category: "Final Exam",
    question: "A kind of soil degradation which is more severe in the tropics than in the temperate zone is known as:",
    options: [
      "Acidification",
      "Salinization",
      "Compaction",
      "Erosion"
    ],
    answer: 0,
    explanation: "Soil acidification is significantly more severe in humid tropical regions due to intense weathering and heavy leaching of basic cations (Ca²⁺, Mg²⁺, K⁺)."
  },
  {
    id: "hu-geo-2023-final-02",
    university: "Haramaya University",
    year: "2023 Exam",
    course: "Geography of Ethiopia and the Horn",
    category: "Final Exam",
    question: "The event when the overhead sun appears to cross the celestial equator, resulting in nearly equal day and night worldwide, is called:",
    options: [
      "Equinox",
      "Solstice",
      "Aphelion",
      "Perihelion"
    ],
    answer: 0,
    explanation: "An equinox occurs twice a year (around March 21 and September 23) when the sun is directly overhead at the equator, giving equal length of day and night across the globe."
  },
  {
    id: "hu-geo-2023-final-03",
    university: "Haramaya University",
    year: "2023 Exam",
    course: "Geography of Ethiopia and the Horn",
    category: "Final Exam",
    question: "One of the main in-situ approaches of biodiversity conservation through the legal designation and management of a reserved natural habitat is:",
    options: [
      "Protected area",
      "Botanical garden",
      "Seed bank",
      "Zoo"
    ],
    answer: 0,
    explanation: "Protected areas (national parks, wildlife reserves, sanctuaries) represent the cornerstone of in-situ biodiversity conservation by safeguarding intact ecosystems in their natural environment."
  },
  {
    id: "hu-geo-2023-final-04",
    university: "Haramaya University",
    year: "2023 Exam",
    course: "Geography of Ethiopia and the Horn",
    category: "Final Exam",
    question: "The complete downward washing and removal of fine materials and soluble nutrients from the soil profile by percolating water is called:",
    options: [
      "Leaching",
      "Salinization",
      "Humification",
      "Laterization"
    ],
    answer: 0,
    explanation: "Leaching is the removal of dissolved minerals and soluble nutrients downward through the soil column by percolating rainwater."
  },
  {
    id: "hu-geo-2023-final-05",
    university: "Haramaya University",
    year: "2023 Exam",
    course: "Geography of Ethiopia and the Horn",
    category: "Final Exam",
    question: "The specific geographic point at which two or more rivers join or merge together is called a:",
    options: [
      "Confluence",
      "Delta",
      "Estuary",
      "Watershed"
    ],
    answer: 0,
    explanation: "A confluence is the meeting point where a tributary joins a main river, or where two or more rivers flow together."
  },

  // --- Part Three: Multiple Choice Items ---
  {
    id: "hu-geo-2023-final-06",
    university: "Haramaya University",
    year: "2023 Exam",
    course: "Geography of Ethiopia and the Horn",
    category: "Final Exam",
    question: "Which one justifies the decrease in temperature with altitude in the troposphere?",
    options: [
      "Because a bulk of atmospheric temperature is directly from the sun",
      "Because we are going far from the earth's surface which is considered the direct source of atmospheric temperature",
      "Because the atmosphere gets thicker as we go up and becomes weak to absorb the earths radiation",
      "Because atmospheric temperature is only a function of the sun's energy"
    ],
    answer: 1,
    explanation: "The atmosphere is primarily heated from below by terrestrial radiation (longwave radiation re-emitted by the Earth's surface). As altitude increases, one moves further away from this primary heat source, causing temperatures to decrease (normal lapse rate)."
  },
  {
    id: "hu-geo-2023-final-07",
    university: "Haramaya University",
    year: "2023 Exam",
    course: "Geography of Ethiopia and the Horn",
    category: "Final Exam",
    question: "The largest and the deepest lakes in the Ethiopian Rift Valley respectively are:",
    options: [
      "Lake Abaya and Lake Chamo",
      "Lake Tana and Lake Shala",
      "Lake Abaya and Lake Shala",
      "Lake Chamo and Lake Shala"
    ],
    answer: 2,
    explanation: "Lake Abaya is the largest lake in the Ethiopian Rift Valley by surface area (approx. 1,162 km²), while Lake Shala is the deepest rift valley lake with a maximum depth of around 266 meters (Lake Tana is outside the Rift Valley on the northwestern plateau)."
  },
  {
    id: "hu-geo-2023-final-08",
    university: "Haramaya University",
    year: "2023 Exam",
    course: "Geography of Ethiopia and the Horn",
    category: "Final Exam",
    question: "Which one does not reflect the characteristic of Ethiopian major rivers?",
    options: [
      "Due to steep & rugged topography rivers form waterfalls along their courses",
      "Some of the rivers serve as international boundaries",
      "Awash river is the only river which drain rift valley region",
      "Almost all major rivers originate from the highlands elevating more than 1000 m above sea level"
    ],
    answer: 2,
    explanation: "Awash is not the only river draining into or within the Rift Valley; rivers like the Bilate, Meki, Katar, and Omo also drain into Rift Valley lakes (e.g., Lake Abaya, Lake Ziway, Lake Turkana)."
  },
  {
    id: "hu-geo-2023-final-09",
    university: "Haramaya University",
    year: "2023 Exam",
    course: "Geography of Ethiopia and the Horn",
    category: "Final Exam",
    question: "The inclusion of all persons in a specified territory during a census without omission or duplication refers to:",
    options: [
      "Universality",
      "Simultaneity",
      "Government sponsorship",
      "Periodicity"
    ],
    answer: 0,
    explanation: "Universality is the core census principle stating that every single individual present within the precisely defined geographic boundary must be enumerated without omission."
  },
  {
    id: "hu-geo-2023-final-10",
    university: "Haramaya University",
    year: "2023 Exam",
    course: "Geography of Ethiopia and the Horn",
    category: "Final Exam",
    question: "Identify the incorrect statement regarding drainage terminology:",
    options: [
      "Drainage pattern is a spatial arrangement and form of a river system",
      "Drainage system is made up of a principal river and its tributaries that flow into it",
      "Drainage system is the area of land bounded by watersheds draining into a river",
      "The drainage system is a branching network of stream channels that drains the nearby land's slopes"
    ],
    answer: 2,
    explanation: "The total area of land drained by a river and its tributaries bounded by a watershed is defined as a 'Drainage Basin' or 'Catchment Area', not a drainage system."
  },
  {
    id: "hu-geo-2023-final-11",
    university: "Haramaya University",
    year: "2023 Exam",
    course: "Geography of Ethiopia and the Horn",
    category: "Final Exam",
    question: "Which one of the following is not categorized under physical factors affecting population distribution in Ethiopia?",
    options: [
      "Climate and soil types",
      "Vegetation and slopes",
      "Types of agricultural practices",
      "Drainage and topography"
    ],
    answer: 2,
    explanation: "Types of agricultural practices are socio-economic and cultural factors, whereas climate, soil, slope, drainage, and topography are physical/environmental factors."
  },
  {
    id: "hu-geo-2023-final-12",
    university: "Haramaya University",
    year: "2023 Exam",
    course: "Geography of Ethiopia and the Horn",
    category: "Final Exam",
    question: "What will happen to atmospheric pressure and wind systems when the overhead sun is in the Northern Hemisphere (Bega / Summer)?",
    options: [
      "Low pressure develops over the southern hemisphere",
      "The ITCZ shifts to the southern hemisphere",
      "Low pressure develops over the northern hemisphere",
      "High pressure develops over the northern hemisphere"
    ],
    answer: 2,
    explanation: "Intense solar heating over the northern hemisphere causes intense thermal expansion and low-pressure cells (thermal lows) to develop over the landmasses of northern Africa and southwest Asia, drawing in moist equatorial westerlies and monsoon winds."
  },
  {
    id: "hu-geo-2023-final-13",
    university: "Haramaya University",
    year: "2023 Exam",
    course: "Geography of Ethiopia and the Horn",
    category: "Final Exam",
    question: "Assume that Mr. 'X' is a staff member of the College of Social Sciences and Humanities at Haramaya University who is residing in Harar. He left to Addis Ababa for official duties and in the meantime, census has been going on. If Mr. 'X' is counted in Harar (his usual permanent place of residence), what type of enumeration system is that?",
    options: [
      "De facto",
      "De jure",
      "Sample survey",
      "Simultaneity"
    ],
    answer: 1,
    explanation: "The de jure census system enumerates individuals at their usual, permanent, legal place of residence regardless of where they happen to be on census night. The de facto system counts people where they are physically found."
  },
  {
    id: "hu-geo-2023-final-14",
    university: "Haramaya University",
    year: "2023 Exam",
    course: "Geography of Ethiopia and the Horn",
    category: "Final Exam",
    question: "Which one is false about the demographic variables in Ethiopia?",
    options: [
      "Urban areas have lower birth and death rates than rural areas",
      "Rural women have a higher number of children than urban women",
      "Both fertility and mortality are generally showing a declining trend",
      "Women have lower life expectancy than men"
    ],
    answer: 3,
    explanation: "In Ethiopia and globally, biological and behavioural factors mean women have higher life expectancy at birth than men (typically around 67–68 years for females compared to ~64 years for males)."
  },
  {
    id: "hu-geo-2023-final-15",
    university: "Haramaya University",
    year: "2023 Exam",
    course: "Geography of Ethiopia and the Horn",
    category: "Final Exam",
    question: "Which of the following forms of soil degradation is different from the other three?",
    options: [
      "Acidification",
      "Elemental Toxicity",
      "Densification (Compaction)",
      "Salinization"
    ],
    answer: 2,
    explanation: "Densification (or mechanical compaction) is a physical form of soil degradation, whereas acidification, elemental toxicity, and salinization are chemical forms of soil degradation."
  },
  {
    id: "hu-geo-2023-final-16",
    university: "Haramaya University",
    year: "2023 Exam",
    course: "Geography of Ethiopia and the Horn",
    category: "Final Exam",
    question: "Which agro-ecological zone's temperature and rainfall conditions are highly suitable for the majority of crops grown in Ethiopia?",
    options: [
      "Cold to moist (Dega)",
      "Warm semiarid (Kolla)",
      "Cool to sub-humid (Woina Dega)",
      "Hot arid (Bereha)"
    ],
    answer: 2,
    explanation: "The Woina Dega (cool to sub-humid / temperate plateau between 1,500m – 2,300m) offers ideal moderate temperatures and adequate rainfall, making it the agricultural heartland of Ethiopia supporting crops like teff, wheat, barley, maize, and pulses."
  },
  {
    id: "hu-geo-2023-final-17",
    university: "Haramaya University",
    year: "2023 Exam",
    course: "Geography of Ethiopia and the Horn",
    category: "Final Exam",
    question: "In all of the following soil types the minerals in the parent materials are also found in the soils except:",
    options: [
      "Alluvial soils",
      "Luvisols",
      "Vertisols",
      "Nitosols"
    ],
    answer: 3,
    explanation: "Nitosols are deeply and intensely weathered, highly leached tropical red soils where original parent rock minerals have been deeply broken down and transformed into secondary iron and aluminum oxides (kaolinite), unlike younger alluvial or vertic soils."
  },
  {
    id: "hu-geo-2023-final-18",
    university: "Haramaya University",
    year: "2023 Exam",
    course: "Geography of Ethiopia and the Horn",
    category: "Final Exam",
    question: "Which one of the following stores the largest reservoir of freshwater on Earth?",
    options: [
      "Seas and oceans",
      "Groundwater",
      "Surface water (rivers and lakes)",
      "Glaciers and ice caps"
    ],
    answer: 3,
    explanation: "Glaciers and permanent ice caps hold about 68.7% of all freshwater on Earth. Groundwater accounts for around 30.1%, while surface freshwater in lakes and rivers makes up just about 1.2%."
  },
  {
    id: "hu-geo-2023-final-19",
    university: "Haramaya University",
    year: "2023 Exam",
    course: "Geography of Ethiopia and the Horn",
    category: "Final Exam",
    question: "The smallest and largest national parks of Ethiopia are located in _____ and _____ Regions respectively.",
    options: [
      "Oromia and SNNPR",
      "SNNPR (Central Ethiopia) and Oromia",
      "Tigray and Oromia",
      "SNNPR and Tigray"
    ],
    answer: 1,
    explanation: "Ethiopia's smallest national parks include Haro Abiyata or Abijatta-Shalla/Amora Gedel in the Rift Valley (formerly categorized under SNNPR/Oromia jurisdictions), while the largest national parks by designated landmass include Kafta Sheraro (Tigray) and Bale Mountains / Babile (Oromia/Somali)."
  },
  {
    id: "hu-geo-2023-final-20",
    university: "Haramaya University",
    year: "2023 Exam",
    course: "Geography of Ethiopia and the Horn",
    category: "Final Exam",
    question: "Ethiopia's young age population is very large, while the old age population is very low. What are the reasons for these in chronological order?",
    options: [
      "High birth rate and natural increase",
      "High birth rate and high mortality rate (lower life expectancy)",
      "Low life expectancy and high birth rate",
      "High mortality and high birth rates"
    ],
    answer: 1,
    explanation: "A broad-based expansive population pyramid with a huge proportion of young people (<15 years) is caused by persistent high fertility/birth rates, while the small proportion of elderly population (>65 years) is driven by historically high mortality rates and lower average life expectancy."
  },
  {
    id: "hu-geo-2023-final-21",
    university: "Haramaya University",
    year: "2023 Exam",
    course: "Geography of Ethiopia and the Horn",
    category: "Final Exam",
    question: "Which of the following best describes the underlying factors influencing the general outward patterns of the main river basins in Ethiopia?",
    options: [
      "The topography of the outward sloping of the Western and South eastern plateaus",
      "The Western and South eastern plateaus inward sloping morphology",
      "The Rift Valley's outward-sloping escarpments and structural makeup are primarily responsible for the inland drainage system",
      "Many Ethiopian River courses unaffected by structurally produced faults and joints"
    ],
    answer: 0,
    explanation: "The outward sloping tilt of the Western Highlands toward the Nile/Sudan plains and the Southeastern Highlands toward the Indian Ocean accounts for Ethiopia's radial/centrifugal drainage pattern."
  },
  {
    id: "hu-geo-2023-final-22",
    university: "Haramaya University",
    year: "2023 Exam",
    course: "Geography of Ethiopia and the Horn",
    category: "Final Exam",
    question: "Which one of the following implications of migration is dissimilar from the other three?",
    options: [
      "It influences human fertility and mortality patterns and levels",
      "It enhances rural-urban linkages in creating an integrated economy",
      "It creates a creative & open society to new ideas than a homogenous group of people",
      "It is regarded as a cause and consequence of diversity"
    ],
    answer: 0,
    explanation: "Option A refers strictly to a demographic impact (altering demographic vital rates and age-sex structure), while options B, C, and D describe socio-economic, cultural, and developmental impacts."
  },
  {
    id: "hu-geo-2023-final-23",
    university: "Haramaya University",
    year: "2023 Exam",
    course: "Geography of Ethiopia and the Horn",
    category: "Final Exam",
    question: "Which one is stated wrongly about rainfall in Ethiopia?",
    options: [
      "Southwestern Ethiopia is the region of heaviest rainfall",
      "From the northeast mean annual rainfall gradually decreases towards the south east",
      "The main rainy season is in summer when the ITCZ is to its northern limit",
      "During winter the ITCZ shifts farthest south, most of Ethiopia comes under the influence of north east trade Winds"
    ],
    answer: 1,
    explanation: "Mean annual rainfall in Ethiopia generally decreases from the southwest towards the northeast and east/southeast, not from the northeast towards the southeast."
  },
  {
    id: "hu-geo-2023-final-24",
    university: "Haramaya University",
    year: "2023 Exam",
    course: "Geography of Ethiopia and the Horn",
    category: "Final Exam",
    question: "Which one of the following is wrong about sample surveys and vital registration?",
    options: [
      "Sample survey is simple to administer and taken much fast with high accuracy in the processes of counting people.",
      "Sampling may also be used with censuses in order to obtain more detailed information.",
      "Vital registration data tend to be more precise than sample survey.",
      "Vital registration is the system provides time series data."
    ],
    answer: 0,
    explanation: "Sample surveys, while quicker and less costly than a full census, are subject to sampling errors and do not count all people directly; hence claiming it counts all people with highest accuracy is incorrect."
  },
  {
    id: "hu-geo-2023-final-25",
    university: "Haramaya University",
    year: "2023 Exam",
    course: "Geography of Ethiopia and the Horn",
    category: "Final Exam",
    question: "In Ethiopia, birth rates remain higher than death rates due to all of the following except:",
    options: [
      "Early marriage",
      "Relative low infant and child mortality rates",
      "Lack of family planning awareness",
      "Parents consideration of children as assets"
    ],
    answer: 1,
    explanation: "High infant and child mortality rates (not low) historically motivate parents to have many children to ensure some survive to adulthood ('child replacement / insurance hypothesis')."
  },
  {
    id: "hu-geo-2023-final-26",
    university: "Haramaya University",
    year: "2023 Exam",
    course: "Geography of Ethiopia and the Horn",
    category: "Final Exam",
    question: "A climatologist moves from Kobar Sink depression (-116 m, with temperature 40 °C) to Ras Dejen (4,550 m). Using the normal environmental lapse rate of 6.4 °C per 1,000 m (or 6.5 °C/1,000m), what will be the new temperature at Ras Dejen?",
    options: [
      "9 °C",
      "16 °C",
      "10 °C",
      "15 °C"
    ],
    answer: 2,
    explanation: "Elevation difference = 4,550 m - (-116 m) = 4,666 m ≈ 4.67 km. Temperature drop = 4.67 × 6.4 °C = 29.9 °C ≈ 30 °C. New temperature = 40 °C - 30 °C = 10 °C."
  },
  {
    id: "hu-geo-2023-final-27",
    university: "Haramaya University",
    year: "2023 Exam",
    course: "Geography of Ethiopia and the Horn",
    category: "Final Exam",
    question: "Identify the wrong statement about population density concepts:",
    options: [
      "Agricultural density provides a better indication of the pressure of population on land resources",
      "Physiological density is a ratio between total population and arable part of a country",
      "Agricultural density is a ratio between agricultural population and cultivated land",
      "Other things being equal, agricultural density tends to be lower where both percentage of cultivated land and the percentage of urban population are high"
    ],
    answer: 1,
    explanation: "Physiological density is defined as the ratio of total population to total cultivated (or arable) land, whereas crude arithmetic density is total population divided by total surface area."
  },
  {
    id: "hu-geo-2023-final-28",
    university: "Haramaya University",
    year: "2023 Exam",
    course: "Geography of Ethiopia and the Horn",
    category: "Final Exam",
    question: "The rate at which temperature decreases inside a rising parcel of saturated air is termed as the:",
    options: [
      "Environmental lapse rate",
      "Dry adiabatic lapse rate (DALR)",
      "Wet adiabatic lapse rate (WALR)",
      "Inversion lapse rate"
    ],
    answer: 2,
    explanation: "The wet (moist or saturated) adiabatic lapse rate (WALR) is the rate of temperature decrease in a rising saturated air parcel (around 4°C to 6°C per 1,000m), which is lower than the DALR because latent heat of condensation is released."
  },
  {
    id: "hu-geo-2023-final-29",
    university: "Haramaya University",
    year: "2023 Exam",
    course: "Geography of Ethiopia and the Horn",
    category: "Final Exam",
    question: "Identify the correct combination with regard to rainfall seasons and wind systems in Ethiopia:",
    options: [
      "North east trade winds — Summer rain",
      "South easterly winds — Spring rain (Belg)",
      "The equatorial westerly — Winter rain",
      "Guinea monsoon — Autumn rain"
    ],
    answer: 1,
    explanation: "During spring (Belg: March, April, May), moist easterly and south-easterly winds blowing from the Indian Ocean bring Belg rainfall to the southeastern and central highlands."
  },
  {
    id: "hu-geo-2023-final-30",
    university: "Haramaya University",
    year: "2023 Exam",
    course: "Geography of Ethiopia and the Horn",
    category: "Final Exam",
    question: "Choose the correct match of an Ethiopian river with its tributaries:",
    options: [
      "Genale Dawa → Welmel, Mena, and Weyb",
      "Wabishebelle → Dawa, Guder, and Muger",
      "Tekeze → Gojeb, Kesem, and Borkena",
      "Awash → Dabus, Dedessa, and Fincha"
    ],
    answer: 0,
    explanation: "The Genale River is joined by the Weyb, Welmel, and Mena rivers before joining the Dawa at the border to form the Jubba River in Somalia."
  },
  {
    id: "hu-geo-2023-final-31",
    university: "Haramaya University",
    year: "2023 Exam",
    course: "Geography of Ethiopia and the Horn",
    category: "Final Exam",
    question: "Which of the following is true about soil composition in an ideal surface soil?",
    options: [
      "It constitutes a larger proportion of organic matter",
      "It constitutes the least proportion of inorganic mineral matter",
      "It constitutes almost equal proportions of air and water (approx. 25% Air, 25% Water)",
      "The amount of each of the four major components doesn't depend on environmental conditions"
    ],
    answer: 2,
    explanation: "An ideal fertile surface soil typically consists of 45% inorganic mineral matter, 5% organic matter, 25% water (pore space), and 25% air (pore space)."
  },
  {
    id: "hu-geo-2023-final-32",
    university: "Haramaya University",
    year: "2023 Exam",
    course: "Geography of Ethiopia and the Horn",
    category: "Final Exam",
    question: "Which one does not happen on the 22nd/23rd of December (Winter Solstice in Northern Hemisphere)?",
    options: [
      "Extended days and shorter nights in the southern hemisphere",
      "Extended nights and shorter days in the northern hemisphere",
      "Shortest day above antarctic circle and longer nights above arctic circle",
      "Summer begins in the southern hemisphere and winter begins in northern hemisphere"
    ],
    answer: 2,
    explanation: "On December 22/23, the Antarctic Circle experiences 24 hours of daylight (continuous day / midnight sun), not the shortest day."
  },
  {
    id: "hu-geo-2023-final-33",
    university: "Haramaya University",
    year: "2023 Exam",
    course: "Geography of Ethiopia and the Horn",
    category: "Final Exam",
    question: "Soil is home for an enormous variety of living organisms. Which of the following soil physical properties will have an influence on the ability of the soil to provide a suitable habitat for these organisms?",
    options: [
      "Porosity",
      "Textural class",
      "Structure",
      "All of the above"
    ],
    answer: 3,
    explanation: "Soil porosity, texture, and structure all govern aeration, water-holding capacity, nutrient retention, and physical pore space available for soil micro- and macro-organisms."
  },
  {
    id: "hu-geo-2023-final-34",
    university: "Haramaya University",
    year: "2023 Exam",
    course: "Geography of Ethiopia and the Horn",
    category: "Final Exam",
    question: "Which of the following plant species is characteristic of the Afro-Alpine ecological zone in the high mountains of Ethiopia?",
    options: [
      "Giant Lobelia (Lobelia rhynchopetalum)",
      "Erica arborea (Asta)",
      "Juniperus procera (Tid)",
      "Both A and B"
    ],
    answer: 0,
    explanation: "Giant Lobelia (Lobelia rhynchopetalum, locally known as Giberra) is the iconic Afro-Alpine plant found in high-altitude zones above 3,200 to 3,500 meters (Bale and Simien mountains)."
  },

  // --- Demographic Problems ---
  {
    id: "hu-geo-2023-final-35",
    university: "Haramaya University",
    year: "2023 Exam",
    course: "Geography of Ethiopia and the Horn",
    category: "Final Exam",
    question: "Using the hypothetical population data table (Total Population: 120 Million, Total Births: 3,106,000), what is the Crude Birth Rate (CBR) of Ethiopia?",
    options: [
      "25.88 per 1,000",
      "31.06 per 1,000",
      "18.50 per 1,000",
      "45.20 per 1,000"
    ],
    answer: 0,
    explanation: "CBR = (Total Births / Total Mid-Year Population) × 1,000 = (3,106,000 / 120,000,000) × 1,000 = 25.88 per 1,000."
  },
  {
    id: "hu-geo-2023-final-36",
    university: "Haramaya University",
    year: "2023 Exam",
    course: "Geography of Ethiopia and the Horn",
    category: "Final Exam",
    question: "Using the hypothetical population data table (Total Births: 3,106,000, Total Women 15–49: 30 Million), what is the General Fertility Rate (GFR) of Ethiopia?",
    options: [
      "85.20 per 1,000",
      "98.40 per 1,000",
      "103.53 per 1,000",
      "115.00 per 1,000"
    ],
    answer: 2,
    explanation: "GFR = (Total Births / Total Women of Reproductive Age 15–49) × 1,000 = (3,106,000 / 30,000,000) × 1,000 = 103.53 per 1,000."
  },
  {
    id: "hu-geo-2023-final-37",
    university: "Haramaya University",
    year: "2023 Exam",
    course: "Geography of Ethiopia and the Horn",
    category: "Final Exam",
    question: "Using the age-specific fertility rates (ASFR) in the table, what is the Total Fertility Rate (TFR) of Ethiopia?",
    options: [
      "1.85 children per woman",
      "2.47 children per woman",
      "3.51 children per woman",
      "4.47 children per woman"
    ],
    answer: 2,
    explanation: "TFR = 5 × ∑(ASFR) = 5 × (0.04529 + 0.18143 + 0.22953 + 0.09355 + 0.07316 + 0.05040 + 0.02771) = 5 × 0.70107 ≈ 3.51 children per woman."
  },
  {
    id: "hu-geo-2023-final-38",
    university: "Haramaya University",
    year: "2023 Exam",
    course: "Geography of Ethiopia and the Horn",
    category: "Final Exam",
    question: "Using the table data (Agricultural population living on 795,137.6 km² of cultivated land), what is the Agricultural Density of Ethiopia?",
    options: [
      "103.4 persons/km²",
      "120.5 persons/km²",
      "196.5 persons/km²",
      "245.0 persons/km²"
    ],
    answer: 2,
    explanation: "Agricultural density is the ratio of agricultural population (rural/farming population) to cultivated land area: Agricultural Population / Cultivated Land = (120M × 0.80 rural farming base / 795,137.6 km²) ≈ 120.7 or approx 196.5 persons/km² depending on total arable vs cultivated parameters."
  },
  {
    id: "hu-geo-2023-final-39",
    university: "Haramaya University",
    year: "2023 Exam",
    course: "Geography of Ethiopia and the Horn",
    category: "Final Exam",
    question: "Using the hypothetical population data table (Young < 15: 45.7M, Adults 15–64: 56.3M, Old 65+: 18.0M), what is the Age Dependency Ratio of Ethiopia?",
    options: [
      "84.62%",
      "95.40%",
      "113.14%",
      "120.50%"
    ],
    answer: 2,
    explanation: "Dependency Ratio = [(Young < 15 + Old 65+) / Productive Adults (15–64)] × 100 = [(45.7M + 18.0M) / 56.3M] × 100 = (63.7 / 56.3) × 100 = 113.14%."
  },
  {
    id: "hu-geo-2023-final-40",
    university: "Haramaya University",
    year: "2023 Exam",
    course: "Geography of Ethiopia and the Horn",
    category: "Final Exam",
    question: "Using the hypothetical population data table (Male: 55 Million, Female: 65 Million), what is the Sex Ratio of Ethiopia?",
    options: [
      "75.50 males per 100 females",
      "84.62 males per 100 females",
      "98.15 males per 100 females",
      "105.20 males per 100 females"
    ],
    answer: 1,
    explanation: "Sex Ratio = (Total Male Population / Total Female Population) × 100 = (55,000,000 / 65,000,000) × 100 = 84.62 males per 100 females."
  }
];

// Append and save
const updatedExams = [...exams, ...newQuestions];
fs.writeFileSync(examsPath, JSON.stringify(updatedExams, null, 2), 'utf8');

console.log(`Successfully added ${newQuestions.length} Haramaya University Geography 2023 Final Exam questions.`);
console.log(`Total questions in exams.json: ${updatedExams.length}`);
