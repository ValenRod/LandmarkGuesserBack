import {RoundRecord} from '../records/round-record';
import {pool} from '../utils/db';
import {NewRoundEntity, RoundNumber} from '../types';

const roundObj: NewRoundEntity = {
  id: 'testId',
  roundNumber: RoundNumber.First,
  landmarkId: 'testId',
  playerGuessLat: null,
  playerGuessLng: null,
  distance: null,
  points: null,
};

const valuesCheck = (round: RoundRecord) => {
  expect(round.id).toBe(roundObj.id);
  expect(round.roundNumber).toBe(roundObj.roundNumber);
  expect(round.landmarkId).toBe(roundObj.landmarkId);
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
  valuesCheck(round);
});

test('RoundRecord.getOne returns data from database from one entry.', async () => {
  const round = await RoundRecord.getOne(roundObj.id);
  expect(round).toBeDefined();
  valuesCheck(round);
});

test('RoundRecord.getOne returns null from database if entry does not exist.', async () => {
  const round = await RoundRecord.getOne('-');
  expect(round).toBeNull();
});
