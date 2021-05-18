import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';
import jennerm from "../assets/jennerm.gif";
import "./allpages.css";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(0),
    marginLeft:90,
    marginTop:250,
    marginRight:30,
    maxWidth: 500,
    maxHeight:570,
  },
  image: {
    width: 385,
    height: 350,
    marginTop:40,
    marginLeft:60,
    marginRight:40,
    alignContent:"center",
  },
  img: {
    marginTop:90,
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
  },
  resize:{
    fontSize:40,
    marginLeft:90,
    fontFamily:'Roboto',
  },
}));
export default function ComplexGrid() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <Grid container spacing={2}>
          <Grid item>
            <ButtonBase className={classes.image}>
              <img className={classes.img} alt="complex" src={jennerm} />
            </ButtonBase>
          </Grid>
          <Grid item sm={12} md={6} lg={4} sm container>
            <Grid item xs container direction="column" spacing={2}>
              <Grid item xs align="center">
                <Typography style={{ padding: 75 }} className={classes.resize} align ='center'>
                 JENNER
                </Typography>
              </Grid>
              <Grid item>
              </Grid>
            </Grid>
            <Grid item>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
}