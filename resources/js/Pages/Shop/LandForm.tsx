import React, { useEffect, useState } from 'react';

const LandForm = ({ products, selectedProducts, setSelectedProducts }) => {
    
useEffect(()=>{handleAddProduct()},[])

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
      if(selectedProducts.length<1)
    setSelectedProducts([...selectedProducts, { id: null, name: '', quantity: 1 }]);
  };

  const renderProducts = () => {
    return selectedProducts.map((product, index) => (
      <div key={index}>
        <select
          value={product.id || ''}
          onChange={(e) => handleSelectChange(index, e)}
          className="block appearance-none w-full bg-gray-200 border border-gray-200 text-black-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
        >
          <option value="">Scegli terreno</option>
          {products.map((p) => (
            <option key={p.id} value={p.id}>
              {p.name}
            </option>
          ))}
        </select>
       
      </div>
    ));
  };

  return (
    <form className="w-full max-w-lg">
      <div className="flex flex-wrap -mx-3 mb-6">
        {renderProducts()}
       {/*  <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
          <button
            type="button"
            onClick={handleAddProduct}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Aggiungi Terreno
          </button>
        </div> */}
      </div>
    </form>
  );
};

export default LandForm;