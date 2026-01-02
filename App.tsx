
import React, { useState, useEffect, useRef } from 'react';
import Sidebar from './components/Sidebar';
import ScannerView from './components/ScannerView';
import FrequencyMonitor from './components/FrequencyMonitor';
import EntityClassifier from './components/EntityClassifier';
import Dashboard from './components/Dashboard';
import SpiritsDatabase from './components/SpiritsDatabase';
import ForbiddenArchives from './components/ForbiddenArchives';
import SpiritualDefense from './components/SpiritualDefense';
import SpiritChat from './components/SpiritChat';
import HelpView from './components/HelpView';
import UfoDetector from './components/UfoDetector';
import { ViewType, DetectionState, UserProfile, Spirit } from './types';

const App: React.FC = () => {
  const [activeView, setActiveView] = useState<ViewType>(ViewType.DASHBOARD);
  const [selectedSpirit, setSelectedSpirit] = useState<Spirit | null>(null);
  const [smoothedRiskLevel, setSmoothedRiskLevel] = useState(0);
  
  const [user] = useState<UserProfile>({
    name: 'Investigador Elite',
    age: 'N/A',
    country: 'Brasil',
    phone: 'N/A',
    email: 'acesso@vog.gov',
    username: 'OMEGA_OPERATOR',
    plan: 'ARQUIVISTA',
    isActive: true
  });
  
  const [detectionState, setDetectionState] = useState<DetectionState>({
    isScanning: false,
    signals: [],
    lastEntity: null,
    riskLevel: 0,
    metrics: { visual: 0, audio: 0, magnetic: 0 }
  });

  const lastSensorUpdate = useRef(0);
  useEffect(() => {
    const handleMotion = (event: DeviceMotionEvent) => {
      const now = Date.now();
      if (now - lastSensorUpdate.current < 200) return;
      lastSensorUpdate.current = now;

      const acc = event.accelerationIncludingGravity;
      if (acc) {
        const total = (Math.abs(acc.x || 0) + Math.abs(acc.y || 0) + Math.abs(acc.z || 0));
        const delta = Math.abs(total - 9.8); 
        const normalized = Math.min(100, delta * 15);
        
        setDetectionState(prev => ({
          ...prev,
          metrics: { ...prev.metrics, magnetic: normalized }
        }));
      }
    };

    if (window.DeviceMotionEvent) {
      window.addEventListener('devicemotion', handleMotion);
    }
    return () => window.removeEventListener('devicemotion', handleMotion);
  }, []);

  useEffect(() => {
    const updateSmoothedValue = () => {
      const { visual, audio, magnetic } = detectionState.metrics;
      const target = (visual * 0.4) + (audio * 0.4) + (magnetic * 0.2);
      
      setSmoothedRiskLevel(prev => {
        const alpha = 0.05; 
        const newVal = (alpha * target) + (1 - alpha) * prev;
        return Math.abs(newVal - prev) < 0.1 ? target : newVal;
      });
    };
    const interval = setInterval(updateSmoothedValue, 50);
    return () => clearInterval(interval);
  }, [detectionState.metrics]);

  const currentEctoLevel = Math.round(smoothedRiskLevel);

  const handleSintonize = (spirit: Spirit) => {
    setSelectedSpirit(spirit);
    setActiveView(ViewType.SPIRIT_CHAT);
  };

  return (
    <div className="flex flex-col md:flex-row h-screen bg-black text-slate-200 overflow-hidden font-mono selection:bg-emerald-500/30">
      <div className="fixed inset-0 pointer-events-none opacity-20 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-emerald-900/20 via-transparent to-black z-0"></div>
      
      <Sidebar activeView={activeView} onViewChange={setActiveView} user={user} />
      
      <main className="flex-1 relative overflow-y-auto scrollbar-hide pb-24 md:pb-8 z-10">
        <header className="sticky top-0 z-50 glass border-b border-emerald-900/30 px-4 py-3 md:px-6 md:py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className={`w-3 h-3 rounded-full animate-pulse transition-all duration-1000 ${currentEctoLevel > 40 ? (currentEctoLevel > 70 ? 'bg-red-600 shadow-[0_0_15px_red]' : 'bg-amber-500 shadow-[0_0_15px_amber]') : 'bg-emerald-500 shadow-[0_0_15px_#10b981]'}`}></div>
            <h1 className="text-lg md:text-2xl font-black tracking-tighter uppercase italic">
              SPIRIT <span className="text-emerald-500">IA</span> BR <span className="text-[8px] md:text-[10px] bg-emerald-500 text-black px-1.5 py-0.5 rounded ml-1 uppercase not-italic">OMEGA_V.O.G.</span>
            </h1>
          </div>
          
          <div className="flex items-center gap-2">
            <button 
              onClick={() => setActiveView(ViewType.HELP)}
              className="bg-emerald-500/10 border border-emerald-500/40 text-emerald-500 px-3 py-1.5 rounded-lg text-[10px] font-black uppercase hover:bg-emerald-500 hover:text-black transition-all flex items-center gap-2"
            >
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
              DÚVIDAS / MANUAL
            </button>
          </div>
        </header>

        <div className="p-3 md:p-8">
          {activeView === ViewType.DASHBOARD && <Dashboard detectionState={{...detectionState, riskLevel: currentEctoLevel}} onSintonize={handleSintonize} />}
          {activeView === ViewType.SCANNER && <ScannerView setDetectionState={setDetectionState} onSintonize={handleSintonize} />}
          {activeView === ViewType.UFO_DETECTOR && <UfoDetector setDetectionState={setDetectionState} />}
          {activeView === ViewType.FREQUENCY && <FrequencyMonitor setDetectionState={setDetectionState} />}
          {activeView === ViewType.CLASSIFIER && <EntityClassifier metrics={detectionState.metrics} onSintonize={handleSintonize} />}
          {activeView === ViewType.SPIRITS_DB && <SpiritsDatabase onSintonize={handleSintonize} />}
          {activeView === ViewType.ARCHIVES && <ForbiddenArchives user={user} />}
          {activeView === ViewType.SPIRITUAL_DEFENSE && <SpiritualDefense />}
          {activeView === ViewType.SPIRIT_CHAT && <SpiritChat spirit={selectedSpirit} />}
          {activeView === ViewType.HELP && <HelpView />}
        </div>
      </main>

      {/* Manual Button Flutuante Mobile */}
      <button 
        onClick={() => setActiveView(ViewType.HELP)}
        className="md:hidden fixed bottom-24 right-4 w-12 h-12 bg-emerald-500 text-black rounded-full shadow-2xl flex items-center justify-center z-[110] border-4 border-black animate-bounce"
      >
        <span className="font-black text-xl">?</span>
      </button>
    </div>
  );
};

export default App;
