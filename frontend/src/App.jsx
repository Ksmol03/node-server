import React, { useEffect, useState } from 'react';
import axios from 'axios';

const App = () => {
  const [data, setData] = useState();

  const dataToSend = {
    author: 'Kacper',
    title: 'Title one',
    textContent: 'Lorem ipsum...',
    priority: 1,
    postDate: '2022-10-12'
  }

  useEffect(() => {
      const fetchData = async () =>{
        try {
          const {data: response} = await axios.post('/api/data', dataToSend);
          setData(response.message);
        } catch (error) {
          console.error('There was an error making the request!', error);
        }
      }
  
      fetchData();
  }, []);

  return (
    <>
      <div>App</div>
      <div>{data}</div>
    </>
  )
}

export default App