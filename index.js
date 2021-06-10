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

//importamos helpers de forma global 
const helpers = require('./helpers')


//Crear la conexion a la base de datos
const db = require('./config/db');

//Importar el modelo
require('./models/Proyectos');
require('./models/Tareas');

db.sync()
    .then(() => console.log('conectado al servidor'))
    .catch(error => console.log(error));

//crear una app de express
const app = express();

//agregamos express validator a toda la aplicacion
app.use(expressValidator());

//donde cargar los archivos estaticos
app.use(express.static('public'));


//habilitar pug
app.set('view engine', 'pug');

//agregar la carpeta de las vistas
app.set('views', path.join(__dirname, './views'));

// pasar vardump a la app 
app.use((req, res, next) => {
    res.locals.vardump = helpers.vardump;
    next();
});

//Aprendiendo middleware
//app.use((req, res,next)=>{
    //console.log('yo soy middleware');
    //next();
//});
//app.use((req, res, next)=>{
    //console.log('yo soy otre middleware');
    //next();
//});


//habilitar bodyParser para leer datos del formulario   
app.use(bodyParser.urlencoded({extended: true}));

app.use('/', routes());

app.listen(3000);
