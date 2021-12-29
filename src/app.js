import express from 'express';
import cookieParser from 'cookie-parser';
import logger from 'morgan';

import indexRouter from './routes/index';
import campaignsRouter from './routes/campaigns';
import infoRouter from './routes/info';

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// API Routes
app.use('/', indexRouter);
app.use('/campaigns', campaignsRouter);
app.use('/info', infoRouter);

export default app;