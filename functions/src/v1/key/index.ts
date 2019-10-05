import { Router } from "express";

const key = ({}) => {
    const api = Router();

    api.post('/register', async (req, res) => {
        const privateKey = req.body.key;
        // TODO: call kms to enc key

        // TODO: store encrypted key in Firestore

        res.json({ 'key': privateKey })
    });

    return api;
}

export default key;
