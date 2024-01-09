import { Button, Col, Icon } from 'design-react-kit';
import React, { ReactNode } from 'react';

type PropsWithChildren<P> = P & { children?: ReactNode };

interface Props {
  visible: boolean;
  action: Function;
  resource: string;
  page: string;
}

export default function ShortcutsButtons(props: PropsWithChildren<Props>) {
  return props.visible && props.page === 'index' ? (
    <>
      <Button
        color="primary"
        size="sm"
        icon
        onClick={() => {
          console.log(props.action);
          props.action();
        }}
      >
        <Icon color="white" icon="it-plus" /> Nuova {props.resource}
      </Button>
      {/*<Button color="success" size="sm" icon>
            <Icon color="white" icon="it-check" /> Salva
          </Button>*/}
    </>
  ) : (
    <>
      <Button color="danger" outline size="sm" icon className="mr-5">
        <Icon color="danger" icon="it-delete" /> Elimina
      </Button>
      <Button color="cancel">Annulla</Button>
      <Button color="success" size="sm" icon>
        <Icon color="white" icon="it-plus" /> Nuovo utente
      </Button>
      {/*<Button color="success" size="sm" icon>
        <Icon color="white" icon="it-check" /> Salva
      </Button>*/}
    </>
  );
}
