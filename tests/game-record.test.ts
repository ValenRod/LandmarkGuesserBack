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

const newGameObj: NewGameEntity = {
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

test('GameRecord.getOne returns data from database from one entry.', async () => {
  const game = await GameRecord.getOne(gameObj.id);
  expect(game).toBeDefined();
  valuesCheck(game, gameObj);
});

test('GameRecord.getOne returns null from database if entry does not exist.', async () => {
  const game = await GameRecord.getOne('-');
  expect(game).toBeNull();
});

test('Inserted GameRecord returns UUID', async () => {
  const game = new GameRecord(newGameObj);
  const id = await game.insert();
  expect(id).toBeDefined();
  expect(typeof id).toBe('string');
});

test('GameRecord inserts data to database', async () => {
  const game = new GameRecord(newGameObj);
  const id = await game.insert();
  const foundGame = await GameRecord.getOne(id);
  valuesCheck(foundGame, game);
});

test('GameRecord cannot be inserted if it has an id.', async () => {
  let message: string;
  const game = new GameRecord(gameObj);
  try {
    await game.insert();
  } catch (e) {
    message = e.message;
  }
  expect(message).toBeDefined();
  expect(message).toBe('Cannot insert something that is already inserted!!!');
});
