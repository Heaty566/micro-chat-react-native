import { StyleSheet, Dimensions } from 'react-native';
import { theme } from '../../../styles';

export const styles = StyleSheet.create({
    container: { flex: 1, height: Dimensions.get('screen').height },
    formHeader: { fontSize: 32, textAlign: 'center', marginBottom: 24, fontWeight: '700', letterSpacing: 1 },
    wrapper: { width: '100%' },
    formWrapper: { justifyContent: 'center', alignItems: 'center' },
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
        color: theme.colors.white,
    },
});
