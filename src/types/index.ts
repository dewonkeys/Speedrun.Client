export interface SRSystem {
  id: number;
  name: string;
}

export interface SRStrain {
  id: number;
  name: string;
  srSystemId: number;
}

export interface SRSegment {
  id: number;
  name: string;
  srStrainId: number;
  msDuration: number; // in milliseconds
}
