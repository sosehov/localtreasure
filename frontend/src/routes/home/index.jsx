import React from 'react';
import { useEffect, useState } from "react";
import ExpandableCardDemoHome from '../../components/ExpandableCardDemoHome';

const HomeRoute = () => {
  const [sales, setSales] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:8080/api/sales/allSales")
      .then((res) => res.json())
      .then((data) => {
        console.log("✅ Fetched sales:", data);
        if (Array.isArray(data.sales)) {
          setSales(data.sales);
        } else {
          console.warn("⚠️ Unexpected sales format:", data);
        }
      })
      .catch((err) => {
        console.error("❌ Failed to load listings:", err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  console.log("📦 sales state:", sales);

  return (
    <div className="home-page">
      <h1>Latest Listings</h1>

      {loading && <p>Loading...</p>}

      {!loading && sales.length === 0 && <p>No listings found.</p>}

      {!loading && sales.length > 0 && (
        <ExpandableCardDemoHome sales={sales}/>
      )}
    </div>
  );
};

export default HomeRoute;