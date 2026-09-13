const dotenv = require('dotenv');
const connectDB = require('../config/db');
const User = require('../models/User');
const Product = require('../models/Product');
const Order = require('../models/Order');
const products = require('./products');

dotenv.config();
connectDB();

const importData = async () => {
  try {
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    const adminUser = await User.create({
      name: 'Admin',
      email: 'admin@shopverse.com',
      password: 'admin123',
      role: 'admin'
    });

    const demoUser = await User.create({
      name: 'Demo User',
      email: 'user@shopverse.com',
      password: 'user1234',
      role: 'user'
    });

    await Product.insertMany(products);

    console.log('✅ Data Imported Successfully!');
    console.log('----------------------------------');
    console.log('Admin login  -> email: admin@shopverse.com | password: admin123');
    console.log('User login   -> email: user@shopverse.com  | password: user1234');
    console.log('----------------------------------');
    process.exit();
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();
    console.log('🗑️  Data Destroyed!');
    process.exit();
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
}
