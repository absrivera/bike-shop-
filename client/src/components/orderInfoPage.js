import React from 'react';
import { Container, Row, Col} from 'reactstrap'
import CustomerForm from './customerForm'

const Order = (props) => {

    return (
        <Container>
            <Row>
                <Col>
                    <h5> Welcome!</h5><br />
                    <p>Enter your order information</p>
                </Col>
            </Row>
            <Row>
                <CustomerForm form={props.form} onChange={props.onChange}></CustomerForm>
            </Row>
            
        </Container>
    )
}

export default Order