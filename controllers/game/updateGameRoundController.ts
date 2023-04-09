import {Request, Response} from 'express';
import {GameRecord} from '../../records/game.record';
import {ValidationError} from '../../utils/errors';
import {Coordinates, GameUpdateRequestBody} from '../../types';
import {RoundRecord} from '../../records/round.record';
import {LandmarkRecord} from '../../records/landmark.record';
import haversineDistance from 'haversine-distance';
import {pointsCalc} from '../../utils/points';

export const updateGameRoundController = async (
  req: Request,
  res: Response,
) => {
  try {
    const gameData = await GameRecord.getOne(req.params.id);
    if (!gameData) {
      throw new ValidationError('Game not founded!');
    }

    const game = new GameRecord(gameData);
    const rounds = Object.values(game.rounds);
    const currentRound = game.currentRound;
    const totalPoints = game.totalPoints;
    const reqBody: GameUpdateRequestBody = req.body;
    const {playerGuessCoordinates} = reqBody;

    if (
      !playerGuessCoordinates ||
      !playerGuessCoordinates.lat ||
      !playerGuessCoordinates.lng
    ) {
      throw new ValidationError('Incorrect data!');
    }

    const round = new RoundRecord(
      await RoundRecord.getOne(rounds[currentRound - 1]),
    );
    if (round.points) {
      throw new ValidationError('This round is over!');
    }

    const landmark = new LandmarkRecord(
      await LandmarkRecord.getOne(round.landmarkId),
    );

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
  } catch (e) {
    res.statusMessage = e.message;
    res.status(400);
  }
  res.end();
};
