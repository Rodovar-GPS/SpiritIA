
import React, { useState } from 'react';
import { Spirit } from '../types';

interface SpiritsDatabaseProps {
  onSintonize: (spirit: Spirit) => void;
}

const SpiritsDatabase: React.FC<SpiritsDatabaseProps> = ({ onSintonize }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const rawSpirits: Spirit[] = [
    // Orixás (Frequências Sagradas Solfeggio)
    { name: 'Oxalá', freq: '963Hz', danger: 'Luz Pura', location: 'Plano Superior', plan: 'ORIXÁ', desc: 'Frequência do despertar espiritual e conexão com a Fonte Divina.' },
    { name: 'Iemanjá', freq: '528Hz', danger: 'Amor Maternal', location: 'Mares / Oceanos', plan: 'ORIXÁ', desc: 'Frequência milagrosa para reparação e harmonia emocional.' },
    { name: 'Oxum', freq: '639Hz', danger: 'Prosperidade', location: 'Cachoeiras', plan: 'ORIXÁ', desc: 'Frequência de conexão e relacionamentos.' },
    { name: 'Ogum', freq: '888Hz', danger: 'Proteção Ativa', location: 'Caminhos / Trilhos', plan: 'ORIXÁ', desc: 'Frequência de força, ordem e abertura de caminhos.' },
    { name: 'Oxóssi', freq: '432Hz', danger: 'Conhecimento', location: 'Matas', plan: 'ORIXÁ', desc: 'Sintonização com a harmonia da natureza e abundância.' },
    { name: 'Xangô', freq: '256Hz', danger: 'Justiça', location: 'Pedreiras', plan: 'ORIXÁ', desc: 'Vibração de equilíbrio jurídico e verdade.' },
    { name: 'Iansã', freq: '741Hz', danger: 'Limpeza', location: 'Ventos / Tempestades', plan: 'ORIXÁ', desc: 'Frequência para desfazer energias densas e negativas.' },
    { name: 'Nanã', freq: '174Hz', danger: 'Sabedoria Antiga', location: 'Pântanos / Lama', plan: 'ORIXÁ', desc: 'Frequência de redução de dor e conexão com a ancestralidade.' },
    { name: 'Obaluayê', freq: '285Hz', danger: 'Cura Estrutural', location: 'Cemitérios / Grutas', plan: 'ORIXÁ', desc: 'Frequência para regeneração física e espiritual.' },

    // Exus e Pombagiras (Frequências Infrassônicas e Choque)
    { name: 'Exu Caveira', freq: '7.7Hz', danger: 'Guardião Crítico', location: 'Cemitérios', plan: 'QUIMBANDA', desc: 'Ressonância profunda para desligamento e proteção de portais.' },
    { name: 'Exu Tranca-Ruas', freq: '3.1Hz', danger: 'Bloqueio Ativo', location: 'Encruzilhadas', plan: 'QUIMBANDA', desc: 'Frequência infra-sônica para contenção de espíritos obsessores.' },
    { name: 'Exu Marabô', freq: '5.5Hz', danger: 'Autoridade', location: 'Linha de Ferro', plan: 'QUIMBANDA', desc: 'Vibração de comando sobre as legiões de rua.' },
    { name: 'Exu Tiriri', freq: '9.1Hz', danger: 'Execução', location: 'Encruzilhadas', plan: 'QUIMBANDA', desc: 'Frequência de rapidez e corte de demandas negativas.' },
    { name: 'Pombagira Maria Padilha', freq: '18.3Hz', danger: 'Transmutação', location: 'Lapa / Cabarés', plan: 'QUIMBANDA', desc: 'Vibração de domínio, desejo e alquimia emocional.' },
    { name: 'Pombagira Sete Saias', freq: '22.2Hz', danger: 'Movimento', location: 'Cruzeiros', plan: 'QUIMBANDA', desc: 'Frequência para abertura de prosperidade e sorte.' },

    // Falanges de Trabalho
    { name: 'Caboclo Sete Flechas', freq: '444Hz', danger: 'Direção', location: 'Matas Virgens', plan: 'CABOCLOS', desc: 'Frequência de mira espiritual e cura através da natureza.' },
    { name: 'Preto-Velho Pai Joaquim', freq: '1.5Hz', danger: 'Paz Profunda', location: 'Terreiros', plan: 'PRETOS-VELHOS', desc: 'Vibração Delta para acesso à sabedoria ancestral e acolhimento.' },
    { name: 'Erê (Criança)', freq: '528Hz', danger: 'Pureza', location: 'Jardins', plan: 'ERÊS', desc: 'Frequência da alegria pura e renovação do DNA.' },
    { name: 'Marinheiro', freq: '396Hz', danger: 'Equilíbrio', location: 'Cais / Porto', plan: 'MARINHEIROS', desc: 'Liberação de sentimentos de culpa e medo.' },
    { name: 'Boiadeiro', freq: '212Hz', danger: 'Ordem', location: 'Campos', plan: 'BOIADEIROS', desc: 'Frequência para laçar e organizar energias dispersas.' },
    { name: 'Cigano Wladimir', freq: '852Hz', danger: 'Intuição', location: 'Estradas', plan: 'CIGANOS', desc: 'Frequência para despertar a clarividência e sorte.' },
    { name: 'Baiano Zé do Coco', freq: '333Hz', danger: 'Descarrego', location: 'Bahia', plan: 'BAIANOS', desc: 'Frequência de resistência e quebra de feitiços.' },

    // Ocultismo e Polaridades
    { name: 'Lúcifer', freq: '1.2Hz', danger: 'Conhecimento', location: 'Vácuo', plan: 'INFERNAL', desc: 'Frequência infra-sônica da inteligência e portador da luz.' },
    { name: 'Satan', freq: '0.6Hz', danger: 'Matéria Densa', location: 'Núcleo', plan: 'INFERNAL', desc: 'Ressonância primordial de instinto e sobrevivência bruta.' },
    { name: 'Baphomet', freq: '13.0Hz', danger: 'Dualidade', location: 'Círculos Ocultos', plan: 'INFERNAL', desc: 'Frequência de equilíbrio entre o macro e o microcosmo.' }
  ];

  const filteredSpirits = rawSpirits.filter(s => 
    s.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    s.plan.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8 animate-[fadeIn_0.5s_ease-out]">
      <div className="glass p-8 border-emerald-500/20 rounded-[2.5rem] flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h2 className="text-3xl font-black mono text-emerald-400 uppercase tracking-tighter italic">Sintonizador de Entidades</h2>
          <p className="text-[10px] text-slate-500 mono mt-1 uppercase tracking-widest italic">Banco de Dados V.O.G. Sincronizado</p>
        </div>
        <div className="relative w-full md:w-80">
          <input 
            type="text" 
            placeholder="PESQUISAR POR NOME OU LINHA..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-black/60 border border-emerald-500/20 p-4 rounded-2xl text-[10px] mono text-emerald-400 focus:outline-none focus:border-emerald-500/50 uppercase tracking-widest"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-24">
        {filteredSpirits.map((spirit, i) => (
          <div key={i} className="glass rounded-[2.5rem] border-emerald-500/10 hover:border-emerald-500 transition-all group overflow-hidden bg-gradient-to-br from-transparent to-emerald-500/5 flex flex-col h-full shadow-lg">
            <div className="h-40 bg-black relative flex items-center justify-center border-b border-emerald-500/10">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-emerald-900/20 via-transparent to-transparent opacity-50"></div>
              <div className="flex flex-col items-center gap-3 z-10">
                <div className="w-20 h-20 flex items-center justify-center relative">
                  <div className={`absolute inset-0 border-2 rounded-full animate-[spin_10s_linear_infinite] ${spirit.plan === 'INFERNAL' ? 'border-red-500/20' : 'border-emerald-500/20'}`}></div>
                  <svg className={`w-10 h-10 ${spirit.plan === 'INFERNAL' ? 'text-red-500' : 'text-emerald-500'}`} fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C7.03 2 3 6.03 3 11v11h2v-2c0-1.1.9-2 2-2s2 .9 2 2v2h2v-2c0-1.1.9-2 2-2s2 .9 2 2v2h2v-2c0-1.1.9-2 2-2s2 .9 2 2v2h2V11c0-4.97-4.03-9-9-9z" />
                  </svg>
                </div>
              </div>
            </div>
            
            <div className="p-8 flex-1 flex flex-col">
              <div className="mb-6">
                  <h3 className="text-xl font-black mono text-white uppercase tracking-tighter">{spirit.name}</h3>
                  <div className="flex justify-between items-center mt-2">
                    <span className="text-[9px] text-emerald-500/60 mono uppercase font-black">{spirit.plan}</span>
                    <span className={`text-[8px] px-3 py-1 rounded-full border mono font-bold ${
                      spirit.plan === 'INFERNAL' ? 'bg-red-950/40 border-red-500/40 text-red-500' : 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
                    }`}>
                      {spirit.danger}
                    </span>
                  </div>
              </div>

              <p className="text-[10px] text-slate-400 mono leading-relaxed mb-8 italic">"{spirit.desc}"</p>
              
              <div className="space-y-6 mt-auto">
                 <div className="grid grid-cols-2 gap-4 text-[9px] mono border-t border-emerald-500/5 pt-6">
                   <div className="flex flex-col">
                     <span className="text-slate-600 font-black uppercase tracking-widest mb-1">Ressonância</span>
                     <span className="text-emerald-400 font-black text-sm">{spirit.freq}</span>
                   </div>
                   <div className="flex flex-col text-right">
                     <span className="text-slate-600 font-black uppercase tracking-widest mb-1">Localização</span>
                     <span className="text-slate-400 font-black uppercase truncate">{spirit.location}</span>
                   </div>
                 </div>
                 
                 <button 
                  onClick={() => onSintonize(spirit)}
                  className={`w-full py-4 rounded-2xl text-[10px] mono font-black uppercase transition-all shadow-md ${
                    spirit.plan === 'INFERNAL' 
                      ? 'bg-red-500/10 border border-red-500/30 text-red-500 hover:bg-red-500 hover:text-white' 
                      : 'bg-emerald-500/10 border border-emerald-500/30 text-emerald-500 hover:bg-emerald-500 hover:text-black'
                  }`}
                 >
                   Sintonizar Chat Instrumental
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
