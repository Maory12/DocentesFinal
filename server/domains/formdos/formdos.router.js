// Importando el Router de Express
import { Router } from 'express';

// Importando el controlador
import formdosController from './formdos.controller';

// Creando una isntancia del enrutador
const router = new Router();

// Enrutamos
// GET '/'
// GET '/home'
// GET '/index
router.get('/formuno', formdosController.formuno);

router.get('/formexperiencia', formdosController.formexperiencia);

router.get('/formdeclaracion', formdosController.formdeclaracion);

router.get('/formaltruno', formdosController.formaltruno);


// Exporto este tramo de ruta
export default router;