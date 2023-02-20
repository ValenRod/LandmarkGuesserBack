import {RoundRecord} from '../records/round-record';
import {pool} from '../utils/db';
import {NewRoundEntity, RoundNumber} from '../types';

const roundObj: NewRoundEntity = {
  id: 'testId',
  roundNumber: RoundNumber.First,
  landmarkId: 'testId',
};

const newRoundObj: NewRoundEntity = {
  roundNumber: RoundNumber.First,
  landmarkId: 'testId',
};

const valuesCheck = (round: RoundRecord, values: NewRoundEntity) => {
  expect(round.id).toBe(values.id);
  expect(round.roundNumber).toBe(values.roundNumber);
  expect(round.landmarkId).toBe(values.landmarkId);
  expect(round.playerGuessLat).toBeNull();
  expect(round.playerGuessLng).toBeNull();
  expect(round.distance).toBeNull();
  expect(round.points).toBeNull();
};

afterAll(async () => {
  await pool.end();
});

test('Can build RoundRecord', () => {
  const round = new RoundRecord(roundObj);
  valuesCheck(round, roundObj);
});

test('RoundRecord.getOne returns data from database from one entry.', async () => {
  const round = await RoundRecord.getOne(roundObj.id);
  expect(round).toBeDefined();
  valuesCheck(round, roundObj);
});

test('RoundRecord.getOne returns null from database if entry does not exist.', async () => {
  const round = await RoundRecord.getOne('-');
  expect(round).toBeNull();
});

test('Inserted RoundRecord returns UUID', async () => {
  const round = new RoundRecord(newRoundObj);
  const id = await round.insert();
  expect(id).toBeDefined();
  expect(typeof id).toBe('string');
});

test('RoundRecord inserts data to database', async () => {
  const round = new RoundRecord(newRoundObj);
  const id = await round.insert();
  const foundRound = new RoundRecord(await RoundRecord.getOne(id));
  valuesCheck(foundRound, round);
});

test('RoundRecord cannot be inserted if it has an id.', async () => {
  let message: string;
  const round = new RoundRecord(roundObj);
  try {
    await round.insert();
  } catch (e) {
    message = e.message;
  }
  expect(message).toBeDefined();
  expect(message).toBe('Cannot insert something that is already inserted!!!');
});
