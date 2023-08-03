
const { request, response } = require('express');
const Traceability = require('../models/traceability');

const traceabilityGET = async (req = request, res = response) => {

    try {
        const traceability = await Traceability.find(); // Nos va a mostrar todos los ingresos de alebines
        res.status(200).json(
            {
                "msg": "Mensaje desde el metodo GET",
                traceability

            }
        );

    }
    catch (err) {
        console.log(err);
        throw new Error('Error en el metodo GET');
    }
}

const traceabilityPOST = async (req = request, res = response) => {

    try {
        const body = req.body;

        //Desestructuramos lo que viene en el body
        const { date, currentStack, destinationStack, batch, amount, typeFish, employee } = req.body;

        //Se crea una nueva Entryalebines con los campos anteriores
        const traceability = new Traceability ({ date, currentStack, destinationStack, batch, amount, typeFish, employee});
        //Registro en la base de datos
        await traceability.save();

        //Retornamos el resultado de la llamada   
        res.json(
            {
                ok: 200,
                "msg": "Mensaje desde el metodo POST",
                traceability
            }
        );

    }
    catch (err) {
        console.log(err);
        throw new Error('Error en el metodo POST');
    }
}

const traceabilityPUT = async (req = request, res = response) => {
    try {
      const { id } = req.params;
      const resto = req.body;
  
      const updated = await Traceability.findByIdAndUpdate(id, resto);
  
      res.json({
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
  
  
const traceabilityDELETE = async (req = request, res = response) => {

    try {
        const { id } = req.params
        const DELETE = await Traceability.findByIdAndDelete(id)

        res.json(
            {
                ok: 200,
                "msg": "Se eliminó correctamente",
                DELETE
            }
        );
    }
    catch (err) {
        console.log(err);
        throw new Error('Error en el metodo DELETE');
    }
}

module.exports = {
    traceabilityGET,
    traceabilityPOST,
    traceabilityPUT,
    traceabilityDELETE
};
