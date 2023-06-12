// Importing winston logger
import log from '../../config/winston';

// Importando el modelo
import ProjectModel from './project.model';

// Importando Httperrors

// Actions methods
// GET "/project"
const showDashboard = async (req, res) => {
  // Consultado todos los proyectos
  const user = await ProjectModel.find({}).lean().exec();
  // Enviando los proyectos al cliente en JSON
  log.info('Se entrega dashboard de proyectos');
  res.render('user/dashboardView', { user });
};

// GET "/project/add"
const add = (req, res) => {
  res.render('user/addView');
};

// POST "/project/add"
const addPost = async (req, res) => {
  // Rescatando la info del formulario
  const { errorData: validationError } = req;
  // En caso de haber error
  // se le informa al cliente
  if (validationError) {
    log.info('Se entrega al cliente error de validación de add Project');
    // Se desestructuran los datos de validación
    const { value: user } = validationError;
    // Se extraen los campos que fallaron en la validación
    const errorModel = validationError.inner.reduce((prev, curr) => {
      // Creando una variable temporal para
      // evitar el error "no-param-reassing"
      const workingPrev = prev;
      workingPrev[`${curr.path}`] = curr.message;
      return workingPrev;
    }, {});
    return res.status(422).render('user/register', { user, errorModel });
  }
  // En caso de que pase la validación
  // Se desestructura la información
  // de la peticion
  const { validData: user } = req;
  try {
    // Creando la instancia de un documento
    // con los valores de 'project'
    const savedUser = await ProjectModel.create(user);
    // Se contesta la información del proyecto al cliente
    log.info(`Se carga proyecto ${savedUser}`);
    log.info('Se redirecciona el sistema a /user');
    // Agregando mensaje de flash
    req.flash('successMessage', 'Usuario agregado con exito');
    return res.redirect('/user');
  } catch (error) {
    log.error(
      'ln 53 project.controller: Error al guardar proyecto en la base de datos'
    );
    return res.status(500).json(error);
  }
};

// GET "/project/edit/:id"
const edit = async (req, res) => {
  // Extrayendo el id por medio de los parametros de url
  const { id } = req.params;
  // Buscando en la base de datos
  try {
    log.info(`Se inicia la busqueda del proyecto con el id: ${id}`);
    const user = await ProjectModel.findOne({ _id: id }).lean().exec();
    if (user === null) {
      log.info(`No se encontro el proyecto con el id: ${id}`);
      return res
        .status(404)
        .json({ fail: `No se encontro el proyecto con el id: ${id}` });
    }
    // Se manda a renderizar la vista de edición
    log.info(`Proyecto encontrado con el id: ${id}`);
    return res.render('user/editView', { user });
  } catch (error) {
    log.error('Ocurre un error en: metodo "error" de user.controller');
    return res.status(500).json(error);
  }
};

// PUT "/project/edit/:id"
const editPut = async (req, res) => {
  const { id } = req.params;
  // Rescatando la info del formulario
  const { errorData: validationError } = req;
  // En caso de haber error
  // se le informa al cliente
  if (validationError) {
    log.info(`Error de validación del proyecto con id: ${id}`);
    // Se desestructuran los datos de validación
    const { value: project } = validationError;
    // Se extraen los campos que fallaron en la validación
    const errorModel = validationError.inner.reduce((prev, curr) => {
      // Creando una variable temporal para
      // evitar el error "no-param-reassing"
      const workingPrev = prev;
      workingPrev[`${curr.path}`] = curr.message;
      return workingPrev;
    }, {});
    return res.status(422).render('project/editView', { project, errorModel });
  }
  // Si no hay error

  const user = await ProjectModel.findOne({ _id: id });
  if (user === null) {
    log.info(`No se encontro documento para actualizar con id: ${id}`);
    return res
      .status(404)
      .send(`No se encontro documento para actualizar con id: ${id}`);
  }
  // En caso de encontrarse el documento se actualizan los datos
  const { validData: newProject } = req;
  user.name = newProject.name;
  user.apellido = newProject.apellido;
  user.rfc = newProject.rfc;
  user.curp = newProject.curp;
  user.entd = newProject.entd;
  user.name = newProject.name;
  try {
    // Se salvan los cambios
    log.info(`Actualizando proyecto con id: ${id}`);
    await user.save();
    req.flash('successMessage', 'Usuario editado con exito');
    return res.redirect(`/user/edit/${id}`);
  } catch (error) {
    log.error(`Error al actualizar proyecto con id: ${id}`);
    return res.status(500).json(error);
  }
};

// DELETE "/project/:id"
const deleteProject = async (req, res) => {
  // Extrayendo el id de los parametros
  const { id } = req.params;
  // Usando el modelo para borrar el proyecto
  try {
    const result = await ProjectModel.findByIdAndRemove(id);
    // Agregando mensaje de flash
    req.flash('successMessage', 'Proyecto borrado con exito');
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json(error);
  }
};

// Controlador user
export default {
  // Action Methods
  showDashboard,
  add,
  addPost,
  edit,
  editPut,
  deleteProject,
};
