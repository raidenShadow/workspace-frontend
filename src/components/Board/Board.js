import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
    Card, CardActionArea, CardMedia, Grid, CardContent,
    Typography
} from '@material-ui/core';
import _ from 'lodash';
import { makeStyles } from '@material-ui/core/styles';
import { getBoards } from '../../actions/boardActions';
import Cookies from 'universal-cookie';
import sample from '../../assets/sample.jpg';


const useStyles = makeStyles((theme) => ({
    root: {
        padding: '5px'
    }
}));

const Board = () => {
    const classes = useStyles();
    const cookie = new Cookies();
    const dispatch = useDispatch();
    const { boards } = useSelector(state => state.board);
    useEffect(() => {
        dispatch(
            getBoards(cookie.get('Authorization'))
        );
    }, []);
    const renderBoards = () => {
        if (_.isEmpty(boards)) {
            return (
                <div>
                    <h3>Nothing to show</h3>
                </div>
            );
        }
        return boards.map(board => (
            <Grid item xs={3}>
                <Card className={classes.root}>
                    <CardActionArea>
                        <CardMedia
                            component="img"
                            alt={board.name}
                            height="140"
                            image={sample}
                            title={board.name}
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="h2">
                                {board.name}
                            </Typography>
                            <Typography variant="body2" color="textSecondary" component="p">
                                {board.name}
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                </Card>
            </Grid>
        ));
    }
    return (
        <Grid container xs={12} spacing={2}>
            {renderBoards()}
        </Grid>
    );
}

export default Board;