import React, { useState, useEffect } from 'react';
import './App.css';

const App = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const url = 'https://api.streamelements.com/kappa/v2/activities/59b478950d3fde75addb52b9?after=2024-07-25T00%3A00%3A00.000Z&before=2024-07-25T23%3A59%3A59.999Z&limit=500&mincheer=1&minhost=1&minsub=1&mintip=0&origin=0&types=tip';

      const response = await fetch(url, {
        headers: {
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiNTllODhhODlmZDY5MTAxNTM5ZGZkNDFmIiwicm9sZSI6Im93bmVyIiwiY2hhbm5lbCI6IjU5YjQ3ODk1MGQzZmRlNzVhZGRiNTJiOSIsInByb3ZpZGVyIjoidHdpdGNoIiwiYXV0aFRva2VuIjoiVWp1blZ6VWl0VXFEQ2MwRENaaXFoNS1oeVI1MDdTcEc2Y3hhQk00SFRwRm5VTTlsIiwiaWF0IjoxNjc2MTk1OTU0LCJpc3MiOiJTdHJlYW1FbGVtZW50cyJ9.tbk2Ouiy6p9GDBvV2dpZ9iuE9gmwcFfIwslDnkmoET0'
        }
      });

      const jsonData = await response.json();
      console.log(jsonData); // Log the data to inspect its structure
      setData(jsonData);
    };

    fetchData();

    const interval = setInterval(() => {
      fetchData();
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    localStorage.setItem('data', JSON.stringify(data));
  }, [data]);

const totalDonations = data.reduce((total, item) => {
    return total + (item.data.amount || 0);
  }, 0);

  return (
    <div>
      {data.length > 0 ? (
        <div>
          <table>
            <thead>
              <tr>
                <th>Donor</th>
                <th>Amount</th>
                <th>Currency</th>
                <th>Message</th>
              </tr>
            </thead>
            <tbody>
              {data.map(item => (
                <tr key={item._id}>
                  <td>{item.data.displayName || 'Unknown'}</td>
                  <td>{item.data.amount || '0.00'}</td>
                  <td>{item.data.currency || 'N/A'}</td>
                  <td>{item.data.message || 'No message'}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p>Total Donations: {totalDonations.toFixed(2)} {data[0].data.currency}</p>
        </div>
      ) : (
        <p>No donations found.</p>
      )}
    </div>
  );
};

export default App;
