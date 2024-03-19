import React from 'react';
import AppLayout from '@/Layouts/AppLayout';
import { router } from '@inertiajs/react';
import useRoute from '@/Hooks/useRoute';



const Product = ({ product, category, um }) => {

    const route = useRoute();

  
    return (
      <AppLayout
        title="Show"
         renderHeader={() => (

    <div className="flex justify-between">

     <h2></h2>

      <h2 className="font-semibold text-xl text-center text-gray-800 dark:text-gray-200 leading-tight">

        Prodotto

      </h2>

      <button                   onClick={() => router.visit(route('products.index'))}
 className='flex-row-reverse w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm'>

        X


      </button>

    </div>

  )}
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

        <p className="text-xl font-bold mb-2 text-white dark:text-gray-100">Quantità: {product.quantity}{' '}{um}</p>

        <p className="text-lg mb-4 text-white dark:text-gray-100">Categoria: {category}</p>

        <p className="text-lg mb-4 text-white dark:text-gray-100">Pezzi: {product.pieces}</p>

        <p className="text-lg mb-4 text-white dark:text-gray-100">Lotto: {product.lot}</p>

        <p className="text-lg mb-4 text-white dark:text-gray-100">Tipologia: {product.type === 1 ? 'Sfuso' : 'Dettaglio'}</p>

      </div>

        </div>
      </AppLayout>
  );
};

export default Product;