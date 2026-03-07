/**
 * Global Nuclear Arsenal Data – Country Level Only
 *
 * SOURCE: Stockholm International Peace Research Institute (SIPRI) Yearbook,
 * Federation of American Scientists (FAS) Nuclear Notebook,
 * Bulletin of the Atomic Scientists.
 *
 * IMPORTANT NOTES:
 * - All figures are PUBLIC ESTIMATES from reputable civil-society research bodies.
 * - Warhead numbers are not officially confirmed by most governments.
 * - Numbers change over time; treat as approximate/indicative.
 * - This data covers COUNTRY-LEVEL totals only. No site, base, or deployment
 *   detail is included. This is an intentional editorial decision.
 * - Last major SIPRI reference: SIPRI Yearbook 2023 / early-2024 estimates.
 *
 * Reference: https://www.sipri.org/research/armament-and-disarmament/nuclear-disarmament
 */

const arsenalData = [
  {
    id: 'usa',
    country: 'United States',
    region: 'North America',
    flag: '🇺🇸',
    // SIPRI 2023 estimates
    totalWarheads: 5550,
    deployedStrategic: 1670,
    deployedNonStrategic: 100,
    reserve: 1938,
    retired: 1536, // awaiting dismantlement
    nptStatus: 'NPT Nuclear Weapon State',
    firstTest: 1945,
    firstTestName: 'Trinity Test, New Mexico',
    stockpileTrend: 'decreasing',
    notes: 'Largest NATO nuclear power. Significant reductions since Cold War peak (~31,000 in 1967). Party to New START (expired 2026). Maintains nuclear triad.',
    color: '#3b82f6',
    lat: 38.0,
    lng: -97.0,
    sources: [
      { name: 'SIPRI Yearbook 2023', url: 'https://www.sipri.org/yearbook/2023', type: 'official' },
      { name: 'FAS Nuclear Notebook', url: 'https://fas.org/issues/nuclear-weapons/status-world-nuclear-forces/', type: 'official' },
    ],
  },
  {
    id: 'russia',
    country: 'Russia',
    region: 'Europe / Asia',
    flag: '🇷🇺',
    totalWarheads: 6255,
    deployedStrategic: 1674,
    deployedNonStrategic: 1912,
    reserve: 2671,
    retired: 1400,
    nptStatus: 'NPT Nuclear Weapon State',
    firstTest: 1949,
    firstTestName: 'Joe-1, Semipalatinsk, Kazakhstan',
    stockpileTrend: 'stable',
    notes: 'World\'s largest total nuclear inventory. Inherited Soviet arsenal. Largest non-strategic stockpile among nuclear states. Party to New START (suspended cooperation 2023).',
    color: '#ef4444',
    lat: 61.0,
    lng: 60.0,
    sources: [
      { name: 'SIPRI Yearbook 2023', url: 'https://www.sipri.org/yearbook/2023', type: 'official' },
      { name: 'FAS Nuclear Notebook', url: 'https://fas.org/issues/nuclear-weapons/status-world-nuclear-forces/', type: 'official' },
    ],
  },
  {
    id: 'uk',
    country: 'United Kingdom',
    region: 'Europe',
    flag: '🇬🇧',
    totalWarheads: 225,
    deployedStrategic: 120,
    deployedNonStrategic: 0,
    reserve: 105,
    retired: 0,
    nptStatus: 'NPT Nuclear Weapon State',
    firstTest: 1952,
    firstTestName: 'Hurricane, Monte Bello Islands, Australia',
    stockpileTrend: 'increasing',
    notes: 'Declared intention to increase stockpile ceiling to 260 (2021 Integrated Review). Operates submarine-based Trident II D5 missiles. Shares technology with USA.',
    color: '#8b5cf6',
    lat: 54.0,
    lng: -2.5,
    sources: [
      { name: 'SIPRI Yearbook 2023', url: 'https://www.sipri.org/yearbook/2023', type: 'official' },
      { name: 'UK Government, Integrated Review 2021', url: 'https://www.gov.uk/government/publications/global-britain-in-a-competitive-age-the-integrated-review-of-security-defence-development-and-foreign-policy', type: 'official' },
    ],
  },
  {
    id: 'france',
    country: 'France',
    region: 'Europe',
    flag: '🇫🇷',
    totalWarheads: 290,
    deployedStrategic: 280,
    deployedNonStrategic: 0,
    reserve: 10,
    retired: 0,
    nptStatus: 'NPT Nuclear Weapon State',
    firstTest: 1960,
    firstTestName: 'Gerboise Bleue, Reggane, Algeria',
    stockpileTrend: 'stable',
    notes: 'Independent nuclear deterrent outside NATO integrated command. Operates submarine-launched ballistic missiles (SLBM) and air-launched cruise missiles. Retired land-based systems.',
    color: '#f59e0b',
    lat: 46.5,
    lng: 2.5,
    sources: [
      { name: 'SIPRI Yearbook 2023', url: 'https://www.sipri.org/yearbook/2023', type: 'official' },
    ],
  },
  {
    id: 'china',
    country: 'China',
    region: 'Asia',
    flag: '🇨🇳',
    totalWarheads: 410,
    deployedStrategic: 0, // China traditionally does not keep warheads on alert
    deployedNonStrategic: 0,
    reserve: 410,
    retired: 0,
    nptStatus: 'NPT Nuclear Weapon State',
    firstTest: 1964,
    firstTestName: 'Test No. 596, Lop Nur, Xinjiang',
    stockpileTrend: 'increasing',
    notes: 'Fastest-growing nuclear arsenal among recognized nuclear states. Historically maintained relatively small stockpile with "no first use" policy. Significant modernization underway. Estimates vary considerably.',
    color: '#10b981',
    lat: 35.0,
    lng: 103.0,
    sources: [
      { name: 'SIPRI Yearbook 2023', url: 'https://www.sipri.org/yearbook/2023', type: 'official' },
      { name: 'FAS Nuclear Notebook', url: 'https://fas.org/issues/nuclear-weapons/status-world-nuclear-forces/', type: 'official' },
    ],
  },
  {
    id: 'india',
    country: 'India',
    region: 'South Asia',
    flag: '🇮🇳',
    totalWarheads: 164,
    deployedStrategic: 0,
    deployedNonStrategic: 0,
    reserve: 164,
    retired: 0,
    nptStatus: 'Non-NPT (never joined)',
    firstTest: 1974,
    firstTestName: 'Smiling Buddha, Pokhran, Rajasthan',
    stockpileTrend: 'increasing',
    notes: 'Not a signatory to the NPT. Declared "no first use" policy. Developing a nuclear triad (land, sea, air). First test in 1974 was described as "peaceful." Second series of tests in 1998.',
    color: '#f97316',
    lat: 20.0,
    lng: 78.0,
    sources: [
      { name: 'SIPRI Yearbook 2023', url: 'https://www.sipri.org/yearbook/2023', type: 'official' },
      { name: 'FAS Nuclear Notebook', url: 'https://fas.org/issues/nuclear-weapons/status-world-nuclear-forces/', type: 'official' },
    ],
  },
  {
    id: 'pakistan',
    country: 'Pakistan',
    region: 'South Asia',
    flag: '🇵🇰',
    totalWarheads: 170,
    deployedStrategic: 0,
    deployedNonStrategic: 0,
    reserve: 170,
    retired: 0,
    nptStatus: 'Non-NPT (never joined)',
    firstTest: 1998,
    firstTestName: 'Chagai-I, Balochistan',
    stockpileTrend: 'increasing',
    notes: 'Not a signatory to the NPT. Tested nuclear devices in 1998 in response to Indian tests. Developing tactical (short-range) nuclear weapons. Emphasis on deterring India.',
    color: '#06b6d4',
    lat: 30.5,
    lng: 70.0,
    sources: [
      { name: 'SIPRI Yearbook 2023', url: 'https://www.sipri.org/yearbook/2023', type: 'official' },
    ],
  },
  {
    id: 'israel',
    country: 'Israel',
    region: 'Middle East',
    flag: '🇮🇱',
    totalWarheads: 90,
    deployedStrategic: 0,
    deployedNonStrategic: 0,
    reserve: 90,
    retired: 0,
    nptStatus: 'Non-NPT (never joined)',
    firstTest: null, // has never officially conducted a test
    firstTestName: null,
    stockpileTrend: 'stable',
    notes: 'Maintains a policy of "nuclear opacity" — neither confirming nor denying possession. Generally assumed to possess nuclear weapons by independent analysts. Has never conducted an officially declared test. Not a signatory to the NPT.',
    color: '#a78bfa',
    lat: 31.5,
    lng: 35.0,
    sources: [
      { name: 'SIPRI Yearbook 2023', url: 'https://www.sipri.org/yearbook/2023', type: 'official' },
      { name: 'FAS Nuclear Notebook', url: 'https://fas.org/issues/nuclear-weapons/status-world-nuclear-forces/', type: 'official' },
    ],
  },
  {
    id: 'north_korea',
    country: 'North Korea',
    region: 'East Asia',
    flag: '🇰🇵',
    totalWarheads: 40, // estimates range 40–50
    deployedStrategic: 0,
    deployedNonStrategic: 0,
    reserve: 40,
    retired: 0,
    nptStatus: 'Withdrew from NPT (2003)',
    firstTest: 2006,
    firstTestName: 'Test No. 1, Punggye-ri',
    stockpileTrend: 'increasing',
    notes: 'Conducted six nuclear tests (2006–2017). Withdrew from NPT in 2003. Estimates of warhead numbers are highly uncertain; fissile material production ongoing. Developing ICBMs and submarine-launched ballistic missiles.',
    color: '#ec4899',
    lat: 40.0,
    lng: 127.0,
    sources: [
      { name: 'SIPRI Yearbook 2023', url: 'https://www.sipri.org/yearbook/2023', type: 'official' },
      { name: 'FAS Nuclear Notebook', url: 'https://fas.org/issues/nuclear-weapons/status-world-nuclear-forces/', type: 'official' },
    ],
  },
];

// Summary statistics derived from data
export const arsenalSummary = {
  totalGlobalWarheads: arsenalData.reduce((s, c) => s + c.totalWarheads, 0),
  nuclearArmedStates: arsenalData.length,
  nptRecognized: arsenalData.filter(c => c.nptStatus.startsWith('NPT Nuclear')).length,
  nonNpt: arsenalData.filter(c => !c.nptStatus.startsWith('NPT Nuclear')).length,
};

export default arsenalData;
