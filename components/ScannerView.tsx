
import React, { useRef, useEffect, useState } from 'react';
import { DetectionState } from '../types';

interface ScannerViewProps {
  setDetectionState: React.Dispatch<React.SetStateAction<DetectionState>>;
}

const ScannerView: React.FC<ScannerViewProps> = ({ setDetectionState }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isReady, setIsReady] = useState(false);
  const [metrics, setMetrics] = useState({ brightness: 0, variance: 0 });
  const [lastAnomaly, setLastAnomaly] = useState<string | null>(null);

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

          // Injetamos a métrica visual no estado global para o ECTO-LEVEL
          const visualIntensity = Math.min(100, currentVariance * 20);
          
          setDetectionState(prev => ({
            ...prev,
            isScanning: true,
            metrics: { ...prev.metrics, visual: visualIntensity }
          }));

          if (currentVariance > 15) {
             setLastAnomaly(`ANOMALIA_VISUAL: ${Math.round(currentVariance)}%`);
             if ('vibrate' in navigator) navigator.vibrate([100, 50, 100]);
          }

          ctx.globalCompositeOperation = 'difference';
          ctx.fillStyle = 'rgba(16, 185, 129, 0.05)';
          ctx.fillRect(0, 0, canvasRef.current.width, canvasRef.current.height);
          ctx.globalCompositeOperation = 'source-over';
        }
      }
    }, 150);

    return () => clearInterval(interval);
  }, [isReady, metrics.brightness, setDetectionState]);

  return (
    <div className="relative rounded-[2rem] overflow-hidden border border-emerald-500/30 bg-black aspect-[3/4] md:aspect-[21/9] animate-[fadeIn_0.5s_ease-out]">
      <div className="scanline"></div>
      
      {!isReady && (
        <div className="absolute inset-0 flex items-center justify-center bg-slate-900/80 z-20">
          <div className="text-center">
            <div className="w-8 h-8 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="mono text-[10px] text-emerald-500 uppercase">Sincronizando Sensor Visual...</p>
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

      <div className="absolute inset-0 pointer-events-none p-4 flex flex-col justify-between">
        <div className="flex justify-between items-start">
          <div className="mono text-emerald-400 text-[8px] bg-black/60 p-2 border border-emerald-500/20 backdrop-blur-md">
            ISO: {Math.round(metrics.brightness)} LUX<br/>
            ΔLUM: {metrics.variance.toFixed(2)}
          </div>
          <div className="mono text-red-500 text-[8px] text-right bg-black/60 p-2 border border-red-500/20">
            RAD_VIS: {(metrics.variance * 0.45).toFixed(2)} eV
          </div>
        </div>

        <div className="flex flex-col items-center">
           <div className={`w-12 h-12 border border-emerald-500/30 rounded-full flex items-center justify-center animate-pulse`}>
              <div className={`w-1 h-1 rounded-full ${metrics.variance > 10 ? 'bg-red-500 scale-150' : 'bg-emerald-500'}`}></div>
           </div>
        </div>

        <div className="space-y-2">
          {lastAnomaly && (
            <div className="bg-red-500/90 text-white mono text-[8px] px-2 py-0.5 font-bold animate-bounce inline-block">
              {lastAnomaly}
            </div>
          )}
          <div className="flex gap-2">
             <div className="flex-1 bg-emerald-950/60 p-2 border border-emerald-500/20 text-[8px] mono text-emerald-400 uppercase">
                Status: {metrics.variance > 5 ? 'Atividade Detectada' : 'Varredura Limpa'}
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScannerView;
