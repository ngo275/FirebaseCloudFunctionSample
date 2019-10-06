import * as functions from 'firebase-functions';
import * as express from 'express';
import * as bodyParser from 'body-parser';
// @ts-ignore
import * as firebaseHelper from 'firebase-functions-helper';
// @ts-ignore
import * as serviceAccount from '../serviceAccountKey.json';
import * as cors from 'cors';
import v1 from './v1';

const config = {
    databaseUrl: ''
}

const app = express();
const firebaseApp = firebaseHelper.firebase.initializeApp(serviceAccount, config.databaseUrl);
const db = firebaseApp.firestore;
db.settings({ timestampsInSnapshots: true });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({ origin: true }));

app.use('/v1', v1({ db }));

exports.api = functions.https.onRequest(app);
