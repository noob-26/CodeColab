import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Select from "./Select";
import editorLanguages from '../utils/editorlanguage';
import editorThemes from '../utils/editortheme';
import editorFonts from '../utils/editorfont';

const Settings = () => {
  return (
    <Stack
      spacing={5}
      display={"flex"}
      alignItems={"center"}
      direction="row"
      margin={"12px"}
      marginTop={"15px"}
    >
      <Select options={editorLanguages} prompt={'Language'} />
      <Select options={editorThemes} prompt={'Theme'}/>
      <Select options={editorFonts} prompt={'Font Size'}/>

      <Button variant="contained">Save Code</Button>
      <Button variant="contained">Run Code</Button>
    </Stack>
  );
};

export default Settings;
