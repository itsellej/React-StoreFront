const db = require('../database/products');
const express = require('express');
const router = express.Router();


router.get('/', async (request, response) => {
  const getProducts = await db.getProducts();

  if (getProducts) {
    response
      .status(200)
      .json(getProducts.rows)
  } else {
    response
      .status(400)
      .send('Error retrieving products')
  }
});

router.put('/:id', async (request, response) => {
  const id = parseInt(request.params.id)
  const updatedShopQuantity = request.body.shop_quantity
  const updateProduct = await db.updateProduct(updatedShopQuantity, id);

  if (updateProduct) {
    response
      .status(200)
      .send('Product with ID: ' + id + 'modified with shop_quantity of ' + updatedShopQuantity)
  } else {
    response
      .status(400)
      .send('Error updating product with id ' + id)
  }
});

module.exports = router;