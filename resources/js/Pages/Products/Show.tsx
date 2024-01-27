import React from 'react';
import AppLayout from '@/Layouts/AppLayout';


const Product = ({ product }) => {
    return (
      <AppLayout
      title="Show"
     /*  renderHeader={() => (<><div className="flex justify-between">
        <h2></h2>
        <h2 className="font-semibold text-xl text-center text-gray-800 dark:text-gray-200 leading-tight">
          {resource}
        </h2>
        <PrimaryButton className='flex-end' ><a href={router(route+'.create')}>Aggiungi {addname}</a></PrimaryButton>
      </div></>
      )} */
    >
      <div className="dark:bg-grey-900 h-screen flex items-center justify-center text-center">

      <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg">

        <img src={`/images/${product.image}`} alt={product.name} className="w-64 h-64 object-cover mx-auto rounded-lg mb-4" />

        <h2 className="text-2xl font-bold mb-2 text-white dark:text-gray-100">{product.name}</h2>

        <p className="text-lg mb-4 text-white dark:text-gray-100">{product.description}</p>

        <p className="text-xl font-bold mb-2 text-white dark:text-gray-100">Quantity: {product.quantity} {product.um}</p>

        <p className="text-lg mb-4 text-white dark:text-gray-100">Category: {product.category}</p>

        <p className="text-lg mb-4 text-white dark:text-gray-100">Pieces: {product.pieces}</p>

        <p className="text-lg mb-4 text-white dark:text-gray-100">Lot: {product.lot}</p>

        <p className="text-lg mb-4 text-white dark:text-gray-100">Type: {product.type}</p>

      </div>

    </div></AppLayout>
  );
};

export default Product;