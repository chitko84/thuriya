import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import GatewayPortal from './components/GatewayPortal';
import AuthModal from './components/AuthModal';
import Onboarding from './components/Onboarding';
import CandidateDashboard from './components/CandidateDashboard';
import EmployerDashboard from './components/EmployerDashboard';
import UniversityConsole from './components/UniversityConsole';
import AdminDashboard from './components/AdminDashboard';
import TrendingTalentPage from './components/TrendingTalentPage';
import { ensureWorkspaceAccounts } from './data/workspaceData';

export default function App() {
  const [currentView, setCurrentView] = useState(() => {
    if (window.location.pathname === '/trending-talent') return 'trending_talent';
    return localStorage.getItem('thuriya_view') || 'gateway';
  });
  const [selectedRole, setSelectedRole] = useState(() => {
    return localStorage.getItem('thuriya_role') || null;
  });
  useEffect(() => {
    ensureWorkspaceAccounts();
  }, []);

  useEffect(() => {
    localStorage.setItem('thuriya_view', currentView);
    if (currentView === 'trending_talent' && window.location.pathname !== '/trending-talent') {
      window.history.pushState({}, '', '/trending-talent');
    }
    if (currentView !== 'trending_talent' && window.location.pathname === '/trending-talent') {
      window.history.pushState({}, '', '/');
    }
  }, [currentView]);

  useEffect(() => {
    const onPopState = () => {
      setCurrentView(window.location.pathname === '/trending-talent' ? 'trending_talent' : 'gateway');
    };
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  useEffect(() => {
    if (selectedRole) {
      localStorage.setItem('thuriya_role', selectedRole);
    } else {
      localStorage.removeItem('thuriya_role');
    }
  }, [selectedRole]);

  return (
    <div className="min-h-screen bg-[#F7F5EF] text-[#141414] selection:bg-[#D8B866]/30 selection:text-black font-sans">
      <AnimatePresence mode="wait">
        {currentView === 'gateway' && (
          <motion.div
            key="gateway"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <GatewayPortal setCurrentView={setCurrentView} />
          </motion.div>
        )}

        {currentView === 'auth_modal' && (
          <motion.div
            key="auth_modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <AuthModal
              setCurrentView={setCurrentView}
              selectedRole={selectedRole}
              setSelectedRole={setSelectedRole}
            />
          </motion.div>
        )}

        {currentView === 'trending_talent' && (
          <motion.div
            key="trending_talent"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <TrendingTalentPage setCurrentView={setCurrentView} />
          </motion.div>
        )}

        {currentView === 'onboarding' && (
          <motion.div
            key="onboarding"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <Onboarding
              selectedRole={selectedRole}
              setCurrentView={setCurrentView}
            />
          </motion.div>
        )}

        {currentView === 'candidate_panel' && (
          <motion.div
            key="candidate_panel"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <CandidateDashboard setCurrentView={setCurrentView} />
          </motion.div>
        )}

        {currentView === 'employer_panel' && (
          <motion.div
            key="employer_panel"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <EmployerDashboard setCurrentView={setCurrentView} />
          </motion.div>
        )}

        {currentView === 'university_panel' && (
          <motion.div
            key="university_panel"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <UniversityConsole setCurrentView={setCurrentView} />
          </motion.div>
        )}

        {currentView === 'admin_panel' && (
          <motion.div
            key="admin_panel"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <AdminDashboard setCurrentView={setCurrentView} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
