const { Router } = require('express');
const { check } = require('express-validator');
const { validate_Errors} = require('../middleware/validate-fields')
const { RequiereRole, Roles } = require('../middleware/Validate-rolls')
const { ValidateJWT } = require('../middleware/Validate-JWT')

const { 
    concentradoGET,
    concentradoPOST,
    concentradoPUT,
    concentradoDELETE
} = require('../controllers/concentrado');

const router = Router();

router.get('/',ValidateJWT, concentradoGET);
router.post('/',[ValidateJWT,
       check('dateCompra', 'La fecha y hora es obligatorio').not().isEmpty(),
       check('marcaConcentrado', 'La marca de concentrado es obligatorio').notEmpty(),
       check('tipoConcentrado', 'El tipo de concentrado es obligatorio').not().isEmpty(),
       check('cantidadConcentrado', 'La cantidad de concentrado es obligatorio').not().isEmpty(),
       check('provideer', 'El proveedor es obligatorio').not().isEmpty(),
       check('precio', 'El precio es obligatoria').not().isEmpty(),
       check('cantProteina', 'La cantidad de proteína es obligatoria').not().isEmpty(),
       check('fechaVencimiento', 'La fecha de vencimiento es obligatoria').not().isEmpty(),
       validate_Errors
], concentradoPOST);

router.put('/:id', ValidateJWT, concentradoPUT);

router.delete('/:id', [ValidateJWT, RequiereRole(Roles.admin)], concentradoDELETE);

module.exports = router;
