import { matchedData } from "express-validator";
import UserModel from "../models/user.model.js";

console.log('Continuo en controlador de perfil')

export const UpdateProfile = async(req, res) => {
    try {
        const {id} =  req.params;
        const profileData = matchedData(req)
        const profile = await UserModel.findByIdAndUpdate(id, profileData, {new: true})
        res.status(200).json({
            ok:true,
            msg:"Perfil actualizado",
            profile
        });

    } catch (error) {
        console.log(`Error en metodo put profile ${error}`)
        return res.status(500).json({
            ok:false,
            msg:"Error interno de servidor"
        })
    }
};

export const getProfileById = async(req, res) => {
    try {
    } catch (error) {
         console.log(`Error en metodo get profile ${error}`)
        return res.status(500).json({
            ok:false,
            msg:"Error interno de servidor"
        })
    }
}