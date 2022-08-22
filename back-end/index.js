const express = require('express');
const morgan = require('morgan');
const multer = require('multer');   // es un middleware para express
const path = require('path');
const cors = require('cors');

// console.log(process.env.NODE_ENV); 
if (process.env.NODE_ENV == 'development'){
    require('dotenv').config(); // se requiere el modulo dotenv para poder leer el archivo .env de la carpeta principal
}                                   //  que contiene la direccion de la base de datos para desarrollo
/*                            //  si estamos en produccion se utiliza otro archivo env  */                            

//// initializations  ////
const app = express(); // para iniciar el servidor
require('./database.js');

// settings                                 // en el servidor heroku seria la variable de configuracion  ó variable de ambiente
app.set('port', process.env.PORT || 3000);    // utiliza el puerto del archivo .env ó el 3000  

// middlewares //
app.use(morgan('dev')); // registra las solicitudes http (hechas al servidor)

// configuracion de almacenamiento con multer
const storage = multer.diskStorage({
    destination: path.join(__dirname, 'public/uploads'), // __dirname con 2 guiones bajos
    filename(req, file, cb){
        // null significa que no hubo error
        // new Date().getTime para usar los milisegundos como nombre del archivo de imagen
        // path.extname(file.originalname) para obtener la extension del archivo de imagen 
        cb(null, new Date().getTime() + path.extname(file.originalname) );
    }
});

app.use(multer({storage}).single('image')); // single() para indicar uploads de a una sola imagen
                                            // image es el input tipo file del html

app.use(express.urlencoded({extended: false})); // para interpretar los datos del formulario html como si fuera json
app.use(express.json()); // para entender los archivos json
app.use(cors());        //  permite que dos servidores se comuniquen.

//// routes  ///// cuando se entra a esta direccion de la pagina se abre el archivo books.js
// /api.books    direccion para obtener los datos de books
app.use('/api/books', require('./routes/books.js'));

//// static files ///// 
app.use(express.static(path.join(__dirname,'public'))); // hace posible acceder a los archivos de esta carpeta


//// start  the server ////
// para iniciar el servidor ir a la consola y ejecutar el index.js : >node backend/index.js 
// ir a localhost:3000 
app.listen(app.get('port'), () => {
    console.log('server on port ', app.get('port'));
});

