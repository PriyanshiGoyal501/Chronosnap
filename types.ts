export interface Era {
  id: string;
  name: string;
  description: string;
  promptModifier: string;
  colorFrom: string;
  colorTo: string;
  icon: string;
}

export enum AppState {
  HERO = 'HERO',
  UPLOAD = 'UPLOAD',
  SELECT_ERA = 'SELECT_ERA',
  PROCESSING = 'PROCESSING',
  RESULT = 'RESULT'
}

export interface GeneratedImageResult {
  imageUrl: string;
  era: Era;
  originalImage: string;
}
