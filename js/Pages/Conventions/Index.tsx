import EasySynergyLayout from '@/Layouts/EasySynergyLayout';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import TitleHeader from '@/Layouts/TitleHeader';
import EsTable from '@/Components/EasySynergyTable/EsTable';
import EsTableBody from '@/Components/EasySynergyTable/EsTableBody';
import Loading from '@/Layouts/Loading';
import { Button, Col, Container, Icon, Row } from 'design-react-kit';
import route from 'ziggy-js';
import { router } from '@inertiajs/react';
import { getSelectedRole } from '@/utils/functions';

export default function Index() {
  const [columns, setColumns] = useState([]);
  const [conventions, setConventions] = useState([]);
  const [canCreateConvention, setCanCreateConventions] = useState(false);

  const [dataFilterOrderAndPaginate, setDataFilterOrderAndPaginate] = useState(
    [],
  );
  const [actions, setActions] = useState([]);
  const [searchInput, setSearchInput] = useState('');
  const [loading, setLoading] = useState(true);

  const getListing = async (selectdRole: any) => {
    setLoading(true);
    try {
      const response: any = await axios.get(
        `/api/conventions/${selectdRole.role_id}`,
      );
      setColumns(response.data.columns);
      setConventions(response.data.conventions);
      setData(response.data.conventions);
      setActions(response.data.actions);
      setCanCreateConventions(response.data.canCreateConvention);
    } catch (e: any) {
      console.log(e.response.data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const selectedRole = getSelectedRole();
    if (selectedRole) {
      getListing(selectedRole);
    } else {
      router.visit(route('dashboard'));
    }
  }, []);

  const [isFocused, toggleFocus] = useState(false);

  const toggleFocusLabel = () => toggleFocus(true);
  const toggleBlurLabel = (e: any) => {
    if (e.target.value === '') {
      toggleFocus(!isFocused);
    }
  };

  const goToCreatePage = () => {
    router.visit(route('conventions.new'));
  };

  const [data, setData] = React.useState(() => [...conventions]);

  return (
    <EasySynergyLayout
      title={'Convenzioni'}
      renderHeader={() => (
        <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
          Convenzioni
        </h2>
      )}
    >
      {/**/}
      <TitleHeader buttons={false} filters={true}>
        {canCreateConvention && (
          <Button
            icon
            className={'mr-2'}
            size={'sm'}
            color={'success'}
            onClick={() => goToCreatePage()}
          >
            {' '}
            <Icon color="white" icon="it-plus" />
            Aggiungi Convenzione
          </Button>
        )}
      </TitleHeader>
      <Container
        fluid
        className={''}
        style={{ background: '#ffffff', height: '100vh' }}
      >
        {loading ? (
          <Loading />
        ) : (
          <Row className={'bg-white'}>
            <Col sm="9" className={'mt-0'}></Col>
            <Col sm="3" className="px-lg-4 mt-5 bg-whitealign-self-end">
              <div className="form-group" style={{ marginBottom: '10px' }}>
                <div className="input-group">
                  <div className="input-group-prepend">
                    <div className="input-group-text">
                      <Icon icon="it-search" aria-hidden size="sm" />
                    </div>
                  </div>

                  <input
                    type="text"
                    className={
                      isFocused ? 'form-control focus--mouse' : 'form-control'
                    }
                    onFocus={toggleFocusLabel}
                    onBlur={toggleBlurLabel}
                    id="input-group-1"
                    name="input-group-1"
                    placeholder={'Ricerca'}
                    onChange={e => setSearchInput(e.target.value)}
                  />
                </div>
              </div>
            </Col>
          </Row>
        )}

        <Row>
          <Col
            className="px-lg-4 bg-white"
            style={{
              overflowY: 'auto',
              maxHeight: '55vh',
              minHeight: '55vh',
            }}
          >
            {columns.length > 0 && (
              <EsTable
                columns={columns}
                data={conventions}
                setData={setDataFilterOrderAndPaginate}
                searchInput={searchInput}
                actions={actions.length > 0 ? true : false}
              >
                <EsTableBody
                  columns={columns}
                  data={dataFilterOrderAndPaginate}
                  actions={actions}
                />
              </EsTable>
            )}
          </Col>
        </Row>
      </Container>
    </EasySynergyLayout>
  );
}
