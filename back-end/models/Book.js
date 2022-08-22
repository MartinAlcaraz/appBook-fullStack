// se utilizan los metodos schema y model de modulo mongoose
const {Schema, model} = require('mongoose');

// esquema de los libros de la base de datos
const bookSchema = new Schema ({
    title: {type: String, required: true},
    author: {type: String, required: true},
    isbn: {type: String, required: true},
    imagePath: {type: String},
    created_at: {type: Date, default: Date.now()}
});
// se exporta el modelo del libro de ('nombre Book', el esquema creado)


module.exports = model('Book', bookSchema);
