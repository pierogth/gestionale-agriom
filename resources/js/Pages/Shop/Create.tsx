import React, { useState, useEffect } from 'react';
import { useForm, router } from '@inertiajs/react';
import useRoute from '@/Hooks/useRoute';
import LandForm from './LandForm';
import EmployeeForm from './EmployeeForm';

export default function App({ lands, employees }) {

  const [selectedLands, setSelectedLands] = useState([])
  const [selectedEmployees, setSelectedEmployees] = useState([])
  
 const [formData, setFormData] = useState({
    type: '',
    amount: '',
     description: '',
      data: '',
    file: '',
    /*TODO RELATIOMN*/
 });
  
  const [errors, setErrors] = useState({});
  
    useEffect(() => {
      form.setData(formData)
      console.log(formData);
    }, [formData]);
  
  useEffect(() => {
     handleSelectLands();
      form.setData(formData)
      console.log(formData);
  }, [selectedLands]);

  useEffect(() => {
     handleSelectEmployees();
      form.setData(formData)
      console.log(formData);
  }, [selectedEmployees]);

  const handleSelectEmployees = () => {
 
    setFormData((prevProps) => ({
      ...prevProps,
      selectedEmployees: selectedEmployees,
    }));
  }

  const handleSelectLands = () => {
 
    setFormData((prevProps) => ({
      ...prevProps,
      selectedLands: selectedLands,
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
  
   form.post(route('shops.store'), {
      onError: (e: any) => {
       setErrors(e);
       console.log("ERRORE---->"+e)
      },
      onSuccess: response => {
        console.log(response);
        //setToggleNotification(!toggleNotification);
        router.visit(route('shops.index'));
      },
      onFinish: () => {},
    });
 };

 return (
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-light-blue-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
          <form onSubmit={handleSubmit}>
            <div className="mb-5">
              <label htmlFor="type" className="block mb-2 text-sm font-medium text-gray-600">Tipologia</label>
              <input
                type="text"
                name="type"
                value={formData.type}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
            {errors.type !== null ? <small style={{color:"red"}}>{errors.type}</small>: ''}
            </div>
            <div className="mb-5">
              <label htmlFor="place" className="block mb-2 text-sm font-medium text-gray-600">€</label>
              <input
                type="number"
                name="amount"
                value={formData.amount}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
             />
             {errors.amount !== null ? <small style={{color:"red"}}>{errors.amount}</small>: ''}
            </div>
<div className="mb-5">
<LandForm products={lands} selectedProducts={selectedLands} setSelectedProducts={setSelectedLands}></LandForm>
           </div>
      <div className="mb-5">
<EmployeeForm products={employees} selectedProducts={selectedEmployees} setSelectedProducts={setSelectedEmployees}></EmployeeForm>
      </div>          <div className="mb-5">
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
                         <div className="mb-5">
              <label htmlFor="file" className="block mb-2 text-sm font-medium text-gray-600">File</label>
              <input
                type="file"
                name="file"
                value={formData.file}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
          {errors.file !== null ? <small style={{color:"red"}}>{errors.file}</small>: ''}
                     </div>
                      
                        
            <div className="mt-6">
              <button
                type="submit"
                className="w-full px-4 py-2 text-white bg-indigo-500 rounded-md focus:bg-indigo-600 focus:outline-none"
              >
                Crea Spesa
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
 );
}
