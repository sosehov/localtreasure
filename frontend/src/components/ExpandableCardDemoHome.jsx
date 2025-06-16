import React, { useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useOutsideClick } from "@/hooks/use-outside-click";
import { Textarea } from "@/components/ui/textarea"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { IconDots } from "@tabler/icons-react";
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { CreateSalesDialog } from "./CreateSalesDialog";
import { EditSalesDialog } from "./EditSalesDialog";
import { useAuth } from "../contexts/AuthContext";

export function ExpandableCardDemoHome({sales}) {
  const [active, setActive] = useState(null);
  const [sale, setSale] = useState(null);
  const id = useId();
  const ref = useRef(null);
  const [dialogOpen, setDialogOpen] = useState(false)
  const { user } = useAuth();

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
            
          <motion.div
          
            layoutId={`card-${sale.title}-${id}`}
            
            key={sale.title}
            
            onClick={() => setActive(sale)}
            className="p-4 flex flex-col w-full  hover:bg-neutral-50 dark:hover:bg-neutral-800 rounded-xl cursor-pointer">
            <div className="flex gap-4 flex-col  w-full">
              <motion.div layoutId={`image-${sale.title}-${id}`}>
                <img
                  width={100}
                  height={100}
                  src={sale.image_url}
                  alt={sale.title}
                  className="h-60 w-full  rounded-lg object-cover object-top" />
              </motion.div>
              <div className="flex   flex-row justify-between ">
                <motion.h3
                  layoutId={`title-${sale.title}-${id}`}
                  className="font-medium text-neutral-800 dark:text-neutral-200 text-center md:text-left text-base">
                  {sale.title}
                </motion.h3>
              </div>
            </div>
          </motion.div>
        ))}
        </div>
    )}
  }

  return (
    <>
   
      <AnimatePresence>
        {active && typeof active === "object" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/20 h-full w-full z-10" />
        )}
      </AnimatePresence>
      <AnimatePresence>

    
        {active && typeof active === "object" ? (
            
          <div className="fixed inset-0  grid place-items-center z-[100]">
                  
            <motion.button
              key={`button-${active.title}-${id}`}
              layout
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
              onClick={() => setActive(null)}>
              <CloseIcon />
            </motion.button>
            <motion.div
              layoutId={`card-${active.title}-${id}`}
              ref={ref}
              className="w-full max-w-[500px]  h-full md:h-fit md:max-h-[90%]  flex flex-col bg-white dark:bg-neutral-900 sm:rounded-3xl overflow-hidden">
              <motion.div layoutId={`image-${active.title}-${id}`}>
                <img
                  width={200}
                  height={200}
                  src={active.image_url}
                  alt={active.title}
                  className="w-full h-80 lg:h-80 sm:rounded-tr-lg sm:rounded-tl-lg object-cover object-top" />
              </motion.div>

              <div>
                <div className="flex justify-between items-start p-4">
                  <div className="flex flex-col">
                    <div className="flex flex-row gap-5">
                    <motion.h3
                      layoutId={`title-${active.title}-${id}`}
                      className="font-medium text-neutral-700 dark:text-neutral-200 text-base">
                      {active.title}
                    </motion.h3>
                    <p
                    layoutId={`title-${active.price_cents}-${id}`}
                    className="text-neutral-600 dark:text-neutral-400 text-base">
                    ${active.price_cents}
                    </p>
                    </div>
                    <div className="mt-5">
                    <p
                      layoutId={`description-${active.description}-${id}`}
                      className="text-neutral-600 dark:text-neutral-400 text-base">
                      {active.description}
                    </p>
                    </div>

                  </div>

                  <button
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="px-4 py-3 text-sm rounded-full font-bold bg-green-500 text-white">
                    Available
                  </button>
                </div>
                <div className="pt-4 relative px-4">
                  <div
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-neutral-600 text-xs md:text-sm lg:text-base h-40 md:h-fit pb-10 flex flex-col items-start gap-4 overflow-auto dark:text-neutral-400 [mask:linear-gradient(to_bottom,white,white,transparent)] [scrollbar-width:none] [-ms-overflow-style:none] [-webkit-overflow-scrolling:touch]">
                    {typeof active.content === "function"
                      ? active.content()
                      : active.content}
                  </div>
                </div>

{/* To get the user id to message use active.user_id */}
                  <div className="pt-4 relative px-4">
                     <button
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="px-4 py-3 mb-5 text-sm rounded-md font-bold bg-blue-500 text-white">
                    Message {active.name}
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        ) : null}
      </AnimatePresence>
      <ul
        className="max-w-[100%] mx-auto w-full grid grid-cols-1 md:grid-cols-4 items-start gap-4">
            
       {renderSales()}
      </ul>
    </>
  );
}

export const CloseIcon = () => {
  return (
    <motion.svg
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
    </motion.svg>
  );
};


export default ExpandableCardDemoHome;