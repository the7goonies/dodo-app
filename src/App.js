import React, { useState, useEffect } from 'react';
import './App.css';

const App = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const urls = [
  'https://api.streamelements.com/kappa/v2/activities/59b478950d3fde75addb52b9?after=2024-07-25T00%3A00%3A00.000Z&before=2024-07-25T23%3A59%3A59.999Z&limit=500&mincheer=1&minhost=1&minsub=1&mintip=0&origin=0&types=tip'
      ];
      const promises = urls.map(url =>
        fetch(url, {
          headers: {
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiNTllODhhODlmZDY5MTAxNTM5ZGZkNDFmIiwicm9sZSI6Im93bmVyIiwiY2hhbm5lbCI6IjU5YjQ3ODk1MGQzZmRlNzVhZGRiNTJiOSIsInByb3ZpZGVyIjoidHdpdGNoIiwiYXV0aFRva2VuIjoiVWp1blZ6VWl0VXFEQ2MwRENaaXFoNS1oeVI1MDdTcEc2Y3hhQk00SFRwRm5VTTlsIiwiaWF0IjoxNjc2MTk1OTU0LCJpc3MiOiJTdHJlYW1FbGVtZW50cyJ9.tbk2Ouiy6p9GDBvV2dpZ9iuE9gmwcFfIwslDnkmoET0'
          }
        }).then(response => response.json())
      );
      const jsonData = await Promise.all(promises);
      const mergedData = jsonData.flat(); // merge the data from all URLs into a single array
      setData(mergedData);
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

  return (
    <div>
      {data.length > 0 && (
        <div>
          <table>
            <tr>
              <th>Donor</th>
              <th>Total Donation</th>
            </tr>
            {Object.entries(data.reduce((donations, item) => {
              if (item.data.tipper) {
                donations[item.data.tipper] = donations[item.data.tipper]
                  ? donations[item.data.tipper] + item.data.amount
                  : item.data.amount;
              }
              return donations;
            }, {})).sort((a, b) => b[1] - a[1]).map(([tipper, amount]) => (
              <tr key={tipper}>
                <td>{tipper}</td>
                <td>${amount.toFixed(2)}</td>
              </tr>
            ))}
          </table>
          <p>Total Donations: ${data.reduce((total, item) => total + item.data.amount, 0).toFixed(2)}</p>
        </div>
      )}
    </div>
  );
};

export default App;
