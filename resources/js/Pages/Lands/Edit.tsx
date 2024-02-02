import React, { useState, useEffect } from 'react';
import { useForm, router } from '@inertiajs/react';
import useRoute from '@/Hooks/useRoute';

const App = ({land}) => {
 const [formData, setFormData] = useState({
    name: land.name,
    owner: land.owner,
    dimension: land.dimension.toString(),
    um: land.um,
    coltivation: land.coltivation,
    workhours: land.workhours,
     production: land.production,
    description: land.description,

 });
  
  const [errors, setErrors] = useState({});
  
    useEffect(() => {
      form.setData(formData)
      console.log(formData);
  }, [formData]);
  
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



 const handleSubmit = (event) => {
    event.preventDefault();
  
   form.put(route('lands.update', land.id), {
      onError: (e: any) => {
       setErrors(e);
       console.log("ERRORE---->"+e)
      },
      onSuccess: response => {
        console.log(response);
        //setToggleNotification(!toggleNotification);
        router.visit(route('lands.index'));
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

                  onClick={() => router.visit(route('lands.index'))}

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
              <label htmlFor="quantity" className="block mb-2 text-sm font-medium text-gray-600">Proprietario</label>
              <input
                type="text"
                name="owner"
                value={formData.owner}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
             />
             {errors.owner !== null ? <small style={{color:"red"}}>{errors.owner}</small>: ''}
            </div>
                     {/* ... include the other fields in a similar manner ... */}
                         <div className="mb-5">
              <label htmlFor="dimension" className="block mb-2 text-sm font-medium text-gray-600">Dimensione</label>
              <input
                type="text"
                name="dimension"
                value={formData.dimension}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
          {errors.dimension !== null ? <small style={{color:"red"}}>{errors.dimension}</small>: ''}
                     </div>
                         <div className="mb-5">
              <label htmlFor="category" className="block mb-2 text-sm font-medium text-gray-600">Unità di misura</label>
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
              <label htmlFor="pieces" className="block mb-2 text-sm font-medium text-gray-600">Coltivazione</label>
              <input
                type="text"
                name="coltivation"
                value={formData.coltivation}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
             />
             {errors.coltivation !== null ? <small style={{color:"red"}}>{errors.coltivation}</small>: ''}
                     </div>
                            <div className="mb-5">
              <label htmlFor="pieces" className="block mb-2 text-sm font-medium text-gray-600">Descrizione</label>
              <input
                type="text"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
             />
             {errors.description !== null ? <small style={{color:"red"}}>{errors.description}</small>: ''}
                     </div>
                        
            <div className="mt-6">
              <button
                type="submit"
                className="w-full px-4 py-2 text-white bg-indigo-500 rounded-md focus:bg-indigo-600 focus:outline-none"
              >
                Aggiorna Terreno
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
 );
}

export default App;