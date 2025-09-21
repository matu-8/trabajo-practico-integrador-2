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
        return res.status(500).json({
            ok:false,
            msg:`Error interno de servidor ${error}`
    });
    }
};

export const updatedUser = async(req, res)=>{
    try {
        const updatedUser = UserModel.findByIdAndUpdate({

        })
    } catch (error) {
        
    }
}