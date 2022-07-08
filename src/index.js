const mongoose = require('mongoose');
const app = require('./app');

const dotenv = require('dotenv');
dotenv.config();

const connectionString = process.env.DB_URI;
const port = process.env.PORT || 3400;

async function initializeServer(){
  try{
    console.log('Intentando conectar a MongoDB...');
    await mongoose.connect(connectionString);
    console.log('\u001b[1;32m Conexion a la DB exitosa.');

    app.listen(port, () =>{
      console.log(`\u001b[1;34m Servidor escuchando en el puerto: ${port}`);
    });
  } catch(error){
    console.log('\u001b[1;31m Error al iniciar el servidor. Error: ', error.message);
  }
}

initializeServer();