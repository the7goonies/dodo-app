import React, { useState, useEffect } from 'react';
import './App.css';

const App = () => {
  const [data, setData] = useState([]);
  const [urls, setUrls] = useState([
    'https://api.streamelements.com/kappa/v2/activities/59b478950d3fde75addb52b9?after=2024-08-04T00%3A00%3A00.000Z&before=2024-08-04T23%3A59%3A59.999Z&limit=500&mincheer=1&minhost=1&minsub=1&mintip=0&origin=0&types=tip',
    'https://api.streamelements.com/kappa/v2/activities/59b478950d3fde75addb52b9?after=2024-08-05T00%3A00%3A00.000Z&before=2024-08-05T23%3A59%3A59.999Z&limit=500&mincheer=1&minhost=1&minsub=1&mintip=0&origin=0&types=tip',
    'https://api.streamelements.com/kappa/v2/activities/59b478950d3fde75addb52b9?after=2024-08-06T00%3A00%3A00.000Z&before=2024-08-06T23%3A59%3A59.999Z&limit=500&mincheer=1&minhost=1&minsub=1&mintip=0&origin=0&types=tip',
    'https://api.streamelements.com/kappa/v2/activities/59b478950d3fde75addb52b9?after=2024-08-07T00%3A00%3A00.000Z&before=2024-08-07T23%3A59%3A59.999Z&limit=500&mincheer=1&minhost=1&minsub=1&mintip=0&origin=0&types=tip',
    'https://api.streamelements.com/kappa/v2/activities/59b478950d3fde75addb52b9?after=2024-08-08T00%3A00%3A00.000Z&before=2024-08-08T23%3A59%3A59.999Z&limit=500&mincheer=1&minhost=1&minsub=1&mintip=0&origin=0&types=tip',
    'https://api.streamelements.com/kappa/v2/activities/59b478950d3fde75addb52b9?after=2024-08-09T00%3A00%3A00.000Z&before=2024-08-09T23%3A59%3A59.999Z&limit=500&mincheer=1&minhost=1&minsub=1&mintip=0&origin=0&types=tip',
    'https://api.streamelements.com/kappa/v2/activities/59b478950d3fde75addb52b9?after=2024-08-10T00%3A00%3A00.000Z&before=2024-08-10T23%3A59%3A59.999Z&limit=500&mincheer=1&minhost=1&minsub=1&mintip=0&origin=0&types=tip',
    'https://api.streamelements.com/kappa/v2/activities/59b478950d3fde75addb52b9?after=2024-08-11T00%3A00%3A00.000Z&before=2024-08-11T23%3A59%3A59.999Z&limit=500&mincheer=1&minhost=1&minsub=1&mintip=0&origin=0&types=tip',
    'https://api.streamelements.com/kappa/v2/activities/59b478950d3fde75addb52b9?after=2024-08-12T00%3A00%3A00.000Z&before=2024-08-12T23%3A59%3A59.999Z&limit=500&mincheer=1&minhost=1&minsub=1&mintip=0&origin=0&types=tip',
    'https://api.streamelements.com/kappa/v2/activities/59b478950d3fde75addb52b9?after=2024-08-13T00%3A00%3A00.000Z&before=2024-08-13T23%3A59%3A59.999Z&limit=500&mincheer=1&minhost=1&minsub=1&mintip=0&origin=0&types=tip',
    'https://api.streamelements.com/kappa/v2/activities/59b478950d3fde75addb52b9?after=2024-08-14T00%3A00%3A00.000Z&before=2024-08-14T23%3A59%3A59.999Z&limit=500&mincheer=1&minhost=1&minsub=1&mintip=0&origin=0&types=tip',
    // Add more URLs here as needed
  ]);

  useEffect(() => {
    const fetchData = async () => {
      const promises = urls.map(url =>
        fetch(url, {
          headers: {
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiNTllODhhODlmZDY5MTAxNTM5ZGZkNDFmIiwicm9sZSI6Im93bmVyIiwiY2hhbm5lbCI6IjU5YjQ3ODk1MGQzZmRlNzVhZGRiNTJiOSIsInByb3ZpZGVyIjoidHdpdGNoIiwiYXV0aFRva2VuIjoiVWp1blZ6VWl0VXFEQ2MwRENaaXFoNS1oeVI1MDdTcEc2Y3hhQk00SFRwRm5VTTlsIiwiaWF0IjoxNjc2MTk1OTU0LCJpc3MiOiJTdHJlYW1FbGVtZW50cyJ9.tbk2Ouiy6p9GDBvV2dpZ9iuE9gmwcFfIwslDnkmoET0'
          }
        }).then(response => response.json())
      );

      const jsonData = await Promise.all(promises);
      const mergedData = jsonData.flat(); // merge the data from all URLs into a single array
      console.log(mergedData); // Log the merged data to inspect its structure
      setData(mergedData);
    };

    fetchData();

    const interval = setInterval(() => {
      fetchData();
    }, 60000);

    return () => clearInterval(interval);
  }, [urls]);

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
