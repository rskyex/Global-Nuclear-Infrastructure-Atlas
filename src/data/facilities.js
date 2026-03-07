/**
 * Global Nuclear Infrastructure Atlas – Facility Dataset
 *
 * DATA POLICY:
 * All records are based on officially published public information only.
 * Sources: IAEA PRIS, national regulatory agencies, operator websites,
 * and major reputable public reference sources.
 *
 * This dataset does NOT include:
 * - Speculative, leaked, or classified information
 * - Military facility profiles or weapons-related details
 * - Security layouts or vulnerability assessments
 * - Real-time operational telemetry
 *
 * "lastUpdated" refers to the date of the most recent publicly available
 * information used, not continuous surveillance.
 *
 * TODO: Replace mock data fields with live IAEA PRIS API calls when
 * an official public API endpoint becomes available.
 * See: https://pris.iaea.org/PRIS/home.aspx
 */

export const CATEGORIES = {
  POWER_PLANT: 'power_plant',
  RESEARCH_REACTOR: 'research_reactor',
  FUEL_CYCLE: 'fuel_cycle',
  ACCIDENT_SITE: 'accident_site',
  HISTORICAL_EVENT: 'historical_event',
};

export const STATUSES = {
  OPERATING: 'operating',
  UNDER_CONSTRUCTION: 'under_construction',
  PLANNED: 'planned',
  SUSPENDED: 'suspended',
  SHUTDOWN: 'shutdown',
  DECOMMISSIONED: 'decommissioned',
  DAMAGED: 'damaged',
  HISTORICAL: 'historical',
};

export const facilities = [
  // ─── CIVILIAN NUCLEAR POWER PLANTS ──────────────────────────────────────────
  {
    id: 'zaporizhzhia',
    name: 'Zaporizhzhia Nuclear Power Plant',
    country: 'Ukraine',
    region: 'Eastern Europe',
    lat: 47.5097,
    lng: 34.5858,
    category: CATEGORIES.POWER_PLANT,
    status: STATUSES.SUSPENDED,
    classification: 'civilian',
    image: null,
    gallery: [],
    officialLiveFeedEmbed: null,
    overview: `Zaporizhzhia NPP is the largest nuclear power plant in Europe by installed capacity. 
    It comprises six VVER-1000 pressurized water reactor units with a combined gross capacity of 6,000 MWe. 
    The plant has been under exceptional public scrutiny since early 2022 due to the ongoing armed conflict 
    in Ukraine. As of the latest publicly available IAEA reports, all six units are in cold shutdown. 
    The IAEA maintains a continuous presence of experts at the site as part of its safety and security 
    monitoring mandate under its Statute and relevant UN resolutions.`,
    purpose: 'Civilian electricity generation for the Ukrainian national grid.',
    usageHighLevel: `Six VVER-1000 pressurized water reactor units. The plant provided approximately 
    20% of Ukraine's electricity when fully operational. Currently in cold shutdown pending resolution 
    of the broader conflict situation, with IAEA experts present on-site.`,
    reactorType: 'VVER-1000 (PWR)',
    facilityType: 'Nuclear Power Plant',
    operator: 'Energoatom (State Enterprise)',
    owner: 'Ukraine',
    capacityMW: 6000,
    electricityRole: {
      domestic: true,
      crossBorder: false,
      notes: 'Historically supplied approximately 20% of Ukrainian national electricity. Currently offline (cold shutdown). No cross-border export details confirmed in public sources.',
    },
    timeline: [
      { year: 1984, event: 'Unit 1 begins commercial operation.' },
      { year: 1986, event: 'Units 2–4 reach commercial operation.' },
      { year: 1987, event: 'Unit 5 begins commercial operation.' },
      { year: 1995, event: 'Unit 6 begins commercial operation.' },
      { year: 2022, event: 'All units placed in cold shutdown following conflict-related events. IAEA expert mission deployed under IAEA Director General mandate.' },
      { year: 2023, event: 'IAEA Comprehensive Report on Safety and Security published. IAEA staff presence maintained on-site.' },
    ],
    incidentHistory: [
      {
        date: '2022 onward',
        description: 'The plant experienced multiple external power supply disruptions and other safety-relevant events during the armed conflict. The IAEA has published detailed technical reports on each incident. This situation is publicly documented through official IAEA reporting.',
      }
    ],
    currentStatus: 'All six units in cold shutdown as of latest IAEA public reporting. IAEA expert presence maintained on-site.',
    sources: [
      { name: 'IAEA Zaporizhzhia NPP Monitoring Page', url: 'https://www.iaea.org/topics/zaporizhzhia-nuclear-power-plant', type: 'official' },
      { name: 'IAEA PRIS – Zaporizhzhia', url: 'https://pris.iaea.org/', type: 'official' },
    ],
    sourceType: 'official',
    officialSource: true,
    lastUpdated: '2024-01-01',
  },
  {
    id: 'sizewell-b',
    name: 'Sizewell B Nuclear Power Station',
    country: 'United Kingdom',
    region: 'Western Europe',
    lat: 52.2144,
    lng: 1.6195,
    category: CATEGORIES.POWER_PLANT,
    status: STATUSES.OPERATING,
    classification: 'civilian',
    image: null,
    gallery: [],
    officialLiveFeedEmbed: null,
    overview: `Sizewell B is the United Kingdom's only operational pressurized water reactor (PWR) station, 
    located on the Suffolk coast in England. It is operated by EDF Energy. The station has a net output 
    of approximately 1,198 MWe and supplies a significant portion of the electricity consumed in the 
    East of England region. Its operational lifetime has been extended and it plays a central role in 
    UK energy security and decarbonisation policy.`,
    purpose: 'Civilian electricity generation for the UK national grid.',
    usageHighLevel: `Single-unit Westinghouse-design PWR providing approximately 1,200 MWe to the UK grid. 
    EDF Energy operates the plant and the UK government has expressed support for its continued operation 
    as part of the national low-carbon energy strategy.`,
    reactorType: 'PWR (Pressurized Water Reactor)',
    facilityType: 'Nuclear Power Plant',
    operator: 'EDF Energy Nuclear Generation Ltd',
    owner: 'EDF Energy',
    capacityMW: 1198,
    electricityRole: {
      domestic: true,
      crossBorder: false,
      notes: 'Supplies electricity to the UK national grid. No cross-border export documented in public sources.',
    },
    timeline: [
      { year: 1988, event: 'Construction begins.' },
      { year: 1995, event: 'Commercial operation begins (February 1995).' },
      { year: 2014, event: 'UK government approves Hinkley Point C as the follow-on new nuclear project.' },
      { year: 2022, event: 'UK government announces Sizewell B lifetime extension as part of energy security package.' },
      { year: 2035, event: 'Planned operational end-of-life (subject to regulatory review).' },
    ],
    incidentHistory: [],
    currentStatus: 'Operating. Lifetime extension approved. Contributes to UK national grid.',
    sources: [
      { name: 'EDF Energy – Sizewell B', url: 'https://www.edfenergy.com/energy/nuclear-operational-sites/sizewell-b', type: 'official' },
      { name: 'UK ONR – Sizewell B', url: 'https://www.onr.org.uk/', type: 'official' },
      { name: 'IAEA PRIS', url: 'https://pris.iaea.org/', type: 'official' },
    ],
    sourceType: 'official',
    officialSource: true,
    lastUpdated: '2024-01-01',
  },
  {
    id: 'palo-verde',
    name: 'Palo Verde Nuclear Generating Station',
    country: 'United States',
    region: 'North America',
    lat: 33.3878,
    lng: -112.8629,
    category: CATEGORIES.POWER_PLANT,
    status: STATUSES.OPERATING,
    classification: 'civilian',
    image: null,
    gallery: [],
    officialLiveFeedEmbed: null,
    overview: `Palo Verde Nuclear Generating Station, located west of Phoenix, Arizona, is the largest 
    nuclear power plant in the United States by net electricity generation. It comprises three 
    Combustion Engineering System 80 pressurized water reactor units. The plant is notable for 
    being the only large nuclear facility in the world not located adjacent to a natural body of 
    water; it uses treated municipal wastewater for cooling. Palo Verde supplies electricity to 
    Arizona, California, New Mexico, and Texas through interconnected grid systems.`,
    purpose: 'Civilian electricity generation for the southwestern US grid.',
    usageHighLevel: `Three-unit pressurized water reactor station generating approximately 3,937 MWe net. 
    Uses reclaimed municipal wastewater as cooling water – a unique design feature publicly documented 
    by the operator and NRC. Serves multiple southwestern US states through the grid.`,
    reactorType: 'CE System 80 (PWR)',
    facilityType: 'Nuclear Power Plant',
    operator: 'Arizona Public Service (APS)',
    owner: 'Multiple utility owners (APS operates)',
    capacityMW: 3937,
    electricityRole: {
      domestic: true,
      crossBorder: false,
      notes: 'Largest US nuclear plant by generation. Serves the southwestern US multi-state grid. No international cross-border exports documented.',
    },
    timeline: [
      { year: 1976, event: 'Construction begins.' },
      { year: 1986, event: 'Unit 1 begins commercial operation.' },
      { year: 1986, event: 'Unit 2 begins commercial operation.' },
      { year: 1988, event: 'Unit 3 begins commercial operation.' },
      { year: 2011, event: 'NRC grants 20-year license renewals for all three units through 2045–2047.' },
    ],
    incidentHistory: [],
    currentStatus: 'All three units operating. License renewed through mid-2040s.',
    sources: [
      { name: 'APS – Palo Verde', url: 'https://www.aps.com/en/About/Our-Company/Energy-Portfolio/Nuclear', type: 'official' },
      { name: 'NRC – Palo Verde', url: 'https://www.nrc.gov/info-finder/reactors/pv1.html', type: 'official' },
      { name: 'IAEA PRIS', url: 'https://pris.iaea.org/', type: 'official' },
    ],
    sourceType: 'official',
    officialSource: true,
    lastUpdated: '2024-01-01',
  },
  {
    id: 'olkiluoto',
    name: 'Olkiluoto Nuclear Power Plant',
    country: 'Finland',
    region: 'Northern Europe',
    lat: 61.2353,
    lng: 21.4444,
    category: CATEGORIES.POWER_PLANT,
    status: STATUSES.OPERATING,
    classification: 'civilian',
    image: null,
    gallery: [],
    officialLiveFeedEmbed: null,
    overview: `Olkiluoto Nuclear Power Plant is located on the Olkiluoto Island on the western coast 
    of Finland. The site hosts three reactor units. Units 1 and 2 are boiling water reactors (BWR) 
    that have been operating since the late 1970s and early 1980s. Unit 3, an EPR (European Pressurized 
    Reactor) of 1,600 MWe, began commercial operation in April 2023 after a significantly extended 
    construction period. OL3 is the first new nuclear unit to enter commercial operation in Western 
    Europe in decades and is publicly documented as the world's most powerful single reactor unit 
    currently in operation.`,
    purpose: 'Civilian electricity generation for the Finnish national grid.',
    usageHighLevel: `Three-unit site. OL1 and OL2 are ABB/Asea Atom BWRs (660 MWe each). 
    OL3 is an Areva/Framatome EPR (1,600 MWe). Combined capacity is approximately 2,920 MWe. 
    Finland derives approximately 40% of its electricity from nuclear power, with Olkiluoto as a 
    primary contributor.`,
    reactorType: 'BWR (Units 1–2), EPR (Unit 3)',
    facilityType: 'Nuclear Power Plant',
    operator: 'Teollisuuden Voima (TVO)',
    owner: 'TVO',
    capacityMW: 2920,
    electricityRole: {
      domestic: true,
      crossBorder: true,
      notes: 'Finland is part of the Nordic electricity market (Nord Pool). Cross-border electricity trade occurs at the grid level through interconnectors; facility-specific export volumes are not separately tracked in public sources.',
    },
    timeline: [
      { year: 1978, event: 'OL1 begins commercial operation.' },
      { year: 1980, event: 'OL2 begins commercial operation.' },
      { year: 2005, event: 'OL3 construction begins (EPR design).' },
      { year: 2023, event: 'OL3 begins commercial operation (April 2023) – first new reactor in Western Europe in ~16 years.' },
    ],
    incidentHistory: [],
    currentStatus: 'All three units operating. OL3 in early commercial operation phase.',
    sources: [
      { name: 'TVO – Olkiluoto', url: 'https://www.tvo.fi/en', type: 'official' },
      { name: 'IAEA PRIS – Olkiluoto', url: 'https://pris.iaea.org/', type: 'official' },
      { name: 'STUK (Finnish Radiation and Nuclear Safety Authority)', url: 'https://www.stuk.fi/en', type: 'official' },
    ],
    sourceType: 'official',
    officialSource: true,
    lastUpdated: '2024-01-01',
  },
  {
    id: 'cattenom',
    name: 'Cattenom Nuclear Power Plant',
    country: 'France',
    region: 'Western Europe',
    lat: 49.4017,
    lng: 6.2197,
    category: CATEGORIES.POWER_PLANT,
    status: STATUSES.OPERATING,
    classification: 'civilian',
    image: null,
    gallery: [],
    officialLiveFeedEmbed: null,
    overview: `Cattenom Nuclear Power Plant is located in the Moselle department of northeastern France, 
    near the borders with Luxembourg, Germany, and Belgium. It operates four 1,300 MWe PWR units. 
    Cattenom is one of the larger French nuclear stations and is operated by Électricité de France (EDF). 
    France operates the second-largest nuclear fleet in the world by number of reactors, and nuclear power 
    accounts for approximately 70% of French electricity generation.`,
    purpose: 'Civilian electricity generation for the French national grid.',
    usageHighLevel: `Four-unit 1,300 MWe PWR station. France exports electricity to neighboring European 
    countries through the European interconnected grid. Specific facility-level export data is not 
    separately tracked in publicly available sources; grid-level trade data is published by RTE.`,
    reactorType: 'PWR (1300 MWe class)',
    facilityType: 'Nuclear Power Plant',
    operator: 'EDF (Électricité de France)',
    owner: 'EDF',
    capacityMW: 5200,
    electricityRole: {
      domestic: true,
      crossBorder: true,
      notes: 'France is a major electricity exporter within the European grid. Cattenom is close to Luxembourg, Germany, and Belgium borders. Grid-level trade data published by RTE (Réseau de Transport d\'Electricité).',
    },
    timeline: [
      { year: 1986, event: 'Unit 1 begins commercial operation.' },
      { year: 1987, event: 'Unit 2 begins commercial operation.' },
      { year: 1991, event: 'Unit 3 begins commercial operation.' },
      { year: 1992, event: 'Unit 4 begins commercial operation.' },
    ],
    incidentHistory: [],
    currentStatus: 'Operating (with periodic outages for maintenance and refueling as publicly reported by ASN/EDF).',
    sources: [
      { name: 'EDF – Cattenom', url: 'https://www.edf.fr/en/edf/cattenom', type: 'official' },
      { name: 'ASN (French Nuclear Safety Authority)', url: 'https://www.asn.fr/', type: 'official' },
      { name: 'IAEA PRIS', url: 'https://pris.iaea.org/', type: 'official' },
    ],
    sourceType: 'official',
    officialSource: true,
    lastUpdated: '2024-01-01',
  },
  {
    id: 'barakah',
    name: 'Barakah Nuclear Energy Plant',
    country: 'United Arab Emirates',
    region: 'Middle East',
    lat: 23.9688,
    lng: 52.2073,
    category: CATEGORIES.POWER_PLANT,
    status: STATUSES.OPERATING,
    classification: 'civilian',
    image: null,
    gallery: [],
    officialLiveFeedEmbed: null,
    overview: `Barakah Nuclear Energy Plant is the UAE's first nuclear power station and the first 
    commercial nuclear power plant in the Arab world. Located in Abu Dhabi emirate, it is operated 
    by Nawah Energy Company. The plant uses APR-1400 technology – an advanced pressurized water 
    reactor developed in South Korea. All four units are publicly documented as having achieved or 
    approaching commercial operation status, making Barakah one of the world's newest large nuclear 
    power plants.`,
    purpose: 'Civilian electricity generation for the UAE national grid.',
    usageHighLevel: `Four-unit APR-1400 pressurized water reactor station. Each unit produces approximately 
    1,400 MWe. Combined capacity is approximately 5,600 MWe. The plant will provide up to 25% of the 
    UAE's electricity needs according to publicly documented operator targets.`,
    reactorType: 'APR-1400 (PWR)',
    facilityType: 'Nuclear Power Plant',
    operator: 'Nawah Energy Company',
    owner: 'Emirates Nuclear Energy Corporation (ENEC)',
    capacityMW: 5600,
    electricityRole: {
      domestic: true,
      crossBorder: false,
      notes: 'Supplies the UAE national grid. No international electricity export documented in public sources.',
    },
    timeline: [
      { year: 2012, event: 'Construction of Unit 1 begins.' },
      { year: 2020, event: 'Unit 1 receives operating license from FANR; fuel loading begins.' },
      { year: 2021, event: 'Unit 1 begins commercial operation.' },
      { year: 2022, event: 'Unit 2 begins commercial operation.' },
      { year: 2023, event: 'Unit 3 begins commercial operation.' },
      { year: 2024, event: 'Unit 4 approaches commercial operation.' },
    ],
    incidentHistory: [],
    currentStatus: 'Units 1–3 in commercial operation. Unit 4 in commissioning/startup phase.',
    sources: [
      { name: 'ENEC – Barakah Plant', url: 'https://www.enec.gov.ae/', type: 'official' },
      { name: 'FANR (UAE Federal Authority for Nuclear Regulation)', url: 'https://www.fanr.gov.ae/', type: 'official' },
      { name: 'IAEA PRIS', url: 'https://pris.iaea.org/', type: 'official' },
    ],
    sourceType: 'official',
    officialSource: true,
    lastUpdated: '2024-01-01',
  },
  {
    id: 'bruce',
    name: 'Bruce Nuclear Generating Station',
    country: 'Canada',
    region: 'North America',
    lat: 44.3261,
    lng: -81.5951,
    category: CATEGORIES.POWER_PLANT,
    status: STATUSES.OPERATING,
    classification: 'civilian',
    image: null,
    gallery: [],
    officialLiveFeedEmbed: null,
    overview: `Bruce Nuclear Generating Station, located on the eastern shore of Lake Huron in Ontario, 
    Canada, is the largest operating nuclear power plant in the world by total capacity. It houses 
    eight CANDU (CANadian Deuterium Uranium) pressurized heavy water reactor units, though some have 
    undergone refurbishment and restart programs. The plant is operated by Bruce Power under a long-term 
    lease agreement with Ontario Power Generation.`,
    purpose: 'Civilian electricity generation for the Ontario provincial grid.',
    usageHighLevel: `Eight-unit CANDU heavy water reactor station with combined capacity exceeding 
    6,400 MWe. Supplies approximately 30% of Ontario's electricity. CANDU reactors are unique in their 
    ability to refuel online without shutdown and use natural unenriched uranium fuel.`,
    reactorType: 'CANDU (Pressurized Heavy Water Reactor)',
    facilityType: 'Nuclear Power Plant',
    operator: 'Bruce Power',
    owner: 'Bruce Power (leased from Ontario Power Generation)',
    capacityMW: 6430,
    electricityRole: {
      domestic: true,
      crossBorder: false,
      notes: 'Primarily supplies Ontario provincial grid. Interconnections exist with neighboring US states through the Ontario grid but specific export volumes are not facility-attributed in public sources.',
    },
    timeline: [
      { year: 1977, event: 'Unit 1 begins commercial operation.' },
      { year: 1978, event: 'Units 2–4 begin commercial operation.' },
      { year: 1984, event: 'Units 5–8 reach commercial operation.' },
      { year: 2001, event: 'Bruce Power formed; takes over operation from Ontario Power Generation.' },
      { year: 2012, event: 'Units 1 and 2 restart after refurbishment.' },
      { year: 2020, event: 'Major life-extension and refurbishment program announced for all eight units.' },
    ],
    incidentHistory: [],
    currentStatus: 'Operating. Multi-unit life-extension refurbishment program underway.',
    sources: [
      { name: 'Bruce Power', url: 'https://www.brucepower.com/', type: 'official' },
      { name: 'CNSC (Canadian Nuclear Safety Commission)', url: 'https://nuclearsafety.gc.ca/', type: 'official' },
      { name: 'IAEA PRIS', url: 'https://pris.iaea.org/', type: 'official' },
    ],
    sourceType: 'official',
    officialSource: true,
    lastUpdated: '2024-01-01',
  },

  // ─── RESEARCH REACTORS ───────────────────────────────────────────────────────
  {
    id: 'iaea-miniature-reactor',
    name: 'TRIGA Mark II Research Reactor (Vienna / IAEA Reference Type)',
    country: 'Austria',
    region: 'Western Europe',
    lat: 48.2333,
    lng: 16.3560,
    category: CATEGORIES.RESEARCH_REACTOR,
    status: STATUSES.SHUTDOWN,
    classification: 'research',
    image: null,
    gallery: [],
    officialLiveFeedEmbed: null,
    overview: `The TRIGA (Training, Research, Isotopes, General Atomics) reactor design represents one 
    of the most widely used research reactor types globally. TRIGA reactors are small, pool-type 
    reactors used for neutron activation analysis, isotope production, education, and training. 
    The Vienna TRIGA II at the Atominstitut (TU Wien) was a representative example. Research 
    reactors of this class are registered in the IAEA Research Reactor Database (RRDB).`,
    purpose: 'Scientific research, neutron activation analysis, isotope production, and student training.',
    usageHighLevel: `TRIGA-class pool-type research reactor. Used for neutron flux experiments, 
    materials irradiation, and training of nuclear engineering students. Output is measured in 
    thermal megawatts (MWth) for research purposes, not electricity generation.`,
    reactorType: 'TRIGA Mark II (Pool-type research reactor)',
    facilityType: 'Research Reactor',
    operator: 'Atominstitut, TU Wien',
    owner: 'TU Wien',
    capacityMW: 0.25,
    electricityRole: null,
    timeline: [
      { year: 1962, event: 'First criticality achieved.' },
      { year: 2004, event: 'Reactor shutdown for extended maintenance.' },
    ],
    incidentHistory: [],
    currentStatus: 'Shutdown / standby status. IAEA RRDB listed.',
    sources: [
      { name: 'IAEA Research Reactor Database (RRDB)', url: 'https://nucleus.iaea.org/RRDB/', type: 'official' },
      { name: 'TU Wien Atominstitut', url: 'https://www.atominstitut.tuwien.ac.at/', type: 'official' },
    ],
    sourceType: 'official',
    officialSource: true,
    lastUpdated: '2024-01-01',
  },
  {
    id: 'jrc-ispra',
    name: 'JRC Ispra Research Reactors (Historical)',
    country: 'Italy',
    region: 'Western Europe',
    lat: 45.8126,
    lng: 8.6270,
    category: CATEGORIES.RESEARCH_REACTOR,
    status: STATUSES.DECOMMISSIONED,
    classification: 'research',
    image: null,
    gallery: [],
    officialLiveFeedEmbed: null,
    overview: `The Joint Research Centre (JRC) site at Ispra, Italy, operated several research reactors 
    during the 1960s–1980s as part of the European Atomic Energy Community (Euratom) research programme. 
    These included the Ispra-1 reactor and the ESSOR reactor, used for fuel and materials research. 
    All reactors are now shutdown and the site is in the decommissioning phase. The JRC continues 
    to operate at Ispra for non-reactor research activities.`,
    purpose: 'Historical Euratom nuclear research. Now in decommissioning.',
    usageHighLevel: `Multiple research reactors operated for fuel testing and nuclear safety research 
    under the Euratom framework. All units are permanently shutdown and under licensed decommissioning.`,
    reactorType: 'Various (pool and tank-type research reactors)',
    facilityType: 'Research Reactor (Decommissioned)',
    operator: 'European Commission Joint Research Centre (JRC)',
    owner: 'European Commission',
    capacityMW: null,
    electricityRole: null,
    timeline: [
      { year: 1959, event: 'JRC Ispra site established.' },
      { year: 1963, event: 'Ispra-1 reactor begins operation.' },
      { year: 1988, event: 'ESSOR reactor permanently shutdown.' },
      { year: 2000, event: 'Decommissioning programme begins.' },
    ],
    incidentHistory: [],
    currentStatus: 'All reactors permanently shutdown. Site in decommissioning programme.',
    sources: [
      { name: 'European Commission JRC Ispra', url: 'https://joint-research-centre.ec.europa.eu/jrc-sites-across-europe/jrc-ispra_en', type: 'official' },
      { name: 'IAEA RRDB', url: 'https://nucleus.iaea.org/RRDB/', type: 'official' },
    ],
    sourceType: 'official',
    officialSource: true,
    lastUpdated: '2024-01-01',
  },

  // ─── FUEL CYCLE FACILITIES ───────────────────────────────────────────────────
  {
    id: 'sellafield',
    name: 'Sellafield Nuclear Site',
    country: 'United Kingdom',
    region: 'Western Europe',
    lat: 54.4213,
    lng: -3.5046,
    category: CATEGORIES.FUEL_CYCLE,
    status: STATUSES.OPERATING,
    classification: 'civilian',
    image: null,
    gallery: [],
    officialLiveFeedEmbed: null,
    overview: `Sellafield is a large nuclear licensed site in Cumbria, northwest England, operated by 
    Sellafield Ltd on behalf of the Nuclear Decommissioning Authority (NDA). The site has a complex 
    history spanning decades of nuclear activities including plutonium production, reprocessing, 
    fuel manufacture, and waste management. The THORP reprocessing plant operated from 1994 to 2018. 
    Today, Sellafield is primarily engaged in decommissioning legacy facilities and managing radioactive 
    waste, while also maintaining operational facilities for fuel receipt and storage. It is the largest 
    nuclear decommissioning and waste management project in Europe.`,
    purpose: 'Nuclear waste management, decommissioning of legacy nuclear facilities, spent fuel storage, and some ongoing fuel cycle activities. Historically included reprocessing.',
    usageHighLevel: `Large multi-function nuclear licensed site. Core current activities: 
    (1) Managing legacy waste and decommissioning historic facilities. 
    (2) Receiving and storing spent nuclear fuel. 
    (3) Vitrification of high-level radioactive waste. 
    THORP reprocessing ended 2018. The Magnox reprocessing plant also permanently shut. 
    Site managed under NDA oversight and ONR regulatory framework.`,
    reactorType: null,
    facilityType: 'Fuel Cycle / Reprocessing / Decommissioning Site',
    operator: 'Sellafield Ltd (NDA subsidiary)',
    owner: 'Nuclear Decommissioning Authority (NDA)',
    capacityMW: null,
    electricityRole: null,
    timeline: [
      { year: 1947, event: 'Site established as Windscale, for plutonium production.' },
      { year: 1957, event: 'Windscale fire – most serious nuclear accident in UK history. Windscale Pile 1 catches fire.' },
      { year: 1981, event: 'Site renamed Sellafield.' },
      { year: 1994, event: 'THORP (Thermal Oxide Reprocessing Plant) begins commercial operation.' },
      { year: 2018, event: 'THORP reprocessing operations permanently cease.' },
      { year: 2023, event: 'Major decommissioning and waste management activities ongoing.' },
    ],
    incidentHistory: [
      {
        date: '10 October 1957',
        description: 'Windscale Pile 1 fire – a graphite fire in one of the air-cooled plutonium production piles released radioactive contamination across parts of the UK and Europe. This is classified as INES Level 5 and is the most serious nuclear accident in UK history. Windscale Pile 1 was not a power reactor.',
      }
    ],
    currentStatus: 'Active nuclear licensed site. Primary focus: decommissioning, waste management, spent fuel storage. Reprocessing operations permanently ended.',
    sources: [
      { name: 'Sellafield Ltd', url: 'https://www.sellafieldsites.com/', type: 'official' },
      { name: 'Nuclear Decommissioning Authority', url: 'https://www.gov.uk/government/organisations/nuclear-decommissioning-authority', type: 'official' },
      { name: 'ONR – Sellafield', url: 'https://www.onr.org.uk/', type: 'official' },
    ],
    sourceType: 'official',
    officialSource: true,
    lastUpdated: '2024-01-01',
  },
  {
    id: 'urenco-capenhurst',
    name: 'Capenhurst Uranium Enrichment Facility (Urenco UK)',
    country: 'United Kingdom',
    region: 'Western Europe',
    lat: 53.2697,
    lng: -2.9315,
    category: CATEGORIES.FUEL_CYCLE,
    status: STATUSES.OPERATING,
    classification: 'civilian',
    image: null,
    gallery: [],
    officialLiveFeedEmbed: null,
    overview: `Capenhurst, located in Cheshire, England, is home to Urenco UK's uranium enrichment 
    plant. Urenco is a multinational enrichment company owned by UK, Dutch, and German governments 
    and utilities. The Capenhurst facility uses centrifuge enrichment technology to produce low-enriched 
    uranium (LEU) for use as commercial nuclear fuel. Centrifuge enrichment is the commercially dominant 
    enrichment technology globally and is publicly documented in IAEA safeguards literature.`,
    purpose: 'Uranium enrichment for civilian nuclear fuel production (low-enriched uranium, LEU).',
    usageHighLevel: `Gas centrifuge enrichment facility producing LEU (enriched to <5% U-235) for 
    commercial nuclear power reactor fuel. Operates under Euratom/IAEA safeguards. Part of the 
    Urenco group that supplies enrichment services to European and global nuclear utilities.`,
    reactorType: null,
    facilityType: 'Uranium Enrichment (Fuel Cycle)',
    operator: 'Urenco UK Ltd',
    owner: 'Urenco Group (UK/Dutch/German ownership)',
    capacityMW: null,
    electricityRole: null,
    timeline: [
      { year: 1971, event: 'Urenco established through Treaty of Almelo.' },
      { year: 1976, event: 'Gas centrifuge enrichment begins at Capenhurst.' },
      { year: 1982, event: 'Previous diffusion plant closed.' },
    ],
    incidentHistory: [],
    currentStatus: 'Operating. Gas centrifuge enrichment. Under IAEA/ONR safeguards.',
    sources: [
      { name: 'Urenco – Capenhurst', url: 'https://www.urenco.com/our-locations/urenco-uk', type: 'official' },
      { name: 'ONR Nuclear Safeguards', url: 'https://www.onr.org.uk/', type: 'official' },
      { name: 'IAEA Safeguards Documentation', url: 'https://www.iaea.org/topics/safeguards', type: 'official' },
    ],
    sourceType: 'official',
    officialSource: true,
    lastUpdated: '2024-01-01',
  },
  {
    id: 'la-hague',
    name: 'La Hague Reprocessing Plant',
    country: 'France',
    region: 'Western Europe',
    lat: 49.6811,
    lng: -1.8769,
    category: CATEGORIES.FUEL_CYCLE,
    status: STATUSES.OPERATING,
    classification: 'civilian',
    image: null,
    gallery: [],
    officialLiveFeedEmbed: null,
    overview: `La Hague, operated by Orano (formerly Areva NC), is the world's largest commercial 
    spent nuclear fuel reprocessing facility. Located in Normandy, France, it chemically separates 
    usable uranium and plutonium from spent fuel using the PUREX process. The recovered plutonium 
    is fabricated into Mixed Oxide (MOX) fuel, closing part of the nuclear fuel cycle. The facility 
    processes spent fuel from French reactors and, under commercial contracts, from foreign utilities.`,
    purpose: 'Commercial reprocessing of spent nuclear fuel. Separation and recovery of uranium and plutonium for re-use as nuclear fuel. High-level waste vitrification.',
    usageHighLevel: `PUREX-process aqueous reprocessing facility. Outputs: 
    (1) Recycled uranium (reprocessed uranium, RepU) 
    (2) Separated plutonium for MOX fuel fabrication 
    (3) Vitrified high-level waste (HLW glass) 
    Operates under ASN and IAEA safeguards. France's closed nuclear fuel cycle policy is publicly documented.`,
    reactorType: null,
    facilityType: 'Spent Fuel Reprocessing / Fuel Cycle',
    operator: 'Orano',
    owner: 'Orano (formerly Areva)',
    capacityMW: null,
    electricityRole: null,
    timeline: [
      { year: 1966, event: 'UP2 reprocessing plant begins operation.' },
      { year: 1994, event: 'UP3 reprocessing plant begins commercial operation.' },
      { year: 2001, event: 'Reprocessing capacity reaches approximately 1,700 tonnes of heavy metal per year.' },
    ],
    incidentHistory: [],
    currentStatus: 'Operating. Reprocesses spent fuel from French EDF fleet and foreign clients under safeguards.',
    sources: [
      { name: 'Orano – La Hague', url: 'https://www.orano.group/en/nuclear-expertise/our-sites-and-activities/la-hague', type: 'official' },
      { name: 'ASN (French Nuclear Safety Authority)', url: 'https://www.asn.fr/', type: 'official' },
      { name: 'IAEA – Reprocessing Factsheets', url: 'https://www.iaea.org/topics/spent-fuel-management', type: 'official' },
    ],
    sourceType: 'official',
    officialSource: true,
    lastUpdated: '2024-01-01',
  },
  {
    id: 'onkalo',
    name: 'Onkalo Spent Nuclear Fuel Repository',
    country: 'Finland',
    region: 'Northern Europe',
    lat: 61.2333,
    lng: 21.4056,
    category: CATEGORIES.FUEL_CYCLE,
    status: STATUSES.UNDER_CONSTRUCTION,
    classification: 'civilian',
    image: null,
    gallery: [],
    officialLiveFeedEmbed: null,
    overview: `Onkalo (Finnish: "cavity" or "cave") is the world's first deep geological repository (DGR) 
    for the permanent disposal of spent nuclear fuel, currently under construction near the Olkiluoto 
    nuclear power plant site. Operated by Posiva Oy, Onkalo will use the KBS-3 method: spent fuel 
    assemblies are enclosed in copper canisters surrounded by bentonite clay, placed in boreholes 
    approximately 400–450 metres below surface in stable Precambrian bedrock. Construction and 
    commissioning are ongoing, with disposal operations expected to begin in the 2020s.`,
    purpose: 'Permanent deep geological disposal of spent nuclear fuel from Finnish reactors.',
    usageHighLevel: `World's first operational deep geological repository under construction. 
    Uses KBS-3 engineered barrier system in stable granitic bedrock. No reprocessing; direct disposal 
    of spent fuel assemblies. Subject to STUK regulatory oversight and public reporting under 
    Finnish nuclear energy legislation.`,
    reactorType: null,
    facilityType: 'Deep Geological Repository (Spent Fuel Disposal)',
    operator: 'Posiva Oy',
    owner: 'Posiva Oy (owned by TVO and Fortum)',
    capacityMW: null,
    electricityRole: null,
    timeline: [
      { year: 2004, event: 'Underground rock characterization begins (ONKALO rock characterization facility).' },
      { year: 2015, event: 'Operating licence application submitted to Finnish government.' },
      { year: 2021, event: 'Finnish government grants construction licence for the disposal facility.' },
      { year: 2025, event: 'Disposal operations expected to begin (subject to regulatory completion).' },
    ],
    incidentHistory: [],
    currentStatus: 'Under construction. Construction licence granted 2021. Disposal operations preparation ongoing.',
    sources: [
      { name: 'Posiva Oy – Onkalo', url: 'https://www.posiva.fi/en', type: 'official' },
      { name: 'STUK – Nuclear Waste Management', url: 'https://www.stuk.fi/en', type: 'official' },
      { name: 'IAEA – Geological Disposal', url: 'https://www.iaea.org/topics/geological-disposal', type: 'official' },
    ],
    sourceType: 'official',
    officialSource: true,
    lastUpdated: '2024-01-01',
  },
];

export default facilities;
