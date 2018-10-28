import React, { Component } from 'react';

export class Filter extends Component {
  constructor(props) {
    super(props);

    this.state = {
      startDate: this.props.data.startDate,
      finalDate: this.props.data.finalDate,
      group: this.props.data.group
    };
  }

  createHandler(fieldName) {
    return (event) => this.setState({
      [fieldName]: event.target.value
    });
  }

  submit(event) {
    event.preventDefault();

    return this.props.onSubmit && this.props.onSubmit(this.state);
  }

  renderGroupOptions() {
    const groups = (this.props.groups || []).slice();

    groups.push({ name: 'Others' });

    return groups.map(item => (
      <option key={item.name} value={item.name}>{item.name}</option>
    ));
  }

  render() {
    return (<form className="form app__filter" name="filter" onSubmit={this.submit.bind(this)}>
      <div className="form-row">
        <div className="form-group col-md-2">
          <label htmlFor="startDate">Start Date</label>
          <input type="date" id="startDate"
            className="form-control"
            value={this.state.startDate}
            onChange={this.createHandler('startDate')} />
        </div>
        <div className="form-group col-md-2">
          <label htmlFor="finalDate">Final Date</label>
          <input type="date" id="finalDate"
            className="form-control"
            value={this.state.finalDate}
            onChange={this.createHandler('finalDate')} />
        </div>
        <div className="form-group col-md-4">
          <label htmlFor="group">Group</label>
          <select className="form-control"
            id="group" name="group"
            value={this.state.group}
            onChange={this.createHandler('group')}>
            <option value="">All groups</option>
            {this.renderGroupOptions()}
          </select>
        </div>
        <div className="form-group col-md-2 app__filter__actions">
          <button type="submit" className="btn btn-primary pull-right">filter</button>
        </div>
      </div>
    </form>);
  }
}