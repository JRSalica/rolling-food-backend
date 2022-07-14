const mongoose = require('mongoose');
const app = require('./app');

require('dotenv').config();
const connectionString = process.env.DB_URI;
const port = process.env.PORT || 3400;

async function initializeServer(){
  try{
    console.info('Intentando conectar a MongoDB...');
    await mongoose.connect(connectionString);
    console.info('\u001b[1;32m Conexion a la DB exitosa.');

    app.listen(port, () =>{
      console.info(`\u001b[1;34m Servidor escuchando en el puerto: ${port}`);
    });
  } catch(error){
    console.info('\u001b[1;31m Error al iniciar el servidor. Error: ', error.message);
  }
}

initializeServer();