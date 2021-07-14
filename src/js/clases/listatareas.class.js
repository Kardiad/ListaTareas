export class ListaTareas{
    constructor(){
        this.listaTareas = [];
        this.key = 'tarea';
    }

    tareasHTML(tarea, ul){
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
    eliminarTarea(id, target, ul){
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
    cargarLocal(ul){
        if(localStorage.getItem(this.key)){
           this.listaTareas = JSON.parse(localStorage.getItem(this.key));
           this.listaTareas.forEach(tarea => {
                this.tareasHTML(tarea, ul)
           })
        }else{
            return;
        }
    }
}