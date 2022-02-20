import * as React from 'react';
import { Text } from 'react-native';

interface FormMessageProps {
    message?: string;
    errorMessage?: string;
}

export const FormMessage: React.FC<FormMessageProps> = ({ message, errorMessage }) => {
    if (message) return <Text>{message}</Text>;
    if (errorMessage) return <Text>{errorMessage}</Text>;
    return <></>;
};
