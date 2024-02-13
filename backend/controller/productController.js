import Product from "../models/product.js";

export const fetchAndStoreData = async (req, res) => {
  try {
    const response = await fetch(
      "https://s3.amazonaws.com/roxiler.com/product_transaction.json"
    );

    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }

    const products = await response.json();

    // Insert data into MongoDB
    await Product.insertMany(products);

    res.send("Data stored successfully.");
  } catch (error) {
    console.error("Error fetching and storing data:", error);
    res.status(500).send("Internal server error");
  }
};

// Function to pad single-digit numbers with leading zeros
const padWithZero = (num) => (num < 10 ? `0${num}` : num);

export const getAllData = async (req, res) => {
  try {
    const { id } = req.params;
    const numericMonth = parseInt(id, 10);
    const nextMonth = numericMonth === 12 ? 1 : numericMonth + 1;

    const startDate = `2022-${padWithZero(numericMonth)}-01`;
    const endDate = `2022-${padWithZero(nextMonth)}-01`;

    const filteredProducts = await Product.find({
      dateOfSale: { $gte: startDate, $lt: endDate },
    });

    // console.log(filteredProducts);

    let totalSaleAmt = 0;
    let totalSoldItem = 0;
    let notSold = 0;

    filteredProducts.forEach((product) => {
      if (product.sold) {
        totalSaleAmt += product.price;
        totalSoldItem++;
      } else {
        notSold++;
      }
    });

    res.status(200).json({
      filteredProducts: filteredProducts,
      totalSaleAmt: totalSaleAmt,
      totalSoldItem: totalSoldItem,
      notSold: notSold,
    });
  } catch (error) {
    console.log("Error fetching products:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getBarChartData = async (req, res) => {
  try {
    const { id } = req.params;
    // console.log(id);
    const numericMonth = parseInt(id, 10);

    const nextMonth = numericMonth === 12 ? 1 : numericMonth + 1;
    const startDate = `2022-${padWithZero(numericMonth)}-01`;
    const endDate = `2022-${padWithZero(nextMonth)}-01`;

    const filteredProducts = await Product.find({
      dateOfSale: { $gte: startDate, $lt: endDate },
    });

    const priceRanges = [
      { min: 0, max: 100 },
      { min: 101, max: 200 },
      { min: 201, max: 300 },
      { min: 301, max: 400 },
      { min: 401, max: 500 },
      { min: 501, max: 600 },
      { min: 601, max: 700 },
      { min: 701, max: 800 },
      { min: 801, max: 900 },
      { min: 901, max: Number.POSITIVE_INFINITY },
    ];

    const priceRangeCounts = priceRanges.map(() => 0);

    filteredProducts.forEach((product) => {
      const price = product.price;
      for (let i = 0; i < priceRanges.length; i++) {
        if (price >= priceRanges[i].min && price <= priceRanges[i].max) {
          priceRangeCounts[i]++;
          break;
        }
      }
    });

    res.status(200).json({
      priceRanges: priceRanges.map((range, index) => ({
        range: `${range.min}-${
          range.max === Number.POSITIVE_INFINITY ? "above" : range.max
        }`,
        count: priceRangeCounts[index],
      })),
    });
  } catch (error) {
    console.error("Error fetching bar chart data:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
