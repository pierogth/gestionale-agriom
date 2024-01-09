import React, { ReactNode, useEffect, useState } from 'react';
import {
  Pager,
  PagerItem,
  PagerLink,
  Icon,
  Table,
  Button,
  Input,
} from 'design-react-kit';

type PropsWithChildren<P> = P & { children?: ReactNode };

interface Props {
  data: any[];

  currentPage: number;
  setCurrentPage: Function;

  limit: number;

  setLimit: Function;
}

export default function EsPagination(props: PropsWithChildren<Props>) {
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
      <Button
        className={'pagination-button mr-1'}
        onClick={() => props.setCurrentPage(1)}
        size={'sm'}
        color={'primary'}
        disabled={props.currentPage === 1 ? true : false}
      >
        &#60;&#60;
      </Button>
      <Button
        className={'pagination-button'}
        onClick={() => changePage(props.currentPage - parseInt('1'))}
        size={'sm'}
        color={'primary'}
        disabled={props.currentPage === 1 ? true : false}
      >
        &#60;
      </Button>

      <div className={'pagination-text ml-4'}>pagina</div>
      <input
        type={'number'}
        step={1}
        className={'pagination-input'}
        onChange={e => changePage(e.target.value)}
        value={props.currentPage}
      />
      <div className={'pagination-text'}> di {pages}</div>
      <Button
        className={'pagination-button mr-1'}
        onClick={() => changePage(props.currentPage + parseInt('1'))}
        disabled={props.currentPage < pages ? false : true}
        size={'sm'}
        color={'primary'}
      >
        &#62;
      </Button>
      <Button
        className={'pagination-button'}
        onClick={() => props.setCurrentPage(pages)}
        disabled={props.currentPage < pages ? false : true}
        size={'sm'}
        color={'primary'}
      >
        &#62;&#62;
      </Button>
    </div>
  );
}
