import * as React from 'react';

import { theme } from '../../styles';
import { Control, Controller } from 'react-hook-form';
import { Input, FormControl, Box, Stack, Text, KeyboardAvoidingView } from 'native-base';

interface FormTextProps {
    label: string;
    placeHolder?: string;
    error: string;
    name: string;
    control: Control<any>;
}

export const FormText: React.FunctionComponent<FormTextProps> = ({ label, placeHolder = '', error, name, control }) => {
    return (
        <KeyboardAvoidingView keyboardVerticalOffset={10}>
            <Box mb={2}>
                <Text mb={1} fontWeight={'semibold'}>
                    {label}
                </Text>
                <Controller
                    name={name}
                    control={control}
                    render={({ field: { onChange, value, onBlur } }) => (
                        <Input
                            borderWidth={1}
                            paddingX={8}
                            paddingY={8}
                            mb={1}
                            _focus={{
                                borderColor: 'tango.500',
                            }}
                            backgroundColor={'white'}
                            borderColor={'gallery.500'}
                            value={value as string}
                            onBlur={onBlur}
                            onChangeText={(value) => onChange(value)}
                            placeholder={placeHolder}
                            nativeID={name}
                        />
                    )}
                />
                {Boolean(error) && (
                    <Text color={'danger.500'}>
                        {label} {error}
                    </Text>
                )}
            </Box>
        </KeyboardAvoidingView>
    );
};
// const styles = StyleSheet.create({
//     textContainer: {
//         marginBottom: 4 * 6,
//     },
//     textError: {
//         marginTop: 4,
//         color: theme.colors.red[500],
//         fontSize: 12,
//     },
//     textLabel: {
//         color: theme.colors.black,
//         marginBottom: 4 * 2,
//         fontWeight: '700',
//     },
// });
