
import React, { useRef, useEffect, useState } from 'react';
import { DetectionState } from '../types';

interface UfoDetectorProps {
  setDetectionState: React.Dispatch<React.SetStateAction<DetectionState>>;
}

const UfoDetector: React.FC<UfoDetectorProps> = ({ setDetectionState }) => {
  const [isSearching, setIsSearching] = useState(false);
  const [telemetry, setTelemetry] = useState({
    alt: 35000,
    vel: 0,
    gForce: 1.0,
    bearing: 120,
    targets: [] as any[]
  });
  const [eventLog, setEventLog] = useState<string[]>([]);

  // Simulação de telemetria militar
  useEffect(() => {
    let interval: any;
    if (isSearching) {
      interval = setInterval(() => {
        setTelemetry(prev => ({
          alt: Math.floor(prev.alt + (Math.random() * 200 - 100)),
          vel: prev.vel > 0 ? prev.vel + (Math.random() * 50 - 20) : 0,
          gForce: 1.0 + (Math.random() * 0.05),
          bearing: (prev.bearing + 1) % 360,
          targets: prev.targets
        }));

        if (Math.random() > 0.95) {
          const codes = ["TRAVA_SIGINT", "FANTASMA_RADAR", "MOV_NAO_INERCIAL", "DETECCAO_TRANS_MEDIUM", "PULSO_TERMICO"];
          const code = codes[Math.floor(Math.random() * codes.length)];
          setEventLog(prev => [`[${new Date().toLocaleTimeString()}] ALERTA: ${code}`, ...prev].slice(0, 6));
          
          // Simula detecção de alvo
          if (Math.random() > 0.7) {
            setTelemetry(p => ({
              ...p,
              vel: Math.floor(Math.random() * 4500) + 1200, // Mach 2+
              gForce: Math.random() * 40 + 5 // Forças G impossíveis
            }));
          }
        }
      }, 500);
    } else {
      setTelemetry({ alt: 35000, vel: 0, gForce: 1.0, bearing: 120, targets: [] });
      setEventLog([]);
    }
    return () => clearInterval(interval);
  }, [isSearching]);

  return (
    <div className="max-w-6xl mx-auto space-y-6 animate-[fadeIn_0.5s_ease-out] pb-20">
      {/* Header Tático */}
      <div className="flex justify-between items-end border-b-2 border-blue-500/30 pb-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="bg-red-600 text-white text-[8px] px-2 py-0.5 font-black mono uppercase">ULTRASSECRETO // CONFIDENCIAL</span>
            <span className="text-blue-500 mono text-[8px] font-black uppercase">Não Classificado para o Operador</span>
          </div>
          <h2 className="text-4xl font-black text-white italic tracking-tighter flex items-center gap-3">
            VIGIA CELESTE <span className="text-blue-500">OMEGA-7</span>
          </h2>
        </div>
        <div className="text-right mono hidden md:block">
          <p className="text-[10px] text-slate-500 font-bold">COORD_GRADE: 38.8977° N, 77.0365° W</p>
          <p className="text-[10px] text-blue-500/60 font-black">MODO_CRIPTO: AES-256_QUANTUM</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Lado Esquerdo: Radar e Visualização Principal */}
        <div className="lg:col-span-8 space-y-6">
          <div className="glass rounded-[2rem] border-blue-500/20 bg-black overflow-hidden relative aspect-video flex items-center justify-center">
            {/* Grid de Fundo */}
            <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'linear-gradient(#00ffff11 1px, transparent 1px), linear-gradient(90deg, #00ffff11 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
            
            {/* Radar Sweep */}
            <div className="relative w-[80%] aspect-square max-w-[500px] border border-blue-500/20 rounded-full flex items-center justify-center">
              {/* Círculos de Distância */}
              <div className="absolute inset-0 border border-blue-500/10 rounded-full scale-[0.75]"></div>
              <div className="absolute inset-0 border border-blue-500/10 rounded-full scale-[0.50]"></div>
              <div className="absolute inset-0 border border-blue-500/10 rounded-full scale-[0.25]"></div>
              
              {/* Linhas de Azimute */}
              <div className="absolute h-full w-[1px] bg-blue-500/10"></div>
              <div className="absolute w-full h-[1px] bg-blue-500/10"></div>
              
              {/* Varredura */}
              <div className={`absolute inset-0 rounded-full bg-gradient-to-tr from-blue-500/20 to-transparent transition-all origin-center ${isSearching ? 'animate-[spin_4s_linear_infinite]' : 'opacity-0'}`}></div>

              {/* Alvos Simulados */}
              {isSearching && telemetry.vel > 2000 && (
                <div className="absolute z-20 animate-pulse" style={{ top: '25%', left: '65%' }}>
                   <div className="w-4 h-4 border-2 border-red-500 rotate-45 flex items-center justify-center">
                      <div className="w-1 h-1 bg-red-500"></div>
                   </div>
                   <div className="absolute left-6 top-0 w-32">
                      <p className="text-[8px] mono text-red-500 font-black leading-tight">ALVO_IDENTIFICADO: UAP_01<br/>CLASSE: TIC_TAC<br/>VEL: MACH { (telemetry.vel/1234).toFixed(1) }</p>
                   </div>
                </div>
              )}

              {/* Centro */}
              <div className="w-2 h-2 bg-blue-500 rounded-full shadow-[0_0_15px_cyan] z-30"></div>
            </div>

            {/* Overlays de HUD */}
            <div className="absolute inset-0 p-6 pointer-events-none flex flex-col justify-between">
              <div className="flex justify-between items-start">
                <div className="mono text-[8px] text-blue-400 bg-black/60 p-2 border border-blue-500/20 rounded">
                  RUMO: {telemetry.bearing.toString().padStart(3, '0')}°<br/>
                  LAT: 34.0522 N<br/>
                  LON: 118.2437 W
                </div>
                <div className="text-right mono text-[8px] text-blue-400 bg-black/60 p-2 border border-blue-500/20 rounded">
                  HORA_SIS: {new Date().toLocaleTimeString()}<br/>
                  SINAL: MIL-STD-2048<br/>
                  SENS: AUTO_MAX
                </div>
              </div>
              <div className="flex justify-center mb-10">
                 <div className="bg-blue-500/10 border border-blue-500/30 px-6 py-2 rounded-full">
                    <p className="text-[10px] mono text-blue-400 font-black tracking-[0.5em] animate-pulse">
                      {isSearching ? 'VARREDURA_ATIVA_EM_CURSO' : 'SISTEMA_EM_ESPERA'}
                    </p>
                 </div>
              </div>
            </div>
          </div>

          {/* Controle e Botões */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
             <button 
              onClick={() => setIsSearching(!isSearching)}
              className={`py-6 rounded-2xl font-black mono text-xs uppercase tracking-[0.2em] transition-all border-b-4 ${
                isSearching 
                ? 'bg-red-600 text-white border-red-800 animate-pulse' 
                : 'bg-blue-600 text-white border-blue-800 hover:bg-blue-500'
              }`}
             >
               {isSearching ? 'ABORTAR VARREDURA / CLASSIFICAR' : 'INICIAR VARREDURA PROFUNDA'}
             </button>
             <div className="grid grid-cols-2 gap-2">
                <button className="bg-slate-900 border border-blue-500/20 rounded-2xl mono text-[9px] font-bold text-blue-400 hover:bg-blue-500/10 uppercase">Máscara Assinatura</button>
                <button className="bg-slate-900 border border-blue-500/20 rounded-2xl mono text-[9px] font-bold text-blue-400 hover:bg-blue-500/10 uppercase">Repetidor_Sat</button>
             </div>
          </div>
        </div>

        {/* Lado Direito: Telemetria e Logs */}
        <div className="lg:col-span-4 space-y-4">
          {/* Painel de Telemetria */}
          <div className="glass p-6 rounded-[2rem] border-blue-500/20 bg-slate-950/50 space-y-6 shadow-xl">
             <h3 className="text-blue-500 font-black mono text-[10px] uppercase tracking-widest border-b border-blue-500/10 pb-2">Telemetria_Alvo</h3>
             
             <div className="space-y-4">
                <MetricLine label="ALTITUDE" value={`${telemetry.alt.toLocaleString()} PÉS`} sub="MSL" trend={Math.random() > 0.5 ? 'SUBINDO' : 'DESCENDO'} />
                <MetricLine label="VELOCIDADE" value={telemetry.vel > 0 ? `MACH ${(telemetry.vel/1234).toFixed(2)}` : '0.00'} sub={`${telemetry.vel} KTS`} highlight={telemetry.vel > 1500} />
                <MetricLine label="FORÇA-G" value={`${telemetry.gForce.toFixed(2)} G`} sub="AXIAL" highlight={telemetry.gForce > 9} />
                <MetricLine label="SQUAWK" value={isSearching ? "7700_EMERG" : "0000_OFF"} sub="MODO_S" />
             </div>
          </div>

          {/* Feed de Inteligência */}
          <div className="glass p-6 rounded-[2rem] border-blue-500/20 bg-black/60 flex-1 min-h-[300px] flex flex-col">
             <h3 className="text-blue-500 font-black mono text-[10px] uppercase tracking-widest mb-4">Fluxo_Dados_Intel</h3>
             <div className="flex-1 space-y-3 overflow-hidden">
                {eventLog.length > 0 ? (
                  eventLog.map((log, i) => (
                    <div key={i} className="mono text-[9px] text-blue-400/80 border-l border-blue-500/20 pl-3 py-1 animate-[fadeIn_0.3s_ease-out]">
                      {log}
                    </div>
                  ))
                ) : (
                  <p className="text-[9px] mono text-slate-700 uppercase italic mt-10 text-center">Aguardando fluxo de dados criptográficos...</p>
                )}
             </div>
             <div className="mt-4 pt-4 border-t border-blue-500/10 flex justify-between">
                <span className="text-[8px] mono text-slate-600">BUFFER: 1024KB</span>
                <span className="text-[8px] mono text-emerald-500 font-bold animate-pulse">SINCRONIA_VIVO</span>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const MetricLine = ({ label, value, sub, trend, highlight }: any) => (
  <div className={`p-3 rounded-xl border transition-all ${highlight ? 'bg-red-500/10 border-red-500/40 text-red-500' : 'bg-black/40 border-blue-500/10 text-blue-400'}`}>
     <div className="flex justify-between items-center mb-1">
        <span className="text-[8px] font-black mono opacity-50 uppercase">{label}</span>
        {trend && <span className="text-[8px] mono">{trend === 'SUBINDO' ? '▲' : '▼'}</span>}
     </div>
     <div className="flex items-baseline gap-2">
        <span className="text-xl font-black mono tracking-tighter">{value}</span>
        <span className="text-[8px] mono opacity-40">{sub}</span>
     </div>
  </div>
);

export default UfoDetector;
