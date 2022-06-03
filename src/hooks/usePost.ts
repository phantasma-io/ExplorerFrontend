/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useCallback } from 'react';
import axios from 'axios';
import { ExplorerEndpoints } from 'types/endpoints';

export const usePost = (
  endpoint: ExplorerEndpoints,
  payload: { [x: string]: any },
) => {
  const [data, dataSet] = useState<any>(undefined);
  const [error, errorSet] = useState<any>(undefined);
  const [loading, loadingSet] = useState<boolean>(true);

  const request = useCallback(() => {
    axios
      .post(endpoint, payload)
      .then((res) => {
        console.log({ res });
        loadingSet(false);
        dataSet(res.data);
      })
      .catch((err) => {
        console.log({ err });
        loadingSet(false);
        errorSet(err);
      });
  }, [endpoint, payload, loadingSet, dataSet, errorSet]);

  return {
    data,
    dataSet,
    error,
    errorSet,
    loading,
    loadingSet,
    request,
  };
};
