import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Select from "./Select";
import editorLanguages from '../utils/editorlanguage';
import editorThemes from '../utils/editortheme';
import editorFonts from '../utils/editorfont';
import submitCode from "../utils/submitCode";

const Settings = ({theme, setTheme, language, setLanguage, fontSize, setFontSize, code, input, setOutput}) => {
  return (
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

      <Button variant="contained">Save Code</Button>
      <Button variant="contained" onClick={() => {submitCode(code, input, setOutput)}}>Run Code</Button>
    </Stack>
  );
};

export default Settings;
