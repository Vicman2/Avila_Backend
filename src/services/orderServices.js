const orderModel = require('../models/orderModel')
const userModel = require('../models/userModel');
const CustomError = require('../utility/CustomError');

class OrderServices{
    async make(userId){
        const user = await userModel.findById(userId).populate('cart.product');
        const userWithoutPop = await userModel.findById(userId);
        if(!user) throw new CustomError("User do not exist", 401)   
        const userOrder = userWithoutPop.cart.map(prod => {
            return {
                product : prod.product, 
                quantity: prod.quantity
            }
        });
        const priceAndQuantity = user.cart.map(prod => prod.quantity * prod.product.price)
        const totalPrice = priceAndQuantity.reduce((acc, recent) => acc + recent)
        const order = new orderModel({
            user: userId, 
            orders: userOrder, 
            totalPrice: totalPrice
        })
        const newOrder = await order.save();
        return newOrder
    }
    async remove(userId, orderId){
        const order = await orderModel.findOne({user: userId, _id: orderId}).populate('cart.product');
        if(!order) throw new CustomError("Such order do not exist for this user", 401);
        const deletedOrder = await orderModel.findByIdAndDelete(orderId)
        return deletedOrder;
    }
    async getMany(userId){
        const orders = await orderModel.find({user: userId}).populate('cart.products');
        if(orders.length === 0) throw new CustomError("No order from the user yet", 401)
        return orders;
    }
    async get(userId, orderId){
        const order = await orderModel.findOne({user: userId, _id: orderId}).populate('cart.products')
        if(!order) throw new CustomError("No such order exist", 401);
        return order;
    }
    async edit(userId, orderId){
        const order = await orderModel.findOne({user: userId, _id: orderId})
        if(!order) throw new CustomError("No such order exist", 401);
        order.status = "delivered"
        const saved = order.save()
        return saved
    }
}
module.exports = new OrderServices