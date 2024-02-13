import React, { useEffect, useState } from "react";

const useGetProducts = (month, searchText) => {
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [totalSaleAmt, setTotalSaleAmt] = useState(0);
  const [totalSoldItem, setTotalSoldItem] = useState(0);
  const [notSold, setNotSold] = useState(0);

  // console.log( month);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const response = await fetch(`http://localhost:4000/getall/${month}`);
         console.log(response);
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }

        console.log(response);
        const {
          filteredProducts,
          totalSaleAmt,
          totalSoldItem,
          notSold,
        } = await response.json();
        setProducts(filteredProducts);
        setTotalSaleAmt(totalSaleAmt);
        setTotalSoldItem(totalSoldItem);
        setNotSold(notSold);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [month, searchText]);

  return { loading, products, totalSaleAmt, totalSoldItem, notSold };
};

export default useGetProducts;
