import React, { useState, useEffect } from 'react';
import { useForm, router } from '@inertiajs/react';
import useRoute from '@/Hooks/useRoute';
import ProductForm from './ProductForm';


export default function App({ products }) {

    const [selectedProducts, setSelectedProducts] = useState([]);

  
 const [formData, setFormData] = useState({
    name: '',
    place: '',
    balance: '',
 });
  
  const [errors, setErrors] = useState({});
  
    useEffect(() => {
      form.setData(formData)
      console.log(formData);
    }, [formData]);
  
    useEffect(() => {
     console.log(products);
     handleSelectProducts();
      form.setData(formData)
      console.log(formData);
  }, [selectedProducts]);
  
  const route = useRoute();
  
    const form = useForm(
   
  );
  const { processing } = form;

    const handleSelectProducts = () => {
 
    setFormData((prevProps) => ({
      ...prevProps,
      selectedProducts: selectedProducts,
    }));
  }

 const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevProps) => ({
      ...prevProps,
      [name]: value,
    }));
 };



 const handleSubmit = (event) => {
    event.preventDefault();
  
   form.post(route('retailers.store'), {
      onError: (e: any) => {
       setErrors(e);
       console.log("ERRORE---->"+e)
      },
      onSuccess: response => {
        console.log(response);
        //setToggleNotification(!toggleNotification);
        router.visit(route('retailers.index'));
      },
      onFinish: () => {},
    });
 };

 return (
     <div style={{backgroundColor:"#111827"}} className="dark:bg-grey-900 min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
      <div className="dark:bg-grey-900 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">

                <button

                  type="button"

                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"

                  onClick={() => router.visit(route('retailers.index'))}

                >

                  X

                </button>

              </div>
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
      <div className="dark:bg-grey-900 absolute inset-0 bg-gradient-to-r from-cyan-400 to-light-blue-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
        <div className="dark:bg-grey-900 relative px-4 py-10 shadow-lg sm:rounded-3xl sm:p-20">
          <form onSubmit={handleSubmit}>
            <div className="mb-5">
              <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-600">Nome</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
            {errors.name !== null ? <small style={{color:"red"}}>{errors.name}</small>: ''}
            </div>
            <div className="mb-5">
              <label htmlFor="place" className="block mb-2 text-sm font-medium text-gray-600">Luogo</label>
              <input
                type="text"
                name="place"
                value={formData.place}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
             />
             {errors.place !== null ? <small style={{color:"red"}}>{errors.place}</small>: ''}
           </div>
           <div className="mb-5">
<ProductForm products={products} selectedProducts={selectedProducts} setSelectedProducts={setSelectedProducts}></ProductForm>
      </div>     
                     {/* ... include the other fields in a similar manner ... */}
                         <div className="mb-5">
              <label htmlFor="balance" className="block mb-2 text-sm font-medium text-gray-600">Bilancio</label>
              <input
                type="number"
                name="balance"
                value={formData.balance}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
          {errors.balance !== null ? <small style={{color:"red"}}>{errors.balance}</small>: ''}
                     </div>
                      
                        
            <div className="mt-6">
              <button
                type="submit"
                className="w-full px-4 py-2 text-white bg-indigo-500 rounded-md focus:bg-indigo-600 focus:outline-none"
              >
                Crea Rivenditore
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
 );
}

