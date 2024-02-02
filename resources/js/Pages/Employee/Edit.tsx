import React, { useState, useEffect } from 'react';
import { useForm, router } from '@inertiajs/react';
import useRoute from '@/Hooks/useRoute';

const App = ({employee}) => {
 const [formData, setFormData] = useState({
    namesurname: employee.namesurname,
    category: employee.category,
    credit: employee.credit,
    shops: employee.shops,
    workhours: employee.workhours,
    ehour: employee.ehour,

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
  
   form.put(route('employees.update', employee.id), {
      onError: (e: any) => {
       setErrors(e);
       console.log("ERRORE---->"+e)
      },
      onSuccess: response => {
        console.log(response);
        //setToggleNotification(!toggleNotification);
        router.visit(route('employees.index'));
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

                  onClick={() => router.visit(route('employees.index'))}

                >

                  X

                </button>

              </div>
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
          <div className="dark:bg-grey-900 absolute inset-0 bg-gradient-to-r from-cyan-400 to-light-blue-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
        <div className="dark:bg-grey-900 relative px-4 py-10 shadow-lg sm:rounded-3xl sm:p-20">
          <form onSubmit={handleSubmit}>
            <div className="mb-5">
              <label htmlFor="namesurname" className="block mb-2 text-sm font-medium text-gray-600">Nome e Cognome</label>
              <input
                type="text"
                name="namesurname"
                value={formData.namesurname}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
            {errors.namesurname !== null ? <small style={{color:"red"}}>{errors.namesurname}</small>: ''}
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
                     {/* ... include the other fields in a similar manner ... */}
                         <div className="mb-5">
              <label htmlFor="credit" className="block mb-2 text-sm font-medium text-gray-600">Credito</label>
              <input
                type="number"
                name="credit"
                value={formData.credit}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
          {errors.credit !== null ? <small style={{color:"red"}}>{errors.credit}</small>: ''}
                     </div>
                         <div className="mb-5">
              <label htmlFor="shops" className="block mb-2 text-sm font-medium text-gray-600">Spese</label>
              <input
                type="number"
                name="shops"
                value={formData.shops}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
             />
             {errors.um !== null ? <small style={{color:"red"}}>{errors.shops}</small>: ''}
                     </div>
                         <div className="mb-5">
              <label htmlFor="workhours" className="block mb-2 text-sm font-medium text-gray-600">N° ore di lavoro</label>
              <input
                type="number"
                name="workhours"
                value={formData.workhours}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
             />
             {errors.workhours !== null ? <small style={{color:"red"}}>{errors.workhours}</small>: ''}
                     </div>
                            <div className="mb-5">
              <label htmlFor="ehours" className="block mb-2 text-sm font-medium text-gray-600">€-ora</label>
              <input
                type="number"
                name="ehours"
                value={formData.ehour}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
             />
             {errors.ehour !== null ? <small style={{color:"red"}}>{errors.ehour}</small>: ''}
                     </div>
                        
            <div className="mt-6">
              <button
                type="submit"
                className="w-full px-4 py-2 text-white bg-indigo-500 rounded-md focus:bg-indigo-600 focus:outline-none"
              >
                Aggiorna Collaboratore
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
 );
}

export default App;