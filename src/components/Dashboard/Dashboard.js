import React, { useEffect } from 'react';
import { makeStyles, createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { 
    CssBaseline,
    Container,
    Grid, Paper
} from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux';
import { isLoggedIn } from '../../actions/userActions';
import Cookies from 'universal-cookie';
import _ from 'lodash';
import TopBar from './TopBar';
import Chat from '../Chat/Chat';
import Board from '../Board/Board';
import Profile from '../Profile/Profile';
import socket from '../../socket';

const Menus = {
    Chat: <Chat />,
    Boards: <Board />,
    Profile: <Profile />
};

const theme = createMuiTheme({
    palette: {
        type: "light"
    }
});

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    toolbar: {
        paddingRight: 24, // keep right padding when drawer closed
    },
    toolbarIcon: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: '0 8px',
        ...theme.mixins.toolbar,
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        backgroundColor: theme.palette.info.main
    },
    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginRight: 36,
    },
    menuButtonHidden: {
        display: 'none',
    },
    title: {
        flexGrow: 1,
    },
    drawerPaper: {
        position: 'relative',
        whiteSpace: 'nowrap',
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerPaperClose: {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing(9),
        },
    },
    appBarSpacer: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        height: '100vh',
        overflow: 'auto',
    },
    container: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),
    },
    paper: {
        padding: theme.spacing(2),
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column',
    },
    fixedHeight: {
        height: 240,
    },
    colorLink: {
        color: theme.palette.info.main
    }
}));


function Dashboard({ history }) {
    const dispatch = useDispatch();
    const { activeUser } = useSelector(state => state.user);
    const { currentComponent } = useSelector(state => state.dashboard);
    const cookies = new Cookies();
    const classes = useStyles();
    useEffect(() => {
        dispatch(
            isLoggedIn(cookies.get('Authorization'), (input) => {
                if (!input) {
                    history.push('/');
                }
            })
        );
    }, []);
    useEffect(() => {
        if (!_.isEmpty(activeUser)) {
            socket.emit('connected', activeUser._id);
        }
    }, [activeUser]);
    return (
        <ThemeProvider theme={theme}>
            <div className={classes.root}>
                <CssBaseline />
                    <TopBar />
                <main className={classes.content}>
                    <div className={classes.appBarSpacer} />
                    <Container maxWidth="lg" className={classes.container}>
                            <Grid container spacing={3}>
                                <Grid item xs={12}>
                                    <Paper className={classes.paper}>
                                        {Menus[currentComponent]}
                                    </Paper>
                                </Grid>
                            </Grid>
                    </Container>
                </main>
            </div>
        </ThemeProvider>
    );
}

export default Dashboard;