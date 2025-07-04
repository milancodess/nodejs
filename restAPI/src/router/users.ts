import express from 'express';
import { deleteUser, getAllUsers } from '../controllers/users';
import { isAuthenticated } from '../middlewares/index';

export default (router: express.Router) => {
    router.get('/users', /*isAuthenticated,*/ (req, res, next) => { /*Fix this line if anyone sees the code*/
        getAllUsers(req, res).catch(next);
    });
    router.delete('/users/:id', (req, res, next) => {
        deleteUser(req, res).catch(next);
    });
};