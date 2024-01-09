import React from 'react';
// import { getSelectedRole } from '@/utils/functions';
import {
  Col,
  Row,
  Card,
  CardBody,
  CardTitle,
  TextArea,
  Input,
  Icon,
  Label,
} from 'design-react-kit';

export default function Form({
  convention_detail,
  index,
  conventionsData,
  // setConventionsData,
  form,
  errors,
}: any) {
  // const selectedRole = getSelectedRole();

  const copyToClipBoard = async (publicKey: string) => {
    try {
      await navigator.clipboard.writeText(publicKey);
      alert('Chiave pubblica copiata correttamente!');
    } catch (err) {
      alert('Errore!');
    }
  };

  const updateConventionDetails = (index: any, field: any, value: any) => {
    let myArray: any = [...conventionsData];
    myArray[index][field] = value;
    form.setData('conventions_details', myArray);
  };

  return (
    <div className="container">
      <Card spacing className="card-bg">
        <CardBody>
          <CardTitle tag="h5">
            {convention_detail.api_key.application.name +
              ' - ' +
              convention_detail.eservice_model.eservice.name +
              ' - ' +
              convention_detail.eservice_model.version +
              ' - ' +
              convention_detail.eservice_model.environment +
              ' - ' +
              convention_detail.eservice_model.eservice.description}
          </CardTitle>

          <Row>
            <Col>
              <label title={'copia la chiave pubbluca'}>
                Chiave pubblica{' '}
                <Icon
                  size={'sm'}
                  icon={'it-copy'}
                  onClick={() => copyToClipBoard(convention_detail.public_key)}
                />
              </label>

              <TextArea
                rows={3}
                placeholder={convention_detail.public_key}
                id={
                  'public-key-' +
                  convention_detail.api_key.application.id +
                  '-' +
                  convention_detail.eservice_model.id
                }
                readOnly
                disabled
                style={{ fontSize: '14px' }}
              />
            </Col>
          </Row>
          <Row>
            <Col md="6">
              <Label
                for={
                  'kid-' +
                  convention_detail.api_key.application.id +
                  '-' +
                  convention_detail.eservice_model.id
                }
              >
                KID
              </Label>
              <Input
                invalid={errors[`conventions_details.${index}.kid`]}
                type="text"
                id={
                  'kid-' +
                  convention_detail.api_key.application.id +
                  '-' +
                  convention_detail.eservice_model.id
                }
                onChange={e =>
                  updateConventionDetails(index, 'kid', e.target.value)
                }
                value={form.data.conventions_details[index].kid}
              />
              {errors[`conventions_details.${index}.kid`] && (
                <div className="form_error">
                  <Icon color="danger" icon="it-close-circle" size="xs" />{' '}
                  {errors[`conventions_details.${index}.kid`]}
                </div>
              )}
            </Col>

            <Col md="6">
              <Label
                for={
                  'url_referral-' +
                  convention_detail.api_key.application.id +
                  '-' +
                  convention_detail.eservice_model.id
                }
              >
                URL Referral
              </Label>
              <Input
                type="url"
                invalid={errors[`conventions_details.${index}.url_referral`]}
                id={
                  'url_referral-' +
                  convention_detail.api_key.application.id +
                  '-' +
                  convention_detail.eservice_model.id
                }
                value={form.data.conventions_details[index].url_referral}
                onChange={e =>
                  updateConventionDetails(index, 'url_referral', e.target.value)
                }
              />
              {errors[`conventions_details.${index}.url_referral`] && (
                <div className="form_error">
                  <Icon color="danger" icon="it-close-circle" size="xs" />{' '}
                  {errors[`conventions_details.${index}.url_referral`]}
                </div>
              )}
            </Col>
          </Row>
          <Row className={'mt-4'}>
            <Col md="6">
              <Label
                for={
                  'id_purpose-' +
                  convention_detail.api_key.application.id +
                  '-' +
                  convention_detail.eservice_model.id
                }
              >
                ID Purpose
              </Label>
              <Input
                type="text"
                id={
                  'id_purpose-' +
                  convention_detail.api_key.application.id +
                  '-' +
                  convention_detail.eservice_model.id
                }
                onChange={e =>
                  updateConventionDetails(index, 'id_purpose', e.target.value)
                }
                value={form.data.conventions_details[index].id_purpose}
                invalid={errors[`conventions_details.${index}.id_purpose`]}
              />{' '}
              {errors[`conventions_details.${index}.id_purpose`] && (
                <div className="form_error">
                  <Icon color="danger" icon="it-close-circle" size="xs" />{' '}
                  {errors[`conventions_details.${index}.id_purpose`]}
                </div>
              )}
            </Col>

            <Col md={'6'}>
              <Label
                for={
                  'id_client-' +
                  convention_detail.api_key.application.id +
                  '-' +
                  convention_detail.eservice_model.id
                }
              >
                ID Client
              </Label>
              <Input
                type="text"
                id={
                  'id_client-' +
                  convention_detail.api_key.application.id +
                  '-' +
                  convention_detail.eservice_model.id
                }
                onChange={e =>
                  updateConventionDetails(index, 'id_client', e.target.value)
                }
                value={form.data.conventions_details[index].id_client}
                invalid={errors[`conventions_details.${index}.id_client`]}
              />
              {errors[`conventions_details.${index}.id_client`] && (
                <div className="form_error">
                  <Icon color="danger" icon="it-close-circle" size="xs" />{' '}
                  {errors[`conventions_details.${index}.id_client`]}
                </div>
              )}
            </Col>
          </Row>
        </CardBody>
      </Card>
      {/* end card */}
    </div>
  );
}
