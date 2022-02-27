import * as React from 'react';
import { ImageBackground, ImageSourcePropType } from 'react-native';
import { styles } from './style';
import { FormText } from '../../../components/form/TextField';
import { FormBtn } from '../../../components/form/SubmitBtn';
import { Box, Text } from 'native-base';
import { Link, useNavigate } from 'react-router-native';
import { useForm } from 'react-hook-form';
import backgroundImage from '../../../../assets/bg-login.jpg';
import { routerPaths } from '../../../constant';
import { useMutation } from '@apollo/client';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { signInUser } from './action';

export interface LoginUserDto {
    username: string;
    password: string;
}

const defaultValues: LoginUserDto = { username: '', password: '' };

export const Login: React.FunctionComponent = () => {
    const navigate = useNavigate();
    const { control, handleSubmit } = useForm<LoginUserDto>({ defaultValues });
    const [errors, setErrors] = React.useState({ ...defaultValues });
    const [callFunction, { loading }] = useMutation<{ signInUser: string }, LoginUserDto, LoginUserDto>(signInUser, {
        onError: (err) => {
            if (err.graphQLErrors[0].message && typeof err.graphQLErrors[0].message === 'object') {
                setErrors({ ...(err.graphQLErrors[0].message as LoginUserDto) });
            }
        },
        onCompleted: async (data) => {
            await AsyncStorage.setItem('token', data.signInUser);
            navigate(routerPaths.home);
        },
    });

    const handleOnLogin = async (data: LoginUserDto) => {
        await callFunction({ variables: data }).catch(() => {});
    };
    return (
        <ImageBackground resizeMode="cover" source={backgroundImage as ImageSourcePropType} style={styles.bg}>
            <Box px="4" py="12" bg="rgba(235, 235, 235, 0.95)" width="4/5" rounded={'lg'}>
                <Text textAlign="center" fontWeight="semibold" fontSize="4xl">
                    Sign In
                </Text>

                <FormText label="Username" name="username" error={errors.username} control={control} />
                <FormText label="Password" name="password" error={errors.password} control={control} />
                <FormBtn handleOnSubmit={handleSubmit(handleOnLogin)} isLoading={loading} label="Sign In" />
                <Link to={routerPaths.authRegister}>
                    <Text textAlign="center" mt={4} color="tango.500" fontWeight={'semibold'}>
                        Create New Account
                    </Text>
                </Link>
            </Box>
        </ImageBackground>
    );
};
