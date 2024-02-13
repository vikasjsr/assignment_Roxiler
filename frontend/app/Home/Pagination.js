import React from "react";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";

const Pagination = ({
  handlePreviousbtn,
  currentPage,
  handleNextBtn,
  totalPages,
}) => {
  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "2rem",
        }}
      >
        <Stack spacing={2} direction="row">
          <Button
            variant="contained"
            onClick={handlePreviousbtn}
            disabled={currentPage === 1}
          >
            Previous
          </Button>
          <Button
            variant="contained"
            onClick={handleNextBtn}
            disabled={currentPage === totalPages}
          >
            Next
          </Button>
        </Stack>
      </div>
    </>
  );
};

export default Pagination;
