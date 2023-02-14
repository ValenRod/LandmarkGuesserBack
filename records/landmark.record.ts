import {LandmarkEntity, LandmarkEntityId} from '../types';
import {pool} from '../utils/db';
import {FieldPacket} from 'mysql2';

type LandmarkRecordResults = [LandmarkEntity[], FieldPacket[]];

export class LandmarkRecord implements LandmarkEntity {
  id: string;
  lat: number;
  lng: number;
  url: string;

  constructor(obj: LandmarkEntity) {
    this.id = obj.id;
    this.lat = obj.lat;
    this.lng = obj.lng;
    this.url = obj.url;
  }

  static async getOne(id: string): Promise<LandmarkRecord | null> {
    const [results] = (await pool.execute(
      'SELECT * FROM `landmarks` WHERE `id` = :id',
      {
        id,
      },
    )) as LandmarkRecordResults;

    return results.length === 0 ? null : new LandmarkRecord(results[0]);
  }

  static async findAll(): Promise<LandmarkEntityId[]> {
    const [results] = (await pool.execute(
      'SELECT `id` FROM `landmarks`',
    )) as LandmarkRecordResults;
    return results;
  }
}
