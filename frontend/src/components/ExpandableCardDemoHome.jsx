import{ useEffect, useId, useRef, useState } from "react";
import { AnimatePresence } from "motion/react";
import { useOutsideClick } from "@/hooks/use-outside-click";
import { format, setHours, setMinutes, setSeconds } from "date-fns";
import { Link } from "react-router";
import { encodeId } from '../util/hashFuncs';

import HomePageEvents from "./HomePageEvents";
import HomePageSales from "./HomePageSales";

export function ExpandableCardDemoHome({sales, events, isCalander}) {
  const [active, setActive] = useState(null);
  const id = useId();
  const ref = useRef(null);


  useEffect(() => {
    function onKeyDown(event) {
      if (event.key === "Escape") {
        setActive(false);
      }
    }

    if (active && typeof active === "object") {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [active]);

  useOutsideClick(ref, () => setActive(null));


  const formatTime = (timeString) => {
      const [hours, minutes, seconds] = timeString.split(":").map(Number);
  
      // Create a date and set the time
      let date = new Date();
      date = setHours(date, hours);
      date = setMinutes(date, minutes);
      date = setSeconds(date, seconds);
  
      // Format to 12-hour time with AM/PM
      const formattedTime = format(date, "h:mm a");
      return formattedTime;
    };


  return (
    <>
   
      <AnimatePresence>
        {active && typeof active === "object" && (
          <div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/20 h-full w-full z-10" />
        )}
      </AnimatePresence>
      <AnimatePresence>

    
        {active && typeof active === "object" ? (
                  <div className="fixed inset-0  grid place-items-center z-[100]">
                    <button
                      key={`button-${active.title}-${id}`}
                      initial={{
                        opacity: 0,
                      }}
                      animate={{
                        opacity: 1,
                      }}
                      exit={{
                        opacity: 0,
                        transition: {
                          duration: 0.05,
                        },
                      }}
                      className="flex absolute top-2 right-2 lg:hidden items-center justify-center bg-white rounded-full h-6 w-6"
                      onClick={() => setActive(null)}
                    >
                      <CloseIcon />
                    </button>
                    <div
                      ref={ref}
                      className="w-full max-w-[500px]  h-full md:h-fit md:max-h-[90%]  flex flex-col bg-white dark:bg-neutral-900 sm:rounded-3xl overflow-hidden"
                    >
                      <div >
                        <img
                          width={200}
                          height={200}
                          src={
                            active.image_url
                              ? active.image_url
                              : "https://cdn-cjhkj.nitrocdn.com/krXSsXVqwzhduXLVuGLToUwHLNnSxUxO/assets/images/optimized/rev-d98e8d7/spotme.com/wp-content/uploads/2020/07/Hero-1.jpg"
                          }
                          alt={active.title}
                          className="w-full h-80 lg:h-80 sm:rounded-tr-lg sm:rounded-tl-lg object-cover object-top"
                        />
                      </div>
        
                      <div>
                        <div className="flex justify-between items-start p-4">
                          <div className="flex flex-col">
                            <div className="flex flex-row gap-5">
                              <h3
                                className="font-medium text-neutral-700 dark:text-neutral-200 text-base"
                              >
                                {active.title}
                              </h3>
        
                              {active.price_cents ? (
                                <p
                                  className="text-neutral-600 dark:text-neutral-400 text-base"
                                >
                                  ${active.price_cents}
                                </p>
                              ) : (
                                <></>
                              )}
                            </div>
        
                            <div className="mt-5">
                              {active.date ? (
                                <span
                                  className="text-neutral-600 dark:text-neutral-400 text-base"
                                >
                                  On {format(new Date(active.date), "MMMM d, yyyy")}
                                </span>
                              ) : (
                                <></>
                              )}
                              {active.start_time ? (
                                <span
                                  className="text-neutral-600 dark:text-neutral-400 text-base"
                                >
                                  &nbsp; From {formatTime(active.start_time)} -
                                </span>
                              ) : (
                                <></>
                              )}
                              {active.end_time ? (
                                <span
                                  className="text-neutral-600 dark:text-neutral-400 text-base"
                                >
                                  &nbsp; To {formatTime(active.end_time)}
                                </span>
                              ) : (
                                <></>
                              )}
                            </div>
        
                            <div className="flex flex-row gap-5">
                              {active.address ? (
                                <span
                                  className="text-neutral-600 dark:text-neutral-400 text-base"
                                >
                                  At {active.address}
                                </span>
                              ) : (
                                <></>
                              )}
                            </div>
        
                            <div className="mt-5">
                              <p
                                className="text-neutral-600 dark:text-neutral-400 text-base"
                              >
                                {active.description}
                              </p>
                            </div>
                          </div>
        
                          {active.price_cents ? (
                         <button
                    
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="px-4 py-3 text-sm rounded-full font-bold bg-green-500 text-white">
                    Available
                  </button>
                          ) : (
                            <></>
                          )}
                        </div>
                        <div className="pt-4 relative px-4">
                          <div
                            
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="text-neutral-600 text-xs md:text-sm lg:text-base h-40 md:h-fit pb-10 flex flex-col items-start gap-4 overflow-auto dark:text-neutral-400 [mask:linear-gradient(to_bottom,white,white,transparent)] [scrollbar-width:none] [-ms-overflow-style:none] [-webkit-overflow-scrolling:touch]"
                          >
                            {typeof active.content === "function"
                              ? active.content()
                              : active.content}
                          </div>

                          { isCalander ? <></> : 
                  <div className="pt-4 relative px-4">
                    <Link to={`/messages?receiver_id=${encodeId(active.user_id)}`}>
                      <button
                        
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="px-4 py-3 mb-5 text-sm rounded-md font-bold bg-blue-500 text-white">
                        Message {active.name}
                      </button>
                    </Link>
                </div>
                }
                        </div>
                      </div>
                    </div>
                  </div>
                ) : null}
      </AnimatePresence>
    
{ sales ? 
      <div>
        <p className="ml-4 text-lg font-bold">Latest Listings</p>
        <ul className="max-w-[100%] mx-auto w-full grid grid-cols-1 md:grid-cols-4 items-start gap-4">
          <HomePageSales sales={sales} setActive={setActive} isProfilePage={false}/>
        </ul>
      </div> : <></>}

      
{ events ? 
       <div>
        {isCalander ? <></> : <p className="ml-4 text-lg font-bold">Latest Events</p>}
        <ul className="max-w-[100%] mx-auto w-full grid grid-cols-1 md:grid-cols-4 items-start gap-4">
           <HomePageEvents events={events} setActive={setActive} isCalander={isCalander}/>
        </ul>
      </div>: <></>}

       
     
    </>
  );
}

export const CloseIcon = () => {
  return (
    <svg
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
      }}
      exit={{
        opacity: 0,
        transition: {
          duration: 0.05,
        },
      }}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4 text-black">
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M18 6l-12 12" />
      <path d="M6 6l12 12" />
    </svg>
  );
};


export default ExpandableCardDemoHome;