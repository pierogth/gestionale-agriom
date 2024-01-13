import React, { ReactNode, useState } from 'react';


type PropsWithChildren<P> = P & { children?: ReactNode };

interface Props {
  data: any[];
  columns: any[];
  actions: any[];
}

export default function TableBody(props: PropsWithChildren<Props>) {
   const [items, setItems] = useState(props.data);

    let myKeys = Object.keys(items[0]);
  return (
    <tbody style={{color:"lightgrey"}}>
                                {props.data.map((product) => {
                                    return  <tr
              className="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:border-neutral-500 dark:hover:bg-neutral-600"> {myKeys.map((key) => {
                                     
                                        return <th scope="col" className="px-6 py-4">{product[key]}</th>

                                    })}</tr>
                                 })}
                        
                         </tbody>
  );
}
