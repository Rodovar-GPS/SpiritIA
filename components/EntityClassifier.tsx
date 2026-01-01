
import React, { useState } from 'react';
import { Spirit } from '../types';

interface EntityClassifierProps {
  onSintonize?: (spirit: Spirit) => void;
}

const EntityClassifier: React.FC<EntityClassifierProps> = ({ onSintonize }) => {
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState<any>(null);

  const startAnalysis = () => {
    setAnalyzing(true);
    setResult(null);
    setTimeout(() => {
      const lineages = [
        { type: 'Vampiro', name: 'Sanguis Nocturnis', match: 94, traits: ['Pele Hipotérmica', 'Pulso de Visão Noturna', 'Baixa Absorção UV'], freq: '13.3Hz' },
        { type: 'Nephilin', name: 'Descendente de Vigilante', match: 88, traits: ['Marcadores de DNA Antigo', 'Aura Luminosa', 'Flutuações de Gravidade'], freq: '44.4Hz' },
        { type: 'Humanoide', name: 'Homo Sapiens (Padrão)', match: 99, traits: ['Biometria Normal', 'Estabilidade Eletromagnética'], freq: '7.83Hz' },
        { type: 'Celestial', name: 'Linhagem Direta de Luz', match: 72, traits: ['Harmônicos Vocais Ultrassônicos', 'Dissipador Térmico Infinito'], freq: '999Hz' }
      ];
      setResult(lineages[Math.floor(Math.random() * lineages.length)]);
      setAnalyzing(false);
    }, 3000);
  };

  const handleSintonizeResult = () => {
    if (onSintonize && result) {
      onSintonize({
        name: result.name,
        freq: result.freq,
        danger: `${result.match}% Match`,
        location: 'Biometria Local',
        plan: result.type.toUpperCase(),
        desc: `Entidade sintonizada via diagnóstico de linhagem: ${result.traits.join(', ')}.`
      });
    }
  };

  return (
    <div className="max-w-2xl mx-auto glass p-8 rounded-[3rem] border-emerald-500/20 shadow-2xl">
      <h2 className="text-2xl font-bold mono text-center mb-8 uppercase tracking-widest text-emerald-400 italic">
        Diagnóstico de Linhagem
      </h2>

      <div className="space-y-6">
        <div className="p-4 border border-emerald-500/10 bg-black/40 rounded-2xl">
          <p className="text-sm text-slate-400 mb-4 mono italic text-center">"Posicione o alvo para calcular ressonância espiritual."</p>
          
          <button 
            onClick={startAnalysis}
            disabled={analyzing}
            className={`w-full py-4 rounded-xl font-bold mono transition-all ${
              analyzing 
                ? 'bg-emerald-900/50 text-emerald-500 cursor-not-allowed' 
                : 'bg-emerald-500 text-black hover:bg-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.3)]'
            }`}
          >
            {analyzing ? 'SEQUENCIANDO...' : 'INICIAR SCAN BIOMÉTRICO'}
          </button>
        </div>

        {analyzing && (
          <div className="flex flex-col items-center gap-4 py-8">
            <div className="w-full h-1 bg-emerald-900/30 rounded-full overflow-hidden">
               <div className="h-full bg-emerald-500 animate-[grow_3s_linear]"></div>
            </div>
            <p className="mono text-[10px] text-emerald-500 animate-pulse">CONFRONTANDO BANCO DE DADOS GENÔMICO...</p>
          </div>
        )}

        {result && (
          <div className="p-6 border border-emerald-500/40 bg-emerald-500/5 rounded-[2rem] animate-[fadeIn_0.5s_ease-out]">
            <div className="flex justify-between items-start mb-4">
              <div>
                <p className="text-[10px] text-emerald-500 uppercase mono font-bold">Resultado da Detecção</p>
                <h3 className="text-2xl font-bold text-emerald-400">{result.name}</h3>
                <p className="text-slate-400 mono text-sm">{result.type}</p>
              </div>
              <div className="bg-emerald-500 text-black px-3 py-1 rounded-full text-xs font-bold mono">
                {result.match}% MATCH
              </div>
            </div>

            <div className="space-y-2 mt-4">
              <p className="text-[10px] text-slate-500 uppercase mono">Anomalias Observadas</p>
              <div className="flex flex-wrap gap-2">
                {result.traits.map((trait: string, i: number) => (
                  <span key={i} className="px-2 py-1 bg-emerald-950/40 border border-emerald-500/20 text-emerald-500 text-[10px] rounded mono">
                    {trait}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-emerald-500/20">
              <button 
                onClick={handleSintonizeResult}
                className="w-full py-3 bg-emerald-500 text-black font-black mono text-xs uppercase rounded-xl hover:bg-emerald-400 transition-all shadow-lg"
              >
                Sintonizar Linhagem {result.type}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EntityClassifier;
