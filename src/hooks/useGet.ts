/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useCallback } from 'react';
import axios from 'axios';
import { objToQuery } from 'scripts';

export const useGet = <DataType>(
  endpoint: string,
  payload?: {
    [x: string]: string | number;
  },
  token?: string,
) => {
  const [data, dataSet] = useState<DataType | undefined>(undefined);
  const [error, errorSet] = useState<any>(undefined);
  const [loading, loadingSet] = useState<boolean>(true);

  const request = useCallback(() => {
    axios
      .get(
        `${endpoint}${payload ? objToQuery(payload) : ''}`,
        token
          ? {
              headers: {
                Authorization: `Bearer ${token}`,
              },
              timeout: 5 * 60000,
            }
          : { timeout: 5 * 60000 },
      )
      .then((res) => {
        loadingSet(false);
        dataSet(res.data);
      })
      .catch((err) => {
        loadingSet(false);
        errorSet(err);
      });
  }, [endpoint, payload, loadingSet, dataSet, errorSet, token]);

  return {
    data,
    error,
    loading,
    request,
  };
};
