import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import { Route, Routes } from 'react-router-native';
import { Login } from './core/containers/auth/Login';
import { Register } from './core/containers/auth/Register';

interface RoutersProps {}

const Routers: React.FC<RoutersProps> = () => {
    return (
        <View style={styles.container}>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/register" element={<Register />} />
            </Routes>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

export default Routers;
