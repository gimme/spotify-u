import { createMuiTheme } from "@material-ui/core/styles";
import green from "@material-ui/core/colors/green";
import { lightBlue } from "@material-ui/core/colors";

let darkGrey = "#121212";
let mediumGrey = "#181818";
let lightGrey = "#282828";

const darkTheme = createMuiTheme({
  palette: {
    type: "dark",
    background: {
      default: mediumGrey,
    },
    primary: lightBlue,
    secondary: green,
    grey: {
      800: lightGrey,
      900: darkGrey,
    },
  },
});

export default darkTheme;
