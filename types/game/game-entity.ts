import {RoundNumber, RoundParams} from '../round';

export interface RoundsOfGameEntity {
  firstRoundId: string | null;
  secondRoundId: string | null;
  thirdRoundId: string | null;
  fourthRoundId: string | null;
  fifthRoundId: string | null;
}

export interface GameEntity {
  id: string;
  rounds: RoundsOfGameEntity;
  currentRound: RoundNumber;
  totalPoints: number;
}

export interface NewGameEntity extends Omit<GameEntity, 'id'> {
  id?: string;
}

export interface GameRecordGetOneResponse {
  id: string;
  firstRoundId: string;
  secondRoundId: string | null;
  thirdRoundId: string | null;
  fourthRoundId: string | null;
  fifthRoundId: string | null;
  currentRound: RoundNumber;
  totalPoints: number;
}

export interface GameParams extends Omit<GameEntity, 'rounds'> {
  rounds: RoundParams[];
}
