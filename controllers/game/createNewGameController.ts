import {Request, Response} from 'express';
import {landmarkDraw} from '../../utils/landmarkDraw';
import {LandmarkRecord} from '../../records/landmark.record';
import {NewGameEntity, RoundNumber, RoundsOfGameEntity} from '../../types';
import {createNewRound} from '../../utils/round';
import {GameRecord} from '../../records/game.record';

export const createNewGameController = async (req: Request, res: Response) => {
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
};
