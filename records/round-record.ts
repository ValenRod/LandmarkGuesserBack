import {NewRoundEntity, RoundEntity, RoundNumber} from '../types';

export class RoundRecord implements RoundEntity {
  id: string;
  roundNumber: RoundNumber;
  landmarkId: string;
  playerGuessLat: number | null;
  playerGuessLng: number | null;
  distance: number | null;
  points: number | null;

  constructor(obj: NewRoundEntity) {
    this.id = obj.id;
    this.roundNumber = obj.roundNumber;
    this.landmarkId = obj.landmarkId;
    this.playerGuessLat = obj.playerGuessLat;
    this.playerGuessLng = obj.playerGuessLng;
    this.distance = obj.distance;
    this.points = obj.points;
  }
}
