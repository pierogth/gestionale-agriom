import React, { ReactNode } from 'react';
import EsRenderCell from '@/Components/EasySynergyTable/EsRenderCell';
import EsRenderAction from '@/Components/EasySynergyTable/EsRenderAction';

type PropsWithChildren<P> = P & { children?: ReactNode };

interface Props {
  data: any[];
  columns: any[];
  actions: any[];
}

export default function EsTableBody(props: PropsWithChildren<Props>) {
  return (
    <tbody>
      {props.data.map((row: any, rKey: number) => {
        // console.log('row', row);
        return (
          <tr key={row.id}>
            {props.columns.map((column: any, index: number) => {
              return (
                <td key={row.id + '-' + column.accessorKey}>
                  <EsRenderCell
                    key={row.id}
                    column={column}
                    valueCell={row[column.accessorKey]}
                  />
                </td>
              );
            })}

            {props.actions.length > 0 && (
              <td className={'text-center'}>
                {props.actions.map((action: any) => {
                  return (
                    <EsRenderAction
                      key={action.title}
                      action={action}
                      row={row}
                    />
                  );
                })}
              </td>
            )}
          </tr>
        );
      })}
    </tbody>
  );
}
