import * as React from 'react';
import { ImageBackground, ImageSourcePropType, View } from 'react-native';
import { styles } from './style';
import { FormText } from '../../../components/form/TextField';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useCallApi } from '../../../hook/useCallApi';
import { config } from '../../../config';
import { FormBtn } from '../../../components/form/SubmitBtn';
import { FormMessage } from '../../../components/form/FormMessage';
import { Box, Text } from 'native-base';
import { Link } from 'react-router-native';
import { useForm } from 'react-hook-form';
import backgroundImage from '../../../../assets/bg-login.jpg';
import { routerPaths } from '../../../constant';
export interface LoginUserDto {
    username: string;
    password: string;
}

const defaultValues: LoginUserDto = { username: '', password: '' };

export const Login: React.FunctionComponent = () => {
    const { control, handleSubmit } = useForm<LoginUserDto>({ defaultValues });
    const { details, isLoading, makeRequest } = useCallApi<LoginUserDto, Record<string, unknown>>({ ...defaultValues });
    const handleOnLogin = (data: LoginUserDto) => makeRequest({ method: 'post', data, url: `${config.SERVER_URL}/auth/login` });

    return (
        <ImageBackground resizeMode="cover" source={backgroundImage as ImageSourcePropType} style={styles.bg}>
            <Box px="4" py="12" bg="rgba(235, 235, 235, 0.95)" width="4/5" rounded={'lg'}>
                <Text textAlign="center" fontWeight="semibold" fontSize="4xl">
                    Sign In
                </Text>
                <FormMessage errorMessage={details.errorMessage} message={details.message} />
                <FormText label="Username" name="username" error={details.username} control={control} />
                <FormText label="Password" name="password" error={details.password} control={control} />
                <FormBtn handleOnSubmit={handleSubmit(handleOnLogin)} isLoading={isLoading} label="Sign In" />
                <Link to={routerPaths.authRegister}>
                    <Text textAlign="center" mt={4} color="tango.500" fontWeight={'semibold'}>
                        Create New Account
                    </Text>
                </Link>
            </Box>
        </ImageBackground>
    );
};
