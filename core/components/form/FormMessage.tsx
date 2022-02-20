import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { capitalizeFirstLetter } from '../../helpers/string.helper';
import { theme } from '../../styles';

interface FormMessageProps {
    message?: string;
    errorMessage?: string;
}

export const FormMessage: React.FC<FormMessageProps> = ({ message, errorMessage }) => {
    if (message)
        return (
            <View style={styles.messageContainer}>
                <Text style={styles.message}>{capitalizeFirstLetter(message)}</Text>
            </View>
        );
    if (errorMessage)
        return (
            <View style={styles.messageContainer}>
                <Text style={styles.messageError}>{capitalizeFirstLetter(errorMessage)}</Text>;
            </View>
        );
    return <></>;
};
const styles = StyleSheet.create({
    messageError: {
        marginTop: theme.gutter,
        color: theme.colors.red[500],
        fontSize: theme.fontSize.sm,
        fontWeight: '700',
    },
    messageContainer: {
        marginVertical: theme.gutter * 2,
    },
    message: {
        marginTop: theme.gutter,
        color: theme.colors.green[500],
        fontSize: theme.fontSize.sm,
        fontWeight: '700',
    },
});
