import React, { ReactNode, useState, useEffect } from "react";
import Pagination from '@/Components/Pagination';
import {
  filterData,
  sortingData,
  paginationData,
  recordFrom,
  recordTo,
} from '@/Components/TableFunctions';

type PropsWithChildren<P> = P & { children?: ReactNode };

interface Props {
  columns: any[];
  data: any[];
  searchInput: string;
  setData: Function;
  actions: boolean;
}

export function SortableTable(props: PropsWithChildren<Props>) {

   
const [dir, setDir] = useState(-1);
  const [orderColumn, seOrderColumn] = useState(() => {
    return props.columns[0].accessorKey;
  });
  const [currentPage, setCurrentPage] = useState(1);

  const [limit, setLimit] = useState(50);
  console.log(props);
  const [myData, setMyData] = useState(props.data);
  const [sortedData, setSortedData] = useState([]);

  const setOrderAndColumn = (column: string) => {
    setDir(-dir);
    seOrderColumn(column);
  };

  useEffect(() => {
    filterOrderPaginate();
  }, [dir, orderColumn, currentPage]);

  useEffect(() => {
    setCurrentPage(1);
    filterOrderPaginate();
  }, [props.searchInput]);

  useEffect(() => {
    setCurrentPage(1);
    filterOrderPaginate();
  }, []);

  const filterOrderPaginate = () => {
      let filter = filterData(props.searchInput, myData, props.columns);
      console.log("AWEEEE------>>>>"+filter);
    let sorted = sortingData(filter, orderColumn, dir);
    setSortedData(sorted);
    let paginated = paginationData(sorted, currentPage, limit);
    props.setData(paginated);
  };
    
    const [items, setItems] = useState(props.data);

    let myKeys = Object.keys(items[0]).slice(0,-1);


 

    return (
            <div className="flex flex-col">
            <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">

            
                
                <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                <div className="overflow-hidden">
                    <table className="min-w-full text-left text-sm font-light">
                    <thead className="border-b font-medium dark:border-neutral-500">
                                <tr style={{color:"lightgrey"}}>
                                    {myKeys.map((key) => {
                                        if(key!=='id')
                                        return <th scope="col" className="px-6 py-4"
                                            onClick={() => { setOrderAndColumn(key); }}>{key}</th>

                                  })}
                                    
                        </tr>
                    </thead>
                             {props.children}
              </table>
              
               <div className="row">
        <div className="col-12 text-center d-flex justify-content-center">
          <Pagination
            data={sortedData}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            limit={limit}
            setLimit={setLimit}
          />
        </div>
              </div>
              
                </div>
                </div>
            </div>
            </div>







    );






}