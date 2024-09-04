import mongoose, { Schema } from "mongoose";


interface CatogaryInterface extends Document{
    catogaryId:string;
    catogaryName:string;
    description:string;
}

const CatogarySchema=new Schema<CatogaryInterface>(
    {
        catogaryId:{
            type:String,
            required:[true,"must genrate "]
        },
        catogaryName:{
            type:String,
            required:[true,"catogary Name is required "]
        },
        description:{
            type:String,
            required:[true,"description Name is required "]
        },

    },{
        timestamps:true
    }
)


const Catogary = mongoose.model('Catogary',CatogarySchema);
export default Catogary;