import { useEffect, useState } from "react";
import ExpandableCardDemoHome from "../../components/ExpandableCardDemoHome";
import { useAuth } from "../../contexts/AuthContext";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
if (!API_BASE_URL) {
  throw new Error("VITE_API_BASE_URL is not defined in your .env file.");
}

const HomeRoute = () => {
  const [sales, setSales] = useState([]);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  const { token } = useAuth();

  const fetchSales = () => {
    fetch(`${API_BASE_URL}/sales/allSales`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
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
  }

  const fetchEvents = () => {
    fetch(`${API_BASE_URL}/user-events/allEvents`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("✅ Fetched events:", data);
        if (Array.isArray(data.events)) {
          setEvents(data.events);
        } else {
          console.warn("⚠️ Unexpected events format:", data);
        }
      })
      .catch((err) => {
        console.error("❌ Failed to load events:", err);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  useEffect(() => {
    fetchSales()
    fetchEvents()
  }, [token]);

  return (
    <div className="home-page pt-6">
      {loading && <p>Loading...</p>}

      {!loading && sales.length === 0 && <p>No listings found.</p>}

      {!loading && sales.length > 0 && <ExpandableCardDemoHome sales={sales} events={events} />}
    </div>
  );
};

export default HomeRoute;
