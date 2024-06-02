const mongoose = require('mongoose');
const CategorySchema = mongoose.Schema(
    {
      name:{
        type:String
      },
      slug:{
        type:String
      },
      image:{
        type:String,
      },
      status:{
        type:Boolean,
        default:true
      }  
    },
    {timestamps:true}
)

const Category = mongoose.model("Category",CategorySchema)

module.exports = Category