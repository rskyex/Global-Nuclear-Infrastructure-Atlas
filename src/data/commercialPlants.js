/**
 * Global Nuclear Infrastructure Atlas – Commercial Nuclear Power Plants
 *
 * SOURCE: IAEA Power Reactor Information System (PRIS), national regulators,
 * operator public disclosures. All data is publicly available.
 * Reference: https://pris.iaea.org/
 *
 * SCOPE: Civilian commercial nuclear power plant sites only.
 * Unit-level detail is summarised at site level; reactor unit detail
 * appears in the detail panel.
 *
 * STATUS VALUES:
 *   operating         – in commercial operation per latest public reporting
 *   under_construction – under construction per latest public reporting
 *   shutdown          – permanently shut / decommissioned per latest public reporting
 *   suspended         – long-term outage / cold shutdown per latest public reporting
 *   planned           – approved, not yet under construction
 *
 * TODO: Replace with live IAEA PRIS API pull when public endpoint is available.
 * IAEA PRIS: https://pris.iaea.org/api/  (check for public endpoints)
 */

export const PLANT_STATUSES = {
  OPERATING: 'operating',
  UNDER_CONSTRUCTION: 'under_construction',
  SHUTDOWN: 'shutdown',
  SUSPENDED: 'suspended',
  PLANNED: 'planned',
};

export const commercialPlants = [

  // ─── UNITED STATES ───────────────────────────────────────────────────────────
  {
    id: 'us-palo-verde', name: 'Palo Verde Nuclear Generating Station',
    country: 'United States', region: 'North America', lat: 33.3878, lng: -112.8629,
    status: 'operating', reactorType: 'PWR (CE System 80)', units: 3, netCapacityMW: 3937,
    operator: 'Arizona Public Service (APS)', firstPower: 1986,
    overview: 'Largest US nuclear station by net output. Uses reclaimed municipal wastewater for cooling — unique globally. Three CE System 80 PWR units.',
    sources: [{ name: 'IAEA PRIS', url: 'https://pris.iaea.org/', type: 'official' }, { name: 'NRC – Palo Verde', url: 'https://www.nrc.gov/info-finder/reactors/pv1.html', type: 'official' }],
    lastUpdated: '2024-01-01',
  },
  {
    id: 'us-vogtle', name: 'Vogtle Electric Generating Plant',
    country: 'United States', region: 'North America', lat: 33.1406, lng: -81.7625,
    status: 'operating', reactorType: 'PWR (AP1000 Units 3–4; WH Units 1–2)', units: 4, netCapacityMW: 4580,
    operator: 'Georgia Power (Southern Nuclear)', firstPower: 1987,
    overview: 'Units 1–2 operating since late 1980s. Units 3–4 (AP1000, first new US reactors in 30+ years) achieved commercial operation in 2023–2024.',
    sources: [{ name: 'IAEA PRIS', url: 'https://pris.iaea.org/', type: 'official' }, { name: 'NRC – Vogtle', url: 'https://www.nrc.gov/', type: 'official' }],
    lastUpdated: '2024-01-01',
  },
  {
    id: 'us-south-texas', name: 'South Texas Project',
    country: 'United States', region: 'North America', lat: 28.7961, lng: -96.0494,
    status: 'operating', reactorType: 'PWR (CE)', units: 2, netCapacityMW: 2500,
    operator: 'NRG Energy / Austin Energy', firstPower: 1988,
    overview: 'Two-unit CE pressurized water reactor station on the Gulf Coast of Texas.',
    sources: [{ name: 'IAEA PRIS', url: 'https://pris.iaea.org/', type: 'official' }],
    lastUpdated: '2024-01-01',
  },
  {
    id: 'us-diablo-canyon', name: 'Diablo Canyon Power Plant',
    country: 'United States', region: 'North America', lat: 35.2113, lng: -120.8559,
    status: 'operating', reactorType: 'PWR (Westinghouse)', units: 2, netCapacityMW: 2256,
    operator: 'Pacific Gas & Electric (PG&E)', firstPower: 1985,
    overview: 'California\'s only operating nuclear station. Lifetime extended after initial plans for closure were reversed under state energy policy.',
    sources: [{ name: 'IAEA PRIS', url: 'https://pris.iaea.org/', type: 'official' }, { name: 'CPUC – Diablo Canyon', url: 'https://www.cpuc.ca.gov/', type: 'official' }],
    lastUpdated: '2024-01-01',
  },
  {
    id: 'us-peach-bottom', name: 'Peach Bottom Atomic Power Station',
    country: 'United States', region: 'North America', lat: 39.7582, lng: -76.2686,
    status: 'operating', reactorType: 'BWR (GE)', units: 2, netCapacityMW: 2380,
    operator: 'Constellation Energy / PSEG Nuclear', firstPower: 1974,
    overview: 'Two-unit GE boiling water reactor station in southern Pennsylvania.',
    sources: [{ name: 'IAEA PRIS', url: 'https://pris.iaea.org/', type: 'official' }],
    lastUpdated: '2024-01-01',
  },
  {
    id: 'us-braidwood', name: 'Braidwood Generating Station',
    country: 'United States', region: 'North America', lat: 41.2482, lng: -88.2281,
    status: 'operating', reactorType: 'PWR (Westinghouse)', units: 2, netCapacityMW: 2356,
    operator: 'Constellation Energy', firstPower: 1988,
    overview: 'Two-unit Westinghouse PWR station in northeastern Illinois.',
    sources: [{ name: 'IAEA PRIS', url: 'https://pris.iaea.org/', type: 'official' }],
    lastUpdated: '2024-01-01',
  },
  {
    id: 'us-comanche-peak', name: 'Comanche Peak Nuclear Power Plant',
    country: 'United States', region: 'North America', lat: 32.2983, lng: -97.7753,
    status: 'operating', reactorType: 'PWR (Westinghouse)', units: 2, netCapacityMW: 2430,
    operator: 'Luminant Generation / Vistra Energy', firstPower: 1990,
    overview: 'Two-unit PWR station in north-central Texas supplying the ERCOT grid.',
    sources: [{ name: 'IAEA PRIS', url: 'https://pris.iaea.org/', type: 'official' }],
    lastUpdated: '2024-01-01',
  },
  {
    id: 'us-watts-bar', name: 'Watts Bar Nuclear Plant',
    country: 'United States', region: 'North America', lat: 35.6033, lng: -84.7883,
    status: 'operating', reactorType: 'PWR (Westinghouse)', units: 2, netCapacityMW: 2525,
    operator: 'Tennessee Valley Authority (TVA)', firstPower: 1996,
    overview: 'TVA-owned two-unit plant. Unit 2 (2016) was the first new US commercial reactor since 1996. Unit 1 produces tritium for the US government.',
    sources: [{ name: 'IAEA PRIS', url: 'https://pris.iaea.org/', type: 'official' }, { name: 'TVA – Watts Bar', url: 'https://www.tva.com/', type: 'official' }],
    lastUpdated: '2024-01-01',
  },
  {
    id: 'us-browns-ferry', name: 'Browns Ferry Nuclear Plant',
    country: 'United States', region: 'North America', lat: 34.7036, lng: -87.1186,
    status: 'operating', reactorType: 'BWR (GE)', units: 3, netCapacityMW: 3294,
    operator: 'Tennessee Valley Authority (TVA)', firstPower: 1974,
    overview: 'Three-unit GE BWR station in northern Alabama. At the time of its completion, was the world\'s largest nuclear station by capacity.',
    sources: [{ name: 'IAEA PRIS', url: 'https://pris.iaea.org/', type: 'official' }],
    lastUpdated: '2024-01-01',
  },
  {
    id: 'us-calvert-cliffs', name: 'Calvert Cliffs Nuclear Power Plant',
    country: 'United States', region: 'North America', lat: 38.4314, lng: -76.4428,
    status: 'operating', reactorType: 'PWR (CE)', units: 2, netCapacityMW: 1761,
    operator: 'Constellation Energy', firstPower: 1975,
    overview: 'Two-unit CE PWR station on Chesapeake Bay, Maryland. One of the longest-operating plants in the US.',
    sources: [{ name: 'IAEA PRIS', url: 'https://pris.iaea.org/', type: 'official' }],
    lastUpdated: '2024-01-01',
  },
  {
    id: 'us-seabrook', name: 'Seabrook Station',
    country: 'United States', region: 'North America', lat: 42.8979, lng: -70.8497,
    status: 'operating', reactorType: 'PWR (Westinghouse)', units: 1, netCapacityMW: 1246,
    operator: 'NextEra Energy Seabrook', firstPower: 1990,
    overview: 'Single-unit Westinghouse PWR in New Hampshire. Supplies a significant share of New England\'s electricity.',
    sources: [{ name: 'IAEA PRIS', url: 'https://pris.iaea.org/', type: 'official' }],
    lastUpdated: '2024-01-01',
  },
  {
    id: 'us-millstone', name: 'Millstone Power Station',
    country: 'United States', region: 'North America', lat: 41.3077, lng: -72.1686,
    status: 'operating', reactorType: 'PWR (Combustion Engineering)', units: 2, netCapacityMW: 2076,
    operator: 'Dominion Energy', firstPower: 1975,
    overview: 'Connecticut\'s only nuclear station; two operating units. Millstone Unit 1 (BWR) permanently shut 1998.',
    sources: [{ name: 'IAEA PRIS', url: 'https://pris.iaea.org/', type: 'official' }],
    lastUpdated: '2024-01-01',
  },
  {
    id: 'us-north-anna', name: 'North Anna Power Station',
    country: 'United States', region: 'North America', lat: 38.0658, lng: -77.7883,
    status: 'operating', reactorType: 'PWR (Westinghouse)', units: 2, netCapacityMW: 1892,
    operator: 'Dominion Energy', firstPower: 1978,
    overview: 'Two-unit Westinghouse PWR station in central Virginia.',
    sources: [{ name: 'IAEA PRIS', url: 'https://pris.iaea.org/', type: 'official' }],
    lastUpdated: '2024-01-01',
  },
  {
    id: 'us-oconee', name: 'Oconee Nuclear Station',
    country: 'United States', region: 'North America', lat: 34.7922, lng: -82.8986,
    status: 'operating', reactorType: 'PWR (B&W)', units: 3, netCapacityMW: 2538,
    operator: 'Duke Energy', firstPower: 1973,
    overview: 'Three-unit Babcock & Wilcox PWR station in South Carolina, one of the most efficient US nuclear stations.',
    sources: [{ name: 'IAEA PRIS', url: 'https://pris.iaea.org/', type: 'official' }],
    lastUpdated: '2024-01-01',
  },
  {
    id: 'us-grand-gulf', name: 'Grand Gulf Nuclear Station',
    country: 'United States', region: 'North America', lat: 32.0075, lng: -91.0456,
    status: 'operating', reactorType: 'BWR (GE)', units: 1, netCapacityMW: 1432,
    operator: 'Entergy Nuclear', firstPower: 1985,
    overview: 'Single-unit GE BWR, one of the largest single-unit BWR stations in the US.',
    sources: [{ name: 'IAEA PRIS', url: 'https://pris.iaea.org/', type: 'official' }],
    lastUpdated: '2024-01-01',
  },
  {
    id: 'us-turkey-point', name: 'Turkey Point Nuclear Generating Station',
    country: 'United States', region: 'North America', lat: 25.4339, lng: -80.3317,
    status: 'operating', reactorType: 'PWR (Westinghouse)', units: 2, netCapacityMW: 1631,
    operator: 'Florida Power & Light (NextEra)', firstPower: 1972,
    overview: 'Two-unit Westinghouse PWR station south of Miami, Florida. NRC approved license extension to 80 years.',
    sources: [{ name: 'IAEA PRIS', url: 'https://pris.iaea.org/', type: 'official' }],
    lastUpdated: '2024-01-01',
  },
  {
    id: 'us-columbia', name: 'Columbia Generating Station',
    country: 'United States', region: 'North America', lat: 46.4747, lng: -119.3253,
    status: 'operating', reactorType: 'BWR (GE)', units: 1, netCapacityMW: 1207,
    operator: 'Energy Northwest', firstPower: 1984,
    overview: 'Washington state\'s only commercial nuclear plant; BWR supplying Pacific Northwest grid.',
    sources: [{ name: 'IAEA PRIS', url: 'https://pris.iaea.org/', type: 'official' }],
    lastUpdated: '2024-01-01',
  },
  {
    id: 'us-indian-point', name: 'Indian Point Energy Center',
    country: 'United States', region: 'North America', lat: 41.2719, lng: -73.9525,
    status: 'shutdown', reactorType: 'PWR (Westinghouse)', units: 3, netCapacityMW: 0,
    operator: 'Holtec International (decommissioning)', firstPower: 1962,
    overview: 'Indian Point Units 2 and 3 permanently shut in 2021. Site in decommissioning. Historically supplied ~25% of New York City metropolitan area electricity.',
    sources: [{ name: 'IAEA PRIS', url: 'https://pris.iaea.org/', type: 'official' }, { name: 'NRC – Indian Point', url: 'https://www.nrc.gov/', type: 'official' }],
    lastUpdated: '2024-01-01',
  },
  {
    id: 'us-three-mile-island', name: 'Three Mile Island (Crane Clean Energy Center)',
    country: 'United States', region: 'North America', lat: 40.1529, lng: -76.7252,
    status: 'operating', reactorType: 'PWR (B&W)', units: 1, netCapacityMW: 858,
    operator: 'Constellation Energy', firstPower: 1974,
    overview: 'TMI Unit 1 restarted September 2023 under a PPA with Microsoft. TMI Unit 2 (1979 accident unit) remains in SAFSTOR decommissioning.',
    sources: [{ name: 'IAEA PRIS', url: 'https://pris.iaea.org/', type: 'official' }, { name: 'NRC – TMI', url: 'https://www.nrc.gov/', type: 'official' }],
    lastUpdated: '2024-01-01',
  },
  {
    id: 'us-san-onofre', name: 'San Onofre Nuclear Generating Station',
    country: 'United States', region: 'North America', lat: 33.3681, lng: -117.5564,
    status: 'shutdown', reactorType: 'PWR (CE)', units: 3, netCapacityMW: 0,
    operator: 'Southern California Edison (Holtec – decommissioning)', firstPower: 1968,
    overview: 'Units 2 and 3 permanently shut in 2013 following steam generator tube degradation issues. Full decommissioning underway.',
    sources: [{ name: 'IAEA PRIS', url: 'https://pris.iaea.org/', type: 'official' }],
    lastUpdated: '2024-01-01',
  },

  // ─── FRANCE ──────────────────────────────────────────────────────────────────
  {
    id: 'fr-gravelines', name: 'Gravelines Nuclear Power Plant',
    country: 'France', region: 'Western Europe', lat: 50.9517, lng: 2.1347,
    status: 'operating', reactorType: 'PWR (900 MWe class)', units: 6, netCapacityMW: 5460,
    operator: 'EDF', firstPower: 1980,
    overview: 'Largest nuclear power plant in Western Europe by capacity. Six 900 MWe PWR units on the English Channel coast.',
    sources: [{ name: 'IAEA PRIS', url: 'https://pris.iaea.org/', type: 'official' }, { name: 'EDF', url: 'https://www.edf.fr/', type: 'official' }],
    lastUpdated: '2024-01-01',
  },
  {
    id: 'fr-cattenom', name: 'Cattenom Nuclear Power Plant',
    country: 'France', region: 'Western Europe', lat: 49.4017, lng: 6.2197,
    status: 'operating', reactorType: 'PWR (1300 MWe class)', units: 4, netCapacityMW: 5200,
    operator: 'EDF', firstPower: 1986,
    overview: 'Four-unit 1300 MWe PWR station near the borders of Luxembourg, Germany, and Belgium.',
    sources: [{ name: 'IAEA PRIS', url: 'https://pris.iaea.org/', type: 'official' }],
    lastUpdated: '2024-01-01',
  },
  {
    id: 'fr-paluel', name: 'Paluel Nuclear Power Plant',
    country: 'France', region: 'Western Europe', lat: 49.8617, lng: 0.6336,
    status: 'operating', reactorType: 'PWR (1300 MWe class)', units: 4, netCapacityMW: 5320,
    operator: 'EDF', firstPower: 1985,
    overview: 'Four-unit 1300 MWe PWR station on the Normandy coast.',
    sources: [{ name: 'IAEA PRIS', url: 'https://pris.iaea.org/', type: 'official' }],
    lastUpdated: '2024-01-01',
  },
  {
    id: 'fr-flamanville', name: 'Flamanville Nuclear Power Plant',
    country: 'France', region: 'Western Europe', lat: 49.5244, lng: -1.8803,
    status: 'operating', reactorType: 'PWR (1300 MWe) + EPR (Unit 3)', units: 3, netCapacityMW: 4900,
    operator: 'EDF', firstPower: 1986,
    overview: 'Units 1–2 (1300 MWe) operating. Unit 3 is the Flamanville 3 EPR — Europe\'s second Generation III+ reactor, entering commercial operation ca. 2024 after significant delays.',
    sources: [{ name: 'IAEA PRIS', url: 'https://pris.iaea.org/', type: 'official' }, { name: 'ASN – Flamanville', url: 'https://www.asn.fr/', type: 'official' }],
    lastUpdated: '2024-01-01',
  },
  {
    id: 'fr-chinon', name: 'Chinon Nuclear Power Plant',
    country: 'France', region: 'Western Europe', lat: 47.2378, lng: 0.1700,
    status: 'operating', reactorType: 'PWR (900 MWe class)', units: 4, netCapacityMW: 3620,
    operator: 'EDF', firstPower: 1983,
    overview: 'Four 900 MWe PWR units on the Loire River in Indre-et-Loire.',
    sources: [{ name: 'IAEA PRIS', url: 'https://pris.iaea.org/', type: 'official' }],
    lastUpdated: '2024-01-01',
  },
  {
    id: 'fr-blayais', name: 'Blayais Nuclear Power Plant',
    country: 'France', region: 'Western Europe', lat: 45.2544, lng: -0.6881,
    status: 'operating', reactorType: 'PWR (900 MWe class)', units: 4, netCapacityMW: 3780,
    operator: 'EDF', firstPower: 1981,
    overview: 'Four 900 MWe PWR units on the Gironde estuary.',
    sources: [{ name: 'IAEA PRIS', url: 'https://pris.iaea.org/', type: 'official' }],
    lastUpdated: '2024-01-01',
  },

  // ─── CHINA ───────────────────────────────────────────────────────────────────
  {
    id: 'cn-qinshan', name: 'Qinshan Nuclear Power Base',
    country: 'China', region: 'East Asia', lat: 30.4406, lng: 120.9594,
    status: 'operating', reactorType: 'PWR / CANDU / CNP (multiple types)', units: 9, netCapacityMW: 6600,
    operator: 'CNNC', firstPower: 1991,
    overview: 'China\'s first domestically designed commercial nuclear station and a multi-unit complex with nine units of various reactor types. Includes China\'s only CANDU-6 reactors.',
    sources: [{ name: 'IAEA PRIS', url: 'https://pris.iaea.org/', type: 'official' }],
    lastUpdated: '2024-01-01',
  },
  {
    id: 'cn-daya-bay', name: 'Daya Bay / Ling Ao Nuclear Power Plant',
    country: 'China', region: 'East Asia', lat: 22.5997, lng: 114.5456,
    status: 'operating', reactorType: 'PWR (M310 / ACPR-1000)', units: 6, netCapacityMW: 5982,
    operator: 'CGNPC', firstPower: 1994,
    overview: 'China\'s first large-scale commercial nuclear station; joint development with France. Supplies electricity to Guangdong and Hong Kong.',
    sources: [{ name: 'IAEA PRIS', url: 'https://pris.iaea.org/', type: 'official' }],
    lastUpdated: '2024-01-01',
  },
  {
    id: 'cn-tianwan', name: 'Tianwan Nuclear Power Station',
    country: 'China', region: 'East Asia', lat: 34.6844, lng: 119.4672,
    status: 'operating', reactorType: 'VVER-1000 / VVER-1200', units: 6, netCapacityMW: 6400,
    operator: 'JNPC (Jiangsu Nuclear Power Corporation)', firstPower: 2007,
    overview: 'Six Russian-designed VVER reactor units in Jiangsu. Additional units under construction. One of the largest nuclear sites in China.',
    sources: [{ name: 'IAEA PRIS', url: 'https://pris.iaea.org/', type: 'official' }],
    lastUpdated: '2024-01-01',
  },
  {
    id: 'cn-hongyanhe', name: 'Hongyanhe Nuclear Power Plant',
    country: 'China', region: 'East Asia', lat: 39.7975, lng: 121.4994,
    status: 'operating', reactorType: 'PWR (ACPR-1000)', units: 6, netCapacityMW: 6090,
    operator: 'CGNPC / CNNC', firstPower: 2013,
    overview: 'Six-unit ACPR-1000 pressurized water reactor station in Liaoning Province — northeastern China.',
    sources: [{ name: 'IAEA PRIS', url: 'https://pris.iaea.org/', type: 'official' }],
    lastUpdated: '2024-01-01',
  },
  {
    id: 'cn-yangjiang', name: 'Yangjiang Nuclear Power Plant',
    country: 'China', region: 'East Asia', lat: 21.7233, lng: 111.6167,
    status: 'operating', reactorType: 'PWR (CPR-1000 / ACPR-1000)', units: 6, netCapacityMW: 6120,
    operator: 'CGNPC', firstPower: 2014,
    overview: 'Six-unit station in Guangdong Province, all CPR/ACPR-1000 type.',
    sources: [{ name: 'IAEA PRIS', url: 'https://pris.iaea.org/', type: 'official' }],
    lastUpdated: '2024-01-01',
  },
  {
    id: 'cn-taishan', name: 'Taishan Nuclear Power Plant',
    country: 'China', region: 'East Asia', lat: 21.9756, lng: 112.7203,
    status: 'operating', reactorType: 'EPR (1750 MWe)', units: 2, netCapacityMW: 3466,
    operator: 'TNPJVC (CGN / EDF joint venture)', firstPower: 2018,
    overview: 'World\'s first operational EPR reactors. Two units of the European Pressurized Reactor design in Guangdong Province.',
    sources: [{ name: 'IAEA PRIS', url: 'https://pris.iaea.org/', type: 'official' }],
    lastUpdated: '2024-01-01',
  },

  // ─── RUSSIA ───────────────────────────────────────────────────────────────────
  {
    id: 'ru-balakovo', name: 'Balakovo Nuclear Power Plant',
    country: 'Russia', region: 'Eastern Europe', lat: 52.0994, lng: 47.9225,
    status: 'operating', reactorType: 'VVER-1000', units: 4, netCapacityMW: 4000,
    operator: 'Rosenergoatom', firstPower: 1985,
    overview: 'Four-unit VVER-1000 station in the Saratov region. Russia\'s most productive nuclear power plant by annual generation.',
    sources: [{ name: 'IAEA PRIS', url: 'https://pris.iaea.org/', type: 'official' }],
    lastUpdated: '2024-01-01',
  },
  {
    id: 'ru-leningrad', name: 'Leningrad Nuclear Power Plant',
    country: 'Russia', region: 'Eastern Europe', lat: 59.8378, lng: 29.0536,
    status: 'operating', reactorType: 'RBMK-1000 (Units 1–2, being decommissioned) / VVER-1200 (Units 3–4)', units: 4, netCapacityMW: 4600,
    operator: 'Rosenergoatom', firstPower: 1973,
    overview: 'Historic site supplying St. Petersburg. Original RBMK units being phased out; new VVER-1200 units (Leningrad II) have commenced operation.',
    sources: [{ name: 'IAEA PRIS', url: 'https://pris.iaea.org/', type: 'official' }],
    lastUpdated: '2024-01-01',
  },
  {
    id: 'ru-kalinin', name: 'Kalinin Nuclear Power Plant',
    country: 'Russia', region: 'Eastern Europe', lat: 57.8811, lng: 35.1811,
    status: 'operating', reactorType: 'VVER-1000', units: 4, netCapacityMW: 4000,
    operator: 'Rosenergoatom', firstPower: 1984,
    overview: 'Four-unit VVER-1000 station in Tver Oblast, supplying Moscow and surrounding regions.',
    sources: [{ name: 'IAEA PRIS', url: 'https://pris.iaea.org/', type: 'official' }],
    lastUpdated: '2024-01-01',
  },
  {
    id: 'ru-smolensk', name: 'Smolensk Nuclear Power Plant',
    country: 'Russia', region: 'Eastern Europe', lat: 54.1656, lng: 32.8769,
    status: 'operating', reactorType: 'RBMK-1000', units: 3, netCapacityMW: 3000,
    operator: 'Rosenergoatom', firstPower: 1982,
    overview: 'Three-unit RBMK-1000 station. Same channel reactor type as Chernobyl; design substantially modified after 1986.',
    sources: [{ name: 'IAEA PRIS', url: 'https://pris.iaea.org/', type: 'official' }],
    lastUpdated: '2024-01-01',
  },
  {
    id: 'ru-beloyarsk', name: 'Beloyarsk Nuclear Power Plant',
    country: 'Russia', region: 'Eastern Europe', lat: 56.8392, lng: 61.3889,
    status: 'operating', reactorType: 'BN-800 Fast Neutron / AMB (shutdown) / BN-1200 (planned)', units: 2, netCapacityMW: 1200,
    operator: 'Rosenergoatom', firstPower: 1964,
    overview: 'Home to Russia\'s BN-800 commercial fast neutron reactor — one of the world\'s few operating fast reactors. Historically significant in fast reactor development.',
    sources: [{ name: 'IAEA PRIS', url: 'https://pris.iaea.org/', type: 'official' }],
    lastUpdated: '2024-01-01',
  },

  // ─── SOUTH KOREA ─────────────────────────────────────────────────────────────
  {
    id: 'kr-kori', name: 'Kori / Shin-Kori Nuclear Power Plant',
    country: 'South Korea', region: 'East Asia', lat: 35.3233, lng: 129.2964,
    status: 'operating', reactorType: 'PWR (various – OPR-1000, APR-1400, WH)', units: 8, netCapacityMW: 8000,
    operator: 'KEPCO / Korea Hydro & Nuclear Power', firstPower: 1978,
    overview: 'Largest nuclear station cluster in South Korea. Kori Unit 1 (1978) permanently shutdown 2017 — the first decommissioned Korean reactor. Shin-Kori includes new APR-1400 units.',
    sources: [{ name: 'IAEA PRIS', url: 'https://pris.iaea.org/', type: 'official' }],
    lastUpdated: '2024-01-01',
  },
  {
    id: 'kr-hanul', name: 'Hanul Nuclear Power Plant',
    country: 'South Korea', region: 'East Asia', lat: 37.0942, lng: 129.3850,
    status: 'operating', reactorType: 'PWR (OPR-1000 / APR-1400)', units: 6, netCapacityMW: 5900,
    operator: 'Korea Hydro & Nuclear Power', firstPower: 1988,
    overview: 'Six-unit station in North Gyeongsang Province. Mix of OPR-1000 and APR-1400 units.',
    sources: [{ name: 'IAEA PRIS', url: 'https://pris.iaea.org/', type: 'official' }],
    lastUpdated: '2024-01-01',
  },
  {
    id: 'kr-hanbit', name: 'Hanbit Nuclear Power Plant',
    country: 'South Korea', region: 'East Asia', lat: 35.4175, lng: 126.4125,
    status: 'operating', reactorType: 'PWR (WH / OPR-1000)', units: 6, netCapacityMW: 5900,
    operator: 'Korea Hydro & Nuclear Power', firstPower: 1986,
    overview: 'Six-unit Westinghouse/OPR-1000 station on the Yellow Sea coast of South Jeolla Province.',
    sources: [{ name: 'IAEA PRIS', url: 'https://pris.iaea.org/', type: 'official' }],
    lastUpdated: '2024-01-01',
  },

  // ─── CANADA ───────────────────────────────────────────────────────────────────
  {
    id: 'ca-bruce', name: 'Bruce Nuclear Generating Station',
    country: 'Canada', region: 'North America', lat: 44.3261, lng: -81.5951,
    status: 'operating', reactorType: 'CANDU (PHWR)', units: 8, netCapacityMW: 6430,
    operator: 'Bruce Power', firstPower: 1977,
    overview: 'World\'s largest operating nuclear station by total capacity. Eight CANDU units on eastern Lake Huron shore.',
    sources: [{ name: 'IAEA PRIS', url: 'https://pris.iaea.org/', type: 'official' }, { name: 'Bruce Power', url: 'https://www.brucepower.com/', type: 'official' }],
    lastUpdated: '2024-01-01',
  },
  {
    id: 'ca-darlington', name: 'Darlington Nuclear Generating Station',
    country: 'Canada', region: 'North America', lat: 43.8747, lng: -78.7183,
    status: 'operating', reactorType: 'CANDU (PHWR)', units: 4, netCapacityMW: 3524,
    operator: 'Ontario Power Generation', firstPower: 1990,
    overview: 'Four-unit CANDU station east of Toronto. Major life-extension refurbishment underway. OPG also constructing SMR demonstration units on-site.',
    sources: [{ name: 'IAEA PRIS', url: 'https://pris.iaea.org/', type: 'official' }, { name: 'OPG', url: 'https://www.opg.com/', type: 'official' }],
    lastUpdated: '2024-01-01',
  },
  {
    id: 'ca-pickering', name: 'Pickering Nuclear Generating Station',
    country: 'Canada', region: 'North America', lat: 43.8083, lng: -79.0708,
    status: 'operating', reactorType: 'CANDU (PHWR)', units: 6, netCapacityMW: 3100,
    operator: 'Ontario Power Generation', firstPower: 1971,
    overview: 'Six-unit CANDU station east of Toronto. Four units in operation; two permanently shut. Operational life extended to support grid reliability.',
    sources: [{ name: 'IAEA PRIS', url: 'https://pris.iaea.org/', type: 'official' }],
    lastUpdated: '2024-01-01',
  },

  // ─── UNITED KINGDOM ───────────────────────────────────────────────────────────
  {
    id: 'gb-sizewell-b', name: 'Sizewell B Nuclear Power Station',
    country: 'United Kingdom', region: 'Western Europe', lat: 52.2144, lng: 1.6195,
    status: 'operating', reactorType: 'PWR (Westinghouse)', units: 1, netCapacityMW: 1198,
    operator: 'EDF Energy Nuclear Generation', firstPower: 1995,
    overview: 'UK\'s only operational PWR. EDF Energy operates the station; lifetime extension under discussion.',
    sources: [{ name: 'IAEA PRIS', url: 'https://pris.iaea.org/', type: 'official' }, { name: 'EDF Energy', url: 'https://www.edfenergy.com/', type: 'official' }],
    lastUpdated: '2024-01-01',
  },
  {
    id: 'gb-heysham', name: 'Heysham Nuclear Power Station',
    country: 'United Kingdom', region: 'Western Europe', lat: 54.0292, lng: -2.9194,
    status: 'operating', reactorType: 'AGR (Advanced Gas-cooled Reactor)', units: 4, netCapacityMW: 2400,
    operator: 'EDF Energy Nuclear Generation', firstPower: 1983,
    overview: 'Two separate AGR stations (Heysham 1 and 2) on the Lancashire coast. AGRs use carbon dioxide coolant and graphite moderator.',
    sources: [{ name: 'IAEA PRIS', url: 'https://pris.iaea.org/', type: 'official' }],
    lastUpdated: '2024-01-01',
  },
  {
    id: 'gb-torness', name: 'Torness Nuclear Power Station',
    country: 'United Kingdom', region: 'Western Europe', lat: 55.9664, lng: -2.4472,
    status: 'operating', reactorType: 'AGR', units: 2, netCapacityMW: 1205,
    operator: 'EDF Energy Nuclear Generation', firstPower: 1988,
    overview: 'Two-unit AGR station on the Scottish coast; one of Scotland\'s two nuclear stations.',
    sources: [{ name: 'IAEA PRIS', url: 'https://pris.iaea.org/', type: 'official' }],
    lastUpdated: '2024-01-01',
  },
  {
    id: 'gb-hinkley-c', name: 'Hinkley Point C',
    country: 'United Kingdom', region: 'Western Europe', lat: 51.2128, lng: -3.1308,
    status: 'under_construction', reactorType: 'EPR (1600 MWe)', units: 2, netCapacityMW: 3200,
    operator: 'EDF Energy / CGN (NNB Genco)', firstPower: null,
    overview: 'Two-unit EPR plant under construction in Somerset. First new UK nuclear station in decades; expected online mid-2020s. Subject to significant cost and schedule revisions.',
    sources: [{ name: 'EDF – Hinkley Point C', url: 'https://www.hinkleypointc.co.uk/', type: 'official' }, { name: 'ONR', url: 'https://www.onr.org.uk/', type: 'official' }],
    lastUpdated: '2024-01-01',
  },

  // ─── JAPAN ────────────────────────────────────────────────────────────────────
  {
    id: 'jp-sendai', name: 'Sendai Nuclear Power Plant',
    country: 'Japan', region: 'East Asia', lat: 31.8333, lng: 130.1900,
    status: 'operating', reactorType: 'PWR (Mitsubishi)', units: 2, netCapacityMW: 1780,
    operator: 'Kyushu Electric Power', firstPower: 1984,
    overview: 'First Japanese plant to restart after post-Fukushima new regulatory framework (2015). Two Mitsubishi PWR units in Kagoshima Prefecture.',
    sources: [{ name: 'IAEA PRIS', url: 'https://pris.iaea.org/', type: 'official' }, { name: 'NRA Japan', url: 'https://www.nra.go.jp/en/', type: 'official' }],
    lastUpdated: '2024-01-01',
  },
  {
    id: 'jp-genkai', name: 'Genkai Nuclear Power Plant',
    country: 'Japan', region: 'East Asia', lat: 33.5150, lng: 129.8319,
    status: 'operating', reactorType: 'PWR (Mitsubishi / Westinghouse)', units: 2, netCapacityMW: 1260,
    operator: 'Kyushu Electric Power', firstPower: 1975,
    overview: 'Two active units restarted under NRA post-Fukushima safety framework. Units 1–2 permanently shutdown.',
    sources: [{ name: 'IAEA PRIS', url: 'https://pris.iaea.org/', type: 'official' }],
    lastUpdated: '2024-01-01',
  },
  {
    id: 'jp-takahama', name: 'Takahama Nuclear Power Plant',
    country: 'Japan', region: 'East Asia', lat: 35.5269, lng: 135.5003,
    status: 'operating', reactorType: 'PWR (Mitsubishi)', units: 4, netCapacityMW: 3392,
    operator: 'Kansai Electric Power', firstPower: 1974,
    overview: 'Four-unit PWR in Fukui Prefecture. Units 3–4 have restarted; Units 1–2 among first old plants approved for 60-year operation.',
    sources: [{ name: 'IAEA PRIS', url: 'https://pris.iaea.org/', type: 'official' }],
    lastUpdated: '2024-01-01',
  },
  {
    id: 'jp-fukushima-daini', name: 'Fukushima Daini Nuclear Power Plant',
    country: 'Japan', region: 'East Asia', lat: 37.3167, lng: 141.0167,
    status: 'shutdown', reactorType: 'BWR (GE / Toshiba)', units: 4, netCapacityMW: 0,
    operator: 'Tokyo Electric Power Company (TEPCO)', firstPower: 1982,
    overview: 'Fukushima Daini (No. 2) plant, 12 km south of Fukushima Daiichi. All 4 units permanently shut down; decommissioning decided in 2019.',
    sources: [{ name: 'IAEA PRIS', url: 'https://pris.iaea.org/', type: 'official' }],
    lastUpdated: '2024-01-01',
  },

  // ─── INDIA ────────────────────────────────────────────────────────────────────
  {
    id: 'in-kudankulam', name: 'Kudankulam Nuclear Power Plant',
    country: 'India', region: 'South Asia', lat: 8.1728, lng: 77.7089,
    status: 'operating', reactorType: 'VVER-1000', units: 2, netCapacityMW: 2000,
    operator: 'Nuclear Power Corporation of India (NPCIL)', firstPower: 2013,
    overview: 'Two operating VVER-1000 units (Russian design) in Tamil Nadu. Additional units under construction. India\'s largest single nuclear station.',
    sources: [{ name: 'IAEA PRIS', url: 'https://pris.iaea.org/', type: 'official' }, { name: 'NPCIL', url: 'https://www.npcil.nic.in/', type: 'official' }],
    lastUpdated: '2024-01-01',
  },
  {
    id: 'in-tarapur', name: 'Tarapur Atomic Power Station',
    country: 'India', region: 'South Asia', lat: 19.8378, lng: 72.6714,
    status: 'operating', reactorType: 'BWR (Units 1–2) / PHWR (Units 3–4)', units: 4, netCapacityMW: 1400,
    operator: 'NPCIL', firstPower: 1969,
    overview: 'India\'s first commercial nuclear station. Units 1–2 are original GE BWRs (1969); Units 3–4 are PHWR designs.',
    sources: [{ name: 'IAEA PRIS', url: 'https://pris.iaea.org/', type: 'official' }],
    lastUpdated: '2024-01-01',
  },
  {
    id: 'in-rajasthan', name: 'Rajasthan Atomic Power Station',
    country: 'India', region: 'South Asia', lat: 24.8681, lng: 75.5836,
    status: 'operating', reactorType: 'PHWR (CANDU-derived)', units: 6, netCapacityMW: 1180,
    operator: 'NPCIL', firstPower: 1973,
    overview: 'Six PHWR units in Rajasthan. India\'s nuclear programme uses domestically evolved PHWR technology derived from early Canadian CANDU collaboration.',
    sources: [{ name: 'IAEA PRIS', url: 'https://pris.iaea.org/', type: 'official' }],
    lastUpdated: '2024-01-01',
  },

  // ─── UKRAINE ──────────────────────────────────────────────────────────────────
  {
    id: 'ua-zaporizhzhia', name: 'Zaporizhzhia Nuclear Power Plant',
    country: 'Ukraine', region: 'Eastern Europe', lat: 47.5097, lng: 34.5858,
    status: 'suspended', reactorType: 'VVER-1000', units: 6, netCapacityMW: 6000,
    operator: 'Energoatom', firstPower: 1984,
    overview: 'Europe\'s largest nuclear station. All six units in cold shutdown since 2022 due to conflict conditions. IAEA expert presence maintained. Publicly documented through regular IAEA reports.',
    sources: [{ name: 'IAEA – Zaporizhzhia Monitoring', url: 'https://www.iaea.org/topics/zaporizhzhia-nuclear-power-plant', type: 'official' }],
    lastUpdated: '2024-01-01',
  },
  {
    id: 'ua-rivne', name: 'Rivne Nuclear Power Plant',
    country: 'Ukraine', region: 'Eastern Europe', lat: 51.3511, lng: 25.8833,
    status: 'operating', reactorType: 'VVER-440 / VVER-1000', units: 4, netCapacityMW: 2835,
    operator: 'Energoatom', firstPower: 1980,
    overview: 'Four-unit mixed VVER station in western Ukraine. Operating as of latest public reporting.',
    sources: [{ name: 'IAEA PRIS', url: 'https://pris.iaea.org/', type: 'official' }],
    lastUpdated: '2024-01-01',
  },
  {
    id: 'ua-south-ukraine', name: 'South Ukraine Nuclear Power Plant',
    country: 'Ukraine', region: 'Eastern Europe', lat: 47.8333, lng: 31.1956,
    status: 'operating', reactorType: 'VVER-1000', units: 3, netCapacityMW: 2850,
    operator: 'Energoatom', firstPower: 1982,
    overview: 'Three-unit VVER-1000 station in Mykolaiv Oblast. Operating as of latest public reporting.',
    sources: [{ name: 'IAEA PRIS', url: 'https://pris.iaea.org/', type: 'official' }],
    lastUpdated: '2024-01-01',
  },

  // ─── FINLAND ──────────────────────────────────────────────────────────────────
  {
    id: 'fi-olkiluoto', name: 'Olkiluoto Nuclear Power Plant',
    country: 'Finland', region: 'Northern Europe', lat: 61.2353, lng: 21.4444,
    status: 'operating', reactorType: 'BWR (Units 1–2) / EPR (Unit 3)', units: 3, netCapacityMW: 2920,
    operator: 'Teollisuuden Voima (TVO)', firstPower: 1978,
    overview: 'OL3 (EPR, 1600 MWe) began commercial operation April 2023 — first new reactor in Western Europe in ~16 years and world\'s most powerful single reactor unit.',
    sources: [{ name: 'TVO', url: 'https://www.tvo.fi/en', type: 'official' }, { name: 'STUK', url: 'https://www.stuk.fi/en', type: 'official' }],
    lastUpdated: '2024-01-01',
  },
  {
    id: 'fi-loviisa', name: 'Loviisa Nuclear Power Plant',
    country: 'Finland', region: 'Northern Europe', lat: 60.4033, lng: 26.3583,
    status: 'operating', reactorType: 'VVER-440', units: 2, netCapacityMW: 1000,
    operator: 'Fortum Power', firstPower: 1977,
    overview: 'Two VVER-440 units on the Gulf of Finland coast. Finnish-modified Soviet design with western safety upgrades.',
    sources: [{ name: 'IAEA PRIS', url: 'https://pris.iaea.org/', type: 'official' }, { name: 'STUK', url: 'https://www.stuk.fi/en', type: 'official' }],
    lastUpdated: '2024-01-01',
  },

  // ─── SWEDEN ───────────────────────────────────────────────────────────────────
  {
    id: 'se-forsmark', name: 'Forsmark Nuclear Power Plant',
    country: 'Sweden', region: 'Northern Europe', lat: 60.4192, lng: 18.1714,
    status: 'operating', reactorType: 'BWR (ABB Atom)', units: 3, netCapacityMW: 3138,
    operator: 'Vattenfall / Forsmarks Kraftgrupp', firstPower: 1980,
    overview: 'Three-unit ABB BWR station in Uppsala County. One of Europe\'s most efficient nuclear stations.',
    sources: [{ name: 'IAEA PRIS', url: 'https://pris.iaea.org/', type: 'official' }],
    lastUpdated: '2024-01-01',
  },
  {
    id: 'se-ringhals', name: 'Ringhals Nuclear Power Plant',
    country: 'Sweden', region: 'Northern Europe', lat: 57.2578, lng: 12.1036,
    status: 'operating', reactorType: 'PWR / BWR', units: 2, netCapacityMW: 1960,
    operator: 'Vattenfall', firstPower: 1975,
    overview: 'Two units operating (Ringhals 3 and 4, PWR). Units 1 and 2 permanently shut 2019–2020.',
    sources: [{ name: 'IAEA PRIS', url: 'https://pris.iaea.org/', type: 'official' }],
    lastUpdated: '2024-01-01',
  },

  // ─── BELGIUM ──────────────────────────────────────────────────────────────────
  {
    id: 'be-doel', name: 'Doel Nuclear Power Station',
    country: 'Belgium', region: 'Western Europe', lat: 51.3214, lng: 4.2633,
    status: 'operating', reactorType: 'PWR (Westinghouse)', units: 3, netCapacityMW: 2900,
    operator: 'Engie Electrabel', firstPower: 1975,
    overview: 'Three active PWR units near Antwerp. Belgium decided to extend Doel 4 operation to 2035 and pursue lifetime extension for Doel 3.',
    sources: [{ name: 'IAEA PRIS', url: 'https://pris.iaea.org/', type: 'official' }, { name: 'FANC', url: 'https://www.fanc.fgov.be/', type: 'official' }],
    lastUpdated: '2024-01-01',
  },
  {
    id: 'be-tihange', name: 'Tihange Nuclear Power Station',
    country: 'Belgium', region: 'Western Europe', lat: 50.5297, lng: 5.2694,
    status: 'operating', reactorType: 'PWR (Westinghouse / Framatome)', units: 2, netCapacityMW: 1968,
    operator: 'Engie Electrabel', firstPower: 1975,
    overview: 'Two operating PWR units on the Meuse River. Belgium extended Tihange 3 to 2035; Tihange 1–2 operational life decisions ongoing.',
    sources: [{ name: 'IAEA PRIS', url: 'https://pris.iaea.org/', type: 'official' }],
    lastUpdated: '2024-01-01',
  },

  // ─── CZECH REPUBLIC ───────────────────────────────────────────────────────────
  {
    id: 'cz-dukovany', name: 'Dukovany Nuclear Power Plant',
    country: 'Czech Republic', region: 'Central Europe', lat: 49.0878, lng: 16.1478,
    status: 'operating', reactorType: 'VVER-440', units: 4, netCapacityMW: 2040,
    operator: 'ČEZ', firstPower: 1985,
    overview: 'Four VVER-440 units, significantly modernised. ČEZ planning new unit construction adjacent to existing site.',
    sources: [{ name: 'IAEA PRIS', url: 'https://pris.iaea.org/', type: 'official' }],
    lastUpdated: '2024-01-01',
  },
  {
    id: 'cz-temelin', name: 'Temelín Nuclear Power Plant',
    country: 'Czech Republic', region: 'Central Europe', lat: 49.2028, lng: 14.3733,
    status: 'operating', reactorType: 'VVER-1000', units: 2, netCapacityMW: 2160,
    operator: 'ČEZ', firstPower: 2002,
    overview: 'Two VVER-1000 units with Western instrumentation and control systems. South Bohemia.',
    sources: [{ name: 'IAEA PRIS', url: 'https://pris.iaea.org/', type: 'official' }],
    lastUpdated: '2024-01-01',
  },

  // ─── HUNGARY ──────────────────────────────────────────────────────────────────
  {
    id: 'hu-paks', name: 'Paks Nuclear Power Plant',
    country: 'Hungary', region: 'Central Europe', lat: 46.5714, lng: 18.8461,
    status: 'operating', reactorType: 'VVER-440', units: 4, netCapacityMW: 1902,
    operator: 'MVM Paks', firstPower: 1982,
    overview: 'Four VVER-440 units supplying ~50% of Hungary\'s electricity. Life extension approved. Paks II (new units) in planning/permitting.',
    sources: [{ name: 'IAEA PRIS', url: 'https://pris.iaea.org/', type: 'official' }],
    lastUpdated: '2024-01-01',
  },

  // ─── SPAIN ────────────────────────────────────────────────────────────────────
  {
    id: 'es-almaraz', name: 'Almaraz Nuclear Power Plant',
    country: 'Spain', region: 'Western Europe', lat: 39.8078, lng: -5.6964,
    status: 'operating', reactorType: 'PWR (Westinghouse)', units: 2, netCapacityMW: 1908,
    operator: 'Iberdrola / Endesa / Naturgy', firstPower: 1981,
    overview: 'Spain\'s largest nuclear station. Operational life extended; scheduled shutdown under Spain\'s national energy plan.',
    sources: [{ name: 'IAEA PRIS', url: 'https://pris.iaea.org/', type: 'official' }],
    lastUpdated: '2024-01-01',
  },
  {
    id: 'es-cofrentes', name: 'Cofrentes Nuclear Power Plant',
    country: 'Spain', region: 'Western Europe', lat: 39.2486, lng: -1.0586,
    status: 'operating', reactorType: 'BWR (GE)', units: 1, netCapacityMW: 1092,
    operator: 'Iberdrola', firstPower: 1984,
    overview: 'Spain\'s only BWR. Single-unit GE BWR in Valencia region.',
    sources: [{ name: 'IAEA PRIS', url: 'https://pris.iaea.org/', type: 'official' }],
    lastUpdated: '2024-01-01',
  },

  // ─── SWITZERLAND ─────────────────────────────────────────────────────────────
  {
    id: 'ch-leibstadt', name: 'Leibstadt Nuclear Power Plant',
    country: 'Switzerland', region: 'Western Europe', lat: 47.5986, lng: 8.1861,
    status: 'operating', reactorType: 'BWR (GE)', units: 1, netCapacityMW: 1220,
    operator: 'Kernkraftwerk Leibstadt AG (KKL)', firstPower: 1984,
    overview: 'Switzerland\'s newest and most powerful nuclear station. Single-unit GE BWR.',
    sources: [{ name: 'IAEA PRIS', url: 'https://pris.iaea.org/', type: 'official' }],
    lastUpdated: '2024-01-01',
  },
  {
    id: 'ch-beznau', name: 'Beznau Nuclear Power Plant',
    country: 'Switzerland', region: 'Western Europe', lat: 47.5733, lng: 8.2278,
    status: 'operating', reactorType: 'PWR (Westinghouse)', units: 2, netCapacityMW: 730,
    operator: 'Axpo Power', firstPower: 1969,
    overview: 'World\'s oldest operating commercial nuclear power plant (Unit 1 since 1969). Two Westinghouse PWR units.',
    sources: [{ name: 'IAEA PRIS', url: 'https://pris.iaea.org/', type: 'official' }],
    lastUpdated: '2024-01-01',
  },

  // ─── GERMANY ──────────────────────────────────────────────────────────────────
  {
    id: 'de-isar', name: 'Isar 2 (Kernkraftwerk Isar 2)',
    country: 'Germany', region: 'Western Europe', lat: 48.6056, lng: 12.2958,
    status: 'shutdown', reactorType: 'PWR (Siemens)', units: 1, netCapacityMW: 0,
    operator: 'PreussenElektra (E.ON)', firstPower: 1988,
    overview: 'Permanently shut 15 April 2023 — one of the last three German nuclear plants to close under Germany\'s Atomausstieg (nuclear phase-out) policy.',
    sources: [{ name: 'IAEA PRIS', url: 'https://pris.iaea.org/', type: 'official' }, { name: 'BMWi – Atomausstieg', url: 'https://www.bmwk.de/', type: 'official' }],
    lastUpdated: '2024-01-01',
  },

  // ─── NETHERLANDS ─────────────────────────────────────────────────────────────
  {
    id: 'nl-borssele', name: 'Borssele Nuclear Power Plant',
    country: 'Netherlands', region: 'Western Europe', lat: 51.4094, lng: 3.7203,
    status: 'operating', reactorType: 'PWR (Siemens/KWU)', units: 1, netCapacityMW: 512,
    operator: 'EPZ (Elektriciteits-Productiemaatschappij Zuid-Nederland)', firstPower: 1973,
    overview: 'Netherlands\' only operating nuclear station. Lifetime extended. Government planning at least two new large reactors.',
    sources: [{ name: 'IAEA PRIS', url: 'https://pris.iaea.org/', type: 'official' }],
    lastUpdated: '2024-01-01',
  },

  // ─── UAE ──────────────────────────────────────────────────────────────────────
  {
    id: 'ae-barakah', name: 'Barakah Nuclear Energy Plant',
    country: 'United Arab Emirates', region: 'Middle East', lat: 23.9688, lng: 52.2073,
    status: 'operating', reactorType: 'APR-1400 (PWR)', units: 4, netCapacityMW: 5600,
    operator: 'Nawah Energy Company', firstPower: 2020,
    overview: 'First nuclear power plant in the Arab world. Four APR-1400 units. Units 1–3 in commercial operation; Unit 4 commissioning. Developed with Korean technology by KEPCO.',
    sources: [{ name: 'ENEC', url: 'https://www.enec.gov.ae/', type: 'official' }, { name: 'FANR', url: 'https://www.fanr.gov.ae/', type: 'official' }],
    lastUpdated: '2024-01-01',
  },

  // ─── ARGENTINA ───────────────────────────────────────────────────────────────
  {
    id: 'ar-atucha', name: 'Atucha Nuclear Power Plant',
    country: 'Argentina', region: 'South America', lat: -33.9694, lng: -59.2083,
    status: 'operating', reactorType: 'PHWR (Siemens PHWR)', units: 2, netCapacityMW: 1120,
    operator: 'Nucleoeléctrica Argentina (NASA)', firstPower: 1974,
    overview: 'Argentina\'s flagship nuclear site. Atucha I (1974) was Latin America\'s first commercial nuclear plant. Atucha II joined commercial operation in 2014.',
    sources: [{ name: 'IAEA PRIS', url: 'https://pris.iaea.org/', type: 'official' }],
    lastUpdated: '2024-01-01',
  },

  // ─── BRAZIL ───────────────────────────────────────────────────────────────────
  {
    id: 'br-angra', name: 'Angra Nuclear Power Plant',
    country: 'Brazil', region: 'South America', lat: -23.0078, lng: -44.4619,
    status: 'operating', reactorType: 'PWR (Westinghouse / Siemens-KWU)', units: 2, netCapacityMW: 1990,
    operator: 'Eletronuclear', firstPower: 1982,
    overview: 'Two PWR units in Rio de Janeiro State. Angra 3 under construction (delayed). Brazil\'s only commercial nuclear station.',
    sources: [{ name: 'IAEA PRIS', url: 'https://pris.iaea.org/', type: 'official' }],
    lastUpdated: '2024-01-01',
  },

  // ─── SOUTH AFRICA ────────────────────────────────────────────────────────────
  {
    id: 'za-koeberg', name: 'Koeberg Nuclear Power Station',
    country: 'South Africa', region: 'Africa', lat: -33.6619, lng: 18.4328,
    status: 'operating', reactorType: 'PWR (Framatome)', units: 2, netCapacityMW: 1860,
    operator: 'Eskom', firstPower: 1984,
    overview: 'Africa\'s only commercial nuclear power station. Two French Framatome PWR units north of Cape Town. 20-year life extension approved.',
    sources: [{ name: 'IAEA PRIS', url: 'https://pris.iaea.org/', type: 'official' }, { name: 'NNR – South Africa', url: 'https://www.nnr.co.za/', type: 'official' }],
    lastUpdated: '2024-01-01',
  },

  // ─── PAKISTAN ────────────────────────────────────────────────────────────────
  {
    id: 'pk-kanupp', name: 'Karachi Nuclear Power Plant (KANUPP)',
    country: 'Pakistan', region: 'South Asia', lat: 24.8428, lng: 66.7783,
    status: 'operating', reactorType: 'PHWR (CANDU-derived) / PWR (Hualong One)', units: 3, netCapacityMW: 2100,
    operator: 'PAEC (Pakistan Atomic Energy Commission)', firstPower: 1971,
    overview: 'Pakistan\'s primary civilian nuclear station. KANUPP-1 (1971, now shutdown). KANUPP-2 and KANUPP-3 (Hualong One, Chinese-supplied) in operation as of 2021–2022.',
    sources: [{ name: 'IAEA PRIS', url: 'https://pris.iaea.org/', type: 'official' }],
    lastUpdated: '2024-01-01',
  },

  // ─── IRAN ────────────────────────────────────────────────────────────────────
  {
    id: 'ir-bushehr', name: 'Bushehr Nuclear Power Plant',
    country: 'Iran', region: 'Middle East', lat: 28.8278, lng: 50.9092,
    status: 'operating', reactorType: 'VVER-1000', units: 1, netCapacityMW: 915,
    operator: 'Atomic Energy Organization of Iran (AEOI)', firstPower: 2011,
    overview: 'Iran\'s only commercial nuclear power plant. VVER-1000 built with Russian assistance. Unit 2 under construction. Operates under IAEA safeguards.',
    sources: [{ name: 'IAEA PRIS', url: 'https://pris.iaea.org/', type: 'official' }, { name: 'IAEA Safeguards – Iran', url: 'https://www.iaea.org/', type: 'official' }],
    lastUpdated: '2024-01-01',
  },

  // ─── MEXICO ──────────────────────────────────────────────────────────────────
  {
    id: 'mx-laguna-verde', name: 'Laguna Verde Nuclear Power Plant',
    country: 'Mexico', region: 'North America', lat: 19.7197, lng: -96.3972,
    status: 'operating', reactorType: 'BWR (GE)', units: 2, netCapacityMW: 1640,
    operator: 'Comisión Federal de Electricidad (CFE)', firstPower: 1990,
    overview: 'Mexico\'s only nuclear plant. Two GE BWR units in Veracruz. Provides ~4% of Mexico\'s electricity.',
    sources: [{ name: 'IAEA PRIS', url: 'https://pris.iaea.org/', type: 'official' }],
    lastUpdated: '2024-01-01',
  },

  // ─── ROMANIA ─────────────────────────────────────────────────────────────────
  {
    id: 'ro-cernavoda', name: 'Cernavodă Nuclear Power Plant',
    country: 'Romania', region: 'Eastern Europe', lat: 44.3289, lng: 28.0525,
    status: 'operating', reactorType: 'CANDU-6 (PHWR)', units: 2, netCapacityMW: 1413,
    operator: 'Nuclearelectrica', firstPower: 1996,
    overview: 'Two CANDU-6 units on the Danube. Provides ~20% of Romania\'s electricity. Units 3–5 in long-term planning.',
    sources: [{ name: 'IAEA PRIS', url: 'https://pris.iaea.org/', type: 'official' }],
    lastUpdated: '2024-01-01',
  },

  // ─── SLOVENIA ────────────────────────────────────────────────────────────────
  {
    id: 'si-krsko', name: 'Krško Nuclear Power Plant',
    country: 'Slovenia', region: 'Central Europe', lat: 45.8314, lng: 15.8706,
    status: 'operating', reactorType: 'PWR (Westinghouse)', units: 1, netCapacityMW: 696,
    operator: 'GEN energija / HEP (shared SI/HR)', firstPower: 1983,
    overview: 'Jointly owned and operated by Slovenia and Croatia. Single Westinghouse PWR supplying both national grids.',
    sources: [{ name: 'IAEA PRIS', url: 'https://pris.iaea.org/', type: 'official' }],
    lastUpdated: '2024-01-01',
  },

  // ─── ARMENIA ────────────────────────────────────────────────────────────────
  {
    id: 'am-metsamor', name: 'Armenian Nuclear Power Plant (Metsamor)',
    country: 'Armenia', region: 'Middle East / Caucasus', lat: 40.1875, lng: 44.2628,
    status: 'operating', reactorType: 'VVER-440', units: 1, netCapacityMW: 408,
    operator: 'ANPP', firstPower: 1976,
    overview: 'One of the older VVER-440 designs still in operation. Provides a significant share of Armenia\'s electricity. Life extension underway.',
    sources: [{ name: 'IAEA PRIS', url: 'https://pris.iaea.org/', type: 'official' }],
    lastUpdated: '2024-01-01',
  },

  // ─── BELARUS ─────────────────────────────────────────────────────────────────
  {
    id: 'by-ostrovets', name: 'Ostrovets Nuclear Power Plant',
    country: 'Belarus', region: 'Eastern Europe', lat: 54.7583, lng: 25.8903,
    status: 'operating', reactorType: 'VVER-1200', units: 2, netCapacityMW: 2400,
    operator: 'Rosatom / Belarusian NPP', firstPower: 2021,
    overview: 'Belarus\'s first and only nuclear power plant. Two VVER-1200 units built by Rosatom. Unit 1 in commercial operation since 2021; Unit 2 from 2023.',
    sources: [{ name: 'IAEA PRIS', url: 'https://pris.iaea.org/', type: 'official' }],
    lastUpdated: '2024-01-01',
  },

  // ─── UNDER CONSTRUCTION (notable global examples) ────────────────────────────
  {
    id: 'bd-rooppur', name: 'Rooppur Nuclear Power Plant',
    country: 'Bangladesh', region: 'South Asia', lat: 24.3525, lng: 89.0286,
    status: 'under_construction', reactorType: 'VVER-1200', units: 2, netCapacityMW: 2400,
    operator: 'BPDB / Rosatom', firstPower: null,
    overview: 'Bangladesh\'s first nuclear power plant, built with Russian assistance. Two VVER-1200 units. Expected to begin operation in the 2020s.',
    sources: [{ name: 'IAEA PRIS', url: 'https://pris.iaea.org/', type: 'official' }],
    lastUpdated: '2024-01-01',
  },
  {
    id: 'tr-akkuyu', name: 'Akkuyu Nuclear Power Plant',
    country: 'Turkey', region: 'Middle East', lat: 36.1450, lng: 33.5383,
    status: 'under_construction', reactorType: 'VVER-1200', units: 4, netCapacityMW: 4800,
    operator: 'Akkuyu Nükleer AŞ (Rosatom)', firstPower: null,
    overview: 'Turkey\'s first nuclear plant, built on a BOO (Build-Own-Operate) model by Rosatom. Four VVER-1200 units. Construction ongoing.',
    sources: [{ name: 'IAEA PRIS', url: 'https://pris.iaea.org/', type: 'official' }],
    lastUpdated: '2024-01-01',
  },
  {
    id: 'eg-el-dabaa', name: 'El-Dabaa Nuclear Power Plant',
    country: 'Egypt', region: 'Africa', lat: 30.9608, lng: 28.6964,
    status: 'under_construction', reactorType: 'VVER-1200', units: 4, netCapacityMW: 4800,
    operator: 'NPPA (Egyptian Nuclear Power Plants Authority) / Rosatom', firstPower: null,
    overview: 'Egypt\'s first nuclear plant, four VVER-1200 units. Construction underway on the Mediterranean coast.',
    sources: [{ name: 'IAEA PRIS', url: 'https://pris.iaea.org/', type: 'official' }],
    lastUpdated: '2024-01-01',
  },
];

export default commercialPlants;
