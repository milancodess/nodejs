import express from 'express';
import { login,register } from '../controllers/authentication';

export default (router: express.Router) => {
    router.post('/auth/register', (req, res, next) => {
        register(req, res).catch(next);
    });
    router.post('/auth/login', (req, res, next) => {
        login(req, res).catch(next);
    });
};