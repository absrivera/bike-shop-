import React from 'react';
import { Col } from 'reactstrap'
import ProductCard from './productCard'

const ProductList = (props) => {
    return (
        <React.Fragment>
            {
                props.list.map((product, index) => {
                    return (
                        <Col xs="6" sm="4" key={"_key"+index}>
                            <ProductCard info={product} onClick={props.onClick} />
                        </Col>
                    )
                })
            }
        </React.Fragment>
    )
}

export default ProductList