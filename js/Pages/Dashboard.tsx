import React, { useEffect } from 'react';
import { setSelectedRole, fetchMenu } from '@/store';
import EasySynergyLayout from '@/Layouts/EasySynergyLayout';
import useTypedPage from '@/Hooks/useTypedPage';
import { useSelector, useDispatch } from 'react-redux';
import Loading from '@/Layouts/Loading';
import {
  Card,
  CardBody,
  CardText,
  Button,
  Container,
  Row,
  Col,
  CardTitle,
  Icon,
} from 'design-react-kit';

import DashboardHero from '@/Layouts/DashboardHero';

export default function Dashboard() {
  const page = useTypedPage();
  const user = page.props ? page.props.auth : null;
  const roles: any = page.props.roles;

  const dispatch = useDispatch();
  const reduxMenu = useSelector((state: any) => state.menu);

  useEffect(() => {
    if (roles.length == 1) {
      dispatch(setSelectedRole(roles[0]));
      getMenuByProfile(roles[0].id);
    }
  }, []);

  const getMenuByProfile = async (role_id: number) => {
    // @ts-ignore
    dispatch(fetchMenu(role_id));
    /* */
    const selectedRole: any = roles.find((role: any) => {
      return role.id == role_id;
    });
    if (selectedRole) {
      dispatch(setSelectedRole(selectedRole));
    }
  };

  return (
    <EasySynergyLayout
      title="Dashboard"
      renderHeader={() => (
        <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
          Dashboard
        </h2>
      )}
    >
      <DashboardHero user={user} />

      <Container fluid className="px-4">
        <Row>
          <Col xs="12" lg="12">
            <Card spacing className="card-bg rounded shadow">
              {reduxMenu.status == 'loading' ? (
                <Loading />
              ) : (
                roles.length > 1 && (
                  <CardBody>
                    <CardBody>
                      <CardTitle tag="h5">Profili</CardTitle>
                      <Row>
                        {roles.map(
                          (item: {
                            name: string;
                            label: string;
                            role_id: number;
                            id: number;
                            aggregator_id: number | null;
                            name_aggregator: string | null;
                            administration_id: number | null;
                            name_administration: string | null;
                          }) => {
                            return (
                              <Col xs="12" lg="4" key={item.id}>
                                <Card
                                  id={item.name}
                                  className="card-bg border-bottom-card"
                                >
                                  <CardBody>
                                    <CardTitle tag="h6">
                                      {item.label}
                                      {reduxMenu.selectdRole &&
                                      reduxMenu.selectdRole.name ===
                                        item.name ? (
                                        <Icon
                                          className="bg-grey"
                                          color="danger"
                                          icon="it-star-full"
                                          size="sm"
                                        />
                                      ) : null}
                                      <br />
                                      <small>({item.name})</small>
                                    </CardTitle>
                                    <CardText>
                                      <strong>
                                        Aggregatore:{' '}
                                        {item.name_aggregator
                                          ? item.name_aggregator
                                          : 'qualsiasi'}
                                        <br />
                                        Ente:{' '}
                                        {item.name_administration
                                          ? item.name_administration
                                          : 'qualsiasi'}
                                      </strong>
                                    </CardText>
                                    <div className="it-card-footer mt-1">
                                      <Button
                                        disabled={
                                          reduxMenu.selectdRole &&
                                          reduxMenu.selectdRole.name ===
                                            item.name
                                        }
                                        type={'button'}
                                        color="primary"
                                        className={'rounded ml-auto'}
                                        size="sm"
                                        onClick={() =>
                                          getMenuByProfile(item.role_id)
                                        }
                                      >
                                        Scegli
                                      </Button>
                                    </div>
                                  </CardBody>
                                </Card>
                              </Col>
                            );
                          },
                        )}
                      </Row>
                    </CardBody>
                  </CardBody>
                )
              )}
            </Card>
          </Col>
          {/*<Col xs="12" lg="4">
            <Card spacing className="card-bg rounded shadow">
              <CardBody>
                <CardTitle tag="h5">Ultime notifiche</CardTitle>
                <CardText>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                  sed do eiusmod tempor incididunt ut labore et dolore
                  magna aliqua.
                </CardText>
              </CardBody>
            </Card>
          </Col>*/}
        </Row>
      </Container>
    </EasySynergyLayout>
  );
}
