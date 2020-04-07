const { gql } = require('apollo-server')

const typeDefs = gql`
    type Order{
        order_id: ID!
        customer_id: Int!
        customer: Customer
        orderItems: OrderItems
    }

    type Customer {
        customer_id: ID!
        first_name: String!
        last_name: String!
        phone: String
        email: String!
        street: String!
        city: String!
        state: String!
        zip_code: String!
    }

    type OrderItems { 
        product_id: Int
        order_id: Int!
        product: Product
        customer: Customer
    }

    type Product {
        product_id: ID!
        product_name: String!
        brand_id: Int
        category_id: Int
        model_year: Int
        list_price: Float!
        productBrand: ProductBrand
        productCategory: ProductCategory
    }

    type ProductCategory{
        category_id: ID!
        category_name: String!
    }

    type ProductBrand{
        brand_id: ID!
        brand_name: String!
    }

    type Query{
        getAllOrders: [Order]
        getOrder(order_id: Int!): Order
        getOrderItems(order_id: Int!): [OrderItems]
        getCustomer(customer_id: Int!): Customer
        getAllCustomers: [Customer]!
        getAllProducts: [Product]
        getCartInfo(cart_items: [String]): [Product]
        getProduct(product_id: ID!): Product
    }

    type Mutation {
        createOrder(
            customer_id: Int!
        ): Order!

        cancelOrder(orderId: ID!): String!
        
        createProduct( 
            product_name: String!
            brand_id: Int!
            category_id: Int!
            model_year: Int!
            list_price: Float!
        ): Product!

        createCustomer(
            first_name: String!
            last_name: String!
            phone: String
            email: String!
            street: String
            city: String
            state: String
            zip_code: String
        ): Customer!

        addProductCategory(
            category_name: String!
        ): ProductCategory!
        
        addProductBrand(
            brand_name: String!
        ): ProductBrand!

        setOrderItems(
            order_id: Int!
            product_id: Int!
        ): OrderItems
    }
    
`

module.exports = typeDefs;
