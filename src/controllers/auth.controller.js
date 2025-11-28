import { matchedData } from "express-validator";
import UserModel from "../models/user.model.js";
import { comparePassword, hashPassword } from "../helpers/hash.helper.js";
import { generateToken } from "../helpers/jwt.helper.js";


export const register = async(req, res)=>{
    console.log('llegue al registro')
    try {
        const validatedData = matchedData(req)  //extraigo la informacion validada de la peticion                                                           // guardé al informacion validada, accedo a contraseña y hago el proceso de hash,
        validatedData.password = await hashPassword(validatedData.password) //De la constante donde 
                                                                        //  después lo guardo de nuevo en el valor de la contraseña
        console.log(validatedData.password)
        const user = await UserModel.create(validatedData)
        console.log(`>>> prueba`, validatedData)
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
        console.log(validatedData)
        const {username, password} = validatedData
        const originPassword = password
        // console.log(`>>> prueba en login: ${username}, ${password}`)
        const user = await UserModel.findOne({username:username})
        if(!user){
            return res.status(400).json({
                ok:false,
                msg:"Las credenciales ingresadas son invalidas"
            })
        }
        //console.log(`prueba de contrasenas ${originPassword}, ${user.password}`)
      const validatePassword = await comparePassword(originPassword, user.password)
      if(!validatePassword){
        return res.status(400).json({
            ok:false,
            msg:"Las credenciales ingresadas son invalidas"
        })
      }
      const token = generateToken({
        id:user._id,
        username: user.username,
        role:username.role,
    });
    
      res.cookie("token", token,{
        httpOnly:true,
        maxAge: 1000*60*60
      });

      return res.status(200).json({
        ok:true,
        msg:"Ha iniciado sesion"
      })

    } catch (error) {
         console.log(`>>> ! ha ocurrido un error en login ${error}`)
        return res.status(500).json({
            ok:false,
            msg:`Error interno de servidor`
        }) 
    }
}


