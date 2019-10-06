import { Router } from "express";
import * as kms from '@google-cloud/kms';
// @ts-ignore
import * as ecc from 'eosjs-ecc';
// @ts-ignore
import * as firebaseHelper from 'firebase-functions-helper';

const projectId = '';
const locationId = 'global';

// @ts-ignore
const key = ({ db }) => {
    const api = Router();

    api.post('/register-todo', async (req, res) => {
        const privateKey = req.body.key;
        // TODO: call kms to enc key
        const client = new kms.KeyManagementServiceClient();
        const parent = client.locationPath(projectId, locationId);
        const [keyRings] = await client.listKeyRings({parent});

        // TODO: grant an access to IAM
        if (keyRings.length) {
            console.log('Key rings:');
            keyRings.forEach((keyRing: { name: any; }) => console.log(keyRing.name));
        } else {
            console.log(`No key rings found.`);
        }
        // TODO: store encrypted key in Firestore

        res.json({ 'key': privateKey })
    });

    api.post('/register', async (req, res) => {
        const id = req.body.id;
        const privateKey = req.body.key;
        const docRef = await firebaseHelper.firestore.createDocumentWithID(db, 'keys', id, { key: privateKey });
        res.json({ id: docRef.id });
    });

    api.post('/sign', async (req, res) => {
        const { id, text } = req.body;
        const doc = await firebaseHelper.firestore.getDocument(db, 'keys', id)
        const signature = ecc.sign(text, doc.key)
        res.json({ signature })
    });

    return api;
}

export default key;
