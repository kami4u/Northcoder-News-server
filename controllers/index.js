const { Topics, Articles, Comments } = require('../models/models');

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

exports.getCommentsByArticleId = (req, res, next) => {
    const id = req.params.article_id;
    Comments.find({ belongs_to: id }, function (err, comment) {
        if (err) return next({status: 404, message: 'Page not found!!!!'});
        res.status(200).json(comment);
    });
};

exports.addCommentToArticle = (req, res, next) => {
    const id = req.params.article_id;
    const newComment = new Comments({
        body: req.body.body,
        belongs_to: id
    });
    newComment.save()
        .then(() => {
            res.status(200).json(newComment);
        })
        .catch(() => {
            next({status: 500, message: 'Internal server error'});
        });
};

exports.updateArticleVote = (req, res, next) => {
    const id = req.params.article_id;
    const {vote} = req.query;
    if (!(vote === 'up' || vote === 'down')) {
        return next({status: 404, message: 'Invalid entry'});
    }
    const voteVal = vote === 'up' ? 1 : -1;
    Articles.findByIdAndUpdate(id, { $inc: { votes: voteVal } },{new: true}, function (err, comment) {
        if (err) return next({status: 404, message: 'page not found'});
        else {
            res.status(200).json(comment);
        }
    });
};

exports.updateCommentVote = (req, res, next) => {
    const id = req.params.comment_id;
    const {vote} = req.query;
    if (!(vote === 'up' || vote === 'down')) {
        return next({status: 404, message: 'Invalid entry'});
    }
    const voteVal = vote === 'up' ? 1 : -1;
    Comments.findByIdAndUpdate(id, { $inc: { votes: voteVal } },{new: true}, function (err, comment) {
        if (err) return next({status: 404, message: 'page not found'});
        else {
            res.status(200).json(comment);
        }
    });
};
