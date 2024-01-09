import { Button, Card, CardBody, Col, Collapse, Icon } from 'design-react-kit';
import React, { ReactNode, useState } from 'react';

type PropsWithChildren<P> = P & { children?: ReactNode };

interface Props {
  visible: boolean;
}

export default function FiltersDropdown(props: PropsWithChildren<Props>) {
  const [collapse, setCollapse] = useState(false);
  const toggle = () => {
    setCollapse(!collapse);
  };

  return props.visible ? (
    <>
      <Button
        color="filter"
        size="sm"
        outline
        onClick={toggle}
        aria-expanded={collapse}
      >
        Filtri <Icon icon="it-expand" />
      </Button>
      <Col>
        <Collapse isOpen={collapse}>
          <Card className="bg-body">
            <CardBody className="py-3 px-0">Custom Filters</CardBody>
          </Card>
        </Collapse>
      </Col>
    </>
  ) : null;
}
