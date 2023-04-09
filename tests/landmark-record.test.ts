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

test('LandmarkRecord.findAll returns array of found entries.', async () => {
  const landmarks = await LandmarkRecord.findAll();
  expect(landmarks).not.toEqual([]);
  expect(landmarks[0].id).toBeDefined();
});

test('LandmarkRecord.findAll returns only id.', async () => {
  const landmarks = await LandmarkRecord.findAll();
  expect((landmarks[0] as LandmarkEntity).url).toBeUndefined();
  expect((landmarks[0] as LandmarkEntity).lat).toBeUndefined();
  expect((landmarks[0] as LandmarkEntity).lng).toBeUndefined();
});
