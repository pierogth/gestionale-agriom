import React, { ReactNode, useEffect } from 'react';
import Footer from '@/Pages/Auth/Footer';
import { Menu } from '@/Layouts/Menu';
import { setInitialState } from '@/store';
import { useDispatch } from 'react-redux';
import { Head } from '@inertiajs/react';

type PropsWithChildren<P> = P & { children?: ReactNode };

interface Props {
  title: string;

  renderHeader?(): JSX.Element;
}

export default function EasySynergyLayout(props: PropsWithChildren<Props>) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setInitialState());
  }, []);

  return (
    <>
      <Head title={props.title} />
      <Menu />
      <main role="main" className="flex-shrink-0">
        <div className="container-fluid">{props.children}</div>
      </main>
      <Footer />
    </>
  );
}
