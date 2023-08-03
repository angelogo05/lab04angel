const { request, response } = require('express');
const MantePila = require('../models/mantePila');



const mantePilaGET = async (req = request, res = response) => {

    try {
        const mantePila = await MantePila.find(); // Nos va a mostrar todos los datos de mortalidad
        res.status(200).json(
            {
                "msg": "Mensaje desde el metodo GET",
                mantePila
            }
        );
    }
    catch (err) {
        console.log(err);
        throw new Error('Error en el metodo GET');
    }
}

const mantePilaPOST = async (req = request, res = response) => {
    try {
        const body = req.body;

        // Desestructuramos lo que viene en el body
        const { numPila, observacion } = req.body;

        // Intentamos crear un nuevo documento en la base de datos
        const nuevoMantePila = await MantePila.create({ numPila, observacion });

        // Retornamos el resultado de la llamada
        res.json({
            ok: 200,
            msg: "Formulario agregado correctamente",
            enviar: nuevoMantePila
        });
    } catch (err) {
        if (err.code === 11000) {
            // Código de error 11000 indica una violación de índice único (duplicado)
            res.status(400).json({ error: "El número de pila ya existe. Proporciona un número único." });
        } else {
            console.log(err);
            res.status(500).json({ error: "Hubo un error en el servidor." });
        }
    }
};


const mantePilaPUT = async (req = request, res = response) => {
    try {
      const { id } = req.params;
      const resto = req.body;
  
      const updated = await MantePila.findByIdAndUpdate(id, resto);
  
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
  
  

const mantePilaDELETE = async (req = request, res = response) => {

    try {
        const { id } = req.params
        const eliminar = await MantePila.findByIdAndDelete(id)


        res.json(
            {
                ok: 200,
                "msg": "Se eliminó correctamente",
                eliminar
            }
        );

    }
    catch (err) {
        console.log(err);
        throw new Error('Error en el metodo DELETE');
    }
}



module.exports = {
    mantePilaGET,
    mantePilaPOST,
    mantePilaPUT,
    mantePilaDELETE
};