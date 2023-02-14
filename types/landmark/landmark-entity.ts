export interface LandmarkEntityId {
  id: string;
}

export interface LandmarkEntity extends LandmarkEntityId {
  lat: number;
  lng: number;
  url: string;
}
