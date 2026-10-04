import { Header } from './components/Header';
import { useSEORouter } from './hooks/useSEORouter';
import { SearchSection } from './components/SearchSection';
import { MyJourneyDashboard } from './components/MyJourneyDashboard';
import { CitizenshipCalculator } from './components/CitizenshipCalculator';
import { ScorecardCalculator } from './components/ScorecardCalculator';
import { LetterTemplates } from './components/LetterTemplates';
import { EmergencyTaxGuide } from './components/EmergencyTaxGuide';
import { PolicyUpdates } from './components/PolicyUpdates';
import { DirectoryGrid } from './components/DirectoryGrid';
import { Footer } from './components/Footer';

export function App() {
  const { activeTab, setActiveTab } = useSEORouter();

  return (
    <div className="flex min-h-screen flex-col bg-stone-50 font-sans text-stone-900 selection:bg-emerald-200 selection:text-emerald-950 dark:bg-stone-950 dark:text-stone-100 dark:selection:bg-emerald-900 dark:selection:text-emerald-100 bg-[radial-gradient(ellipse_80%_50%_at_50%_-10%,rgba(16,185,129,0.08),rgba(255,255,255,0))] dark:bg-[radial-gradient(ellipse_80%_50%_at_50%_-10%,rgba(16,185,129,0.12),rgba(0,0,0,0))]">
      <Header activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <main className="flex-1 pb-16 md:pb-0">
        {activeTab === 'search' && <SearchSection />}
        {activeTab === 'journey' && <MyJourneyDashboard setActiveTab={setActiveTab} />}
        {activeTab === 'calculator' && <CitizenshipCalculator />}
        {activeTab === 'scorecard' && <ScorecardCalculator />}
        {activeTab === 'letters' && <LetterTemplates />}
        {activeTab === 'emergency-tax' && <EmergencyTaxGuide />}
        {activeTab === 'updates' && <PolicyUpdates />}
        {activeTab === 'directory' && <DirectoryGrid />}
      </main>

      <Footer setActiveTab={setActiveTab} />
    </div>
  );
}

export default App;
