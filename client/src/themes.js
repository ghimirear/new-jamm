import Purple from "./images/purple.png";
import Blue from "./images/blue.jpg";
import Mosaic from "./images/mosaic.jpg";
import Swirl from "./images/swirl.jpg"
import Half from "./images/half.jpg";
import Books from "./images/books.jpeg";


const themes = {

    Books: {
        'background-color': '',
        'background-image': `url(${Books})`,

        'color': '#000',
        'font-family': "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif"

    },
    // purple: {
    //   'background-color': '#8c6e76',
    //   'background-image': 'none',

    //   'color': 'Navy',
    //   'font-family': "'Courier New', Courier, monospace"
    // },
    // pink: {
    //   'background-color': '#c0888e',
    //   'background-image': 'none',

    //   'color': 'white',
    //   'font-family': "'Courier New', Courier, monospace"
    // },
    // green: {
    //   'background-color': '#6b9375',
    //   'background-image': 'none',

    //   'color': '#a50b0b',
    //   'font-family': "'Courier New', Courier, monospace"
    // },
    // yellow: {
    //   'background-color': '#e9ee54',
    //   'background-image': 'none',

    //   'color': '#a50b0b',
    //   'font-family': "'Courier New', Courier, monospace"
    // },
    // blue: {
    //   'background-color': '#6890c3',
    //   'background-image': 'none',

    //   'color': '#a50b0b',
    //   'font-family': "'Courier New', Courier, monospace"
    // },
    // red: {
    //   'background-color': '#dc6868',
    //   'background-image': 'none',

    //   'color': '#a50b0b',
    //   'font-family': "'Courier New', Courier, monospace"
    // },
    // black: {
    //   'background-color': '#000',
    //   'background-image': 'none',

    //   'color': 'black',
    // },

    // maroon: {
    //   'background-color': '#763733',
    //   'background-image': 'none',

    //   'color': 'violet',
    //   'font-family': 'Verdana, Geneva, Tahoma, sans-serif'
    // },
    // violet: {
    //   'background-color': '#8b7390',
    //   'background-image': 'none',

    //   'color': 'violet',
    //   'font-family': 'Verdana, Geneva, Tahoma, sans-serif'
    // }, 


    Books: {
        'background-image': `url(${Books})`,
        "color": "navy",
        'font-family': "'Courier New', Courier, monospace"

    },

    swirl: {
        'background-image': `url(${Swirl})`,
        "color": "navy",
        'font-family': "'Courier New', Courier, monospace"

    },

    // Watercolor: {
    //     'background-image': `url(${Watercolor})`,
    //     "color": "navy",
    //     'font-family': "'Courier New', Courier, monospace"
    // },

    half: {
        'background-image': `url(${Half})`,
        "background-size": "cover",
        "color": "violet",
        'font-family': "'Courier New', Courier, monospace",

    },
    blue: {
        'background-image': `url(${Blue})`,
        "color": "blue",
        'font-family': "'Courier New', Courier, monospace"

    },
    mosaic: {
        'background-image': `url(${Mosaic})`,
        "color": "maroon",
        'font-family': "'Courier New', Courier, monospace"

    },



};

export default themes;

