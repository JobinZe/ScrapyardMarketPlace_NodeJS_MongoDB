const mongoose = require('mongoose');

const counterSchema = new mongoose.Schema({
    counterPrice:{type:Number,required:true},
    productId:{type:mongoose.Schema.Types.ObjectId,required:true},
    userId:{type:mongoose.Schema.Types.ObjectId,required:true},
    sellerUserId:{type:mongoose.Schema.Types.ObjectId,required:true},
    originalPrice:{type:Number,required:true},
    productName:{type:String,required:true},
    image:{type:String,required:true},
    counterOfferAccepted:{type:Boolean,default:false,required:true}
})
const counterModel = mongoose.model('CounterOffer',counterSchema);
module.exports = counterModel