import React, { useState, useEffect, useRef } from 'react';
import { Paper, Grid, Typography, Input, InputAdornment, Chip, Tooltip  } from '@material-ui/core'; 
import { Send } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';
import { useSelector } from 'react-redux';
import clsx from 'clsx';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    header: {
        backgroundColor: 'white',
        display: 'flex',
        direction: 'row',
        alignItems: 'center'
    },
    chatBox: {
        height: '50vh',
        backgroundColor: '#f5f5f5',
        overflow: 'auto'
    },
    messageBox: {

        margin: '5px'
    },
    inputBox: {
        backgroundColor: 'white'
    },                                                                                                 
    box: {
        padding: theme.spacing(3),
        color: 'black',
    },
    avatarSize: {
        width: theme.spacing(9),
        height: theme.spacing(9)
    },
    input: {
        width: '25vw'
    }
}));
const ChatBox = ({ activeUser }) => {
    const [chats, setChats] = useState([]);
    const [message, setMessage] = useState('');
    const currentChat = useSelector((state) => state.chat.currentChat);
    const chatBox = useRef(null);
    useEffect(() => {
        const scroll =
            chatBox.current.scrollHeight -
            chatBox.current.clientHeight;
        chatBox.current.scrollTo(0, scroll);
    }, [chats]);
    const fillChatBox = () => {
        const chatsList = [];
        for (const chat of chats) {
            const style = chat.from === activeUser._id ? 'rtl' : 'ltr';
            chatsList.push(
                <Grid dir={style} key={chat.id} item>
                    <Tooltip title={chat.date} placement='right'>
                        <Chip
                            className={classes.messageBox}
                            
                            label={chat.content}
                        />
                    </Tooltip>
                </Grid>
            );
        }
        return chatsList;
    }
    const keyPress = e => {
        if (e.keyCode === 13) {
            console.log('value', e.target.value);
            setChats([
                ...chats,
                {
                    content: e.target.value,
                    id: new Date().getTime(),
                    date: new Date().toLocaleString()
                }
            ]);
            setMessage('');
        }
    }
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <Grid container>
                <Grid container item xs={12} spacing={3}>
                    <React.Fragment>
                        <Grid item xs={12}>
                            <Paper className={clsx(classes.box, classes.header)}>
                                <Typography variant="h6">{currentChat.userName}</Typography>
                            </Paper>
                        </Grid>
                    </React.Fragment>
                </Grid>
                <Grid container item xs={12} spacing={3}>
                    <React.Fragment>
                        <Grid container direction='column' item xs={12}>
                            <Paper elevation={0} ref={chatBox} className={clsx(classes.box, classes.chatBox)}>
                                {fillChatBox()}
                            </Paper>
                        </Grid>
                    </React.Fragment>
                </Grid>
                <Grid container item xs={12} spacing={3}>
                    <React.Fragment>
                        <Grid item xs={12}>
                            <Paper elevation={0} className={clsx(classes.box, classes.inputBox)}>
                                <Input
                                    value={message}
                                    fullWidth
                                    id="input-with-icon-adornment"
                                    onKeyDown={keyPress}
                                    onChange={
                                        e => setMessage(e.target.value)
                                    }
                                    startAdornment={
                                        <InputAdornment position='start'>
                                            <Send />
                                        </InputAdornment>
                                    }
                                />
                            </Paper>
                        </Grid>
                    </React.Fragment>
                </Grid>
            </Grid>
        </div>
    );
};


export default ChatBox;