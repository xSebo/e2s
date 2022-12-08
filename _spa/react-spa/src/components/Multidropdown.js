import React, {useState} from "react";

import {
    Checkbox,
    FormControl,
    ListItemText,
    MenuItem, OutlinedInput,
    Select
} from "@mui/material";

//TAKEN FROM: https://codesandbox.io/s/givp5?file=/src/App.js
function Multidropdown(props) {
    const options = props.options

    const ITEM_HEIGHT = 48;
    const ITEM_PADDING_TOP = 8;
    const MenuProps = {
        PaperProps: {
            style: {
                maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
                width: 250
            }
        },
        getContentAnchorEl: null,
        anchorOrigin: {
            vertical: "bottom",
            horizontal: "center"
        },
        transformOrigin: {
            vertical: "top",
            horizontal: "center"
        },
        variant: "menu"
    };

    const [selected, setSelected] = useState([props.options[0]]);

    const handleChange = (event) => {
        const {
            target: { value },
        } = event;
        setSelected(
            // On autofill we get a stringified value.
            typeof value === 'string' ? value.split(',') : value,
        );
        props.handleChange(typeof value === 'string' ? value.split(',') : value);
    };

    return (
        <FormControl sx={{ m: 1, width: 300 }}>
            <Select
                labelId="demo-multiple-checkbox-label"
                id="demo-multiple-checkbox"
                multiple
                value={selected}
                onChange={handleChange}
                input={<OutlinedInput label="Tag" />}
                renderValue={(selected) => selected.join(', ')}
                MenuProps={MenuProps}
            >
                {options.map((option) => (
                    <MenuItem key={option} value={option}>
                        <Checkbox checked={selected.indexOf(option) > -1} />
                        <ListItemText primary={option} />
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
}

export default Multidropdown;
