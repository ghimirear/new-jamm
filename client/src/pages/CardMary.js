import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
//import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
//import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import mary from "../assets/mary.gif"
import "./allpages.css";

const useStyles = makeStyles({
    root: {
        maxWidth: 260,
    },
    media: {
        height: 275,
    },
    pos: {
        marginTop: 250,
    }
});

export default function CardMary() {
    const classes = useStyles();

    return (
        <Card className={classes.root}>
            <CardActionArea>
                <CardMedia
                    className={classes.media}
                    image={mary}
                    title="Mary Nash"
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        MARY
          </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        <a href="https://github.com/mcn4c"><i class="fab fa-github fa-3x" style={{ color: "black" }}></i></a>
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