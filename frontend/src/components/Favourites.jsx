import { useState, useEffect} from 'react';

const Favourites = () => {
  // const { user } = useAuth();
  const user = {
    id: 1,
    name : 'Alice Henderson'
  };

  const [favouriteItems, setFavouriteItems] = useState([]);

  // fetch favourites from db
  useEffect(() => {
    const fetchFavourites = async () => {
      try {
        const fetchURL = `http://localhost:8080/api/favourites?userId=${user.id}`
        const response = await fetch(fetchURL, {
          method: "GET"
      });
        const data = await response.json();
        setFavouriteItems(data.items);
        console.log('favourites after fetch:', data);
      } catch (error) {
        console.error("Error fetching favourites:", error);
      }
    };
    
    fetchFavourites();
  }, []);
  
  return (
    <ul>
      {favouriteItems.map(item => (
        <span key={item.id}>{item.title}</span>
      ))}  
    </ul>
  )
}

export default Favourites;