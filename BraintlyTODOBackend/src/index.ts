const PORT_NUMBER = 3000;
import express from 'express';
import morgan from 'morgan';
import { db, doneTasksIdRef, savedTasksRef } from './firebase';
const app = express();

app.use(morgan('dev'));
app.use(express.json());

app.listen(PORT_NUMBER, ()=> console.log('Server is running on port ', PORT_NUMBER));

app.get('/getSavedTasks', async (_, res) => {
    const querySnapshot = await db.collection('savedTasks').get();
    res.send(
        querySnapshot.docs.map(doc=>doc.data())
    );
});

app.get('/getDoneTasksId', async (_, res) => {
    const querySnapshot = await db.collection('doneTasksId').get();
    res.send(
        querySnapshot.docs.map(doc => doc.data()?.id || '')
    );
});

app.post('/newSavedTask', (req, _)=> {
    let newTask = req.body

    newTask.expires = new Date(newTask.expires)
    newTask.createdAt = new Date(newTask.createdAt)

    const docRef = savedTasksRef.doc(newTask.id)
    docRef.set(newTask)
    .then(() => {
        console.log('Documento agregado con ID:', newTask.id);
    })
    .catch((error) => {
        console.error('Error al agregar documento:', error);
    });
})

app.post('/deleteTask', (req, _)=> {
    const taskToDelete = req.body

   const {id} = taskToDelete

    const docRef = savedTasksRef.doc(id)
    docRef.delete()
    .then(() => {
        console.log('Documento agregado con ID:', id);
    })
    .catch((error) => {
        console.error('Error al agregar documento:', error);
    });
})

app.post('/markAsDone', (req, _)=> {
    const {id} = req.body
    const docRef = doneTasksIdRef.doc(id)
    docRef.set({ id }) 
    .then(() => {
        console.log('Documento agregado con ID:', id);
    })
    .catch((error) => {
        console.error('Error al agregar documento:', error);
    });
})

app.post('/markAsUndone', (req, _)=> {
    const {id} = req.body
    const docRef = doneTasksIdRef.doc(id)
    docRef.delete()
    .then(() => {
        console.log('Documento eliminado con ID:', id);
    })
    .catch((error) => {
        console.error('Error al eliminar documento:', error);
    });
})



