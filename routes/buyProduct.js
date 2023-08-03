const { Router } = require('express');
const { check } = require('express-validator');
const { validate_Errors} = require('../middleware/validate-fields')
const { RequiereRole, Roles } = require('../middleware/Validate-rolls')
const { ValidateJWT } = require('../middleware/Validate-JWT')

const { 
    buyProductGET,
    buyProductPOST,
    buyProductPUT,
    buyProductDELETE
} = require('../controllers/buyProduct');

const router = Router();

router.get('/',ValidateJWT, buyProductGET);
router.post('/',[ValidateJWT,
       check('date', 'La fecha de compra es obligatorio').not().isEmpty(),
       check('dateExpiration', 'La fecha de vencimiento es obligatorio').not().isEmpty(),
       check('employee', 'El empleado es obligatorio').not().isEmpty(),
       check('provider', 'El proveedor es obligatorio').notEmpty(),
       check('product', 'El producto es obligatorio').not().isEmpty(),
       check('brandProduct', 'La marca de producto es obligatorio').not().isEmpty(),
       check('amountIncome', 'La cantidad es obligatoria').not().isEmpty(),
       check('unity', 'La unidad de medida es obligatoria').not().isEmpty(),
       check('price', 'El precio es obligatorio').not().isEmpty(),
       check('state', 'El estado del producto obligatoria').not().isEmpty(),
       validate_Errors
], buyProductPOST);

router.put('/:id', ValidateJWT, buyProductPUT);

router.delete('/:id', [ValidateJWT, RequiereRole(Roles.admin)], buyProductDELETE);

module.exports = router;
