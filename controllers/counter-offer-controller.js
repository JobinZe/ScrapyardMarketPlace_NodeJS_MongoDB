const productModel = require('../models/product.model');
const counterModel = require('../models/counter-offer-model')
exports.counterOffer=async(req,res)=>{
    try {
        const userId = req.user.userId;
        const _id = req.params.id;
       let counterValue = req.body;
        const fetchProduct = await productModel.findOne({_id: _id})
        if (fetchProduct) {
            const counter = new counterModel({
                counterPrice:counterValue.data,
                userId:userId,
                sellerUserId:fetchProduct.userId,
                productId:_id,
                originalPrice:fetchProduct.price,
                productName:fetchProduct.productName,
                image:`${req.protocol}://${req.get('host')}/upload/${fetchProduct.image}` ,
                counterOfferAccepted:false
            })
            await counter.save();
            return res.status(200).json({status:1032,message:"Counter Added"})
        }
        else{
            return res.status(500).json({status:1032,message:"Product not found"})

        }
    }
    catch(err){
        console.log(err,"error")
        return res.status(500).json(err)

    }
}
exports.counterExists = async(req,res)=>{
    try{
    const userId =req.user.userId;
    console.log(userId,"counter userid")
    const checkForCounter = await counterModel.find({sellerUserId:userId,counterOfferAccepted:false})
        console.log(checkForCounter,"check for counter")
        if(checkForCounter.length > 0){
         return res.status(200).json({status:1034,counterOfferPresent:true})
        }
        else{
            return res.status(200).json({status:1035,counterOfferPresent:false})

        }
    }
    catch(err){
        console.log(err);
        return res.status(500)
    }
}
exports.displayCounterOffers = async(req,res)=>{
    try{
        const userId= req.user.userId;
        const presentCounters = await counterModel.find({sellerUserId:userId,counterOfferAccepted:false});
        if(presentCounters){
         return res.status(200).json(presentCounters)
        }
    }
    catch(err){
        console.log(err,"err")
        return res.status(500)
    }
}
exports.RejectOrAcceptCounter = async (req,res)=>{
    //1 accept
    //2 reject
    try {
        const userId = req.user.userId;
        const counterId = req.params.id;
        const payload = req.body;
        const fetchCounterDatatoCounter = await counterModel.findOne({_id: counterId});
        if (fetchCounterDatatoCounter) {
            if (payload.data == 1) {
                const fetchProduct = await productModel.findById({
                    _id: fetchCounterDatatoCounter.productId,
                    userId: userId
                })
                if (fetchProduct) {
                    fetchProduct.price = fetchCounterDatatoCounter.counterPrice;
                    fetchCounterDatatoCounter.counterOfferAccepted=true;
                    await fetchCounterDatatoCounter.save()
                    await fetchProduct.save();
                    return res.status(200).json({status: 1030, message: "Accepted"})
                }
            } else {
                return res.status(200).json({status: 1031, message: "Rejected"})

            }
        }
    }
    catch(Err){
        console.log(Err);
        return res.status(500).json({message:"Server Error"})
    }
}
exports.acceptedCounter = async(req,res)=>{
    try {
        const userId = req.user.userId;
        const counterSchema = await counterModel.find({userId: userId, counterOfferAccepted: true});
        if (counterSchema.length > 0) {
            return res.status(200).json(counterSchema)
        } else {
            return res.status(200).json({status: 1035, message: "No counter available"})

        }
    }
    catch(err){
        console.log(err,"err")
        return res.status(500).json("server error")

    }
}