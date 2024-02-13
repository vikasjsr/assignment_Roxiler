import * as React from "react";
import { BarChart } from "@mui/x-charts/BarChart";
import useBarChartData from "../utils/useBarChartData";

export default function SimpleCharts({ numericMonth }) {
  // Fetch data using custom hook
  const { loading, error, data } = useBarChartData(numericMonth); // Assuming you want to fetch data for January initially

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  // Extract x-axis categories and y-axis data from fetched data
  const xAxisCategories = data.map((item) => item.range);
  const yAxisData = data.map((item) => item.count);

  return (
    <BarChart
      xAxis={[
        {
          id: "barCategories",
          data: xAxisCategories,
          scaleType: "band",
        },
      ]}
      series={[
        {
          data: yAxisData,
        },
      ]}
      width={500}
      height={300}
    />
  );
}
