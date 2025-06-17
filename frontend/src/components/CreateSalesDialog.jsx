import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { useAuth } from "../contexts/AuthContext"

export function CreateSalesDialog({fetchSales, open, onOpenChange}) {
  const { user, makeAuthenticatedRequest } = useAuth();
    
  const [photoFile, setPhotoFile] = useState(null);
  const [photoUrl, setPhotoUrl] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await makeAuthenticatedRequest("/api/users/categories");
        if (!response.ok) throw new Error("Failed to fetch categories");
        const data = await response.json();
        setCategories(data.categories);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, [makeAuthenticatedRequest]);

  //photo handling
  const handlePhotoChange = (e) => {
    const file = e.target.files?.[0];
    if (file) setPhotoFile(file);
  };

const handleUploadPhoto = async () => {
  if (!photoFile) return null;

  setUploading(true);

  const url = `https://api.cloudinary.com/v1_1/dmpuzi0ux/upload`;

  const formData = new FormData();
  formData.append("file", photoFile);
  formData.append("upload_preset", "final-project");

  try {
    const response = await fetch(url, {
      method: "POST",
      body: formData,
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("Upload failed response:", data);
      throw new Error(data.error?.message || "Upload failed");
    }

    console.log("Upload result:", data);
    return data.secure_url;
  } catch (error) {
    console.error("Upload failed catch:", error);
    return null;
  } finally {
    setUploading(false);
  }
};

  const handleSubmit = async () => {
    setSubmitting(true);

    console.log('creating..')
    
    let photoUrlToUse = photoUrl;


  if (photoFile && !photoUrl) {
    const uploadedUrl = await handleUploadPhoto();
    photoUrlToUse = uploadedUrl;
  }

if (!selectedCategory) {
  alert("Please select a category.");
  return;
}

    const payload = {
    title,
      price: parseFloat(price).toFixed(2),
      category_id: selectedCategory,
      description,
      image_url: photoUrlToUse,
      user_id: user.id,
    };

    try {
      const res = await makeAuthenticatedRequest("/api/sales/createSale", {
        method: "POST",
        body: JSON.stringify(payload),
      });

        if (!res.ok) throw new Error("Failed to create sale");
        console.log("Sale created!");
    } catch (err) {
        console.error(err);
    } finally {
       setSubmitting(false);
       fetchSales()
       setTitle("")
       setDescription("")
       setPrice("")
       setPhotoFile(null)
       setPhotoUrl("")
       setSelectedCategory(null)
       
onOpenChange(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <form >
        <DialogContent className="sm:max-w-[625px] bg-white">
          <DialogHeader>
            <DialogTitle>Create listing</DialogTitle>
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

          <div className="flex flex-row gap-4">
            <div className="grid gap-3 w-full">
              <Label htmlFor="category-1">Category</Label>
              <Select onValueChange={setSelectedCategory}>
                <SelectTrigger id="category-select" className="w-full">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent className="bg-white">
                  {categories.map((cat) => (
                    <SelectItem key={cat.id} value={cat.id}>
                      {cat.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-3 w-full z-40">
              <Label htmlFor="picture">Photo</Label>
              <Input className="z-40" id="picture" name="photo" type="file" accept="image/png, image/gif, image/jpeg" onChange={handlePhotoChange} />
            </div>
          </div>

          <div className="grid gap-3 w-full">
            <Label htmlFor="description-1">Description</Label>
            <Textarea id="description-1" name="description"   value={description}
              onChange={(e) => setDescription(e.target.value)}/>
          </div>

          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit" disabled={uploading} onClick={handleSubmit}>
               {uploading || submitting ? "Saving..." : "Create"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
}
