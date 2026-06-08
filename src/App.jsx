import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import AppLayout from './components/AppLayout';
import HomePage from './pages/HomePage';
import InfrastructurePage from './pages/InfrastructurePage';
import AnalysisPage from './pages/AnalysisPage';
import NuclearBasicsPage from './pages/NuclearBasicsPage';
import AccidentsPage from './pages/AccidentsPage';
import ArsenalsPage from './pages/ArsenalsPage';
import RadiationHealthPage from './pages/RadiationHealthPage';
import MethodologyPage from './pages/MethodologyPage';
import PolicyPage from './pages/PolicyPage';

export default function App() {
  return (
    <BrowserRouter>
      <AppLayout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/infrastructure" element={<InfrastructurePage />} />
          <Route path="/analysis" element={<AnalysisPage />} />
          <Route path="/policy" element={<PolicyPage />} />
          <Route path="/basics" element={<NuclearBasicsPage />} />
          <Route path="/accidents" element={<AccidentsPage />} />
          <Route path="/arsenals" element={<ArsenalsPage />} />
          <Route path="/radiation" element={<RadiationHealthPage />} />
          <Route path="/methodology" element={<MethodologyPage />} />
          {/* Legacy aliases for old routes */}
          <Route path="/history" element={<Navigate to="/accidents" replace />} />
          <Route path="/fusion" element={<Navigate to="/basics" replace />} />
          <Route path="/fuel-cycle" element={<Navigate to="/basics" replace />} />
          <Route path="/radar" element={<Navigate to="/infrastructure" replace />} />
        </Routes>
      </AppLayout>
    </BrowserRouter>
  );
}
