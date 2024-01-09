import { Spinner } from 'design-react-kit';
import React from 'react';

export default function Loading() {
  return (
    <div
      style={{ height: '80vh' }}
      className="container__loader d-flex justify-content-center align-items-center loading"
    >
      <div className="align-self-center">
        <div className="col-12 ">
          {/*<Spinner active double small={false} tag="span" />*/}
          <Spinner active />
        </div>
      </div>
    </div>
  );
}
