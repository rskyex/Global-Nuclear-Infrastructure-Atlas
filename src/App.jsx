import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AppLayout from './components/AppLayout';
import HomePage from './pages/HomePage';
import FuelCyclePage from './pages/FuelCyclePage';
import AccidentsPage from './pages/AccidentsPage';
import RadarPage from './pages/RadarPage';

// MethodologyPage removed as a standalone route – methodology content now lives in the
// bottom section of HomePage (anchor: #methodology). See HomePage.jsx.

export default function App() {
  return (
    <BrowserRouter>
      <AppLayout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/history" element={<AccidentsPage />} />
          {/* /accidents kept as alias so old links still work */}
          <Route path="/accidents" element={<AccidentsPage />} />
          <Route path="/fusion" element={<FuelCyclePage />} />
          {/* /fuel-cycle kept as alias */}
          <Route path="/fuel-cycle" element={<FuelCyclePage />} />
          <Route path="/radar" element={<RadarPage />} />
        </Routes>
      </AppLayout>
    </BrowserRouter>
  );
}
