// Importando biblioteca de validacion
import * as Yup from 'yup';

import log from '../../config/winston';

// Creando un esquema de validación para el proyecto
const projectSchema = Yup.object().shape({
  name: Yup.string().required('Se requiere de un Nombre'),
  apellido: Yup.string().required('Se requiere de un Apellido'),
  RFC: Yup.string().required('Se requiere de un RFC'),
  CURP: Yup.string().required('Se requiere de un CURP'),
  entd: Yup.string().required('Se requiere de un entd'),
});

// Creando el extractor de datos de la petición
const getProject = (req) => {
  // Extrayendo datos de la petición
  const { name, apellido, rfc, curp, entd } = req.body;
  log.info(
    `Se extraen datos de la petición: name ${name}, apellido: ${apellido},apellido: ${apellido},rfc: ${rfc},curp: ${curp},entd: ${entd}`
  );
  // Regresando el objeto proyecto
  return {
    name,
    apellido,
    rfc,
    curp,
    entd,
  };
};

export default {
  projectSchema,
  getProject,
};
