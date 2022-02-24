import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import { NativeRouter, Route, Routes } from 'react-router-native';
import { routerPaths } from './core/constant';
import { routerComponents } from './core/routers';

export default function App() {
    return (
        <NativeRouter>
            <View style={styles.container}>
                <Routes>
                    <Route path={routerPaths.authLogin} element={<routerComponents.authLogin />} />
                    <Route path={routerPaths.authRegister} element={<routerComponents.authRegister />} />
                    <Route path={routerPaths.home} element={<routerComponents.home />} />
                </Routes>
            </View>
        </NativeRouter>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
