import express from "express";
import { Server } from 'socket.io';
import handlebars from 'express-handlebars';
import __dirname from './utils.js';
import viewsRouter from './routes/views.router.js'

const app = express();

app.use(express.static(`${__dirname}/public`));
app.use('/', viewsRouter);

app.engine('handlebars', handlebars.engine());
app.set('views', `${__dirname}/views`);
app.set('view engine', 'handlebars');

const server = app.listen(8080, () => console.log('runnig'));
const io = new Server(server);
