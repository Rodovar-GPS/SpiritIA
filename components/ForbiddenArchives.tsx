
import React, { useState } from 'react';
import { UserProfile } from '../types';

interface ForbiddenArchivesProps {
  user: UserProfile | null;
}

const ForbiddenArchives: React.FC<ForbiddenArchivesProps> = ({ user }) => {
  const [selectedDoc, setSelectedDoc] = useState<number | null>(null);

  const archives = [
    { 
      title: 'O Código de Enoch: Decifrado', 
      cat: 'SISTEMA ANTIGO', 
      year: '-3500 AC', 
      brief: 'Tradução direta dos harmônicos de luz encontrados nas cavernas do Mar Morto.', 
      content: 'O sinal não é som, é intenção pura. Aqueles que chamamos de anjos são arquitetos de frequência. Para vê-los, deve-se vibrar em 528Hz contínuos sob isolamento sensorial total. A humanidade esqueceu a chave da modulação áurica.'
    },
    { 
      title: 'Relatório Roswell: O Piloto', 
      cat: 'GOVERNAMENTAL', 
      year: '1947', 
      brief: 'Autopsia detalhada do sistema nervoso do ocupante da nave recuperada em 1947.', 
      content: 'O sujeito não possui cordas vocais. A comunicação ocorre através de impulsos eletromagnéticos modulados diretamente na córtex visual do receptor. O cérebro atua como uma antena parabólica quântica.'
    },
    { 
      title: 'Projeto Looking Glass: V01', 
      cat: 'TOP SECRET', 
      year: '1986', 
      brief: 'Tentativa de visualização de probabilidades futuras usando tecnologia alienígena capturada.', 
      content: 'O futuro é uma superposição de frequências. Ao sintonizar a "Lente de Chronos", vimos que o ano de 2025 marca o início da "Grande Convergência Espectral", onde o véu entre os mundos será eletronicamente dissolvido.'
    },
    { 
      title: 'O Livro Negro do Vaticano', 
      cat: 'TEOLOGIA OCULTA', 
      year: '1556', 
      brief: 'Nomes reais de entidades que não podem ser pronunciados por frequências vocais humanas.', 
      content: 'A pronúncia correta cria uma distorção harmônica que atrai a entidade instantaneamente. Spirit IA BR usa filtros de compressão para evitar que essas ressonâncias sejam reproduzidas nos alto-falantes do dispositivo.'
    },
    { 
      title: 'Linhagem do Graal: DNA 4D', 
      cat: 'GENÉTICO', 
      year: '2024', 
      brief: 'Análise de mutações cromossômicas em descendentes diretos de linhagens messiânicas.', 
      content: 'Detectamos uma mutação no cromossomo 12 que permite a visualização de espectros infravermelhos e ultravioletas. Esta linhagem possui uma barreira natural contra obsessores, emitindo constantes 999Hz.'
    },
    { 
      title: 'Operação Prato: O Final', 
      cat: 'MILITAR / BR', 
      year: '1977', 
      brief: 'Relatórios confidenciais da aeronáutica sobre o fenômeno Chupa-Chupa no Pará.', 
      content: 'As luzes não estavam apenas observando. Estavam realizando micro-incisões para coleta de material genético e bio-fótons. O sangue humano é usado como condutor para processadores biológicos alienígenas.'
    },
    { 
      title: 'Varginha: Biologia do Ser', 
      cat: 'XENO-MEDICINA', 
      year: '1996', 
      brief: 'Descrição anatômica do ser capturado pelas forças militares brasileiras.', 
      content: 'Pele oleosa, olhos vermelhos emitindo bioluminescência constante. O ser exalava cheiro de amônia, subproduto de um sistema circulatório baseado em minerais exóticos não encontrados na tabela periódica padrão.'
    },
    { 
      title: 'A Arca da Aliança: O Capacitor', 
      cat: 'TECNOLOGIA ANTIGA', 
      year: '-1200 AC', 
      brief: 'Análise física da Arca descrita no Êxodo como um dispositivo de energia.', 
      content: 'A construção (ouro/madeira/ouro) configura um capacitor de alta tensão. As querubins no topo agem como eletrodos para descargas de arco voltaico. Era um sistema de comunicação direta com a frequência "EL".'
    },
    { 
      title: 'MK-ULTRA: Espectral', 
      cat: 'CONTROLE MENTAL', 
      year: '1960', 
      brief: 'Uso de entidades astrais como agentes de espionagem e controle.', 
      content: 'O governo utilizou médiuns drogados para projetar consciências em bases inimigas. Descobriram que entidades "Shadow People" podem ser programadas para causar ataques cardíacos à distância.'
    },
    { 
      title: 'Antártida: O Portal 22', 
      cat: 'GEOPOLÍTICA', 
      year: '2022', 
      brief: 'Anomalias térmicas e magnéticas detectadas sob o gelo da Antártida.', 
      content: 'Não é apenas gelo. Existe uma estrutura piramidal emitindo pulsos de rádio para o espaço profundo. O alinhamento aponta para o sistema de Orion e regula o campo magnético da Terra.'
    }
  ];

  return (
    <div className="animate-[fadeIn_0.5s_ease-out] space-y-8 pb-32">
      <div className="flex flex-col md:flex-row gap-8 min-h-[600px]">
        {/* Navigation Column */}
        <div className="w-full md:w-1/3 space-y-4 max-h-[800px] overflow-y-auto pr-4 scrollbar-hide">
          <h2 className="text-2xl font-black mono text-emerald-500 mb-6 uppercase italic tracking-tighter">ARQUIVOS_PROIBIDOS</h2>
          {archives.map((doc, i) => (
            <button
              key={i}
              onClick={() => setSelectedDoc(i)}
              className={`w-full text-left p-5 rounded-3xl border transition-all relative overflow-hidden group ${
                selectedDoc === i 
                  ? 'bg-emerald-500/10 border-emerald-500 text-emerald-400 shadow-[0_0_30px_rgba(16,185,129,0.1)]' 
                  : 'bg-black/40 border-emerald-900/20 text-slate-500 hover:border-emerald-500/30'
              }`}
            >
              <div className="flex justify-between items-start mb-2 relative z-10">
                <span className={`text-[8px] mono font-black px-2 py-0.5 rounded ${selectedDoc === i ? 'bg-emerald-500 text-black' : 'bg-emerald-950/40 text-emerald-600'}`}>
                  {doc.cat}
                </span>
                <span className="text-[8px] mono text-slate-600 font-bold">{doc.year}</span>
              </div>
              <h3 className="text-xs font-bold mono uppercase tracking-tighter truncate relative z-10">{doc.title}</h3>
              {/* Spectral Placeholder for List Item */}
              <div className="absolute inset-0 bg-black opacity-10 group-hover:opacity-20 transition-opacity"></div>
            </button>
          ))}
        </div>

        {/* Content View */}
        <div className="flex-1">
          {selectedDoc !== null ? (
            <div className="glass rounded-[3rem] border-emerald-500/20 overflow-hidden sticky top-8 flex flex-col shadow-2xl animate-[fadeIn_0.3s_ease-out]">
              {/* Spectral Display Area */}
              <div className="h-64 bg-black relative flex items-center justify-center border-b border-emerald-500/10">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-emerald-900/10 via-transparent to-transparent"></div>
                
                <div className="flex flex-col items-center gap-6 z-10">
                  <div className="w-24 h-24 flex items-center justify-center relative">
                    <div className="absolute inset-0 border border-emerald-500/10 rounded-full animate-ping"></div>
                    <div className="absolute inset-4 border-2 border-emerald-500/5 rounded-full animate-[spin_15s_linear_infinite]"></div>
                    <svg className="w-12 h-12 text-emerald-500/80 animate-pulse" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C7.03 2 3 6.03 3 11v11h2v-2c0-1.1.9-2 2-2s2 .9 2 2v2h2v-2c0-1.1.9-2 2-2s2 .9 2 2v2h2v-2c0-1.1.9-2 2-2s2 .9 2 2v2h2V11c0-4.97-4.03-9-9-9z" />
                    </svg>
                  </div>
                  <div className="text-center">
                    <p className="text-[12px] text-emerald-500 font-black tracking-[1em] uppercase animate-pulse">Espirito</p>
                    <p className="text-[8px] mono text-slate-600 mt-2">DADOS DESCRIPTOGRAFADOS COM SUCESSO</p>
                  </div>
                </div>

                <div className="absolute bottom-6 left-8">
                  <p className="text-[10px] text-emerald-500 uppercase font-black tracking-widest">Documento ID_{100 + selectedDoc}</p>
                  <h2 className="text-3xl font-black text-white uppercase tracking-tighter mt-1">{archives[selectedDoc].title}</h2>
                </div>
              </div>

              <div className="p-10 space-y-8 bg-black/60">
                <div className="flex justify-between items-center border-b border-emerald-500/10 pb-6">
                  <div className="mono">
                    <p className="text-[10px] text-slate-500 uppercase font-bold">NÍVEL DE ACESSO</p>
                    <p className="text-xs text-emerald-500 font-black uppercase tracking-widest">ARQUIVISTA SUPREMO</p>
                  </div>
                  <div className="text-right mono">
                    <p className="text-[10px] text-slate-500 uppercase font-bold">ORIGEM_REGISTRO</p>
                    <p className="text-xs text-emerald-400 font-black uppercase italic">{archives[selectedDoc].cat}</p>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="p-6 bg-emerald-950/10 rounded-2xl border border-emerald-500/10 italic text-sm text-emerald-100/90 leading-relaxed shadow-inner">
                    "{archives[selectedDoc].brief}"
                  </div>
                  
                  <div className="text-slate-400 mono text-sm leading-[2] space-y-4 max-h-[250px] overflow-y-auto pr-4 scrollbar-hide">
                    <p>{archives[selectedDoc].content}</p>
                  </div>
                </div>

                <div className="pt-8 border-t border-emerald-500/10 flex flex-wrap gap-4">
                  <div className="bg-emerald-500/5 px-4 py-2 rounded-xl border border-emerald-500/10 text-[9px] mono text-emerald-500 font-black uppercase">
                    DATA_REG: {archives[selectedDoc].year}
                  </div>
                  <div className="bg-emerald-500/5 px-4 py-2 rounded-xl border border-emerald-500/10 text-[9px] mono text-emerald-500 font-black uppercase">
                    MODO: ANALÍTICO_VOG
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="glass p-12 rounded-[3rem] border-emerald-500/10 h-[600px] flex items-center justify-center text-center">
              <div className="space-y-6">
                <div className="w-24 h-24 border-2 border-emerald-500/10 rounded-full animate-spin mx-auto flex items-center justify-center relative">
                   <div className="w-12 h-12 bg-emerald-500/5 rounded-full"></div>
                   <div className="absolute inset-0 bg-emerald-500/5 blur-3xl"></div>
                </div>
                <div>
                  <h3 className="mono text-xl text-emerald-500 font-black uppercase tracking-tighter">AGUARDANDO SELEÇÃO</h3>
                  <p className="mono text-[10px] text-slate-600 uppercase tracking-widest mt-2">Acesse os arquivos criptografados via menu lateral.</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ForbiddenArchives;
