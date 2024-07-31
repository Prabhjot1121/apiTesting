require("dotenv").config();

const connectDB = require("./connection");
const Product = require("./models/products");

const productData = require("./products.json")


const start = async () => {
    try {
        await connectDB(process.env.MONGODB_URL);
        await Product.deleteMany();
        await Product.create(productData);
        console.log("success");
    } catch (error) {
        console.log(error)
    }
};
start();