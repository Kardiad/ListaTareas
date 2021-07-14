import './css/style.css';
import {ListaTareas} from './js/clases/listatareas.class';
import { totales, mostrar, mostrarCompletados } from './js/components';
const ul = document.querySelector('.todo-list');
export const listaTareas = new ListaTareas(); 
listaTareas.cargarLocal(ul);
totales();
mostrar();
mostrarCompletados();