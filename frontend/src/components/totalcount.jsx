import React, { useState, useEffect } from 'react';

const TotalCount = () => {
  const [totalCount, setTotalCount] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/v1/admin/users/paymentstatu');
        if (response.ok) {
          const data = await response.json();
          // Assuming the response contains an array and you want to count its length
          setTotalCount(data.length);
        } else {
          throw new Error('Failed to fetch data');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();

    // Cleanup function
    return () => {
      // Cleanup code (if any)
    };
  }, []);

  return (
    <div>
      {totalCount !== null ? (
        <div>Total Count: {totalCount}</div>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};

export default TotalCount;
