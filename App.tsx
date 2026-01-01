
import React, { useState, useEffect, useCallback, useRef } from 'react';
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
import { ViewType, DetectionState, UserProfile, Spirit, SensorMetrics } from './types';

const App: React.FC = () => {
  const [activeView, setActiveView] = useState<ViewType>(ViewType.DASHBOARD);
  const [selectedSpirit, setSelectedSpirit] = useState<Spirit | null>(null);
  const [smoothedRiskLevel, setSmoothedRiskLevel] = useState(0);
  
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

  // Listener de Sensores com Filtro de Ruído Profissional
  const lastSensorUpdate = useRef(0);
  useEffect(() => {
    const handleMotion = (event: DeviceMotionEvent) => {
      const now = Date.now();
      if (now - lastSensorUpdate.current < 250) return; // Throttling agressivo para estabilidade
      lastSensorUpdate.current = now;

      const acc = event.accelerationIncludingGravity;
      if (acc) {
        const total = (Math.abs(acc.x || 0) + Math.abs(acc.y || 0) + Math.abs(acc.z || 0));
        const delta = Math.abs(total - 9.8); 
        const normalized = Math.min(100, delta * 8); // Ajuste de sensibilidade real
        
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

  // Algoritmo de Suavização Exponencial (EMA) - CORREÇÃO DA OSCILAÇÃO
  useEffect(() => {
    const updateSmoothedValue = () => {
      const { visual, audio, magnetic } = detectionState.metrics;
      const vWeight = detectionState.isScanning ? 0.5 : 0.1;
      const aWeight = 0.3;
      const mWeight = 0.2;

      const instantTarget = (visual * vWeight) + (audio * aWeight) + (magnetic * mWeight);
      
      setSmoothedRiskLevel(prev => {
        // Coeficiente alpha muito baixo (0.03) para movimento de ponteiro realista
        const alpha = 0.03; 
        const newVal = (alpha * instantTarget) + (1 - alpha) * prev;
        
        // Evita flutuações de decimais insignificantes
        if (Math.abs(newVal - prev) < 0.05) return prev;
        return newVal;
      });
    };

    const interval = setInterval(updateSmoothedValue, 60); 
    return () => clearInterval(interval);
  }, [detectionState.metrics, detectionState.isScanning]);

  const currentEctoLevel = Math.round(smoothedRiskLevel);

  const handleSintonize = (spirit: Spirit) => {
    setSelectedSpirit(spirit);
    setActiveView(ViewType.SPIRIT_CHAT);
  };

  const handleQuickSintonize = () => {
    const emergencySpirit: Spirit = {
      name: 'Entidade Local Detectada',
      freq: `${currentEctoLevel + 12.5}Hz`,
      danger: currentEctoLevel > 70 ? 'CRÍTICO' : 'ALERTA',
      location: 'Localização Atual',
      plan: 'DESCONHECIDO',
      desc: 'Manifestação capturada via triangulação de hardware V.O.G.'
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
            <div className={`w-2 h-2 md:w-3 md:h-3 rounded-full animate-pulse shadow-[0_0_15px_rgba(16,185,129,1)] transition-colors duration-1000 ${currentEctoLevel > 40 ? (currentEctoLevel > 70 ? 'bg-red-600' : 'bg-amber-500') : 'bg-emerald-500'}`}></div>
            <h1 className="text-lg md:text-2xl font-black tracking-tighter uppercase mono cursor-pointer hover:text-emerald-400 transition-all" onClick={() => setActiveView(ViewType.DASHBOARD)}>
              SPIRIT <span className="text-emerald-500 italic">IA</span> BR <span className="text-[8px] md:text-[10px] bg-emerald-500 text-black px-1.5 py-0.5 rounded ml-1 uppercase">v.o.g.</span>
            </h1>
          </div>
          
          <div className="flex items-center gap-2">
            <button 
              onClick={() => setActiveView(ViewType.HELP)}
              className="bg-emerald-500/10 border border-emerald-500/30 text-emerald-500 px-3 py-1 rounded-lg mono text-[8px] font-black uppercase hover:bg-emerald-500 hover:text-black transition-all"
            >
              MANUAL OPERADOR
            </button>
            {currentEctoLevel > 50 && (
              <button 
                onClick={handleQuickSintonize}
                className="animate-bounce bg-red-600 hover:bg-red-700 text-white mono text-[8px] px-3 py-1 rounded font-black border border-white/20 shadow-2xl transition-all"
              >
                SINTONIZAR
              </button>
            )}
          </div>
        </header>

        <div className="p-3 md:p-8">
          {activeView === ViewType.DASHBOARD && (
            <Dashboard 
              detectionState={{...detectionState, riskLevel: currentEctoLevel}} 
              onSintonize={handleSintonize}
            />
          )}
          {activeView === ViewType.SCANNER && <ScannerView setDetectionState={setDetectionState} onSintonize={handleSintonize} />}
          {activeView === ViewType.FREQUENCY && <FrequencyMonitor setDetectionState={setDetectionState} />}
          {activeView === ViewType.CLASSIFIER && <EntityClassifier metrics={detectionState.metrics} onSintonize={handleSintonize} />}
          {activeView === ViewType.SPIRITS_DB && <SpiritsDatabase onSintonize={handleSintonize} />}
          {activeView === ViewType.ARCHIVES && <ForbiddenArchives user={user} />}
          {activeView === ViewType.SPIRITUAL_DEFENSE && <SpiritualDefense />}
          {activeView === ViewType.SPIRIT_CHAT && <SpiritChat spirit={selectedSpirit} />}
          {activeView === ViewType.HELP && <HelpView />}
        </div>
      </main>

      {/* Floating Status Indicator */}
      <div className="fixed bottom-24 right-4 p-2 z-40 hidden md:block">
        <div className={`border backdrop-blur-md px-4 py-2 rounded-2xl mono text-[10px] font-black flex items-center gap-3 shadow-2xl transition-all duration-1000 ${currentEctoLevel > 40 ? (currentEctoLevel > 70 ? 'bg-red-500/20 border-red-500 text-red-400' : 'bg-amber-500/20 border-amber-500 text-amber-400') : 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'}`}>
          <div className="flex flex-col">
             <span className="text-[7px] opacity-60">FATOR_VOG</span>
             <span className="text-xs">{currentEctoLevel}%</span>
          </div>
          <div className="w-1 h-6 bg-current opacity-20 rounded-full"></div>
          <span className={`w-2 h-2 rounded-full animate-pulse bg-current`}></span>
        </div>
      </div>
    </div>
  );
};

export default App;
