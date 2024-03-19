import React, {useEffect, useState} from 'react';
import Welcome from '@/Components/Welcome';
import AppLayout from '@/Layouts/AppLayout';
import PrimaryButton from '@/Components/PrimaryButton';
import { SortableTable } from '@/Components/Table';
import TableBody from '@/Components/TableBody';
import { router } from '@inertiajs/core';
import useRoute from '@/Hooks/useRoute';
import CategoryModal from '@/Components/CategoryModal';



export default function Lands({ products, categories, resource, route, addname, umms }) {
  console.log(products)
  //{console.log("------>>>>>"+Object.keys(products[0]).slice(0,-1))}
  const [columns, setColumns] = useState([]);
    const [searchInput, setSearchInput] = useState(localStorage.getItem('search') ?? '');
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [modalUmsIsOpen, setModalUmsIsOpen] = useState(false);

    const [categoris, setCategoris] = useState(categories);
    const [ums, setUms] = useState(umms);
    const [umsFlag, setUmsFlag] = useState(false);



    const openModal = (_isUms = false) => {
      console.log("tras"+_isUms)
      _isUms===true ? setModalUmsIsOpen(true) : setModalIsOpen(true);      
      
    };
  
  
    const closeModal = (_isUms = false) => {
      _isUms==true ? setModalUmsIsOpen(false) : setModalIsOpen(false);
    };
   const [dataFilterOrderAndPaginate, setDataFilterOrderAndPaginate] = useState(
    products
   );
    const [actions, setActions] = useState([]);
  const [loading, setLoading] = useState(true);
     const [isFocused, toggleFocus] = useState(false);
const routerx = useRoute();
   const toggleFocusLabel = () => toggleFocus(true);
  const toggleBlurLabel = (e: any) => {
    if (e.target.value === '') {
      toggleFocus(!isFocused);
    }
  };

/*   useEffect(() => {
    console.log(products);
    setDataFilterOrderAndPaginate(products);

  }, [products])  */
  
  useEffect(() => {
    
    localStorage.removeItem('search');

  }, [resource])

  return (
    <AppLayout
      title="Dashboard"
      renderHeader={() => (<><div className="flex justify-between">
        <h2></h2>
        <h2 className="font-semibold text-xl text-center text-gray-800 dark:text-gray-200 leading-tight">
          {resource}
        </h2><div>
        {resource==='Magazzino' ? <>
         <PrimaryButton className='mr-3' onClick={()=>{setUmsFlag(true); openModal(true)}}><a href={'#'}>Gestisci Unità di misura</a></PrimaryButton>
         <PrimaryButton className='mr-3' onClick={openModal}><a href={'#'}>Gestisci Categorie</a></PrimaryButton>
          </>
        :""}
        <PrimaryButton className='' ><a href={routerx(route+'.create')}>Aggiungi {addname}</a></PrimaryButton>
      </div></div></>
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
              value={searchInput}
              onFocus={toggleFocusLabel}
              onBlur={toggleBlurLabel}
              id="input-group-1"
              name="input-group-1"
              placeholder={'Ricerca'}
              onChange={e => { setSearchInput(e.target.value); localStorage.setItem('search', e.target.value); }}
            />
            
           {products[0] ? <SortableTable columns={products && Object.keys(products[0]).slice(0,-1)}
                data={dataFilterOrderAndPaginate}
                setData={setDataFilterOrderAndPaginate}
                searchInput={searchInput}
              actions={actions.length > 0 ? true : false}
               initialData={products}>
              <TableBody   columns={products && Object.keys(products[0]).slice(0,-1)}
                  data={dataFilterOrderAndPaginate}
                  setData={setDataFilterOrderAndPaginate}
                actions={[]}
              routes={route}
             >
                

              </TableBody>
              </SortableTable>:        <h2 className="font-semibold text-xl text-center text-gray-800 dark:text-gray-200 leading-tight">
Non ci sono dati</h2> }

          </div>
        </div>
      </div>
      {resource==='Magazzino' && <><CategoryModal
        categories={ums}
        isOpen={modalUmsIsOpen}
        onRequestClose={()=>closeModal(true)}
        onSubmit={(categoryName) => {
          console.log('Category name:', categoryName);
          router.post(routerx('ums.create'), {um: categoryName})
          // Send the request here
          closeModal();
        }}
        nameRoute='ums'
      />
      <CategoryModal
        categories={categoris}
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        onSubmit={(categoryName) => {
          console.log('Category name:', categoryName);
          router.post(routerx('categories.create'), {name: categoryName})
          // Send the request here
          closeModal();
        }}
        nameRoute='categories'
      /></>
      }
    </AppLayout>
  );
}
