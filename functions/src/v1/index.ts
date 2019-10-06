import { Router } from "express";
import key from './key';

// @ts-ignore
const v1 = ({ db }) => {
    const api = Router();

    api.use('/key', key({ db }));

    return api;
}

export default v1;
