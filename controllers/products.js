const { request, response } = require('express');
const Inventory = require('../models/products');


const productsPOST = async (req = request, res = response) => {
  try {
    // Desestructuramos lo que viene en el body para el inventario
    const { lastPrice, actualPrice, averagePrice, amount, products } = req.body;

    // Creamos un nuevo objeto de inventario con los detalles proporcionados
    const newInventory = new Inventory({
      lastPrice,
      actualPrice,
      averagePrice,
      amount,
      products, // Agregar los productos al objeto del inventario
    });

    // Guardamos el inventario junto con los productos en la base de datos
    const inventoryWithProducts = await newInventory.save();

    // Retornamos el resultado de la llamada
    res.json({
      ok: 200,
      "POST msg": "Inventario con productos registrado correctamente",
      inventoryWithProducts,
    });
  } catch (err) {
    console.log(err);
    throw new Error('Error en el metodo POST');
  }
};;

const productsGET = async (req = request, res = response) => {
  try {
    // Buscar todos los inventarios en la base de datos
    const inventories = await Inventory.find();

    // Crear un array para almacenar todos los productos de todos los inventarios
    let allProducts = [];

    // Iterar a través de los inventarios y agregar los productos al array
    inventories.forEach((inventory) => {
      allProducts = allProducts.concat(inventory.products);
    });

    res.json({
      ok: true,
      message: 'Productos obtenidos dddd correctamente',
      inventories: inventories, // Incluimos los inventarios completos en la respuesta
    
    });
  } catch (err) {
    console.log(err);
    throw new Error('Error en el método GET');
  }
};



const productsDELETE = async (req = request, res = response) => {
  try {
    const { inventoryId } = req.params;

    // Buscar el inventario por su ID
    const inventory = await Inventory.findById(inventoryId);

    if (!inventory) {
      return res.status(404).json({
        error: 'El inventario no fue encontrado.',
      });
    }

    // Eliminar el inventario que contiene el producto
    await inventory.remove();

    res.json({
      ok: true,
      message: 'Producto eliminado del inventario correctamente',
      deletedInventory: inventory,
    });
  } catch (err) {
    console.log(err);
    throw new Error('Error en el método DELETE');
  }
};


const productsPUT = async (req = request, res = response) => {
  try {
    const { inventoryId, productId } = req.params; // Obtener el ID del inventario y el ID del producto de los parámetros de la ruta
     // Obtener los datos actualizados del producto del cuerpo de la solicitud
     const { lastPrice, actualPrice, averagePrice, amount, products } = req.body;
     
    const inventory = await Inventory.findById(inventoryId); // Buscar el inventario por su ID
    if (!inventory) {
      return res.status(404).json({
        error: 'El inventario no fue encontrado.',
      });
    }

    // Buscar el producto dentro del inventario por su ID
    const productToUpdate = inventory.products.id(productId);

    if (!productToUpdate) {
      return res.status(404).json({
        error: 'El producto no fue encontrado en el inventario.',
      });
    }

    // Actualizar el producto con los datos proporcionados
    inventory.lastPrice = lastPrice
    inventory.actualPrice = actualPrice
    inventory.averagePrice = averagePrice
    inventory.amount = amount
    
    productToUpdate.set(products);

    // Guardar los cambios en el inventario
    await inventory.save();

    res.json({
      ok: true,
      message: 'Producto del inventario actualizado correctamente',
      updatedProduct: productToUpdate,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: 'Error en el servidor',
    });
  }
};

// {
// "amount": 10 // Cantidad que deseas restar al producto en el inventario por put envian los 2 id
// }

// esto pues le mandan lo que quieren restar al producto que ewsta en un inventario

const discountProductsPUT = async (req = request, res = response) => {
  const { inventoryId, productId } = req.params;
  const {amount} = req.body;

  try {
    // Primero, buscas el inventario específico por su ID
    const inventory = await Inventory.findById(inventoryId);

    if (!inventory) {
      // Si no se encuentra el inventario, puedes manejar el error aquí
      return res.status(404).json({ error: 'Inventario no encontrado.' });
    }
   
    if ((inventory.amount - amount)<0) {

      return res.status(404).json({ error: 'No se encuentra esa cantidad disponible en inventario.' });
    }
    inventory.amount-= amount;
    
    // Luego, buscas el índice del producto dentro del arreglo de productos en el inventario
    // const productIndex = inventory.products.findIndex((product) => product._id.equals(productId));

    // if (productIndex === -1) {
    //   // Si el producto no se encuentra en el inventario, también puedes manejar el error aquí
    //   return res.status(404).json({ error: 'Producto no encontrado en el inventario.' });
    // }

    // // Resta la cantidad al campo "amount" del producto específico
    // inventory.products[productIndex].amountIncome-= amountToSubtract;

    // Guarda los cambios en la base de datos
    await inventory.save();

    return res.json({ message: 'Cantidad restada exitosamente del producto en el inventario.' });
  } catch (err) {
    console.log(err);
    throw new Error('Error en el método ResPUT');
  }

 

}

module.exports = {
  productsGET,
  productsPOST,
  productsPUT,
  productsDELETE,
  discountProductsPUT
}