import * as React from 'react';
import { Text, View } from 'react-native';
import { Link } from 'react-router-native';
import { routerPaths } from '../../constant';
import { routerComponents } from '../../routers';

interface HomeProps {}

export const Home: React.FC<HomeProps> = () => {
    return (
        <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
            <Link to={routerPaths.authLogin} underlayColor="#f0f4f7">
                <Text>Login</Text>
            </Link>
            <Link to={routerPaths.authRegister} underlayColor="#f0f4f7">
                <Text>Register</Text>
            </Link>
        </View>
    );
};
