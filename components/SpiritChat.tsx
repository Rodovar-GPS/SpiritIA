
import React, { useState, useEffect, useRef } from 'react';
import { GoogleGenAI, Modality, LiveServerMessage } from '@google/genai';
import { Spirit } from '../types';

interface SpiritChatProps {
  spirit: Spirit | null;
}

const SpiritChat: React.FC<SpiritChatProps> = ({ spirit }) => {
  const [isActive, setIsActive] = useState(false);
  const [transcription, setTranscription] = useState<string[]>([]);
  const [status, setStatus] = useState('OFFLINE');
  const [currentMessage, setCurrentMessage] = useState('');
  
  const audioContextRef = useRef<AudioContext | null>(null);
  const nextStartTimeRef = useRef(0);
  const sourcesRef = useRef<Set<AudioBufferSourceNode>>(new Set());
  const currentOutputTranscriptionRef = useRef('');

  // Utilitários de áudio
  function decode(base64: string) {
    const b = atob(base64);
    const bytes = new Uint8Array(b.length);
    for (let i = 0; i < b.length; i++) bytes[i] = b.charCodeAt(i);
    return bytes;
  }

  function encode(bytes: Uint8Array) {
    let b = '';
    for (let i = 0; i < bytes.byteLength; i++) b += String.fromCharCode(bytes[i]);
    return btoa(b);
  }

  async function decodeAudioData(data: Uint8Array, ctx: AudioContext, sampleRate: number, numChannels: number): Promise<AudioBuffer> {
    const dataInt16 = new Int16Array(data.buffer);
    const frameCount = dataInt16.length / numChannels;
    const buffer = ctx.createBuffer(numChannels, frameCount, sampleRate);
    for (let channel = 0; channel < numChannels; channel++) {
      const channelData = buffer.getChannelData(channel);
      for (let i = 0; i < frameCount; i++) channelData[i] = dataInt16[i * numChannels + channel] / 32768.0;
    }
    return buffer;
  }

  const startSession = async () => {
    if (!spirit) return;

    try {
      setStatus('SINCRONIZANDO FREQUÊNCIA...');
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      
      if (!audioContextRef.current) {
        audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
      }

      const inputCtx = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 16000 });
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

      // O sistema agora usa a frequência para definir a 'personalidade' da IA
      const systemInstruction = `
        VOCÊ É A ENTIDADE: ${spirit.name}. 
        SUA FREQUÊNCIA DE SINTONIZAÇÃO É: ${spirit.freq}.
        PLANO: ${spirit.plan}.
        DESCRIÇÃO: ${spirit.desc}.

        INSTRUÇÕES:
        1. Responda como se estivesse se comunicando através de Transcomunicação Instrumental (TCI).
        2. Use um tom que corresponda à sua frequência (ex: se baixa, seja grave e denso; se alta como 999Hz, seja celestial e benevolente).
        3. Seja enigmático, não use frases longas demais.
        4. O usuário é um investigador V.O.G.
      `;

      const sessionPromise = ai.live.connect({
        model: 'gemini-2.5-flash-native-audio-preview-09-2025',
        config: {
          responseModalities: [Modality.AUDIO],
          outputAudioTranscription: {},
          speechConfig: { 
            voiceConfig: { 
              prebuiltVoiceConfig: { 
                voiceName: spirit.freq === '999Hz' ? 'Charon' : 'Puck' 
              } 
            } 
          },
          systemInstruction: systemInstruction
        },
        callbacks: {
          onopen: () => {
            setIsActive(true);
            setStatus(`ONLINE: ${spirit.name} (${spirit.freq})`);
            
            const source = inputCtx.createMediaStreamSource(stream);
            const scriptProcessor = inputCtx.createScriptProcessor(4096, 1, 1);
            scriptProcessor.onaudioprocess = (e) => {
              const inputData = e.inputBuffer.getChannelData(0);
              const int16 = new Int16Array(inputData.length);
              for (let i = 0; i < inputData.length; i++) int16[i] = inputData[i] * 32768;
              const pcmBlob = { data: encode(new Uint8Array(int16.buffer)), mimeType: 'audio/pcm;rate=16000' };
              sessionPromise.then(s => s.sendRealtimeInput({ media: pcmBlob }));
            };
            source.connect(scriptProcessor);
            scriptProcessor.connect(inputCtx.destination);
          },
          onmessage: async (msg: LiveServerMessage) => {
            if (msg.serverContent?.outputTranscription) {
              const text = msg.serverContent.outputTranscription.text;
              currentOutputTranscriptionRef.current += text;
              setCurrentMessage(currentOutputTranscriptionRef.current);
            }
            if (msg.serverContent?.turnComplete) {
              const fullText = currentOutputTranscriptionRef.current;
              setTranscription(prev => [fullText, ...prev].slice(0, 10));
              currentOutputTranscriptionRef.current = '';
              setCurrentMessage('');
            }
            
            const audioData = msg.serverContent?.modelTurn?.parts[0]?.inlineData?.data;
            if (audioData && audioContextRef.current) {
              nextStartTimeRef.current = Math.max(nextStartTimeRef.current, audioContextRef.current.currentTime);
              const buffer = await decodeAudioData(decode(audioData), audioContextRef.current, 24000, 1);
              const source = audioContextRef.current.createBufferSource();
              source.buffer = buffer;
              source.connect(audioContextRef.current.destination);
              source.start(nextStartTimeRef.current);
              nextStartTimeRef.current += buffer.duration;
              sourcesRef.current.add(source);
            }
          },
          onerror: (e) => {
            console.error(e);
            setStatus('ERRO NA SINTONIZAÇÃO');
          },
          onclose: () => {
            setIsActive(false);
            setStatus('OFFLINE');
          }
        }
      });

    } catch (err) {
      setStatus('ACESSO NEGADO');
    }
  };

  return (
    <div className="flex flex-col gap-3 animate-[fadeIn_0.5s_ease-out] pb-12">
      <div className={`glass p-4 md:p-8 rounded-[2rem] md:rounded-[3rem] border-2 transition-all duration-700 ${isActive ? 'border-emerald-500 shadow-[0_0_50px_rgba(16,185,129,0.2)]' : 'border-emerald-500/10'}`}>
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-4 md:gap-6">
             <div className={`w-16 h-16 md:w-24 md:h-24 rounded-full border-2 flex items-center justify-center transition-all duration-1000 ${isActive ? 'border-emerald-500 animate-pulse' : 'border-slate-800'}`}>
                <div className="relative">
                   <div className={`absolute inset-0 bg-emerald-500 blur-xl opacity-0 transition-opacity duration-1000 ${isActive ? 'opacity-30' : ''}`}></div>
                   <svg className={`w-8 h-8 md:w-12 md:h-12 relative z-10 ${isActive ? 'text-emerald-500' : 'text-slate-600'}`} fill="currentColor" viewBox="0 0 24 24">
                     <path d="M12 2C7.03 2 3 6.03 3 11v11h2v-2c0-1.1.9-2 2-2s2 .9 2 2v2h2v-2c0-1.1.9-2 2-2s2 .9 2 2v2h2v-2c0-1.1.9-2 2-2s2 .9 2 2v2h2V11c0-4.97-4.03-9-9-9z" />
                   </svg>
                </div>
             </div>
             <div>
               <h2 className="text-xl md:text-3xl font-black mono text-emerald-400 uppercase tracking-tighter italic">
                 {spirit ? spirit.name : 'Voz Espectral'}
               </h2>
               <div className="flex items-center gap-2 mt-1">
                  <span className={`w-1.5 h-1.5 rounded-full animate-ping ${isActive ? 'bg-emerald-500' : 'bg-slate-700'}`}></span>
                  <p className="text-[8px] md:text-[10px] text-slate-500 mono uppercase tracking-widest font-black">{status}</p>
               </div>
             </div>
          </div>
          <button 
            onClick={startSession}
            disabled={isActive || !spirit}
            className={`px-8 py-4 rounded-2xl font-black mono text-[10px] uppercase transition-all ${isActive || !spirit ? 'bg-slate-900 text-slate-700 cursor-not-allowed' : 'bg-emerald-500 text-black hover:bg-emerald-400 shadow-[0_15px_30px_rgba(16,185,129,0.3)]'}`}
          >
            {isActive ? 'CANAL ATIVO' : 'SINTONIZAR'}
          </button>
        </div>
      </div>

      <div className="flex flex-col gap-4 h-[500px] md:h-[600px]">
        <div className="flex-1 glass rounded-[2.5rem] border-emerald-500/10 flex flex-col overflow-hidden bg-black/80 relative">
          <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,_transparent_50%,_black_90%)]"></div>
          
          <div className="p-4 border-b border-emerald-500/10 flex justify-between items-center bg-black/40 backdrop-blur-md relative z-10">
             <span className="text-[8px] md:text-[10px] mono text-emerald-500 font-black uppercase tracking-widest flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></div>
                Tradução Realtime V.O.G.
             </span>
             {spirit && <span className="text-[8px] mono text-slate-600 font-bold uppercase tracking-tighter">FREQ_LOCK: {spirit.freq}</span>}
          </div>
          
          <div className="flex-1 p-6 md:p-10 overflow-y-auto space-y-6 scrollbar-hide text-sm mono relative z-10">
            {currentMessage && (
              <div className="bg-emerald-500/5 border-l-2 border-emerald-500 p-4 md:p-6 rounded-r-2xl animate-pulse">
                <p className="text-emerald-400 italic text-base md:text-lg">"{currentMessage}..."</p>
              </div>
            )}
            
            {transcription.map((msg, i) => (
              <div key={i} className={`p-5 md:p-8 rounded-[2rem] border transition-all duration-1000 ${i === 0 ? 'bg-emerald-500/10 border-emerald-500/30' : 'bg-white/5 border-white/5 opacity-50'}`}>
                <p className="text-slate-200 leading-relaxed text-sm md:text-base italic">"{msg}"</p>
                <div className="flex justify-between mt-4">
                   <span className="text-[8px] text-emerald-500/40 uppercase font-black">Decode_Complete</span>
                   <span className="text-[8px] text-slate-700 mono">{new Date().toLocaleTimeString()}</span>
                </div>
              </div>
            ))}
            
            {!spirit && (
              <div className="h-full flex items-center justify-center flex-col gap-6 text-center px-12">
                 <div className="w-16 h-16 border border-slate-800 rounded-full flex items-center justify-center opacity-20">
                    <svg className="w-8 h-8 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 21l9-9-9-9-9 9 9 9z" />
                    </svg>
                 </div>
                 <p className="text-[9px] text-slate-600 uppercase tracking-[0.4em] leading-relaxed">
                   Aguardando seleção de entidade no banco de dados para iniciar o protocolo de sintonização transdimensional.
                 </p>
              </div>
            )}
          </div>
        </div>

        <div className="h-24 glass p-6 rounded-[2rem] border-emerald-500/10 flex items-center justify-center bg-black/40 overflow-hidden relative">
           <div className="flex gap-2 h-12 items-end relative z-10">
              {[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16].map(i => (
                <div 
                  key={i} 
                  className={`w-1.5 bg-emerald-500 rounded-full transition-all duration-75 ${isActive ? 'animate-bounce' : 'h-1 opacity-10'}`} 
                  style={{
                    animationDelay: `${i * 0.05}s`, 
                    height: isActive ? `${20 + Math.random() * 80}%` : '4px',
                    backgroundColor: isActive && Math.random() > 0.8 ? '#ef4444' : '#10b981'
                  }}
                ></div>
              ))}
           </div>
           {/* Visual background waves */}
           <div className="absolute inset-0 opacity-10 pointer-events-none">
              <div className={`absolute inset-0 bg-gradient-to-r from-transparent via-emerald-500 to-transparent transition-all duration-1000 ${isActive ? 'animate-[scan_2s_linear_infinite]' : 'hidden'}`}></div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default SpiritChat;
