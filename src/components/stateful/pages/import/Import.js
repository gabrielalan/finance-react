import React, { Component } from 'react';
import { parse } from 'papaparse';
import { SHA256 } from "crypto-js";
import { fetchJson } from '../../../../helpers/Fetch';

function fromCSVLine(data) {
  if (!data['Bedrag (EUR)']) {
    return undefined;
  }

  const instance = {};
  const dataToHash = data['Mededelingen'] + data['Naam / Omschrijving'] + data['Bedrag (EUR)'] + data['Rekening'];

  instance.hash = `${data['Datum']}-${SHA256(dataToHash).toString()}`;
  instance.operation = data['Af Bij'] === 'Af' ? '-' : '+';
  instance.value = parseFloat(data['Bedrag (EUR)'].replace(',', '.'));
  instance.code = data['Code'];
  instance.ingMetadata = data['Mededelingen'];
  instance.nature = data['MutatieSoort'];
  instance.description = data['Naam / Omschrijving'];
  instance.account = data['Rekening'];
  instance.metadata = data['Tegenrekening'];
  instance.date = data['Datum']; //moment(data['Datum'], "YYYYMMDD");
  return instance;
}

class Import extends Component {
  importFromCSV(data) {
    const method = 'POST';
    const body = parse(data, { header: true }).data
      .map(fromCSVLine)
      .filter(truthy => truthy);

    return fetchJson('/api/transactions', { body, method });
  }

  onFileChange(evt) {
    const reader = new FileReader();

    this.loading = true;

    reader.onload = (e) => this
      .importFromCSV(e.target.result)
      .then(console.log)
      .catch(console.error);

    reader.readAsText(evt.target.files[0]);
  }

  render() {
    return (<div className="container">
      <h1>Import</h1>
      <div className="form-group">
        <label htmlFor="csvFile">CSV From Bank</label>
        <input type="file" className="form-control-file" onChange={this.onFileChange.bind(this)} id="csvFile" />
      </div>
    </div>);
  }
}

export default Import;
