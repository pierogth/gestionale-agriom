import React from 'react';
import AppLayout from '@/Layouts/AppLayout';
import { router } from '@inertiajs/react';
import useRoute from '@/Hooks/useRoute';

const Employee = ({ employee }) => {
  const route = useRoute();

  return (
    <AppLayout
      title="Show"
      renderHeader={() => (
        <div className="flex justify-between">
          <h2></h2>
          <h2 className="font-semibold text-xl text-center text-gray-800 dark:text-gray-200 leading-tight">
            Employees
          </h2>
          <button
            onClick={() => router.visit(route('employees.index'))}
            className="flex-row-reverse w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
          >
            X
          </button>
        </div>
      )}
    >
      <div className="dark:bg-grey-900 h-screen flex items-center justify-center text-center">
        <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-2 text-white dark:text-gray-100">
            {employee.namesurnawme}
          </h2>
          <p className="text-lg mb-4 text-white dark:text-gray-100">Category: {employee.category}</p>
          <p className="text-lg mb-4 text-white dark:text-gray-100">Credit: {employee.credit}</p>
          <p className="text-lg mb-4 text-white dark:text-gray-100">Shops: {employee.shops}</p>
          <p className="text-lg mb-4 text-white dark:text-gray-100">Workhours: {employee.workhours}</p>
          <p className="text-lg mb-4 text-white dark:text-gray-100">Ehour: {employee.ehour}</p>
        </div>
      </div>
    </AppLayout>
  );
};

export default Employee;