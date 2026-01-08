import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mic, MicOff, Volume2, ShieldCheck, Loader2, Sparkles } from 'lucide-react';
import { GeminiInfrastructure } from '../../services/geminiService';

export const StrategyHub: React.FC = () => {
  const [isActive, setIsActive] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const sessionPromiseRef = useRef<Promise<any> | null>(null);
  const sessionRef = useRef<any>(null);
  const outputAudioContextRef = useRef<AudioContext | null>(null);
  const nextStartTimeRef = useRef<number>(0);
  const sourcesRef = useRef<Set<AudioBufferSourceNode>>(new Set());

  // Helper functions as per SDK guidelines
  const encode = (bytes: Uint8Array) => {
    let binary = '';
    const len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return btoa(binary);
  };

  const decodeAudioData = async (
    data: Uint8Array,
    ctx: AudioContext,
    sampleRate: number,
    numChannels: number,
  ): Promise<AudioBuffer> => {
    const dataInt16 = new Int16Array(data.buffer);
    const frameCount = dataInt16.length / numChannels;
    const buffer = ctx.createBuffer(numChannels, frameCount, sampleRate);

    for (let channel = 0; channel < numChannels; channel++) {
      const channelData = buffer.getChannelData(channel);
      for (let i = 0; i < frameCount; i++) {
        channelData[i] = dataInt16[i * numChannels + channel] / 32768.0;
      }
    }
    return buffer;
  };

  const startSession = async () => {
    setIsConnecting(true);
    try {
      const inputCtx = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 16000 });
      const outputCtx = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
      outputAudioContextRef.current = outputCtx;
      nextStartTimeRef.current = 0;
      
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      
      sessionPromiseRef.current = GeminiInfrastructure.connectLive({
        onopen: () => {
          const source = inputCtx.createMediaStreamSource(stream);
          const scriptProcessor = inputCtx.createScriptProcessor(4096, 1, 1);
          scriptProcessor.onaudioprocess = (audioProcessingEvent) => {
            const inputData = audioProcessingEvent.inputBuffer.getChannelData(0);
            const l = inputData.length;
            const int16 = new Int16Array(l);
            for (let i = 0; i < l; i++) {
              int16[i] = inputData[i] * 32768;
            }
            // Send PCM blob
            sessionPromiseRef.current?.then((session) => {
              session.sendRealtimeInput({ 
                media: { data: encode(new Uint8Array(int16.buffer)), mimeType: 'audio/pcm;rate=16000' } 
              });
            });
          };
          source.connect(scriptProcessor);
          scriptProcessor.connect(inputCtx.destination);
          setIsActive(true);
          setIsConnecting(false);
        },
        onmessage: async (message: any) => {
          // Handle interruptions
          const interrupted = message.serverContent?.interrupted;
          if (interrupted) {
            for (const source of sourcesRef.current.values()) {
              source.stop();
              sourcesRef.current.delete(source);
            }
            nextStartTimeRef.current = 0;
          }

          // Process audio content
          const base64EncodedAudioString = message.serverContent?.modelTurn?.parts[0]?.inlineData?.data;
          if (base64EncodedAudioString && outputAudioContextRef.current) {
            const ctx = outputAudioContextRef.current;
            nextStartTimeRef.current = Math.max(nextStartTimeRef.current, ctx.currentTime);
            
            const binary = atob(base64EncodedAudioString);
            const bytes = new Uint8Array(binary.length);
            for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
            
            const audioBuffer = await decodeAudioData(bytes, ctx, 24000, 1);
            const source = ctx.createBufferSource();
            source.buffer = audioBuffer;
            source.connect(ctx.destination);
            
            source.addEventListener('ended', () => {
              sourcesRef.current.delete(source);
            });

            source.start(nextStartTimeRef.current);
            nextStartTimeRef.current += audioBuffer.duration;
            sourcesRef.current.add(source);
          }
        },
        onclose: () => setIsActive(false),
        onerror: () => setIsActive(false)
      });

      sessionRef.current = await sessionPromiseRef.current;
    } catch (err) {
      console.error(err);
      setIsConnecting(false);
    }
  };

  const stopSession = () => {
    sessionRef.current?.close();
    setIsActive(false);
    outputAudioContextRef.current?.close();
  };

  return (
    <div className="max-w-4xl mx-auto h-[70vh] flex flex-col items-center justify-center space-y-12">
      <div className="text-center space-y-4">
        <h1 className="text-5xl font-black text-white uppercase tracking-tighter">Elite Strategy Hub</h1>
        <p className="text-slate-500 font-medium">Activez le coaching vocal en temps réel pour affiner votre vision SaaS.</p>
      </div>

      <div className="relative">
        <AnimatePresence>
          {isActive && (
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1.2, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="absolute inset-0 bg-green-500/20 rounded-full blur-[100px] animate-pulse"
            />
          )}
        </AnimatePresence>

        <button 
          onClick={isActive ? stopSession : startSession}
          disabled={isConnecting}
          className={`w-64 h-64 rounded-full flex flex-col items-center justify-center gap-4 transition-all z-10 relative border-4 ${
            isActive ? 'bg-red-500/10 border-red-500 text-red-500' : 'bg-green-500 border-green-500 text-white'
          } shadow-[0_0_80px_rgba(34,197,94,0.3)]`}
        >
          {isConnecting ? (
            <Loader2 size={64} className="animate-spin" />
          ) : isActive ? (
            <>
              <MicOff size={64} />
              <span className="font-black uppercase tracking-widest text-xs">Couper le Direct</span>
            </>
          ) : (
            <>
              <Mic size={64} />
              <span className="font-black uppercase tracking-widest text-xs">Entrer en Live</span>
            </>
          )}
        </button>
      </div>

      <div className="flex gap-12 text-slate-600">
        <div className="flex items-center gap-3">
          <Volume2 size={20} />
          <span className="text-[10px] font-black uppercase tracking-widest">Voix Elite Active</span>
        </div>
        <div className="flex items-center gap-3">
          <ShieldCheck size={20} />
          <span className="text-[10px] font-black uppercase tracking-widest">Session Sécurisée</span>
        </div>
      </div>
    </div>
  );
};