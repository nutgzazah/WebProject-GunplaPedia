const jwt = require('jsonwebtoken');
const User = require('../Models/Users');

exports.auth = async (req, res, next) => {
    try {
        const token = req.headers["authtoken"];
        if (!token) {
            return res.status(401).send('No token');
        }
        const decoded = jwt.verify(token, 'jwtsecret');
        req.user = decoded.user;
        console.log('Decoded user:', req.user);  // Log the decoded user
        next();
    } catch (err) {
        console.log('Token verification error:', err);
        res.status(401).send('Token Invalid');
    }
};

exports.adminCheck = async (req, res, next) => {
    try {
        console.log('Checking admin for user:', req.user.name);
        const userAdmin = await User.findOne({ name: req.user.name }).select('-password').exec();
        if (userAdmin.role !== 'admin') {
            res.status(403).send('Admin Access Denied!!');
        } else {
            next();
        }
    } catch (err) {
        console.log('Admin check error:', err);
        res.status(403).send('Admin Access Denied!!');
    }
};
