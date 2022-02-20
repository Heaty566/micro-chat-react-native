import * as React from 'react';
import { ImageBackground, Text, View } from 'react-native';
import { styles } from './style';
import { FormText } from '../../../components/form/TextField';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useCallApi } from '../../../hook/useCallApi';
import { config } from '../../../config';
import { FormBtn } from '../../../components/form/SubmitBtn';
import { FormMessage } from '../../../components/form/FormMessage';

export interface LoginUserDto {
    username: string;
    password: string;
}

interface LoginProps {}

export const Login: React.FunctionComponent<LoginProps> = () => {
    const { details, isLoading, makeRequest, response } = useCallApi<LoginUserDto, {}>({ username: '', password: '' });
    const handleOnLogin = () => {
        makeRequest({ method: 'post', data: { password: '12334', username: '123213' }, url: `${config.SERVER_URL}/api/auth/login` });
    };

    return (
        <KeyboardAwareScrollView style={{ backgroundColor: 'red' }}>
            <View style={styles.container}>
                <ImageBackground source={require('../../../../assets/bg-login.jpg')} style={styles.bg}>
                    <View style={styles.test}>
                        <View style={styles.test2}>
                            <View style={styles.formContainer}>
                                <Text style={styles.formHeader}>Sign In</Text>
                                <FormMessage errorMessage={details.errorMessage} message={details.message} />
                                <FormText label="Username" name="username" error={details.username} />
                                <FormText label="Password" name="password" error={details.password} />
                                <FormBtn handleOnClick={handleOnLogin} isLoading={isLoading} label="Sign In" />
                            </View>
                        </View>
                    </View>
                </ImageBackground>
            </View>
        </KeyboardAwareScrollView>
    );
};
