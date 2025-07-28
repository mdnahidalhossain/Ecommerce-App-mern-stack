import { v2 as cloudinary } from "cloudinary"
import Product from "../models/Product.js"
import productRouter from "../routes/productRoutes.js"

// add product to database/api
const addProduct = async (req, res) => {
    try {
        const { pName, description, price, category, subCategory, sizes, bestSeller } = req.body

        const image1 = req.files.image1 && req.files.image1[0]
        const image2 = req.files.image2 && req.files.image2[0]
        const image3 = req.files.image3 && req.files.image3[0]
        const image4 = req.files.image4 && req.files.image4[0]

        const allImages = [image1, image2, image3, image4].filter((item) => item !== undefined)

        // uploading and converting images into url to be able to view on browser using Cloudinary: media management service
        // because the image url is needed to be upload into mongo-db
        let imageUrl = await Promise.all(
            allImages.map(async (item) => {
                let result = await cloudinary.uploader.upload(item.path, { resource_type: 'image' })

                return result.secure_url
            })
        )

        console.log(pName, description, price, category, subCategory, sizes, bestSeller)
        console.log(imageUrl)

        // uploading data to mongo-db
        const productData = {
            pName,
            description,
            category,
            price: Number(price),
            subCategory,
            bestSeller: bestSeller === "true" ? true : false,
            sizes: JSON.parse(sizes),
            image: imageUrl,
            date: Date.now()
        }

        console.log(productData)

        const product = new Product(productData)

        await product.save()

        res.status(200).json({
            success: true,
            messsage: "Product successfully added",
            product: { ...product._doc }
        })
    } catch (error) {
        console.log(error)
        res.status(400).json({
            success: false,
            message: error.message
        })
    }
}

// list the products added
const listProduct = async (req, res) => {
    try {
        const allProducts = await Product.find({})

        res.status(200).json({
            success: true,
            products: allProducts
        })
    } catch (error) {
        console.log(error)
        res.status(400).json({
            success: false,
            message: error.message
        })
    }
}

// redmove product from the database/api
const removeProduct = async (req, res) => {
    try {
        await Product.findByIdAndDelete(req.body.id)

        res.status(200).json({
            success: true,
            message: "Product removed successfully!",
        })
    } catch (error) {
        console.log(error)
        res.status(400).json({
            success: false,
            message: error.message
        })
    }
}

// getting each product and its info by posting its id
const singleProduct = async (req, res) => {
    try {
        const { productId } = req.body
        const product = await Product.findById(productId)

        res.status(200).json({
            success: true,
            product
        })

    } catch (error) {
        console.log(error)
        res.status(400).json({
            success: false,
            message: error.message
        })
    }
}

export { addProduct, listProduct, removeProduct, singleProduct }