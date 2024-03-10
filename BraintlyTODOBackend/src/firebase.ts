import { initializeApp , applicationDefault} from 'firebase-admin/app';
import { firestore } from 'firebase-admin';
import * as dotenv from 'dotenv';

dotenv.config(); // Carga las variables de entorno desde .env

initializeApp({
    credential: applicationDefault()
});

const db = firestore()
const doneTasksIdRef = db.collection('doneTasksId');
const savedTasksRef = db.collection('savedTasks');

export { db ,doneTasksIdRef, savedTasksRef};
