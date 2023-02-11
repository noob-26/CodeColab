import * as React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

export default function SelectSmall({options, prompt}) {
  const [value, setValue] = React.useState("");

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <FormControl sx={{m: 1, minWidth: 120}} size="small">
      <InputLabel id="demo-select-small">{prompt}</InputLabel>
      <Select
        labelId="demo-select-small"
        id="demo-select-small"
        value={value}
        label={prompt}
        onChange={handleChange}
      >
        <MenuItem value="">
          <em></em>
        </MenuItem>
        {/* <MenuItem value={10}>Ten</MenuItem>
        <MenuItem value={20}>Twenty</MenuItem>
        <MenuItem value={30}>Thirty</MenuItem> */}

        {options.map((ele) => (
          <MenuItem value={ele}>{ele.toString()}</MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
