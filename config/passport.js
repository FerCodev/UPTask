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
                const usurio = await Usuarios.find({
                    where: {
                        email: email
                    }
                })
                //el usuario existe pero el password no es correcto
                if(!Usuarios.verificarPassword(password)){}
            } catch (error) {
                //ese usuario no existe
                return done(null, false, {
                    message : 'esa cuenta no existe'
                })
            }
        }
    )
)