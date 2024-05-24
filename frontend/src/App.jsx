import React, { useEffect, useState } from 'react';
import axios from 'axios';

const App = () => {
  const [date, setDate] = useState('');

  useEffect(() => {
    axios.get('/api/hello')
      .then(response => {
        setDate(response.data.message);
      })
      .catch(error => {
        console.error('There was an error making the request!', error);
      });
  }, []);

  return (
    <>
      <div>App</div>
      <div>{date}</div>
    </>
  )
}

export default App