const productModel = require('../models/prductsModel');
const CustomError = require('../utility/CustomError')
const {deleteImage} = require('../utility/utilize')


class Product{
    async add(productDetails){
        const existing = await productModel.findOne({name: productDetails.name})
        if(existing)  throw new CustomError("This product is already in existance", 400)
        const product = new productModel({
            name: productDetails.name,
            prodImageSrc: productDetails.prodImageSrc,
            price: productDetails.price,
            details: productDetails.details
        })
        const dataToSend = await product.save()
        return dataToSend
    }
    async getOne(id){
        const product = await productModel.findById(id);
        if(!product) throw new CustomError("Product not found", 400);
        return product
    }
    async getMany(pageNumber, numberOfProducts){
        const numberToSkip = (pageNumber-1) * numberOfProducts
        const productsToReturn = await productModel.find()
            .skip(numberToSkip)
            .limit(numberOfProducts)
        let totalProductsNumber = await productModel.count()
        const dataToSend = {
            requestedProduct:productsToReturn, 
            totalProducts: totalProductsNumber? totalProductsNumber : null
        }
        if(!totalProductsNumber || totalProductsNumber === 0) throw new CustomError("No product in the platform", 400)
        return dataToSend
    }
    async deleteProd(id){
        const product = await productModel.findOne({_id:id})
        if(!product) throw new CustomError("Product do not exist", 400)
        const removed = await productModel.findByIdAndRemove(id)
        await deleteImage(product.prodImageSrc)
        return {success: true, message: "Product have been deleted successfully", data: removed}
    }
    async edit(productDetails){
        const existing = await productModel.findOne({_id:productDetails.id})
        if(!existing) return {success: false, message: "The product does not exist"}
        if(existing.prodImageSrc !== productDetails.prodImageSrc){
            await deleteImage(existing.prodImageSrc)
        }
        existing.name =productDetails.name
        existing.prodImageSrc = productDetails.prodImageSrc
        existing.details = productDetails.details
        const saved = await  existing.save();
        return {success: true, message:"Product editted successfully", data: saved}
    }
}


module.exports = new Product()