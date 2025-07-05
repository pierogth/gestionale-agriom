import { useMemo, useState, useEffect } from 'react';
import {

    useMaterialReactTable,
  
    type MRT_ColumnDef,
  
    type MRT_Row,
  
    MRT_TableContainer,
  
  } from 'material-react-table';
import React from 'react';

//data must be stable reference (useState, useMemo, useQuery, defined outside of component, etc.)
const dataIn = [
  {
    name: 'John',
    age: 30,
  },
  {
    name: 'Sara',
    age: 25,
  },
];



export default function App() {

    const [data, setData] = useState(dataIn);

    const columns = useMemo<MRT_ColumnDef<any>[]>(

        () => [
            {
              accessorKey: 'name', //simple recommended way to define a column
              header: 'Name',
              muiTableHeadCellProps: { sx: { color: 'green' } }, //optional custom props
              Cell: ({ cell }) => <span>{cell.getValue()}</span>, //optional custom cell render
            },
            {
              accessorFn: (row) => row.age, //alternate way
              id: 'age', //id required if you use accessorFn instead of accessorKey
              header: 'Age',
              Header: () => <i>Age</i>, //optional custom header render
            },
          ],
          [],
    
      );
 

  //optionally, you can manage any/all of the table state yourself
  const [rowSelection, setRowSelection] = useState({});

  useEffect(() => {
    //do something when the row selection changes
  }, [rowSelection]);

 
  const table = useMaterialReactTable({

    autoResetPageIndex: false,

    columns,

    data,

    enableRowOrdering: true,

    enableSorting: true,

    enableColumnOrdering: true, //enable some features
    enableRowSelection: true,
    enablePagination: false, //disable a default feature
    onRowSelectionChange: setRowSelection, //hoist internal state to your own state (optional)
    state: { rowSelection }, //manage your own state, pass it back to the table (optional)

    muiRowDragHandleProps: ({ table }) => ({

      onDragEnd: () => {
        const { draggingRow, hoveredRow } = table.getState();
        if (hoveredRow && draggingRow) {
          data.splice(
            (hoveredRow as MRT_Row<any>).index,
            0,
            data.splice(draggingRow.index, 1)[0],
          );
          setData([...data]);
        }
      },
    }),
  });

  const someEventHandler = () => {
    //read the table state during an event from the table instance
    console.log(table.getState().sorting);
  };

  return (<div>
    <p>Ciao Pippo!</p>
    <MRT_TableContainer table={table} /> </div>//other more lightweight MRT sub components also available
  );
}