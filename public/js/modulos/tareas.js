const tareas = document.querySelector('.listado-pendientes')

if(tareas){

    tareas.addEventListener('click', e =>{
        if(e.target.classList.contains('fa-check-circle')){
            const icono = e.target;
            // Si no funciona, agragar otro parentElement
            const idTarea = icono.parentElement.dataset.tarea;
        
            console.log(idTarea)
        }
    })
}



export default tareas;
