import { makeStyles } from "@material-ui/core/styles";

export default makeStyles(({ breakpoints: BP }) => ({
  formContainer: {
    display: "flex",
    flexDirection: "column",
    margin: "15px auto",
    padding: "0 15px",
    gap: 8,
  },

  inp: {
    width: "200px",
    margin: "10px 0",
  },
}));
