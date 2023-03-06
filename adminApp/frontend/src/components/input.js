import { TextField } from '@mui/material';
import * as React from 'react';

const Input = (props)=>{
    return (
        <TextField id="outlined-basic" label={props.label} variant="outlined" type={props.type} onChange={props.onChange}/>
    )
}
export default Input;