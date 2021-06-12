const passport = require('passport')


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