import * as React from 'react';
import { ImageBackground } from 'react-native';
import { styles } from './style';
import { useMutation } from '@apollo/client';
import { FormText, FormBtn } from '../../../components/form';
import backgroundImage from '../../../../assets/bg-login.jpg';
import { useForm } from 'react-hook-form';
import { Box, Text } from 'native-base';
import { routerPaths } from '../../../constant';
import { Link } from 'react-router-native';
import { signUpUser } from './action';
import { useNavigate } from 'react-router-dom';
import AsyncStorage from '@react-native-async-storage/async-storage';
export interface RegisterUserDto {
    name: string;
    username: string;
    password: string;
    confirmPassword: string;
}
const defaultValues: RegisterUserDto = { username: '', password: '', confirmPassword: '', name: '' };

export const Register: React.FC = () => {
    const navigate = useNavigate();

    const { control, handleSubmit } = useForm<RegisterUserDto>({ defaultValues });
    const [errors, setErrors] = React.useState({ ...defaultValues });
    const [callFunction, { loading }] = useMutation<{ signUpUser: string }, RegisterUserDto, RegisterUserDto>(signUpUser, {
        onError: (err) => {
            if (err.graphQLErrors[0].message && typeof err.graphQLErrors[0].message === 'object') {
                setErrors({ ...(err.graphQLErrors[0].message as RegisterUserDto) });
            }
        },
        onCompleted: async (data) => {
            await AsyncStorage.setItem('token', data.signUpUser);
            navigate(routerPaths.home);
        },
    });

    const handleOnLogin = async (data: RegisterUserDto) => await callFunction({ variables: data }).catch(() => {});

    return (
        <ImageBackground resizeMode="cover" source={backgroundImage} style={styles.bg}>
            <Box px="4" py="12" bg="rgba(235, 235, 235, 0.95)" width="4/5" borderRadius={5}>
                <Text textAlign="center" fontWeight="semibold" fontSize="4xl">
                    Sign Up
                </Text>
                <FormText label="Full name" name="name" error={errors.name} control={control} />
                <FormText label="Username" name="username" error={errors.username} control={control} />
                <FormText label="Password" name="password" error={errors.password} control={control} />
                <FormText label="Confirm Password" name="confirmPassword" error={errors.confirmPassword} control={control} />
                <FormBtn handleOnSubmit={handleSubmit(handleOnLogin)} isLoading={loading} label="Sign Up" />
                <Link to={routerPaths.authLogin}>
                    <Text textAlign="center" mt={4} color="tango.500" fontWeight={'semibold'}>
                        Continue with existed account
                    </Text>
                </Link>
            </Box>
        </ImageBackground>
    );
};
