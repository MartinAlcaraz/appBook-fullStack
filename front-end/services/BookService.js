class BookService {

    constructor() {      
        this.URI = '/api/books';                //  si estamos en un servidor para produccion se deja asi   = '/api/books'
        //this.URI = 'http://localhost:3000/api/books';     //  si estamos en desarrollo en el localhost
    }
    async getBooks() {
        const response = await fetch(this.URI);
        const books = await response.json();
        //console.log(books);
        return books;
    }

    async postBook(book) {
        const res = await fetch(this.URI, {
            method: "POST",
            body: book
        });
        const data = await res.json();
        console.log(data);
    }

    async deleteBook(bookId) {
        const res = await fetch(`${this.URI}/${bookId}`, {
            headers: {
                'Content-Type': 'application/json'
            },
            method: "DELETE"
        });
        const data = await res.json();
        console.log(data);
    }
}
module.exports = BookService;