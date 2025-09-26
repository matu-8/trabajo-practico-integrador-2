import jwt from 'jsonwebtoken';

//1-Generacion de token 
export const generateToken = (payload) => {
    try {
        return jwt.sign(payload, process.env.JWT_SECRET,{
            expiresIn:'1Hr'
        });

    } catch (error) {
        throw new Error(`Error al generar el token ${error}`)
    }
};

//2-Verificacin de token
export const verifyToken = (token) => {
    try {
        return jwt.verify(token, process.env.JWT_SECRET)

    } catch (error) {
        
        throw new Error(`Error e verificar el token ${error}`); 
    }
}