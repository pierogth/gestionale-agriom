import { Link } from '@inertiajs/react';
import React from 'react';

interface Props {
  title: string;
  href: string;
}

const DashboardSquare: React.FC<Props> = ({ title, href }) => {
  return (<Link href={href} className="text-xl font-medium text-gray-800 dark:text-gray-200">
    <div className="w-64 h-64 flex items-center justify-center bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-lg shadow-md hover:bg-gray-100 dark:hover:bg-gray-700 transition duration-150 ease-in-out">
      
        {title}
     
    </div> </Link>
  );
};

export default DashboardSquare;