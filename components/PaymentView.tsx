
import React, { useState } from 'react';
import { UserProfile } from '../types';

interface PaymentViewProps {
  user: UserProfile;
  onConfirm: () => void;
}

const PaymentView: React.FC<PaymentViewProps> = ({ user, onConfirm }) => {
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const pixKey = "71982319773";
  const beneficiary = "Jairo bahia dos santos e Santos";

  const getPrice = () => {
    switch(user.plan) {
      case 'INICIADO': return '29.90';
      case 'INVESTIGADOR': return '89.90';
      case 'ARQUIVISTA': return '249.00';
      default: return '0.00';
    }
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(pixKey);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  const handleConfirmClick = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onConfirm();
    }, 4000);
  };

  return (
    <div className="max-w-2xl mx-auto animate-[fadeIn_0.5s_ease-out]">
      <div className="glass p-10 rounded-[2.5rem] border-emerald-500/40 text-center space-y-8 relative overflow-hidden shadow-[0_0_80px_rgba(16,185,129,0.15)]">
        <div className="absolute top-0 left-0 w-full h-1 bg-emerald-500 animate-[scan_2s_linear_infinite]"></div>

        <div className="space-y-2">
          <h2 className="text-4xl font-black mono text-emerald-400 uppercase tracking-tighter">PAGAMENTO PIX</h2>
          <p className="text-xs text-slate-400 mono uppercase tracking-widest">Sincronização imediata via SPIRIT IA BR</p>
        </div>

        <div className="bg-white p-6 rounded-[2rem] shadow-[0_0_40px_rgba(255,255,255,0.1)] inline-block">
          {/* QR Code gerado de forma simples para evitar erros de leitura */}
          <img 
            src={`https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent(pixKey)}`} 
            alt="PIX QR Code" 
            className="w-56 h-56 mx-auto"
          />
          <div className="mt-4 pt-4 border-t border-slate-100">
             <p className="text-black font-black mono text-sm">R$ {getPrice()}</p>
          </div>
        </div>

        <div className="space-y-6 text-left max-w-sm mx-auto">
          <div className="p-5 bg-black/60 border border-emerald-500/20 rounded-2xl space-y-3">
            <div>
              <label className="text-[9px] text-slate-500 mono uppercase font-bold">Chave PIX (Celular)</label>
              <div className="flex gap-2 mt-1">
                <div className="bg-emerald-950/40 border border-emerald-500/30 p-3 rounded-xl flex-1 text-emerald-400 mono font-black text-center text-lg">
                  {pixKey}
                </div>
                <button 
                  onClick={handleCopy}
                  className="bg-emerald-500 text-black px-4 rounded-xl hover:bg-emerald-400 transition-all flex items-center justify-center shadow-lg"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                  </svg>
                </button>
              </div>
              {copied && <p className="text-[10px] text-emerald-400 mono text-center mt-2 font-bold animate-pulse">✓ CHAVE COPIADA!</p>}
            </div>

            <div>
              <label className="text-[9px] text-slate-500 mono uppercase font-bold">Beneficiário</label>
              <p className="text-sm mono text-white font-bold">{beneficiary}</p>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-red-950/20 border border-red-500/20 p-5 rounded-2xl text-left">
            <h4 className="text-[10px] text-red-400 mono font-bold uppercase mb-2 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-ping"></span>
              Atenção Investigador
            </h4>
            <p className="text-[9px] text-slate-400 mono leading-relaxed">
              O sistema monitora a rede bancária em tempo real. Assim que o pagamento for detectado para <strong>Jairo Bahia</strong>, seu acesso de nível <strong>{user.plan}</strong> será ativado em todos os seus dispositivos.
            </p>
          </div>

          <div className="space-y-4">
            {loading ? (
              <div className="flex flex-col items-center gap-4 py-4">
                <div className="w-12 h-12 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
                <p className="mono text-[10px] text-emerald-400 font-bold uppercase tracking-[0.3em] animate-pulse">Sincronizando com Banco de Dados...</p>
              </div>
            ) : (
              <button 
                onClick={handleConfirmClick}
                className="w-full bg-emerald-500 text-black py-6 rounded-[1.5rem] font-black mono uppercase tracking-widest hover:bg-emerald-400 transition-all shadow-[0_15px_40px_rgba(16,185,129,0.3)] text-xl"
              >
                VERIFICAR PAGAMENTO
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentView;
