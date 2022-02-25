import * as React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { NativeRouter, Route, Routes } from 'react-router-native';
import { routerPaths } from './core/constant';
import { NativeBaseProvider } from 'native-base';
import { routerComponents } from './core/routers';
import { theme } from './core/styles';
import { useFonts } from 'expo-font';

export default function App() {
    const [fontsLoaded] = useFonts({
        SFTextRegular: require('./assets/fonts/SF-Pro-Text-Regular.otf'),
        SFTextSemibold: require('./assets/fonts/SF-Pro-Text-Semibold.otf'),
        SFTextBold: require('./assets/fonts/SF-Pro-Text-Bold.otf'),
        SFTextMedium: require('./assets/fonts/SF-Pro-Text-Medium.otf'),
    });
    if (!fontsLoaded) {
        return <Text>Loading</Text>;
    }

    return (
        <NativeBaseProvider theme={theme}>
            <NativeRouter>
                <View style={styles.container}>
                    <Routes>
                        <Route path={'/'} element={<routerComponents.authLogin />} />
                        {/* <Route path={'/'} element={<routerComponents.authRegister />} /> */}
                        {/* <Route path={routerPaths.home} element={<routerComponents.home />} /> */}
                    </Routes>
                </View>
            </NativeRouter>
        </NativeBaseProvider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
