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

export function ExpandableCardDemo({sales}) {
  const [active, setActive] = useState(null);
  const [sale, setSale] = useState(null);
  const id = useId();
  const ref = useRef(null);
  const [dialogOpen, setDialogOpen] = useState(false)
  const [userId, setUserId] = useState('1')

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

  const handleEditDialog = (e, editSale) => {
      e.stopPropagation();
    setSale(editSale)
    setDialogOpen(true)
  }

const handleDeleteSale = async ( e, saleId) => {
  e.stopPropagation();

  try {
    const res = await fetch("http://localhost:8080/api/users/deleteSale", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ saleId, 'user_id': userId }),
    });

    if (!res.ok) throw new Error("Failed to delete sale");
    console.log("Sale deleted!");

    // Refresh page or state
    window.location.reload();
  } catch (err) {
    console.error(err);
  }
};

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
                  src={sale.photo_id}
                  alt={sale.title}
                  className="h-60 w-full  rounded-lg object-cover object-top" />
              </motion.div>
              <div className="flex   flex-row justify-between ">
                <motion.h3
                  layoutId={`title-${sale.title}-${id}`}
                  className="font-medium text-neutral-800 dark:text-neutral-200 text-center md:text-left text-base">
                  {sale.title}
                </motion.h3>
                <DropdownMenu>
  <DropdownMenuTrigger onClick={(e)=> e.stopPropagation()}><IconDots className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200"/></DropdownMenuTrigger>
  <DropdownMenuContent className="bg-white">
    <DropdownMenuLabel>Actions</DropdownMenuLabel>
    <DropdownMenuSeparator />
    <DropdownMenuItem onClick={(e)=>  handleEditDialog(e, sale)}>Edit</DropdownMenuItem>
    <DropdownMenuItem onClick={(e)=> handleDeleteSale(e, sale.id)}>Delete</DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>
              </div>
            </div>
          </motion.div>
        ))}
        </div>
    )}
  }

  const handleStatusChange = async () => {

    const payload = {
      ...active,
      is_sold:!active.is_sold
    };

    try {
      const res = await fetch("http://localhost:8080/api/users/updateSale", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Failed to update sale");
      console.log("Sale updated!");
      window.location.reload();
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <>
    <CreateSalesDialog/>
    <EditSalesDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        defaultValues={sale}
      />

   
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


        {/* <Dialog open={dialogOpen} onOpenChange={setDialogOpen} className="bg-white">
      <form>
        <DialogContent className="sm:max-w-[425px] bg-white" >
          <DialogHeader>
            <DialogTitle>Edit listing</DialogTitle>
          </DialogHeader>
          <div className="flex flex-row gap-4">
            <div className="grid gap-3 w-full">
              <Label htmlFor="name-1">Name</Label>
              <Input id="name-1" name="name"    value={title}
                onChange={(e) => setTitle(e.target.value)}/>
            </div>
            <div className="grid gap-3 w-full">
              <Label htmlFor="price-1">Price</Label>
              <Input id="price-1" name="price" type="number" value={price}
                onChange={(e) => setPrice(e.target.value)} />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit">Save changes</Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog> */}

    
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
                  src={active.photo_id}
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
                    <motion.p
                    layoutId={`title-${active.price}-${id}`}
                    className="text-neutral-600 dark:text-neutral-400 text-base">
                    ${active.price}
                    </motion.p>
                    </div>
                    <div className="mt-5">
                    <motion.p
                      layoutId={`description-${active.description}-${id}`}
                      className="text-neutral-600 dark:text-neutral-400 text-base">
                      {active.description}
                    </motion.p>
                    </div>

                  </div>

                  <motion.button
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={handleStatusChange}
                    className="px-4 py-3 text-sm rounded-full font-bold bg-green-500 text-white">
                    {active.is_sold == false ? 'Mark as sold' : 'Sold' }
                  </motion.button>
                </div>
                <div className="pt-4 relative px-4">
                  <motion.div
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-neutral-600 text-xs md:text-sm lg:text-base h-40 md:h-fit pb-10 flex flex-col items-start gap-4 overflow-auto dark:text-neutral-400 [mask:linear-gradient(to_bottom,white,white,transparent)] [scrollbar-width:none] [-ms-overflow-style:none] [-webkit-overflow-scrolling:touch]">
                    {typeof active.content === "function"
                      ? active.content()
                      : active.content}
                  </motion.div>
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


export default ExpandableCardDemo;