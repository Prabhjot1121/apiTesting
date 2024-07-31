const productsData = require("../models/products")

const getAllProducts = async (req, res) => {

    const { company, name, feature, sort, select } = req.query;
    const queryData = {};

    if (feature) {
        queryData.feature = feature;
    }
    if (company) {
        queryData.company = company;
    }
    if (name) {
        queryData.name = { $regex: name, $options: "i" };
    }
    let apiData = productsData.find(queryData);

    if (sort) {
        let sortfix = sort.replace(",", " ");
        apidata = apiData.sort(sortfix);
    }
    if (select) {
        let selectFix = select.split(",").join(" ");
        apidata = apiData.select(selectFix);
    }

    let page = Number(req.query.page) || 1;
    let limit = Number(req.query.limit) || 5;
    let skip = (page - 1) * limit;
    apiData = apiData.skip(skip).limit(limit);

    const mydata = await apiData;
    if (mydata.length === 0) {
        return res.send("no matching data");
    } else { return res.status(200).json({ mydata, nbhhits: mydata.length }) };
};

const getAllProductsTesting = async (req, res) => {
    const testdata = await productsData.find(req.query).select("name");
    return res.status(200).json({ testdata });
}

module.exports = { getAllProducts, getAllProductsTesting };