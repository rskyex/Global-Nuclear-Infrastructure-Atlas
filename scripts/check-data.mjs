// Fails if any lookup table in src/data/enrichedFacilities.js references an id
// that is not a plant in src/data/commercialPlants.js, if a plant lacks its IAEA
// PRIS country link, or if the safeguards-gap counter disagrees with the
// per-plant flag. Run with `npm run check:data`.
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
