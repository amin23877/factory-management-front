import { makeStyles } from "@material-ui/core/styles";

export default makeStyles({
  inputContainer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },

  inp: {
    width: "100%",
    margin: "10px 2px",
  },

  singleInp: {
    width: "100%",
    padding: "10px 2px",
    "& button": { width: "100%", marginTop: "10px" },
  },
});
