const Collection = require('../Models/Collection');
const Product = require('../Models/Product');
const User = require('../Models/Users');

// Method to add a product to a user's collection
exports.addToCollection = async (req, res) => {
    const { productId } = req.body;
    try {

        const userId = req.user._id;
        // Check if the user exists
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        // Check if the product exists
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ error: "Product not found" });
        }

        let collection = await Collection.findOne({ user: userId });
        if (!collection) {
            collection = new Collection({ user: userId, products: [] });
        }

        if (collection.products.includes(productId)) {
            return res.status(400).json({ error: "Product already in collection" });
        }

        collection.products.push(productId);
        await collection.save();


        res.json({ message: "Product added to collection successfully" });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
};

// Method to remove a product from a user's collection
exports.removeFromCollection = async (req, res) => {
    const { productId } = req.body;
    try {
        const userId = req.user._id;
        const collection = await Collection.findOne({ user: userId });
        if (!collection) {
            return res.status(404).json({ error: "Collection not found" });
        }

        if (!collection.products.includes(productId)) {
            return res.status(400).json({ error: "Product not found in user's collection" });
        }

        collection.products = collection.products.filter(id => id.toString() !== productId.toString());
        await collection.save();

        res.json({ message: "Product removed from collection successfully" });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
};

// Method to get all products in a user's collection
exports.getCollection = async (req, res) => {
    const userId = req.user._id;
    try {
        const user = await User.findById(userId).populate({
            path: 'userCollection',
            populate: { path: 'products' }
        });
        if (!user || !user.userCollection) {
            return res.status(404).json({ error: "Collection not found" });
        }

        res.json(user.userCollection.products);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
};
