import './App.css';
import React, { useEffect, useState } from 'react';

import complicateLedger from './data/complicated_ledger.json';

function App() {
  // Define state for the data that's been used with given data as initial value
  // const [data, setData] = useState(simpleLedger);
  // const [data, setData] = useState(duplicateLedger);
  const [data, setData] = useState(complicateLedger);

  // useEffect to perform operations on data to make it reliable
  useEffect(() => {
    // Sort the data on the basis of date
    // Get all the activity ids in an array
    const ids = data.map(o => o.activity_id);
    // Filter duplicate elements from the array
    const filteredData = data.filter(({ activity_id }, index) => !ids.includes(activity_id, index + 1));
    console.log("filteredData", filteredData)
    // Set the reliable data
    const sortedData = filteredData.sort((a, b) => new Date(b.date) - new Date(a.date));
    setData(sortedData);
  }, []);

  // Utility to get formatted date in mm/dd/yyyy format
  const getFormattedDate = (date) => {
    var year = date.getFullYear();

    var month = (1 + date.getMonth()).toString();
    month = month.length > 1 ? month : '0' + month;

    var day = date.getDate().toString();
    day = day.length > 1 ? day : '0' + day;

    return month + '/' + day + '/' + year;
  }

  // Function to get the description of the transaction
  const getDescription = (obj) => {
    return `${obj.type}ED $${obj.amount < 0 ? -obj.amount : obj.amount} ${obj.source.description ? `from ${obj.source.description}` : ""} to ${obj.destination.description}`
  }

  // Date range of the txns 
  const getDateRange = (data) => {
    return `${getFormattedDate(new Date(data[data.length - 1].date))} - ${getFormattedDate(new Date(data[0].date))}`
  }

  return (
    <div className="App">
      <h1>
        {`Your investing account ($${data[0].balance} available)`}
        <div className="small">{getDateRange(data)}</div>
      </h1>

      <div className="content">
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Type</th>
              <th>Description</th>
              <th>Amount</th>
              <th>Balance</th>
            </tr>
          </thead>

          <tbody>
            {data.map((obj, index) => (
              <tr key={index}>
                <th>{getFormattedDate(new Date(obj.date))}</th>
                <th>{obj.type}</th>
                <th>{getDescription(obj)}</th>
                <th>{obj.amount}</th>
                <th>{obj.balance}</th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
