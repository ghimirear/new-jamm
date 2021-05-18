import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';
import mary from "../assets/mary.gif";
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(0),
    marginLeft:30,
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
     marginLeft:150,
    fontFamily:'Roboto',
  },
}));
export default function ComplexGrid() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <Grid container spacing={0}>
          <Grid item>
            <ButtonBase className={classes.image}>
              <img className={classes.img} alt="complex" src={mary} />
            </ButtonBase>
          </Grid>
          <Grid item s={12} md={6} lg={4} sm container>
            <Grid item xs container direction="column" spacing={0}>
              <Grid item xs>
                <Typography style={{ padding: 65 }} className={classes.resize} >
                 MARY
                </Typography>
                {/* <Typography variant="body2" gutterBottom>
                 Full Stack Devloper
                </Typography> */}
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