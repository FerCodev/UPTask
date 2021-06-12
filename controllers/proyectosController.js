const Proyectos = require('../models/Proyectos')
const slug = require('slug');
const Tareas = require('../models/Tareas')

exports.proyectosHome = async(req, res) => {
    console.log(res.locals.usuario);

    const proyectos = await Proyectos.findAll();

    res.render('index', {
        nombrePagina : 'Proyectos',
        proyectos
    });
}
exports.formularioProyecto = async (req, res) =>{
    const proyectos = await Proyectos.findAll();
    res.render('nuevoProyecto', {
        nombrePagina: 'Nuevo Proyecto',
        proyectos
    });
}
exports.nuevoProyecto = async (req, res) =>{
    const proyectos = await Proyectos.findAll();
    //enviar a la consola lo que el usuiario escriba
    //console.log(req.body);

    //Validar que el campo contenga informacion
    const  nombre  = req.body.nombre;
    
    let errores = [];

    if(!nombre){
        errores.push({'texto': 'Agrega un Nombre al Proyecto'})
    }

    //si hay errores 
    if(errores.length > 0) {
        res.render('nuevoProyecto', {
            nombrePagina : 'Nuevo Proyecto',
            errores,
            proyectos
        })
    } else {
        //no hay errores 
        //Insertar en la BD
        const url = slug(nombre).toLowerCase()
        const proyecto = await Proyectos.create({ nombre, url });
        res.redirect('/');      
    }
}

exports.proyectoPorUrl = async (req, res, next) => {
    
    const proyectosPromise = Proyectos.findAll();

    const proyectoPromise = Proyectos.findOne({
        where: {
            url: req.params.url
        }
    });
    
    const [proyectos, proyecto] = await Promise.all([proyectosPromise, proyectoPromise]);
    
    //Consultar tareas del proyecto actual
    const tareas = await Tareas.findAll({
        where: {
            proyectoId : proyecto.id
        },
        include: [
            { model: Proyectos }
        ]
    });

    if(!proyecto) return next();

    //render a la vista
    res.render('tareas', {
        nombrePagina : 'Tareas del Proyecto',
        proyecto,
        proyectos,
        tareas
    });
}

exports.formularioEditar = async (req, res) => {

    const proyectosPromise = Proyectos.findAll();

    const proyectoPromise = Proyectos.findOne({
        where: {
            id: req.params.id
        }
    });
    
    const [proyectos, proyecto] = await Promise.all([proyectosPromise, proyectoPromise]);

    // render a la vista 
    res.render('nuevoProyecto', {
        nombrePagina : 'Editar Proyecto',
        proyectos,
        proyecto
    }); 
}
exports.actualizarProyecto = async (req, res) =>{
    await Proyectos.findAll();
    
    //Validar que el campo contenga informacion
    const  nombre  = req.body.nombre;
    
    let errores = [];

    if(!nombre){
        errores.push({'texto': 'Agrega un Nombre al Proyecto'})
    }

    //si hay errores 
    if(errores.length > 0) {
        res.render('nuevoProyecto', {
            nombrePagina : 'Nuevo Proyecto',
            errores,
            proyectos
        })
    } else {
        //no hay errores 
        //Insertar en la BD
        await Proyectos.update(
            { nombre: nombre},
            {where: {id: req.params.id}}
        );
        res.redirect('/');      
    }
}

exports.eliminarProyecto = async (req, res, next ) => {
    //req (contiene la informacion) y podes usar query o params
    //console.log(req.query)
    const {urlProyecto} = req.query;
    const resultado = await Proyectos.destroy({
        where: {url : urlProyecto}
    });
    if(!resultado){
        return next();
    }
    res.status(200).send('Proyecto Eliminado Correctamente')
}
