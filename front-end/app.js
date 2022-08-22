
import './styles/app.css';
import UI from "./UI.js";

const inputImage = document.querySelector("[data-input-image]")
const imagenCargada = document.getElementById("imagen-cargada");
const ui = new UI();

// el evento DOMContentLoaded ocurre cuando se termina de cargar el DOM de la pagina
document.addEventListener('DOMContentLoaded', () => {
    ui.renderBook(); 
});

// capturar el evento de borrar una tarjeta
const cardsContainer = document.getElementById("books-cards");
cardsContainer.addEventListener("click", (e) => {

    if(e.target.classList.contains("delete")){
        const element = e.target;
        ui.deleteBook(element.getAttribute("_id"));
        ui.renderMessage("Libro eliminado", "danger", 2500);
    }
    e.preventDefault();

});

// captura los datos del formulario
document.getElementById('book-form').addEventListener('submit', e => {
    e.preventDefault();
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const isbn = document.getElementById('isbn').value;
    const image = document.getElementById('image').files;

    const formData = new FormData();  // este formData es equivalente al objeto Book
    formData.append('title', title);
    formData.append('author', author);
    formData.append('isbn', isbn);
    formData.append('image', image[0]);
    
    const ui = new UI();
    ui.addNewBook(formData);    
    ui.renderMessage("Libro agregado", "success", 2000);
});

// si se elige un archivo se carga en la etiqueta  <img>
inputImage.addEventListener('input', (event) => {
    if (event.target.files.length > 0) {
        cargarImagen(event);
    }
});

function cargarImagen(evento) {

    let file = evento.target.files[0];
    let reader = new FileReader();

    reader.onload = function (event) {
        imagenCargada.classList.add("imagen-cargada--visible");
        let imagen = event.target.result;
        imagenCargada.src = imagen;

        //let fondo = document.querySelector("#fondo");
        //fondo.classList.add("box-image__imagen-fondo--invisible");
    }

    // si existe un archivo y es una imagen
    if (file && file.type.match('image')) {
        reader.readAsDataURL(file);
    } else {
        //  si se carga un archivo y no es una imagen se borra la anteriormente cargada( si se habia cargado una antes) para mostrar el mensaje de error
        if (file !== undefined) {
            imagenCargada.classList.remove("imagen-cargada--visible");
            imagenCargada.src = "";
        }
    }
};
