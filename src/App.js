import React, { useState, useEffect } from 'react';
import './App.css';

const App = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const urls = [
      'https://api.streamelements.com/kappa/v2/activities/59b478950d3fde75addb52b9?after=2023-03-20T07%3A00%3A00.000Z&before=2023-03-20T08%3A00%3A00.000Z&limit=500&mincheer=1&minhost=1&minsub=1&mintip=0&origin=0&types=subscriber',
      'https://api.streamelements.com/kappa/v2/activities/59b478950d3fde75addb52b9?after=2023-03-20T08%3A00%3A01.000Z&before=2023-03-20T09%3A00%3A00.000Z&limit=500&mincheer=1&minhost=1&minsub=1&mintip=0&origin=0&types=subscriber',
      'https://api.streamelements.com/kappa/v2/activities/59b478950d3fde75addb52b9?after=2023-03-20T09%3A00%3A01.000Z&before=2023-03-20T10%3A00%3A00.000Z&limit=500&mincheer=1&minhost=1&minsub=1&mintip=0&origin=0&types=subscriber',
      'https://api.streamelements.com/kappa/v2/activities/59b478950d3fde75addb52b9?after=2023-03-20T10%3A00%3A01.000Z&before=2023-03-20T11%3A00%3A00.000Z&limit=500&mincheer=1&minhost=1&minsub=1&mintip=0&origin=0&types=subscriber',
      'https://api.streamelements.com/kappa/v2/activities/59b478950d3fde75addb52b9?after=2023-03-20T11%3A00%3A01.000Z&before=2023-03-20T12%3A00%3A00.000Z&limit=500&mincheer=1&minhost=1&minsub=1&mintip=0&origin=0&types=subscriber',
      'https://api.streamelements.com/kappa/v2/activities/59b478950d3fde75addb52b9?after=2023-03-20T12%3A00%3A01.000Z&before=2023-03-20T13%3A00%3A00.000Z&limit=500&mincheer=1&minhost=1&minsub=1&mintip=0&origin=0&types=subscriber',
    ];

    const fetchData = async () => {
      const responses = await Promise.all(
        urls.map(url =>
          fetch(url, {
            headers: {
              Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiNTllODhhODlmZDY5MTAxNTM5ZGZkNDFmIiwicm9sZSI6Im93bmVyIiwiY2hhbm5lbCI6IjU5YjQ3ODk1MGQzZmRlNzVhZGRiNTJiOSIsInByb3ZpZGVyIjoidHdpdGNoIiwiYXV0aFRva2VuIjoiVWp1blZ6VWl0VXFEQ2MwRENaaXFoNS1oeVI1MDdTcEc2Y3hhQk00SFRwRm5VTTlsIiwiaWF0IjoxNjc2MTk1OTU0LCJpc3MiOiJTdHJlYW1FbGVtZW50cyJ9.tbk2Ouiy6p9GDBvV2dpZ9iuE9gmwcFfIwslDnkmoET0'
            }
          }).then(response => response.json())
        )
      );
      setData(responses);
    };

    fetchData();

    const interval = setInterval(() => {
      fetchData();
    }, 6000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    localStorage.setItem('data', JSON.stringify(data));
  }, [data]);

  return (
    <div>
      {data &&
        data.map((jsonData, index) => (
          <div key={index}>
            <table>
              <tr>
                <th>Gifter</th>
                <th>Count</th>
              </tr>
              {Object.entries(
                jsonData.reduce((counts, item) => {
                  if (item.data.sender) {
                    counts[item.data.sender] = counts[item.data.sender]
                      ? counts[item.data.sender] + 1
                      : 1;
                  }
                  return counts;
                }, {})
              )
                .sort((a, b) => b[1] - a[1])
                .map(([sender, count]) => (
                  <tr key={sender}>
                    <td>{sender}</td>
                    <td>{count}</td>
                  </tr>
                ))}
            </table>
            <p>Total Gifted Subs: {jsonData.filter(item => item.data.sender).length}</p>
          </div>
        ))}
    </div>
  );
};

export default App;
