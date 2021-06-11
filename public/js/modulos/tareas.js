import axios from "axios";
import Swal from "sweetalert2";
import {actualizarAvance} from '../funciones/avance';


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
                
                    actualizarAvance()
                }
            })
        }
        if(e.target.classList.contains('fa-trash')){
            
            const tareaHTML = e.target.parentElement;
            const idTarea = tareaHTML.dataset.tarea;

            //console.log(idTarea)
            //console.log(tareaHTML)
            Swal.fire({
                title: 'Deseas borrar esta tarea?',
                text: "Esta accion es irrevesible!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Si, borralo!',
                cancelButtonText: 'No, cancelar'
            }).then((result) => {
                if (result.isConfirmed) {
                    //console.log('Eliminando')
                    const url = `${location.origin}/tareas/${idTarea}`;
                    //Enviar el Delete por medio de Axios
                    axios.delete(url , { params: { idTarea }})
                        .then(function(respuesta){
                            if(respuesta.status === 200){
                                tareaHTML.parentElement.removeChild(tareaHTML)
                                
                                // Opcional una alerta
                                Swal.fire(
                                    'Tarea Eliminada',
                                    respuesta.data,
                                    'success'
                                )
                                actualizarAvance()
                            }
                        })
                }
            })
        }
    })
}

export default tareas;
