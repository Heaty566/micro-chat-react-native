import * as React from 'react';
import { Pressable, View, StyleSheet } from 'react-native';
import { Text } from 'react-native-animatable';
import { theme } from '../../styles';
import { LoadingWave } from './LoadingWave';

interface SubmitBtnProps {
    isLoading: boolean;
    handleOnSubmit: () => void;
    label: string;
}

export const FormBtn: React.FC<SubmitBtnProps> = ({ isLoading, handleOnSubmit, label }) => {
    return (
        <View>
            {isLoading ? (
                <LoadingWave />
            ) : (
                <Pressable style={styles.formBtn} onPress={handleOnSubmit}>
                    <Text style={styles.formBtnText}>{label}</Text>
                </Pressable>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
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
