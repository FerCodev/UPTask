import axios from "axios";

const tareas = document.querySelector('.listado-pendientes')

if(tareas){

    tareas.addEventListener('click', e =>{
        if(e.target.classList.contains('fa-check-circle')){
            const icono = e.target;
            // Si no funciona, agragar otro parentElement
            const idTarea = icono.parentElement.dataset.tarea;
        
            //Request hacia /tareas/:id
            const url = `${location.origin}/tareas/${idTarea}`;
            axios.patch(url, { idTarea })
            .then(function(respuesta){
                if(respuesta.status === 200){
                    icono.classList.toggle('completo')
                }
            })
        }
    })
}



export default tareas;