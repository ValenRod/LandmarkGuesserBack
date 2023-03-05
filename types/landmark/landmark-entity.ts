export interface LandmarkEntityId {
  id: string;
}

export interface LandmarkEntity extends LandmarkEntityId {
  lat: number;
  lng: number;
  url: string;
}

export interface LandmarkParams
  extends Omit<LandmarkEntity, 'id' | 'lat' | 'lng'> {
  lat: number | null;
  lng: number | null;
}
