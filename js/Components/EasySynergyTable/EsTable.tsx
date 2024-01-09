import React, { Fragment, ReactNode, useEffect, useState } from 'react';
import { Table } from 'design-react-kit';
import EsPagination from '@/Components/EasySynergyTable/EsPagination';
import {
  filterData,
  sortingData,
  paginationData,
  recordFrom,
  recordTo,
} from '@/Components/EasySynergyTable/EsFunctions';

type PropsWithChildren<P> = P & { children?: ReactNode };

interface Props {
  columns: any[];
  data: any[];
  searchInput: string;
  setData: Function;
  actions: boolean;
}

export default function EsTable(props: PropsWithChildren<Props>) {
  const [dir, setDir] = useState(-1);
  const [orderColumn, seOrderColumn] = useState(() => {
    return props.columns[0].accessorKey;
  });
  const [currentPage, setCurrentPage] = useState(1);

  const [limit, setLimit] = useState(50);

  const [myData, setMyData] = useState([]);
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

  const filterOrderPaginate = () => {
    let filter = filterData(props.searchInput, props.data, props.columns);
    let sorted = sortingData(filter, orderColumn, dir);
    setSortedData(sorted);
    let paginated = paginationData(sorted, currentPage, limit);
    props.setData(paginated);
  };

  return (
    <>
      <div className={'row'}>
        <div className="col-12">
          <h6>
            {recordFrom(currentPage, limit)} -{' '}
            {recordTo(currentPage, limit, sortedData.length)} di{' '}
            {sortedData.length}
          </h6>
        </div>
      </div>
      <Table responsive hover size="sm">
        <thead>
          <tr>
            {props.columns.map((column: any, index: number) => {
              return (
                <Fragment key={index}>
                  <th
                    className="sortable"
                    style={{ width: column.width }}
                    onClick={() => setOrderAndColumn(column.accessorKey)}
                  >
                    {column.header}

                    {orderColumn == column.accessorKey ? (
                      <>
                        {dir == 1 ? (
                          <span className={'ml-2'}>&#8593;</span>
                        ) : (
                          <span className={'ml-2'}>&#8595;</span>
                        )}
                      </>
                    ) : (
                      <></>
                    )}
                  </th>
                </Fragment>
              );
            })}
            <th style={{ width: 'auto' }}></th>
          </tr>
        </thead>

        {props.children}
      </Table>

      <div className="row">
        <div className="col-12 text-center d-flex justify-content-center">
          <EsPagination
            data={sortedData}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            limit={limit}
            setLimit={setLimit}
          />
        </div>
      </div>
    </>
  );
}
