import Swal from 'sweetalert2';
import axios from 'axios';

const btnEliminar = document.querySelector('#eliminar-proyecto');

btnEliminar.addEventListener('click', () => {
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
            Swal.fire(
            'Borrado!',
            'Tu proyecto ha sido borrado.',
            'exito!'
            );
            //redireccionar al inicio
            setTimeout(() =>{
                window.location.href = '/'
            }, 3000)

        }
    })
})
