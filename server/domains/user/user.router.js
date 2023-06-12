// Importando el Router de Express
import { Router } from 'express';

// Importando factory de validación
import ValidateFactory from '../../services/validateFactory';
// Importando el validador de proyectos
import userValidator from './user.validator';

// Importando el controlador
import userController from './user.controller';

// Creando una isntancia del enrutador
const router = new Router();

// Enrutamos
// GET '/user/login'
router.get('/login', userController.login);
router.post('/register', userController.addPost);
router.post(
  '/login',
  ValidateFactory({
    schema: userValidator.userSchema,
    getObject: userValidator.getUser,
  }),
  userController.lo
);

// GET '/user/logout'
router.get('/logout', userController.logout);

// GET '/user/register'
router.get('/register', userController.register);

// Exporto este tramo de ruta
export default router;
