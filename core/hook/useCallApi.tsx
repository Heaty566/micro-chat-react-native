import * as React from 'react';
import axios, { AxiosStatic, AxiosRequestConfig } from 'axios';

export interface UseCallApi<T> {
    method: 'get' | 'post' | 'put';
    data: T;
    url: string;
    config?: AxiosRequestConfig;
    customHttp?: AxiosStatic;
}

export interface ApiResponse<V> {
    data: V;
}

export interface ApiErrorResponse<T> {
    details: T;
}
export class ResponseDetails {
    errorMessage?: string;
    message?: string;
}

export const useCallApi = <T extends Record<string, any>, V>(defaultErrorValue: T) => {
    type DetailsType = T & ResponseDetails;
    const [isLoading, setIsLoading] = React.useState(false);
    const [response, setResponse] = React.useState<V>();
    const [details, setDetails] = React.useState<DetailsType>({ ...defaultErrorValue });

    const makeRequest = ({ data, method, url, config, customHttp }: UseCallApi<T>) => {
        setIsLoading(true);
        setDetails({ ...defaultErrorValue });
        const http = customHttp || axios;

        http[method]<V>(url, data, { ...config })
            .then((req) => setResponse(req.data))
            .catch(({ response }: { response: { data: ApiErrorResponse<DetailsType> } }) => setDetails({ ...response.data.details }))
            .finally(() => setIsLoading(false));
    };

    return { isLoading, response, details, makeRequest };
};
