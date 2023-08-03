const { Schema, model } = require('mongoose');

const SchemabuyProduct = new Schema({
    date: {
        type: String,
        required: [true, 'La fecha de compra es un campo requerido'],
    },

    dateExpiration: {
        type: String,
        required: [true, 'La fecha de vencimiento es un campo requerido'],
    },

    employee: {
        type: String,
        required: [true, 'El empleado es un campo requerido'],
    },
    
    provider: {
        type: String,
        required: [true, 'El proveedor es un campo requerido'],
    },

    product: {
        type: String,
        required: [true, 'El producto es un campo requerido'],
    },
    brandProduct: {
        type: String,
        required: [true, 'La marca es un campo requerido'],
    },
    amountIncome: {
        type: Number,
        required: [true, 'La cantidad es un campo requerido'],
    },

    unity: {
        type: String,
        required: [true, 'La unidad de medida es un campo requerido'],
    },

    price: {
        type: Number,
        required: [true, 'El precio total es un campo requerido'],
    },

    state: {
        type: String,
        required: [true, 'El estado del producto es un campo requerido'],
    },

    
});

//Creamos un metodo sobre escrito para devolver el usuario pero con menos valores de los que se necesita para comprobar que lo
//registramos 
SchemabuyProduct.methods.toJSON = function() {
    const { __v: version, ...buyProductData } = this.toObject();
    return buyProductData;
  };
module.exports=model('buyProduct',SchemabuyProduct);