
export enum ViewType {
  DASHBOARD = 'DASHBOARD',
  SCANNER = 'SCANNER',
  FREQUENCY = 'FREQUENCY',
  CLASSIFIER = 'CLASSIFIER',
  SPIRITS_DB = 'SPIRITS_DB',
  ARCHIVES = 'ARCHIVES',
  SPIRITUAL_DEFENSE = 'SPIRITUAL_DEFENSE',
  SPIRIT_CHAT = 'SPIRIT_CHAT',
  HELP = 'HELP',
  UFO_DETECTOR = 'UFO_DETECTOR'
}

export type PlanType = 'FREE' | 'INICIADO' | 'INVESTIGADOR' | 'ARQUIVISTA';

export interface UserProfile {
  name: string;
  age: string;
  country: string;
  phone: string;
  email: string;
  username: string;
  plan: PlanType;
  isActive: boolean;
}

export interface Spirit {
  name: string;
  freq: string;
  danger: string;
  location: string;
  plan: string;
  desc: string;
}

export interface SensorMetrics {
  visual: number;   
  audio: number;    
  magnetic: number; 
}

export interface DetectionState {
  isScanning: boolean;
  signals: number[];
  lastEntity: any | null;
  riskLevel: number;
  metrics: SensorMetrics;
}
