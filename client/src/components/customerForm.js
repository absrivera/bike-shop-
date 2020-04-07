import React from 'react';
import { Col } from 'reactstrap'
import FormField from './formField'

const CustomerForm = (props) => {

    return (
        Object.keys(props.form).map((field, index) => {
            if (index = 3) {
                return (
                    <Col xs="6" key={'key_' + field}>
                        <FormField title={field} onChange={props.onChange}></FormField>
                    </Col>
                )
            } else {
                return (
                    <React.Fragment>
                        <br />
                        <Col xs="6" key={'key_' + field}>
                            <FormField title={field} onChange={props.onChange}></FormField>
                        </Col>
                    </React.Fragment>
                )
            }
        })
    )
}

export default CustomerForm