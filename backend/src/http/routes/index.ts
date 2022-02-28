import { Router } from 'express';

import PetController from '../controllers/PetController';
import BreedController from '../controllers/BreedController';
import OwnerController from '../controllers/OwnerController';
import SessionController from '../controllers/SessionController';

const routes = Router();

routes
    .route("/login")
    .post(SessionController.login);

routes
    .route("/signup")
    .post(SessionController.signup);

routes
    .route("/session")
    .post(SessionController.auth);

routes
    .route("/users")
    .get(SessionController.auth, SessionController.get);

routes
    .route("/pets")
    .get(SessionController.auth, PetController.list)
    .post(SessionController.auth, PetController.create);

routes
    .route("/pets/:id")
    .delete(SessionController.auth, PetController.delete)
    .put(SessionController.auth, PetController.update);

routes
    .route("/breeds")
    .get(SessionController.auth, BreedController.list)
    .post(SessionController.auth, BreedController.create);

routes
    .route("/breeds/:id")
    .delete(SessionController.auth, BreedController.delete)
    .put(SessionController.auth, BreedController.update);

routes
    .route("/owners")
    .get(SessionController.auth, OwnerController.list)
    .post(SessionController.auth, OwnerController.create);

routes
    .route("/owners/:id")
    .delete(SessionController.auth, OwnerController.delete)
    .put(SessionController.auth, OwnerController.update);


export { routes };