import React from 'react'
import {
    Card, CardImg, CardBody,
    CardTitle, CardSubtitle, Button
  } from 'reactstrap';
  
  const ProductCard = (props) => {

    return (
        <Card>
          <CardImg top width="100%" src="/bikeimg.png" alt="Card image cap" />
          <CardBody>
            <CardTitle><h6>{props.info.product_name}</h6></CardTitle>
            <CardSubtitle>Brand: {props.info.productBrand.brand_name}</CardSubtitle>
            <CardSubtitle>Category: {props.info.productCategory.category_name}</CardSubtitle>
            <CardSubtitle>Model Year: {props.info.model_year}</CardSubtitle>
            <CardSubtitle>Price: ${props.info.list_price}</CardSubtitle><br/>
            <Button value={props.info.product_id} onClick={props.onClick} size="sm" outline color="success" >Add To Cart</Button>
          </CardBody>
        </Card>
    );
  };
  
  export default ProductCard;