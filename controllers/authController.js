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

// genera un token si el usuario es valido
exports.enviarToken = async (req, res) => {
    // verificar que el usuario existe
    const {email} = req.body
    const usuario = await Usuarios.findOne({where: { email }});

    // Si no existe el usuario
    if(!usuario) {
        req.flash('error', 'No existe esa cuenta');
        res.redirect('/reestablecer');
    }

    // usuario existe
    usuario.token = crypto.randomBytes(20).toString('hex');
    usuario.expiracion = Date.now() + 3600000;

    // guardarlos en la base de datos
    await usuario.save();

    // url de reset
    const resetUrl = `http://${req.headers.host}/reestablecer/${usuario.token}`;
//console.log(usuario.token)
    // Enviar el Correo con el Token

    //await enviarEmail.enviar({
        //usuario,
        //subject: 'Password Reset', 
        //resetUrl, 
        //archivo : 'reestablecer-password'
    //});

    // terminar
    //req.flash('correcto', 'Se envió un mensaje a tu correo');
    //res.redirect('/iniciar-sesion');
}
exports.resetPassword = async (req, res) => {
    const usuario = await Usuarios.findOne({
        where: {
            token: req.params.token
        }
    });

    // sino encuentra el usuario
    if(!usuario) {
        req.flash('error', 'No Válido');
        res.redirect('/reestablecer');
    }

    // Formulario para generar el password
    res.render('resetPassword', {
        nombrePagina : 'Reestablecer Contraseña'
    })
}


/* exports.resetPassword = async (req, res) =>{
    const usuario = await Usuarios.findOne({
        where: {
            token: req.param.token
        }
    });

    // Si no encuentre el usuario   
    if(!usuario){
        req.flash('error', 'No Valido');
        res.redirect('/reestablecer')
    }
    console.log(usuario)
} */