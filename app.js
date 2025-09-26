import express from "express";
import 'dotenv/config';
import cookieParser from "cookie-parser";
import cors from 'cors';
import { connectDB } from "./src/config/database.js";
import { UserRoutes } from "./src/routes/user.route.js";
import { ArticleRoutes } from "./src/routes/article.route.js";
import { AuthRoutes } from "./src/routes/auth.route.js";

//instancio express
const app = express();
const PORT = process.env.PORT;

//middlewares
//config basica para permitir cookies y credenciales
app.use(cors({
    origin:'http://localhost:27017',
    credentials:true
}));
app.use(cookieParser())
app.use(express.json())

//Enrutamiento
app.use('/api', UserRoutes)
app.use('/api', ArticleRoutes)
app.use('/api', AuthRoutes)

connectDB()
app.listen(PORT,()=>{
    console.log(`servidor inicial corriendo en puerto:${PORT}`)
})
