require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const server = express();
const productRouter = require('./routes/product');
const userRouter = require('./routes/user');
console.log('env', process.env.DB_PASSWORD);

// db connection code
main().catch(err => console.error(err));

async function main() {
  try {
    await mongoose.connect('mongodb://127.0.0.1:27017/ecommerce', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('db connected');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1); // Exit the process in case of a database connection error
  }
}

// bodyParser
server.use(express.json());
server.use(morgan('combined'));
server.use(express.static(process.env.PUBLIC_DIR));
server.use('/products', productRouter.router);
server.use('/users', userRouter.router);

server.listen(process.env.PORT, () => {
  console.log('Server started on port', process.env.PORT);
});
