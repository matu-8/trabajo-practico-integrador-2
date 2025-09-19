import mongoose from "mongoose";

export const connectDB = async()=>{
try {
   await mongoose.connect(process.env.MONGODB_URI)
   console.log(`Conexión con base de datos exitosa`)
} catch (error) {
    console.log(`No se pudo conectar con la base de datos`)
    }
}
