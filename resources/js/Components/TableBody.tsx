import React, { ReactNode, useState } from 'react';
//import TableActions from '@/Components/TableActions';
import { FiEye, FiEdit, FiTrash2 } from 'react-icons/fi';
import { useForm, router } from '@inertiajs/react';
import useRoute from '@/Hooks/useRoute';

type PropsWithChildren<P> = P & { children?: ReactNode };

interface Props {
  data: any[];
  columns: any[];
  actions: any[];
  routes: string;
}

export default function TableBody(props: PropsWithChildren<Props>) {
  const [items, setItems] = useState(props.data);
  console.log(props.data)
const route = useRoute();
  let myKeys = Object.keys(props.data[0]).slice(0,-1);
  console.log(myKeys)
  return (
    <tbody style={{color:"lightgrey"}}>
                                {props.data.map((product) => {console.log(product)
                                    return  <tr
              className="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:border-neutral-500 dark:hover:bg-neutral-600"> {myKeys.map((key) => {
                                      if(key!=='id')
                                        return <td scope="col" className="px-6 py-4">{product[key]}</td>

              })}     <td>

        <div className="flex space-x-2">

          <FiEye className="w-6 h-6 text-blue-500 hover:text-blue-700 cursor-pointer" onClick={()=>router.visit(route(props.routes+'.show',product.id))}/>

          <FiEdit className="w-6 h-6 text-green-500 hover:text-green-700 cursor-pointer" onClick={()=>router.visit(route(props.routes+'.edit',product.id))}/>

                                          <FiTrash2 className="w-6 h-6 text-red-500 hover:text-red-700 cursor-pointer" onClick={() => { router.delete(route(props.routes + '.destroy', product.id)); console.log(product)}} />

        </div>

      </td>
                                    </tr>
                                 })}
                        
       {/* {props.actions.length > 0 && (
              <td className={'text-center'}>
                {props.actions.map((action: any) => {
                  return (
                    <TableActions
                      key={action.title}
                      action={action}
                      row={row}
                    />
                  );
                })}
              </td>
      )} */}
  
      
                         </tbody>
  );
}
