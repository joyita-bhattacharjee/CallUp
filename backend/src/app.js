import express from 'express';
import {createServer} from 'node:http';
import { Server } from 'socket.io';
import mongoose from 'mongoose';
import cors from 'cors';
import { connectToSocket } from './controller/socketmanager.js';
import userRoutes from './routes/users.routes.js';


const app = express();
const server = createServer(app);
const io = connectToSocket(server);

app.set("port", process.env.PORT || 8000);
app.use(cors());
app.use(express.json({limit: "40kb"}));
app.use(express.urlencoded({extended: true, limit: "40kb"}));
app.use('/api/v1/users', userRoutes);

app.get('/home', (req, res) => {
    res.send('Hello World!');
});

const start = async () => {
    app.set("mongo_user")
    const connection_db = await mongoose.connect("mongodb+srv://joyitabhattacharya16_db_user:dNlrF3iJD84Y9Kx5@cluster0.svwrmcw.mongodb.net/")
    server.listen(app.get("port"), () => {
        console.log('Server is running on port 8000');
    });
}

start();