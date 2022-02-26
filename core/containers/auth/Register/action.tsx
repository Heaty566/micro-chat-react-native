import gql from 'graphql-tag';

export const signUpUser = gql`
    mutation signUpUser($username: String!, $password: String!, $confirmPassword: String!, $name: String!) {
        signUpUser(input: { username: $username, password: $password, confirmPassword: $confirmPassword, name: $name })
    }
`;
