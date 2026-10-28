// Shared basemap configuration for every Leaflet map in the atlas.
//
// OpenStreetMap standard tiles need no API key. The dark look comes from a
// CSS filter on the tile layer (see .basemap-dark in index.css), so the map
// keeps the atlas's dark style without depending on a keyed tile provider.
// Usage follows the OSM tile policy: attribution shown, light traffic only.
export const BASEMAP_URL = 'https://tile.openstreetmap.org/{z}/{x}/{y}.png';
export const BASEMAP_ATTRIBUTION =
  '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';
export const BASEMAP_CLASS = 'basemap-dark';
export const BASEMAP_MAX_ZOOM = 19;

// Shown in place of any tile that fails to load, so a blocked or offline tile
// server leaves the dark map background instead of broken-image icons.
export const BASEMAP_ERROR_TILE =
  'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';
