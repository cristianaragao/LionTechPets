import { Router } from 'express';

import PetController from '../controllers/PetController';
import BreedController from '../controllers/BreedController';
import OwnerController from '../controllers/OwnerController';

const routes = Router();

routes
    .route("/pets")
    .get(PetController.list)
    .post(PetController.create);

routes
    .route("/pets/:id")
    .delete(PetController.delete)
    .put(PetController.update);

routes
    .route("/breeds")
    .get(BreedController.list)
    .post(BreedController.create);

routes
    .route("/breeds/:id")
    .delete(BreedController.delete)
    .put(BreedController.update);

routes
    .route("/owners")
    .get(OwnerController.list)
    .post(OwnerController.create);

routes
    .route("/owners/:id")
    .delete(OwnerController.delete)
    .put(OwnerController.update);



export { routes };