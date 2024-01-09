import React, { ReactNode, useCallback, useEffect } from 'react';

type PropsWithChildren<P> = P & { children?: ReactNode };

import EasySynergyLayout from '@/Layouts/EasySynergyLayout';

interface Props {
  status: number;

  renderHeader?(): JSX.Element;
}

export default function ErrorPage(props: PropsWithChildren<Props>) {
  const title = {
    503: '503: Service Unavailable',
    500: '500: Server Error',
    404: '404: Page Not Found',
    403: '403: Forbidden',
  }[props.status];

  const description = {
    503: 'Sorry, we are doing some maintenance. Please check back soon.',
    500: 'Whoops, something went wrong on our servers.',
    404: 'Sorry, the page you are looking for could not be found.',
    403: 'Sorry, you are forbidden from accessing this page.',
  }[props.status];

  return (
    <EasySynergyLayout title={'cico'}>
      <div className={'container text-center'}>
        <h1>{title}</h1>
        <div>{description}</div>
      </div>
    </EasySynergyLayout>
  );
}
