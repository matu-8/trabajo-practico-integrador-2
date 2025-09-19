import express from "express";
import 'dotenv/config';
import cookieParser from "cookie-parser";
import cors from 'cors';
import { connectDB } from "./src/config/database.js";
//instancio express
const app = express();
const PORT = process.env.PORT;
//middlewares
app.use(cors())
app.use(express.json())
app.use(cookieParser())



connectDB()
app.listen(PORT,()=>{
    console.log(`servidor inicial corriendo en puerto:${PORT}`)
})
