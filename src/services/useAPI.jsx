import { useEffect, useState } from 'react';


const useAPI = (url) => {
  const [result, setResult] = useState('');
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState('');


  useEffect(() => {
    let bool = false;
    fetch(url)
      .then(response => response.json())
      .then(data => {
        if (!bool) {
          setResult(data);
          setLoading(false);
        } 
      })
      .catch(e => {
        if (!bool) {
          setError(e.message);
          setLoading(false);
        }
      })
    return () => {
      bool = true;
    };
  }, [url]);


  return { result, isLoading, error };
};

export default useAPI;
