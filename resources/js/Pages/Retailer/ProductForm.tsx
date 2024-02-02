import React, { useState } from 'react';

const ProductForm = ({ products,selectedProducts, setSelectedProducts  }) => {

  const handleSelectChange = (index, e) => {
    const selectedProduct = products.find(p => p.id === parseInt(e.target.value));
    const updatedProducts = [...selectedProducts];
    updatedProducts[index] = selectedProduct;
    setSelectedProducts(updatedProducts);
  };

  const handleQuantityChange = (index, e) => {
    const updatedProducts = [...selectedProducts];
    updatedProducts[index].quantity = e.target.value;
    setSelectedProducts(updatedProducts);
  };

  const handleAddProduct = () => {
    setSelectedProducts([...selectedProducts, { id: null, name: '', quantity: 1 }]);
  };

  const renderProducts = () => {
    return selectedProducts.map((product, index) => (
      <div key={index}>
        <select
          value={product.id || ''}
          onChange={(e) => handleSelectChange(index, e)}
          className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
        >
          <option value="">Scegli un prodotto</option>
          {products.map((p) => (
            <option key={p.id} value={p.id}>
              {p.name}
            </option>
          ))}
        </select>
        {product.id && (
          <div>
            <label htmlFor={`quantity-${index}`} className="block text-sm font-medium text-gray-700">
              Quantità di {product.name}
            </label>
            <input
              type="number"
              name={`quantity-${index}`}
              id={`quantity-${index}`}
              value={product.quantity || ''}
              onChange={(e) => handleQuantityChange(index, e)}
              className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
            />
          </div>
        )}
      </div>
    ));
  };

  return (
    <form className="w-full max-w-lg">
      <div className="flex flex-wrap -mx-3 mb-6">
        {renderProducts()}
        <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
          <button
            type="button"
            onClick={handleAddProduct}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Aggiungi prodotto
          </button>
        </div>
      </div>
    </form>
  );
};

export default ProductForm;