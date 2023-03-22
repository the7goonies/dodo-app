import React, { useState, useEffect } from 'react';
import './App.css';

const App = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const urls = [
      'https://api.streamelements.com/kappa/v2/activities/59b478950d3fde75addb52b9?after=2023-03-22T08%3A00%3A00.000Z&before=2023-03-22T09%3A00%3A00.000Z&limit=500&mincheer=1&minhost=1&minsub=1&mintip=0&origin=0&types=subscriber',
      'https://api.streamelements.com/kappa/v2/activities/59b478950d3fde75addb52b9?after=2023-03-22T09%3A00%3A00.001Z&before=2023-03-22T10%3A00%3A00.000Z&limit=500&mincheer=1&minhost=1&minsub=1&mintip=0&origin=0&types=subscriber',
      'https://api.streamelements.com/kappa/v2/activities/59b478950d3fde75addb52b9?after=2023-03-22T10%3A00%3A00.001Z&before=2023-03-22T11%3A00%3A00.000Z&limit=500&mincheer=1&minhost=1&minsub=1&mintip=0&origin=0&types=subscriber',
      'https://api.streamelements.com/kappa/v2/activities/59b478950d3fde75addb52b9?after=2023-03-22T11%3A00%3A00.001Z&before=2023-03-22T12%3A00%3A00.000Z&limit=500&mincheer=1&minhost=1&minsub=1&mintip=0&origin=0&types=subscriber',
      'https://api.streamelements.com/kappa/v2/activities/59b478950d3fde75addb52b9?after=2023-03-22T12%3A00%3A00.001Z&before=2023-03-22T13%3A00%3A00.000Z&limit=500&mincheer=1&minhost=1&minsub=1&mintip=0&origin=0&types=subscriber',
      'https://api.streamelements.com/kappa/v2/activities/59b478950d3fde75addb52b9?after=2023-03-22T13%3A00%3A00.001Z&before=2023-03-22T14%3A00%3A00.000Z&limit=500&mincheer=1&minhost=1&minsub=1&mintip=0&origin=0&types=subscriber',
      'https://api.streamelements.com/kappa/v2/activities/59b478950d3fde75addb52b9?after=2023-03-22T14%3A00%3A00.001Z&before=2023-03-22T15%3A00%3A00.000Z&limit=500&mincheer=1&minhost=1&minsub=1&mintip=0&origin=0&types=subscriber',
      'https://api.streamelements.com/kappa/v2/activities/59b478950d3fde75addb52b9?after=2023-03-22T15%3A00%3A00.001Z&before=2023-03-22T16%3A00%3A00.000Z&limit=500&mincheer=1&minhost=1&minsub=1&mintip=0&origin=0&types=subscriber',
      'https://api.streamelements.com/kappa/v2/activities/59b478950d3fde75addb52b9?after=2023-03-22T16%3A00%3A00.001Z&before=2023-03-22T17%3A00%3A00.000Z&limit=500&mincheer=1&minhost=1&minsub=1&mintip=0&origin=0&types=subscriber',
      'https://api.streamelements.com/kappa/v2/activities/59b478950d3fde75addb52b9?after=2023-03-22T17%3A00%3A00.001Z&before=2023-03-22T18%3A00%3A00.000Z&limit=500&mincheer=1&minhost=1&minsub=1&mintip=0&origin=0&types=subscriber',
      'https://api.streamelements.com/kappa/v2/activities/59b478950d3fde75addb52b9?after=2023-03-22T18%3A00%3A00.001Z&before=2023-03-22T19%3A00%3A00.000Z&limit=500&mincheer=1&minhost=1&minsub=1&mintip=0&origin=0&types=subscriber',
      'https://api.streamelements.com/kappa/v2/activities/59b478950d3fde75addb52b9?after=2023-03-22T19%3A00%3A00.001Z&before=2023-03-22T20%3A00%3A00.000Z&limit=500&mincheer=1&minhost=1&minsub=1&mintip=0&origin=0&types=subscriber',
      'https://api.streamelements.com/kappa/v2/activities/59b478950d3fde75addb52b9?after=2023-03-22T20%3A00%3A00.001Z&before=2023-03-22T21%3A00%3A00.000Z&limit=500&mincheer=1&minhost=1&minsub=1&mintip=0&origin=0&types=subscriber',
      'https://api.streamelements.com/kappa/v2/activities/59b478950d3fde75addb52b9?after=2023-03-22T21%3A00%3A00.001Z&before=2023-03-22T22%3A00%3A00.000Z&limit=500&mincheer=1&minhost=1&minsub=1&mintip=0&origin=0&types=subscriber',
      'https://api.streamelements.com/kappa/v2/activities/59b478950d3fde75addb52b9?after=2023-03-22T22%3A00%3A00.001Z&before=2023-03-22T23%3A00%3A00.000Z&limit=500&mincheer=1&minhost=1&minsub=1&mintip=0&origin=0&types=subscriber',
      'https://api.streamelements.com/kappa/v2/activities/59b478950d3fde75addb52b9?after=2023-03-22T23%3A00%3A00.001Z&before=2023-03-23T00%3A00%3A00.000Z&limit=500&mincheer=1&minhost=1&minsub=1&mintip=0&origin=0&types=subscriber',
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
          <th>Gifter</th>
          <th>Count</th>
        </tr>
          {Object.entries(data.reduce((counts, item) => {
            if (item.data.sender) {
              counts[item.data.sender] = counts[item.data.sender] ? counts[item.data.sender] + 1 : 1;
            }
            return counts;
          }, {})).sort((a, b) => b[1] - a[1]).map(([sender, count]) => (
            <tr key={sender}>
              <td>{sender}</td>
              <td>{count}</td>
            </tr>
          ))}
        </table>
        <p>Total Gifted Subs: {data.filter(item => item.data.sender).length}</p>
      </div>
    )}
  </div>
  );
};

export default App;
