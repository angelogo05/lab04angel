const { request, response } = require('express');
const buyProduct = require('../models/buyProduct');



const buyProductGET = async (req = request, res = response) => {

    try {
        const buyProduct = await buyProduct.find(); // Nos va a mostrar todos los ingresos de compra de productos
        res.status(200).json(
            {
                "msg": "Mensaje desde el metodo GET",
                buyProduct

            }
        );

    }
    catch (err) {
        console.log(err);
        throw new Error('Error en el metodo GET');
    }
}

const buyProductPOST = async (req = request, res = response) => {

    try {
        const body = req.body;

        //Desestructuramos lo que viene en el body
        const { date, dateExpiration, employee, provider, product, brandProduct, amountIncome, unity, price, state } = req.body;

        //Se crea un nuevo buyProduct con los campos anteriores
        const buyProduct = new buyProduct ({ date, dateExpiration, employee, provider, product, brandProduct, amountIncome, unity, price, state });
        //Registro en la base de datos
        await buyProduct.save();

        //Retornamos el resultado de la llamada   
        res.json(
            {
                ok: 200,
                "msg": "Mensaje desde el metodo POST",
                buyProduct

            }
        );

    }
    catch (err) {
        console.log(err);
        throw new Error('Error en el metodo POST');
    }
}

const buyProductPUT = async (req = request, res = response) => {
    try {
      const { id } = req.params;
      const resto = req.body;
  
      const updated = await buyProduct.findByIdAndUpdate(id, resto);
  
      res.json(
      {
        ok: 200,
        msg: "Formulario actualizado correctamente",
        updated
      }
      );
  
    } catch (err) {
      console.log(err);
      throw new Error('Error en el método PUT');
    }
  };
  
  

const buyProductDELETE = async (req = request, res = response) => {

    try {
        const { id } = req.params
        const buyProduct = await buyProduct.findByIdAndDelete(id)


        res.json(
            {
                ok: 200,
                "msg": "Se eliminó correctamente",
                buyProduct
            }
        );

    }
    catch (err) {
        console.log(err);
        throw new Error('Error en el metodo DELETE');
    }
}



module.exports = {
    buyProductGET,
    buyProductPOST,
    buyProductPUT,
    buyProductDELETE
};