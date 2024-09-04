import { Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import ApiError from "../utils/ApiError";
import ApiResponse from "../utils/ApiResponse";
import CloudinaryUploadFunction from "../utils/Cloudinary";
import Product from "../models/product.model";

interface MulterRequest extends Request {
    files?:
      | {
          [fieldname: string]: Express.Multer.File[]; 
        }
      | Express.Multer.File[];
  }
  

const createproduct = asyncHandler(async(req:Request,res:Response)=>{
    try {
        const multerReq = req as MulterRequest;
        const {name,description1,description2,description3,catogaryId,brand,quantity} = req.body;
        if(!(name&&description1&&catogaryId&&brand&&quantity)) throw new ApiError(400,"fields is missing")

        const product_id = `product${name.split(" ")[0]}${Math.ceil(Math.random()*100)}${Date.now()}`

        const displayImagePath= (req.files as {displayImage?:Express.Multer.File[]}).displayImage?.[0].path
        if (!displayImagePath) throw new ApiError(400, "displayImage is required.");
        const displayImagePathUrl = await CloudinaryUploadFunction(displayImagePath)

        const imageFiles= (req.files as {image?:Express.Multer.File[]}).image        
        if (!imageFiles || imageFiles?.length == 0) throw new ApiError(400, "displayImage is required.");
        // const imagepathUrl = await Promise.all(imageFiles?.map(fil=>console.log(fil))) 
        // console.log(imagepathUrl);
        
        const imagepathUrl = await Promise.all(imageFiles?.map(files=>CloudinaryUploadFunction(files.path))) 
        if (!imagepathUrl) throw new ApiError(400, "image is required.");

        const productInstance = await Product.create({
            productId:product_id,
            productName:name,
            productDescription1:description1,
            productDescription2:description2,
            productDescription3:description3,
            catogaryId,
            brand,
            displayImage:displayImagePathUrl,
            image:imagepathUrl,
            quantity
        })

        if (!productInstance) throw new ApiError(400, "something went wrong");
        res.status(201).json(new ApiResponse(201,productInstance,"created"))
    } catch (error:any) {
        console.log(error.message);
        throw new ApiError(500,error.message)
    }
})
const getproduct = asyncHandler(async(req:Request,res:Response)=>{
    try {
        const page = parseInt(req.query.page as string) || 1;
        const contentSize = parseInt(req.query.size as string) || 10;
        const skip = (page-1)*contentSize;
        // const getAllData = await Product.find().populate('catogaryId').skip(skip).limit(contentSize)
        const getAllData = await Product.aggregate(
            [
                {
                  $lookup: {
                    from: "catogaries",
                    localField: "catogaryId",
                    foreignField: "catogaryId",
                    as: "catogary",
                  }
                },
                {
                  $addFields: {
                    catogaryDetails:{
                     $arrayElemAt:["$catogary",0],
                      
                      },
                    total:{
                    $size:"$catogary"
                  }
                  },
                  
                },
                {
                  $project: {
                    _id:0,
                    productId:1,
                          productDescription1:1,
                          image:1,
                          displayImage:1,
                          brand:1,
                          productDescription2:1,
                          productDescription3:1,
                          quantity:1,
                          productName:1,
                    catogaryDetails:{
                      catogaryId:1,
                              description:1,
                              catogaryName:1
                    },
              
                  }
                }
              ]
        ).skip(skip).limit(contentSize)
        if (!getAllData) throw new ApiError(400, "something went wrong");
        res.status(201).json(new ApiResponse(201,getAllData,"created"))
    } catch (error:any) {
        console.log(error.message);
        throw new ApiError(500,error.message)
    }
})


export {
    createproduct,
    getproduct,
}