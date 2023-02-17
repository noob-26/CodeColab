import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Select from "./Select";
import editorLanguages from "../utils/editorlanguage";
import editorThemes from "../utils/editortheme";
import editorFonts from "../utils/editorfont";
import submitCode from "../utils/submitCode";
import {useQuery} from "react-query";
import Snackbar from "../components/Snackbar";
import {useState, useContext} from "react";
import {useParams, useLocation} from "react-router-dom";
import socketContext from "../utils/socketContext";
import saveCode from "../utils/saveCode";

const Settings = ({
  theme,
  setTheme,
  language,
  setLanguage,
  fontSize,
  setFontSize,
  code,
  input,
  setOutput,
}) => {
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState("");
  const [message, setMessage] = useState("");
  const socket = useContext(socketContext);
  const {id} = useParams();
  const [buttontext, setButtontext] = useState("Copy Button ID");

  const displaySnackbar = (open, status, message) => {
    setOpen(open);
    setStatus(status);
    setMessage(message);
  };

  const {isLoading, data, isError, refetch} = useQuery(
    "code-submit",
    () => {
      displaySnackbar(true, "success", "Executing code...");
      return submitCode(code, input, language);
    },
    {
      enabled: false,
      retry: 1,
      onError: (err) => {
        displaySnackbar(
          true,
          "error",
          "Something went wrong. Please try again!..."
        );
      },
      onSuccess: (data) => {
        displaySnackbar(true, "success", "Code executed successfully...");
        let val = "";
        val += data.data.output;
        setOutput(val);
        socket.emit("output-changed", {
          code: val,
          room: id,
        });
      },
    }
  );

  return (
    <>
      <Snackbar
        open={open}
        setOpen={setOpen}
        status={status}
        message={message}
      />
      <Stack
        spacing={5}
        display={"flex"}
        alignItems={"center"}
        direction="row"
        margin={"12px"}
        marginTop={"15px"}
      >
        <Select
          options={editorLanguages}
          prompt={"Language"}
          value={language}
          setValue={setLanguage}
        />
        <Select
          options={editorThemes}
          prompt={"Theme"}
          value={theme}
          setValue={setTheme}
        />
        <Select
          options={editorFonts}
          prompt={"Font Size"}
          value={fontSize}
          setValue={setFontSize}
        />

        <Button
          variant="contained"
          onClick={() => {
            saveCode(code, id);
          }}
        >
          Save Code
        </Button>
        <Button
          variant="contained"
          onClick={() => {
            if (!language) {
              alert("Please select a language");
              return;
            }
            refetch();
          }}
        >
          Run Code
        </Button>
        <Button
          variant="contained"
          onClick={async () => {
            await navigator.clipboard.writeText(id);
            setButtontext("Copied");
            setTimeout(() => {
              setButtontext("Copy Room ID");
            }, 500);
          }}
        >
          {buttontext}
        </Button>
      </Stack>
    </>
  );
};

export default Settings;
