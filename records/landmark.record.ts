import {LandmarkEntity} from '../types';

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
}
