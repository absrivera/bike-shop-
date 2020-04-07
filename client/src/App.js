import React, { useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom'
import { gql } from 'apollo-boost'
import { useMutation } from '@apollo/react-hooks'
import { Navbar, NavbarBrand, Container, Button } from 'reactstrap';

import OrderPage from './components/orderInfoPage'
import OrderReview from './components/orderReview'
import ProductPage from './components/productPage'


const App = () => {

  let [customerId, setId] = useState()
  let [orderId, setOrder] = useState()
  let [items, setItem] = useState([])
  let [empty, setVal] = useState(true)
  let [submited, setSubmit] = useState(false)

  const CREATE_CUSTOMER = gql`
  mutation
	  createCustomer(
      $first_name: String!
      $last_name: String!
      $phone: String!
      $email: String!
      $street: String!
      $city: String!
      $state: String!
      $zip_code: String!
    ){
      createCustomer(
        first_name: $first_name
        last_name: $last_name
        phone: $phone
        email: $email
        street: $street
        city: $city
        state: $state
        zip_code: $zip_code
      ){
          customer_id
      }
  }
`
  const CREATE_ORDER = gql`
  mutation createOrder($customer_id: Int!){
    createOrder(customer_id: $customer_id){
      order_id
    }
  }
`
  const ADD_ORDER_ITEM = gql`
  mutation setOrderItems(
    $order_id: Int!
    $product_id: Int!
  ){
    setOrderItems(
      order_id: $order_id,
      product_id: $product_id
    ){
      order_id
      product_id
    }
  }
`

  let [customer, updateCustomer] = useState({
    first_name: '',
    last_name: '',
    phone: '',
    email: '',
    street: '',
    city: '',
    state: '',
    zip_code: ''
  })

  //event handler for order item selection
  const handleClick = (e) => {
    e.preventDefault()
    const { value } = e.target
    setItem([
      ...items,
      value])

    if (empty) {
      setVal(false)
    }
  }

  //event handler for customer form input
  const handleChange = (e) => {
    const { name, value } = e.target
    updateCustomer({
      ...customer,
      [name]: value
    })
  }

  const handleDelete = (e) => {
    e.preventDefault()
    const { value } = e.target
    let array = [...items]
    let index = array.indexOf(value)
    if (index !== -1) {
      array.splice(index, 1)
      setItem([
        ...array
      ])
    } else {
      setVal(true)
    }
  }

  const [createCustomer] = useMutation(CREATE_CUSTOMER)
  const [createOrder] = useMutation(CREATE_ORDER)
  const [addOrderItem] = useMutation(ADD_ORDER_ITEM)

  //define total submit and do all at once
  const handleSubmit = async () => {
    const newCustomer = await createCustomer({
      variables: {
        first_name: customer.first_name,
        last_name: customer.last_name,
        phone: customer.phone,
        email: customer.email,
        street: customer.street,
        city: customer.city,
        state: customer.state,
        zip_code: customer.zip_code

      }
    })

    setId(newCustomer.data.createCustomer.customer_id)

    let newCustId = parseInt(newCustomer.data.createCustomer.customer_id)
    const newOrder = await createOrder({
      variables: {
        customer_id: newCustId
      }
    })

    setOrder(newOrder.data.createOrder.order_id)
    let newOrderId = parseInt(newOrder.data.createOrder.order_id)

    items.map(item => {
      let parsedId = parseInt(item)
      addOrderItem({
        variables: {
          order_id: newOrderId,
          product_id: parsedId
        }
      })
    })

    setSubmit(true)
  }

  return (
    <Container>
      <Router>
        <Navbar color="inverse" light expand="md">
          <NavbarBrand href="/"><h4>Bike Shop</h4></NavbarBrand>
        </Navbar>

        <OrderPage onChange={handleChange} form={customer}></OrderPage>
        <br /><br />

        <ProductPage onClick={handleClick} onDelete={handleDelete} cart={items} isEmpty={empty}></ProductPage>

        <br /><br />
        <Button onClick={handleSubmit} color="success">Finalize Order</Button>
        <br /><br /><br /><br />

        <hr />
        {
          submited ? <OrderReview id={orderId} customer={customer} customerId={customerId} items={items}></OrderReview> : null
        }
        <br />
        <br /><br /><br /><br />
      </Router>

    </Container>
  );
}

export default App;
