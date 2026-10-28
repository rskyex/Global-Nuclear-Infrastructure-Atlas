// Fails if any lookup table in src/data/enrichedFacilities.js references an id
// that is not a plant in src/data/commercialPlants.js. Run with `npm run check:data`.
import { createServer } from 'vite';

const server = await createServer({
  configFile: false,
  appType: 'custom',
  logLevel: 'silent',
  server: { middlewareMode: true, hmr: false, ws: false },
});

let failed = false;
try {
  const { commercialPlants } = await server.ssrLoadModule('/src/data/commercialPlants.js');
  const { facilityLookups } = await server.ssrLoadModule('/src/data/enrichedFacilities.js');
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
} finally {
  await server.close();
}

if (failed) {
  console.error('check:data failed');
  process.exit(1);
}
console.log(`check:data passed`);
