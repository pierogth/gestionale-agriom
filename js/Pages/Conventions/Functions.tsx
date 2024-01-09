import axios from 'axios';

export const getConventionData = async (selectdRole: any) => {
  let data: any = {};

  try {
    const response: any = await axios.get(
      `/api/conventions/create/${selectdRole.role_id}`,
    );

    if (response.data.aggregators) {
      let aggregators = response.data.aggregators.map((item: any) => {
        return {
          value: item.id,
          label: item.name,
        };
      });

      data['aggregators'] = aggregators;

      // console.log(data);
    }

    if (response.data.applications) {
      data.applications = response.data.applications;
    }

    if (response.data.administrations) {
      let administrations: any = response.data.administrations.map(
        (item: any) => {
          return {
            value: item['id'],
            label:
              item['name'] +
              ' (Codice IPA: ' +
              item['ipa_code'] +
              ' - P.IVA: ' +
              item['vat_number'] +
              ')',
          };
        },
      );
      data.administrations = administrations;
    }
    data.eservices = response.data.eservices;
    data.eservice_model = response.data.eservice_model;

    return data;
  } catch (e) {
    console.log(e);
    return false;
  }
};

export const updateEserviceForApplication = (
  application_id: number,
  selected: any,
  checked: boolean,
  copyServiceModelSelected: any,
) => {
  let myApp: any = copyServiceModelSelected.find((app: any) => {
    return app.application_id == application_id;
  });

  if (checked) {
    if (myApp) {
      myApp.eservice_models.push(selected);
    } else {
      copyServiceModelSelected.push({
        application_id: application_id,
        eservice_models: [selected],
      });
    }
  } else {
    if (myApp) {
      let newValues = myApp.eservice_models.filter((item: any) => {
        return item !== selected;
      });
      if (newValues.length === 0) {
        let obj = copyServiceModelSelected.findIndex(
          (x: any) => x.application_id === application_id,
        );
        copyServiceModelSelected.splice(obj, 1);
      } else myApp.eservice_models = newValues;
    }
  }

  return copyServiceModelSelected;
};
