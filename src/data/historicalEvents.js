/**
 * Global Nuclear Infrastructure Atlas – Historical Nuclear Events Dataset
 *
 * DATA POLICY: Officially published public information only.
 * This layer is CLEARLY SEPARATED from civilian nuclear infrastructure.
 * Educational framing only. No weapon design, operational, or yield engineering detail.
 * Strictly public historical record from reputable academic and governmental sources.
 *
 * PURPOSE: To help users understand the historical background of nuclear technology
 * and nuclear violence in a factual, educational, non-sensational manner.
 */

export const historicalEvents = [
  {
    id: 'hiroshima-1945',
    name: 'Hiroshima – Atomic Bombing (6 August 1945)',
    country: 'Japan',
    region: 'East Asia',
    lat: 34.3955,
    lng: 132.4536,
    category: 'historical_event',
    status: 'historical',
    classification: 'historical_event',
    eventType: 'use_of_nuclear_weapon',
    eventDate: '1945-08-06',
    image: null,
    overview: `On 6 August 1945, the United States dropped an atomic bomb, known as "Little Boy," 
    on the city of Hiroshima, Japan. This was the first use of a nuclear weapon in warfare. 
    The explosion and its immediate and long-term effects caused enormous loss of life and 
    fundamentally changed the nature of international relations, arms control, and nuclear policy. 
    Hiroshima Peace Memorial City is today a UNESCO World Heritage site dedicated to peace 
    and the elimination of nuclear weapons.`,
    historicalContext: `The bombing occurred during the final phase of World War II in the Pacific. 
    The historical debate around the decision to use atomic weapons is extensively documented in 
    academic and governmental records. The bombings of Hiroshima and Nagasaki, combined with 
    the Soviet declaration of war against Japan, led to Japan's surrender on 15 August 1945.`,
    consequences: `Approximately 70,000–80,000 people died immediately. Total deaths attributed to 
    the bombing by the end of 1945 are estimated at 90,000–166,000 by various historical sources 
    (Japanese government and academic estimates vary). Hibakusha (atomic bomb survivors) experienced 
    long-term health consequences including elevated cancer rates, documented by the Radiation 
    Effects Research Foundation (RERF), a joint US-Japanese research institution.`,
    currentMemorial: `Hiroshima Peace Memorial (Genbaku Dome), the UNESCO World Heritage Site, 
    is preserved at the hypocenter area. The Hiroshima Peace Memorial Museum provides educational 
    exhibits based on documented survivor testimony and historical records. Annual commemoration 
    ceremony on 6 August attended by Japanese and international officials.`,
    sources: [
      { name: 'Hiroshima Peace Memorial Museum', url: 'https://hpmmuseum.jp/?lang=eng', type: 'official' },
      { name: 'Radiation Effects Research Foundation (RERF)', url: 'https://www.rerf.or.jp/en/', type: 'official' },
      { name: 'UNESCO – Hiroshima Peace Memorial', url: 'https://whc.unesco.org/en/list/775/', type: 'official' },
    ],
    sourceType: 'official',
    officialSource: true,
    lastUpdated: '2024-01-01',
  },
  {
    id: 'nagasaki-1945',
    name: 'Nagasaki – Atomic Bombing (9 August 1945)',
    country: 'Japan',
    region: 'East Asia',
    lat: 32.7767,
    lng: 129.8672,
    category: 'historical_event',
    status: 'historical',
    classification: 'historical_event',
    eventType: 'use_of_nuclear_weapon',
    eventDate: '1945-08-09',
    image: null,
    overview: `On 9 August 1945, three days after the Hiroshima bombing, the United States dropped 
    a second atomic bomb, "Fat Man," on the city of Nagasaki, Japan. This was the second and, 
    to date, final use of nuclear weapons in warfare. Nagasaki was partially protected from the 
    full blast effect by the surrounding hills, but the destruction and casualties were nonetheless 
    catastrophic. The Nagasaki Atomic Bomb Museum and National Peace Memorial Hall preserve 
    the historical record and promote peace education.`,
    historicalContext: `The original target for 9 August was Kokura, but cloud cover led to 
    the selection of Nagasaki as the secondary target. The bombing combined with the Hiroshima 
    attack and the Soviet entry into the Pacific War accelerated Japan's decision to surrender.`,
    consequences: `Approximately 40,000 people died immediately. Total deaths by end of 1945 
    are estimated at 60,000–80,000 by various historical sources. Long-term health effects 
    on survivors (hibakusha) were documented by the Radiation Effects Research Foundation (RERF).`,
    currentMemorial: `The Nagasaki Atomic Bomb Museum and the National Peace Memorial Hall for the 
    Atomic Bomb Victims are located at the Peace Park. Annual commemoration ceremony on 9 August. 
    The hypocenter is marked by a black stone column.`,
    sources: [
      { name: 'Nagasaki Atomic Bomb Museum', url: 'https://nabmuseum.jp/english/', type: 'official' },
      { name: 'Radiation Effects Research Foundation (RERF)', url: 'https://www.rerf.or.jp/en/', type: 'official' },
      { name: 'City of Nagasaki – Peace', url: 'https://www.city.nagasaki.lg.jp/peace/english/', type: 'official' },
    ],
    sourceType: 'official',
    officialSource: true,
    lastUpdated: '2024-01-01',
  },
  {
    id: 'trinity-1945',
    name: 'Trinity Test Site (First Nuclear Test, 16 July 1945)',
    country: 'United States',
    region: 'North America',
    lat: 33.6773,
    lng: -106.4754,
    category: 'historical_event',
    status: 'historical',
    classification: 'historical_event',
    eventType: 'nuclear_test',
    eventDate: '1945-07-16',
    image: null,
    overview: `The Trinity test, conducted on 16 July 1945 in the Jornada del Muerto desert 
    in New Mexico, United States, was the world's first nuclear weapons test. It was part of 
    the Manhattan Project. The test proved the feasibility of an implosion-type nuclear device. 
    The Trinity test site is now part of the White Sands Missile Range and is a US National 
    Historic Landmark, open for public visits on two annual dates.`,
    historicalContext: `The Manhattan Project was the US-led scientific and engineering programme 
    that developed the first nuclear weapons during World War II. The Trinity test marked the 
    beginning of the nuclear age. The site and its historical significance are extensively 
    documented in publicly available US National Archives and Department of Energy records.`,
    consequences: `No civilian casualties from the test itself. The test site and surrounding 
    areas received radioactive fallout. Some historical community health concerns have been 
    documented by researchers and are under ongoing historical and epidemiological review. 
    Congress passed the Radiation Exposure Compensation Act (RECA) covering some downwinder populations.`,
    currentMemorial: `Trinity Site is a US National Historic Landmark designated in 1975. 
    It is located within White Sands Missile Range and is open to the public twice per year 
    (first Saturday of April and October). The National Park Service and US Army manage public access.`,
    sources: [
      { name: 'US Department of Energy – Trinity', url: 'https://www.energy.gov/ne/nuclear-energy-history', type: 'official' },
      { name: 'US National Park Service – Manhattan Project', url: 'https://www.nps.gov/mapr/index.htm', type: 'official' },
      { name: 'White Sands Missile Range – Trinity Site', url: 'https://www.wsmr.army.mil/Trinity/Pages/Home.aspx', type: 'official' },
    ],
    sourceType: 'official',
    officialSource: true,
    lastUpdated: '2024-01-01',
  },
  {
    id: 'bikini-atoll',
    name: 'Bikini Atoll Nuclear Test Site',
    country: 'Marshall Islands',
    region: 'Pacific',
    lat: 11.5667,
    lng: 165.3833,
    category: 'historical_event',
    status: 'historical',
    classification: 'historical_event',
    eventType: 'nuclear_test_series',
    eventDate: '1946-07-01',
    image: null,
    overview: `Bikini Atoll in the Marshall Islands was used by the United States for nuclear 
    weapons testing between 1946 and 1958 (Operation Crossroads, Castle, and others). 
    A total of 23 nuclear devices were detonated at or near Bikini Atoll during this period. 
    The most powerful was Castle Bravo (1 March 1954), which had a yield significantly larger 
    than expected and caused widespread radioactive fallout affecting Marshall Islands communities 
    and a Japanese fishing vessel. Bikini Atoll is a UNESCO World Heritage Site (2010) 
    as a "testament to the nuclear age."`,
    historicalContext: `The 167 Bikini Atoll residents (Bikinians) were relocated before the tests 
    began. Castle Bravo's fallout exposed Marshall Islanders on Rongelap and Utirik Atolls to 
    radioactive contamination; residents were evacuated. The US government has documented 
    these events extensively. The Nuclear Claims Tribunal has adjudicated related claims.`,
    consequences: `Severe environmental contamination of Bikini Atoll. Marshall Islands communities 
    displaced; some health effects documented in exposed populations. Castle Bravo fallout affected 
    the Japanese fishing vessel Daigo Fukuryu Maru; one crewmember died. The Nuclear Claims 
    Tribunal awarded compensation to Marshall Islanders; political resolution remains ongoing.`,
    currentMemorial: `Bikini Atoll is a UNESCO World Heritage Site (2010). The former test site 
    remains contaminated; the International Atomic Energy Agency and Marshall Islands government 
    have assessed residual contamination levels. Limited controlled visits are permitted.`,
    sources: [
      { name: 'UNESCO – Bikini Atoll World Heritage', url: 'https://whc.unesco.org/en/list/1339/', type: 'official' },
      { name: 'US DOE – Marshall Islands Documents', url: 'https://www.energy.gov/lm/services/sites-with-completed-remedial-activities/marshall-islands', type: 'official' },
      { name: 'IAEA – Bikini Radiological Situation', url: 'https://www.iaea.org/', type: 'official' },
    ],
    sourceType: 'official',
    officialSource: true,
    lastUpdated: '2024-01-01',
  },
  {
    id: 'semipalatinsk',
    name: 'Semipalatinsk Nuclear Test Site',
    country: 'Kazakhstan',
    region: 'Central Asia',
    lat: 50.0736,
    lng: 78.7152,
    category: 'historical_event',
    status: 'historical',
    classification: 'historical_event',
    eventType: 'nuclear_test_series',
    eventDate: '1949-08-29',
    image: null,
    overview: `The Semipalatinsk Nuclear Test Site (SNTS), known as "The Polygon," was the 
    primary Soviet nuclear testing ground, located in what is now northeastern Kazakhstan. 
    456 nuclear tests were conducted at the site between 1949 and 1989. The Soviet Union's 
    first nuclear device was tested here on 29 August 1949. Kazakhstan declared itself 
    a non-nuclear weapons state after independence in 1991 and renounced the Soviet nuclear 
    arsenal. President Nazarbayev ordered the closure of the test site in August 1991. 
    Kazakhstan has become a significant advocate for nuclear non-proliferation.`,
    historicalContext: `The Semipalatinsk site conducted a large number of atmospheric tests 
    before the 1963 Partial Test Ban Treaty, and subsequently underground tests. Local Kazakh 
    communities in the surrounding region were exposed to radioactive fallout from atmospheric 
    tests without systematic health protection measures, as documented by Soviet and post-Soviet 
    research.`,
    consequences: `Documented health effects on local populations exposed to nuclear fallout, 
    studied by the UNSCEAR, the IAEA, and Kazakh medical research institutions. Kazakhstan 
    permanently closed the test site in 1991 and has been internationally recognized as a 
    model for voluntary nuclear disarmament. Remediation research is ongoing.`,
    currentMemorial: `The National Nuclear Center of Kazakhstan (NNC) monitors the site and 
    conducts scientific research. The site has been subject to IAEA technical cooperation 
    for environmental assessment. Kazakhstan established the ATOM Project 
    (Abolish Testing – Our Mission) as an international advocacy initiative.`,
    sources: [
      { name: 'National Nuclear Center of Kazakhstan', url: 'https://www.nnc.kz/en', type: 'official' },
      { name: 'IAEA – Kazakhstan Technical Cooperation', url: 'https://www.iaea.org/', type: 'official' },
      { name: 'ATOM Project (Kazakhstan)', url: 'https://www.theatomproject.org/', type: 'official' },
    ],
    sourceType: 'official',
    officialSource: true,
    lastUpdated: '2024-01-01',
  },
];

export default historicalEvents;
