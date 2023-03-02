import {Router} from 'express';
import {landmarkDraw} from '../utils/landmarkDraw';
import {LandmarkRecord} from '../records/landmark.record';
import {
  Coordinates,
  GameUpdateRequestBody,
  NewGameEntity,
  NewRoundEntity,
  RoundNumber,
  RoundsOfGameEntity,
} from '../types';
import {RoundRecord} from '../records/round-record';
import {GameRecord} from '../records/game.record';
import haversineDistance from 'haversine-distance';
import {pointsCalc} from '../utils/points';

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
  })
  .put('/:id', async (req, res) => {
    const game = new GameRecord(await GameRecord.getOne(req.params.id));
    const rounds = Object.values(game.rounds);
    const currentRound = game.currentRound;
    const totalPoints = game.totalPoints;
    const reqBody: GameUpdateRequestBody = req.body;

    const round = new RoundRecord(
      await RoundRecord.getOne(rounds[currentRound - 1]),
    );
    const landmark = new LandmarkRecord(
      await LandmarkRecord.getOne(round.landmarkId),
    );

    const {playerGuessCoordinates} = reqBody;
    const landmarkCoordinates: Coordinates = {
      lat: landmark.lat,
      lng: landmark.lng,
    };

    const distance = Math.round(
      haversineDistance(playerGuessCoordinates, landmarkCoordinates),
    );
    const points = pointsCalc(distance);

    round.playerGuessLat = playerGuessCoordinates.lat;
    round.playerGuessLng = playerGuessCoordinates.lng;
    round.distance = distance;
    round.points = points;
    game.totalPoints = totalPoints + round.points;

    await round.update();
    await game.update();
    res.end();
  });
