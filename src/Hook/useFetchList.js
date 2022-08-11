import { useState, useCallback } from 'react';

const useFetchList = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const sendRequest = useCallback(async (url, applyList, randList) => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await fetch(url, {
        method: 'GET',
      });

      if (!res.ok) {
        throw new Error('Request Failed');
      }
      const data = await res.json();

      const gameList = data.results;
      let listData = [];

      for (let game of gameList) {
        listData.push({
          name: game.name,
          img: game.background_image,
          id: game.id,
          metacritic: game.metacritic,
          rating: game.rating,
        });
      }
      if (randList) {
        randList(listData[Math.floor(Math.random() * 20)]);
      }
      if (applyList) {
        applyList(listData);
      }
    } catch (err) {
      setError(err.message);
    }
    setIsLoading(false);
  }, []);
  return { isLoading, error, sendRequest };
};

export default useFetchList;
