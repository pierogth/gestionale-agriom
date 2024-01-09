import { Link } from '@inertiajs/react';
import React, { useEffect } from 'react';
import useRoute from '@/Hooks/useRoute';
import useTypedPage from '@/Hooks/useTypedPage';
import { Head } from '@inertiajs/react';
import { setInitialState } from '@/store';
import { useDispatch } from 'react-redux';

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
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setInitialState());
  }, []);

  return (
    <>
      <Head title="Welcome" />

      <div className={'container-fluid bg-base h-100'}>
        <div className="relative sm:flex sm:justify-center sm:items-center min-h-screen bg-dots-darker bg-center bg-gray-700 dark:bg-dots-lighter dark:bg-gray-900 selection:bg-red-500 selection:text-white">
          {canLogin ? (
            <div className="sm:fixed sm:top-0 sm:right-0 p-6 text-right">
              {page.props.auth.user ? (
                <Link href={route('dashboard')} className="">
                  Dashboard
                </Link>
              ) : (
                <>
                  <Link
                    href={route('login')}
                    className="btn btn-sm btn-success font-semibold text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white focus:outline focus:outline-2 focus:rounded-sm focus:outline-red-500"
                  >
                    Log in
                  </Link>

                  {canRegister ? (
                    <Link
                      href={route('register')}
                      className="btn btn-sm btn-success  font-semibold text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white focus:outline focus:outline-2 focus:rounded-sm focus:outline-red-500"
                    >
                      Register
                    </Link>
                  ) : null}
                </>
              )}
            </div>
          ) : null}

          <div className="max-w-7xl mx-auto p-6 lg:p-8">
            <img src={'/images/logo.png'} width={'230px'} />
          </div>
        </div>
      </div>
    </>
  );
}
