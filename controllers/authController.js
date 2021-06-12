const passport = require('passport')
const Usuarios = require('../models/Usuarios')

const crypto = require('crypto')

exports.autenticarUsuario = passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/iniciar-sesion',
    failureFlash: true,
    badRequestMessage: 'Ambos Campos son Obligatorios'
})

//funcion para revisar si el usuario esta logeado o no
exports.usuarioAutenticado = (req, res, next) => {
    // si el usuario esta autenticado, adelante
    if(req.isAuthenticated()){
        return next()
    }
    //sino esta autentica , redirigir al form
    return res.redirect('/iniciar-sesion')
}

//funcion para cerrar sesion
exports.cerrarSesion = (req, res) => {
    req.session.destroy(() => {
        //al cerrar sesion no lleva al login
        res.redirect('/iniciar-sesion')

    })
}

//genera un token si el usuario es valido 
exports.enviarToken = async (req, res) => {
    //verificar que un usuario existe
    const usuario = await Usuarios.findOne({
        where: {
            email: req.body.email
        }
    }) 
    //Si no hay usuario 
    if(!usuario){
        req.flash('error', 'No existe esa cuenta')
        res.redirect('reestablecer');
        /* res.render('reestablecer', {
            nombrePagina: 'Reestablecer tu Password',
            mensajes: req.flash()
        }) */
    }
    // Usuario existe 
    usuario.token = crypto.randomBytes(20).toString('hex')
    
    //expiracion
    usuario.expiracion = Date.now() + 3600000
    
    // Guardarlos en la base de datos
    await usuario.save();

    //url de reset
    //const reqq = req.headers.host
    //const usertToken = usuario.token
    const resetUrl = `http://${req.headers.host}/reestablecer/${usuario.token}`
    console.log(resetUrl)
}
exports.resetPassword = async (req, res) =>{
    res.json(req.params.token)
}