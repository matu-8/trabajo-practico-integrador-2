export const logout = async(req, res)=>{
    try {
        res.clearCookie("token")
        return res.json({
            ok:true,
            msg:"Se ha cerrado la sesion"
        })
    } catch (error) {
        console.log(`>>> ! error en logout: ${error}`)
        res.status(200).json({
            ok:false,
            msg:"Ha ocurrido un error en logout"
        });
    }
}