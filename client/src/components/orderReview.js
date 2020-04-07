import React from 'react';
import { gql } from 'apollo-boost'
import { Container, Row, Col } from 'reactstrap'
import { useQuery } from '@apollo/react-hooks'
import {
  Card, CardBody,
  CardTitle, CardSubtitle,
} from 'reactstrap';

const OrderReview = (props) => {

  const order_id = parseInt(props.id)
  const customer_id = parseInt(props.customerId)

  const GET_ORDER_INFO = gql`
    query
        getOrderItems($order_id: Int!){
          getOrderItems(order_id: $order_id){
            order_id
            product{
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
        }
    
    `

  const GET_CUSTOMER = gql`
  query
    getCustomer($customer_id: Int!){
      getCustomer(customer_id: $customer_id){
        first_name
        last_name
        phone
        email
        street
        city
        state
        zip_code
      }
    }
  `

  const { loading: loadingCustomer, error: errorCustomer, data: dataCustomer } = useQuery(GET_CUSTOMER, { variables: { customer_id } })
  const { loading, error, data } = useQuery(GET_ORDER_INFO, { variables: { order_id } })
  if (errorCustomer) return <p>{errorCustomer.message}</p>
  if (loadingCustomer) return <p>Loading....</p>

  if (error) return <p>{error.message}</p>
  if (loading) return <p>Loading....</p>

  return (
    <Container>
      <Row>
        <h4>Order Review</h4>
      </Row>
      <Row>
        <Col>
          <p>Order Id: {order_id}</p>
        </Col>
      </Row>
      <Row>
        <h6>Customer Information</h6>
      </Row>
      <Row>

        {Object.entries(dataCustomer.getCustomer).map((value, index) => {
          if (index !== 8) {
            return (
              <Col xs="6" sm="4">
                <p>{value[0][0].toUpperCase() + value[0].slice(1)}: {value[1]}</p>
              </Col>
            )
          }
        })
        }

      </Row>
      <Row>
        <h6>Order Items</h6>
      </Row>
      <Row>
        {
          data.getOrderItems.map((item, index) => {
            let i = Object.values(item)
            return (
              <Col xs="6" sm="4">
                <Card>
                  <CardBody>
                    <CardTitle><h6>{i[1].product_name}</h6></CardTitle>
                    {/* <CardSubtitle>Brand: {i[1].productBrand.brand_name}</CardSubtitle>
                    <CardSubtitle>Category: {i[1].productCategory.category_name}</CardSubtitle>
                    <CardSubtitle>Model Year: {i[1].model_year}</CardSubtitle> */}
                    <CardSubtitle>Price: ${i[1].list_price}</CardSubtitle><br />
                  </CardBody>
                </Card>
              </Col>
            )
          })
        }
      </Row>

    </Container>
  )
}

export default OrderReview