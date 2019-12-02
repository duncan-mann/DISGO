import React from "react";
import { KeyboardDatePicker } from "@material-ui/pickers";

export default function DateSetter(props) {
  return (
    <div>
      <KeyboardDatePicker
        onChange={props.setStartDate}
        value={props.startDate}
        variant='inline'
        disableToolbar
      />
      <KeyboardDatePicker
        onChange={props.setEndDate}
        value={props.endDate}
        variant='inline'
        disableToolbar
      />
    </div>
  );
}
