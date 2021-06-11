const Proyectos = require('../models/Proyectos')
const Tareas = require('../models/Tareas')

exports.agregarTarea = async (req, res) => {
    // Obtener el proyecto actua;
    const proyecto = await Proyectos.findOne({
        where: {url: req.params.url}
    })

    //Leer el valor del input
    const {tarea} = req.body;
    // Estado 0 = incompleto i Id de proyecto
    const estado = 0;
    const proyectoId = proyecto.id;

    //Insertar en la base de datos
    const resultado = await Tareas.create({ tarea, estado, proyectoId})

    if(!resultado){
        return next();
    }
    res.redirect(`/proyectos/${req.params.url}`)
}