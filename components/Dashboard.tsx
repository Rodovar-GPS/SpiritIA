
import React from 'react';
import { DetectionState, Spirit } from '../types';

interface DashboardProps {
  detectionState: DetectionState;
  onSintonize?: (spirit: Spirit) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ detectionState, onSintonize }) => {
  const getRiskInfo = (level: number) => {
    if (level < 30) return { color: 'emerald', label: 'ESTÁVEL', text: 'Ambiente neutro.' };
    if (level < 70) return { color: 'amber', label: 'ANOMALIA', text: 'Atividade anômala detectada.' };
    return { color: 'red', label: 'PERIGO', text: 'MANIFESTAÇÃO ESPIRITUAL REAL!' };
  };

  const riskInfo = getRiskInfo(detectionState.riskLevel);

  const handleManualSintonize = () => {
    if (onSintonize) {
      onSintonize({
        name: 'Sinal Detectado',
        freq: `${detectionState.riskLevel}Hz`,
        danger: riskInfo.label,
        location: 'Ambiente Local',
        plan: 'DESCONHECIDO',
        desc: 'Sintonização baseada em picos de hardware reais no Dashboard.'
      });
    }
  };

  return (
    <div className="flex flex-col gap-4 animate-[fadeIn_0.5s_ease-out]">
      <div className="glass p-5 md:p-8 rounded-[2rem] md:rounded-[3rem] border-emerald-500/20 overflow-hidden relative bg-gradient-to-br from-emerald-900/5 to-transparent shadow-2xl">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h2 className="text-emerald-500/60 mono text-[8px] md:text-[10px] uppercase tracking-[0.4em] mb-1 font-black">HARDWARE_VOG_REALTIME</h2>
            <h3 className="text-xl md:text-4xl font-black tracking-tighter uppercase italic leading-tight">Métricas <span className="text-emerald-500">Do Sensor</span></h3>
          </div>
          {detectionState.riskLevel > 40 && onSintonize && (
            <button 
              onClick={handleManualSintonize}
              className="bg-red-600 hover:bg-red-500 text-white px-4 py-2 rounded-xl mono text-[10px] font-black animate-pulse shadow-lg"
            >
              SINTONIZAR SINAL
            </button>
          )}
        </div>
        
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
           <StatCard label="LUMINOSIDADE (Δ)" value={`${detectionState.metrics.visual.toFixed(0)}%`} color={detectionState.metrics.visual > 50 ? "amber" : "emerald"} />
           <StatCard label="ACÚSTICA (RMS)" value={`${detectionState.metrics.audio.toFixed(0)}%`} color={detectionState.metrics.audio > 50 ? "amber" : "emerald"} />
           <StatCard label="MAGNETISMO (EMF)" value={`${detectionState.metrics.magnetic.toFixed(0)}%`} color={detectionState.metrics.magnetic > 50 ? "red" : "emerald"} />
           <StatCard label="DENSIDADE_ECTO" value={`${detectionState.riskLevel}%`} color={riskInfo.color} />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
        <div className="md:col-span-12">
           <div className={`glass p-6 md:p-8 rounded-[2rem] md:rounded-[3rem] transition-all duration-700 shadow-xl border-2 ${
            riskInfo.color === 'red' ? 'border-red-500/40 bg-red-950/10' : 
            riskInfo.color === 'amber' ? 'border-amber-500/40 bg-amber-950/10' : 
            'border-emerald-500/20'
          }`}>
            <div className="flex flex-col items-center">
              <h3 className={`mono text-[9px] uppercase mb-4 tracking-widest font-black ${
                riskInfo.color === 'red' ? 'text-red-500' : 
                riskInfo.color === 'amber' ? 'text-amber-500' : 
                'text-emerald-500'
              }`}>Índice de Densidade Ectoplasmática Real</h3>
              
              <div className="relative w-32 h-32 md:w-48 md:h-48 flex items-center justify-center">
                <svg className="w-full h-full transform -rotate-90">
                  <circle cx="50%" cy="50%" r="45%" stroke="currentColor" strokeWidth="4" fill="transparent" className="opacity-5" />
                  <circle 
                    cx="50%" 
                    cy="50%" 
                    r="45%" 
                    stroke="currentColor" 
                    strokeWidth="6" 
                    fill="transparent" 
                    strokeDasharray="283" 
                    strokeDashoffset={283 - (detectionState.riskLevel / 100) * 283} 
                    className={`transition-all duration-1000 ease-in-out ${
                      riskInfo.color === 'red' ? 'text-red-500' : 
                      riskInfo.color === 'amber' ? 'text-amber-500' : 
                      'text-emerald-500'
                    }`} 
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center flex-col">
                  <span className="text-2xl md:text-4xl font-black mono tracking-tighter">{detectionState.riskLevel}%</span>
                  <span className="text-[7px] md:text-[9px] mono opacity-50 font-bold uppercase">VALOR_SENSORIAL</span>
                </div>
              </div>
              <p className={`text-center text-[9px] md:text-[10px] mono mt-4 uppercase font-black ${
                riskInfo.color === 'red' ? 'text-red-400' : 
                riskInfo.color === 'amber' ? 'text-amber-400' : 
                'text-emerald-400'
              }`}>
                {riskInfo.text}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ label, value, color }: { label: string, value: string, color: string }) => {
  const colorClasses: Record<string, string> = {
    emerald: 'border-emerald-500/10 text-emerald-400',
    amber: 'border-amber-500/20 text-amber-400',
    red: 'border-red-500/20 text-red-400',
    slate: 'border-slate-500/10 text-slate-400',
  };
  return (
    <div className={`p-3 md:p-5 rounded-xl md:rounded-2xl bg-black/40 border transition-all duration-500 ${colorClasses[color] || colorClasses.slate}`}>
      <p className="text-[7px] md:text-[8px] text-slate-500 uppercase mb-1 mono font-black">{label}</p>
      <p className="text-sm md:text-lg font-black mono truncate tracking-tighter">{value}</p>
    </div>
  );
};

export default Dashboard;
