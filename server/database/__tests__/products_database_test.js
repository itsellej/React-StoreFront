const { getProducts, updateProduct } = require('../products');

describe('getProducts()', () => {
  test('return products from products table as an object', async () => {
    const result = await getProducts();
    expect(typeof result).toEqual("object")
  });
})

describe('updateProduct()', () => {
  test('updating an item successfully returns true', async () => {
    const result = await updateProduct(15, 0);
    expect(result).toEqual(true)
  });
})