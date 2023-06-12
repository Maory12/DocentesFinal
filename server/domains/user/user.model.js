// Importando Mongoose
import mongoose from 'mongoose';
// Desestructurando un generador de Schemas de mongoose
const { Schema } = mongoose;
// Creando el esquema
const userSchema = new Schema({
  nombre: {
    type: String,
    required: true,
  },
  apellodos: {
    type: String,
    required: true,
  },
  correo: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  configpass: {
    type: String,
    required: true,
  },
  numero: {
    type: String,
    required: true,
  },
  RFC: {
    type: String,
    required: true,
  },
  CURP: {
    type: String,
    required: true,
  },
  entd: {
    type: String,
    required: true,
  },
  fecha: {
    type: String,
    required: true,
  },
});
// Exportando la compilacon de ProjectSchema
// en un modelo de mongoose
export default mongoose.model('projects', userSchema);
