import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
// import Button from '@material-ui/core/Button';
import Typography from "@material-ui/core/Typography";
import arjun from "../assets/arjun.gif";
import "./allpages.css";

const useStyles = makeStyles({
  root: {
    maxWidth: 260,
  },
  media: {
    height: 275,
  },
  // pos: {
  //     marginTop: 250,
  // }
});

export default function CardArjun() {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia className={classes.media} image={arjun} title="Arjun" />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            ARJUN
          </Typography>
          <Typography variant="body2" color="textInfo" component="p">
            <a href="https://github.com/ghimirear" target="_blank"><i class="fab fa-github fa-3x " style={{ color: "black" }}>
            </i></a>
          </Typography>
        </CardContent>
      </CardActionArea>

      {/* <CardActions>
                <Button size="small" color="primary">
                    Share
        </Button>

            </CardActions> */}
    </Card>
  );
}
