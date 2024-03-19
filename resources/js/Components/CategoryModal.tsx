import { forEach } from 'lodash';
import React, { useState } from 'react';
import { FiTrash2 } from 'react-icons/fi';
import Modal from 'react-modal';
import useRoute from '@/Hooks/useRoute';
import { router } from '@inertiajs/core';



interface ModalProps {
  categories: Array<any>;
  isOpen: boolean;
  onRequestClose: () => void;
  onSubmit: (categoryName: string) => void;
}

const CategoryModal: React.FC<ModalProps> = ({ categories, isOpen, onRequestClose, onSubmit, nameRoute }) => {
  const [categoryName, setCategoryName] = useState('');
  const [categoris, setCategoris] = useState(categories);
    const routerx = useRoute();
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(categoryName);
    setCategoris([...categoris, {name: categoryName}])
    onRequestClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className="bg-white rounded-lg shadow-xl p-6 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
      overlayClassName="fixed inset-0 bg-black bg-opacity-50"
    >
      <button
        className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
        onClick={onRequestClose}
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
      {categoris.map((category: {
        um: string;
          id: number; name: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined; 
})=>{
        return <tr className="justify-content-between border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:border-neutral-500 dark:hover:bg-neutral-600">
            
            <td scope="col" className="px-6 py-4">{category.name}{category.um}</td>
            <div className="flex space-x-2">
            <FiTrash2 className="w-6 h-6 text-red-500 hover:text-red-700 cursor-pointer" onClick={() => { router.post(routerx(nameRoute+'.delete'),{id:category.id});
            console.log('--------->>>>',categoris.filter(cat=>{return cat.id!==category.id})); setCategoris(categoris.filter(cat=>{console.log("XXXXX",cat.id, category.id);return cat.id!=category.id})) }} />
            </div>
</tr>
      })}
      {/* <h2 className="text-xl font-semibold mb-6">Aggiungi Categoria</h2> */}
      <form onSubmit={handleSubmit}>
        <input
          className="w-full p-2 mb-4 border border-gray-300 rounded-lg"
          type="text"
          value={categoryName}
          onChange={(e) => setCategoryName(e.target.value)}
          placeholder="Nome categoria"
        />
        <button
          className="w-full p-2 bg-blue-500 text-white rounded-lg"
          type="submit"
        >
          Aggiungi
        </button>
      </form>
    </Modal>
  );
};


export default CategoryModal;