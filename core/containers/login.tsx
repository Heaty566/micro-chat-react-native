import * as React from 'react';
import { Button, ImageBackground, StyleSheet, Text, TextInput, View, Pressable, ScrollView, KeyboardAvoidingView, Dimensions } from 'react-native';
import { theme } from '../styles';
import FormText from '../components/form/textField';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import { useCallApi } from '../hook/useCallApi';

export interface LoginUserDto {
    username: string;
    password: string;
}

interface LoginProps {}

const Login: React.FunctionComponent<LoginProps> = () => {
    const { error, isLoading, makeRequest, response } = useCallApi<LoginUserDto, {}>({ username: '', password: '' });
    const handleOnLogin = () => {
        makeRequest({ method: 'post', data: { password: '12334', username: '123213' }, url: '/auth/login' });
    };

    React.useEffect(() => {
        console.log(error);
    }, [error]);

    return (
        <KeyboardAwareScrollView style={{ backgroundColor: 'red' }}>
            <View style={styles.container}>
                <ImageBackground source={require('../../assets/bg-login.jpg')} style={styles.bg}>
                    <View style={styles.test}>
                        <View style={styles.test2}>
                            <View style={styles.formContainer}>
                                <Text style={styles.formHeader}>Sign In</Text>

                                <FormText label="Username" />
                                <FormText label="Password" />
                                {isLoading ? (
                                    <Text>Loading</Text>
                                ) : (
                                    <Pressable style={styles.formBtn} onPress={handleOnLogin}>
                                        <Text style={styles.formBtnText}>Sign In</Text>
                                    </Pressable>
                                )}
                            </View>
                        </View>
                    </View>
                </ImageBackground>
            </View>
        </KeyboardAwareScrollView>
    );
};
const styles = StyleSheet.create({
    container: { flex: 1, height: Dimensions.get('screen').height },
    formHeader: { fontSize: 32, textAlign: 'center', marginBottom: 24, fontWeight: '700', letterSpacing: 1 },
    test: { width: '100%' },
    test2: { justifyContent: 'center', alignItems: 'center' },
    bg: {
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: '100%',
    },
    formContainer: {
        paddingHorizontal: theme.gutter * 4,
        paddingVertical: theme.gutter * 12,
        borderRadius: theme.gutter * 2,
        width: '100%',
        maxWidth: '80%',
        backgroundColor: 'rgba(235, 235, 235, 0.95)',
    },
    formBtn: {
        marginTop: theme.gutter * 4,
        paddingHorizontal: theme.gutter,
        paddingVertical: theme.gutter * 3,
        backgroundColor: '#2464EA',
    },
    formBtnText: {
        textAlign: 'center',
        fontWeight: 'bold',
        color: theme.color.white,
    },
});

export default Login;
