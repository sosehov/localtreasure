import { useEffect, useState } from "react";
import ExpandableCardDemo from "../../components/ExpandableCardDemo"
const ProfileRoute = ({}) => {


    const [userId, setUserId] = useState('1')
    const [sales, setSales] = useState([])
    const [loading, setLoading] = useState(true)

    const fetchSales = async () => {
            try{
                const response = await fetch(`http://localhost:8080/api/users/sales?user=1`)
                if(!response.ok){
                    throw new Error('Failed to fetch user sales')
                }

                const data = await response.json();
                setSales(data.sales)
            }catch(error){
                console.error('Error fetching sales:', error)
            }finally{
                setLoading(false)
            }
        }

    useEffect(() => {
        console.log("fetching sales")
        
        fetchSales()
    },[userId])

    if (loading) return <div>Loading...</div>;


    return (
         <div className="w-full">
            <ExpandableCardDemo fetchSales={fetchSales} sales={sales}/>
    </div>
    )
}

export default ProfileRoute;
