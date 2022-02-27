import gql from 'graphql-tag';

export const signInUser = gql`
    mutation signInUser($username: String!, $password: String!) {
        signInUser(input: { username: $username, password: $password })
    }
`;
