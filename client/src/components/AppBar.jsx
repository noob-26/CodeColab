import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import {Link} from "react-router-dom";

export default function ButtonAppBar() {
  return (
    <Box sx={{flexGrow: 1}}>
      <AppBar position="static" style={{background: "#2E3B55"}}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
            <Link
              to="/"
              style={{
                color: "white",
                textDecoration: "none",
              }}
            >
              CodeColab
            </Link>
          </Typography>
          <Button variant="contained" style={{marginRight: "10px"}}>
            <Link
              to="/create-room"
              style={{
                color: "white",
                textDecoration: "none",
              }}
            >
              Create a Room
            </Link>
          </Button>
          <Button
            variant="contained"
            style={{color: "white", textDecoration: "none"}}
          >
            <Link
              to="/join-room"
              style={{
                color: "white",
                textDecoration: "none",
              }}
            >
              Join a Room
            </Link>
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
