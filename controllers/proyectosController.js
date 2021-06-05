const Proyectos = require('../models/Proyectos')

exports.proyectosHome = (req, res) => {
    res.render('index', {
        nombrePagina : 'Proyectos'
    });
}
exports.formularioProyecto = (req, res) =>{
    res.render('nuevoProyecto', {
        nombrePagina: 'Nuevo Proyecto'
    });
}
exports.nuevoProyecto = async (req, res) =>{
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
            errores
        })
    } else {
        //no hay errores 
        //Insertar en la BD
        const proyecto = await Proyectos.create({ nombre });
        res.redirect('/');      
    }
}