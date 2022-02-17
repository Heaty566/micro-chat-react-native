import axios, { AxiosError } from 'axios';

const axiosClient = axios.create({
    baseURL: 'http://128.199.210.165/api',
    withCredentials: true,
});

axiosClient.interceptors.request.use(function (req) {
    // store.dispatch(apiActions.initReq());

    return req;
});
axiosClient.interceptors.response.use(
    function (response) {
        // store.dispatch(apiActions.resetState());
        // if (response?.data?.details?.message) store.dispatch(apiActions.updateSuccessMessage(response.data));

        return response;
    },
    function (error: AxiosError<null>) {
        // store.dispatch(apiActions.resetState());
        // if (error.response?.status === 401) {
        //     const cookies = new Cookies();
        //     cookies.set('re-token', '', { maxAge: -999 });
        //     cookies.set('auth-token', '', { maxAge: -999 });
        //     cookies.set('io-token', '', { maxAge: -999 });
        // }

        // if (error.response?.status) store.dispatch(apiActions.updateErrorDetails(error.response.data.details));

        return Promise.reject(error.response);
    }
);

export const http = axiosClient;
