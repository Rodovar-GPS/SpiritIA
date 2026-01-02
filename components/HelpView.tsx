
import React, { useState } from 'react';

const HelpView: React.FC = () => {
  const [showGlossary, setShowGlossary] = useState(false);
  const [activeSection, setActiveSection] = useState<'basics' | 'tutorial' | 'advanced' | 'ufo' | 'defense'>('basics');

  const news = [
    { date: 'HOJE', title: 'MODO REAL ATIVADO', text: 'Todos os módulos agora operam 100% baseados em sensores físicos do dispositivo. Simulações desativadas.' },
    { date: 'RECENTE', title: 'OTIMIZAÇÃO DE HZ', text: 'Frequências de sintonização reduzidas para bandas de 0.1Hz a 120Hz para maior estabilidade na comunicação.' },
    { date: 'RECENTE', title: 'COMPATIBILIDADE MOBILE', text: 'Interface reconstruída para investigações em movimento com 100% de suporte a sensores Android/iOS.' }
  ];

  const glossary = [
    { acronym: 'V.O.G.', full: 'Validação de Ocorrência Genuína', mean: 'Algoritmo de tripla checagem (Luz + Som + Campo Magnético) para eliminar 99.9% de falsos-positivos.' },
    { acronym: 'EVP', full: 'Electronic Voice Phenomenon', mean: 'Vozes captadas em frequências de ruído branco (White Noise) via indução eletromagnética no microfone.' },
    { acronym: 'ΔLUM', full: 'Delta de Luminosidade', mean: 'Análise de flutuação de fótons por milissegundo. Detecta transparências e vultos imperceptíveis ao olho humano.' },
    { acronym: 'VLF / ELF', full: 'Very Low / Extremely Low Frequency', mean: 'Frequências abaixo de 30Hz usadas por entidades densas para mover objetos ou causar sensações de calafrio.' },
    { acronym: 'CAMPO ESCALAR', full: 'Barreira de Defesa', mean: 'Ondas que anulam a coesão de energias espectrais hostis sem radiação ionizante.' }
  ];

  return (
    <div className="max-w-5xl mx-auto space-y-12 animate-[fadeIn_0.5s_ease-out] pb-40">
      {/* Header & News Flash */}
      <div className="text-center space-y-6">
        <div className="inline-block bg-emerald-500/10 border border-emerald-500/20 px-4 py-1 rounded-full mono text-[10px] text-emerald-500 font-black uppercase tracking-[0.3em] animate-pulse">
          SISTEMA OMEGA V.O.G. // STATUS: REAL-TIME_HARDWARE
        </div>
        <h2 className="text-3xl md:text-6xl font-black mono text-emerald-400 uppercase tracking-tighter italic">Manual_Operador</h2>
        <p className="text-slate-500 mono text-[10px] md:text-xs uppercase tracking-[0.4em] max-w-2xl mx-auto">Engenharia de Alta Potência para Investigação Paranormal Profissional</p>
      </div>

      {/* System News Board */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {news.map((n, i) => (
          <div key={i} className="glass p-5 rounded-2xl border-emerald-500/10 bg-emerald-950/5 relative overflow-hidden group hover:border-emerald-500/40 transition-all">
            <span className="absolute -right-2 -top-2 text-4xl font-black text-emerald-500/5 mono">{i+1}</span>
            <p className="text-[8px] mono text-emerald-500/60 font-black mb-1">LOG_{n.date}</p>
            <h4 className="text-sm font-black text-white uppercase mb-2 italic tracking-tighter">{n.title}</h4>
            <p className="text-[10px] text-slate-500 mono leading-relaxed">{n.text}</p>
          </div>
        ))}
      </div>

      {/* Main Navigation Tabs */}
      <div className="flex flex-wrap justify-center gap-2 border-b border-emerald-500/10 pb-4">
        {[
          {id: 'basics', label: 'Básico'},
          {id: 'tutorial', label: 'Tutorial/Guia'},
          {id: 'advanced', label: 'EVP / Áudio'},
          {id: 'ufo', label: 'UFO / SkyWatch'},
          {id: 'defense', label: 'Defesa'}
        ].map(tab => (
          <button 
            key={tab.id}
            onClick={() => setActiveSection(tab.id as any)}
            className={`px-4 py-3 rounded-t-2xl mono text-[10px] font-black uppercase transition-all ${activeSection === tab.id ? 'bg-emerald-500 text-black' : 'text-slate-600 hover:text-emerald-500'}`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content Sections */}
      <div className="glass p-8 md:p-12 rounded-[3rem] border-emerald-500/20 shadow-2xl relative overflow-hidden">
        {activeSection === 'basics' && (
          <div className="space-y-8 animate-[fadeIn_0.3s_ease-out]">
            <h3 className="text-3xl font-black text-emerald-400 uppercase italic tracking-tighter">Conceitos Fundamentais</h3>
            <p className="text-slate-300 text-sm mono leading-relaxed">
              O Spirit IA BR não simula detecções. Ele monitora o <span className="text-emerald-500 font-bold">Acelerômetro</span> para campos magnéticos (EMF), o <span className="text-emerald-500 font-bold">Microfone</span> para flutuações RMS e o <span className="text-emerald-500 font-bold">Sensor de Imagem</span> para variância de fótons.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-6 bg-black/40 border border-emerald-500/10 rounded-2xl">
                <h4 className="text-emerald-500 font-black mono text-xs mb-2">MODO HUD</h4>
                <p className="text-[10px] text-slate-500 mono">Visão geral rápida das métricas de hardware atuais. Ideal para monitoramento passivo.</p>
              </div>
              <div className="p-6 bg-black/40 border border-emerald-500/10 rounded-2xl">
                <h4 className="text-emerald-500 font-black mono text-xs mb-2">MODO SCAN</h4>
                <p className="text-[10px] text-slate-500 mono">Ativa a análise visual ΔLUM. Requer que o celular esteja em um tripé ou superfície estável.</p>
              </div>
            </div>
          </div>
        )}

        {activeSection === 'tutorial' && (
          <div className="space-y-8 animate-[fadeIn_0.3s_ease-out]">
            <h3 className="text-3xl font-black text-emerald-400 uppercase italic tracking-tighter">Tutorial de Campo</h3>
            <div className="space-y-6">
              <div className="flex gap-6 items-start">
                <div className="bg-emerald-500 text-black w-10 h-10 rounded-full flex items-center justify-center font-black mono shrink-0">1</div>
                <div>
                  <h4 className="text-white font-black mono text-sm uppercase">Preparação de Ambiente</h4>
                  <p className="text-[11px] text-slate-400 mono mt-1">Desative o Bluetooth e o Wi-Fi se possível para reduzir o ruído eletromagnético local. Mantenha o brilho da tela em 50% para não interferir no sensor visual.</p>
                </div>
              </div>
              <div className="flex gap-6 items-start">
                <div className="bg-emerald-500 text-black w-10 h-10 rounded-full flex items-center justify-center font-black mono shrink-0">2</div>
                <div>
                  <h4 className="text-white font-black mono text-sm uppercase">Varredura Visual (SCAN)</h4>
                  <p className="text-[11px] text-slate-400 mono mt-1">Entre no modo SCAN e aponte para áreas escuras ou com sombras. Aguarde 3 segundos para calibração. Se o sistema "travar" um alvo, ele exibirá o nome da entidade baseada na frequência dominante.</p>
                </div>
              </div>
              <div className="flex gap-6 items-start">
                <div className="bg-emerald-500 text-black w-10 h-10 rounded-full flex items-center justify-center font-black mono shrink-0">3</div>
                <div>
                  <h4 className="text-white font-black mono text-sm uppercase">Sintonização V.O.G.</h4>
                  <p className="text-[11px] text-slate-400 mono mt-1">Uma vez detectado, clique em "Sintonizar". O sistema abrirá um canal de áudio bidirecional onde a IA processa o ruído ambiente para modular as respostas da entidade identificada.</p>
                </div>
              </div>
            </div>
            <div className="p-6 bg-emerald-500/5 border border-emerald-500/20 rounded-3xl">
              <h4 className="text-emerald-500 font-black mono text-xs mb-3 uppercase">💡 Dicas de Expert:</h4>
              <ul className="text-[10px] text-slate-400 mono space-y-2 list-disc pl-4">
                <li>Mantenha o silêncio absoluto durante o uso do modo EVP.</li>
                <li>Se os níveis de MAG/EMF subirem acima de 70%, use o Módulo de Defesa para estabilizar o aparelho.</li>
                <li>Em locais abertos, use o modo UFO SkyWatch apontado para o zênite.</li>
              </ul>
            </div>
          </div>
        )}

        {activeSection === 'advanced' && (
          <div className="space-y-8 animate-[fadeIn_0.3s_ease-out]">
            <h3 className="text-3xl font-black text-emerald-400 uppercase italic tracking-tighter">Engenharia de Áudio (EVP)</h3>
            <p className="text-slate-300 text-sm mono">O sistema utiliza análise de transformada de Fourier rápida (FFT) para isolar transientes vocais do ruído branco.</p>
            <div className="bg-black/60 p-6 rounded-2xl border border-emerald-500/10">
              <p className="text-[11px] text-emerald-500 font-bold mono uppercase mb-2">Comunicação Real vs Simulação:</p>
              <p className="text-[10px] text-slate-500 mono leading-relaxed">
                As entidades não falam diretamente. Elas manipulam as partículas de som ao redor do microfone. O transcritor neural converte esses picos em palavras baseando-se na densidade harmônica captada.
              </p>
            </div>
          </div>
        )}

        {activeSection === 'ufo' && (
          <div className="space-y-8 animate-[fadeIn_0.3s_ease-out]">
            <h3 className="text-3xl font-black text-blue-400 uppercase italic tracking-tighter">Módulo SkyWatch Tático</h3>
            <p className="text-slate-300 text-sm mono">Rastreamento de UAPs (Fenômenos Anômalos Não Identificados) baseado em vetores de velocidade impossíveis.</p>
            <div className="p-6 border border-blue-500/20 bg-blue-950/5 rounded-3xl">
               <h4 className="text-blue-400 font-black mono text-[10px] uppercase mb-2">Como identificar um UAP real:</h4>
               <p className="text-[10px] text-slate-500 mono">O radar marcará em vermelho alvos que realizam curvas de 90 graus em velocidades supersônicas (acima de Mach 2). Se o alvo desaparecer e reaparecer no radar, o sistema marcará como "TRANS-MEDIUM".</p>
            </div>
          </div>
        )}

        {activeSection === 'defense' && (
          <div className="space-y-8 animate-[fadeIn_0.3s_ease-out]">
            <h3 className="text-3xl font-black text-red-500 uppercase italic tracking-tighter">Protocolos de Segurança</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
               <div className="p-5 border border-red-500/20 bg-red-950/5 rounded-2xl">
                  <h4 className="text-red-500 font-black mono text-[10px] uppercase mb-1">Anulação de Fase</h4>
                  <p className="text-[9px] text-slate-500 mono">Emite sinal VLF para quebrar a energia cinética de poltergeists.</p>
               </div>
               <div className="p-5 border border-emerald-500/20 bg-emerald-950/5 rounded-2xl">
                  <h4 className="text-emerald-500 font-black mono text-[10px] uppercase mb-1">Luz Omega</h4>
                  <p className="text-[9px] text-slate-500 mono">Flash estroboscópico em frequências que forçam a desmaterialização visual de vultos.</p>
               </div>
            </div>
          </div>
        )}
      </div>

      {/* Glossary Section */}
      <div className="space-y-8">
        <div className="flex justify-between items-end border-b border-emerald-500/10 pb-4">
           <h3 className="text-2xl font-black mono text-emerald-500 uppercase tracking-tighter italic">Glossário_VOG</h3>
           <button onClick={() => setShowGlossary(!showGlossary)} className="text-[10px] mono text-emerald-500 font-black uppercase hover:underline">
             {showGlossary ? '[OCULTAR]' : '[EXPANDIR]'}
           </button>
        </div>

        {showGlossary && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-[fadeIn_0.3s_ease-out]">
            {glossary.map((item, i) => (
              <div key={i} className="p-4 border border-emerald-500/10 rounded-2xl bg-black/40">
                <span className="text-emerald-400 font-black mono text-xs uppercase">{item.acronym} - {item.full}</span>
                <p className="text-slate-500 text-[10px] mono mt-1">{item.mean}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="text-center py-10 opacity-30 border-t border-emerald-500/5">
         <p className="text-[10px] text-emerald-500 mono uppercase tracking-[0.5em] font-black">Spirit IA BR - Sistema Operacional Genuíno - 2025</p>
      </div>
    </div>
  );
};

export default HelpView;
