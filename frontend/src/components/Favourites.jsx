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

  const addFavourite = (e, userId, itemId) => {
    e.preventDefault();
    fetch('http://localhost:8080/api/favourites', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ item : {
            userId, 
            itemId 
          }
        })
      })
      .then(res => console.log('favourites add status:', res))
    };
  
  return (
    <ul>
      {favouriteItems.map(item => (
        <span key={item.id}>{item.title}</span>
      ))}  
    </ul>
  )
}

export default Favourites;