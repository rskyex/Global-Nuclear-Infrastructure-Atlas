import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AppLayout from './components/AppLayout';
import HomePage from './pages/HomePage';
import FuelCyclePage from './pages/FuelCyclePage';
import AccidentsPage from './pages/AccidentsPage';
import MethodologyPage from './pages/MethodologyPage';

export default function App() {
  return (
    <BrowserRouter>
      <AppLayout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/fuel-cycle" element={<FuelCyclePage />} />
          <Route path="/accidents" element={<AccidentsPage />} />
          <Route path="/methodology" element={<MethodologyPage />} />
        </Routes>
      </AppLayout>
    </BrowserRouter>
  );
}
