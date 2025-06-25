import { useId } from "react";

export function HomePageSales({ sales, setActive}) {

   const id = useId();

   const renderSales = () => {
      if(sales === undefined || sales.length == 0 || sales === null){
          return(
              <div>
                  No sales created yet
              </div>
          )
      }else{
          return(
              <div className="grid grid-cols-6 w-[90vw]"> 
               {sales.map((sale, index) => (
              
            <div
            
              
              key={sale.title}
              
              onClick={() => setActive(sale)}
              className="p-4 flex flex-col w-full  hover:bg-neutral-100  rounded-xl cursor-pointer">
              <div className="flex gap-4 flex-col  w-full">
                <div >
                  <img
                    width={100}
                    height={100}
                    src={sale.image_url}
                    alt={sale.title}
                    className="h-60 w-full  rounded-lg object-cover object-top" />
                </div>
                <div className="flex   flex-row justify-between ">
                  <h3
                    className="font-medium text-neutral-800  text-center md:text-left text-base">
                    {sale.title}
                  </h3>
                </div>
              </div>
            </div>
          ))}
          </div>
      )}
    }

  return (
       <ul
        className="max-w-[100%] mx-auto w-full grid grid-cols-1 md:grid-cols-4 items-start gap-4">
            
        {renderSales()}
      </ul>
  );
}



export default HomePageSales;