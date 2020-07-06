const {add, getOne, getMany, deleteProd,edit} = require('../services/productServices')
const response = require("../utility/response")


class ProductController{
    async addProduct(req, res){
        const data = req.body;
        data.prodImageSrc = req.file.filename;
        const result = await add(data)
        res.status(201).json(response(true, "Products created successfully", result))
    }
    async getProduct(req, res){
        const {id} = req.params
        const data = await getOne(id)
        res.status(200).json(response(true, "Product fetched successfully", data ));
    }
    async getMany(req, res){
        const {pageNo, noOfProducts} = req.query
        const data= await getMany(parseInt(pageNo), parseInt(noOfProducts))
        res.status(200).json(response(true, "Products fetched successfully", data ))
    }
    async deleteProduct(req, res){
        const {id} = req.params;
        const result = await deleteProd(id);
        res.status(200).json(response(true, "Product have been deleted successfully", result))
    }
    async editProduct(req, res){
        const {id} = req.params
        const data = req.body;
        data.id = id
        req.file ? data.prodImageSrc = req.file.filename: data.machineSource = req.body.prodImageSrc
        const result = await edit(data)
        if(!result.success) return res.status(404).json(result)
        res.status(200).json(result)
    }
    

}


module.exports = new ProductController()