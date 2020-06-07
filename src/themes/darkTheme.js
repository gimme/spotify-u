import { createMuiTheme } from "@material-ui/core/styles";
import purple from "@material-ui/core/colors/purple";
import green from "@material-ui/core/colors/green";

const darkTheme = createMuiTheme({
  palette: {
    type: "dark",
    background: {
      default: "#121212",
    },
    primary: purple,
    secondary: green,
  },
  status: {
    danger: "orange",
  },
});

export default darkTheme;
