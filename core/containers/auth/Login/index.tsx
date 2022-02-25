import * as React from 'react';
import { ImageBackground, ImageSourcePropType, Text, View } from 'react-native';
import { styles } from './style';
import { FormText } from '../../../components/form/TextField';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useCallApi } from '../../../hook/useCallApi';
import { config } from '../../../config';
import { FormBtn } from '../../../components/form/SubmitBtn';
import { FormMessage } from '../../../components/form/FormMessage';
import { Box } from 'native-base';
import { useForm } from 'react-hook-form';
import backgroundImage from '../../../../assets/bg-login.jpg';
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
                <Text style={styles.formHeader}>Sign In</Text>
                <FormMessage errorMessage={details.errorMessage} message={details.message} />
                <FormText label="Username" name="username" error={details.username} control={control} />
                <FormText label="Password" name="password" error={details.password} control={control} />
                <FormBtn handleOnSubmit={handleSubmit(handleOnLogin)} isLoading={isLoading} label="Sign In" />
            </Box>
        </ImageBackground>
    );
};
