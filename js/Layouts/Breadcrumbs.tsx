import React, { ReactNode } from 'react';
import { Breadcrumb, BreadcrumbItem } from 'design-react-kit';
import { Link, usePage } from '@inertiajs/react';

type PropsWithChildren<P> = P & { children?: ReactNode };

interface Props {
  url: string;
}

function BreadcrumbComponent(props: PropsWithChildren<Props>) {
  return (
    <>
      <nav aria-label="breadcrumb" className="breadcrumb-container">
        <Breadcrumb>
          <BreadcrumbItem>
            <Link href="/dashboard">Dashboard</Link>
            <span className="separator">/</span>
          </BreadcrumbItem>
          <BreadcrumbItem active>
            <Link href={props.url}> {props.url.substring(1)}</Link>
          </BreadcrumbItem>
          <span className="separator">›</span>
        </Breadcrumb>
      </nav>
      <h5>{props.url.substring(1).toUpperCase()}</h5>
    </>
  );
}

export default function Breadcrumbs() {
  const { url } = usePage();
  switch (url) {
    case '/dashboard':
      return null;
    default:
      return <BreadcrumbComponent url={url} />;
  }
}
