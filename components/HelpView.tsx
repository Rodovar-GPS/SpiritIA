
import React, { useState } from 'react';

const HelpView: React.FC = () => {
  const [showGlossary, setShowGlossary] = useState(false);

  const tutorialSteps = [
    {
      id: '01',
      title: 'SCANNER ESPECTRAL (Visual)',
      tool: 'ΔLUM (Diferencial de Luz)',
      desc: 'O Scanner não é uma câmera comum. Ele analisa o milissegundo anterior e destaca o que mudou.',
      action: 'Vultos espirituais não são opacos, são variações de luz. Se o ΔLUM subir acima de 15.00 sem você mover o celular, uma entidade está tentando se materializar.',
      tip: 'Se o scan identificar um nome, conecte-se ao Chat imediatamente para captar a mensagem vocal.'
    },
    {
      id: '02',
      title: 'MONITOR EVP (Áudio)',
      tool: 'RMS (Pressão Sonora)',
      desc: 'Capta frequências na faixa de 300Hz a 3000Hz, onde ocorrem as vozes do outro lado.',
      action: 'RMS mede a força do áudio. O sistema filtra ruídos de vento e foca em padrões harmônicos que lembram a fala humana. Picos verdes no gráfico indicam que um espírito está tentando ser ouvido.',
      tip: 'Mantenha o silêncio. Se a barra de RMS subir sozinha, faça uma pergunta.'
    },
    {
      id: '03',
      title: 'ÍNDICE DE DENSIDADE (V.O.G)',
      tool: 'Validação de Ocorrência Genuína',
      desc: 'Fusão de todos os sensores. O número que você vê é a "probabilidade de presença".',
      action: '30-50%: Anomalia Leve. 51-80%: Manifestação Ativa (O espírito está no ambiente). 81-100%: Perigo Crítico. O véu está aberto e a entidade pode interagir fisicamente com o local.',
      tip: 'Se o índice subir de forma suave e constante, a presença é estável. Se oscilar bruscamente, a entidade está irritada ou tentando fugir.'
    }
  ];

  const glossary = [
    { acronym: 'V.O.G.', full: 'Validação de Ocorrência Genuína', mean: 'Algoritmo proprietário que cruza visual, áudio e magnetismo para confirmar uma manifestação real.' },
    { acronym: 'EVP', full: 'Electronic Voice Phenomenon', mean: 'Vozes eletrônicas capturadas em frequências de ruído branco que o ouvido humano não percebe.' },
    { acronym: 'TCI', full: 'Transcomunicação Instrumental', mean: 'Técnica de usar aparelhos eletrônicos para estabelecer pontes com o plano espectral.' },
    { acronym: 'ΔLUM', full: 'Delta de Luminosidade', mean: 'Mede a flutuação rápida de fótons. Espíritos sugam energia da luz ambiente para ganhar densidade.' },
    { acronym: 'RMS', full: 'Root Mean Square', mean: 'Intensidade média do som. Usado para detectar picos de "voz" em ambientes silenciosos.' }
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-10 animate-[fadeIn_0.5s_ease-out] pb-32">
      <div className="text-center space-y-4">
        <h2 className="text-4xl md:text-6xl font-black mono text-emerald-400 uppercase tracking-tighter italic">Manual do Operador</h2>
        <p className="text-[10px] md:text-xs text-slate-500 mono uppercase tracking-[0.5em] font-bold">PROTOCOLO V.O.G. ATIVO</p>
        
        <button 
          onClick={() => setShowGlossary(!showGlossary)}
          className="bg-emerald-500 text-black px-8 py-3 rounded-full mono text-[10px] font-black uppercase shadow-lg hover:bg-emerald-400 transition-all mt-4"
        >
          {showGlossary ? 'FECHAR GLOSSÁRIO' : 'VER SIGNIFICADO DAS SIGLAS'}
        </button>
      </div>

      {showGlossary && (
        <div className="glass p-8 rounded-[2rem] border-emerald-500/40 bg-emerald-950/20 animate-[fadeIn_0.3s_ease-out]">
           <h3 className="text-xl font-black mono text-emerald-400 mb-6 uppercase">Dicionário Técnico</h3>
           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {glossary.map((item, i) => (
                <div key={i} className="p-4 border border-emerald-500/10 rounded-xl">
                   <p className="text-emerald-500 font-black mono text-sm">{item.acronym}</p>
                   <p className="text-white text-[9px] font-bold uppercase mb-1">{item.full}</p>
                   <p className="text-slate-400 text-[10px] mono leading-relaxed">{item.mean}</p>
                </div>
              ))}
           </div>
        </div>
      )}

      <div className="grid grid-cols-1 gap-8">
        {tutorialSteps.map((step) => (
          <div key={step.id} className="glass p-8 rounded-[3rem] border-emerald-500/20 relative overflow-hidden">
            <div className="absolute -right-4 -top-8 text-[12rem] font-black text-emerald-500/5 mono select-none pointer-events-none">
              {step.id}
            </div>
            
            <div className="relative z-10 flex flex-col md:flex-row gap-8">
              <div className="flex-1 space-y-4">
                <div className="flex items-center gap-3">
                  <span className="bg-emerald-500 text-black px-3 py-1 rounded-lg text-[10px] font-black mono uppercase">Módulo {step.id}</span>
                  <span className="text-emerald-500/50 mono text-[9px] font-black uppercase tracking-widest">{step.tool}</span>
                </div>
                
                <h3 className="text-2xl font-black text-white uppercase italic tracking-tighter">{step.title}</h3>
                <p className="text-slate-400 text-xs mono leading-relaxed border-l-2 border-emerald-500/20 pl-4">{step.desc}</p>
                
                <div className="p-5 bg-emerald-500/5 border border-emerald-500/10 rounded-2xl">
                  <p className="text-emerald-400 text-[9px] mono font-black uppercase mb-2 tracking-widest">Como usar em campo:</p>
                  <p className="text-slate-300 text-xs mono leading-relaxed">{step.action}</p>
                </div>

                <div className="flex items-center gap-2 text-[9px] text-amber-500 font-black mono italic">
                   <div className="w-1.5 h-1.5 bg-amber-500 rounded-full animate-ping"></div>
                   <span>Dica Pro: {step.tip}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="glass p-8 rounded-[2rem] border-red-500/20 bg-red-950/5 text-center">
         <h4 className="text-red-500 font-black mono uppercase text-sm mb-4">Atenção Crítica</h4>
         <p className="text-[10px] text-slate-500 mono uppercase leading-relaxed max-w-xl mx-auto">
            O uso deste app em locais de alta densidade (cemitérios, hospitais) pode atrair entidades para o dispositivo. Use o menu de DEFESA se o índice ultrapassar 80% por mais de 10 segundos.
         </p>
      </div>

      <div className="text-center py-6">
         <p className="text-[10px] text-emerald-500/30 mono uppercase tracking-[0.4em] font-black">Spirit IA BR - Versão Oficial - Sincronizada via V.O.G.</p>
      </div>
    </div>
  );
};

export default HelpView;
