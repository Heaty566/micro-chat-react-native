import * as React from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { theme } from '../../styles';

interface FormTextProps {
    label: string;
    placeHolder?: string;
}

const FormText: React.FunctionComponent<FormTextProps> = ({ label, placeHolder = '' }) => {
    return (
        <View style={styles.formTextContainer}>
            <Text style={styles.formTextLabel}>{label}</Text>
            <TextInput style={styles.formTextInput} placeholder={placeHolder} />
        </View>
    );
};
const styles = StyleSheet.create({
    formTextContainer: {
        marginBottom: theme.gutter * 6,
    },
    formTextLabel: {
        color: theme.color.black,
        marginBottom: theme.gutter * 2,
        fontWeight: '700',
    },
    formTextInput: {
        backgroundColor: theme.color.white,
        borderWidth: 1,
        borderColor: '#EBEBEB',
        paddingHorizontal: theme.gutter * 2,
        paddingVertical: theme.gutter * 3,
    },
});

export default FormText;
