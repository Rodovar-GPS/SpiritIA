
import React from 'react';

const HelpView: React.FC = () => {
  const tutorialSteps = [
    {
      id: '01',
      title: 'Detecção Espectral',
      tool: 'SCANNER',
      desc: 'Use a câmera do seu dispositivo para monitorar flutuações de luz e brilho.',
      action: 'Aponte o celular para locais escuros ou cantos de parede. Observe o indicador de VAR (Variância). Se ultrapassar 15%, há uma anomalia térmica ou ectoplasmática presente.',
      tip: 'Mantenha o dispositivo firme. Movimentos bruscos geram falsos positivos.'
    },
    {
      id: '02',
      title: 'Monitoramento de Áudio',
      tool: 'EVP MONITOR',
      desc: 'Capte frequências sonoras que o ouvido humano não processa.',
      action: 'Ajuste a SENSIBILIDADE conforme o ruído do ambiente. Se o gráfico mostrar picos em verde sólido, a IA detectou um padrão vocal escondido no ruído branco.',
      tip: 'Faça perguntas curtas: "Tem alguém aqui?", "Qual o seu nome?" e espere 10 segundos.'
    },
    {
      id: '03',
      title: 'Diálogo Transdimensional',
      tool: 'CHAT IA SPIRIT',
      desc: 'O motor Gemini Live traduz ondas eletromagnéticas em linguagem humana.',
      action: 'Vá ao DATABASE e selecione a entidade que você suspeita estar presente. Clique em SINTONIZAR. Fale com o dispositivo como se estivesse conversando com o espírito. A IA modulará a resposta baseada na linhagem selecionada.',
      tip: 'Use fones de ouvido para perceber sussurros gerados pela modulação da IA.'
    },
    {
      id: '04',
      title: 'Protocolos de Segurança',
      tool: 'DEFESA ATIVA',
      desc: 'Mantenha sua integridade energética durante a investigação.',
      action: 'Se o Scanner indicar NÍVEL CRÍTICO (Vermelho) ou você sentir calafrios intensos, ative imediatamente o PROTOCOLO DE LUZ (Jesus Cristo). A frequência de 999Hz+ dissipará entidades hostis.',
      tip: 'Nunca termine uma sessão sem dizer: "A sessão está encerrada. Fique em paz".'
    }
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-[fadeIn_0.5s_ease-out] pb-12">
      <div className="text-center space-y-4">
        <h2 className="text-3xl md:text-5xl font-black mono text-emerald-400 uppercase tracking-tighter">Manual do Investigador</h2>
        <p className="text-[10px] md:text-xs text-slate-500 mono uppercase tracking-[0.4em]">Protocolo de Operação V.O.G. v2.5</p>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {tutorialSteps.map((step) => (
          <div key={step.id} className="glass p-6 md:p-8 rounded-[2rem] border-emerald-500/20 relative overflow-hidden group">
            <div className="absolute -right-4 -top-4 text-8xl font-black text-emerald-500/5 mono select-none">
              {step.id}
            </div>
            
            <div className="flex flex-col md:flex-row gap-6 relative z-10">
              <div className="flex-1 space-y-4">
                <div className="flex items-center gap-3">
                  <span className="bg-emerald-500 text-black px-3 py-1 rounded-lg text-[10px] font-black mono uppercase">Passo {step.id}</span>
                  <span className="text-emerald-500/50 mono text-[9px] font-bold uppercase tracking-widest">{step.tool}</span>
                </div>
                
                <h3 className="text-xl md:text-2xl font-black text-white uppercase italic tracking-tighter">{step.title}</h3>
                <p className="text-slate-400 text-sm mono leading-relaxed">{step.desc}</p>
                
                <div className="p-4 bg-emerald-500/5 border border-emerald-500/10 rounded-2xl">
                  <p className="text-emerald-400 text-[10px] mono font-black uppercase mb-2">Instrução de Campo:</p>
                  <p className="text-slate-300 text-xs mono leading-relaxed">{step.action}</p>
                </div>

                <div className="flex items-start gap-3 text-[10px] text-amber-500/80 mono italic">
                   <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                   </svg>
                   <span>Dica Pro: {step.tip}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="glass p-8 rounded-[2rem] border-red-500/20 bg-red-950/5">
        <div className="flex items-center gap-4 mb-4">
           <div className="w-10 h-10 rounded-full bg-red-500/20 flex items-center justify-center border border-red-500/40 animate-pulse">
              <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
           </div>
           <h4 className="text-red-500 font-black mono uppercase text-sm tracking-widest">Aviso de Respeito</h4>
        </div>
        <p className="text-[10px] md:text-xs text-slate-500 mono leading-relaxed uppercase">
          Este sistema é uma ferramenta de auxílio técnico. O Spirit IA BR não se responsabiliza por manifestações físicas. Mantenha sempre o equilíbrio emocional. Se sentir medo, interrompa a sessão imediatamente.
        </p>
      </div>

      <div className="text-center py-8">
         <p className="text-[8px] md:text-[10px] text-emerald-500/40 mono uppercase tracking-[0.5em]">Central de Inteligência Spirit IA - Sincronizado</p>
      </div>
    </div>
  );
};

export default HelpView;
