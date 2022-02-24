import * as React from 'react';
import { ImageBackground, ImageSourcePropType, Text, View } from 'react-native';
import { styles } from './style';
import { FormText } from '../../../components/form/TextField';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useCallApi } from '../../../hook/useCallApi';
import { config } from '../../../config';
import { FormBtn } from '../../../components/form/SubmitBtn';
import { FormMessage } from '../../../components/form/FormMessage';
import backgroundImage from '../../../../assets/bg-login.jpg';
import { useForm } from 'react-hook-form';

export interface RegisterUserDto {
    fullName: string;
    username: string;
    password: string;
    confirmPassword: string;
}
const defaultValues: RegisterUserDto = { username: '', password: '', confirmPassword: '', fullName: '' };

interface RegisterProps {}

export const Register: React.FC<RegisterProps> = () => {
    const { control, handleSubmit } = useForm<RegisterUserDto>({ defaultValues });
    const { details, isLoading, makeRequest } = useCallApi<RegisterUserDto, Record<string, unknown>>({ ...defaultValues });
    const handleOnLogin = (data: RegisterUserDto) => makeRequest({ method: 'post', data, url: `${config.SERVER_URL}/auth/register` });

    return (
        <KeyboardAwareScrollView style={{ backgroundColor: 'red' }}>
            <View style={styles.container}>
                <ImageBackground source={backgroundImage as ImageSourcePropType} style={styles.bg}>
                    <View style={styles.wrapper}>
                        <View style={styles.formWrapper}>
                            <View style={styles.formContainer}>
                                <Text style={styles.formHeader}>Sign In</Text>
                                <FormMessage errorMessage={details.errorMessage} message={details.message} />
                                <FormText label="Full name" name="fullName" error={details.fullName} control={control} />
                                <FormText label="Username" name="username" error={details.username} control={control} />
                                <FormText label="Password" name="password" error={details.password} control={control} />
                                <FormText label="Confirm Password" name="confirmPassword" error={details.confirmPassword} control={control} />
                                <FormBtn handleOnSubmit={handleSubmit(handleOnLogin)} isLoading={isLoading} label="Sign In" />
                            </View>
                        </View>
                    </View>
                </ImageBackground>
            </View>
        </KeyboardAwareScrollView>
    );
};
