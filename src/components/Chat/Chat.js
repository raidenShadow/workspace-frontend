import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import ChatBox from './ChatBox';
import ChatsList from './ChatsList';
import {
    Container, Grid, Input, InputAdornment, ListItem,
    Avatar, ListItemAvatar, ListItemText, Typography
} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import sample from '../../assets/thicc.png';
import { updateChatList } from '../../actions/chatActions';

const useStyles = makeStyles((theme) => ({
    root: {
        padding: '5px'
    }
}));

const Chat = () => {
    const dispatch = useDispatch();
    const [search, setSearch] = useState('');
    const classes = useStyles();
    const searchBar = ({ target: { value } }) => {
        setSearch(value);
    }
    useEffect(() => {
        dispatch(
            updateChatList([
                {
                    userName: 'Alireza Kiani',
                    avatar: sample,
                    lastMessage: 'Hello this is the last message'
                },
                {
                    userName: 'Kiarash',
                    avatar: 'test',
                    lastMessage: 'Che Khabar? Hava Khoobe?'
                }
            ])
        );
    }, []);
    return(
        <Container className={classes.root}>
            <Grid container spacing={3}>
                <Grid container direction='column' item xs={3}>
                    <Grid item>
                        <Input
                            fullWidth
                            onChange={searchBar}
                            id="input-with-icon-adornment"
                            startAdornment={
                                <InputAdornment position="start">
                                    <SearchIcon />
                                </InputAdornment>
                            }
                        />
                    </Grid>
                    <ChatsList filter={search} />    
                </Grid>
                <Grid item xs={9} spacing={1}>
                    <ChatBox />
                </Grid>           
            </Grid>
        </Container>
    );
};



export default Chat;