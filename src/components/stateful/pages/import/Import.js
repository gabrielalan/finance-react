import React, { Component } from 'react';
import { parse } from 'papaparse';
import { SHA256 } from "crypto-js";
import { fetchJson } from '../../../../helpers/Fetch';
import * as moment from 'moment';

function fromCSVLine(data) {
  if (!data['Bedrag (EUR)']) {
    return undefined;
  }

  const dataToHash = data['Mededelingen'] + data['Naam / Omschrijving'] + data['Bedrag (EUR)'] + data['Rekening'];

  return {
    hash: `${data['Datum']}-${SHA256(dataToHash).toString()}`,
    operation: data['Af Bij'] === 'Af' ? '-' : '+',
    value: parseFloat(data['Bedrag (EUR)'].replace(',', '.')),
    code: data['Code'],
    ingMetadata: data['Mededelingen'],
    nature: data['MutatieSoort'],
    description: data['Naam / Omschrijving'],
    account: data['Rekening'],
    metadata: data['Tegenrekening'],
    date: moment(data['Datum'], "YYYYMMDD"),
  };
}

class Import extends Component {
  constructor(props) {
    super(props);

    this.state = {
      error: null,
      loading: false,
    };
  }

  importFromCSV(body) {
    return fetchJson('/api/transactions', { body, method: 'POST' });
  }

  parseFile(data) {
    return new Promise((resolve, reject) => {
      try {
        resolve(parse(data, { header: true }).data
          .map(fromCSVLine)
          .filter(Boolean));
      } catch(error) {
        reject(error);
      }
    });
  }

  onFileChange(evt) {
    const reader = new FileReader();

    this.setState({ loading: true });

    reader.onload = (e) => this
      .parseFile(e.target.result)
      .then(JSON.stringify)
      .then(this.importFromCSV)
      .then(() => this.setState({ loading: false }))
      .catch((error) => this.setState({ error }));

    reader.readAsText(evt.target.files[0]);
  }

  renderError() {
    const defaultMessage = 'Oopsy! Something went wrong.';

    return this.state.error
      ? <div className="alert alert-danger" role="alert">{this.state.error.message || defaultMessage}</div>
      : null;
  }

  render() {
    return (<div className="container">
      <h1>Import</h1>
      <div className="form-group">
        <label htmlFor="csvFile">CSV From Bank</label>
        <input type="file" className="form-control-file" onChange={this.onFileChange.bind(this)} id="csvFile" />
      </div>
      {this.renderError()}
    </div>);
  }
}

export default Import;
