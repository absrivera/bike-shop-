import React from 'react'
import { gql } from 'apollo-boost'
import { useQuery } from '@apollo/react-hooks'
import { Col, Row, Button } from 'reactstrap'
const Cart = (props) => {

    const GET_CART_INFO = gql`
    query
        getCartInfo($cart_items: [String]){
            getCartInfo(cart_items: $cart_items){
                product_id
                product_name
                model_year
                list_price
                productBrand{
                    brand_name
                }
                productCategory{
                    category_name
                }
              }
        }
    `

    const cart_items = props.items
    const { loading, error, data } = useQuery(GET_CART_INFO, { variables: { cart_items } })
    if (error) return <p>{error.message}</p>
    if (loading) return <p>Loading....</p>
    let total = 0
    const info = data.getCartInfo
    {
        if (props.isEmpty) {
            return <p></p>
        }
        return (
            <React.Fragment>
                {
                    info.map((item, index) => {
                        total += item.list_price
                        return (
                            <Row key={"_key"+item.product_name}>
                                <Col >
                                    <h6>Item {index + 1}</h6>
                                    <p>Product: {item.product_name}</p>
                                    <p>Price: ${item.list_price}</p>
                                    <Button size="sm" outline color="danger" onClick={props.onClick} value={item.product_id}>Remove</Button>
                                    <br/><br/>
                                </Col>
                                <br/>
                            </Row>
                            
                        )
                    })
                }
                <br/>
                <Row>
                    <Col>
                        <h6>Order Total: ${total.toFixed(2)}</h6>
                    </Col>
                </Row>
            </React.Fragment>
        )

    }
}

export default Cart