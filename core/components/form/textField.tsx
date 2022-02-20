import * as React from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { theme } from '../../styles';

interface FormTextProps {
    label: string;
    placeHolder?: string;
    error: string;
    name: string;
}

export const FormText: React.FunctionComponent<FormTextProps> = ({ label, placeHolder = '', error, name }) => {
    return (
        <View style={styles.textContainer}>
            <Text style={styles.textLabel}>{label}</Text>
            <TextInput style={styles.textInput} placeholder={placeHolder} nativeID={name} />
            {Boolean(error) && (
                <Text style={styles.textError}>
                    {label} {error}
                </Text>
            )}
        </View>
    );
};
const styles = StyleSheet.create({
    textContainer: {
        marginBottom: theme.gutter * 6,
    },
    textError: {
        marginTop: theme.gutter,
        color: theme.colors.red[500],
        fontSize: theme.fontSize.sm,
    },
    textLabel: {
        color: theme.colors.black,
        marginBottom: theme.gutter * 2,
        fontWeight: '700',
    },
    textInput: {
        backgroundColor: theme.colors.white,
        borderWidth: 1,
        borderColor: '#EBEBEB',
        paddingHorizontal: theme.gutter * 2,
        paddingVertical: theme.gutter * 2,
    },
});
