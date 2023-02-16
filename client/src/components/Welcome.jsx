import * as React from "react";
import {useState} from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import {useNavigate} from "react-router-dom";
import createRoom from "../utils/createRoom";
import joinRoom from "../utils/joinRoom";

export default function WelcomePage() {
  const [value, setValue] = useState("");
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  return (
    <Grid container component="main" sx={{height: "100vh"}}>
      <CssBaseline />
      <Grid
        item
        xs={false}
        sm={4}
        md={7}
        sx={{
          backgroundImage:
            "url(https://images.unsplash.com/photo-1614741118887-7a4ee193a5fa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1887&q=80)",
          backgroundRepeat: "no-repeat",
          backgroundColor: (t) =>
            t.palette.mode === "light"
              ? t.palette.grey[50]
              : t.palette.grey[900],
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <Grid
        item
        xs={12}
        sm={8}
        md={5}
        component={Paper}
        elevation={6}
        square
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            my: 8,
            mx: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography component="h1" variant="h5">
            CodeTalk
          </Typography>

          <Box
            display={"flex"}
            flexDirection={"column"}
            alignItems={"center"}
            justifyContent={"center"}
          >
            <p align={"center"}>
              A collaborative code editor to make coding and discussions more
              fun!
            </p>
          </Box>

          <Box component="form" noValidate sx={{mt: 1}}>
            <TextField
              margin="normal"
              required
              fullWidth
              error={error}
              helperText={error ? "Room id does not exist" : ""}
              value={value}
              onChange={(e) => {
                setValue(e.target.value);
                setError(false);
              }}
              id="roomid"
              label="Enter Room ID"
              name="roomid"
              autoFocus
            />
            <Button
              onClick={() => {
                joinRoom(navigate, value, setError);
              }}
              fullWidth
              variant="contained"
              sx={{mt: 3, mb: 2}}
            >
              Join a Room
            </Button>

            <Box
              display={"flex"}
              flexDirection={"column"}
              alignItems={"center"}
              justifyContent={"center"}
            >
              <p align={"center"}>
                <Typography component="h1" variant="h5" fontWeight={"bold"}>
                  OR
                </Typography>
              </p>
            </Box>

            <Button
              onClick={() => {
                createRoom(navigate);
              }}
              fullWidth
              variant="contained"
              sx={{mt: 3, mb: 2}}
            >
              Create a Room
            </Button>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
}
