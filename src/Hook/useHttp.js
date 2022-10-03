import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

const useHttp = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const navigator = useNavigate();
  const sendRequest = useCallback(async (requestConfig, applyData, link) => {
    setIsLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const res = await fetch(requestConfig.url, {
        method: requestConfig.method ? requestConfig.method : 'GET',
        body: JSON.stringify(requestConfig.body)
          ? JSON.stringify(requestConfig.body)
          : null,
        headers: requestConfig.headers ? requestConfig.headers : {},
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error.message || 'Request Failed');
      }
      if (applyData) {
        applyData(data);
      }
      if (link) {
        navigator(`/${link}`);
      }
    } catch (err) {
      setError(err.message);
      setIsLoading(false);
      setSuccess(false);
      return err.message;
    }
    setSuccess(true);
    setIsLoading(false);
  }, []);
  return { isLoading, error, success, sendRequest };
};

export default useHttp;
