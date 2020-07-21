/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect, useState } from 'react';
import fetch from '../utils/fetch';

const withFetching = (url) => (Component) => (props) => {
  const [state, setState] = useState({
    data: null,
    isLoading: false,
    error: null,
  });

  const fetchData = async (queryParams = {}) => {
    try {
      // setLoading(true);
      const response = await fetch(url, { queryParams });
      const data = await response.json();
      setState({
        data,
        isLoading: false,
      });
    } catch (error) {
      setState({
        error,
        isLoading: false,
      });
    }
  };

  const sortData = (isAsc) =>
    setState((prevState) => ({
      data: {
        results: [
          ...prevState.data.results.sort((a, b) =>
            !isAsc ? a.id - b.id : b.id - a.id,
          ),
        ],
      },
    }));
  useEffect(() => {
    setState({ isLoading: true });
    fetchData();
  }, []);

  // render() {
  return (
    <Component
      {...props}
      {...state}
      fetchData={fetchData}
      sortData={sortData}
    />
  );
  // }
};

export default withFetching;
