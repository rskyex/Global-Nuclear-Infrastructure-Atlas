/**
 * Global Nuclear Infrastructure Atlas – Accident & Major Event Dataset
 *
 * DATA POLICY: Officially published public information only.
 * Sources: IAEA, INSAG, NRC, national regulators, and reputable public references.
 * Educational and policy framing only. Non-sensational presentation.
 *
 * INES Scale reference (IAEA):
 * Level 7 – Major accident
 * Level 6 – Serious accident
 * Level 5 – Accident with wider consequences
 * Level 4 – Accident with local consequences
 * Level 3 – Serious incident
 * Level 2 – Incident
 * Level 1 – Anomaly
 */

export const accidentSites = [
  {
    id: 'chernobyl',
    name: 'Chernobyl Nuclear Power Plant',
    country: 'Ukraine (formerly Ukrainian SSR, USSR)',
    region: 'Eastern Europe',
    lat: 51.3890,
    lng: 30.0993,
    category: 'accident_site',
    status: 'damaged',
    classification: 'accident_site',
    image: null,
    officialLiveFeedEmbed: null,
    inesLevel: 7,
    accidentDate: '1986-04-26',
    overview: `Chernobyl Nuclear Power Plant, located in northern Ukraine near the city of Pripyat, 
    was the site of the most severe nuclear power accident in history on 26 April 1986. 
    Unit 4 of the plant, an RBMK-1000 channel-type boiling water reactor, suffered a catastrophic 
    power excursion and steam explosion during a safety test at low power. This caused the destruction 
    of the reactor and the release of large quantities of radioactive material into the environment. 
    The accident resulted in immediate deaths, the evacuation of approximately 350,000 people from 
    the surrounding area, and long-term radiological consequences across large parts of Europe. 
    The accident is classified INES Level 7.`,
    whatHappened: `During a scheduled safety test intended to evaluate reactor behaviour during a 
    power outage, the RBMK-1000 reactor at Unit 4 was operated at very low power levels – a known 
    unstable condition for this reactor type due to a positive void coefficient. Operator actions 
    combined with reactor design characteristics led to a rapid, uncontrolled power surge. 
    Two explosions (a steam explosion and possibly a prompt criticality event) destroyed the reactor 
    vessel and building, releasing an estimated 5,200 PBq (petabecquerels) of radioactive material, 
    including caesium-137, iodine-131, and other fission products.`,
    whyItHappened: `INSAG-7 (International Nuclear Safety Advisory Group) and subsequent authoritative 
    analyses identified two interconnected root causes: (1) Fundamental design deficiencies in the 
    RBMK-1000 reactor, particularly its positive void coefficient at low power, which created an 
    inherently unstable condition; (2) Serious deficiencies in safety culture and operating 
    procedures, which allowed an unsafe test to proceed. The safety system was deliberately 
    disabled during the test.`,
    immediateConsequences: `2 deaths in the explosion. 28 deaths from acute radiation syndrome (ARS) 
    among emergency workers in the following weeks. Evacuation of Pripyat (approximately 49,000 people) 
    within 36 hours, followed by evacuation of a 30 km Exclusion Zone (approximately 350,000 people 
    total relocated). Firefighters and emergency workers received severe radiation doses.`,
    longTermConsequences: `Radioactive fallout detected across much of Europe, with significant 
    deposition in Belarus, Russia, and Ukraine. WHO/UNSCEAR reports document elevated thyroid cancer 
    rates in children exposed to iodine-131 in affected regions – the most clearly documented long-term 
    public health effect. The Exclusion Zone (30 km radius) remains in place. Long-term remediation 
    is ongoing. The New Safe Confinement (NSC) structure was completed in 2016, enclosing the 
    destroyed Unit 4.`,
    currentStatus: `Units 1–3 were permanently shut down between 1991 and 2000. 
    Unit 4 is enclosed within the New Safe Confinement (NSC), completed 2016. 
    A long-term decommissioning programme is underway managed by the State Specialized Enterprise 
    "Chornobyl NPP". The Exclusion Zone is managed by Ukrainian authorities. Some scientific research 
    tourism is permitted in the zone under controlled conditions. Site conditions are publicly 
    monitored and reported by IAEA and Ukrainian authorities.`,
    remediationStatus: 'New Safe Confinement (NSC) completed 2016. Long-term decommissioning ongoing.',
    timeline: [
      { year: 1977, event: 'Chernobyl NPP Unit 1 begins commercial operation.' },
      { year: 1983, event: 'Unit 4 begins commercial operation.' },
      { year: 1986, event: '26 April: Unit 4 catastrophic accident. Evacuation of Pripyat.' },
      { year: 1986, event: 'Sarcophagus (Object Shelter) constructed over destroyed Unit 4.' },
      { year: 1991, event: 'Unit 2 permanently shut down following turbine building fire.' },
      { year: 1996, event: 'Unit 1 permanently shut down.' },
      { year: 2000, event: 'Unit 3 permanently shut down.' },
      { year: 2016, event: 'New Safe Confinement (NSC) structure completed and moved into position.' },
      { year: 2022, event: 'Site temporarily occupied by Russian forces during conflict; IAEA monitoring continues.' },
    ],
    sources: [
      { name: 'IAEA – Chernobyl Accident Overview', url: 'https://www.iaea.org/topics/chernobyl', type: 'official' },
      { name: 'INSAG-7: The Chernobyl Accident (1992)', url: 'https://www.iaea.org/publications/3786/the-chernobyl-accident', type: 'official' },
      { name: 'UNSCEAR 2008 Report', url: 'https://www.unscear.org/unscear/en/chernobyl.html', type: 'official' },
      { name: 'WHO – Chernobyl at 25', url: 'https://www.who.int/news-room/fact-sheets/detail/chernobyl', type: 'official' },
    ],
    sourceType: 'official',
    officialSource: true,
    lastUpdated: '2024-01-01',
  },
  {
    id: 'fukushima-daiichi',
    name: 'Fukushima Daiichi Nuclear Power Plant',
    country: 'Japan',
    region: 'East Asia',
    lat: 37.4213,
    lng: 141.0328,
    category: 'accident_site',
    status: 'damaged',
    classification: 'accident_site',
    image: null,
    officialLiveFeedEmbed: null,
    inesLevel: 7,
    accidentDate: '2011-03-11',
    overview: `Fukushima Daiichi Nuclear Power Plant, operated by Tokyo Electric Power Company (TEPCO), 
    experienced a series of reactor meltdowns and hydrogen explosions in March 2011 following the 
    Great East Japan Earthquake and subsequent tsunami. This is the second most severe nuclear 
    power accident in history, classified INES Level 7. Units 1, 2, and 3 suffered severe core 
    damage (meltdowns). Unit 4 suffered a hydrogen explosion (its core was not fueled at the time). 
    Large quantities of radioactive material were released to the atmosphere and ocean. 
    Approximately 154,000 people were evacuated from surrounding areas.`,
    whatHappened: `An earthquake measuring M9.0 struck offshore northeast Japan on 11 March 2011, 
    triggering a massive tsunami. The tsunami overwhelmed the plant's coastal seawall and flooded 
    the site, disabling backup diesel generators needed to power cooling systems. 
    Station blackout (loss of all AC power) led to the loss of cooling for Units 1, 2, and 3. 
    Without cooling, core temperatures rose, causing fuel melt and hydrogen accumulation. 
    Hydrogen explosions occurred in reactor buildings 1, 3, and 4. Unit 2 suffered severe primary 
    containment damage.`,
    whyItHappened: `The National Diet of Japan Fukushima Nuclear Accident Independent Investigation 
    Commission (NAIIC) concluded in 2012 that the accident was "fundamentally manmade" – the result 
    of collusion between the government, regulators, and TEPCO, and a failure to implement 
    necessary safety improvements. The tsunami hazard had been publicly documented by some researchers, 
    and the seawall height was insufficient. Station blackout procedures were inadequate.`,
    immediateConsequences: `No direct deaths from radiation in the acute phase. 
    Approximately 2,200 people died from evacuation-related causes (documented by public health studies). 
    154,000 evacuated. Large areas were contaminated with caesium-137 and other fission products. 
    Radioactive water releases to the ocean occurred, with subsequent controlled releases of 
    treated water (ALPS-treated water) beginning in 2023 under IAEA monitoring.`,
    longTermConsequences: `UNSCEAR 2021 report: no direct radiation-attributable cancer deaths expected 
    among the public based on current dosimetric evidence. Significant social and psychological 
    impacts documented. Long-term decontamination programme ongoing. ALPS treated water release 
    programme under IAEA safety review (2023 onward). Some evacuation orders lifted for decontaminated areas.`,
    currentStatus: `Units 1–4 permanently shut down. Decommissioning underway under TEPCO and 
    Japanese government management, expected to take 30–40 years. IAEA actively monitors the 
    ALPS treated water discharge programme and publishes regular public reports. Partial evacuation 
    order lifts in some areas following decontamination.`,
    remediationStatus: 'Decommissioning commenced. ALPS treated water discharge ongoing under IAEA monitoring (from 2023).',
    timeline: [
      { year: 1971, event: 'Unit 1 begins commercial operation.' },
      { year: 1979, event: 'Unit 6 begins commercial operation (final unit).' },
      { year: 2011, event: '11 March: M9.0 earthquake and tsunami. Station blackout. Units 1–3 meltdowns.' },
      { year: 2011, event: 'Hydrogen explosions in units 1, 3, and 4.' },
      { year: 2012, event: 'NAIIC report published: accident declared "fundamentally manmade."' },
      { year: 2013, event: 'Cold shutdown conditions declared for all units.' },
      { year: 2021, event: 'UNSCEAR updated health assessment published.' },
      { year: 2023, event: 'ALPS treated water ocean discharge begins after IAEA safety review.' },
    ],
    sources: [
      { name: 'IAEA – Fukushima Daiichi Status', url: 'https://www.iaea.org/topics/fukushima-daiichi-nuclear-accident', type: 'official' },
      { name: 'NAIIC Report (2012)', url: 'https://www.nsr.go.jp/data/000067939.pdf', type: 'official' },
      { name: 'UNSCEAR – Fukushima', url: 'https://www.unscear.org/unscear/en/fukushima.html', type: 'official' },
      { name: 'TEPCO – Decommissioning Project', url: 'https://www.tepco.co.jp/en/decommission/', type: 'official' },
      { name: 'IAEA ALPS Water Monitoring', url: 'https://www.iaea.org/topics/response/fukushima-daiichi-nuclear-accident/fukushima-daiichi-alps-treated-water-discharge', type: 'official' },
    ],
    sourceType: 'official',
    officialSource: true,
    lastUpdated: '2024-01-01',
  },
  {
    id: 'three-mile-island',
    name: 'Three Mile Island Unit 2',
    country: 'United States',
    region: 'North America',
    lat: 40.1529,
    lng: -76.7252,
    category: 'accident_site',
    status: 'decommissioned',
    classification: 'accident_site',
    image: null,
    officialLiveFeedEmbed: null,
    inesLevel: 5,
    accidentDate: '1979-03-28',
    overview: `Three Mile Island Unit 2 (TMI-2), a Babcock & Wilcox pressurized water reactor located 
    near Harrisburg, Pennsylvania, suffered the most serious nuclear power accident in US history 
    on 28 March 1979. A combination of equipment failure and operator error led to a partial core 
    meltdown. Significant amounts of radioactive gases were released, and a hydrogen bubble formed 
    inside the containment. The accident had limited radiological consequences to the public but 
    profoundly transformed nuclear regulation and safety culture in the United States.`,
    whatHappened: `A failure in the secondary cooling circuit caused the reactor to shut down automatically. 
    A relief valve failed to close properly, causing coolant loss. Confusing instrumentation and 
    operator error led operators to believe the reactor had too much coolant and they reduced 
    emergency cooling. The result was significant core damage – approximately half the core melted. 
    A hydrogen bubble formed in the reactor pressure vessel, raising concerns about explosion 
    potential (subsequently determined not to be a risk in this configuration).`,
    whyItHappened: `The NRC Kemeny Commission (1979) and President's Commission found: 
    (1) Equipment failures (stuck-open relief valve) 
    (2) Control room instrumentation deficiencies 
    (3) Operator training inadequate for accident management 
    (4) NRC regulatory oversight deficiencies 
    The accident catalysed a fundamental reform of US nuclear regulation, including the creation of 
    the Institute of Nuclear Power Operations (INPO) and major NRC procedural and training reforms.`,
    immediateConsequences: `No immediate deaths. Radioactive noble gases released; NRC documented 
    small average dose to local population (below background levels). Approximately 140,000 people 
    voluntarily evacuated surrounding area. Significant public alarm and political impact. 
    TMI-2 permanently shut down.`,
    longTermConsequences: `Columbia University and NRC studies found no statistically significant 
    increase in cancer rates in surrounding population. Major policy consequence: transformed US 
    nuclear regulation. TMI-1 continued to operate and was permanently shut down in 2019 
    (later restarted for grid reliability). Accelerated public opposition to nuclear expansion in the US.`,
    currentStatus: `TMI-2 reactor defueled and in SAFSTOR (safe storage) decommissioning status. 
    TMI-1 permanently shut down 2019. Energy Harbor (subsidiary of Constellation Energy) restarted 
    TMI-1 in 2023 under a power purchase agreement with Microsoft. The TMI-2 defueling and 
    decommissioning are ongoing under NRC oversight.`,
    remediationStatus: 'TMI-2 defueled and in SAFSTOR. Decommissioning ongoing. Site cleanup documented by NRC.',
    timeline: [
      { year: 1974, event: 'TMI-2 begins commercial operation.' },
      { year: 1979, event: '28 March: Partial core meltdown at TMI-2. Kemeny Commission investigation.' },
      { year: 1990, event: 'TMI-2 reactor vessel defueling completed.' },
      { year: 1993, event: 'NRC approves SAFSTOR for TMI-2.' },
      { year: 2019, event: 'TMI-1 permanently shut down.' },
      { year: 2023, event: 'TMI-1 restarted under Constellation Energy / Microsoft PPA (publicly documented).' },
    ],
    sources: [
      { name: 'NRC – Three Mile Island', url: 'https://www.nrc.gov/reading-rm/doc-collections/fact-sheets/3mile-isle.html', type: 'official' },
      { name: 'NRC – TMI Accident Report', url: 'https://www.nrc.gov/docs/ML0421/ML042160279.pdf', type: 'official' },
      { name: 'IAEA PRIS', url: 'https://pris.iaea.org/', type: 'official' },
    ],
    sourceType: 'official',
    officialSource: true,
    lastUpdated: '2024-01-01',
  },
  {
    id: 'windscale-1957',
    name: 'Windscale Pile No. 1 Fire (1957)',
    country: 'United Kingdom',
    region: 'Western Europe',
    lat: 54.4213,
    lng: -3.5046,
    category: 'accident_site',
    status: 'decommissioned',
    classification: 'accident_site',
    image: null,
    officialLiveFeedEmbed: null,
    inesLevel: 5,
    accidentDate: '1957-10-10',
    overview: `The Windscale fire of 10 October 1957 was a nuclear accident that occurred at the 
    Windscale site (now Sellafield) in Cumberland, England. Windscale Pile No. 1, an air-cooled 
    graphite-moderated reactor used for the production of plutonium and other military-programme 
    materials, caught fire. The graphite moderator and uranium fuel burned for approximately two days, 
    releasing radioactive contamination across parts of the UK and northwestern Europe.`,
    whatHappened: `During an operation to release Wigner energy (energy stored in the graphite 
    moderator lattice due to neutron bombardment – a known phenomenon), operators applied heat 
    to the reactor core. The temperature rise was not adequately monitored, and a fire started 
    in the fuel cartridges. The fire burned for approximately two days. Efforts to cool the 
    reactor with water ultimately succeeded in extinguishing the fire.`,
    whyItHappened: `Subsequent official review identified: (1) Inadequate temperature instrumentation 
    and monitoring during the annealing operation; (2) Insufficient understanding of the annealing 
    process at the time; (3) Pressure to proceed despite some early warning signs. The 1957 Penney 
    Report was originally classified; a declassified version was released decades later.`,
    immediateConsequences: `No immediate fatalities. Radioactive contamination – including iodine-131, 
    caesium-137, and polonium-210 – released over parts of England, Wales, and northwestern Europe. 
    Milk from farms within a 200-square-mile radius was condemned and destroyed. Windscale Pile No. 1 
    was permanently shut down. Windscale Pile No. 2 shut down as a precautionary measure.`,
    longTermConsequences: `A 2010 Cancer Research UK / HPA study estimated approximately 240 additional 
    cancer cases may have been attributable to the release over the subsequent decades, though this 
    estimate carries uncertainty. The destroyed reactor building (Pile 1) has been encapsulated and 
    is being decommissioned as part of the Sellafield decommissioning programme.`,
    currentStatus: 'Windscale Pile 1 encapsulated and in decommissioning programme. Part of Sellafield NDA estate.',
    remediationStatus: 'Pile 1 encapsulated. Long-term decommissioning underway as part of Sellafield NDA programme.',
    timeline: [
      { year: 1950, event: 'Windscale Pile 1 begins operation.' },
      { year: 1957, event: '10–12 October: Graphite/fuel fire. Contamination release. Both Windscale Piles permanently shut down.' },
      { year: 1983, event: 'Penney Report partially released to public.' },
      { year: 2000, event: 'Full decommissioning programme begins under NDA framework.' },
    ],
    sources: [
      { name: 'UK Health Security Agency (UKHSA) – Windscale', url: 'https://www.gov.uk/guidance/windscale-fire-1957-health-study', type: 'official' },
      { name: 'Sellafield Ltd – History', url: 'https://www.sellafieldsites.com/', type: 'official' },
      { name: 'IAEA – Windscale 1957 (INES)', url: 'https://www.iaea.org/topics/ines', type: 'official' },
    ],
    sourceType: 'official',
    officialSource: true,
    lastUpdated: '2024-01-01',
  },
];

export default accidentSites;
