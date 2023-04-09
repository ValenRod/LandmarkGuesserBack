import {Router} from 'express';
import {createNewGameController} from '../controllers/game/createNewGameController';
import {updateGameRoundController} from '../controllers/game/updateGameRoundController';
import {createGameNewRoundController} from '../controllers/game/createGameNewRoundController';
import {getGameParamsController} from '../controllers/game/getGameParamsController';

export const gameRouter = Router()
  .post('/', createNewGameController)
  .put('/:id', updateGameRoundController)
  .post('/:id', createGameNewRoundController)
  .get('/:id', getGameParamsController);
