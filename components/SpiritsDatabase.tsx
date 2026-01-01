
import React, { useState } from 'react';
import { Spirit } from '../types';

interface SpiritsDatabaseProps {
  onSintonize: (spirit: Spirit) => void;
}

const SpiritsDatabase: React.FC<SpiritsDatabaseProps> = ({ onSintonize }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const rawSpirits: Spirit[] = [
    // Orixás (Frequências de Cura e Natureza - Solfeggio)
    { name: 'Oxalá', freq: '963Hz', danger: 'Paz Absoluta', location: 'Plano Superior', plan: 'ORIXÁ', desc: 'Frequência do Despertar Espiritual e Conexão Divina.' },
    { name: 'Iemanjá', freq: '528Hz', danger: 'Restauração Bio', location: 'Oceanos / Mares', plan: 'ORIXÁ', desc: 'A Frequência Milagrosa da regeneração e do amor maternal.' },
    { name: 'Oxum', freq: '639Hz', danger: 'Harmonia Ativa', location: 'Cachoeiras / Rios', plan: 'ORIXÁ', desc: 'Frequência de conexão, relacionamentos e equilíbrio emocional.' },
    { name: 'Ogum', freq: '888Hz', danger: 'Guerreiro Ativo', location: 'Caminhos / Trilhos', plan: 'ORIXÁ', desc: 'Vibração de proteção, abertura de caminhos e força de execução.' },
    { name: 'Oxóssi', freq: '432Hz', danger: 'Foco e Caça', location: 'Matas Virgens', plan: 'ORIXÁ', desc: 'Ressonância natural da Terra. Frequência de provimento e conhecimento.' },
    { name: 'Xangô', freq: '256Hz', danger: 'Justiça Severa', location: 'Pedreiras', plan: 'ORIXÁ', desc: 'Frequência base da terra e do equilíbrio jurídico universal.' },
    { name: 'Iansã', freq: '741Hz', danger: 'Transmutação', location: 'Bambuzais / Ventos', plan: 'ORIXÁ', desc: 'Frequência da limpeza de toxinas e solução de problemas.' },
    { name: 'Nanã Buruquê', freq: '174Hz', danger: 'Ancestralidade', location: 'Pântanos / Lama', plan: 'ORIXÁ', desc: 'Frequência mais baixa de redução de dor e conexão com a origem.' },
    { name: 'Obaluayê', freq: '285Hz', danger: 'Cura Estrutural', location: 'Cemitérios / Grutas', plan: 'ORIXÁ', desc: 'Frequência de regeneração de órgãos e tecidos.' },

    // Exus e Pombagiras (Frequências de Choque e Grounding)
    { name: 'Exu Caveira', freq: '7.7Hz', danger: 'Guardião Crítico', location: 'Calunga / Cemitérios', plan: 'QUIMBANDA', desc: 'Vibração Theta profunda. Responsável pelo desligamento da alma.' },
    { name: 'Exu Tranca-Ruas', freq: '3.1Hz', danger: 'Bloqueio Ativo', location: 'Encruzilhadas / Portais', plan: 'QUIMBANDA', desc: 'Frequência infra-sônica de contenção e ordem astral.' },
    { name: 'Exu Marabô', freq: '5.5Hz', danger: 'Autoridade Astral', location: 'Linha de Ferro', plan: 'QUIMBANDA', desc: 'Ressonância de comando sobre as legiões de rua.' },
    { name: 'Exu Tiriri', freq: '9.1Hz', danger: 'Agilidade / Corte', location: 'Encruzilhadas', plan: 'QUIMBANDA', desc: 'Vibração de rapidez e execução técnica de demandas.' },
    { name: 'Pombagira Maria Padilha', freq: '18.3Hz', danger: 'Transmutação', location: 'Lapa / Bordéis', plan: 'QUIMBANDA', desc: 'Frequência Beta alta para controle de impulsos e desejos.' },
    { name: 'Pombagira Sete Saias', freq: '22.2Hz', danger: 'Caminhos Abertos', location: 'Cruzeiros', plan: 'QUIMBANDA', desc: 'Frequência de sorte, movimento e fluidez financeira.' },

    // Caboclos e Pretos-Velhos (Ancestralidade e Sabedoria)
    { name: 'Caboclo Sete Flechas', freq: '444Hz', danger: 'Direção Mental', location: 'Florestas', plan: 'CABOCLOS', desc: 'Frequência da verdade e da mira espiritual precisa.' },
    { name: 'Caboclo Pena Branca', freq: '417Hz', danger: 'Limpeza Áurica', location: 'Altos Montes', plan: 'CABOCLOS', desc: 'Frequência para desfazer situações cristalizadas e negativas.' },
    { name: 'Pai Joaquim', freq: '1.5Hz', danger: 'Paz Infinita', location: 'Terreiros', plan: 'PRETO-VELHO', desc: 'Vibração Delta pura. Acesso ao inconsciente coletivo e memórias.' },
    { name: 'Vovó Cambinda', freq: '2.0Hz', danger: 'Cura Ancestral', location: 'Senzalas / Roças', plan: 'PRETO-VELHO', desc: 'Vibração de acolhimento e remoção de traumas profundos.' },

    // Falanges Específicas
    { name: 'Erê (Cosme e Damião)', freq: '528Hz', danger: 'Alegria / Pureza', location: 'Parques / Jardins', plan: 'ERÊS', desc: 'Frequência da criança interior e reparação de DNA.' },
    { name: 'Marinheiro (Martim)', freq: '396Hz', danger: 'Equilíbrio Emocional', location: 'Cais / Porto', plan: 'MARINHEIROS', desc: 'Liberação de culpa, medo e instabilidade emocional.' },
    { name: 'Boiadeiro (Lino)', freq: '212Hz', danger: 'Corte de Laços', location: 'Campos', plan: 'BOIADEIROS', desc: 'Frequência de "laçar" energias perdidas e trazê-las à ordem.' },
    { name: 'Cigano Wladimir', freq: '852Hz', danger: 'Intuição / Sorte', location: 'Estradas', plan: 'CIGANOS', desc: 'Despertar da intuição e da clarividência.' },
    { name: 'Baiano Zé do Coco', freq: '333Hz', danger: 'Quebra de Demanda', location: 'Bahia / Litoral', plan: 'BAIANOS', desc: 'Frequência de resistência e descarrego energético.' },

    // Ocultismo Profundo (Frequências de Polaridade)
    { name: 'Lúcifer', freq: '1.2Hz', danger: 'Conhecimento Proibido', location: 'Vácuo Estelar', plan: 'INFERNAL', desc: 'A Frequência do Portador da Luz. Intelecto puro e rebeldia.' },
    { name: 'Satan', freq: '0.6Hz', danger: 'Matéria Densa', location: 'Núcleo da Terra', plan: 'INFERNAL', desc: 'Infrassom de instinto primordial e sobrevivência bruta.' },
    { name: 'Baphomet', freq: '13.0Hz', danger: 'Dualidade / Alquimia', location: 'Círculos Ocultos', plan: 'INFERNAL', desc: 'O Equilíbrio entre o macrocosmo e o microcosmo.' }
  ];

  const filteredSpirits = rawSpirits.filter(s => 
    s.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    s.plan.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8 animate-[fadeIn_0.5s_ease-out]">
      <div className="glass p-8 border-emerald-500/20 rounded-[2.5rem] flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h2 className="text-3xl font-black mono text-emerald-400 uppercase tracking-tighter">Sintonizador Espectral</h2>
          <p className="text-[10px] text-slate-500 mono mt-1 uppercase tracking-widest italic">Iniciando Protocolo de TCI - Transcomunicação Instrumental</p>
        </div>
        <div className="relative w-full md:w-72">
          <input 
            type="text" 
            placeholder="PESQUISAR ENTIDADE..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-black/40 border border-emerald-500/20 p-3 rounded-xl text-[10px] mono text-emerald-400 focus:outline-none focus:border-emerald-500/50"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-20">
        {filteredSpirits.map((spirit, i) => (
          <div key={i} className="glass rounded-3xl border-emerald-500/10 hover:border-emerald-400 transition-all group overflow-hidden bg-gradient-to-br from-transparent to-emerald-500/5 flex flex-col h-full shadow-lg">
            <div className="h-48 bg-black relative flex items-center justify-center overflow-hidden border-b border-emerald-500/10">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-emerald-900/20 via-transparent to-transparent"></div>
              <div className="flex flex-col items-center gap-2 z-10">
                <div className="w-16 h-16 flex items-center justify-center relative">
                  <div className={`absolute inset-0 border-2 rounded-full animate-[spin_8s_linear_infinite] ${spirit.plan === 'INFERNAL' ? 'border-red-500/20' : 'border-emerald-500/10'}`}></div>
                  <svg className={`w-8 h-8 ${spirit.plan === 'INFERNAL' ? 'text-red-500' : 'text-emerald-500'}`} fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C7.03 2 3 6.03 3 11v11h2v-2c0-1.1.9-2 2-2s2 .9 2 2v2h2v-2c0-1.1.9-2 2-2s2 .9 2 2v2h2v-2c0-1.1.9-2 2-2s2 .9 2 2v2h2V11c0-4.97-4.03-9-9-9z" />
                  </svg>
                </div>
                <span className="text-[8px] mono text-slate-500 font-black tracking-[0.5em] uppercase">VIBRATION_SIGNATURE</span>
              </div>
            </div>
            
            <div className="p-6 flex-1 flex flex-col">
              <div className="mb-4">
                  <h3 className="text-base font-bold mono text-white uppercase tracking-tighter">{spirit.name}</h3>
                  <div className="flex justify-between items-center mt-1">
                    <span className="text-[9px] text-emerald-500/60 mono uppercase font-black">{spirit.plan}</span>
                    <span className={`text-[8px] px-2 py-0.5 rounded border mono font-bold ${
                      spirit.plan === 'INFERNAL' ? 'bg-red-950/40 border-red-500/40 text-red-500' : 'bg-black/60 border-emerald-500/20 text-emerald-400'
                    }`}>
                      {spirit.danger}
                    </span>
                  </div>
              </div>

              <p className="text-[10px] text-slate-400 mono leading-relaxed mb-6 italic min-h-[40px]">"{spirit.desc}"</p>
              
              <div className="space-y-4 mt-auto">
                 <div className="grid grid-cols-2 gap-4 text-[9px] mono border-t border-emerald-500/5 pt-4">
                   <div className="flex flex-col">
                     <span className="text-slate-500 font-bold uppercase">Ressonância</span>
                     <span className="text-emerald-400 font-black text-xs">{spirit.freq}</span>
                   </div>
                   <div className="flex flex-col text-right">
                     <span className="text-slate-500 font-bold uppercase">Sintonizador</span>
                     <span className="text-slate-400 font-black uppercase">Ativo</span>
                   </div>
                 </div>
                 
                 <button 
                  onClick={() => onSintonize(spirit)}
                  className={`w-full py-3 rounded-xl text-[10px] mono font-black uppercase transition-all shadow-md ${
                    spirit.plan === 'INFERNAL' 
                      ? 'bg-red-500/10 border border-red-500/30 text-red-500 hover:bg-red-500 hover:text-white' 
                      : 'bg-emerald-500/10 border border-emerald-500/30 text-emerald-500 hover:bg-emerald-500 hover:text-black'
                  }`}
                 >
                   Sintonizar Chat V.O.G.
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
