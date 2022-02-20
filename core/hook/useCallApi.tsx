import * as React from 'react';
import { http } from '../api';
import { AxiosRequestConfig } from 'axios';

export interface UseCallApi<T> {
    method: 'get' | 'post' | 'put';
    data: T;
    url: string;
    config?: AxiosRequestConfig;
}
export interface ResponseDetails {
    errorMessage?: string;
    message?: string;
}

export const useCallApi = <T, V>(defaultErrorValue: T) => {
    const [isLoading, setIsLoading] = React.useState(false);
    const [response, setResponse] = React.useState<V>();
    const [details, setDetails] = React.useState<T & ResponseDetails>({ ...defaultErrorValue });

    const makeRequest = ({ data, method, url, config }: UseCallApi<T>) => {
        setIsLoading(true);
        setDetails({ ...defaultErrorValue });

        http[method]<V>(url, data, { ...config })
            .then((req) => {
                setResponse(req.data);
            })
            .catch((err) => {
                setDetails(err.data.details);
            })
            .finally(() => setIsLoading(false));
    };

    return { isLoading, response, details, makeRequest };
};
