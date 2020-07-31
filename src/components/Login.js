import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import validator from 'validator';
import { 
    Avatar, Button, CssBaseline, TextField,
    FormControlLabel,Checkbox,Link,Paper,Grid,Typography
} from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { withStyles, makeStyles, ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import signupbg from '../assets/signupbg.jpg';
import Cookies from 'universal-cookie';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUser, isLoggedIn } from '../actions/userActions';

const useStyles = makeStyles((theme) => ({
    root: {
        height: '100vh'
    },
    image: {
        backgroundImage: `url(${signupbg})`,
        backgroundRepeat: 'no-repeat',
        backgroundColor:
            theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    },
    paper: {
        margin: theme.spacing(8, 4),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.info.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
        background: 'linear-gradient(90deg, rgba(139,139,139,1) 0%, rgba(139,139,139,1) 100%)'
    },
    colorLink: {
        color: theme.palette.info.main
    }
}));

const theme = createMuiTheme({
    palette: {
        type: "dark"
    }
});


const Login = ({ history }) => {
    const dispatch = useDispatch();
    const activeUser = useSelector((state) => state.user.activeUser);
    console.log(activeUser);
    const cookies = new Cookies();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
    useEffect(() => {
        dispatch(
            isLoggedIn(cookies.get('Authorization'), userData => {
                history.push({
                    pathname: '/dashboard',
                    state: { userData }
                });
            })
        );
    }, []);
    
    const onSubmit = e => {
        e.preventDefault();
        const body = {
            email,
            password  
        }

        dispatch(
            fetchUser(body, (token) => {
                cookies.set('Authorization', `Bearer ${token}`, {
                    path: '/'
                });
                history.push("/dashboard");
            })
        );
        
    }
    const classes = useStyles();
    return (
        <Grid container component="main" className={classes.root}>
            <CssBaseline />
            <Grid item xs={false} sm={4} md={7} className={classes.image} />
            <ThemeProvider theme={theme}>
                <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                    <div className={classes.paper}>
                        <Avatar className={classes.avatar}>
                            <LockOutlinedIcon />
                        </Avatar>
                        <Typography className={classes.whiteFont} component="h1" variant="h5">
                            Sign in
                    </Typography>
                        <form className={classes.form} noValidate>
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                autoFocus
                                onChange={
                                    (e) => {
                                        setEmail(e.target.value);
                                    }
                                }
                            />
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                onChange={
                                    (e) => {
                                        setPassword(e.target.value);
                                    }
                                }
                            />
                            <FormControlLabel
                                control={<Checkbox value="remember" color="" />}
                                label="Remember me"
                            />
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                className={classes.submit}
                                onClick={onSubmit}
                            >
                                Sign In
                            </Button>
                            <Grid container>
                                <Grid item xs>
                                    <Link className={classes.colorLink} href="#" variant="body2">
                                        Forgot password?
                                    </Link>
                                </Grid>
                                <Grid item>
                                    <Link className={classes.colorLink} href="/signup" variant="body2">
                                        {"Don't have an account? Sign Up"}
                                    </Link>
                                </Grid>
                            </Grid>
                        </form>
                    </div>
                    </Grid>
                    </ThemeProvider>
        </Grid>
    );
}

Login.propTypes = {
    fetchUser: PropTypes.func.isRequired
};

export default Login;