import * as React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigate } from 'react-router-native';
import { routerPaths } from '../constant';

export const RouterProtection: React.FC = ({ children }) => {
    const navigate = useNavigate();
    const checkToken = React.useCallback(async () => {
        const token = await AsyncStorage.getItem('token');
        if (!token) {
            navigate(routerPaths.authLogin);
        }
    }, [navigate]);

    React.useEffect(() => {
        checkToken()
            .then(() => {})
            .catch(() => {});
    }, [checkToken]);

    return <>{children}</>;
};
