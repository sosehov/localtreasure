import { Button } from "@/components/ui/button"
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
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { put } from "@vercel/blob";


export function CreateSalesDialog() {
  return (
    <Dialog>
     <form>
            <DialogTrigger asChild>
                  <Button variant="outline">Create</Button>
                </DialogTrigger>
             <DialogContent className="sm:max-w-[625px] bg-white" >
               <DialogHeader>
                 <DialogTitle>Create listing</DialogTitle>
               </DialogHeader>
               <div className="flex flex-row gap-4">
                 <div className="grid gap-3 w-full">
                   <Label htmlFor="name-1">Name</Label>
                   <Input id="name-1" name="name"  />
                 </div>
                 <div className="grid gap-3 w-full">
                   <Label htmlFor="price-1">Price</Label>
                   <Input id="price-1" name="price"  />
                 </div>
               </div>

                 <div className="flex flex-row gap-4">
                    <div className="grid gap-3 w-full">
                   <Label htmlFor="category-1">Category</Label>
                   <Input id="category-1" name="category"  />
                 </div>
                 <div className="grid gap-3 w-full">
                   <Label htmlFor="price-1">Photo</Label>
                     <Input id="picture" type="file" />
                 </div>
               </div>

           
                 <div className="grid gap-3 w-full">
                   <Label htmlFor="description-1">Description</Label>
                   <Textarea id="category-1" name="category"  />
                 </div>
               <DialogFooter>
                 <DialogClose asChild>
                   <Button variant="outline">Cancel</Button>
                 </DialogClose>
                 <Button type="submit">Save changes</Button>
               </DialogFooter>
             </DialogContent>
           </form>
    </Dialog>
  )
}