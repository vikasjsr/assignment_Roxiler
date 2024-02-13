import { useState, useEffect } from "react";

const useBarChartData = (selectedMonth) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://localhost:4000/bargraph/${selectedMonth}`
        );
        // console.log(response);
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const responseData = await response.json();
        setData(responseData.priceRanges);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchData();
  }, [selectedMonth]);

  return { loading, error, data };
};

export default useBarChartData;
