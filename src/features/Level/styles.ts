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
    width: "300px",
    margin: "10px 0",
  },

  inp2: {
    width: "200px",
    height: "300px",
    margin: "10px 0",
  },
}));
