require('dotenv').config();
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors');
var compression = require('compression');
var helmet = require('helmet');

var customersRouter = require('./routes/customers');
var productsRouter = require('./routes/products');
var ordersRouter = require('./routes/orders');
var orderItemsRouter = require('./routes/orderItems');
var shippingAddressRouter = require('./routes/shippingAddress');
var authRouter = require('./routes/auth');

var app = express();

// Set up mongoose connection
var mongoose = require('mongoose');
var dev_db_url = process.env.MONGODB_URI;
var mongoDB = process.env.MONGODB_URI || dev_db_url;
mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true}, () => console.log('MongoDB has connected successfully.'));
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));


var corsOptions = {
  origin: "http://localhost:3000"
};

app.use(cors(corsOptions));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(helmet());
app.use(compression());
app.use(express.static(path.join(__dirname, './frontend/build/')));
//app.use('/public', express.static('public'));

app.use('/api/customers', customersRouter);
app.use('/api/products', productsRouter);
app.use('/api/orders', ordersRouter);
app.use('/api/orderItems', orderItemsRouter);
app.use('/api/shippingAddress', shippingAddressRouter);
app.use('/api/auth', authRouter);

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, './frontend/build/index.html'));
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;