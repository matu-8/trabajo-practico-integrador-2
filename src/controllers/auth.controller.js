import { matchedData } from "express-validator";
import UserModel from "../models/user.model.js";
import { hashPassword } from "../helpers/hash.helper.js";


export const register = async(req, res)=>{
    console.log('llegue al registro')
    try {
        const validatedData = matchedData(req)  //extraigo la informacion validada de la peticion
        validatedData.password = await hashPassword(validatedData.password) //De la constante donde 
                                                                        // guardé al informacion validada, accedo a contraseña y hago el proceso de hash,
                                                                        //  después lo guardo de nuevo en el valor de la contraseña
        console.log(validatedData.password)
        const user = await UserModel.create(validatedData)
        console.log(validatedData)
        return res.status(201).json({
            ok:true,
            msg:"El registro de se realizó correctamente",
            user
        })
    } catch (error) {
      console.log(`>>>! ha ocurrido un error en registro ${error}`)
        return res.status(500).json({
            ok:false,
            msg:`Error interno de servidor`
        })  
    } 
};

export const login = async(req,res)=>{
    try {
        const validatedData = matchedData(req)
        const user = await UserModel.findOne()
    } catch (error) {
         console.log(`>>>! ha ocurrido un error en login ${error}`)
        return res.status(500).json({
            ok:false,
            msg:`Error interno de servidor`
        }) 
    }
}


