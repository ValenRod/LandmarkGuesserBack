import {LandmarkRecord} from '../records/landmark.record';
import {pool} from '../utils/db';
import {LandmarkEntity} from '../types';

const landmarkObj: LandmarkEntity = {
  id: 'testId',
  lat: 0,
  lng: 0,
  url: 'testUrl',
};

const valuesCheck = (landmark: LandmarkRecord) => {
  expect(landmark.id).toBe(landmarkObj.id);
  expect(landmark.lat).toBe(landmarkObj.lat);
  expect(landmark.lng).toBe(landmarkObj.lng);
  expect(landmark.url).toBe(landmarkObj.url);
};

afterAll(async () => {
  await pool.end();
});

test('Can build LandmarkRecord', () => {
  const landmark = new LandmarkRecord(landmarkObj);
  valuesCheck(landmark);
});

test('LandmarkRecord.getOne returns data from database from one entry.', async () => {
  const landmark = await LandmarkRecord.getOne(landmarkObj.id);
  expect(landmark).toBeDefined();
  valuesCheck(landmark);
});

test('LandmarkRecord.getOne returns null from database if entry does not exist.', async () => {
  const landmark = await LandmarkRecord.getOne('');
  expect(landmark).toBeNull();
});
