import React, {useState} from 'react';
import {KeyboardDatePicker} from '@material-ui/pickers';

export default function DateSetter(props) {
    return (
        <div>
        <KeyboardDatePicker onChange={props.setStartDate} value={props.startDate}/>
        <KeyboardDatePicker onChange={props.setEndDate} value={props.endDate}/>
        </div>
    )
}