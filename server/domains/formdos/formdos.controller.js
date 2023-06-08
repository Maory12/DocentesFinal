// Actions methods
// GET "/"
// GET "/index"
const formuno = (req, res) => {
  res.render('fo/formuno');
};

// GET "/index"
const formexperiencia = (req, res) => {
res.render('fo/formexperiencia');
};

const formdeclaracion = (req, res) => {
res.render('fo/formdeclaracion');
};

const formaltruno = (req, res) => {
  res.render('fo/formaltruno');
  };


// Controlador Home
export default {
  formuno,
  formexperiencia,
  formdeclaracion,
  formaltruno,
};