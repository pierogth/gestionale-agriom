import React, { Fragment, ReactNode, useEffect } from 'react';
import { Link } from '@inertiajs/inertia-react';
import { Button, Icon } from 'design-react-kit';
import { getSelectedRole } from '@/utils/functions';

type PropsWithChildren<P> = P & { children?: ReactNode };

interface Props {
  action: any;
  row: any;
}

export default function TableActions(props: PropsWithChildren<Props>) {
    //const selectedRole = getSelectedRole();
    const selectedRole = null;

  useEffect(() => {});

  return (
    <Fragment>
      {' '}
      {props.action.route ? (
       <Link
          href={`/${props.action.route}/${props.row.id}/${
            selectedRole ? selectedRole.id : null
          }`}
          title={props.action.title}
        > 
          <Icon
            icon={props.action.icon}
            size={'sm'}
            color={props.action.color}
            className={'mr-2'}
          />
        </Link>
      ) : (
        <Button color={'primary'} size={'sm'}>
          {props.action.title}
        </Button>
      )}
    </Fragment>
  );
}
