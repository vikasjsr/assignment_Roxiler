import * as React from "react";
import { useState } from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { monthsName } from "./Months";

export default function BasicSelect({ month, handleChange }) {
  return (
    <Box sx={{ minWidth: 150 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Select Month</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          label="Month"
          value={month}
          onChange={handleChange}
        >
          {monthsName.map((mon, index) => {
            return (
              <MenuItem key={index} value={mon}>
                {mon}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
    </Box>
  );
}
