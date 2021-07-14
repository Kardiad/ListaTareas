class Tareaa {
    constructor(tarea){
        this.tarea = tarea;
        this.id= new Date().getTime();
        this.completado = false;
        this.fecha = new Date();
    }
}
class ListaTareas{
    constructor(){
        this.listaTareas = [];
        this.key = 'tarea';
    }

    tareasHTML(tarea){
        const tareaHTML = `<li class="${(tarea.completado)?'completed':''}" data-id="${tarea.id}">
        <div class="view">
            <input class="toggle" type="checkbox" ${(tarea.completado)?'checked':''}>
            <label>${tarea.tarea}</label>
            <button class="destroy"></button>
        </div>
        <input class="edit" value="Create a TodoMVC template">
        </li>`;
        ul.innerHTML += tareaHTML;
    }
    anadirTarea(tarea){
        this.listaTareas.push(tarea);
    }
    eliminarTarea(id, target){
        this.listaTareas = this.listaTareas.filter( ( ele ) => id != ele.id);
        ul.removeChild(target);
       
    }
    eliminarCompletados(){
        this.listaTareas = this.listaTareas.filter( ( tarea ) => tarea.completado === false );
    }
    marcarCompletado(id){
        for(const tarea of this.listaTareas){
            if(tarea.id == id){
                tarea.completado = !tarea.completado;
                break;
            }
        }
    }
    guardarLocal(nombre, id, status){
            if(nombre && id){
                this.listaTareas.forEach(ele=>{
                    if(ele.id === id){
                        ele.tarea = nombre;
                        localStorage.setItem(this.key, JSON.stringify(this.listaTareas));
                    }
                })
            }else{
                localStorage.setItem(this.key, JSON.stringify(this.listaTareas));
            }
           
            if(status===1){
                localStorage.setItem(this.key, JSON.stringify(this.listaTareas));
            }else{
                localStorage.setItem(this.key, JSON.stringify(this.listaTareas));
            }
    }
    cargarLocal(){
        if(localStorage.getItem(this.key)){
           this.listaTareas = JSON.parse(localStorage.getItem(this.key));
           this.listaTareas.forEach(tarea => {
                this.tareasHTML(tarea)
           })
        }else{
            return;
        }
    }
}
const totales = () =>{
    const totalPdte = listaTareas.listaTareas.filter((tarea) => tarea.completado === false);
    document.querySelector('strong').innerHTML = totalPdte.length;
}
const mostrar = () =>{
    if(listaTareas.listaTareas.length === 0){
        document.querySelector('.footer').classList.add('hidden');
    }else{
        document.querySelector('.footer').classList.remove('hidden');
    }
}
const mostrarCompletados = () =>{
    const totalPdte = listaTareas.listaTareas.filter((tarea) => tarea.completado === true);
    if(totalPdte.length>0){
        document.querySelector('.clear-completed').classList.remove('hidden');
    }else{
        document.querySelector('.clear-completed').classList.add('hidden');
    }
}
document.querySelector('strong').innerHTML = 0;
const ul = document.querySelector('.todo-list');
const listaTareas = new ListaTareas(); 
listaTareas.cargarLocal();
totales();
mostrar();
mostrarCompletados();
let tareas;
const ulv = document.querySelectorAll('.filters');
const nuevaTarea = document.querySelector('.new-todo');
nuevaTarea.addEventListener('keypress', (event)=>{
    if(event.key === 'Enter' && nuevaTarea.value.trim().length>0){
        tareas = new Tareaa (nuevaTarea.value);
        listaTareas.anadirTarea(tareas);
        listaTareas.tareasHTML(tareas);
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
            listaTareas.eliminarTarea(tareaID, tareaSeleccionada);
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
        for(ud of ul.children){
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
