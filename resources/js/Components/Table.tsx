import React from "react";

export function SortableTable({products}) {

    let myKeys = Object.keys(products[0]);

    return (
            <div className="flex flex-col">
            <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                <div className="overflow-hidden">
                    <table className="min-w-full text-left text-sm font-light">
                    <thead className="border-b font-medium dark:border-neutral-500">
                                <tr style={{color:"lightgrey"}}>
                                    {myKeys.map((key) => {
                                        
                                    return  <th scope="col" className="px-6 py-4">{key}</th>

                                  })}
                                    
                        </tr>
                    </thead>
                            <tbody style={{color:"lightgrey"}}>
                                {products.map((product) => {
                                    return  <tr
              class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:border-neutral-500 dark:hover:bg-neutral-600"> {myKeys.map((key) => {
                                     
                                        return <th scope="col" className="px-6 py-4">{product[key]}</th>

                                    })}</tr>
                                 })}
                        
                         </tbody>
                    </table>
                </div>
                </div>
            </div>
            </div>







    );






}