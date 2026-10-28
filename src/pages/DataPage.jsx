import { motion } from 'framer-motion';
import { Database, Download, FileJson, FileSpreadsheet, Info } from 'lucide-react';
import {
  DATASET_VERSION,
  DATASET_LAST_UPDATED,
  PLANT_COLUMNS,
  plantsMeta,
  plantsCsv,
  plantsJson,
  downloadText,
  sourceCoverage,
} from '../utils/datasetExport';

const MONO = { fontFamily: 'JetBrains Mono, monospace' };
const BASE_NAME = `nuclear-commercial-plants-v${DATASET_VERSION}`;

function Stat({ label, value, testId }) {
  return (
    <div className="rounded-lg px-4 py-3" data-testid={testId}
      style={{ background: 'rgba(13,27,46,0.8)', border: '1px solid rgba(26,48,80,0.8)' }}>
      <div className="text-xs text-slate-500 uppercase tracking-wider mb-1">{label}</div>
      <div className="text-lg font-semibold text-slate-100" style={MONO}>{value}</div>
    </div>
  );
}

export default function DataPage() {
  const cov = sourceCoverage();
  return (
    <div className="min-h-full overflow-y-auto px-4 sm:px-6 py-8 max-w-5xl mx-auto" style={{ background: '#040d1a' }}>
      <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-9 h-9 rounded-lg flex items-center justify-center"
            style={{ background: 'rgba(59,130,246,0.12)', border: '1px solid rgba(59,130,246,0.25)' }}>
            <Database size={17} className="text-blue-400" />
          </div>
          <h1 className="text-2xl font-bold text-white">Data</h1>
        </div>
        <p className="text-sm text-slate-400 max-w-2xl leading-relaxed">
          Download the commercial nuclear power plant dataset behind the infrastructure map.
          The files are generated in your browser from the same records the map uses, so
          what you download is what the site shows.
        </p>
      </motion.div>

      <section className="mb-10">
        <h2 className="text-base font-semibold text-slate-100 mb-4">Commercial nuclear power plants</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-5">
          <Stat label="Version" value={DATASET_VERSION} testId="nuc-version" />
          <Stat label="Last updated" value={DATASET_LAST_UPDATED} testId="nuc-updated" />
          <Stat label="Records" value={plantsMeta.recordCount} testId="nuc-count" />
          <Stat label="Records with a source" value={`${cov.withSource} / ${cov.total}`} testId="nuc-sourced" />
        </div>
        <div className="flex flex-wrap gap-3 mb-4">
          <button type="button"
            onClick={() => downloadText(`${BASE_NAME}.csv`, plantsCsv(), 'text/csv')}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium text-white bg-blue-600 hover:bg-blue-500 transition-colors">
            <FileSpreadsheet size={15} /> Download CSV
          </button>
          <button type="button"
            onClick={() => downloadText(`${BASE_NAME}.json`, plantsJson(), 'application/json')}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium text-blue-300 border border-blue-800/70 hover:bg-blue-950/50 transition-colors">
            <FileJson size={15} /> Download JSON
          </button>
        </div>
        <div className="text-xs text-slate-500 leading-relaxed space-y-2 max-w-3xl">
          <p>
            Both files carry the dataset version, last-updated date and record count. In the JSON
            they sit under <span style={MONO}>meta</span> with the records under <span style={MONO}>records</span>.
            In the CSV they are comment lines starting with <span style={MONO}>#</span> at the top
            (in pandas, read with <span style={MONO}>comment=&quot;#&quot;</span>).
          </p>
          <p>
            Last updated is the date the plant records were last changed. Each record also has its
            own review date (<span style={MONO}>record_last_updated</span>). Plant status reflects
            the latest public reporting at that review date, not live operations.
          </p>
        </div>
      </section>

      <section className="mb-10">
        <div className="flex items-start gap-2 rounded-lg p-4"
          style={{ background: 'rgba(245,158,11,0.06)', border: '1px solid rgba(245,158,11,0.25)' }}>
          <Info size={15} className="text-amber-400 flex-shrink-0 mt-0.5" />
          <div className="text-xs text-slate-300 leading-relaxed">
            <p className="font-semibold text-amber-300 mb-1">Source coverage</p>
            <p>
              {cov.withSource} of {cov.total} plant records cite at least one source, and the
              facility detail panel lists them. For {cov.genericOnly} records the only source is the
              IAEA PRIS home page rather than a plant-specific page, so a verifier should look the
              plant up in PRIS by name. Governance, safeguards and risk fields added in the analysis
              layers are derived annotations and are not individually sourced.
            </p>
          </div>
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-base font-semibold text-slate-100 mb-4">CSV columns</h2>
        <div className="overflow-x-auto rounded-lg" style={{ border: '1px solid rgba(26,48,80,0.8)' }}>
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr style={{ background: 'rgba(13,27,46,0.8)' }}>
                <th className="text-left p-3 text-xs font-semibold text-slate-400 uppercase tracking-wider">Column</th>
                <th className="text-left p-3 text-xs font-semibold text-slate-400 uppercase tracking-wider">Description</th>
              </tr>
            </thead>
            <tbody>
              {PLANT_COLUMNS.map((c) => (
                <tr key={c.key} style={{ borderTop: '1px solid rgba(26,48,80,0.5)' }}>
                  <td className="p-3 text-xs text-blue-300 whitespace-nowrap align-top" style={MONO}>{c.key}</td>
                  <td className="p-3 text-xs text-slate-400">{c.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <p className="text-xs text-slate-600 pb-6 flex items-center gap-1.5">
        <Download size={12} /> Generated client side. Cite the version number when you report a check.
      </p>
    </div>
  );
}
