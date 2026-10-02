import { useState } from 'react';
import { Header } from './components/Header';
import { SearchSection } from './components/SearchSection';
import { CitizenshipCalculator } from './components/CitizenshipCalculator';
import { EmergencyTaxGuide } from './components/EmergencyTaxGuide';
import { PolicyUpdates } from './components/PolicyUpdates';
import { DirectoryGrid } from './components/DirectoryGrid';
import { Footer } from './components/Footer';

export function App() {
  const [activeTab, setActiveTab] = useState<'search' | 'calculator' | 'directory' | 'emergency-tax' | 'updates'>('search');

  return (
    <div className="flex min-h-screen flex-col bg-stone-50 font-sans text-stone-900 selection:bg-emerald-100 selection:text-emerald-900 dark:bg-stone-950 dark:text-stone-100 dark:selection:bg-emerald-950 dark:selection:text-emerald-200">
      <Header activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <main className="flex-1">
        {activeTab === 'search' && <SearchSection />}
        {activeTab === 'calculator' && <CitizenshipCalculator />}
        {activeTab === 'emergency-tax' && <EmergencyTaxGuide />}
        {activeTab === 'updates' && <PolicyUpdates />}
        {activeTab === 'directory' && <DirectoryGrid />}
      </main>

      <Footer />
    </div>
  );
}

export default App;
