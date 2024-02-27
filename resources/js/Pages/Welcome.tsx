import { Link } from '@inertiajs/react';
import React from 'react';
import useRoute from '@/Hooks/useRoute';
import useTypedPage from '@/Hooks/useTypedPage';
import { Head } from '@inertiajs/react';
import ApplicationMark from '@/Components/ApplicationMark';
import DashboardSquare from '@/Components/DashboardSquare';

interface Props {
  canLogin: boolean;
  canRegister: boolean;
  laravelVersion: string;
  phpVersion: string;
}

export default function Welcome({
  canLogin,
  canRegister,
  laravelVersion,
  phpVersion,
}: Props) {
  const route = useRoute();
  const page = useTypedPage();

  return (
    <>
      <Head title="Welcome" />

      <div className="relative sm:flex sm:justify-center sm:items-center min-h-screen bg-dots-darker bg-center bg-gray-100 dark:bg-dots-lighter dark:bg-gray-900 selection:bg-red-500 selection:text-white">
        {canLogin ? (
          <div className="sm:fixed sm:top-0 sm:right-0 p-6 text-right">
            {page.props.auth.user ? (
             ''
            ) : (
              <>
                <Link
                  href={route('login')}
                  className="font-semibold text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white focus:outline focus:outline-2 focus:rounded-sm focus:outline-red-500"
                >
                  Log in
                </Link>

                {canRegister ? (
                  <Link
                    href={route('register')}
                    className="ml-4 font-semibold text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white focus:outline focus:outline-2 focus:rounded-sm focus:outline-red-500"
                  >
                    Register
                  </Link>
                ) : null}
              </>
            )}
          </div>
        ) : null}

<div className="flex flex-wrap justify-items-center" style={{justifyContent:"center"}}>
      <DashboardSquare title="Magazzino" href={route('products.index')} />
      <DashboardSquare title="Terreni" href={route('lands.index')} />
      <DashboardSquare title="Collaboratori" href={route('employees.index')} />
      <DashboardSquare title="Bilancio" href={route('dashboard')} />
      <DashboardSquare title="Rivenditori" href={route('retailers.index')} />
      <DashboardSquare title="Spese" href={route('shops.index')} />
      <DashboardSquare title="Entrate" href={route('entries.index')} />
      <DashboardSquare title="Lavorazioni" href={route('works.index')} />
    </div>
      </div>
    </>
  );
}
