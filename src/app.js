const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const { authRouter, userRouter, productRouter, orderRouter, categoryRouter } = require('./routes/index');

const app = express();

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.get('/', (req, res) => {
  return res.send('Welcome stranger, you are on JRSystems dominion.');
});

app.use('/api/auth', authRouter);
app.use('/api/user', userRouter);
app.use('/api/product', productRouter);
app.use('/api/order', orderRouter);
app.use('/api/category', categoryRouter)

module.exports = app;