import bcrypt from 'bcrypt';

// 3.1-Funcion que codifica la contraseña (hasheo de contraseña)
export const hashPassword = async(password) => { //creo una funcion a la que se le pasa la contraseña enviada en la peticion
    const saltRounds = 10;  //defino en una constante, la cantidad de "vueltas" o rounds que hará el algoritmo para codificar la contraseña en código base64
    return bcrypt.hash(password, saltRounds) //con la funcion de bcrypt "hash", hago la codificacion pasandole la contraseña y el numero de vueltas
}