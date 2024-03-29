import {NewRoundEntity, RoundEntity, RoundNumber} from '../types';
import {FieldPacket} from 'mysql2';
import {pool} from '../utils/db';
import {v4 as uuid} from 'uuid';

type RoundRecordResults = [RoundEntity[], FieldPacket[]];

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
    this.playerGuessLat = obj.playerGuessLat ?? null;
    this.playerGuessLng = obj.playerGuessLng ?? null;
    this.distance = obj.distance ?? null;
    this.points = obj.points ?? null;
  }

  static async getOne(id: string): Promise<RoundRecord | null> {
    const [results] = (await pool.execute(
      'SELECT * FROM `rounds` WHERE `id` = :id',
      {
        id,
      },
    )) as RoundRecordResults;

    return results.length === 0 ? null : new RoundRecord(results[0]);
  }

  async insert(): Promise<string> {
    if (!this.id) {
      this.id = uuid();
    } else {
      throw new Error('Cannot insert something that is already inserted!!!');
    }

    await pool.execute(
      'INSERT INTO `rounds`(`id`, `roundNumber`, `landmarkId`) VALUES(:id, :roundNumber, :landmarkId)',
      {
        id: this.id,
        roundNumber: this.roundNumber,
        landmarkId: this.landmarkId,
      },
    );
    return this.id;
  }

  async update(): Promise<void> {
    await pool.execute(
      'UPDATE `rounds` SET `playerGuessLat` = :playerGuessLat, `playerGuessLng` = :playerGuessLng, `distance` = :distance, `points` = :points WHERE `id` = :id',
      {
        id: this.id,
        playerGuessLat: this.playerGuessLat,
        playerGuessLng: this.playerGuessLng,
        distance: this.distance,
        points: this.points,
      },
    );
  }
}
