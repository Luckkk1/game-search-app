import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

const useHttp = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigator = useNavigate();

  const sendRequest = useCallback(async (requestConfig, applyData, link) => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await fetch(requestConfig.url, {
        method: requestConfig.method ? requestConfig.method : 'GET',
        body: JSON.stringify(requestConfig.body)
          ? JSON.stringify(requestConfig.body)
          : null,
        headers: requestConfig.headers ? requestConfig.headers : {},
      });

      if (!res.ok) {
        throw new Error('Request Failed');
      }
      const data = await res.json();

      if (applyData) {
        applyData(data);
      }
      if (link) {
        navigator(`/${link}`);
      }
    } catch (err) {
      setError(err.message);
    }
    setIsLoading(false);
  }, []);
  return { isLoading, error, sendRequest };
};

export default useHttp;
