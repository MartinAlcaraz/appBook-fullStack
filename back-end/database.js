
const mongoose = require('mongoose');  // mongoose se conecta a la base de datos

// process.env.MONGODB_URI  // lee el archivo MONGODB_URI que contiene la direccion de la base de datos
// console.log(process.env.MONGODB_URI); 

mongoose.connect( process.env.MONGODB_URI ,{  // se conecta a la base de datos javascriptdb
    useNewUrlParser: true                       // simple configuracion
})
.then(db => console.log('DB is connected'))
.catch(err => console.error("We have a problem: ",err));

