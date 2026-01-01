
import React, { useState } from 'react';

const SpiritualDefense: React.FC = () => {
  const [activeTab, setActiveTab] = useState('CRISTIANISMO');

  const protocols = {
    CRISTIANISMO: {
      title: "PROTOCOLOS DE LUZ CRISTÃ",
      description: "A força dominante baseada na autoridade suprema de Jesus Cristo. Foco em expulsão imediata de trevas.",
      methods: [
        { name: "O Nome de Jesus", type: "Oração/Ação", content: "Invocar o nome de Jesus Cristo em voz alta é a frequência de choque imediata. Declare: 'Pelo sangue de Jesus Cristo, eu ordeno que todo mal saia deste recinto!'", icon: "✞" },
        { name: "Armadura de Deus", type: "Visualização", content: "Mentalize cada peça: Capacete da Salvação, Couraça da Justiça, Cinto da Verdade, Escudo da Fé e Espada do Espírito.", icon: "🛡" },
        { name: "Salmo 91", type: "Frequência", content: "A leitura em voz alta deste salmo cria um campo de força de 444Hz a 999Hz, impenetrável por entidades de baixa vibração.", icon: "📖" }
      ],
      recommendation: "Mantenha a fé inabalável. O medo é o alimento do inimigo. Em Jesus, a vitória é absoluta."
    },
    UMBANDA_QUIMBANDA: {
      title: "CAMINHOS DOS GUARDIÕES",
      description: "Trabalho com as forças da natureza e a proteção dos Exus e Pombagiras de Lei.",
      methods: [
        { name: "Banho de Descarga", type: "Físico", content: "Uso de ervas quentes (arruda, guiné, espada de São Jorge). A química das plantas transmuta a energia negativa em neutra.", icon: "🌿" },
        { name: "Defumação", type: "Ar", content: "Queima de ervas secas ou incensos de limpeza. O elemento fogo e ar purificam o ambiente dos miasmas astrais.", icon: "💨" },
        { name: "Invocação de Guardiões", type: "Espiritual", content: "Chamar pelo Exu de Guarda. Eles atuam como a polícia do plano astral, bloqueando ataques de obsessores.", icon: "🗝" }
      ],
      recommendation: "Mantenha seu 'fio de contas' e firmezas em dia. A disciplina gera o escudo."
    },
    CANDOMBLÉ: {
      title: "FORÇA DOS ORIXÁS",
      description: "Proteção baseada na ancestralidade africana e no equilíbrio dos elementos vitais (Axé).",
      methods: [
        { name: "Proteção do Ori", type: "Cerebral", content: "Uso de 'Ojá' (pano de cabeça) ou rituais de alimentação da cabeça para fortalecer o escudo mental.", icon: "👳" },
        { name: "Banhos de Folhas (Ewé)", type: "Ritual", content: "Cada Orixá possui ervas específicas que realinham o Axé do indivíduo, repelindo o 'Egum' (espírito errante).", icon: "🍃" },
        { name: "Uso de Contra-Egum", type: "Amuleto", content: "Pulseira de palha da costa consagrada que impede a aproximação de espíritos sofredores.", icon: "⭕" }
      ],
      recommendation: "Respeite os preceitos. O Axé é uma bateria que precisa ser carregada."
    },
    XENOBIOLOGIA: {
      title: "BLINDAGEM CONTRA EXTRATERRESTRES",
      description: "Técnicas para evitar abduções, implantes etéreos e controle mental alienígena.",
      methods: [
        { name: "Barreira de Chumbo Mental", type: "Psíquico", content: "Técnica de fechar os chakras superiores através da vontade, impedindo o 'link' telepático.", icon: "🛸" },
        { name: "Aterramento (Earthing)", type: "Físico", content: "Andar descalço na terra para descarregar frequências magnéticas de naves ou dispositivos de rastreio.", icon: "🌍" },
        { name: "Desligamento de Ondas", type: "Tech", content: "Evitar aparelhos eletrônicos durante janelas de pico de avistamento (3h às 4h da manhã).", icon: "📵" }
      ],
      recommendation: "Eles temem a consciência livre. Não ceda ao fascínio tecnológico."
    }
  };

  return (
    <div className="space-y-8 animate-[fadeIn_0.5s_ease-out] pb-20">
      {/* Banner Supremo */}
      <div className="bg-emerald-500/20 border-2 border-emerald-500 p-8 rounded-[3rem] text-center shadow-[0_0_50px_rgba(16,185,129,0.2)]">
        <h2 className="text-4xl font-black mono text-emerald-400 tracking-tighter uppercase italic">Autoridade Suprema</h2>
        <p className="text-white text-xl font-bold mono mt-2">JESUS CRISTO: A LUZ QUE DISSIPA TODA TREVA</p>
        <p className="text-[10px] text-emerald-500/60 mono mt-1 uppercase tracking-widest">Reconhecido pelo Spirit IA BR como a Frequência de Vitória Absoluta (999Hz+)</p>
      </div>

      <div className="flex flex-wrap gap-4 justify-center">
        {Object.keys(protocols).map((key) => (
          <button
            key={key}
            onClick={() => setActiveTab(key)}
            className={`px-6 py-3 rounded-2xl font-black mono text-[10px] transition-all border ${
              activeTab === key 
                ? 'bg-emerald-500 text-black border-emerald-500 shadow-[0_0_20px_rgba(16,185,129,0.3)]' 
                : 'bg-black/40 text-slate-500 border-emerald-900/30 hover:border-emerald-500/50'
            }`}
          >
            {key}
          </button>
        ))}
      </div>

      <div className="glass p-10 rounded-[3rem] border-emerald-500/20">
        <div className="mb-10 text-center">
          <h3 className="text-3xl font-black text-white uppercase tracking-tighter">{protocols[activeTab as keyof typeof protocols].title}</h3>
          <p className="text-slate-400 mono text-xs mt-2 italic">{protocols[activeTab as keyof typeof protocols].description}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {protocols[activeTab as keyof typeof protocols].methods.map((method, i) => (
            <div key={i} className="bg-black/60 border border-emerald-500/10 p-6 rounded-3xl hover:border-emerald-500/40 transition-all group">
              <div className="text-4xl mb-4 group-hover:scale-125 transition-transform duration-500">{method.icon}</div>
              <div className="mb-4">
                <span className="text-[8px] bg-emerald-500/20 text-emerald-500 px-2 py-0.5 rounded mono font-black uppercase">{method.type}</span>
                <h4 className="text-lg font-bold text-white mt-2 mono">{method.name}</h4>
              </div>
              <p className="text-xs text-slate-400 mono leading-relaxed">{method.content}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 p-6 bg-emerald-950/20 border border-emerald-500/20 rounded-2xl">
          <h4 className="text-[10px] text-emerald-500 mono font-black uppercase mb-2">Recomendação Final:</h4>
          <p className="text-sm text-emerald-100 italic">"{protocols[activeTab as keyof typeof protocols].recommendation}"</p>
        </div>
      </div>

      <div className="text-center">
        <p className="text-[9px] text-slate-600 mono uppercase tracking-[0.5em]">Spirit IA BR - Versão Oficial Gratuita - Proteção em Tempo Real</p>
      </div>
    </div>
  );
};

export default SpiritualDefense;
