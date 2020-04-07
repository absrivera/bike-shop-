import React from 'react'
import { Container, Row, Col } from 'reactstrap'
import { gql } from 'apollo-boost'
import { useQuery } from '@apollo/react-hooks'
import ProductList from './productList'
import Cart from './cart'

const ProductPage = (props) => {
    const GET_ALL_PRODUCTS = gql`
    query
        getAllProducts{
            getAllProducts{
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

    const { loading, error, data } = useQuery(GET_ALL_PRODUCTS)
    if (error) return <p>{error.message}</p>
    if (loading) return <p>Loading....</p>

    return (
        <Container>
            <Row>
                <Col>
                    <h5>Products</h5><br />
                    <p>Select your bikes!</p>
                </Col>
            </Row>
            <Row>
                <ProductList list={data.getAllProducts} onClick={props.onClick}></ProductList>
            </Row><br />
            <Row>
                <Col>
                    <h5>Cart</h5>
                </Col>
            </Row>
                <Cart items={props.cart} isEmpty={props.isEmpty} onClick={props.onDelete}></Cart>
        </Container>
    )
}

export default ProductPage