import { useCallback, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';

/**
 * useLayerState — composable, URL-synced state for the Analysis Layers.
 *
 * Encodes everything needed to share/restore a view in query params:
 *   ?layers=legal,oversight        active layer ids (comma separated)
 *   &op=oversight:60,legal:80       per-layer opacity as integer percent (omitted when 100)
 *   &t=2011                         time position (year) for the temporal layer
 *   &cfg={...}                      per-layer UI settings (regime, filters…) as JSON
 *
 * Toggling a layer or changing opacity only rewrites these params; the map
 * instance is never remounted, so the view and other layers are preserved.
 *
 * @param {Array<{id: string, defaultOn?: boolean}>} registry
 * @param {{ defaultYear?: number }} [options]
 */
export default function useLayerState(registry, { defaultYear = 2024 } = {}) {
  const [params, setParams] = useSearchParams();

  const activeIds = useMemo(() => {
    const raw = params.get('layers');
    if (raw === null) {
      return registry.filter((l) => l.defaultOn).map((l) => l.id);
    }
    if (raw === '') return [];
    const valid = new Set(registry.map((l) => l.id));
    return raw.split(',').filter((id) => valid.has(id));
  }, [params, registry]);

  const activeSet = useMemo(() => new Set(activeIds), [activeIds]);

  const opacity = useMemo(() => {
    const map = {};
    const raw = params.get('op');
    if (raw) {
      raw.split(',').forEach((pair) => {
        const [id, val] = pair.split(':');
        const pct = Number(val);
        if (id && Number.isFinite(pct)) map[id] = Math.min(1, Math.max(0, pct / 100));
      });
    }
    return map;
  }, [params]);

  const year = useMemo(() => {
    const raw = params.get('t');
    const n = Number(raw);
    return raw !== null && Number.isFinite(n) ? n : defaultYear;
  }, [params, defaultYear]);

  // Per-layer UI settings (e.g. legal.regime, fuelcycle.stages) as JSON in `cfg`,
  // so filters and selectors are shareable and restore on reload.
  const settings = useMemo(() => {
    const raw = params.get('cfg');
    if (!raw) return {};
    try {
      const parsed = JSON.parse(raw);
      return parsed && typeof parsed === 'object' ? parsed : {};
    } catch {
      return {};
    }
  }, [params]);

  const getOpacity = useCallback((id) => (id in opacity ? opacity[id] : 1), [opacity]);

  /** Update params immutably, dropping empties, preserving unrelated keys. */
  const patch = useCallback((mutate) => {
    setParams((prev) => {
      const next = new URLSearchParams(prev);
      mutate(next);
      return next;
    }, { replace: true });
  }, [setParams]);

  const toggleLayer = useCallback((id) => {
    const nextIds = activeSet.has(id)
      ? activeIds.filter((x) => x !== id)
      : [...activeIds, id];
    patch((p) => {
      if (nextIds.length === 0) p.set('layers', '');
      else p.set('layers', nextIds.join(','));
    });
  }, [activeIds, activeSet, patch]);

  const setLayerOpacity = useCallback((id, value) => {
    const next = { ...opacity };
    if (value >= 1) delete next[id];
    else next[id] = Math.min(1, Math.max(0, value));
    const serialized = Object.entries(next)
      .map(([k, v]) => `${k}:${Math.round(v * 100)}`)
      .join(',');
    patch((p) => {
      if (serialized) p.set('op', serialized);
      else p.delete('op');
    });
  }, [opacity, patch]);

  const setYear = useCallback((y) => {
    patch((p) => {
      if (y === defaultYear) p.delete('t');
      else p.set('t', String(y));
    });
  }, [patch, defaultYear]);

  // Read current cfg from a params instance (so updates never use a stale closure).
  const readCfg = (p) => {
    const raw = p.get('cfg');
    if (!raw) return {};
    try { return JSON.parse(raw) || {}; } catch { return {}; }
  };

  const setSetting = useCallback((layerId, key, value) => {
    patch((p) => {
      const cur = readCfg(p);
      const next = { ...cur, [layerId]: { ...cur[layerId], [key]: value } };
      const serial = JSON.stringify(next);
      if (serial === '{}') p.delete('cfg');
      else p.set('cfg', serial);
    });
  }, [patch]);

  return {
    activeIds,
    activeSet,
    isActive: useCallback((id) => activeSet.has(id), [activeSet]),
    getOpacity,
    toggleLayer,
    setLayerOpacity,
    year,
    setYear,
    settings,
    setSetting,
  };
}
