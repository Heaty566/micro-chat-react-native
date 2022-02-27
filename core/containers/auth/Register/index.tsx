import * as React from 'react';
import { ImageBackground, ImageSourcePropType } from 'react-native';
import { styles } from './style';
import { useMutation } from '@apollo/client';
import { FormText } from '../../../components/form/TextField';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useCallApi } from '../../../hook/useCallApi';
import { config } from '../../../config';
import { FormBtn } from '../../../components/form/SubmitBtn';
import { FormMessage } from '../../../components/form/FormMessage';
import backgroundImage from '../../../../assets/bg-login.jpg';
import { useForm } from 'react-hook-form';
import { Box, Text } from 'native-base';
import { routerPaths } from '../../../constant';
import { Link } from 'react-router-native';
import { signUpUser } from './action';
export interface RegisterUserDto {
    name: string;
    username: string;
    password: string;
    confirmPassword: string;
}
const defaultValues: RegisterUserDto = { username: '', password: '', confirmPassword: '', name: '' };

interface RegisterProps {}

export const Register: React.FC<RegisterProps> = () => {
    const { control, handleSubmit } = useForm<RegisterUserDto>({ defaultValues });
    const [callFunction, { error, data, loading }] = useMutation<any, RegisterUserDto, RegisterUserDto>(signUpUser);

    const handleOnLogin = async (data: RegisterUserDto) => {
        console.log(data);
        try {
            await callFunction({ variables: data });
        } catch (error) {
            console.log(error);
        }
    };

    React.useEffect(() => {
        console.log(error?.graphQLErrors[0]?.message?.name);
    }, [error]);

    React.useEffect(() => {
        console.log(loading);
    }, [loading]);

    return (
        <ImageBackground resizeMode="cover" source={backgroundImage as ImageSourcePropType} style={styles.bg}>
            <Box px="4" py="12" bg="rgba(235, 235, 235, 0.95)" width="4/5">
                <Text textAlign="center" fontWeight="semibold" fontSize="4xl">
                    Sign Up
                </Text>
                {/* <FormMessage errorMessage={details.errorMessage} message={details.message} /> */}
                <FormText label="Full name" name="name" error={''} control={control} />
                <FormText label="Username" name="username" error={''} control={control} />
                <FormText label="Password" name="password" error={''} control={control} />
                <FormText label="Confirm Password" name="confirmPassword" error={''} control={control} />
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
