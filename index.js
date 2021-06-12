//el import es la manera de instalar una
//dependecia con el EMC6 pero no es soportada
//por defecto en express
//import express from 'express';

//esta es la manera de importar la dependencia
//soportada por defecto en Express
const express = require('express');
const routes = require('./routes');
const path = require('path');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const flash = require('connect-flash')
const session = require('express-session')
const cookieParser = require('cookie-parser')
const passport = require('./config/passport')

//importamos helpers de forma global 
const helpers = require('./helpers')


//Crear la conexion a la base de datos
const db = require('./config/db');

//Importar el modelo
require('./models/Proyectos');
require('./models/Tareas');
//modelo de usuarios rompe todo si lo agrego aca
//require('./models/Usuarios');

db.sync()
    .then(() => console.log('conectado al servidor'))
    .catch(error => console.log(error));

//crear una app de express
const app = express();

//donde cargar los archivos estaticos
app.use(express.static('public'));

//habilitar pug
app.set('view engine', 'pug');

//habilitar bodyParser para leer datos del formulario   
app.use(bodyParser.urlencoded({extended: true}));

//agregamos express validator a toda la aplicacion
app.use(expressValidator());

//agregar la carpeta de las vistas
app.set('views', path.join(__dirname, './views'));

//agregar flash messages
app.use(flash())

app.use(cookieParser())

//las sesiones nos permiten navegar por
//distintas paginas sin tener que volvernos a autenticar
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false
}))

app.use(passport.initialize())
app.use(passport.session())

// pasar vardump a la app 
app.use((req, res, next) => {
    res.locals.vardump = helpers.vardump;
    res.locals.mensajes = req.flash();
    next();
});


app.use('/', routes());

app.listen(3000);
