
export enum ViewType {
  DASHBOARD = 'DASHBOARD',
  SCANNER = 'SCANNER',
  FREQUENCY = 'FREQUENCY',
  CLASSIFIER = 'CLASSIFIER',
  SPIRITS_DB = 'SPIRITS_DB',
  ARCHIVES = 'ARCHIVES',
  SPIRITUAL_DEFENSE = 'SPIRITUAL_DEFENSE',
  SPIRIT_CHAT = 'SPIRIT_CHAT',
  HELP = 'HELP'
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
  visual: number;   // 0-100 (camera variance)
  audio: number;    // 0-100 (mic rms)
  magnetic: number; // 0-100 (motion/emf proxy)
}

export interface DetectionState {
  isScanning: boolean;
  signals: number[];
  lastEntity: EntityInfo | null;
  riskLevel: number;
  metrics: SensorMetrics;
}

export interface EntityInfo {
  id: string;
  name: string;
  type: string;
  lineage: string;
  confidence: number;
  frequency: string;
  description: string;
}
