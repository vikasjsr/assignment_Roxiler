import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const MainTable = ({ currentDataProduct }) => {
  return (
    <>
      <div
        style={{
          marginTop: "2rem",
        }}
      >
        <TableContainer component={Paper}>
          <Table aria-label="simple table">
            <TableHead
              sx={{
                borderBottom: "1px solid rgba(0, 0, 0)",
              }}
            >
              <TableRow>
                <TableCell>id</TableCell>
                <TableCell align="right">Title</TableCell>
                <TableCell align="right">Description</TableCell>
                <TableCell align="right">Price</TableCell>
                <TableCell align="right">Category</TableCell>
                <TableCell align="right">Image</TableCell>
                <TableCell align="right">Sold</TableCell>
                <TableCell align="right">DateOfSale</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {currentDataProduct.map((product) => (
                <TableRow
                  key={product.id}
                  sx={{
                    "& td, & th": {
                      border: "1px solid rgba(0, 0, 0)", // Add borders to all cells
                    },
                  }}
                >
                  <TableCell component="th" scope="row">
                    {product.id}
                  </TableCell>
                  <TableCell align="right">{product.title}</TableCell>
                  <TableCell align="right">{product.description}</TableCell>
                  <TableCell align="right">{product.price}</TableCell>
                  <TableCell align="right">{product.category}</TableCell>
                  <TableCell align="right">
                    <img
                      src={product.image}
                      alt="Product Image"
                      style={{ maxWidth: "100px" }}
                    />
                  </TableCell>
                  <TableCell align="right">
                    {product.sold ? "Sold" : "Not Sold"}
                  </TableCell>
                  <TableCell align="right">
                    {new Date(product.dateOfSale).toLocaleString()}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </>
  );
};

export default MainTable;
