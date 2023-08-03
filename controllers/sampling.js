const { request, response } = require('express');
const Sampling = require('../models/sampling');



const samplingGET = async (req = request, res = response) => {

    try {
        const sampling = await Sampling.find(); // Nos va a mostrar todos los ingresos de alebines
        res.status(200).json(
            {
                "msg": "Mensaje desde el metodo GET",
                sampling

            }
        );

    }
    catch (err) {
        console.log(err);
        throw new Error('Error en el metodo GET');
    }
}

const samplingPOST = async (req = request, res = response) => {

    try {
        const body = req.body;

        //Desestructuramos lo que viene en el body
        const { date, currentStack, amount, averageWeight, approval, employee, observation } = req.body;

        //Se crea una nueva Entryalebines con los campos anteriores
        const post = new Sampling ({ date, currentStack, amount, averageWeight, approval, employee, observation});
        //Registro en la base de datos
        await post.save();

        //Retornamos el resultado de la llamada   
        res.json(
            {
                ok: 200,
                "msg": "Mensaje desde el metodo POST",
                post

            }
        );

    }
    catch (err) {
        console.log(err);
        throw new Error('Error en el metodo POST');
    }
}

const samplingPUT = async (req = request, res = response) => {
    try {
      const { id } = req.params;
      const resto = req.body;
  
      const updated = await Sampling.findByIdAndUpdate(id, resto);
  
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
  
  

const samplingDELETE = async (req = request, res = response) => {

    try {
        const { id } = req.params
        const DELETE = await Sampling.findByIdAndDelete(id)


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
    samplingGET,
    samplingPOST,
    samplingPUT,
    samplingDELETE
};