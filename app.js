const express = require('express');
const logger = require('morgan');

const indexRouter = require('./router/index');
const linksRouter = require('./router/links');

const app = express();

app.use(logger('dev'));
app.use(express.json());
// [이해 불가] : express.urlencoded 찾아보기
app.use(express.urlencoded({ extended: false }));

app.use('/', indexRouter);
app.use('/links', linksRouter);

module.exports = app;
