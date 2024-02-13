import React from "react";

const Card = ({ totalSaleAmt, totalSoldItem, notSold }) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginTop: "2rem",
        width: "100%",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "2rem",
          height: "15rem",
          width: "25rem",
          // backgroundColor: "green",
          borderRadius: "5%",
          border: "1px solid green",
        }}
      >
        <div>
          <h3>TotalSaleAmt : {totalSaleAmt}</h3>
        </div>

        <div>
          {" "}
          <h3>TotalSoldItem : {totalSoldItem}</h3>
        </div>

        <div>
          {" "}
          <h3>NotSold : {notSold}</h3>
        </div>
      </div>
    </div>
  );
};

export default Card;
