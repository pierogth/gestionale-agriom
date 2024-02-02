import React, { useState, useEffect } from 'react';
import { useForm, router } from '@inertiajs/react';
import useRoute from '@/Hooks/useRoute';
import ProductForm from './ProductForm';


export default function App({ employees, lands }) {

  const [selectedEmployees, setSelectedEmployees] = useState([]);
        const [selectedLand, setSelectedLand] = useState(lands[0].id.toString());


 const [formData, setFormData] = useState({
    where: '',
     description: '',
      data: '',
     ehour: '',
   workhours: '',
   land_id:''
    /*TODO RELATIOMN*/
 });
  
  const [errors, setErrors] = useState({});
  
    useEffect(() => {
      form.setData(formData)
      console.log(formData);
  }, [formData]);

    useEffect(() => {
     console.log(employees);
     handleSelectEmployees();
      form.setData(formData)
      console.log(formData);
    }, [selectedEmployees]);
  
   useEffect(() => {
     console.log(employees);
     handleSelectLand();
      form.setData(formData)
      console.log(formData);
   }, [selectedLand]);
  
   const handleSelectLand = () => {
 
    setFormData((prevProps) => ({
      ...prevProps,
      where: selectedLand,
    }));
  }
  
    const handleSelectEmployees = () => {
 
    setFormData((prevProps) => ({
      ...prevProps,
      selectedEmployees: selectedEmployees,
    }));
  }
  
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
  
   form.post(route('works.store'), {
      onError: (e: any) => {
       setErrors(e);
       console.log("ERRORE---->"+e)
      },
      onSuccess: response => {
        console.log(response);
        //setToggleNotification(!toggleNotification);
        router.visit(route('works.index'));
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

                  onClick={() => router.visit(route('works.index'))}

                >

                  X

                </button>

              </div>
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="dark:bg-grey-900 absolute inset-0 bg-gradient-to-r from-cyan-400 to-light-blue-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
        <div className="dark:bg-grey-900 relative px-4 py-10 shadow-lg sm:rounded-3xl sm:p-20">
          <form onSubmit={handleSubmit}>
            <div className="mb-5">
              <label htmlFor="type" className="block mb-2 text-sm font-medium text-gray-600">Dove</label>
           <select

          id="productSelect"

          value={selectedLand}

               onChange={(e) => setSelectedLand(e.target.value)}

          className="w-full py-2 pl-3 pr-8 text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"

        >      {lands.map((land) => (

        <option key={land.id} value={land.id}>

          {land.name}

        </option>

      ))}

            </select> 
            {errors.where !== null ? <small style={{color:"red"}}>{errors.where}</small>: ''}
           </div>
            <div className="mb-5">
<ProductForm products={employees} selectedProducts={selectedEmployees} setSelectedProducts={setSelectedEmployees}></ProductForm>
      </div>   
            <div className="mb-5">
              <label htmlFor="place" className="block mb-2 text-sm font-medium text-gray-600">€-ora</label>
              <input
                type="number"
                name="ehour"
                value={formData.ehour}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
             />
             {errors.ehour !== null ? <small style={{color:"red"}}>{errors.ehour}</small>: ''}
                     </div>
                     
                      <div className="mb-5">
              <label htmlFor="place" className="block mb-2 text-sm font-medium text-gray-600">N° ore di lavoro</label>
              <input
                type="number"
                name="workhours"
                value={formData.workhours}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
             />
             {errors.workhours !== null ? <small style={{color:"red"}}>{errors.workhours}</small>: ''}
            </div>
                     {/* ... include the other fields in a similar manner ... */}
                         <div className="mb-5">
              <label htmlFor="balance" className="block mb-2 text-sm font-medium text-gray-600">Descrizione</label>
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
              <label htmlFor="data" className="block mb-2 text-sm font-medium text-gray-600">Data</label>
              <input
                type="date"
                name="data"
                value={formData.data}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
          {errors.data !== null ? <small style={{color:"red"}}>{errors.data}</small>: ''}
                     </div>
                            {/* ... include the other fields in a similar manner ... */}
                        
                      
                        
            <div className="mt-6">
              <button
                type="submit"
                className="w-full px-4 py-2 text-white bg-indigo-500 rounded-md focus:bg-indigo-600 focus:outline-none"
              >
                Crea Lavorazione
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
 );
}

