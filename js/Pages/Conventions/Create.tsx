import React, { ReactNode, useEffect, useState } from 'react';
import EasySynergyLayout from '@/Layouts/EasySynergyLayout';
import TitleHeader from '@/Layouts/TitleHeader';
import {
  Alert,
  Button,
  Card,
  CardBody,
  CardTitle,
  Col,
  Container,
  Form,
  FormGroup,
  Icon,
  Input,
  Label,
  Progress,
  Row,
  Select,
  Toggle,
} from 'design-react-kit';
import { getSelectedRole } from '@/utils/functions';
import route from 'ziggy-js';
import { useForm, router } from '@inertiajs/react';
import Notification from '@/Components/Notification/Notification';
import Loading from '@/Layouts/Loading';
import {
  getConventionData,
  updateEserviceForApplication,
} from '@/Pages/Conventions/Functions';

type PropsWithChildren<P> = P & { children?: ReactNode };

interface Props {
  message: object;
}

export default function Create(props: PropsWithChildren<Props>) {
  const [aggregators, setAggregators] = useState([]);
  const [administrations, setAdministrations] = useState([]);
  const [applications, setApplications] = useState([]);
  const [toggleNotification, setToggleNotification] = useState(false);
  const [eservices, setEservice] = useState([]);
  const [eservicesModel, setEserviceModel] = useState([]);

  const [errors, setErrors] = useState([]);
  const selectedRole = getSelectedRole();

  const form = useForm({
    conventions_type_id: '1',
    is_active: true,
    application_ids: [],
    aggregator_id: '',
    administration_id: '',
    start_at: '',
    end_at: '',
    eservice_model_applications: [],
  });
  const { processing } = form;

  useEffect(() => {
    if (selectedRole) {
      setConventionData();
    } else {
      router.visit(route('dashboard'));
    }
  }, []);

  const setMinData = (minData: string) => {
    document.getElementById('end_at')?.setAttribute('min', minData);
  };

  const setConventionData = async () => {
    let data: any = await getConventionData(selectedRole);
    setEservice(data.eservices);
    setEserviceModel(data.eservice_model);
    setApplications(data.applications);
    setAdministrations(data.administrations);
    if (data.aggregators) {
      setAggregators(data.aggregators);
    }
  };

  const setEserviceForApplication = (
    application_id: number,
    selected: any,
    checked: boolean,
  ) => {
    let copyServiceModelSelected: any = [
      ...form.data.eservice_model_applications,
    ];
    copyServiceModelSelected = updateEserviceForApplication(
      application_id,
      selected,
      checked,
      copyServiceModelSelected,
    );
    form.setData('eservice_model_applications', copyServiceModelSelected);
  };

  const handleToggle = () => {
    form.setData('is_active', !form.data.is_active);
  };

  const handleApplicationChecked = (e: any) => {
    let id: number = e.target.value;
    const application_ids: any = [...form.data.application_ids];
    if (e.target.checked) {
      application_ids.push(id);

      form.setData('application_ids', application_ids);
    } else {
      form.setData({
        ...form.data,
        application_ids: form.data.application_ids.filter(item => {
          return item !== id;
        }),
        eservice_model_applications:
          form.data.eservice_model_applications.filter((item: any) => {
            return item.application_id !== id;
          }),
      });
    }
  };

  /**/
  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // @ts-ignore
    form.post(route('conventions.store', selectedRole.role_id), {
      onError: (e: any) => {
        setErrors(e);
      },
      onSuccess: response => {
        // console.log(response);
        //setToggleNotification(!toggleNotification);
        //router.visit(route('conventions.index'));
      },
      onFinish: () => {},
    });
  }

  const handleChangeAggregator = (selectedOption: any) => {
    form.setData('aggregator_id', selectedOption.value);
  };
  const handleChangeAdministration = (selectedOption: any) => {
    form.setData('administration_id', selectedOption.value);
  };

  const getApplicationData = (application_id: number) => {
    const application: any = applications.find((app: any) => {
      return app.id == application_id;
    });
    if (application) {
      return application.name;
    } else {
      return '';
    }
  };

  const handleServiceChecked = (e: any) => {
    let id: number = e.target.value;
    if (e.target.checked) {
      form.setData('eservice_model_id', [...form.data.eservice_model_id, id]);
    } else {
      form.setData(
        'eservice_model_id',
        form.data.eservice_model_id.filter(item => {
          return item !== id;
        }),
      );
    }
  };

  useEffect(() => {
    if (selectedRole) {
      getConventionData(selectedRole);
    } else {
      router.visit(route('dashboard'));
    }
  }, []);

  // console.log(form.data);

  return (
    <EasySynergyLayout title={'Nuova Convenzione'}>
      <TitleHeader buttons={true} filters={false}>
        <Button
          icon
          className="mr-2 btn-progress"
          size={'sm'}
          color={'success'}
          onClick={handleSubmit}
          disabled={
            processing ||
            (administrations.length === 0 && aggregators.length === 0)
          }
        >
          {' '}
          <Icon color="white" icon="it-plus" />
          Salva e continua
          {processing ? (
            <span>
              <Progress indeterminate />
            </span>
          ) : null}
        </Button>
      </TitleHeader>
      <Container fluid className="scrollable-content">
        <Notification
          toggle={toggleNotification}
          title={'Operazione'}
          body={'Inerimento nuova Convenzione eseguita con successo'}
          state={'success'}
        />
        {props.message && props.message.errorInfo[1] === 1062 ? (
          <div className="container">
            <Alert color="danger" isOpen={true}>
              <Row>
                <Col md="12">
                  <small>
                    <strong>
                      Non è stato possibile creare la convenzione perchè ne
                      esiste già una con le stesse caratteristiche
                    </strong>
                  </small>
                </Col>
              </Row>
            </Alert>
          </div>
        ) : null}
        <Container>
          <fieldset>
            <Form id="convention" className="m-3">
              {administrations.length > 0 ? (
                <div>
                  <Row>
                    <Col md="4">
                      <label htmlFor="conventions_type_id">
                        Tipologia convenzione{' '}
                        <span className="mandatory_field">*</span>
                      </label>
                      <div className="w-100"></div>
                      <FormGroup check inline>
                        <Input
                          name="conventions_type_id"
                          type="radio"
                          id="conventions_type_id_1"
                          value="1"
                          defaultChecked={
                            form.data.conventions_type_id === '1' ||
                            form.data.conventions_type_id === ''
                          }
                          onChange={e =>
                            form.setData('conventions_type_id', e.target.value)
                          }
                        />
                        <Label check htmlFor="conventions_type_id_1">
                          Fruitore
                        </Label>
                      </FormGroup>
                      <FormGroup check inline>
                        <Input
                          name="conventions_type_id"
                          type="radio"
                          id="conventions_type_id_2"
                          value="2"
                          defaultChecked={form.data.conventions_type_id === '2'}
                          onChange={e =>
                            form.setData('conventions_type_id', e.target.value)
                          }
                        />
                        <Label check htmlFor="conventions_type_id_2">
                          Erogatore
                        </Label>
                      </FormGroup>
                      {form.errors.conventions_type_id && (
                        <>
                          <div className="w-100"></div>
                          <div className="form_error">
                            <Icon
                              color="danger"
                              icon="it-close-circle"
                              size="xs"
                            />{' '}
                            {form.errors.conventions_type_id}
                          </div>
                        </>
                      )}
                    </Col>
                    <Col md="6">
                      <label htmlFor="is_active">
                        Attiva <span className="mandatory_field">*</span>
                      </label>
                      <div className="w-100"></div>
                      <FormGroup check inline>
                        <Toggle
                          id="is_active"
                          label=""
                          checked={form.data.is_active ? true : false}
                          onChange={e => handleToggle()}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row className="mb-4">
                    {aggregators.length > 0 ? (
                      <Col md="9">
                        <label htmlFor="aggregator_id">
                          Aggregatore <span className="mandatory_field">*</span>
                        </label>
                        <Select
                          className="form-group"
                          id="aggregator_id"
                          isSearchable={true}
                          onChange={handleChangeAggregator}
                          options={aggregators}
                          placeholder="Seleziona un aggregatore"
                          aria-label="Seleziona un aggregatore"
                          required
                        />
                        {form.errors.aggregator_id && (
                          <div className="form_error">
                            <Icon
                              color="danger"
                              icon="it-close-circle"
                              size="xs"
                            />{' '}
                            {form.errors.aggregator_id}
                          </div>
                        )}
                      </Col>
                    ) : null}
                  </Row>
                  <Row className="mb-4">
                    <Col>
                      <label htmlFor="administration_id">
                        Ente <span className="mandatory_field">*</span>
                      </label>
                      <Select
                        className="form-group"
                        id="administration_id"
                        isSearchable={true}
                        onChange={handleChangeAdministration}
                        options={administrations}
                        placeholder="Seleziona un ente"
                        aria-label="Seleziona un ente"
                        required
                      />
                      {form.errors.administration_id && (
                        <div className="form_error">
                          <Icon
                            color="danger"
                            icon="it-close-circle"
                            size="xs"
                          />{' '}
                          {form.errors.administration_id}
                        </div>
                      )}
                    </Col>
                    <Col md="3">
                      <label htmlFor="start_at">
                        Data inizio <span className="mandatory_field">*</span>
                      </label>
                      <Input
                        type="date"
                        name="start_at"
                        id="start_at"
                        placeholder="gg/mm/aaaa"
                        required
                        onChange={e => {
                          form.setData('start_at', e.target.value);
                          setMinData(e.target.value);
                        }}
                        value={form.data.start_at}
                      />
                      {form.errors.start_at && (
                        <div className="form_error">
                          <Icon
                            color="danger"
                            icon="it-close-circle"
                            size="xs"
                          />{' '}
                          {form.errors.start_at}
                        </div>
                      )}
                    </Col>
                    <Col md="3">
                      <label htmlFor="end_at">
                        Data fine <span className="mandatory_field">*</span>
                      </label>
                      <Input
                        type="date"
                        name="end_at"
                        id="end_at"
                        placeholder="gg/mm/aaaa"
                        required
                        onChange={e => form.setData('end_at', e.target.value)}
                        value={form.data.end_at}
                      />
                      {form.errors.end_at && (
                        <div className="form_error">
                          <Icon
                            color="danger"
                            icon="it-close-circle"
                            size="xs"
                          />{' '}
                          {form.errors.end_at}
                        </div>
                      )}
                    </Col>
                  </Row>

                  <Row className="mb-4">
                    <Col>
                      <label htmlFor="application_id">
                        Applicazioni <span className="mandatory_field">*</span>
                      </label>

                      <div className="form-row mb-0">
                        {applications.map(
                          (item: { id: number; name: string }) => {
                            return (
                              <FormGroup
                                className="form-group"
                                check
                                inline
                                key={item.id}
                              >
                                <Input
                                  id={'application_id_' + item.id}
                                  type="checkbox"
                                  value={item.id}
                                  onChange={handleApplicationChecked}
                                />
                                <Label for={'application_id_' + item.id} check>
                                  {item.name}
                                </Label>
                              </FormGroup>
                            );
                          },
                        )}
                        {form.errors.application_ids && (
                          <>
                            <div className="w-100"></div>
                            <div className="form_error">
                              <Icon
                                color="danger"
                                icon="it-close-circle"
                                size="xs"
                              />{' '}
                              {form.errors.application_ids}
                            </div>
                          </>
                        )}
                      </div>
                    </Col>
                  </Row>

                  {form.data.application_ids.map((app, index) => {
                    return (
                      <Card
                        spacing
                        className="card-bg border-bottom-card"
                        key={app}
                      >
                        <CardBody>
                          <CardTitle tag="h6" className="mb-0">
                            {getApplicationData(app)}
                          </CardTitle>

                          <Row>
                            {eservicesModel.map((esm: any) => {
                              return (
                                <Col md="6" key={esm.id}>
                                  <FormGroup check inline key={esm.id}>
                                    <Input
                                      id={'eservice_model_id_' + esm.id + app}
                                      type="checkbox"
                                      value={esm.id}
                                      onChange={e =>
                                        setEserviceForApplication(
                                          app,
                                          esm.id,
                                          e.target.checked,
                                        )
                                      }
                                    />
                                    <Label
                                      for={'eservice_model_id_' + esm.id + app}
                                      check
                                    >
                                      {esm.name}{' '}
                                      <small>
                                        {' '}
                                        {esm.eservice.name} - {esm.version} -{' '}
                                        {esm.environment} -{' '}
                                        {esm.eservice.description}
                                      </small>
                                    </Label>
                                  </FormGroup>
                                </Col>
                              );
                            })}
                          </Row>
                        </CardBody>
                      </Card>
                    );
                  })}
                  {form.data.application_ids.length > 0 &&
                    form.errors.eservice_model_applications && (
                      <>
                        <div className="w-100"></div>
                        <div className="form_error">
                          <Icon
                            color="danger"
                            icon="it-close-circle"
                            size="xs"
                          />{' '}
                          {form.errors.eservice_model_applications}
                        </div>
                      </>
                    )}
                </div>
              ) : (
                <div className="mb-4">
                  <Loading />
                </div>
              )}
            </Form>
          </fieldset>
        </Container>
      </Container>
    </EasySynergyLayout>
  );
}
