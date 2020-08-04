import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import ChatBox from './ChatBox';
import ChatsList from './ChatsList';
import {
    Container, Grid, Input, InputAdornment,
    IconButton, Modal, TextField, Button
} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import AddIcon from '@material-ui/icons/Add';
import { getChats, addChat } from '../../actions/chatActions';
import Cookies from 'universal-cookie';

const useStyles = makeStyles((theme) => ({
    root: {
        padding: '5px'
    },
    paper: {
        textAlign: 'center',
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%,-50%)',
        width: 400,
        backgroundColor: theme.palette.background.paper,
        borderRadius: '2%',
        outline: 'none',
        overflow: 'hidden',
        padding: theme.spacing(2, 4, 3),
    },
    addBtn: {
        backgroundColor: theme.palette.info.main
    },
    searchField: {
        marginBottom: '10px'
    }
}));

const Chat = () => {
    const dispatch = useDispatch();
    const cookies = new Cookies();
    const [search, setSearch] = useState('');
    const [open, setOpen] = useState(false);
    const [addInput, setAddInput] = useState('');
    const classes = useStyles();
    const searchBar = ({ target: { value } }) => {
        setSearch(value);
    };
    const openModal = () => {
        setOpen(true);
    };
    const closeModal = () => {
        setOpen(false);
    }
    const addChatButton = () => {
        dispatch(
            addChat(addInput, cookies.get('Authorization'))
        );
    }
    useEffect(() => {
        dispatch(
            getChats(cookies.get('Authorization'))
        );
    }, []);
    const body = (
        <div className={classes.paper}>
            <h2 id="simple-modal-title">{'Search for user:'}</h2>
            <TextField onChange={(e) => setAddInput(e.target.value)} className={classes.searchField} fullWidth id="outlined-basic" label="User" variant="outlined" />
            <Button onClick={addChatButton} className={classes.addBtn} variant="contained" color="primary">Add</Button>
        </div>
    );
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
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        onClick={openModal}
                                        aria-label="toggle password visibility"
                                    >
                                        <AddIcon />
                                    </IconButton>
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
            <Modal
                open={open}
                onClose={closeModal}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
            >
                {body}
            </Modal>
        </Container>
    );
};



export default Chat;