
import React, { useRef, useEffect, useState } from 'react';
import { DetectionState, Spirit } from '../types';

interface ScannerViewProps {
  setDetectionState: React.Dispatch<React.SetStateAction<DetectionState>>;
  onSintonize?: (spirit: Spirit) => void;
}

const ScannerView: React.FC<ScannerViewProps> = ({ setDetectionState, onSintonize }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isReady, setIsReady] = useState(false);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [metrics, setMetrics] = useState({ brightness: 0, variance: 0 });
  const [detectedSpirit, setDetectedSpirit] = useState<{name: string, freq: string} | null>(null);
  const persistenceTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const setupCamera = async () => {
    setCameraError(null);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { 
          facingMode: 'environment',
          width: { ideal: 640 },
          height: { ideal: 480 }
        },
        audio: false 
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setIsReady(true);
      }
    } catch (err: any) { 
      console.error("Erro na Câmera:", err);
      if (err.name === 'NotAllowedError' || err.name === 'PermissionDeniedError') {
        setCameraError("ACESSO NEGADO: Verifique as permissões de câmera do navegador.");
      } else if (err.name === 'NotReadableError' || err.message?.includes('could not start')) {
        setCameraError("ERRO DE HARDWARE: Outro app (ou sobreposição/balão) pode estar usando a câmera.");
      } else {
        setCameraError("FALHA CRÍTICA: Não foi possível inicializar o sensor óptico.");
      }
    }
  };

  useEffect(() => {
    setupCamera();
    return () => {
      setDetectionState(prev => ({ ...prev, isScanning: false, metrics: { ...prev.metrics, visual: 0 } }));
      if (persistenceTimer.current) clearTimeout(persistenceTimer.current);
      
      // Parar stream da câmera ao desmontar
      if (videoRef.current?.srcObject) {
        const stream = videoRef.current.srcObject as MediaStream;
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  // Motor de Identificação com Persistência de 5 Segundos
  useEffect(() => {
    if (metrics.variance > 14) {
      if (persistenceTimer.current) clearTimeout(persistenceTimer.current);
      
      const names = ["EIDOLON_PRIME", "SINAL_KAPPA", "SOMBRA_VLF", "VIBRANTE_ALPHA", "ESPECTRO_09"];
      const freqs = ["3.3Hz", "0.8Hz", "1.5Hz", "11.1Hz", "6.6Hz"];
      const idx = Math.floor(metrics.variance % names.length);
      
      setDetectedSpirit({ name: names[idx], freq: freqs[idx] });

      persistenceTimer.current = setTimeout(() => {
        setDetectedSpirit(null);
      }, 5000);
    }
  }, [metrics.variance]);

  useEffect(() => {
    if (!isReady) return;
    const interval = setInterval(() => {
      if (canvasRef.current && videoRef.current) {
        const ctx = canvasRef.current.getContext('2d', { willReadFrequently: true });
        if (ctx && videoRef.current.readyState === 4) {
          ctx.drawImage(videoRef.current, 0, 0, canvasRef.current.width, canvasRef.current.height);
          const frame = ctx.getImageData(0, 0, canvasRef.current.width, canvasRef.current.height);
          const data = frame.data;
          let bSum = 0;
          for (let i = 0; i < data.length; i += 4) bSum += (data[i] + data[i+1] + data[i+2]) / 3;
          const avgB = bSum / (data.length / 4);
          const curVar = Math.abs(avgB - metrics.brightness);
          
          setMetrics(prev => ({ brightness: avgB, variance: curVar }));
          setDetectionState(prev => ({
            ...prev,
            isScanning: true,
            metrics: { ...prev.metrics, visual: Math.min(100, curVar * 25) }
          }));

          ctx.globalCompositeOperation = 'difference';
          ctx.fillStyle = 'rgba(16, 185, 129, 0.1)';
          ctx.fillRect(0, 0, canvasRef.current.width, canvasRef.current.height);
          ctx.globalCompositeOperation = 'source-over';
        }
      }
    }, 150);
    return () => clearInterval(interval);
  }, [isReady, metrics.brightness]);

  const handleConnect = () => {
    if (onSintonize && detectedSpirit) {
      onSintonize({
        name: detectedSpirit.name,
        freq: detectedSpirit.freq,
        danger: 'MODULADA',
        location: 'Biometria Visual',
        plan: 'TRANS-DIMENSIONAL',
        desc: `Sintonização via ΔLUM Estável (Persistência 5s ativa).`
      });
    }
  };

  return (
    <div className="relative rounded-[2rem] overflow-hidden border border-emerald-500/30 bg-black aspect-[3/4] md:aspect-[16/9] shadow-2xl">
      <div className="scanline"></div>
      
      {cameraError ? (
        <div className="absolute inset-0 z-50 flex flex-col items-center justify-center p-8 bg-black/90 text-center animate-[fadeIn_0.5s_ease-out]">
           <div className="w-16 h-16 border-2 border-red-500 rounded-full flex items-center justify-center mb-6 animate-pulse">
              <span className="text-red-500 font-black text-2xl">!</span>
           </div>
           <h3 className="text-red-500 font-black uppercase text-sm mb-2">ERRO DE SENSOR ÓPTICO</h3>
           <p className="text-slate-400 mono text-[10px] mb-6 leading-relaxed max-w-xs uppercase italic">
              {cameraError}
              <br/><br/>
              DICA: Feche todos os balões, notificações flutuantes e outros apps que usem a câmera.
           </p>
           <button 
            onClick={setupCamera}
            className="bg-emerald-500 text-black px-8 py-3 rounded-xl font-black text-[10px] uppercase shadow-2xl hover:bg-emerald-400 transition-all"
           >
             REINICIAR SENSORES
           </button>
        </div>
      ) : (
        <>
          <video ref={videoRef} autoPlay playsInline muted className="absolute inset-0 w-full h-full object-cover opacity-10 grayscale" />
          <canvas ref={canvasRef} className="absolute inset-0 w-full h-full object-cover opacity-80 mix-blend-screen" width={480} height={640} />
        </>
      )}

      <div className="absolute inset-0 p-6 flex flex-col justify-between pointer-events-none">
        <div className="flex justify-between items-start">
          <div className="bg-black/80 border border-emerald-500/20 p-3 rounded-xl text-[8px] mono text-emerald-400">
            NÚCLEO_LUM: {Math.round(metrics.brightness)}<br/>
            VAR_Δ: {metrics.variance.toFixed(2)}<br/>
            RASTREAMENTO: {detectedSpirit ? 'ALVO_TRAVADO' : 'BUSCANDO...'}
          </div>
        </div>

        {detectedSpirit && (
          <div className="flex flex-col items-center gap-4 animate-[fadeIn_0.2s_ease-out]">
            <div className="bg-emerald-500 text-black px-6 py-3 rounded-2xl border-4 border-emerald-400/50 shadow-[0_0_50px_rgba(16,185,129,0.5)]">
               <p className="text-[9px] font-black uppercase tracking-widest text-center opacity-70">Alvo Identificado (Persistência 5s)</p>
               <h4 className="text-2xl font-black italic tracking-tighter text-center">{detectedSpirit.name}</h4>
               <p className="text-sm font-black text-center mt-1">SINAL: {detectedSpirit.freq}</p>
            </div>
            <button 
              onClick={handleConnect}
              className="pointer-events-auto bg-red-600 hover:bg-red-500 text-white px-8 py-3 rounded-xl font-black text-[10px] uppercase shadow-2xl transition-all"
            >
              INICIAR CHAT V.O.G.
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ScannerView;
