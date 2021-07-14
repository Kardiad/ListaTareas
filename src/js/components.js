import {Tareaa} from './clases/index';
import { listaTareas } from '../index';
const ul = document.querySelector('.todo-list');
document.querySelector('strong').innerHTML = 0;
const nuevaTarea = document.querySelector('.new-todo');
export const totales = () =>{
    const totalPdte = listaTareas.listaTareas.filter((tarea) => tarea.completado === false);
    document.querySelector('strong').innerHTML = totalPdte.length;
}
export const mostrar = () =>{
    if(listaTareas.listaTareas.length === 0){
        document.querySelector('.footer').classList.add('hidden');
    }else{
        document.querySelector('.footer').classList.remove('hidden');
    }
}
export const mostrarCompletados = () =>{
    const totalPdte = listaTareas.listaTareas.filter((tarea) => tarea.completado === true);
    if(totalPdte.length>0){
        document.querySelector('.clear-completed').classList.remove('hidden');
    }else{
        document.querySelector('.clear-completed').classList.add('hidden');
    }
}
nuevaTarea.addEventListener('keypress', (event)=>{
    if(event.key === 'Enter' && nuevaTarea.value.trim().length>0){
        let tareas = new Tareaa (nuevaTarea.value);
        listaTareas.anadirTarea(tareas);
        listaTareas.tareasHTML(tareas, ul);
        nuevaTarea.value='';
        listaTareas.guardarLocal();
        totales();
        mostrar();
    }
});
ul.addEventListener('click', (event)=>{
    const tareaSeleccionada = event.target.parentElement.parentElement;
    const tareaID = tareaSeleccionada.dataset.id;
        if(event.target.localName === 'button'){
            listaTareas.eliminarTarea(tareaID, tareaSeleccionada, ul);
            listaTareas.guardarLocal();
            totales();
            mostrar();
        }
        if(event.target.localName === 'input'){
            listaTareas.marcarCompletado(tareaID);
            tareaSeleccionada.classList.toggle('completed');
            listaTareas.guardarLocal();
            totales();
            mostrar();
            mostrarCompletados();
        
        }
});
ul.addEventListener('dblclick', (event)=>{
    const li = event.target.parentElement.parentElement;
    const ids = parseInt(li.getAttribute('data-id'));
    if(event.target.localName === 'label' && li.getAttribute('class')!=='completed'){
        const texto = event.target.innerHTML;
        const input = event.target;        
        input.innerHTML = `<input type="text" class="edito" value="${texto}">`;
        const nombre = document.querySelector('.edito').value;
        window.addEventListener('click', (event)=>{
            const etiqueta = event.target.localName;
            const discriminar = event.target.getAttribute('class');
            if(etiqueta!='input' || discriminar !=='edito'){
                input.innerHTML = `${nombre}`;
            }
        })
        document.querySelector('.edito').addEventListener('keypress', (event)=>{
            if(event.key === 'Enter'){
                listaTareas.guardarLocal(nombre, ids);
                input.innerHTML = `${nombre}`;
            }
        });
    }
})
const filtros = document.querySelectorAll('.filtro');
filtros.forEach(element => {
    element.addEventListener('click', (evento)=>{
        filtros.forEach((marcos) =>{
            marcos.classList.remove('selected');
        })
        evento.target.classList.add('selected');
        const texto = evento.target.text;
        for(const ud of ul.children){
            switch(texto){
                case 'Pendientes':
                    if(ud.classList.contains('completed')){
                        ud.classList.add('hidden');
                    }else{
                        ud.classList.remove('hidden')
                    }
                    break;
                case 'Completados':
                    if(!ud.classList.contains('completed')){
                        ud.classList.add('hidden');
                    }else{
                        ud.classList.remove('hidden')
                    }
                    break;
                case 'Todos':
                    if(ud.classList.contains('completed')){
                        ud.classList.remove('hidden');
                    }else{
                        ud.classList.remove('hidden');
                    }
                    break;
            }
        }
    })   
});
document.querySelector('.clear-completed').addEventListener('click', ()=>{
    listaTareas.eliminarCompletados();
    for(let i=ul.children.length-1; i>=0; i--){
        const elemento = ul.children[i];
        if(elemento.classList.contains('completed')){
            elemento.remove();
        }
    }
    listaTareas.guardarLocal('','',1);
    mostrar();
    mostrarCompletados();
});