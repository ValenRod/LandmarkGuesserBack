import {
  GameEntity,
  NewGameEntity,
  RoundNumber,
  RoundsOfGameEntity,
} from '../types';

export class GameRecord implements GameEntity {
  id: string;
  rounds: RoundsOfGameEntity;
  currentRound: RoundNumber;
  totalPoints: number;

  constructor(obj: NewGameEntity) {
    this.id = obj.id;
    this.rounds = obj.rounds;
    this.currentRound = obj.currentRound;
    this.totalPoints = obj.totalPoints;
  }
}
