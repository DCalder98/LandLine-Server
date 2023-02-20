import express from "express";
import * as dotenv from 'dotenv';
import cors from 'cors';

import connectDB from "./mongoDB/connect.js";
import userRouter from './routes/user.routes.js';
import propertyRouter from './routes/property.routes.js';



dotenv.config();

const PORT = process.env.PORT ? process.env.PORT : 8080 

const app = express();
app.use(cors());
app.use(express.json({limit: '50mb'}))

app.get('/', (req, res) => {
    res.send({message: 'Server Active!'})
})

app.use('/api/v1/users', userRouter)
app.use('/api/v1/properties', propertyRouter)


const startServer = async () => {
    try{
        //Connect to database
        connectDB(process.env.DATABASE_URI)

        app.listen(PORT, ()=> console.log(`Server Running on Port: ${PORT}`))
    }catch(err){
        console.log(err)
    }
}

startServer()