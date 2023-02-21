import {RoundNumber} from '../round';

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
