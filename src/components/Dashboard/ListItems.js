import React from 'react';
import { useDispatch } from 'react-redux';
import { 
    ListItem, ListItemIcon, ListItemText,
    Badge
} from '@material-ui/core';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ChatIcon from '@material-ui/icons/Chat';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import ViewStreamIcon from '@material-ui/icons/ViewStream';
import { changeComponent } from '../../actions/dashboardActions';

const ListItems = () => {
    const dispatch = useDispatch();
    const click = ({ currentTarget: { title } }) => {
        dispatch(
            changeComponent(title)
        );
    }
    return (
        <div>
            <ListItem button title='Dashboard' onClick={click}>
                <ListItemIcon>
                    <DashboardIcon />
                </ListItemIcon>
                <ListItemText primary="Dashboard" />
            </ListItem>
            <ListItem button title='Chat' onClick={click}>
                <ListItemIcon>
                    <Badge badgeContent={1} color="primary">
                        <ChatIcon />
                    </Badge>
                </ListItemIcon>
                <ListItemText primary="Chat" />
            </ListItem>
            <ListItem button title='Boards' onClick={click}>
                <ListItemIcon>
                    <ViewStreamIcon />
                </ListItemIcon>
                <ListItemText primary="Boards" />
            </ListItem>
            <ListItem button title='Profile' onClick={click}>
                <ListItemIcon>
                    <AccountBoxIcon />
                </ListItemIcon>
                <ListItemText primary="Profile" />
            </ListItem>
        </div>
    )
}

export default ListItems;