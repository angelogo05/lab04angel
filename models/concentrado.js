//Necesitamos recuperar un Schema y un modelo de Moongose
const {Schema,model}=require('mongoose');

const SchemaConcentrado= new Schema({
    
dateCompra:{ type:String,
    required:[true,'La fecha de compra es un campo requerido'],
},

marcaConcentrado:{ type:String,
    required:[true,'El número de pila es un campo requerido'],
},

tipoConcentrado:{  type:String,
    required:[true,'El tipo alimento es un campo requerido'],
},

cantidadConcentrado:{  type:Number,
    required:[true,'El tipo alimento es un campo requerido'],
},

provideer:{ type:String,
    required:[true,'El proveedor es un campo requerido'],
},

precio:{ type:Number,
    required:[true,'El precio es un campo requerido'],
},

cantProteina:{ type:Number,
    required:[true,'La cantidad de proteína es un campo requerido'],
},

fechaVencimiento:{ type:String,
    required:[true, 'La fecha de vencimiento es un campo requerido'],
}

});
//Creamos un metodo sobre escrito para devolver el usuario pero con menos valores de los que se necesita para comprobar que lo
//registramos 
SchemaConcentrado.methods.toJSON = function() {
    const { __v: version, ...concentradoData } = this.toObject();
    return concentradoData;
  };
module.exports=model('Concentrado',SchemaConcentrado);