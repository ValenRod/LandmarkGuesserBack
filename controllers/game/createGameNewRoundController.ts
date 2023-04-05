import {Request, Response} from 'express';
import {GameRecord} from '../../records/game.record';
import {ValidationError} from '../../utils/errors';
import {RoundNumber} from '../../types';
import {RoundRecord} from '../../records/round.record';
import {LandmarkRecord} from '../../records/landmark.record';
import {landmarkDraw} from '../../utils/landmarkDraw';
import {createNewRound} from '../../utils/round';

export const createGameNewRoundController = async (
  req: Request,
  res: Response,
) => {
  try {
    const gameData = await GameRecord.getOne(req.params.id);
    if (!gameData) {
      throw new ValidationError('Game not founded!');
    }

    const game = new GameRecord(gameData);
    const {currentRound} = game;

    if (currentRound !== RoundNumber.Fifth) {
      const rounds = Object.values(game.rounds);
      const usedLandmarks: string[] = [];

      for (const id of rounds) {
        if (id !== null) {
          const landmark = (await RoundRecord.getOne(id)).landmarkId;
          usedLandmarks.push(landmark);
        }
      }

      const allLandmarks = await LandmarkRecord.findAll();
      let drawnLandmark: string;

      do {
        drawnLandmark = landmarkDraw(allLandmarks);
      } while (usedLandmarks.includes(drawnLandmark));

      const newRoundId = await createNewRound(currentRound + 1, drawnLandmark);

      switch (currentRound) {
        case RoundNumber.First: {
          game.currentRound = RoundNumber.Second;
          game.rounds.secondRoundId = newRoundId;
          break;
        }
        case RoundNumber.Second: {
          game.currentRound = RoundNumber.Third;
          game.rounds.thirdRoundId = newRoundId;
          break;
        }
        case RoundNumber.Third: {
          game.currentRound = RoundNumber.Fourth;
          game.rounds.fourthRoundId = newRoundId;
          break;
        }
        case RoundNumber.Fourth: {
          game.currentRound = RoundNumber.Fifth;
          game.rounds.fifthRoundId = newRoundId;
          break;
        }
      }
      await game.update();
    }
  } catch (e) {
    res.statusMessage = e.message;
    res.status(400);
  }
  res.end();
};
