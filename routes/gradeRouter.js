import express from 'express';
import controller from '../controllers/gradeController.js';
import gradeController from "../controllers/gradeController.js";

const app = express();

app.post('/grade/', gradeController.create);
app.get('/grade/', gradeController.findAll);
app.get('/grade/:id', gradeController.findOne);
app.put('/grade/:id', gradeController.update);
app.delete('/grade/:id', gradeController.remove);
app.delete('/grade/', gradeController.removeAll);

export { app as gradeRouter };
