const { Topics, Articles } = require('../models/models');

exports.getTopics = (req, res, next) => {
    Topics.find({}, function (err, topic) {
        if (err) return next({status: 404, message: 'Page not found!!!'});
        res.status(200).json(topic);
    });
};

exports.getArticleByTopicId = (req, res, next) => {
    let id = req.params.topic_id;
    Articles.find({ belongs_to: id }, function (err, article) {
        if (err) return next({status: 404, message: 'Page not found!!!'});
        res.status(200).json(article);
    });
};

exports.getArticles = (req, res, next) => {
    Articles.find({}, function (err, article) {
        if (err) return next({status: 404, message: 'Page not found!!!'});
        res.status(200).json(article);
    });
};