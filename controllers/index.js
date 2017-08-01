const { Topics } = require('../models/models');

exports.getTopics = (req, res, next) => {
    Topics.find({}, function (err, topic) {
        if (err) return next({status: 404, message: 'Page not found!!!'});
        res.status(200).json(topic);
    });
};