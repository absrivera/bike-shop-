import React from 'react'
import {FormGroup, Label, Input} from 'reactstrap';

const FormField = (props) => {
    const heading = props.title[0].toUpperCase() + props.title.slice(1)
    return (
        <FormGroup>
            <Label for={props.title}>{heading}</Label>
            <Input type="text" name={props.title} id={props.title} placeholder={heading} onChange={props.onChange}/>
        </FormGroup>
    )
}

export default FormField