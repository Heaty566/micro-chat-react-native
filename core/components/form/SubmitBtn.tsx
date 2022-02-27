import { Button } from 'native-base';
import * as React from 'react';

interface SubmitBtnProps {
    isLoading: boolean;
    handleOnSubmit: () => void;
    label: string;
}

export const FormBtn: React.FC<SubmitBtnProps> = ({ isLoading, handleOnSubmit, label }) => {
    return (
        <Button bg="blue.500" borderRadius={0} isLoading={isLoading} isLoadingText="Submitting" onPress={handleOnSubmit}>
            {label}
        </Button>
    );
};
