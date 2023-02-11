import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

export default function ButtonAppBar() {
  return (
    <Box sx={{flexGrow: 1}}>
      <AppBar position="static" style={{background: "#2E3B55"}}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
            CodeTalk
          </Typography>
          <Button variant="contained" style={{marginRight: '10px'}}>Create a Room</Button>
          <Button variant="contained">Join a Room</Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
