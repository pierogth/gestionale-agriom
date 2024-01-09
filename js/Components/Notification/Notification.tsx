import React, { ReactNode, useEffect } from 'react';
import { Button, NotificationManager, notify } from 'design-react-kit';
import { NotificationStates } from '@/types/types';

type PropsWithChildren<P> = P & { children?: ReactNode };

interface Props {
  toggle: boolean;
  title: string;
  body: string;
  state: NotificationStates;
}

export default function Notification(props: PropsWithChildren<Props>) {
  useEffect(() => {
    if (props.toggle) {
      notify(props.title, props.body, { state: props.state, fix: 'top' });
    }
  }, [props.toggle]);

  return (
    <div>
      <NotificationManager containerId="esempio-base" duration={5000} />
    </div>
  );
}
