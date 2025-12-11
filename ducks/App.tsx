
import React, { useState } from 'react';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { About } from './pages/About';
import { Terms } from './pages/Terms';
import { Admin } from './pages/Admin';
import { VerificationChecklist } from './pages/VerificationChecklist';
import { GameProvider } from './store';
import { AppRoute } from './types';

const AppContent: React.FC = () => {
  const [currentRoute, setCurrentRoute] = useState<string>(AppRoute.HOME);

  const renderPage = () => {
    switch (currentRoute) {
      case AppRoute.HOME: return <Home />;
      case AppRoute.ABOUT: return <About />;
      case AppRoute.TERMS: return <Terms />;
      case AppRoute.ADMIN: return <Admin />; // Hidden route usually, but accessible via logic
      case AppRoute.VERIFICATION: return <VerificationChecklist />;
      default: return <Home />;
    }
  };

  return (
    <Layout setCurrentRoute={setCurrentRoute} currentRoute={currentRoute}>
      {renderPage()}
    </Layout>
  );
};

const App: React.FC = () => {
  return (
    <GameProvider>
      <AppContent />
    </GameProvider>
  );
};

export default App;
