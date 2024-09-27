const Technique = require('../Models/Technique');
const fs = require('fs');

exports.create = async (req, res) => {
    try {
        var data = req.body;
        if (req.file) {
            data.file = req.file.filename;
        }
        const createdTechnique = await Technique(data).save();
        res.send(createdTechnique);
    } catch (err) {
        console.log(err);
        res.status(500).send('Server Error');
    }
};

exports.read = async (req, res) => {
    try {
        const id = req.params.id;
        const technique = await Technique.findOne({ _id: id }).exec();
        res.send(technique);
    } catch (err) {
        console.log(err);
        res.status(500).send('Server Error');
    }
};

exports.list = async (req, res) => {
    try {
        const techniques = await Technique.find({}).exec();
        res.send(techniques);
    } catch (err) {
        console.log(err);
        res.status(500).send('Server Error');
    }
};

exports.update = async (req, res) => {
    try {
        const id = req.params.id;
        var newData = req.body;

        if (typeof req.file !== 'undefined') {
            newData.file = req.file.filename;
            await fs.unlink('./uploads/' + newData.fileOld, (err) => {
                if (err) {
                    console.log(err);
                } else {
                    console.log('Edit success');
                }
            });
        }
        const updatedTechnique = await Technique.findOneAndUpdate({ _id: id }, newData, { new: true }).exec();
        res.send(updatedTechnique);
    } catch (err) {
        console.log(err);
        res.status(500).send('Server Error');
    }
};

exports.remove = async (req, res) => {
    try {
        const id = req.params.id;
        const removedTechnique = await Technique.findOneAndDelete({ _id: id }).exec();

        if (!removedTechnique) {
            return res.status(404).send("Technique not found");
        }

        if (removedTechnique?.file) {
            await fs.unlink('./uploads/' + removedTechnique.file, (err) => {
                if (err) {
                    console.log(err);
                } else {
                    console.log('Remove success');
                }
            });
        }

        res.send(removedTechnique);
    } catch (err) {
        console.log(err);
        res.status(500).send('Server Error');
    }
};
