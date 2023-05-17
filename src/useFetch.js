import { useState, useEffect } from 'react';
export const API_ENDPOINT = `https://www.omdbapi.com/?apikey=${process.env.REACT_APP_MOVIE_API_KEY}`;

const useFetch = urlParms => {
  const [isLoading, setIsloading] = useState(true);
  const [error, setError] = useState({ show: false, mgs: '' });
  const [data, setData] = useState(null);
  const fetchMovies = async url => {
    setIsloading(true);

    try {
      const response = await fetch(url);
      const data = await response.json();
      // eslint-disable-next-line
      if (data.Response === 'True') {
        setData(data.Search || data);
        setError({ show: false, mgs: '' });
      } else {
        setError({ show: true, msg: data.Error });
      }
      setIsloading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchMovies(`${API_ENDPOINT}${urlParms}`);
  }, [urlParms]);
  return {
    isLoading,
    error,
    data,
  };
};

export default useFetch;
