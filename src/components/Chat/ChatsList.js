import React, { useState, useEffect } from 'react';
import { ListItem, ListItemAvatar, ListItemText, Avatar, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useSelector, useDispatch } from 'react-redux';
import { selectChat } from '../../actions/chatActions';
const useStyles = makeStyles((theme) => ({
    item: {
        "&:hover": {
            backgroundColor: "#f5f5f5"
        }
    }
}));

const ChatsList = ({ filter }) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const chatsList = useSelector(state => state.chat.chatsList);
    const [chats, setChats] = useState([]);
    const selectChatClick = ({ currentTarget: { title } }) => {
        const found = chats.find(({ user: { userName } }) => userName.toLowerCase() === title.toLowerCase());
        dispatch(
            selectChat(found)
            );
    }
    useEffect(() => {
        setChats(chatsList);
    }, [chatsList]); 
    useEffect(() => {
        if (filter !== '') {
            const newChatList = chats.flatMap(chat => {
                if (chat.userName.includes(filter)) {
                    return [chat];
                }
                return [];
            });
            setChats(newChatList);
        } else {
            setChats(chatsList);
        }
    }, [filter]);
    const fillChatsList = () => {
        const renderedList = [];
        for (const chat of chats) {
            renderedList.unshift(
                <ListItem 
                    title={chat.user.userName} 
                    button={true} 
                    onClick={selectChatClick} 
                    className={classes.item} 
                    alignItems="flex-start"
                    >
                    <ListItemAvatar>
                        <Avatar alt={chat.user.userName} src={chat.avatar} />
                    </ListItemAvatar>
                    <ListItemText
                        primary={
                            <React.Fragment>
                                <Typography noWrap={true}>
                                    {chat.user.userName}
                                </Typography>
                            </React.Fragment>
                        }
                        secondary={
                            <React.Fragment>
                                <Typography noWrap={true}>
                                    {chat.latestMessage.content}
                                </Typography>
                            </React.Fragment>
                        }
                    />
                </ListItem>
            );
        }
        return renderedList;
    }
    return fillChatsList();
};

export default ChatsList;