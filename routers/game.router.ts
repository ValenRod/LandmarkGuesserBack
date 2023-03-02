import {Router} from 'express';
import {landmarkDraw} from '../utils/landmarkDraw';
import {LandmarkRecord} from '../records/landmark.record';
import {
  NewGameEntity,
  NewRoundEntity,
  RoundNumber,
  RoundsOfGameEntity,
} from '../types';
import {RoundRecord} from '../records/round-record';
import {GameRecord} from '../records/game.record';

const createNewRound = async (
  currentRound: RoundNumber,
  landmarkId: string,
): Promise<string> => {
  const newRoundObj: NewRoundEntity = {
    roundNumber: currentRound,
    landmarkId,
  };
  const round = new RoundRecord(newRoundObj);
  return await round.insert();
};

export const gameRouter = Router()
  .get('/', (req, res) => res.redirect('/'))
  .post('/', async (req, res) => {
    const landmarkId = landmarkDraw(await LandmarkRecord.findAll());
    const currentRound = RoundNumber.First;
    const totalPoints = 0;

    const roundId = await createNewRound(currentRound, landmarkId);

    const rounds: RoundsOfGameEntity = {
      firstRoundId: roundId,
      secondRoundId: null,
      thirdRoundId: null,
      fourthRoundId: null,
      fifthRoundId: null,
    };
    const newGameObj: NewGameEntity = {
      rounds,
      currentRound,
      totalPoints,
    };

    const newGame = new GameRecord(newGameObj);
    await newGame.insert();
    res.json(newGame.id);
  });
