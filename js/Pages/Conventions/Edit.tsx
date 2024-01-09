import React, { useEffect, useState } from 'react';
import EasySynergyLayout from '@/Layouts/EasySynergyLayout';
import TitleHeader from '@/Layouts/TitleHeader';
import Form from '@/Pages/Conventions/Form';
import { Alert, Button, Col, Icon, Progress, Row } from 'design-react-kit';
import moment from 'moment';
import useTypedPage from '@/Hooks/useTypedPage';
import { useForm, router } from '@inertiajs/react';
import route from 'ziggy-js';
import Notification from '@/Components/Notification/Notification';
import { getSelectedRole } from '@/utils/functions';
import Loading from '@/Layouts/Loading';

import { NotificationStates } from '@/types/types';

export default function Edit({ convention }: any) {
  const [conventionsData, setConventionsData] = useState(
    convention.conventions_details,
  );

  const [errors, setErrors] = useState([]);
  const [showAlert, setShowAlert] = useState(false);
  const [message, setMessage] = useState('');
  const [state, setState] = useState<NotificationStates>('success');
  const [loading, setLoading] = useState(true);

  const selectedRole = getSelectedRole();

  const form = useForm({
    conventions_details: [],
    role: {},
  });
  useEffect(() => {
    setLoading(true);
    if (selectedRole) {
      const { pathname } = window.location;
      const splitPathname = pathname.split('/');
      const url_role_id = splitPathname[splitPathname.length - 1];
      const role_id = selectedRole.role_id;
      if (parseInt(url_role_id) !== role_id) {
        router.visit(route('dashboard'));
      }

      const myData = conventionsData.map((conv: any) => {
        return {
          id: conv.id,
          url_referral: conv.url_referral,
          kid: conv.kid,
          id_purpose: conv.id_purpose,
          id_client: conv.id_client,
        };
      });
      form.setData('conventions_details', myData);
      /*
      form.setData({
        ...form.data,
        conventions_details: myData,
        role: selectedRole.role_id,
      });
      */
      setLoading(false);
    } else {
      setLoading(false);

      router.visit(route('dashboard'));
    }
  }, []);

  const handleSumbit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (selectedRole) {
      form.post(
        route('conventions.update', [convention.id, selectedRole.role_id]),
        {
          onError: (e: any) => {
            setErrors(e);
            setShowAlert(true);

            setMessage(
              'Errore nella compilazione dati! Modifiche non salvate.',
            );
            setState('error');
            setTimeout(() => {
              setShowAlert(false);
            }, 3000);
          },
          onSuccess: response => {
            setErrors([]);

            setShowAlert(true);
            setState('success');

            setMessage('Configurazione modificata con successo!');

            setTimeout(() => {
              setShowAlert(false);
            }, 3000);

            //setToggleNotification(!toggleNotification);
            //router.visit(route('conventions.index'));
          },
          onFinish: () => {
            setLoading(false);
          },
        },
      );
    } else {
      router.visit(route('dashboard'));
    }
  };

  // @ts-ignore
  // @ts-ignore
  return (
    <EasySynergyLayout title={'Modifica Convenzione'}>
      <TitleHeader buttons={true} filters={false}>
        <Button
          icon
          className="mr-2 btn-progress"
          size={'sm'}
          color={'success'}
          onClick={handleSumbit}
        >
          {' '}
          <Icon color="white" icon="it-plus" />
          Salva
          {
            /*processing*/ false ? (
              <span>
                <Progress indeterminate />
              </span>
            ) : null
          }
        </Button>
      </TitleHeader>

      {state && (
        <Notification
          toggle={showAlert}
          title={'Modifica convenzione'}
          body={message}
          state={state}
        />
      )}

      {loading ? (
        <Loading />
      ) : (
        <>
          <Row>
            <div className="container">
              <Alert color="info" isOpen={true}>
                <Row>
                  <Col md="4">
                    <small>
                      <strong>Tipologia:</strong>{' '}
                      {convention.conventions_type.name}
                    </small>
                  </Col>
                  <Col md="4">
                    <small>
                      <strong>Aggregatore:</strong> {convention.aggregator.name}
                    </small>
                  </Col>
                  <Col md="4">
                    <small>
                      <strong>Ente:</strong> {convention.administration.name}
                    </small>
                  </Col>
                </Row>
                <Row>
                  <Col md="4">
                    <small>
                      <strong>Data inizio:</strong>{' '}
                      {moment(convention.start_at).format('DD/MM/YYYY')}
                    </small>
                  </Col>
                  <Col md="4">
                    <small>
                      <strong>Data fine:</strong>{' '}
                      {moment(convention.end_at).format('DD/MM/YYYY')}
                    </small>
                  </Col>
                </Row>
              </Alert>
            </div>
          </Row>

          {form.data.conventions_details.length > 0 &&
            convention.conventions_details.map(
              (convention_detail: any, index: number) => {
                return (
                  <Form
                    key={index}
                    convention_detail={convention_detail}
                    index={index}
                    conventionsData={conventionsData}
                    // setConventionsData={setConventionsData}
                    form={form}
                    errors={errors}
                  />
                );
              },
            )}
        </>
      )}
    </EasySynergyLayout>
  );
}
