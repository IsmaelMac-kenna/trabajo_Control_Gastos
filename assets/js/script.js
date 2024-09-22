let listaNombresGastos = [];
let listaValoresGastos = [];
let listaDescripcionesGastos = [];

/*ESTO LO ESTOY USANDO PARA CORREGIR UN ERROR DE SINTAXIS
jQuery.noConflict();
// Ahora puedes usar jQuery QUE SE ENCONTRABA EN LA LA LINEA 73
var $j = jQuery;
*/



// Esta funcion se invoca al momento de hacer click en el boton
function clickBoton() {
    let nombreGasto = document.getElementById('nombreGasto').value;
    let valorGasto = document.getElementById('valorGasto').value;
    //se genera un espacio nuevo en HTML para poder usar esta variable (esta en la fila 22 de HTML).
    let descripcionGasto = document.getElementById('descripcionGasto').value;
    // esta tambien esta condicionada por la edicion de HTML.
    listaDescripcionesGastos.push(descripcionGasto);
   
    console.log(nombreGasto);
    console.log(valorGasto);

    console.log(listaNombresGastos);

    listaNombresGastos.push(nombreGasto);
    listaValoresGastos.push(valorGasto);

    console.log(listaNombresGastos);
    console.log(listaValoresGastos);    
    //alert('Click de usuario');  
    actualizarListaGastos();
}

function actualizarListaGastos(){
    const listElementos = document.getElementById('listaDeGastos');
    const totalElementos = document.getElementById('totalGastos');
    let htmlLista = '';
    let totalGastos = 0;
    listaNombresGastos.forEach((elemento, posicion) => {
        const valorGasto = Number(listaValoresGastos[posicion]);
        //esta funcion fue agregada para mostrar la alerta por el valor maximo requerido.
        if(valorGasto > 150){ 
            alert('¡Se ha registrado un gasto mayor a 150 dólares!')
        }
        //ESTA SERIA LA NUEVA FUNCION
        htmlLista += `<li class="gasto-item" id="gasto-${posicion}">
        <div class="gasto-info">
            <span id="nombre-${posicion}">${elemento}</span> - 
            USD <span id="valor-${posicion}">${valorGasto.toFixed(2)}</span> - 
            <span id="descripcion-${posicion}">${listaDescripcionesGastos[posicion]}</span>
        </div>
        <div class="gasto-buttons">
            <button onclick="eliminarGasto(${posicion});">Eliminar</button>
            <button onclick="editarGasto(${posicion});" id="botonEditar-${posicion}">Modificar</button>
            <button onclick="guardarGasto(${posicion});" id="botonGuardar-${posicion}" style="display:none;">Guardar</button>
        </div>
    </li>`;
        //htmlLista += `<li>${elemento} - USD ${valorGasto.toFixed(2)}
        //    <button onclick="eliminarGasto(${posicion});">Eliminar</button>
        //            </li>`;
//calculamos el total de gastos
        totalGastos += Number(valorGasto);
        
    });
    listElementos.innerHTML = htmlLista;
    totalElementos.innerHTML = totalGastos.toFixed(2);
    limpiar();
}

function editarGasto(posicion) {
    // Cambiar los spans a inputs para editar el gasto
    const nombreGasto = document.getElementById(`nombre-${posicion}`);
    const valorGasto = document.getElementById(`valor-${posicion}`);
    const descripcionGasto = document.getElementById(`descripcion-${posicion}`);

    nombreGasto.outerHTML = `<input type="text" id="nombre-input-${posicion}" value="${nombreGasto.innerHTML}">`;
    valorGasto.outerHTML = `<input type="number" id="valor-input-${posicion}" value="${valorGasto.innerHTML}" step="0.01">`;
    descripcionGasto.outerHTML = `<input type="text" id="descripcion-input-${posicion}" value="${descripcionGasto.innerHTML}">`;

    // Mostrar el botón de guardar y ocultar el de modificar
    document.getElementById(`botonEditar-${posicion}`).style.display = 'none';
    document.getElementById(`botonGuardar-${posicion}`).style.display = 'inline';
}

function guardarGasto(posicion) {
    // Obtener los nuevos valores del input
    const nuevoNombre = document.getElementById(`nombre-input-${posicion}`).value;
    const nuevoValor = document.getElementById(`valor-input-${posicion}`).value;
    const nuevaDescripcion = document.getElementById(`descripcion-input-${posicion}`).value;

    // Actualizar las listas
    listaNombresGastos[posicion] = nuevoNombre;
    listaValoresGastos[posicion] = nuevoValor;
    listaDescripcionesGastos[posicion] = nuevaDescripcion;

    // Recalcular y actualizar la lista de gastos
    actualizarListaGastos();
}

function eliminarGasto(posicion) {
    listaNombresGastos.splice(posicion, 1);
    listaValoresGastos.splice(posicion, 1);
    listaDescripcionesGastos.splice(posicion, 1);

    actualizarListaGastos();
}


/*toda esta funcion espara para poder hacer la modificacion del gasto con la funcion modal pero no logre hacerla funcionar
noConflict();

function modificarGasto(posicion){
    // Obtener los datos del gasto a modificar
    const gasto = {
      nombre: listaNombresGastos[posicion],
      valor: listaValoresGastos[posicion],
      descripcion: listaDescripcionesGastos[posicion]
    };
  
    // Mostrar el modal (suponiendo que tienes un modal con ID 'modalEditar')
    $j('#modalEditar').modal('show');
  
    // Precargar los datos en los campos del modal
    $j('#nombreGastoModal').val(gasto.nombre);
    $j('#valorGastoModal').val(gasto.valor);
    $j('#descripcionGastoModal').val(gasto.descripcion);
  
    // Guardar los cambios al cerrar el modal
    $j('#modalEditar').on('hidden.bs.modal', function () {
      // Obtener los nuevos valores del modal
      const nuevoNombre = $j('#nombreGastoModal').val();
      const nuevoValor = $j('#valorGastoModal').val();
      const nuevaDescripcion = $j('#descripcionGastoModal').val();
  
      // Actualizar los arreglos de datos
      listaNombresGastos[posicion] = nuevoNombre;
      listaValoresGastos[posicion] = nuevoValor;
      listaDescripcionesGastos[posicion] = nuevaDescripcion;
  
      // Recalcular el total y actualizar la lista
      actualizarListaGastos();
    });
  }*/

//function modificarGasto(posicion) {
    // Eliminar el gasto
//    eliminarGasto(posicion);
    // Mostrar un mensaje o modal indicando que el gasto ha sido eliminado y que puede ser agregado nuevamente
//    alert('El gasto ha sido eliminado. Puedes agregarlo nuevamente con los nuevos valores.');
//  }

function limpiar(){
    document.getElementById('nombreGasto').value = '';
    document.getElementById('valorGasto').value = '';
    //TAMBIEN DEBIA AGREGAR ESTO PARA LIMPIAR ESTE NUEVOCAMPO 
    document.getElementById('descripcionGasto').value = '';
}

function eliminarGasto(posicion) {
    listaNombresGastos.splice(posicion,1);
    listaValoresGastos.splice(posicion,1);
    //esta linea tuve que agregar para la modificacion del gasto
    listaDescripcionesGastos.splice(posicion, 1);
      
    actualizarListaGastos();
}
