import {NewGameEntity, RoundNumber, RoundsOfGameEntity} from '../types';
import {pool} from '../utils/db';
import {GameRecord} from '../records/game.record';

const rounds: RoundsOfGameEntity = {
  firstRoundId: 'testId',
  secondRoundId: null,
  thirdRoundId: null,
  fourthRoundId: null,
  fifthRoundId: null,
};

const gameObj: NewGameEntity = {
  id: 'testId',
  rounds,
  currentRound: RoundNumber.First,
  totalPoints: 0,
};

const valuesCheck = (game: GameRecord, values: NewGameEntity) => {
  expect(game.id).toBe(values.id);
  expect(game.rounds).toStrictEqual(values.rounds);
  expect(game.currentRound).toBe(values.currentRound);
  expect(game.totalPoints).toBe(values.totalPoints);
};

afterAll(async () => {
  await pool.end();
});

test('Can build GameRecord', () => {
  const game = new GameRecord(gameObj);
  valuesCheck(game, gameObj);
});
