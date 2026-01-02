
import React, { useState } from 'react';
import { Spirit } from '../types';

interface SpiritsDatabaseProps {
  onSintonize: (spirit: Spirit) => void;
}

const SpiritsDatabase: React.FC<SpiritsDatabaseProps> = ({ onSintonize }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const rawSpirits: Spirit[] = [
    // Orixás (Frequências de Comunicação Reais)
    { name: 'Oxalá', freq: '111Hz', danger: 'Luz Pura', location: 'Plano Superior', plan: 'ORIXÁ', desc: 'Ressonância de altíssima pureza. Estabiliza campos magnéticos caóticos.' },
    { name: 'Iemanjá', freq: '72Hz', danger: 'Harmonia', location: 'Mares / Oceanos', plan: 'ORIXÁ', desc: 'Frequência de purificação fluídica e acalmamento ectoplasmático.' },
    { name: 'Ogum', freq: '88Hz', danger: 'Defesa Ativa', location: 'Caminhos / Trilhos', plan: 'ORIXÁ', desc: 'Vibração de ordem e proteção contra frequências parasitárias.' },
    { name: 'Oxóssi', freq: '44Hz', danger: 'Abundância', location: 'Matas', plan: 'ORIXÁ', desc: 'Sintonização com energias da natureza e campos bio-fótons orgânicos.' },
    { name: 'Xangô', freq: '32Hz', danger: 'Equilíbrio', location: 'Pedreiras', plan: 'ORIXÁ', desc: 'Frequência de justiça e aterramento de descargas elétricas astrais.' },
    { name: 'Iansã', freq: '92Hz', danger: 'Deslocamento', location: 'Ventos', plan: 'ORIXÁ', desc: 'Frequência de limpeza e dissipação rápida de vultos.' },
    { name: 'Obaluayê', freq: '12Hz', danger: 'Regeneração', location: 'Cemitérios', plan: 'ORIXÁ', desc: 'Frequência VLF para transmutação de densidades físicas e astrais.' },

    // Guardiões (ELF e Infrassom Profissional)
    { name: 'Exu Caveira', freq: '7.8Hz', danger: 'Guardião', location: 'Cemitérios', plan: 'QUIMBANDA', desc: 'Ressonância Schumann para proteção e corte de portais abertos.' },
    { name: 'Exu Tranca-Ruas', freq: '3.1Hz', danger: 'Bloqueio', location: 'Encruzilhadas', plan: 'QUIMBANDA', desc: 'Frequência infra-sônica para contenção de picos eletromagnéticos negativos.' },
    { name: 'Exu Marabô', freq: '5.5Hz', danger: 'Comando', location: 'Linhas Férreas', plan: 'QUIMBANDA', desc: 'Vibração de autoridade sobre fluxos de energia de rua.' },
    { name: 'Pombagira Maria Padilha', freq: '18Hz', danger: 'Polaridade', location: 'Lapa / Cabarés', plan: 'QUIMBANDA', desc: 'Frequência de domínio e ajuste de ressonância emocional.' },
    { name: 'Exu Tiriri', freq: '9.5Hz', danger: 'Execução', location: 'Encruzilhadas', plan: 'QUIMBANDA', desc: 'Vibração de ação rápida e neutralização de ataques psíquicos.' },

    // Outras Falanges
    { name: 'Caboclo Sete Flechas', freq: '40Hz', danger: 'Direcionamento', location: 'Matas Virgens', plan: 'CABOCLOS', desc: 'Ressonância Gamma baixa para foco investigativo e mira espectral.' },
    { name: 'Preto-Velho Pai Joaquim', freq: '1.2Hz', danger: 'Paz / Delta', location: 'Terreiros', plan: 'PRETOS-VELHOS', desc: 'Frequência de relaxamento profundo e acesso a memórias ancestrais.' },
    { name: 'Marinheiro', freq: '36Hz', danger: 'Fluidez', location: 'Portos', plan: 'MARINHEIROS', desc: 'Frequência para limpeza de medo e culpa residual no ambiente.' },
    { name: 'Boiadeiro', freq: '22Hz', danger: 'Captura', location: 'Campos', plan: 'BOIADEIROS', desc: 'Vibração para organização de energias dispersas no local.' },
    { name: 'Cigano Wladimir', freq: '85Hz', danger: 'Clarividência', location: 'Estradas', plan: 'CIGANOS', desc: 'Frequência para abertura de intuição e sorte na investigação.' },

    // Frequências Densas (Uso com Cuidado)
    { name: 'Lúcifer', freq: '1.1Hz', danger: 'Intelecto', location: 'Vácuo', plan: 'DENSIDADE', desc: 'Frequência infra-sônica pura de conhecimento e questionamento primordial.' },
    { name: 'Baphomet', freq: '13Hz', danger: 'Dualidade', location: 'Círculos Ocultos', plan: 'DENSIDADE', desc: 'Vibração de equilíbrio perfeito entre as polaridades materiais.' }
  ];

  const filteredSpirits = rawSpirits.filter(s => 
    s.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    s.plan.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8 animate-[fadeIn_0.5s_ease-out]">
      <div className="glass p-8 border-emerald-500/20 rounded-[2.5rem] flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h2 className="text-3xl font-black mono text-emerald-400 uppercase tracking-tighter italic">Sintonizador_Real</h2>
          <p className="text-[10px] text-slate-500 mono mt-1 uppercase tracking-widest italic">Banco de Dados V.O.G. Sincronizado por Hardware</p>
        </div>
        <div className="relative w-full md:w-80">
          <input 
            type="text" 
            placeholder="PESQUISAR ENTIDADE OU PLANO..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-black/60 border border-emerald-500/20 p-4 rounded-2xl text-[10px] mono text-emerald-400 focus:outline-none focus:border-emerald-500/50 uppercase tracking-widest"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-24">
        {filteredSpirits.map((spirit, i) => (
          <div key={i} className="glass rounded-[2.5rem] border-emerald-500/10 hover:border-emerald-500 transition-all group overflow-hidden bg-gradient-to-br from-transparent to-emerald-500/5 flex flex-col h-full shadow-lg">
            <div className="h-32 bg-black relative flex items-center justify-center border-b border-emerald-500/10">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-emerald-900/20 via-transparent to-transparent opacity-50"></div>
              <div className="w-16 h-16 flex items-center justify-center relative">
                 <div className={`absolute inset-0 border-2 rounded-full animate-[spin_10s_linear_infinite] ${spirit.plan === 'DENSIDADE' ? 'border-red-500/20' : 'border-emerald-500/20'}`}></div>
                 <svg className={`w-8 h-8 ${spirit.plan === 'DENSIDADE' ? 'text-red-500' : 'text-emerald-500'}`} fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C7.03 2 3 6.03 3 11v11h2v-2c0-1.1.9-2 2-2s2 .9 2 2v2h2v-2c0-1.1.9-2 2-2s2 .9 2 2v2h2v-2c0-1.1.9-2 2-2s2 .9 2 2v2h2V11c0-4.97-4.03-9-9-9z" />
                 </svg>
              </div>
            </div>
            
            <div className="p-6 flex-1 flex flex-col">
              <div className="mb-4">
                  <h3 className="text-lg font-black mono text-white uppercase tracking-tighter">{spirit.name}</h3>
                  <div className="flex justify-between items-center mt-1">
                    <span className="text-[8px] text-emerald-500/60 mono uppercase font-black">{spirit.plan}</span>
                    <span className={`text-[8px] px-2 py-0.5 rounded-full border mono font-bold ${
                      spirit.plan === 'DENSIDADE' ? 'bg-red-950/40 border-red-500/40 text-red-500' : 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
                    }`}>
                      {spirit.danger}
                    </span>
                  </div>
              </div>

              <p className="text-[9px] text-slate-400 mono leading-relaxed mb-6 italic flex-1">"{spirit.desc}"</p>
              
              <div className="space-y-4 mt-auto">
                 <div className="grid grid-cols-2 gap-4 text-[8px] mono border-t border-emerald-500/5 pt-4">
                   <div className="flex flex-col">
                     <span className="text-slate-600 font-black uppercase mb-1">Freq_Fiel</span>
                     <span className="text-emerald-400 font-black text-xs">{spirit.freq}</span>
                   </div>
                   <div className="flex flex-col text-right">
                     <span className="text-slate-600 font-black uppercase mb-1">Sintonização</span>
                     <span className="text-slate-400 font-black uppercase truncate">ESTÁVEL</span>
                   </div>
                 </div>
                 
                 <button 
                  onClick={() => onSintonize(spirit)}
                  className={`w-full py-3 rounded-xl text-[9px] mono font-black uppercase transition-all shadow-md ${
                    spirit.plan === 'DENSIDADE' 
                      ? 'bg-red-500/10 border border-red-500/30 text-red-500 hover:bg-red-500 hover:text-white' 
                      : 'bg-emerald-500/10 border border-emerald-500/30 text-emerald-500 hover:bg-emerald-500 hover:text-black'
                  }`}
                 >
                   ABRIR CANAL V.O.G.
                 </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SpiritsDatabase;
