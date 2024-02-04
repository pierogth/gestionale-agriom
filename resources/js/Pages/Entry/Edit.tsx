import React, { useState, useEffect } from 'react';
import { useForm, router } from '@inertiajs/react';
import useRoute from '@/Hooks/useRoute';
import ProductForm from './ProductForm';

export default function App({ entry, products, retailers, selectProducts }) {
  const [isPayed, setIsPayed] = useState(false);
    const [selectedRetail, setSelectedRetail] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState(selectProducts);
  
  useEffect(() => {
  retailers.push({name: "nessun rivenditore"})
}, [])
 const [formData, setFormData] = useState({
    quantity: entry.quantity,
    is_payed: entry.is_payed,
     type: entry.type,
      payer: entry.payer,
     description: entry.description,
      payment_type: entry.payment_type,
     data: entry.data,
    file: entry.file,
    /*TODO RELATIOMN*/
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

   useEffect(() => {
     console.log(products);
     handleSelectRetailer();
      form.setData(formData)
      console.log(formData);
   }, [selectedRetail]);
  
   useEffect(() => {
     console.log(products);
     handleIsPayed();
      form.setData(formData)
      console.log(formData);
  }, [isPayed]);

  const handleSelectProducts = () => {
 
    setFormData((prevProps) => ({
      ...prevProps,
      selectedProducts: selectedProducts,
    }));
  }
     
  const handleSelectRetailer = () => {
 
    setFormData((prevProps) => ({
      ...prevProps,
      selectedRetailer: selectedRetail,
    }));
  }
       
        const handleIsPayed = () => {
 
    setFormData((prevProps) => ({
      ...prevProps,
     is_payed: isPayed,
    }));
 };
  
  const route = useRoute();
  
    const form = useForm(
   
  );
  const { processing } = form;

 const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevProps) => ({
      ...prevProps,
      [name]: value,
    }));
 };

const handleFileChange = (event) => {
  console.log(event.target.files[0]);
    setFormData((prevProps) => ({
      ...prevProps,
      file: event.target.files[0],
    }));
   console.log(formData);  
 };

 const handleSubmit = (event) => {
    event.preventDefault();
  
   form.post(route('entries.update', entry.id), {
      onError: (e: any) => {
       setErrors(e);
       console.log("ERRORE---->"+e)
      },
      onSuccess: response => {
        console.log(response);
        //setToggleNotification(!toggleNotification);
        router.visit(route('entries.index'));
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

                  onClick={() => router.visit(route('entries.index'))}

                >

                  X

                </button>

              </div>
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="dark:bg-grey-900 absolute inset-0 bg-gradient-to-r from-cyan-400 to-light-blue-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
        <div className="dark:bg-grey-900 relative px-4 py-10 shadow-lg sm:rounded-3xl sm:p-20">
          <form onSubmit={handleSubmit}>
            <div className="mb-5">
              <label htmlFor="type" className="block mb-2 text-sm font-medium text-black-600">€</label>
              <input
                type="number"
                name="quantity"
                value={formData.quantity}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
            {errors.quantity !== null ? <small style={{color:"red"}}>{errors.quantity}</small>: ''}
           </div>
                 <div className="mb-5">      <label htmlFor="retailSelect" className="block mb-2 text-sm font-medium text-black-600">Rivenditore</label>

           <select

          id="retailSelect"

          value={selectedRetail}

          onChange={(e) => setSelectedRetail(e.target.value)}

          className="w-full py-2 pl-3 pr-8 text-black-700 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"

        >      {retailers.map((retailer) => (

        <option key={retailer.id} value={retailer.id}>

          {retailer.name}

        </option>

      ))}

            </select></div>  
            <div className="mb-5">
              <label htmlFor="place" className="block mb-2 text-sm font-medium text-black-600">Tipologia</label>
              <input
                type="text"
                name="type"
                value={formData.type}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
             /></div>
           <div className="mb-5">
<ProductForm products={products} selectedProducts={selectedProducts} setSelectedProducts={setSelectedProducts}></ProductForm>
      </div>     
                     
                     <div className="mb-4">

        <label htmlFor="is_payed" className="block text-black-700 font-bold mb-2">

          Is paid?

        </label>

        <div className="flex">

          <div className="mr-4">

            <input

              type="radio"

              id="is_payed_true"

              name="is_payed"

              value={true}

              checked={isPayed}

              onChange={() => setIsPayed(true)}

              className="appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-500 checked:border-blue-500 focus:outline-none transition duration-150 ease-in-out"

            />

            <label htmlFor="is_payed_true" className="block text-black-700 font-bold">

              Yes

            </label>

          </div>

          <div>

            <input

              type="radio"

              id="is_payed_false"

              name="is_payed"

              value={false}

              checked={!isPayed}

              onChange={() => setIsPayed(false)}

              className="appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-500 checked:border-blue-500 focus:outline-none transition duration-150 ease-in-out"

            />

            <label htmlFor="is_payed_false" className="block text-black-700 font-bold">

              No

            </label>

          </div>

        </div>

      </div>
                     {/* ... include the other fields in a similar manner ... */}
                         <div className="mb-5">
              <label htmlFor="balance" className="block mb-2 text-sm font-medium text-black-600">Descrizione</label>
              <input
                type="text"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
          {errors.description !== null ? <small style={{color:"red"}}>{errors.description}</small>: ''}
                     </div>
                    {/* ... include the other fields in a similar manner ... */}
                         <div className="mb-5">
              <label htmlFor="data" className="block mb-2 text-sm font-medium text-black-600">Data</label>
              <input
                type="date"
                name="data"
                value={formData.data}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
          {errors.data !== null ? <small style={{color:"red"}}>{errors.data}</small>: ''}
                     </div>
                         <div className="mb-5">
              <label htmlFor="data" className="block mb-2 text-sm font-medium text-black-600">Pagante</label>
              <input
                type="text"
                name="payer"
                value={formData.payer}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
          {errors.payer !== null ? <small style={{color:"red"}}>{errors.payer}</small>: ''}
                     </div>
                         <div className="mb-5">
              <label htmlFor="data" className="block mb-2 text-sm font-medium text-black-600">Tipo di pagamento</label>
              <input
                type="text"
                name="payment_type"
                value={formData.payment_type}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
          {errors.payment_type !== null ? <small style={{color:"red"}}>{errors.payment_type}</small>: ''}
                     </div>
                            {/* ... include the other fields in a similar manner ... */}
                         <div className="mb-5">
              <label htmlFor="file" className="block mb-2 text-sm font-medium text-black-600">File</label>
              <input
                type="file"
                name="file"
                onChange={handleFileChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
          {errors.file !== null ? <small style={{color:"red"}}>{errors.file}</small>: ''}
                     </div>
                      
                        
            <div className="mt-6">
              <button
                type="submit"
                className="w-full px-4 py-2 text-white bg-indigo-500 rounded-md focus:bg-indigo-600 focus:outline-none"
              >
                Aggiorna Entrata
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
 );
}

