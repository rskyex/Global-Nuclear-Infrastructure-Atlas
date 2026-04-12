/**
 * Governance Timeline Events
 * For temporal animation layer (Section 3)
 * Sources: IAEA, UNODA, WNA, public record
 */

export const governanceEvents = [
  { year: 1945, title: 'First nuclear weapons used', description: 'Hiroshima and Nagasaki atomic bombings.', category: 'conflict' },
  { year: 1953, title: 'Atoms for Peace', description: 'Eisenhower delivers Atoms for Peace speech to UN General Assembly.', category: 'policy' },
  { year: 1957, title: 'IAEA established', description: 'International Atomic Energy Agency begins operations.', category: 'treaty' },
  { year: 1968, title: 'NPT opens for signature', description: 'Treaty on the Non-Proliferation of Nuclear Weapons opened for signature.', category: 'treaty' },
  { year: 1970, title: 'NPT enters into force', description: 'NPT enters into force on 5 March 1970.', category: 'treaty' },
  { year: 1974, title: 'India Smiling Buddha test', description: 'India conducts first nuclear test, described as peaceful.', category: 'proliferation' },
  { year: 1979, title: 'Three Mile Island', description: 'Partial core meltdown at TMI-2, Pennsylvania, USA. INES Level 5.', category: 'accident' },
  { year: 1986, title: 'Chernobyl disaster', description: 'Catastrophic accident at Chernobyl Unit 4, USSR. INES Level 7.', category: 'accident' },
  { year: 1987, title: 'INF Treaty signed', description: 'US-Soviet treaty eliminating intermediate-range nuclear missiles.', category: 'treaty' },
  { year: 1991, title: 'Soviet Union dissolves', description: 'USSR dissolution; nuclear arsenal inherited by Russia, with weapons removed from Ukraine, Belarus, Kazakhstan.', category: 'policy' },
  { year: 1993, title: 'START II signed', description: 'US-Russia strategic arms reduction treaty.', category: 'treaty' },
  { year: 1996, title: 'CTBT opened', description: 'Comprehensive Nuclear-Test-Ban Treaty opened for signature.', category: 'treaty' },
  { year: 1997, title: 'Additional Protocol adopted', description: 'IAEA Additional Protocol (INFCIRC/540) adopted, strengthening safeguards.', category: 'treaty' },
  { year: 1998, title: 'India and Pakistan tests', description: 'Both India and Pakistan conduct nuclear weapons tests.', category: 'proliferation' },
  { year: 2001, title: '9/11 security reviews', description: 'Post-9/11 nuclear security reviews intensify globally.', category: 'policy' },
  { year: 2003, title: 'DPRK withdraws from NPT', description: 'North Korea withdraws from the Non-Proliferation Treaty.', category: 'proliferation' },
  { year: 2006, title: 'DPRK first nuclear test', description: 'North Korea conducts first underground nuclear test.', category: 'proliferation' },
  { year: 2010, title: 'New START signed', description: 'US-Russia New START treaty signed, limiting deployed strategic warheads.', category: 'treaty' },
  { year: 2011, title: 'Fukushima Daiichi', description: 'Triple meltdown after earthquake and tsunami. INES Level 7.', category: 'accident' },
  { year: 2011, title: 'Germany phase-out', description: 'Germany announces accelerated nuclear phase-out by 2022.', category: 'policy' },
  { year: 2015, title: 'JCPOA signed', description: 'Iran nuclear deal (Joint Comprehensive Plan of Action) agreed.', category: 'treaty' },
  { year: 2017, title: 'TPNW adopted', description: 'Treaty on the Prohibition of Nuclear Weapons adopted at UN.', category: 'treaty' },
  { year: 2018, title: 'US withdraws from JCPOA', description: 'United States withdraws from Iran nuclear deal.', category: 'policy' },
  { year: 2022, title: 'Zaporizhzhia events', description: 'Russian forces occupy Zaporizhzhia NPP; IAEA deploys monitoring mission.', category: 'conflict' },
  { year: 2023, title: 'Germany completes phase-out', description: 'Last three German reactors shut down April 2023.', category: 'policy' },
  { year: 2023, title: 'Japan policy reversal', description: 'Japan adopts GX plan allowing reactor restarts and new builds.', category: 'policy' },
  { year: 2023, title: 'S. Korea expansion', description: 'South Korea reverses phase-out; approves new reactor construction.', category: 'policy' },
  { year: 2024, title: 'Belgium extends reactors', description: 'Belgium extends Doel 4 and Tihange 3 by 10 years.', category: 'policy' },
];

export const postFukushimaTimeline = [
  { year: 2011, country: 'Germany', change: 'Announces accelerated phase-out of all nuclear power' },
  { year: 2011, country: 'Japan', change: 'All 54 reactors gradually shut down for safety reviews' },
  { year: 2011, country: 'Switzerland', change: 'Decides not to build new nuclear plants' },
  { year: 2011, country: 'Italy', change: 'Referendum rejects return to nuclear power' },
  { year: 2012, country: 'Belgium', change: 'Confirms nuclear phase-out plan for 2025' },
  { year: 2012, country: 'France', change: 'Hollande pledges to reduce nuclear share to 50%' },
  { year: 2013, country: 'Japan', change: 'NRA begins new regulatory standard reviews' },
  { year: 2015, country: 'Japan', change: 'Sendai reactors become first to restart under NRA standards' },
  { year: 2017, country: 'South Korea', change: 'Moon announces nuclear phase-out policy' },
  { year: 2022, country: 'South Korea', change: 'Yoon reverses phase-out; announces nuclear expansion' },
  { year: 2022, country: 'Japan', change: 'Kishida calls for maximum reactor restarts amid energy crisis' },
  { year: 2022, country: 'Belgium', change: 'Reverses phase-out; extends Doel 4 and Tihange 3' },
  { year: 2023, country: 'Germany', change: 'Final three reactors shut down April 15' },
  { year: 2023, country: 'Japan', change: 'GX plan adopted: restarts, extensions beyond 60 years, new builds' },
  { year: 2023, country: 'Sweden', change: 'Government lifts ban on new reactor construction' },
  { year: 2024, country: 'France', change: 'Macron confirms 6-14 new EPR2 reactor programme' },
];

export default { governanceEvents, postFukushimaTimeline };
