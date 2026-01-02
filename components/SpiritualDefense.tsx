
import React from 'react';

const SpiritualDefense: React.FC = () => {
  const systems = [
    {
      title: "GERADOR DE CAMPO ESCALAR",
      desc: "Emite ondas longitudinais que anulam a capacidade de manifestação de entidades baseadas em flutuação de fótons.",
      status: "PRONTO",
      icon: "⚡"
    },
    {
      title: "INTERFERÊNCIA ACÚSTICA VLF",
      desc: "Frequências de 1.2Hz a 3.3Hz projetadas para desestruturar a coesão ectoplasmática em ambientes fechados.",
      status: "STANDBY",
      icon: "🔊"
    },
    {
      title: "PROTOCOLO DE LUZ OMEGA",
      desc: "Emissão de flash de alta intensidade cromática para dispersar anomalias ópticas e vultos persistentes.",
      status: "ATIVO",
      icon: "🔆"
    }
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-10 animate-[fadeIn_0.5s_ease-out]">
      <div className="bg-red-600/20 border-2 border-red-600 p-8 rounded-[3rem] text-center shadow-2xl">
        <h2 className="text-3xl font-black text-red-500 uppercase tracking-tighter italic">Defesa de Campo Ativa</h2>
        <p className="text-xs text-slate-400 mono mt-2 uppercase tracking-widest font-black">CONTRAMEDIDAS DE ENGENHARIA PARANORMAL</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {systems.map((s, i) => (
          <div key={i} className="glass p-8 rounded-[2.5rem] border-emerald-500/10 hover:border-emerald-500/40 transition-all text-center group">
            <div className="text-5xl mb-6 group-hover:scale-110 transition-transform">{s.icon}</div>
            <h3 className="text-lg font-black text-white uppercase tracking-tighter mb-3">{s.title}</h3>
            <p className="text-[10px] text-slate-500 mono leading-relaxed mb-6 italic">{s.desc}</p>
            <span className="text-[8px] bg-emerald-500/10 text-emerald-500 px-4 py-1 rounded-full font-black border border-emerald-500/20 uppercase tracking-widest">{s.status}</span>
          </div>
        ))}
      </div>

      <div className="p-8 border border-white/5 bg-white/5 rounded-[2rem] text-center">
         <p className="text-[10px] text-slate-600 mono uppercase tracking-[0.4em]">Protocolo Elite de Neutralização de Entidades Hostis</p>
      </div>
    </div>
  );
};

export default SpiritualDefense;
