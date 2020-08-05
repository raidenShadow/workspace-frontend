import React from 'react';
import { Grid, TextField, Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.info.main,
    },
    form: {
        marginTop: theme.spacing(4),
        width: '50%' // Fix IE 11 issue.
    },
    submit: {
        marginBottom: theme.spacing(4),
        background: 'linear-gradient(90deg, rgba(139,139,139,1) 0%, rgba(139,139,139,1) 100%)'
    },
    colorLink: {
        color: theme.palette.info.main
    }
}));
const Profile = () => {
    const classes = useStyles();
    const applyChanges = (e) => {
        e.preventDefault();
        console.log("test");
    }
    return (
        <Grid container justify="center" xs={12} spacing={2}>
            <form className={classes.form}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField
                            autoComplete="userName"
                            name="userName"
                            variant="outlined"
                            fullWidth
                            id="userName"
                            label="Username"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            variant="outlined"
                            autoComplete="email"
                            fullWidth
                            id="email"
                            label="Email"
                            name="email"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Button
                            type='submit'
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                            onClick={applyChanges}
                        >
                            Submit
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </Grid>
    );
};


export default Profile;