import { Router } from "express";
import key from './key';

// @ts-ignore
const v1 = ({ config }) => {
    const api = Router();

    api.use('/key', key({ config }));

    return api;
}

export default v1;
