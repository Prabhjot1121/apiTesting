require("dotenv").config();
const express = require("express");
const app = express();
const products_api = require("./routes/products");
const connectDB = require("./connection");

const Port = process.env.PORT || 5000;

app.get("/", (req, res) => {
    return res.send("hey there!!!");
});

app.use('/api/products', products_api);

(async () => {
    try {
        await connectDB(process.env.MONGODB_URL);
        app.listen(Port, () => {
            console.log(`Server is connected on port ${Port}!!!!!`);
        });
    } catch (error) {
        console.error("Failed to connect to the database:", error.message);
        process.exit(1);
    }
})();
