import { StyleSheet, View } from 'react-native';
import { Login } from './core/containers/auth/Login';

export default function App() {
    return (
        <View style={styles.container}>
            <Login />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
