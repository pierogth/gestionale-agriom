import React, { ReactNode } from 'react';
import { Chip, ChipLabel, Icon } from 'design-react-kit';

type PropsWithChildren<P> = P & { children?: ReactNode };

interface Props {
  column: any;
  valueCell: any;
}

export default function EsRenderCell(props: PropsWithChildren<Props>) {
  if (props.column.type) {
    if (props.column.type === 'date') {
      let date = new Date(props.valueCell).toLocaleString('it-IT', {
        month: '2-digit',
        day: '2-digit',
        year: 'numeric',
      });

      return (
        <div>
          <Icon icon="it-calendar" size="xs" />
          <span className={'evidence-date ml-1'}>{date}</span>
        </div>
      );
    } else if (props.column.type === 'chip') {
      let color = 'primary';
      if (props.column.color) {
        color = props.column.color;
      }
      return (
        <Chip color={color}>
          <ChipLabel>{props.valueCell}</ChipLabel>
        </Chip>
      );
    } else if (props.column.type === 'array') {
      if (props.valueCell !== undefined) {
        return props.valueCell.map((val: any, index: number) => {
          return (
            <div key={val.id} className={'my-chip ml-1'}>
              {val[props.column.label]}
            </div>
          );
        });
      } else {
        return '';
      }
    } else if (props.column.type === 'boolean') {
      return (
        <div>
          {props.valueCell == 0 ? (
            <Icon icon={'it-close-circle'} color={'danger'} size={'sm'} />
          ) : (
            <Icon icon={'it-check-circle'} color={'success'} size={'sm'} />
          )}

          <span className={'evidence-small'}>
            {props.column.label[props.valueCell]}
          </span>
        </div>
      );
    }
  } else {
    return (
      <span className={props.column.class ? props.column.class : ''}>
        {props.valueCell}
      </span>
    );
  }
}
