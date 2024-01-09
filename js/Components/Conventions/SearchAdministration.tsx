import React from 'react';
import axios from 'axios';
import { router } from '@inertiajs/react';
import { Button } from 'design-react-kit';
export default function SearchAdministration() {
  const search = () => {
    alert('ppp');
    try {
      var myHeaders = new Headers();
      myHeaders.append('Content-Type', 'application/json');
      myHeaders.append(
        'Cookie',
        'cookiesession1=678A3E2A60DF9F35BB298E075C84711F',
      );

      var raw = JSON.stringify({
        paginazione: {
          campoOrdinamento: 'idEnte',
          tipoOrdinamento: 'asc',
          paginaRichiesta: 1,
          numTotalePagine: null,
          numeroRigheTotali: null,
          paginaCorrente: null,
          righePerPagina: null,
        },
        codiceFiscaleRicerca: '00279480099',
        area: null,
        denominazione: null,
        codEnte: null,
        idTipoServizioDigitale: null,
        lingueMinoritarie: null,
        codiceCategoria: null,
      });

      fetch(
        'https://indicepa.gov.it/ipa-dati/api/3/action/datastore_search?resource_id=d09adf99-dc10-4349-8c53-27b1e5aa97b6&q=80015010723',
        {
          method: 'GET',
          headers: myHeaders,

          redirect: 'follow',
        },
      )
        .then(response => response.text())
        .then(result => console.log(result));
    } catch (e) {
      console.log(e);
    } finally {
    }
  };

  return (
    <div>
      <Button onClick={() => search()}>Cerca ente</Button>
    </div>
  );
}
