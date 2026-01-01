
import React from 'react';
import { PlanType, UserProfile } from '../types';

interface PremiumAccessProps {
  onSelectPlan: (plan: PlanType) => void;
  user: UserProfile | null;
}

const PremiumAccess: React.FC<PremiumAccessProps> = ({ onSelectPlan, user }) => {
  const plans = [
    {
      id: 'INICIADO' as PlanType,
      name: "INICIADO",
      price: "R$ 29,90",
      period: "mensal",
      color: "emerald",
      features: [
        "Acesso ao Banco de Dados de Espíritos Comuns",
        "Filtro de Ruído para EVP",
        "Histórico de Varredura de 7 dias",
        "Identificação de Humanoides Básicos"
      ]
    },
    {
      id: 'INVESTIGADOR' as PlanType,
      name: "INVESTIGADOR",
      price: "R$ 89,90",
      period: "trimestral",
      color: "blue",
      popular: true,
      features: [
        "Tudo do plano Iniciado",
        "Detector de Assinaturas Vampíricas (Sanguis)",
        "Mapeamento de Linhagem Nephilin (Nível 1)",
        "Localização de Portais de Baixa Energia",
        "Exportação de Relatórios Técnicos (PDF/CSV)"
      ]
    },
    {
      id: 'ARQUIVISTA' as PlanType,
      name: "ARQUIVISTA ANTIGO",
      price: "R$ 249,00",
      period: "semestral",
      color: "amber",
      features: [
        "Acesso Total aos Arquivos Proibidos",
        "Rastreador de Linhagem Real (Descendentes de Jesus)",
        "Identificador de Entidades Celestiais (Arcanjos)",
        "Decifrador de Linguagens Mortas em tempo real",
        "Suporte Prioritário 24/7 via Linha Segura"
      ]
    }
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-12 animate-[fadeIn_0.5s_ease-out]">
      <div className="text-center space-y-4">
        <h2 className="text-4xl font-bold tracking-tighter uppercase mono text-emerald-400">
          Eleve sua Investigação ao <span className="text-white">Nível Profissional</span>
        </h2>
        <p className="text-slate-400 max-w-2xl mx-auto mono text-sm">
          A verdade está escondida nas frequências que os olhos comuns não veem. 
          Nossos planos premium utilizam algoritmos de processamento quântico para decifrar a ancestralidade oculta da humanidade.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {plans.map((plan, i) => (
          <div 
            key={i} 
            className={`glass p-8 rounded-3xl border-${plan.color}-500/20 relative flex flex-col h-full transform transition-transform hover:scale-[1.02] ${plan.popular ? 'border-2 border-emerald-500/40 ring-4 ring-emerald-500/5' : ''}`}
          >
            {plan.popular && (
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-emerald-500 text-black px-4 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase mono">
                MAIS UTILIZADO
              </div>
            )}
            
            <div className="mb-8">
              <p className={`text-xs font-bold mono text-${plan.color}-400 mb-2 uppercase tracking-widest`}>{plan.name}</p>
              <div className="flex items-baseline gap-1">
                <span className="text-4xl font-bold tracking-tighter">{plan.price}</span>
                <span className="text-slate-500 text-xs mono">/{plan.period}</span>
              </div>
            </div>

            <ul className="space-y-4 mb-8 flex-1">
              {plan.features.map((feature, j) => (
                <li key={j} className="flex gap-3 text-xs mono text-slate-300">
                  <svg className={`w-4 h-4 text-${plan.color}-500 shrink-0`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  {feature}
                </li>
              ))}
            </ul>

            <button 
              onClick={() => onSelectPlan(plan.id)}
              className={`w-full py-3 rounded-xl font-bold mono text-sm transition-all ${
                plan.id === 'ARQUIVISTA' 
                  ? 'bg-amber-500 text-black hover:bg-amber-400 shadow-[0_0_15px_rgba(245,158,11,0.3)]' 
                  : plan.popular 
                    ? 'bg-emerald-500 text-black hover:bg-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.3)]'
                    : 'bg-white/5 text-emerald-400 border border-emerald-500/30 hover:bg-white/10'
              }`}
            >
              ADQUIRIR AGORA
            </button>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
        <div className="glass p-8 rounded-3xl border-emerald-500/10">
          <h3 className="text-lg font-bold mono text-emerald-400 mb-4 uppercase">Por que assinar?</h3>
          <div className="space-y-4 text-xs text-slate-400 mono leading-relaxed">
            <p>
              <strong className="text-white uppercase">Dados Reais, Não Simulação:</strong> Nossos filtros premium acessam camadas de processamento de hardware que capturam flutuações eletromagnéticas e sonoras além do espectro convencional.
            </p>
            <p>
              <strong className="text-white uppercase">Identificação de Linhagem:</strong> Através da análise de harmônicos vocais e padrões de irradiação térmica, conseguimos cruzar dados com registros antigos para identificar se um sujeito possui marcadores genéticos de Nephilins ou Linhagens Celestiais.
            </p>
          </div>
        </div>

        <div className="glass p-8 rounded-3xl border-red-500/10">
          <h3 className="text-lg font-bold mono text-red-400 mb-4 uppercase">Aviso de Segurança</h3>
          <p className="text-xs text-slate-400 mono leading-relaxed">
            O acesso aos <strong className="text-white">Arquivos Antigos</strong> pode revelar informações perturbadoras sobre a natureza da realidade e de pessoas próximas a você. Recomendamos discrição absoluta ao realizar varreduras de linhagem.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PremiumAccess;
