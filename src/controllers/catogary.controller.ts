import { Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import ApiError from "../utils/ApiError";
import Catogary from "../models/catogary.model";
import ApiResponse from "../utils/ApiResponse";


const allCtogary = asyncHandler(async (req:Request,res:Response)=>{
    try {
       const getAllCatogarylist = await Catogary.find()
       if(!getAllCatogarylist) throw new ApiError(400,"somwthinf went wrong")
    
        return res
            .status(201)
            .json(new ApiResponse(201, getAllCatogarylist, "catogary fetch successfully !"));
    } catch (error:any) {
        console.log(error?.message);
        throw new ApiError(500,error?.message);
    }
})
const createCtogary = asyncHandler(async (req:Request,res:Response)=>{
    try {
        const {name,description} = req.body;
        if(!(name && description)) throw new ApiError(400,"field is missing");
        const isCatogaryExist = await Catogary.findOne({catogaryName:name})
        if(isCatogaryExist) throw new ApiError(400,"catogary already exist");
    
        const catogary_id = `catogary${name.split(" ")[0]}${Math.ceil(Math.random() * 100)}${Date.now()}`
    
        const NewCatogaryInstance = await Catogary.create({
            catogaryId:catogary_id,
            catogaryName:name,
            description
        })
        if(!NewCatogaryInstance) throw new ApiError(500,"catogary not create");
    
        return res
            .status(201)
            .json(new ApiResponse(201, NewCatogaryInstance, "catogary registered successfully"));
    } catch (error:any) {
        console.log(error?.message);
        throw new ApiError(500,error?.message);
    }
})
const updateCtogary = asyncHandler(async (req:Request,res:Response)=>{
    try {
        const {catogaryId,name,description} = req.body;
        if(!catogaryId) throw new ApiError(400,"field is missing");
        // if(!(name|| description)) throw new ApiError(400,"field is missing");
        const isCatogaryExist = await Catogary.findOne({catogaryId})
        if(!isCatogaryExist) throw new ApiError(400,"catogary already exist");

        const updatedfields:any = {};
        if(name) updatedfields.name=name;
        if(description) updatedfields.description=description;
    
    
        const NewCatogaryInstance = await Catogary.findOneAndUpdate(
            {catogaryId},
            {$set:updatedfields},
            {new:true}
        )
        if(!NewCatogaryInstance) throw new ApiError(500,"catogary not create");
    
        return res
            .status(201)
            .json(new ApiResponse(201, NewCatogaryInstance, "catogary registered successfully"));
    } catch (error:any) {
        console.log(error?.message);
        throw new ApiError(500,error?.message);
    }
})


export {
    allCtogary,
    createCtogary,
    updateCtogary,
}