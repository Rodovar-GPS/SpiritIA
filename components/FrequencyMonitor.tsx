
import React, { useState, useEffect, useRef } from 'react';
import { ResponsiveContainer, AreaChart, Area, YAxis, XAxis, Tooltip } from 'recharts';
import { DetectionState } from '../types';

interface FrequencyMonitorProps {
  setDetectionState?: React.Dispatch<React.SetStateAction<DetectionState>>;
}

const FrequencyMonitor: React.FC<FrequencyMonitorProps> = ({ setDetectionState }) => {
  const [data, setData] = useState<{ i: number; val: number; filtered: number }[]>([]);
  const [isListening, setIsListening] = useState(false);
  const [sensitivity, setSensitivity] = useState(30);
  const [evpStatus, setEvpStatus] = useState('STANDBY');
  
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const requestRef = useRef<number>(null);

  const startAudio = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      analyserRef.current = audioContextRef.current.createAnalyser();
      const source = audioContextRef.current.createMediaStreamSource(stream);
      source.connect(analyserRef.current);
      analyserRef.current.fftSize = 128;
      setIsListening(true);
      animate();
    } catch (err) {
      console.error("Erro ao acessar microfone:", err);
    }
  };

  const animate = () => {
    if (analyserRef.current) {
      const dataArray = new Uint8Array(analyserRef.current.frequencyBinCount);
      analyserRef.current.getByteFrequencyData(dataArray);
      
      let maxVal = 0;
      let sum = 0;
      const formattedData = Array.from(dataArray).map((val, i) => {
        const normalized = (val / 255) * 100;
        if (normalized > maxVal) maxVal = normalized;
        sum += normalized;
        
        const filtered = normalized > sensitivity ? normalized : 0;
        return { i, val: normalized, filtered: filtered };
      });

      const avgAudio = sum / dataArray.length;
      
      // Injetamos métrica de áudio no estado global
      if (setDetectionState) {
        setDetectionState(prev => ({
          ...prev,
          metrics: { ...prev.metrics, audio: Math.min(100, avgAudio * 2) }
        }));
      }

      if (maxVal > sensitivity + 20) {
        setEvpStatus('POSSÍVEL EVP DETECTADO');
      } else if (maxVal > sensitivity) {
        setEvpStatus('RUÍDO FILTRADO');
      } else {
        setEvpStatus('SILÊNCIO / SCANNING');
      }
      
      setData(formattedData);
    }
    requestRef.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
      if (audioContextRef.current) audioContextRef.current.close();
      if (setDetectionState) {
        setDetectionState(prev => ({
          ...prev,
          metrics: { ...prev.metrics, audio: 0 }
        }));
      }
    };
  }, []);

  return (
    <div className="space-y-6 animate-[fadeIn_0.5s_ease-out]">
      <div className="glass p-8 rounded-[2rem] border-emerald-500/20">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h2 className="mono text-emerald-400 font-black tracking-tighter text-2xl uppercase flex items-center gap-3">
              <span className={`w-3 h-3 rounded-full ${isListening ? 'bg-red-500 animate-pulse shadow-[0_0_10px_rgba(239,68,68,0.8)]' : 'bg-slate-700'}`}></span>
              FILTRO DE RUÍDO EVP
            </h2>
            <p className="text-[10px] text-slate-500 mono uppercase tracking-widest mt-1">Módulo de Purificação Sonora Spirit IA BR</p>
          </div>
          
          <div className="flex items-center gap-4 w-full md:w-auto">
            {!isListening ? (
              <button 
                onClick={startAudio}
                className="w-full md:w-auto px-6 py-2 bg-emerald-500 text-black mono text-xs font-black rounded-xl hover:bg-emerald-400 transition-all shadow-[0_0_20px_rgba(16,185,129,0.3)]"
              >
                ATIVAR SENSORES EVP
              </button>
            ) : (
              <div className="flex flex-col w-full md:w-64 gap-2">
                <div className="flex justify-between items-end">
                  <span className="text-[9px] text-emerald-500 mono font-bold uppercase">Sensibilidade do Filtro</span>
                  <span className="text-xs text-white mono font-bold">{sensitivity}%</span>
                </div>
                <input 
                  type="range" 
                  min="0" 
                  max="100" 
                  value={sensitivity} 
                  onChange={(e) => setSensitivity(parseInt(e.target.value))}
                  className="w-full h-1 bg-emerald-950 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                />
              </div>
            )}
          </div>
        </div>

        <div className="h-72 w-full bg-black/40 rounded-3xl overflow-hidden border border-emerald-500/10 relative p-4">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data}>
              <defs>
                <linearGradient id="colorRaw" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.1}/>
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorFiltered" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.6}/>
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0.1}/>
                </linearGradient>
              </defs>
              <XAxis dataKey="i" hide />
              <YAxis hide domain={[0, 100]} />
              <Area type="monotone" dataKey="val" stroke="rgba(16, 185, 129, 0.2)" fill="url(#colorRaw)" isAnimationActive={false}/>
              <Area type="stepAfter" dataKey="filtered" stroke="#10b981" fill="url(#colorFiltered)" strokeWidth={2} isAnimationActive={false}/>
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default FrequencyMonitor;
