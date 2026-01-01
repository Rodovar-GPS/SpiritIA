
import React, { useState, useEffect } from 'react';
import { Spirit, SensorMetrics } from '../types';

interface EntityClassifierProps {
  metrics: SensorMetrics;
  onSintonize?: (spirit: Spirit) => void;
}

const EntityClassifier: React.FC<EntityClassifierProps> = ({ metrics, onSintonize }) => {
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState<any>(null);

  const startAnalysis = () => {
    setAnalyzing(true);
    setResult(null);
    
    // Análise REAL: O resultado depende do que os sensores estão pegando AGORA
    setTimeout(() => {
      const { visual, audio, magnetic } = metrics;
      let lineage;

      if (magnetic > 50 && audio < 20) {
        lineage = { type: 'Vampiro', name: 'Sanguis Nocturnis', match: 85 + Math.random() * 10, traits: ['Pele Hipotérmica', 'Pulso de Visão Noturna', 'Baixa Absorção UV'], freq: '13.3Hz' };
      } else if (audio > 50 && visual > 40) {
        lineage = { type: 'Celestial', name: 'Mensageiro de Luz', match: 90 + Math.random() * 8, traits: ['Harmônicos Vocais Ultrassônicos', 'Aura Bioluminescente'], freq: '999Hz' };
      } else if (visual > 60) {
        lineage = { type: 'Nephilin', name: 'Híbrido Vigilante', match: 78 + Math.random() * 15, traits: ['DNA Antigo Ativo', 'Distorção de Gravidade Local'], freq: '44.4Hz' };
      } else {
        lineage = { type: 'Humanoide', name: 'Homo Sapiens', match: 95 + Math.random() * 4, traits: ['Biometria Padrão', 'Campo Magnético Estável'], freq: '7.83Hz' };
      }

      setResult(lineage);
      setAnalyzing(false);
    }, 3500);
  };

  const handleSintonizeResult = () => {
    if (onSintonize && result) {
      onSintonize({
        name: result.name,
        freq: result.freq,
        danger: `${Math.round(result.match)}% Match`,
        location: 'Biometria Local',
        plan: result.type.toUpperCase(),
        desc: `Entidade sintonizada via diagnóstico de linhagem baseada em métricas de hardware: ${result.traits.join(', ')}.`
      });
    }
  };

  return (
    <div className="max-w-2xl mx-auto glass p-8 rounded-[3rem] border-emerald-500/20 shadow-2xl animate-[fadeIn_0.5s_ease-out]">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-black mono text-emerald-400 uppercase tracking-tighter italic">Diagnóstico Real</h2>
        <p className="text-[10px] text-slate-500 mono uppercase tracking-[0.3em] mt-1">Análise de Campo vs Banco Genômico</p>
      </div>

      <div className="space-y-6">
        <div className="p-6 border border-emerald-500/10 bg-black/40 rounded-3xl text-center">
          <p className="text-xs text-slate-400 mb-6 mono italic">"O sistema processa a variância magnética e áudio para triangular sua linhagem espiritual."</p>
          
          <button 
            onClick={startAnalysis}
            disabled={analyzing}
            className={`w-full py-5 rounded-2xl font-black mono text-sm transition-all ${
              analyzing 
                ? 'bg-emerald-900/50 text-emerald-500 cursor-not-allowed' 
                : 'bg-emerald-500 text-black hover:bg-emerald-400 shadow-[0_0_30px_rgba(16,185,129,0.3)]'
            }`}
          >
            {analyzing ? 'PROCESSANDO SENSORES...' : 'INICIAR SCAN BIOMÉTRICO'}
          </button>
        </div>

        {analyzing && (
          <div className="flex flex-col items-center gap-6 py-8">
            <div className="w-full h-1.5 bg-emerald-900/30 rounded-full overflow-hidden">
               <div className="h-full bg-emerald-500 animate-[grow_3.5s_linear]"></div>
            </div>
            <div className="flex items-center gap-3">
              <span className="w-2 h-2 bg-emerald-500 rounded-full animate-ping"></span>
              <p className="mono text-[10px] text-emerald-500 uppercase font-black tracking-widest">Calculando Ressonância...</p>
            </div>
          </div>
        )}

        {result && (
          <div className="p-8 border-2 border-emerald-500/40 bg-emerald-500/5 rounded-[2.5rem] animate-[fadeIn_0.5s_ease-out] relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-emerald-500 text-black px-4 py-1 rounded-bl-2xl text-[10px] font-black mono uppercase">
              {Math.round(result.match)}% MATCH
            </div>

            <div className="mb-6">
              <p className="text-[9px] text-emerald-500 uppercase mono font-black mb-1">Identificação de Classe</p>
              <h3 className="text-3xl font-black text-white uppercase tracking-tighter">{result.name}</h3>
              <p className="text-emerald-400/60 mono text-xs font-bold">{result.type}</p>
            </div>

            <div className="space-y-3">
              <p className="text-[9px] text-slate-500 uppercase mono font-black border-b border-emerald-500/10 pb-1">Marcadores Detectados</p>
              <div className="flex flex-wrap gap-2">
                {result.traits.map((trait: string, i: number) => (
                  <span key={i} className="px-3 py-1.5 bg-emerald-950/40 border border-emerald-500/20 text-emerald-400 text-[9px] rounded-lg mono font-black uppercase">
                    {trait}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-8 pt-8 border-t border-emerald-500/10">
              <button 
                onClick={handleSintonizeResult}
                className="w-full py-4 bg-emerald-500 text-black font-black mono text-xs uppercase rounded-xl hover:bg-emerald-400 transition-all shadow-lg"
              >
                Sintonizar Chat com {result.type}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EntityClassifier;
