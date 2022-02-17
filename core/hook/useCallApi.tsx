import * as React from 'react';
import { http } from '../api';
import { AxiosRequestConfig } from 'axios';

export interface UseCallApi<T> {
    method: 'get' | 'post' | 'put';
    data: T;
    url: string;
    config?: AxiosRequestConfig;
}

export const useCallApi = <T, V>(defaultErrorValue: T) => {
    const [isLoading, setIsLoading] = React.useState(false);
    const [response, setResponse] = React.useState<V>();
    const [error, setError] = React.useState<T>({ ...defaultErrorValue });

    const makeRequest = ({ data, method, url, config }: UseCallApi<T>) => {
        setIsLoading(true);
        setError({ ...defaultErrorValue });
        http[method]<V>(url, data, { ...config })
            .then((req) => {
                setResponse(req.data);
            })
            .catch((err) => {
                setError(err.data.details);
            })
            .finally(() => setIsLoading(false));
    };

    return { isLoading, response, error, makeRequest };
};
