import * as React from "react";
import { useState } from "react";

import useGetProducts from "../utils/useGetProducts";

import TextField from "@mui/material/TextField";
import BasicSelect from "./BasicSelect";
import { monthsName } from "./Months";
import Pagination from "./Pagination";
import Card from "./Card";
import MainTable from "./MainTable";
import SimpleCharts from "./SimpleCharts";

export default function BasicTable() {
  const [currentPage, setCurrentPage] = useState(1);
  const [month, setMonth] = useState("March"); // Set default value to "March"
  const [numericMonth, setNumericMonth] = useState("03");
  const [searchText, setSearchText] = useState("");

  const handleChange = (event) => {
    const selectedMonthIndex = monthsName.indexOf(event.target.value);
    const numericMonth = (selectedMonthIndex + 1).toString().padStart(2, "0");
    setMonth(event.target.value);
    setNumericMonth(numericMonth);
  };

  const {
    loading,
    products,
    totalSaleAmt,
    totalSoldItem,
    notSold,
  } = useGetProducts(numericMonth, searchText);

  const perPageData = 10;

  const totalPages = Math.ceil(products.length / perPageData);

  // console.log(month);

  // console.log("totalpage", totalPages);
  // console.log("length total", products);

  // console.log("cp", currentPage);
  const startIndex = (currentPage - 1) * perPageData;
  const endIndex = startIndex + perPageData;

  // console.log("si", startIndex);
  // console.log("ei", endIndex);

  const handleSearchTextChange = (event) => {
    setSearchText(event.target.value);
  };

  const filteredProducts = searchText
    ? products.filter(
        (product) =>
          product.title.toLowerCase().includes(searchText.toLowerCase()) ||
          product.description
            .toLowerCase()
            .includes(searchText.toLowerCase()) ||
          product.price
            .toString()
            .toLowerCase()
            .includes(searchText.toLowerCase())
      )
    : products;

  // console.log(currentDataProduct);

  // console.log(products);

  const currentDataProduct = filteredProducts.slice(startIndex, endIndex);

  const handlePreviousbtn = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handleNextBtn = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "space-evenly",
          alignItems: "center",
          marginTop: "2rem",
        }}
      >
        <TextField
          id="outlined-basic"
          label="Search"
          variant="outlined"
          value={searchText}
          onChange={handleSearchTextChange}
        />
        <BasicSelect month={month} handleChange={handleChange} />
      </div>
      {loading ? (
        <div>Loading ...</div>
      ) : (
        <MainTable currentDataProduct={currentDataProduct} />
      )}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "2rem",
        }}
      >
        <h2>Page No: - {currentPage}</h2>
      </div>

      <Pagination
        handlePreviousbtn={handlePreviousbtn}
        currentPage={currentPage}
        handleNextBtn={handleNextBtn}
        totalPages={totalPages}
      />

      <Card
        notSold={notSold}
        totalSaleAmt={totalSaleAmt}
        totalSoldItem={totalSoldItem}
      />

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "2rem",
          width: "100%",
        }}
      >
        <SimpleCharts numericMonth={numericMonth} />
      </div>
    </>
  );
}
