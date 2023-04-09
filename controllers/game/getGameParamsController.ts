import {Request, Response} from 'express';
import {GameRecord} from '../../records/game.record';
import {ValidationError} from '../../utils/errors';
import {GameParams, RoundNumber, RoundParams} from '../../types';
import {getRoundParams} from '../../utils/round';

export const getGameParamsController = async (req: Request, res: Response) => {
  try {
    const gameData = await GameRecord.getOne(req.params.id);
    if (!gameData) {
      throw new ValidationError('Game not founded!');
    }

    const gameObj = new GameRecord(gameData);
    let currRoundId: string;

    switch (gameObj.currentRound) {
      case RoundNumber.First: {
        currRoundId = gameObj.rounds.firstRoundId;
        break;
      }
      case RoundNumber.Second: {
        currRoundId = gameObj.rounds.secondRoundId;
        break;
      }
      case RoundNumber.Third: {
        currRoundId = gameObj.rounds.thirdRoundId;
        break;
      }
      case RoundNumber.Fourth: {
        currRoundId = gameObj.rounds.fourthRoundId;
        break;
      }
      case RoundNumber.Fifth: {
        currRoundId = gameObj.rounds.fifthRoundId;
        break;
      }
    }

    const rounds: RoundParams[] = [];
    const currRound = await getRoundParams(currRoundId);

    if (currRound.roundNumber === RoundNumber.Fifth && currRound.points) {
      const gameRoundsId = Object.values(gameObj.rounds);
      for (const roundId of gameRoundsId) {
        rounds.push(await getRoundParams(roundId));
      }
    } else {
      rounds.push(await getRoundParams(currRoundId));
    }

    const game: GameParams = {...gameObj, rounds};
    res.json(game);
  } catch (e) {
    res.statusMessage = e.message;
    res.status(400);
  }
  res.end();
};
