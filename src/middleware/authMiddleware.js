import { verifyToken } from "../helpers/jwt.helper.js";

export const authMiddleware = (req, res, next) => {
try {
// Obtengo token de la cookie
const token = req.cookies["token"];

if (!token) {
return res.status(401).json({ message: "No autenticado" });
}
// verifico token
const decoded = verifyToken(token);

// Almaceno datos del usuario
req.user = decoded;
next();
} catch (error) {
res.status(500).json({ message: "Error interno del servidor" });
}
};