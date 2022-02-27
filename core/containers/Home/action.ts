import gql from 'graphql-tag';

export const getCurrentUser = gql`
    query {
        getCurrentUser {
            name
            username
            createDate
            id
        }
    }
`;
export const getUsers = gql`
    query {
        getUsers {
            name
            username
            createDate
            id
        }
    }
`;

export const createChat = gql`
    mutation createNewChat($userId: String!) {
        createNewChat(input: { userId: $userId })
    }
`;

export const getMyChat = gql`
    query {
        getMyChat {
            id
            createDate
            messages {
                userId
                content
                id
            }
        }
    }
`;

export const sendMessage = gql`
    mutation addNewMessage($chatId: String!, $content: String!) {
        addNewMessage(input: { chatId: $chatId, content: $content })
    }
`;

export const subMessage = gql`
    subscription {
        newMessage {
            id
            createDate
            messages {
                userId
            }
        }
    }
`;
