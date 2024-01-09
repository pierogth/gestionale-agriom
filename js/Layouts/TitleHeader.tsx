import React, { ReactNode } from 'react';
import Breadcrumbs from '@/Layouts/Breadcrumbs';
import { Col, Container, Row } from 'design-react-kit';
import FiltersDropdown from '@/Layouts/FiltersDropdown';

type PropsWithChildren<P> = P & { children?: ReactNode };

interface Props {
  buttons: boolean;
  filters: boolean;
}

export default function TitleHeader(props: PropsWithChildren<Props>) {
  return (
    <>
      <Container fluid className="px-4 py-2 mb-2" id="breadcrumb" tag="section">
        <Row>
          <Col className="col-7">
            <Breadcrumbs />
          </Col>

          <Col className="col-5 py-3 text-right">
            {props.children}

            <FiltersDropdown visible={props.filters} />
          </Col>
        </Row>
        {/*@todo espandere i filtri*/}
      </Container>
    </>
  );
}
