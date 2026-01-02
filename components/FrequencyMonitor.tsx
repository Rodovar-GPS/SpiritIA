
import React, { useState, useEffect, useRef } from 'react';
import { ResponsiveContainer, AreaChart, Area, YAxis, XAxis } from 'recharts';
import { DetectionState } from '../types';

interface FrequencyMonitorProps {
  setDetectionState?: React.Dispatch<React.SetStateAction<DetectionState>>;
}

const FrequencyMonitor: React.FC<FrequencyMonitorProps> = ({ setDetectionState }) => {
  const [data, setData] = useState<{ i: number; val: number }[]>([]);
  const [isListening, setIsListening] = useState(false);
  const [transcriptions, setTranscriptions] = useState<string[]>([]);
  
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const requestRef = useRef<number>(null);

  const words = ["MENSAGEM...", "ESTOU...", "AQUI...", "SOCORRO...", "CUIDADO...", "LUZ...", "PORTAL...", "VIGIE..."];

  const startAudio = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 16000 });
      analyserRef.current = audioContextRef.current.createAnalyser();
      const source = audioContextRef.current.createMediaStreamSource(stream);
      source.connect(analyserRef.current);
      analyserRef.current.fftSize = 64;
      setIsListening(true);
      animate();
    } catch (err) { console.error(err); }
  };

  const animate = () => {
    if (analyserRef.current) {
      const dataArray = new Uint8Array(analyserRef.current.frequencyBinCount);
      analyserRef.current.getByteFrequencyData(dataArray);
      
      let sum = 0;
      const formatted = Array.from(dataArray).map((val, i) => {
        const norm = (val / 255) * 100;
        sum += norm;
        return { i, val: norm };
      });
      
      const avg = sum / dataArray.length;
      if (avg > 45 && Math.random() > 0.98) {
        const word = words[Math.floor(Math.random() * words.length)];
        setTranscriptions(prev => [word, ...prev].slice(0, 5));
      }

      if (setDetectionState) {
        setDetectionState(prev => ({ ...prev, metrics: { ...prev.metrics, audio: Math.min(100, avg * 2) } }));
      }
      setData(formatted);
    }
    requestRef.current = requestAnimationFrame(animate);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-[fadeIn_0.5s_ease-out]">
      <div className="glass p-6 rounded-[2rem] border-emerald-500/20">
        <h2 className="text-emerald-500 font-black text-xl mb-6 flex items-center gap-2">
          <div className={`w-3 h-3 rounded-full ${isListening ? 'bg-red-500 animate-pulse' : 'bg-slate-800'}`}></div>
          ESPECTRÔMETRO RMS
        </h2>
        
        {!isListening ? (
          <button onClick={startAudio} className="w-full py-8 bg-emerald-500 text-black font-black rounded-3xl uppercase">ATIVAR CAPTAÇÃO VLF</button>
        ) : (
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="c" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <Area type="monotone" dataKey="val" stroke="#10b981" fill="url(#c)" isAnimationActive={false} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>

      <div className="glass p-6 rounded-[2rem] border-emerald-500/20 flex flex-col">
        <h2 className="text-emerald-500 font-black text-xl mb-6 uppercase tracking-widest">Transcrição EVP Live</h2>
        <div className="flex-1 bg-black/40 rounded-2xl p-6 space-y-4 overflow-hidden relative">
          <div className="absolute inset-0 pointer-events-none border border-emerald-500/5 rounded-2xl"></div>
          {transcriptions.map((t, i) => (
            <div key={i} className={`p-3 border-l-2 border-emerald-500 bg-emerald-500/5 animate-[fadeIn_0.3s_ease-out] ${i === 0 ? 'scale-105 opacity-100 font-black' : 'opacity-40 text-xs'}`}>
               <span className="text-[10px] text-emerald-500/40 uppercase block mb-1">Decodificado_RMS_{i}</span>
               <p className="text-emerald-400 italic">"{t}"</p>
            </div>
          ))}
          {transcriptions.length === 0 && (
            <p className="text-[10px] text-slate-600 text-center mt-20 uppercase tracking-[0.3em]">Aguardando oscilações harmônicas...</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default FrequencyMonitor;
