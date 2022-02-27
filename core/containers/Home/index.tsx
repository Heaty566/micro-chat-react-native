import { useMutation, useQuery, useSubscription } from '@apollo/client';
import { Box, Button, Input } from 'native-base';
import * as React from 'react';
import { Avatar, Text, ScrollView } from 'native-base';
import { RouterProtection } from '../../HOC/routerProtection';
import { getCurrentUser, getUsers, createChat, getMyChat, sendMessage, subMessage } from './action';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { routerPaths } from '../../constant';
import { useNavigate } from 'react-router-native';
import { Controller, useForm } from 'react-hook-form';

export interface User {
    name: string;
    username: string;
    createDate: string;
    id: string;
}

export interface Chat {
    id: string;
    createDate: Date;
    messages: Array<{
        userId: string;
        content: string;
        id: string;
    }>;
}

export interface SendMessageDto {
    content: string;
}

export const defaultValues: SendMessageDto = {
    content: '',
};

export const Home: React.FC = () => {
    const { data } = useQuery<{ getCurrentUser: User }>(getCurrentUser);
    const { data: userList } = useQuery<{ getUsers: User[] }>(getUsers);
    const navigate = useNavigate();
    const { data: chatList } = useQuery<{ getMyChat: Chat[] }>(getMyChat);
    const { control, handleSubmit } = useForm<SendMessageDto>({ defaultValues });
    const [currentChat, setCurrentChat] = React.useState<Chat>();
    const [currentChatId, setCurrentChatId] = React.useState('');
    const [callFunction] = useMutation<{ createNewChat: string }, { userId: string }>(createChat, {
        onCompleted: (data) => {
            setCurrentChatId(data.createNewChat);
        },
    });

    const { loading, data: chatUpdate } = useSubscription<{ newMessage: Chat }>(subMessage);

    React.useEffect(() => {
        console.log(chatUpdate);
    }, [chatUpdate]);

    const [send] = useMutation<{ chatId: string; content: string }>(sendMessage, {});

    React.useEffect(() => {
        const chat = chatList?.getMyChat.find((item) => item.id === currentChatId);
        if (chat) {
            setCurrentChat(chat);
        }
    }, [currentChatId, chatList]);
    const handleOnLogout = async () => {
        await AsyncStorage.removeItem('token');
        navigate(routerPaths.authLogin);
    };
    const handleOnConnectChat = async (userId: string) => callFunction({ variables: { userId } });

    const handleSendMessage = async (data: SendMessageDto) => {
        if (currentChatId)
            await send({
                variables: {
                    content: data.content,
                    chatId: currentChatId,
                },
            });
    };

    return (
        <RouterProtection>
            <Box bg="tango.100" flex="1">
                <Box bg="blue.100" p="4" flexDirection="row" alignItems="center" justifyContent="center">
                    <Avatar
                        bg="green.500"
                        source={{
                            uri: 'https://i.picsum.photos/id/364/200/300.jpg?hmac=p9DQJ7EeVALsbnav-G_BYdU2et5ocKd4Qg_xwXjSc0k',
                        }}
                    >
                        AJ
                    </Avatar>
                    <Text mx="4" textTransform="capitalize" fontSize="lg" fontWeight="semibold">
                        {data?.getCurrentUser.name}
                    </Text>
                    <Button onPress={handleOnLogout}>Logout</Button>
                </Box>
                <Text mx={2}>List User</Text>
                <Box flexDirection="row">
                    <ScrollView horizontal={true}>
                        {userList?.getUsers.map((item) => {
                            return (
                                <Button onPress={() => handleOnConnectChat(item.id)} key={item.id} p="1" m="1" bg="tango.200">
                                    <Text>{item.name}</Text>
                                </Button>
                            );
                        })}
                    </ScrollView>
                </Box>
                <Box flex="1" bg="red.100">
                    <Box flex="1">
                        <Text>{currentChatId}</Text>
                        <Text>{currentChat?.messages.length}</Text>
                        {currentChat?.messages.map((item) => {
                            return (
                                <Box key={item.id} justifyContent={'flex-end'} mx={2} my={1}>
                                    <Text bg={'blue.100'} p={1} alignSelf={item.userId === data?.getCurrentUser.id ? 'flex-start' : 'flex-end'}>
                                        {item.content}
                                    </Text>
                                </Box>
                            );
                        })}
                    </Box>
                    <Box flexDirection="row" p="2">
                        <Controller
                            name="content"
                            control={control}
                            render={({ field: { onChange, value, onBlur } }) => (
                                <Input
                                    flex="1"
                                    borderWidth={1}
                                    paddingX={8}
                                    paddingY={8}
                                    mb={1}
                                    _focus={{
                                        borderColor: 'tango.500',
                                    }}
                                    backgroundColor={'white'}
                                    borderColor={'gallery.500'}
                                    value={value}
                                    onBlur={onBlur}
                                    placeholder="hello"
                                    onChangeText={(value) => onChange(value)}
                                />
                            )}
                        />

                        <Button ml="2" onPress={handleSubmit(handleSendMessage)}>
                            Send
                        </Button>
                    </Box>
                </Box>
            </Box>
        </RouterProtection>
    );
};
