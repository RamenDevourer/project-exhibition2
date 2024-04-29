import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import { PORT, mongoDBURL } from './config.js';
import mongoose from 'mongoose';

// import {Auth} from './models/auth.js';
// import {users} from './models/users.js';

import employeeAuthRoute from './routes/employeeAuthRoute.js';
import profileRoute from './routes/profileRoute.js';
import jobRoute from './routes/jobRoute.js';
import algoRoute from './routes/algorithmRoute.js';
import applicationRoute from './routes/applicationRoute.js';

import cors from 'cors';
import jwt from 'jsonwebtoken';

const app = express();

app.use(express.json());
         
// cors
app.use(cors());

mongoose
    .connect(mongoDBURL)
    .then(() => {
        console.log(`connected to mongoDB database`);
        app.listen(PORT, () => {
            console.log(`conncted to port: ${PORT}`);
        });
    })
    .catch((error) => {
        console.log(error);
    });



app.use('/employeeauth', employeeAuthRoute);

app.use('/profile', profileRoute);

app.use('/job', jobRoute);

app.use('/algo', algoRoute);

app.use('/application', applicationRoute);

app.get('/', (req, res) => {
    console.log(req);
    return res.status(200).send('Home Page');
});
