// Fails if any lookup table in src/data/enrichedFacilities.js references an id
// that is not a plant in src/data/commercialPlants.js, if a plant lacks its IAEA
// PRIS country link, if the safeguards-gap counter disagrees with the
// per-plant flag, if the UCDP conflict extract is more than 12 months old, or
// if a plant's score disagrees with the rules recorded for it. Run with `npm run check:data`.
import { createServer } from 'vite';

const server = await createServer({
  configFile: false,
  appType: 'custom',
  logLevel: 'silent',
  // No dependency pre-bundling: the script only loads local data modules.
  optimizeDeps: { noDiscovery: true, include: [] },
  server: { middlewareMode: true, hmr: false, ws: false },
});

let failed = false;
try {
  const { commercialPlants } = await server.ssrLoadModule('/src/data/commercialPlants.js');
  const { facilityLookups, enrichedFacilities, facilitySummary } = await server.ssrLoadModule('/src/data/enrichedFacilities.js');
  const plantIds = new Set(commercialPlants.map((p) => p.id));

  for (const [name, table] of Object.entries(facilityLookups)) {
    const ids = table instanceof Set ? [...table] : Object.keys(table);
    const unknown = ids.filter((id) => !plantIds.has(id));
    if (unknown.length) {
      failed = true;
      console.error(`${name}: ${unknown.length} id(s) not in commercialPlants: ${unknown.join(', ')}`);
    } else {
      console.log(`${name}: ${ids.length} id(s) OK`);
    }
  }

  // Every plant links to its PRIS country page.
  const noPris = enrichedFacilities.filter(
    (p) => !(p.sources || []).some((src) => /^https:\/\/pris-stats\.iaea\.org\/country-statistics\/[A-Z]{2}$/.test(src.url || '')),
  );
  if (noPris.length) {
    failed = true;
    console.error(`PRIS country link missing: ${noPris.map((p) => p.id).join(', ')}`);
  } else console.log(`PRIS country links: ${enrichedFacilities.length} plants OK`);

  // The UCDP extract behind conflict exposure must be refreshed at least yearly.
  const { conflictRule } = await server.ssrLoadModule('/src/data/generated/conflictExposure.js');
  const ageDays = (Date.now() - Date.parse(`${conflictRule.extractDate}T00:00:00Z`)) / 86400000;
  if (!(ageDays <= 366)) {
    failed = true;
    console.error(`UCDP extract is ${Math.floor(ageDays)} days old (${conflictRule.extractDate}); refresh it with scripts/extract-ucdp.py and npm run gen:conflict`);
  } else console.log(`UCDP extract ${conflictRule.extractDate}: ${Math.floor(ageDays)} days old, OK`);

  // Each score equals 1 plus the points of the rules recorded for the plant (capped at 5).
  const badScore = enrichedFacilities.filter((p) => {
    const pts = p.governance_score_rules.reduce((s, r) => s + Number(r.match(/\+(\d+)$/)[1]), 0);
    return Math.min(1 + pts, 5) !== p.governance_risk_score;
  });
  if (badScore.length) {
    failed = true;
    console.error(`Score does not match recorded rules: ${badScore.map((p) => p.id).join(', ')}`);
  } else console.log(`Score rules: ${enrichedFacilities.length} plants agree`);

  // The counter and the per-plant flag use one definition.
  const gaps = enrichedFacilities.filter((p) => p.safeguards_gap).length;
  if (gaps !== facilitySummary.safeguardsGaps) {
    failed = true;
    console.error(`Safeguards gaps: counter ${facilitySummary.safeguardsGaps} vs flags ${gaps}`);
  } else console.log(`Safeguards gaps: ${gaps} plants, counter agrees`);
} finally {
  await server.close();
}

if (failed) {
  console.error('check:data failed');
  process.exit(1);
}
console.log(`check:data passed`);
