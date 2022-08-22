const { Router } = require('express');

// este metodo asincrono unlink del modulo fs-extra borra un archivo especificado en el path
// la otra opcion es usar fs , pero este modulo no es asincrono
const { unlink } = require('fs-extra');
const path = require('path');

const router = Router();
// router define las rutas del servidor
// API Rest es un conjunto de direcciones para enviar y recibir datos JSON

const Book = require('../models/Book.js');  // esquema del objeto libro

// get '/' es para peticion GET desde localhost/ 
//router.get('/', (request, response) => response.send('Hello world'));  se puede mandar texto pero se debe enviar un json porque las api restful envian json.
router.get('/', async (request, response) => {
    const books = await Book.find();                // db.Book.find()  Book son los libros dentro de mongoDB, la base de datos
    console.log(books);
    response.json(books);               // respuesta a la pagina web (le envia los libros)
});

router.post('/', async (req, res) => {
    const { title, author, isbn } = req.body;
    const imagePath = '/uploads/' + req.file.filename;

    const newBook = new Book({ title, author, isbn, imagePath });
    await newBook.save();
    res.json({ messege: "Book saved" });
});

router.delete('/:id', async (req, res) => {
    // console.log(req.params.id);
    const book = await Book.findByIdAndDelete(req.params.id); // busca y borra el libro con el id indicado, no es necesario guardar el libro en un variable
    //console.log("Book", book);
    try {
        unlink(path.resolve('./back-end/public' + book.imagePath));  // este metodo borra el archivo pasado como parametro
    }
    catch {
        (error) => {
            console.log("No se puedo borrar la imagen");
            console.log(error);
        }
    }
    res.json({ messege: "Book deleted" });
});

module.exports = router;
