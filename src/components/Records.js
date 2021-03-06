import React, { Component } from "react";
import Record from "./Record";
import * as RecordsAPI from "../utils/RecordsAPI";
import RecordForm from "./RecordForm";
class Records extends Component {
  constructor() {
    super();
    this.state = {
      error: null,
      isLoaded: false,
      records: []
    };
  }

  componentDidMount() {
    RecordsAPI.getAll()
      .then(response =>
        this.setState({
          records: response.data,
          isLoaded: true
        })
      )
      .catch(error =>
        this.setState({
          isLoaded: true,
          error
        })
      );
  }
  render() {
    const { error, isLoaded, records } = this.state;
    let recordsComponents; //添加此行

    if (error) {
      recordsComponents = <div>Error:{error.message}</div>;
    } else if (!isLoaded) {
      recordsComponents = <div>Loading...</div>;
    } else {
      recordsComponents = (
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Date</th>
              <th>Title</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            {records.map(record => <Record key={record.id} {...record} />)}
            {/* <Record  /> */}
          </tbody>
        </table>
      );
    }
    return (
      <div>
        <h2>Records</h2>
        <RecordForm />

        {recordsComponents}
      </div>
    );
  }
}
export default Records;
