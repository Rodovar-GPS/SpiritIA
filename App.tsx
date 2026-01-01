
import React, { useState, useEffect, useCallback } from 'react';
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
import { ViewType, DetectionState, UserProfile, Spirit } from './types';

const App: React.FC = () => {
  const [activeView, setActiveView] = useState<ViewType>(ViewType.DASHBOARD);
  const [selectedSpirit, setSelectedSpirit] = useState<Spirit | null>(null);
  
  const [user] = useState<UserProfile>({
    name: 'Investigador Oficial',
    age: 'N/A',
    country: 'Brasil',
    phone: 'N/A',
    email: 'acesso@gratuito.com',
    username: 'ADMIN_VOG',
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

  // Listener para Acelerômetro e Magnetômetro (Proxy EMF e Vibração TCI)
  useEffect(() => {
    const handleMotion = (event: DeviceMotionEvent) => {
      const acc = event.accelerationIncludingGravity;
      if (acc) {
        // Captura flutuações de micro-vibração (frequência de rastro espiritual)
        const totalMotion = (Math.abs(acc.x || 0) + Math.abs(acc.y || 0) + Math.abs(acc.z || 0));
        // Filtramos a gravidade estática, focando apenas na variação
        const motionDelta = Math.abs(totalMotion - 9.8); 
        const normalizedMotion = Math.min(100, motionDelta * 15);
        
        setDetectionState(prev => ({
          ...prev,
          metrics: { ...prev.metrics, magnetic: normalizedMotion }
        }));
      }
    };

    if (window.DeviceMotionEvent) {
      window.addEventListener('devicemotion', handleMotion);
    }
    
    return () => window.removeEventListener('devicemotion', handleMotion);
  }, []);

  // Algoritmo de Fusão de Sensores V.O.G. (Validação de Ocorrência Genuína)
  const calculateEctoLevel = useCallback(() => {
    const { visual, audio, magnetic } = detectionState.metrics;
    
    // Se o scanner não está ativo, usamos apenas áudio e magnético
    // Se está ativo, o visual ganha peso massivo para orbes/vultos
    const visualWeight = detectionState.isScanning ? 0.6 : 0.1;
    const audioWeight = 0.3;
    const magneticWeight = detectionState.isScanning ? 0.1 : 0.6;

    const base = (visual * visualWeight) + (audio * audioWeight) + (magnetic * magneticWeight);
    
    // Adicionamos um pequeno fator de instabilidade natural (jitter espiritual)
    const jitter = (Math.random() * 2) - 1;
    
    return Math.round(Math.min(100, Math.max(0, base + jitter)));
  }, [detectionState.metrics, detectionState.isScanning]);

  const currentEctoLevel = calculateEctoLevel();

  const handleSintonize = (spirit: Spirit) => {
    setSelectedSpirit(spirit);
    setActiveView(ViewType.SPIRIT_CHAT);
  };

  const handleQuickSintonize = () => {
    const emergencySpirit: Spirit = {
      name: 'Manifestação Detectada',
      freq: `${currentEctoLevel}Hz`,
      danger: 'ALERTA CRÍTICO',
      location: 'Local Atual',
      plan: 'DESCONHECIDO',
      desc: 'Entidade sintonizada via picos de hardware sincronizados (V.O.G.).'
    };
    handleSintonize(emergencySpirit);
  };

  return (
    <div className="flex flex-col md:flex-row h-screen bg-black text-slate-200 selection:bg-emerald-500/30 overflow-hidden">
      <div className="fixed inset-0 pointer-events-none opacity-20 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-emerald-900/20 via-transparent to-black"></div>
      
      <Sidebar activeView={activeView} onViewChange={setActiveView} user={user} />
      
      <main className="flex-1 relative overflow-y-auto scrollbar-hide pb-20 md:pb-8">
        <header className="sticky top-0 z-50 glass border-b border-emerald-900/30 px-4 py-3 md:px-6 md:py-4 flex justify-between items-center">
          <div className="flex items-center gap-2 md:gap-3">
            <div className={`w-2 h-2 md:w-3 md:h-3 rounded-full animate-pulse shadow-[0_0_15px_rgba(16,185,129,1)] transition-colors duration-300 ${currentEctoLevel > 40 ? (currentEctoLevel > 70 ? 'bg-red-600' : 'bg-amber-500') : 'bg-emerald-500'}`}></div>
            <h1 className="text-lg md:text-2xl font-black tracking-tighter uppercase mono cursor-pointer hover:text-emerald-400 transition-all" onClick={() => setActiveView(ViewType.DASHBOARD)}>
              SPIRIT <span className="text-emerald-500 italic">IA</span> BR <span className="text-[8px] md:text-[10px] bg-emerald-500 text-black px-1.5 py-0.5 rounded ml-1 uppercase">v.o.g.</span>
            </h1>
          </div>
          
          <div className="flex items-center gap-2">
            {currentEctoLevel > 40 && (
              <button 
                onClick={handleQuickSintonize}
                className="animate-bounce bg-red-600 hover:bg-red-700 text-white mono text-[8px] px-3 py-1 rounded font-black border border-white/20 shadow-2xl transition-all"
              >
                SINTONIZAR ANOMALIA!
              </button>
            )}
            <div className="hidden md:flex items-center gap-2 mono text-[8px] md:text-[10px]">
                <div className="bg-emerald-950/40 px-2 py-1 border border-emerald-500/30 rounded shadow-[0_0_15px_rgba(16,185,129,0.1)] flex items-center gap-2">
                  <span className="w-1 h-1 bg-emerald-500 rounded-full animate-ping"></span>
                  <span className="text-emerald-500 font-bold uppercase tracking-widest">SENSORS_ACTIVE_TCI</span>
                </div>
            </div>
          </div>
        </header>

        <div className="p-3 md:p-8">
          {activeView === ViewType.DASHBOARD && (
            <Dashboard 
              detectionState={{...detectionState, riskLevel: currentEctoLevel}} 
              onSintonize={handleSintonize}
            />
          )}
          {activeView === ViewType.SCANNER && <ScannerView setDetectionState={setDetectionState} />}
          {activeView === ViewType.FREQUENCY && <FrequencyMonitor setDetectionState={setDetectionState} />}
          {activeView === ViewType.CLASSIFIER && <EntityClassifier onSintonize={handleSintonize} />}
          {activeView === ViewType.SPIRITS_DB && <SpiritsDatabase onSintonize={handleSintonize} />}
          {activeView === ViewType.ARCHIVES && <ForbiddenArchives user={user} />}
          {activeView === ViewType.SPIRITUAL_DEFENSE && <SpiritualDefense />}
          {activeView === ViewType.SPIRIT_CHAT && <SpiritChat spirit={selectedSpirit} />}
          {activeView === ViewType.HELP && <HelpView />}
        </div>
      </main>

      <div className="fixed top-20 right-4 p-2 z-40 hidden md:block">
        <div className={`border backdrop-blur-md px-4 py-2 rounded-2xl mono text-[10px] font-black flex items-center gap-3 shadow-2xl transition-all duration-500 ${currentEctoLevel > 40 ? (currentEctoLevel > 70 ? 'bg-red-500/20 border-red-500 text-red-400' : 'bg-amber-500/20 border-amber-500 text-amber-400') : 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'}`}>
          <div className="flex flex-col">
             <span className="text-[7px] opacity-60">DENSIDADE_ECTO</span>
             <span className="text-xs">REAL: {currentEctoLevel}%</span>
          </div>
          <div className="w-1 h-6 bg-current opacity-10 rounded-full"></div>
          <span className={`w-2 h-2 rounded-full animate-ping ${currentEctoLevel > 70 ? 'bg-red-500' : 'bg-emerald-500'}`}></span>
        </div>
      </div>
    </div>
  );
};

export default App;
