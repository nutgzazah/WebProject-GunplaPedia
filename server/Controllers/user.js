const User = require('../Models/Users')
const Collection = require('../Models/Collection');

exports.list = async(req,res)=>{
    try{
        const user = await User.find({})
        .select('-password')
        .exec()
        res.send(user
        )
    }catch(err){
        console.log(err);
        res.status(500).send("Server Error");
    }
}

exports.changeRole = async(req,res)=>{
    try{
        const { id, role } = req.body.data

        const user = await User.findOneAndUpdate({_id:id},{role:role},{new:true})
        .select('-password')
        .exec()
        res.send(user)
        
    }catch(err){
        console.log(err);
        res.status(500).send("Server Error");
    }
}

exports.remove = async (req, res) => {
    try {
        const id = req.params.id;
        
        // Remove the user
        const removedUser = await User.findOneAndDelete({ _id: id }).exec();

        if (!removedUser) {
            return res.status(404).send("User not found");
        }

        // Remove the user's collection
        const removedCollection = await Collection.findOneAndDelete({ user: id }).exec();

        if (removedCollection) {
            console.log("Collection removed:", removedCollection);
        }

        res.send(removedUser);
    } catch (err) {
        console.log(err);
        res.status(500).send('Server Error');
    }
};