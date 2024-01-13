import React, {useState} from 'react';
import Welcome from '@/Components/Welcome';
import AppLayout from '@/Layouts/AppLayout';
import PrimaryButton from '@/Components/PrimaryButton';
import { SortableTable } from '@/Components/Table';
import TableBody from '@/Components/TableBody';


export default function Lands({ products }) {
  console.log(products)
  {console.log("------>>>>>"+Object.keys(products[0]))}
  const [columns, setColumns] = useState([]);
    const [searchInput, setSearchInput] = useState('');

   const [dataFilterOrderAndPaginate, setDataFilterOrderAndPaginate] = useState(
    products
   );
    const [actions, setActions] = useState([]);
  const [loading, setLoading] = useState(true);
     const [isFocused, toggleFocus] = useState(false);

   const toggleFocusLabel = () => toggleFocus(true);
  const toggleBlurLabel = (e: any) => {
    if (e.target.value === '') {
      toggleFocus(!isFocused);
    }
  };
  
  return (
    <AppLayout
      title="Dashboard"
      renderHeader={() => (<><div className="flex justify-between">
        <h2></h2>
        <h2 className="font-semibold text-xl text-center text-gray-800 dark:text-gray-200 leading-tight">
          Terreni
        </h2>
        <PrimaryButton className='flex-end'>Aggiungi Terreno</PrimaryButton>
      </div></>
      )}
    >
         
      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-xl sm:rounded-lg">
{/*             <Welcome />
 */}    
                <input
                    type="text"
                    className={
                      isFocused ? 'form-control focus--mouse' : 'form-control'
                    }
                    onFocus={toggleFocusLabel}
                    onBlur={toggleBlurLabel}
                    id="input-group-1"
                    name="input-group-1"
                    placeholder={'Ricerca'}
                    onChange={e => setSearchInput(e.target.value)}
            />
            
            <SortableTable columns={Object.keys(products[0])}
                data={dataFilterOrderAndPaginate}
                setData={setDataFilterOrderAndPaginate}
                searchInput={searchInput}
              actions={actions.length > 0 ? true : false}>
              <TableBody   columns={Object.keys(products[0])}
                  data={dataFilterOrderAndPaginate}
                  actions={[]}>

              </TableBody>
              </SortableTable>

          </div>
        </div>
      </div>
    </AppLayout>
  );
}
