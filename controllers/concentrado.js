const { request, response } = require('express');
const Concentrado = require('../models/concentrado');



const concentradoGET = async (req = request, res = response) => {

    try {
        const concentrado = await Concentrado.find(); // Nos va a mostrar todos los datos de mortalidad
        res.status(200).json(
            {
                "msg": "Mensaje desde el metodo GET",
                concentrado
            }
        );
    }
    catch (err) {
        console.log(err);
        throw new Error('Error en el metodo GET');
    }
}

const concentradoPOST = async (req = request, res = response) => {

    try {
        const body = req.body;

        //Desestructuramos lo que viene en el body
        const { dateCompra, marcaConcentrado, tipoConcentrado, cantidadConcentrado, provideer, precio, cantProteina, fechaVencimiento } = req.body;

        //Se crea una nueva Mortalidad con los campos anteriores
        const post = new Concentrado ({ dateCompra, marcaConcentrado, tipoConcentrado, cantidadConcentrado, provideer, precio, cantProteina, fechaVencimiento});
        //Registro en la base de datos
        await post.save();

        //Retornamos el resultado de la llamada   
        res.json(
            {
                ok: 200,
                "POST msg": "Se registró correctamente",
                post

            }
        );

    }
    catch (err) {
        console.log(err);
        throw new Error('Error en el metodo POST');
    }
}

const concentradoPUT = async (req = request, res = response) => {
    try {
      const { id } = req.params;
      const resto = req.body;
  
      const updated = await Concentrado.findByIdAndUpdate(id, resto);
  
      res.json(
      {
        ok: 200,
        msg: "PUT: Formulario actualizado correctamente",
        updated
      }
      );
  
    } catch (err) {
      console.log(err);
      throw new Error('Error en el método PUT');
    }
  };
  
  

const concentradoDELETE = async (req = request, res = response) => {

    try {
        const { id } = req.params
        const eliminar = await Concentrado.findByIdAndDelete(id)


        res.json(
            {
                ok: 200,
                "DELETE msg": "Se eliminó correctamente",
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
    concentradoGET,
    concentradoPOST,
    concentradoPUT,
    concentradoDELETE
};