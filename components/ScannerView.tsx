
import React, { useRef, useEffect, useState, useMemo } from 'react';
import { DetectionState, Spirit } from '../types';

interface ScannerViewProps {
  setDetectionState: React.Dispatch<React.SetStateAction<DetectionState>>;
  onSintonize?: (spirit: Spirit) => void;
}

const ScannerView: React.FC<ScannerViewProps> = ({ setDetectionState, onSintonize }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isReady, setIsReady] = useState(false);
  const [metrics, setMetrics] = useState({ brightness: 0, variance: 0 });
  const [detectedSpirit, setDetectedSpirit] = useState<{name: string, freq: string} | null>(null);

  useEffect(() => {
    async function setupCamera() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ 
          video: { facingMode: 'environment' },
          audio: false 
        });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          setIsReady(true);
        }
      } catch (err) {
        console.error("Acesso à câmera negado", err);
      }
    }
    setupCamera();
    
    return () => {
      setDetectionState(prev => ({ 
        ...prev, 
        isScanning: false, 
        metrics: { ...prev.metrics, visual: 0 } 
      }));
    };
  }, []);

  // Motor de Identificação Espectral
  useEffect(() => {
    if (metrics.variance > 12) {
      const names = ["VULTO_ERRANTE", "OBSESSOR_L3", "POLTERGEIST_ACT", "ENTIDADE_Z", "MENSAGEIRO"];
      const freqs = ["12.5Hz", "4.4Hz", "7.8Hz", "528Hz", "1.2Hz"];
      const idx = Math.floor(metrics.variance % names.length);
      
      setDetectedSpirit({
        name: names[idx],
        freq: freqs[idx]
      });
    } else {
      setDetectedSpirit(null);
    }
  }, [metrics.variance]);

  useEffect(() => {
    if (!isReady) return;

    const interval = setInterval(() => {
      if (canvasRef.current && videoRef.current) {
        const ctx = canvasRef.current.getContext('2d', { willReadFrequently: true });
        if (ctx) {
          ctx.drawImage(videoRef.current, 0, 0, canvasRef.current.width, canvasRef.current.height);
          
          const frame = ctx.getImageData(0, 0, canvasRef.current.width, canvasRef.current.height);
          const data = frame.data;
          let brightnessSum = 0;
          for (let i = 0; i < data.length; i += 4) {
            brightnessSum += (data[i] + data[i+1] + data[i+2]) / 3;
          }
          const avgBrightness = brightnessSum / (data.length / 4);
          const currentVariance = Math.abs(avgBrightness - metrics.brightness);
          
          setMetrics(prev => ({
            brightness: avgBrightness,
            variance: currentVariance
          }));

          const visualIntensity = Math.min(100, currentVariance * 20);
          
          setDetectionState(prev => ({
            ...prev,
            isScanning: true,
            metrics: { ...prev.metrics, visual: visualIntensity }
          }));

          if (currentVariance > 20 && 'vibrate' in navigator) {
             navigator.vibrate([200, 100, 200]);
          }

          ctx.globalCompositeOperation = 'difference';
          ctx.fillStyle = 'rgba(16, 185, 129, 0.08)';
          ctx.fillRect(0, 0, canvasRef.current.width, canvasRef.current.height);
          ctx.globalCompositeOperation = 'source-over';
        }
      }
    }, 150);

    return () => clearInterval(interval);
  }, [isReady, metrics.brightness, setDetectionState]);

  const handleConnect = () => {
    if (onSintonize && detectedSpirit) {
      onSintonize({
        name: detectedSpirit.name,
        freq: detectedSpirit.freq,
        danger: metrics.variance > 15 ? 'ALTA' : 'MODERADA',
        location: 'Ambiente do Scan',
        plan: 'ESPECTRAL',
        desc: `Entidade sintonizada via detecção direta de variância luminosa (ΔLUM: ${metrics.variance.toFixed(2)}).`
      });
    }
  };

  return (
    <div className="relative rounded-[2rem] overflow-hidden border border-emerald-500/30 bg-black aspect-[3/4] md:aspect-[21/9] animate-[fadeIn_0.5s_ease-out] shadow-2xl">
      <div className="scanline"></div>
      
      {!isReady && (
        <div className="absolute inset-0 flex items-center justify-center bg-slate-900/80 z-20">
          <div className="text-center">
            <div className="w-8 h-8 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="mono text-[10px] text-emerald-500 uppercase font-black">Sincronizando Sensor Visual...</p>
          </div>
        </div>
      )}

      <video 
        ref={videoRef} 
        autoPlay 
        playsInline 
        muted 
        className="absolute inset-0 w-full h-full object-cover opacity-10 grayscale"
      />
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 w-full h-full object-cover opacity-80 mix-blend-screen"
        width={320}
        height={420}
      />

      {/* HUD OVERLAY */}
      <div className="absolute inset-0 pointer-events-none p-4 flex flex-col justify-between z-30">
        <div className="flex justify-between items-start">
          <div className="mono text-emerald-400 text-[8px] bg-black/80 p-3 border border-emerald-500/20 backdrop-blur-md rounded-lg">
            SINAL_RMS: {Math.round(metrics.brightness)} LUX<br/>
            ΔLUM: {metrics.variance.toFixed(2)}<br/>
            STATUS: {metrics.variance > 5 ? 'CAPTANDO' : 'VARREDURA'}
          </div>
          <div className="mono text-red-500 text-[8px] text-right bg-black/80 p-3 border border-red-500/20 rounded-lg">
            DETECT_VOG: {(metrics.variance * 1.5).toFixed(1)}%<br/>
            MODO: INFRARED_SIM
          </div>
        </div>

        {detectedSpirit && (
          <div className="flex flex-col items-center gap-4 animate-pulse">
             <div className="bg-red-600/90 text-white px-6 py-2 rounded-full border-2 border-white/20 shadow-2xl">
                <p className="mono text-[10px] font-black uppercase tracking-tighter">ANOMALIA IDENTIFICADA!</p>
                <h4 className="text-xl font-black italic tracking-tighter leading-none">{detectedSpirit.name}</h4>
                <p className="text-[12px] mono font-bold text-center mt-1">FREQ: {detectedSpirit.freq}</p>
             </div>
             
             <button 
                onClick={handleConnect}
                className="pointer-events-auto bg-emerald-500 hover:bg-emerald-400 text-black px-6 py-3 rounded-2xl font-black mono text-[10px] uppercase shadow-[0_0_40px_rgba(16,185,129,0.5)] transition-all active:scale-95"
             >
                CONECTAR AO CHAT AGORA
             </button>
          </div>
        )}

        <div className="flex justify-center mb-2">
           <div className="flex gap-1 h-8 items-end opacity-40">
              {[...Array(20)].map((_, i) => (
                <div key={i} className="w-1 bg-emerald-500" style={{height: `${Math.random() * metrics.variance * 5}%`}}></div>
              ))}
           </div>
        </div>
      </div>
    </div>
  );
};

export default ScannerView;
