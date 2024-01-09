import React, { ReactNode, useState } from 'react';
type PropsWithChildren<P> = P & { children?: ReactNode };

type ChildrenProps = {};
export default function LoginLayout(props: PropsWithChildren<ChildrenProps>) {
  return (
    <div className={'container-fluid h-100'}>
      <div className="row h-100">
        <div
          className={'col-12 col-md-6 pippo'}
          style={{ marginLeft: 'inherit', marginRight: '0px' }}
        >
          <div className="h-100 bg-base">
            <div className={'pt-4 pl-5'}>
              <img src={'/images/logo.png'} width={'230px'} />
            </div>
          </div>
        </div>
        <div className={'col-12 col-md-6'}>{props.children}</div>
      </div>
    </div>
  );
}
