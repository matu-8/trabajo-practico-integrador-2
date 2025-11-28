import { matchedData } from "express-validator";
import UserModel from "../models/user.model.js";

export const getAllUser = async(req, res)=>{
    try {
        const users = await UserModel.find().populate()
        if(users.length === 0)
            return res.status(404).json({
                ok:false,
                msg:"No se han encontrado usuarios"
        });
       return res.status(200).json({
                ok:false,
                msg:"Se han encontrado estos usuarios"
        });
        
    } catch (error) {
        console.log(`>>>! ha ocurrido un error en metodo get (todos los usuarios) ${error}`)
        return res.status(500).json({
            ok:false,
            msg:`Error interno de servidor`
        })
    }
};

export const updateUser = async(req, res)=>{
    const {id} = req.params;
    try {
        const validatedData = matchedData(req) 
        const user = await UserModel.findByIdAndUpdate(id, validatedData, {new:true})
                return res.status(200).json({
                    ok:true,
                    msg:"Se ha actualizado el usuario",
                    user
                });

    } catch (error) {
        console.log(`>>>! ha ocurrido un error en actualizar usuario ${error}`)
        return res.status(500).json({msg:`Error interno de servidor`})
    }
};

export const getUserById = async(req, res) => {
    try {
        const {id} = req.params;
        const users = await UserModel.findById(id)
        if(!users){
            return res.status(404).json({
                ok:false,
                msg:"No se ha encontrado el usuario especificado"
            })
        }
        
    } catch (error) {
        console.log(`>>>! ha ocurrido un error en metodo get (usuario por id) ${error}`)
        return res.status(500).json({
            ok:false,
            msg:`Error interno de servidor`
        })
    }
};

export const deleteUser = async(req, res) => {
try {
    const {id} = req.params;
    await UserModel.findByIdAndDelete(id)
    return res.status(200).json({
        ok:true,
        msg:"El usuario se ha eliminado"
        
    })
} catch (error) {
    onsole.log(`>>>! ha ocurrido un error en metodo delete (usuario) ${error}`)
        return res.status(500).json({
            ok:false,
            msg:`Error interno de servidor`
        })
}
}