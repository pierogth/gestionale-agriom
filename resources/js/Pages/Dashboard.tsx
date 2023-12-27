import React from 'react';
import Welcome from '@/Components/Welcome';
import AppLayout from '@/Layouts/AppLayout';
import PrimaryButton from '@/Components/PrimaryButton';
import { SortableTable } from '@/Components/Table';


export default function Dashboard({ products }) {console.log(products)
  return (
    <AppLayout
      title="Dashboard"
      renderHeader={() => (<><div className="flex justify-between">
        <h2></h2>
        <h2 className="font-semibold text-xl text-center text-gray-800 dark:text-gray-200 leading-tight">
          Magazzino
        </h2>
        <PrimaryButton className='flex-end'>Aggiungi Prodotto</PrimaryButton>
      </div></>
      )}
    >
      
      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-xl sm:rounded-lg">
{/*             <Welcome />
 */}
            <SortableTable products={products} />

          </div>
        </div>
      </div>
    </AppLayout>
  );
}
