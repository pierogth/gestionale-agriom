import React, { ReactNode, useEffect, useState } from 'react';


type PropsWithChildren<P> = P & { children?: ReactNode };

interface Props {
  data: any[];

  currentPage: number;
  setCurrentPage: Function;

  limit: number;

  setLimit: Function;
}

export default function Pagination(props: PropsWithChildren<Props>) {
  const [pages, setPages] = useState(1);
  const [pagesArray, setPagesArray] = useState([]);

  const listPage = () => {
    let pages = Math.ceil(props.data.length / props.limit);
    setPages(pages);
    let list: any = [];
    for (let i = 0; i < pages; i++) {
      list.push(i + 1);
    }

    setPagesArray(list);
  };

  useEffect(() => {
    listPage();
  }, [props.data]);

  const changePage = (page: any) => {
    if (page > pages) {
      props.setCurrentPage(pages);
    }
    if (page <= 0) {
      props.setCurrentPage(1);
    }
    if (page > 0 && page <= pages) {
      props.setCurrentPage(page);
    }
  };

  return (
    <div className={'container d-flex justify-content-center mt-2 mb-5 '}>
   

      <span style={{ "color": "white" }}> pagina </span>
      <input
        type={'number'}
        step={1}
        className={'pagination-input'}
        onChange={e => changePage(e.target.value)}
        value={props.currentPage}
      />
      <span style={{ "color": "white" }}> di {pages}</span>
  
     
    </div>
  );
}
