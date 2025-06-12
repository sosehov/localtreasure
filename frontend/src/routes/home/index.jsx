import React from 'react';
import { useEffect, useState } from "react";

const HomeRoute = () => {
  const [sales, setSales] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/users/allSales")
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
        <ul>
          {sales.map((sale) => (
            <li key={sale.id}>
              <h3>{sale.title}</h3>
              <p>{sale.description}</p>
              <p>${(Number(sale.price_cents) / 100).toFixed(2)}</p>
              {sale.image_url && (
                <img
                  src={sale.image_url}
                  alt={sale.title}
                  style={{ width: "150px" }}
                />
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default HomeRoute;