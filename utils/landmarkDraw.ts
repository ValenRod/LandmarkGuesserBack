import {LandmarkEntityId} from '../types';

export const landmarkDraw = (landmarks: LandmarkEntityId[]): string => {
  const drawnIndex = Math.floor(Math.random() * landmarks.length);
  return landmarks[drawnIndex].id;
};
