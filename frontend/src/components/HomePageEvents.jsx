import  { useId } from "react";
import { cn } from "@/lib/utils"

export function HomePageEvents({ events, setActive, isCalander}) {

   const id = useId();

   const renderEvents = () => {
    if (events === undefined || events.length == 0 || events === null) {
      return <div>No events created yet</div>;
    } else {
      return (

        <div className={cn("grid  ", isCalander ? "grid-cols-4 w-[60vw]" : "grid-cols-6 w-[90vw]")}>
          {events.map((event, index) => (
            <div
              key={`${event.title}-events-${index}`}
              onClick={() => setActive(event)}
              className="p-4 flex flex-col w-full  hover:bg-neutral-50 dark:hover:bg-neutral-800 rounded-xl cursor-pointer"
            >
              <div className="flex gap-4 flex-col  w-full">
                <div >
                  <img
                    width={100}
                    height={100}
                    src={
                      "https://cdn-cjhkj.nitrocdn.com/krXSsXVqwzhduXLVuGLToUwHLNnSxUxO/assets/images/optimized/rev-d98e8d7/spotme.com/wp-content/uploads/2020/07/Hero-1.jpg"
                    }
                    alt={event.title}
                    className="h-60 w-full  rounded-lg object-cover object-top"
                  />
                </div>
                <div className="flex   flex-row justify-between ">
                  <h3
                    className="font-medium text-neutral-800 dark:text-neutral-200 text-center md:text-left text-base"
                  >
                    {event.title} {isCalander ? <> - {new Date(event.date).toDateString()} </> : <></>}
                  </h3>
                 
                </div>
              </div>
            </div>
          ))}
        </div>
      );
    }
  };

  return (
       <ul
        className="max-w-[100%] mx-auto w-full grid grid-cols-1 md:grid-cols-4 items-start gap-4">
            
        {renderEvents()}
      </ul>
  );
}



export default HomePageEvents;