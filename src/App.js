import React, { useState, useEffect } from 'react';
import './App.css';

const App = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('https://api.streamelements.com/kappa/v2/activities/59b478950d3fde75addb52b9?after=2023-03-20T06%3A40%3A22.108Z&before=2023-03-20T20%3A31%3A32.108Z&limit=500&mincheer=1&minhost=1&minsub=1&mintip=0&origin=0&types=subscriber', {
        headers: {
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiNTllODhhODlmZDY5MTAxNTM5ZGZkNDFmIiwicm9sZSI6Im93bmVyIiwiY2hhbm5lbCI6IjU5YjQ3ODk1MGQzZmRlNzVhZGRiNTJiOSIsInByb3ZpZGVyIjoidHdpdGNoIiwiYXV0aFRva2VuIjoiVWp1blZ6VWl0VXFEQ2MwRENaaXFoNS1oeVI1MDdTcEc2Y3hhQk00SFRwRm5VTTlsIiwiaWF0IjoxNjc2MTk1OTU0LCJpc3MiOiJTdHJlYW1FbGVtZW50cyJ9.tbk2Ouiy6p9GDBvV2dpZ9iuE9gmwcFfIwslDnkmoET0'
        }
      });
      const json = await response.json();
      setData(json);
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
    {data && (
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
