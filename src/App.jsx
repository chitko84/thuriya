import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import GatewayPortal from './components/GatewayPortal';
import AuthModal from './components/AuthModal';
import Onboarding from './components/Onboarding';
import CandidateDashboard from './components/CandidateDashboard';
import EmployerDashboard from './components/EmployerDashboard';
import UniversityConsole from './components/UniversityConsole';

export default function App() {
  const [currentView, setCurrentView] = useState('gateway'); // 'gateway' | 'auth_modal' | 'onboarding' | 'candidate_panel' | 'employer_panel' | 'university_panel'
  const [selectedRole, setSelectedRole] = useState(null); // 'candidate' | 'employer' | 'university'
  const [universityConfig, setUniversityConfig] = useState({
    dept: 'cs',
    cohort: '2026'
  });

  return (
    <div className="min-h-screen bg-[#0B0F12] text-[#F7F9FA] selection:bg-[#00E5FF]/20 selection:text-[#00E5FF] font-sans">
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
              setUniversityConfig={setUniversityConfig}
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
            <UniversityConsole 
              setCurrentView={setCurrentView} 
              universityConfig={universityConfig}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
