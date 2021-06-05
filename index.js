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

//Crear la conexion a la base de datos
const db = require('./config/db');

//Importar el modelo
require('./models/Proyectos');

db.sync()
    .then(() => console.log('conectado al servidor'))
    .catch(error => console.log(error));

//crear una app de express
const app = express();

//donde cargar los archivos estaticos
app.use(express.static('public'));


//habilitar pug
app.set('view engine', 'pug');

//agregar la carpeta de las vistas
app.set('views', path.join(__dirname, './views'));

//habilitar bodyParser para leer datos del formulario   
app.use(bodyParser.urlencoded({extended: true}));

app.use('/', routes());

app.listen(3000);
