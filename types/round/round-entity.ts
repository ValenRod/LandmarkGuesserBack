import {LandmarkParams} from '../landmark';

export enum RoundNumber {
  First = 1,
  Second = 2,
  Third = 3,
  Fourth = 4,
  Fifth = 5,
}

export interface RoundEntity {
  id: string;
  roundNumber: RoundNumber;
  landmarkId: string;
  playerGuessLat: number | null;
  playerGuessLng: number | null;
  distance: number | null;
  points: number | null;
}

export interface NewRoundEntity
  extends Omit<
    RoundEntity,
    'id' | 'playerGuessLat' | 'playerGuessLng' | 'distance' | 'points'
  > {
  id?: string;
  playerGuessLat?: number | null;
  playerGuessLng?: number | null;
  distance?: number | null;
  points?: number | null;
}

export interface RoundParams extends Omit<RoundEntity, 'id' | 'landmarkId'> {
  landmark: LandmarkParams;
}
