import * as React from 'react';
import axios from 'axios';
import { AxiosRequestConfig } from 'axios';

export interface UseCallApi<T> {
    method: 'get' | 'post' | 'put';
    data: T;
    url: string;
    config?: AxiosRequestConfig;
}

export interface ApiResponse<V> {
    data: V;
}

export interface ApiErrorResponse<T> {
    details: T;
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

        axios[method]<V>(url, data, { ...config })
            .then((req) => setResponse(req.data))
            .catch(({ response }: { response: { data: ApiErrorResponse<T & ResponseDetails> } }) => setDetails({ ...response.data.details }))
            .finally(() => setIsLoading(false));
    };

    return { isLoading, response, details, makeRequest };
};
