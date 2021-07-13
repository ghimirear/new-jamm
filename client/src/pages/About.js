import React from "react";
import CardArjun from "./CardArjun";
import CardMenuka from "./CardMenuka";
import CardMary from "./CardMary";
import CardJenner from "./CardJenner";
import { Grid } from "@material-ui/core";
// import Paper from "@material-ui/core/Paper";


const About = () => {
    return (
        <Grid
            container
            spacing={3}
            direction="row"
            // alignItems="center"
            justify="center"
            alignItems="stretch"
            style={{
                minHeight: "45vh",
                marginTop: "50px",

            }}>
            <Grid item sm={2} >
                <CardJenner />
            </Grid>
            <Grid item sm={2} >
                <CardArjun />
            </Grid>
            <Grid item sm={2}>
                <CardMary />
            </Grid>
            <Grid item sm={2}>
                <CardMenuka />
            </Grid>
        </Grid>

    );
};
export default About;