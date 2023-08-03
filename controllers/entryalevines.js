const { request, response } = require('express');
const Entryalevines = require('../models/entryalevines');



const alevinesGET = async (req = request, res = response) => {

    try {
        const alevines = await Entryalevines.find(); // Nos va a mostrar todos los ingresos de alebines
        res.status(200).json(
            {
                "msg": "Mensaje desde el metodo GET",
                alevines

            }
        );

    }
    catch (err) {
        console.log(err);
        throw new Error('Error en el metodo GET');
    }
}

const alevinesPOST = async (req = request, res = response) => {

    try {
        const body = req.body;

        //Desestructuramos lo que viene en el body
        const { date, provider, loteProvider, pilaProvider, employee, pilaEntry, batch, typeFish, cantidad } = req.body;

        //Se crea una nueva Entryalebines con los campos anteriores
        const alevinesEtry = new Entryalevines ({ date, provider, loteProvider, pilaProvider, employee, batch, pilaEntry, typeFish, cantidad });
        //Registro en la base de datos
        await alevinesEtry.save();

        //Retornamos el resultado de la llamada   
        res.json(
            {
                ok: 200,
                "msg": "Mensaje desde el metodo POST",
                alevinesEtry

            }
        );

    }
    catch (err) {
        console.log(err);
        throw new Error('Error en el metodo POST');
    }
}

const alevinesPUT = async (req = request, res = response) => {
    try {
      const { id } = req.params;
      const resto = req.body;
  
      const updated = await Entryalevines.findByIdAndUpdate(id, resto);
  
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
  
  

const alevinesDELETE = async (req = request, res = response) => {

    try {
        const { id } = req.params
        const alevin = await Entryalevines.findByIdAndDelete(id)


        res.json(
            {
                ok: 200,
                "msg": "Se eliminó correctamente",
                alevin
            }
        );

    }
    catch (err) {
        console.log(err);
        throw new Error('Error en el metodo DELETE');
    }
}



module.exports = {
    alevinesGET,
    alevinesPOST,
    alevinesPUT,
    alevinesDELETE
};