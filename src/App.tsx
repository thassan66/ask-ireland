import { useState } from 'react';
import { Header, NavigationTab } from './components/Header';
import { SearchSection } from './components/SearchSection';
import { CitizenshipCalculator } from './components/CitizenshipCalculator';
import { ScorecardCalculator } from './components/ScorecardCalculator';
import { LetterTemplates } from './components/LetterTemplates';
import { EmergencyTaxGuide } from './components/EmergencyTaxGuide';
import { PolicyUpdates } from './components/PolicyUpdates';
import { DirectoryGrid } from './components/DirectoryGrid';
import { Footer } from './components/Footer';

export function App() {
  const [activeTab, setActiveTab] = useState<NavigationTab>('search');

  return (
    <div className="flex min-h-screen flex-col bg-stone-50 font-sans text-stone-900 selection:bg-emerald-100 selection:text-emerald-900 dark:bg-stone-950 dark:text-stone-100 dark:selection:bg-emerald-950 dark:selection:text-emerald-200">
      <Header activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <main className="flex-1 pb-16 md:pb-0">
        {activeTab === 'search' && <SearchSection />}
        {activeTab === 'calculator' && <CitizenshipCalculator />}
        {activeTab === 'scorecard' && <ScorecardCalculator />}
        {activeTab === 'letters' && <LetterTemplates />}
        {activeTab === 'emergency-tax' && <EmergencyTaxGuide />}
        {activeTab === 'updates' && <PolicyUpdates />}
        {activeTab === 'directory' && <DirectoryGrid />}
      </main>

      <Footer />
    </div>
  );
}

export default App;
