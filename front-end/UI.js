import BookService from "./services/BookService.js";
import { format} from 'timeago.js'; // convierte el tiempo transcurrido desde la fecha pasada como parametro

const bookService = new BookService();

class UI {
    async renderBook() {
        const books = await bookService.getBooks();
        const booksCardContanier = document.getElementById("books-cards");
        booksCardContanier.innerHTML = "";
        books.forEach( book => {
            const div = document.createElement("div");
            div.className = '';                     // <img src='http://localhost:3000${book.imagePath}' si estamos en desarrollo en el localhost, si estamos en un servidor para produccion se deja asi   src='${book.imagePath}'
            div.innerHTML = `
                <div class="card m-2">
                    <div class="row">
                        <div class="col-md-4">
                            <img src='${book.imagePath}' alt="" class="img-fluid">   
                        </div>
                        <div class="col-md-8">
                            <div class="card-block px-2">
                                <h4 class="card-title">${book.title}</h4>
                                <p class="card-text">${book.author}</p>
                                <a href="#" class="btn btn-danger delete" _id="${book._id}">X</a>
                            </div>
                        </div>
                    </div>        
                    <div class="card-footer">
                        ${format(book.created_at)}
                    </div>
                </div>
            `;
            booksCardContanier.appendChild(div);
        });
    }

    async addNewBook(book) {
        const data = await bookService.postBook(book);
        this.clearBookForm();
        this.renderBook();
    }

    clearBookForm(){
        document.getElementById("book-form").reset();
        document.getElementById("imagen-cargada").classList.remove("imagen-cargada--visible");
    }

    renderMessage(message, colorMessage, secondsToRemove) {
        const div = document.createElement('div');
        div.textContent = message;
        div.className = `alert alert-${colorMessage} message`;
        const container = document.querySelector(".col-md-4");
        const bookForm = document.querySelector("#book-form");
        
        container.insertBefore(div, bookForm);  // inserta el div dentro del container, antes del book-form 

        setTimeout(() => {
            document.querySelector(".message").remove();  // elimina el nodo message 
        }, secondsToRemove);

    }


    async deleteBook(bookId) {
        await bookService.deleteBook(bookId);
        this.renderBook();
    }
}

export default UI;