import React, { useState, useEffect } from 'react';
import { useForm, router } from '@inertiajs/react';
import useRoute from '@/Hooks/useRoute';

export default function App({ products }) {

  
  const [typo, setTypo] = useState(true);
  const [errors, setErrors] = useState({});
  const [selectedProduct, setSelectedProduct] = useState("");

   const [formData, setFormData] = useState({
     name: '',
     selectedProduct: '',
    quantity: '',
    um: '',
    category: '',
    pieces: '',
    lot: '',
    description: '',
    type: '',
    image: null,
 });
  
  useEffect(() => {
    console.log(products);
      form.setData(formData)
      console.log(formData);
  }, [formData]);

   useEffect(() => {
     console.log(products);
     handleTypoProduct();
      form.setData(formData)
      console.log(formData);
   }, [typo]);
  
   useEffect(() => {
     console.log(products);
     handleSelectProduct();
      form.setData(formData)
      console.log(formData);
  }, [selectedProduct]);
  
  
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

   const handleTypoProduct = () => {
 
    setFormData((prevProps) => ({
      ...prevProps,
     type: typo,
    }));
 };
  
  const handleSelectProduct = () => {
 
    setFormData((prevProps) => ({
      ...prevProps,
     selectedProduct: selectedProduct,
    }));
 };

  const handleImageChange = (event) => {

    setFormData((prevProps) => ({
      ...prevProps,
      image: event.target.files[0],
    }));
   console.log(formData);
 };

 const handleSubmit = (event) => {
    event.preventDefault();
  
   form.post(route('products.store'), {
      onError: (e: any) => {
       setErrors(e);
       console.log("ERRORE---->"+e)
      },
      onSuccess: response => {
        console.log(response);
        //setToggleNotification(!toggleNotification);
        router.visit(route('products.index'));
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

                  onClick={() => router.visit(route('products.index'))}

                >

                  X

                </button>

              </div>
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="dark:bg-grey-900 absolute inset-0 bg-gradient-to-r from-cyan-400 to-light-blue-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
        <div className="dark:bg-grey-900 relative px-4 py-10 shadow-lg sm:rounded-3xl sm:p-20">
         <form onSubmit={handleSubmit}>
            <div className="mb-4">

        <label htmlFor="is_payed" className="block text-gray-700 font-bold mb-2">

          Tipologia

        </label>

        <div className="flex">

          <div className="mr-4">

            <input

              type="radio"

              id="sfuso_true"

              name="sfuso"

              value={true}

              checked={typo}

              onChange={() => setTypo(true)}

              className="appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-500 checked:border-blue-500 focus:outline-none transition duration-150 ease-in-out"

            />

            <label htmlFor="is_payed_true" className="block text-gray-700 font-bold">

              Sfuso

            </label>

          </div>

          <div>

            <input

              type="radio"

              id="sfuso_false"

              name="aldettaglio"

              value={false}

              checked={!typo}

              onChange={() => setTypo(false)}

              className="appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-500 checked:border-blue-500 focus:outline-none transition duration-150 ease-in-out"

            />

            <label htmlFor="is_payed_false" className="block text-gray-700 font-bold">

              Dettaglio

            </label>

          </div>

        </div>

            </div>
            {typo === false ?
  <select

          id="productSelect"

          value={selectedProduct}

          onChange={(e) => setSelectedProduct(e.target.value)}

          className="w-full py-2 pl-3 pr-8 text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"

        >      {products.map((product) => (

        <option key={product.id} value={product.id}>

          {product.name}

        </option>

      ))}

            </select> : ''}
            
            <div className="mb-5">
              <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-600">Name</label>
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
              <label htmlFor="quantity" className="block mb-2 text-sm font-medium text-gray-600">Quantity</label>
              <input
                type="number"
                name="quantity"
                value={formData.quantity}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
             />
             {errors.quantity !== null ? <small style={{color:"red"}}>{errors.quantity}</small>: ''}
            </div>
                     {/* ... include the other fields in a similar manner ... */}
                         <div className="mb-5">
              <label htmlFor="um" className="block mb-2 text-sm font-medium text-gray-600">Unità di misura</label>
              <input
                type="text"
                name="um"
                value={formData.um}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
          {errors.um !== null ? <small style={{color:"red"}}>{errors.um}</small>: ''}
                     </div>
                         <div className="mb-5">
              <label htmlFor="category" className="block mb-2 text-sm font-medium text-gray-600">Categoria</label>
              <input
                type="text"
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
             />
             {errors.category !== null ? <small style={{color:"red"}}>{errors.category}</small>: ''}
                     </div>
                         <div className="mb-5">
              <label htmlFor="pieces" className="block mb-2 text-sm font-medium text-gray-600">Numero pezzi</label>
              <input
                type="number"
                name="pieces"
                value={formData.pieces}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
             />
             {errors.pieces !== null ? <small style={{color:"red"}}>{errors.pieces}</small>: ''}
                     </div>
                         <div className="mb-5">
              <label htmlFor="lot" className="block mb-2 text-sm font-medium text-gray-600">Lotto</label>
              <input
                type="string"
                name="lot"
                value={formData.lot}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
             />
             {errors.lot !== null ? <small style={{color:"red"}}>{errors.lot}</small>: ''}
                     </div>
                         <div className="mb-5">
              <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-600">Descrizione</label>
              <input
                type="text"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
                     </div>
                
            <div className="mb-5">
              <label htmlFor="image" className="block mb-2 text-sm font-medium text-gray-600">Image</label>
              <input
                type="file"
                name="image"
                onChange={handleImageChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
            </div>
            <div className="mt-6">
              <button
                type="submit"
                className="w-full px-4 py-2 text-white bg-indigo-500 rounded-md focus:bg-indigo-600 focus:outline-none"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
 );
}

