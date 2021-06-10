import Swal from 'sweetalert2';
import axios from 'axios';

const btnEliminar = document.querySelector('#eliminar-proyecto');

if(btnEliminar){
    btnEliminar.addEventListener('click', e => {
        const urlProyecto = e.target.dataset.proyectoUrl;

        //console.log(urlProyecto);

        Swal.fire({
            title: 'Estas seguro?',
            text: "Esta accion es irrevesible!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, borralo!',
            cancelButtonText: 'No, cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                //enviar peticion a axios 
                const url = `${location.origin}/proyectos/${urlProyecto}`;
                
                axios.delete(url, {params: {urlProyecto}})
                    .then(function(respuesta){
                        console.log(respuesta)
                    
                            Swal.fire(
                                'Borrado!',
                                respuesta.data,
                                'exito!'
                            );
                            //redireccionar al inicio
                            //setTimeout(() =>{
                            //    window.location.href = '/'
                            //}, 3000)
                    });
            }
        })
    })
}
export default btnEliminar;

