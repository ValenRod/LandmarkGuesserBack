import {
  LandmarkParams,
  NewRoundEntity,
  RoundNumber,
  RoundParams,
} from '../types';
import {RoundRecord} from '../records/round-record';
import {LandmarkRecord} from '../records/landmark.record';

export const createNewRound = async (
  roundNumber: RoundNumber,
  landmarkId: string,
): Promise<string> => {
  const newRoundObj: NewRoundEntity = {
    roundNumber,
    landmarkId,
  };
  const round = new RoundRecord(newRoundObj);
  return await round.insert();
};

export const getRoundParams = async (roundId: string): Promise<RoundParams> => {
  const roundData = await RoundRecord.getOne(roundId);
  const landmarkData = new LandmarkRecord(
    await LandmarkRecord.getOne(roundData.landmarkId),
  );

  let landmark: LandmarkParams;
  const {url, lat, lng} = landmarkData;

  if (roundData.points !== null) {
    landmark = {url, lat, lng};
  } else {
    landmark = {
      url,
      lat: null,
      lng: null,
    };
  }

  const round = (({id, landmarkId, ...roundData}) => roundData)(roundData);
  return {
    ...round,
    landmark,
  };
};
