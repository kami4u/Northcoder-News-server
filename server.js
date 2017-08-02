/* eslint-disable no-unused-vars */
if (!process.env.NODE_ENV) process.env.NODE_ENV = 'dev';

const { getTopics, getArticleByTopicId, getArticles, getCommentsByArticleId, addCommentToArticle, updateArticleVote, updateCommentVote, deleteComment } = require('./controllers');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();
const config = require('./config');
const db = config.DB[process.env.NODE_ENV] || process.env.DB;
const PORT = config.PORT[process.env.NODE_ENV] || process.env.PORT;

mongoose.connect(db, function (err) {
  if (!err) console.log(`connected to the Database: ${db}`);
  else console.log(`error connecting to the Database ${err}`);
});
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', function (req, res) {res.status(200).json('All good!');});

app.get('/api/topics', getTopics);
app.get('/api/topics/:topic_id/articles', getArticleByTopicId);
app.get('/api/articles', getArticles);
app.get('/api/articles/:article_id/comments', getCommentsByArticleId);
app.post('/api/articles/:article_id/comments', addCommentToArticle);
app.put('/api/articles/:article_id', updateArticleVote);
app.put('/api/comments/:comment_id', updateCommentVote);
app.delete('/api/comments/:comment_id', deleteComment);

app.use((err,req, res, next) => { 
  if (err.status === 500) {res.status(500).json({message: err.message});}
  next(err, req, res);
});
app.use((err,req, res, next) => { 
  if (err.status === 404) {res.status(404).json({message: err.message});}
});
app.listen(PORT, function () {
  console.log(`listening on port ${PORT}`);
});

module.exports = app;
