const Product = require('../Models/Product')
const Collection = require('../Models/Collection');
const fs = require('fs');

//rating
    exports.rating = async(req,res)=>{
        console.log("req.user: ",req.user)
        console.log("req.body: ",req.body)
        console.log("rating by: ",req.user._id)
        const { star, prodId } = req.body
        // const userId = req.user._id
    try{
        const product = await Product.findById(prodId);
        const alreadyRatedIndex = product.ratings.findIndex(
            (rating) => rating.postedby.toString() === req.user._id.toString()
        );
        if(alreadyRatedIndex !== -1){
            product.ratings[alreadyRatedIndex].star = star;
            await product.save();
            res.send(product);
        }else {
            product.ratings.push({
                star: star,
                postedby: req.user._id
            });
            await product.save();
            res.json(product);
        }
        await product.save();

        const totalRating = product.ratings.length;
        const ratingSum = product.ratings.reduce((acc, curr) => acc + curr.star, 0);
        const actualRating = totalRating > 0 ? Math.round(ratingSum / totalRating) : 0;

        await Product.findByIdAndUpdate(
            prodId,
            { totalrating: actualRating },
            { new: true }
        );

        // res.json(finalProduct);
    } catch (err) {
        console.log(err);
        res.status(500).send('Server Error');
    }
};


exports.read = async(req,res)=>{
    try{
        const id = req.params.id
        const producted = await Product.findOne({_id:id}).exec();
        res.send(producted)
    }catch(err){
        console.log(err)
        res.status(500).send('Server Error')
    }
}

exports.list = async(req,res)=>{
    try{
        const producted = await Product.find({}).exec();
        res.send(producted)
    }catch(err){
        console.log(err)
        res.status(500).send('Server Error')
    }
}
exports.create = async(req,res)=>{
    try{
        var data = req.body
        if(req.file){
            data.file = req.file.filename
        }
        data.sticker = JSON.parse(req.body.sticker);
        data.ratings = []; // Ensure ratings array is initialized
        const producted = await Product(data).save()
        res.send(producted)
    }catch(err){
        console.log(err)
        res.status(500).send('Server Error')
    }
}
exports.update = async(req,res)=>{
    try{
        const id = req.params.id
        var newData = req.body

        newData.ratings = []
        // newData.sticker = JSON.parse(req.body.sticker);

        if(typeof req.file !== 'undefined'){
            newData.file = req.file.filename
            await fs.unlink('./uploads/'+ newData.fileOld,(err)=>{
                if(err){
                    console.log(err)
                }else{
                    console.log('Edit success')
                }
            })
        }
        const updated = await Product.findOneAndUpdate({ _id: id },newData,{new: true}).exec()
        res.send(updated)
    }catch(err){
        console.log(err)
        res.status(500).send('Server Error')
    }
}
exports.remove = async(req,res)=>{
    try{
        const id = req.params.id
        const removed = await Product.findOneAndDelete({_id:id}).exec()

        if(!removed) {
            return res.status(404).send("Product not found");
        }

        // Remove the product from all user collections
        await Collection.updateMany(
            { },
            { $pull: { products: id } } // Corrected query
        );

        if(removed?.file){
            await fs.unlink('./uploads/'+ removed.file,(err)=>{
                if(err){
                    console.log(err)
                }else{
                    console.log('Remove success')
                }
            })
        }

        res.send(removed)
    }catch(err){
        console.log(err)
        res.status(500).send('Server Error')
    }
} 