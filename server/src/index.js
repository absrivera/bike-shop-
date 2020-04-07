const express = require('express')
const sequelize = require('./db/dbConfig')
const {ApolloServer} = require('apollo-server-express')
//const { createContext, EXPECTED_OPTIONS_KEY} = require('dataloader-sequelize')
const schema = require('./graphql/schema')
const app = express()
const port = 4000
const Customer = require('./db/models/customer')
const Product = require('./db/models/product')
const Order = require('./db/models/order')
const ProductCategory = require('./db/models/product_category')
const ProductBrand = require('./db/models/product_brand')
const OrderItems  = require('./db/models/order_items')
const resolvers = require('./graphql/resolvers')

//creates foreignkey on product with brand_id 
ProductBrand.hasMany(Product, {foreignKey: {name: 'brand_id', allowNull: false}, onDelete: 'CASCADE', onUpdate: 'CASCADE'});
Product.belongsTo(ProductBrand, {foreignKey: 'brand_id'})
//creates foreignkey on product with category_id
ProductCategory.hasMany(Product, {foreignKey: {name:'category_id', allowNull:false}, onDelete: 'CASCADE', onUpdate: 'CASCADE'});
Product.belongsTo(ProductCategory, {foreignKey: 'category_id'})

//creates composite foreignkey on orderItems through product_id and order_id
Product.hasMany(OrderItems, {foreignKey: {name: 'product_id', allowNull: false}, onDelete: 'CASCADE', onUpdate: 'CASCADE'})
OrderItems.belongsTo(Product, {foreignKey: 'product_id'})

Order.hasMany(OrderItems, {foreignKey: {name: 'order_id', allowNull: false}, onDelete: 'CASCADE', onUpdate: 'CASCADE'})
OrderItems.belongsTo(Order, {foreignKey: 'order_id'})

//create foreign key on order with customer_id
Customer.hasMany(Order, {foreignKey: {name: 'customer_id', allowNull: false}, onDelete: 'CASCADE', onUpdate: 'CASCADE'})
Order.belongsTo(Customer, {foreignKey: 'customer_id'})


const server = new ApolloServer({
    typeDefs: schema, 
    resolvers,
    context:  {Customer, Product, Order, ProductCategory, ProductBrand, OrderItems}   
})

server.applyMiddleware({ app })

app.get('/api/status', (req, res) => {
    res.send({ status: 'ok' })
})


//************************/
//{force: true}
sequelize.sync()
    .then(() => {
        app.listen(port, () => {
            console.log(`Apollo Server running on http://localhost:${port}/graphql`)
        })
    })
    .catch(error => {
        console.log(error)
    })

process.on('SIGTERM', () => {
    app.close(()=> {
        sequelize.end()
    });

    setTimeout(() => {
        console.log('shutting down automatically')
        process.exit(1)
    }, 30 * 1000)
})


