import mongoose, { Schema } from "mongoose";
import Catogary from "./catogary.model";


interface ProductInterface extends Document{
    productId:string;
    productName:string;
    productDescription1:string;
    productDescription2?:string;
    productDescription3?:string;
    catogaryId:string;
    // catogary:mongoose.Types.ObjectId;
    brand:string;
    displayImage:string;
    image:string[];
    quantity:number;
    isOfferSell:boolean;
    isFeature:boolean;
    isOwn:boolean;
    status:boolean;
    isBlock:boolean;
    isDeleted:boolean;
}

const ProductSchema = new Schema<ProductInterface>(
    {
        productId:{
            type:String,
            required:[true,"product Id genrate "]
        },
        productName:{
            type:String,
            required:[true,"product Name Required"]
        },
        productDescription1:{
            type:String,
            required:[true,"product product Description1 Required "]
        },
        productDescription2:{
            type:String,
        },
        productDescription3:{
            type:String,
        },
        catogaryId:{
            type:String,
            required:[true,"catogary id is required"]
        },
        // catogary:{
        //     type:mongoose.Schema.ObjectId,
        //     ref:Catogary,
        //     required:[true,"catogary id is required"]
        // },
        brand:{
            type:String,
            required:[true,"brand id is required"]
        },
        image: [String],
        displayImage:{
            type:String,
            required:[true,"display image is required"]
        },
        quantity:{
            type:Number,
            required:[true,"quantity id is required"],
            default:1
        },
        isOfferSell:{
            type:Boolean,
            default:false
        },
        isFeature:{
            type:Boolean,
            default:false
        },
        isOwn:{
            type:Boolean,
            default:false
        },
        status:{
            type:Boolean,
            default:false
        },
        isBlock:{
            type:Boolean,
            default:false
        },
        isDeleted:{
            type:Boolean,
            default:false
        },
    },{
        timestamps:true
    }
)

const Product = mongoose.model<ProductInterface>('Product',ProductSchema);

export default Product;