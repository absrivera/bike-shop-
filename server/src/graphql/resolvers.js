const Sequelize = require('sequelize')
const Op = Sequelize.Op

const resolvers = {
    Query: {
        async getAllOrders(root, args, { Order, Customer, Product }) {
            return await Order.findAll({
                include: [Customer]
            }).then(results => {
                return results
            })
        },
        async getOrder(root, { order_id }, { Order }) {
            return await Order.findByPk(order_id)
        },
        async getOrderItems(root, {order_id}, { OrderItems, Product}){
            return await OrderItems.findAll({ 
                where:{
                    order_id: order_id
                },
                include: [{
                    model: Product
                }]
            }).then(results => {
                return results
            })
        },
        async getCustomer(root, { customer_id }, { Customer }) {
            return await Customer.findByPk(customer_id)
        },
        async getAllCustomers(root, args, { Customer }) {
            return await Customer.findAll()
        },
        async getProduct(root, { product_id }, { Product, ProductBrand, ProductCategory }) {
            return await Product.findByPk(product_id, {
                include: [ProductBrand, ProductCategory]
            })
        },
        async getAllProducts(root, args, { Product, ProductBrand, ProductCategory }) {
            return await Product.findAll({
                include: [ProductBrand, ProductCategory]
            }).then(results => {
                return results
            })
        },
        async getCartInfo(root, {cart_items}, {Product, ProductBrand, ProductCategory}){
            return await Product.findAll({
                where:{
                    product_id: {
                        [Op.in]: cart_items
                    }
                },
                include: [ProductBrand, ProductCategory]
            }).then(result => {
                return result
            })
        }
    },
    Mutation: {
        async createCustomer(root, { first_name, last_name, phone, email, street, city, state, zip_code }, { Customer }) {
            return await Customer.create({
                first_name,
                last_name,
                phone,
                email,
                street,
                city,
                state,
                zip_code
            })
        },
        async addProductCategory(root, { category_name }, { ProductCategory }) {
            return await ProductCategory.create({
                category_name
            })
        },
        async addProductBrand(root, { brand_name }, { ProductBrand }) {
            return await ProductBrand.create({
                brand_name
            })
        },
        async createProduct(root, { product_name, brand_id, category_id, model_year, list_price }, { Product }) {
            return await Product.create({
                product_name,
                brand_id,
                category_id,
                model_year,
                list_price
            })
        },
        async createOrder(root, { customer_id }, { Order}) {
            return await Order.create({
                customer_id
            })
        }, 
        async setOrderItems(root, {order_id, product_id}, {OrderItems}){
            return await OrderItems.create({
                order_id,
                product_id
            })
        }

    }
}

module.exports = resolvers