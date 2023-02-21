import {
  GameEntity,
  GameRecordGetOneResponse,
  NewGameEntity,
  RoundNumber,
  RoundsOfGameEntity,
} from '../types';
import {pool} from '../utils/db';
import {FieldPacket} from 'mysql2';

type GameRecordResults = [GameRecordGetOneResponse[], FieldPacket[]];

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

  static async getOne(id: string): Promise<GameRecord | null> {
    const [results] = (await pool.execute(
      'SELECT * FROM `games` WHERE `id` = :id',
      {
        id,
      },
    )) as GameRecordResults;

    if (results.length !== 0) {
      const responseObj = results[0];
      const rounds: RoundsOfGameEntity = {
        firstRoundId: responseObj.firstRoundId,
        secondRoundId: responseObj.secondRoundId,
        thirdRoundId: responseObj.thirdRoundId,
        fourthRoundId: responseObj.fourthRoundId,
        fifthRoundId: responseObj.fifthRoundId,
      };

      const gameObj: NewGameEntity = {
        id: responseObj.id,
        rounds,
        currentRound: responseObj.currentRound,
        totalPoints: responseObj.totalPoints,
      };

      return new GameRecord(gameObj);
    } else {
      return null;
    }
  }
}
