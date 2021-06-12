const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy

//Hacer referencia al modelo donde vamos a autenticar
const Usuarios = require('../models/Usuarios')

//local strategy - Login con credenciales propias {usuario y password}
passport.use(
    new LocalStrategy(
        //por default LocalStrategy espera un usuario y password
        {
            usernameField: 'email',
            passwordField: 'password'
        },
        async (email, password, done) => {
            try {
                const usuario = await Usuarios.findOne({
                    where: {
                        email: email
                    }
                })
                //el usuario existe pero el password no es correcto
                if(!usuario.verificarPassword(password)){
                    return done(null, false, {
                        message : 'Password incorrecto'
                    })
                }
                // EL email existe y el password es correcto
                return done(null, usuario)
            } catch (error) {
                //ese usuario no existe
                return done(null, false, {
                    message : 'esa cuenta no existe'
                })
            }
        }
    )
)

// Serializar el usuiario 
passport.serializeUser((usuario, callback) => {
    callback(null, usuario)
})

// Des-serializar el usuario
passport.deserializeUser((usuario, callback) => {
    callback(null, usuario)
})

module.exports = passport;