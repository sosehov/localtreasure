import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function EditSalesDialog({ open, onOpenChange, defaultValues }) {
  const [photoFile, setPhotoFile] = useState(null);
  const [photoUrl, setPhotoUrl] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [categories, setCategories] = useState([]);

  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  // Sync internal state when defaultValues change
  useEffect(() => {
    if (defaultValues) {
      setTitle(defaultValues.title || "");
      setPrice(defaultValues.price_cents || "");
      setDescription(defaultValues.description || "");
      setSelectedCategory(defaultValues.category_id || "");
      setPhotoUrl(defaultValues.image_url || null);
      setPhotoFile(null); // Clear file input
    }
  }, [defaultValues]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/users/categories");
        const data = await response.json();
        setCategories(data.categories);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, []);

  const handlePhotoChange = (e) => {
    const file = e.target.files?.[0];
    if (file) setPhotoFile(file);
  };

  const handleUploadPhoto = async () => {
    if (!photoFile) return null;

    setUploading(true);
    const url = "https://api.cloudinary.com/v1_1/dmpuzi0ux/upload";
    const formData = new FormData();
    formData.append("file", photoFile);
    formData.append("upload_preset", "final-project");

    try {
      const response = await fetch(url, { method: "POST", body: formData });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error?.message || "Upload failed");
      return data.secure_url;
    } catch (error) {
      console.error("Upload failed:", error);
      return null;
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async () => {
    setSubmitting(true);

    let photoUrlToUse = photoUrl;
    if (photoFile) {
      const uploadedUrl = await handleUploadPhoto();
      if (uploadedUrl) photoUrlToUse = uploadedUrl;
    }

    if (!selectedCategory) {
      alert("Please select a category.");
      setSubmitting(false);
      return;
    }

    const payload = {
      ...defaultValues,
      title,
      price: parseFloat(price).toFixed(2),
      category_id: selectedCategory,
      description,
      image_url: photoUrlToUse,
    };

    console.log(payload)

    try {
      const res = await fetch("http://localhost:8080/api/users/updateSale", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Failed to update sale");
      console.log("Sale updated!");
      onOpenChange(false);
      window.location.reload();
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[625px] bg-white">
        <DialogHeader>
          <DialogTitle>Edit Listing</DialogTitle>
        </DialogHeader>

        <div className="flex flex-row gap-4">
          <div className="grid gap-3 w-full">
            <Label htmlFor="name">Name</Label>
            <Input id="name" value={title} onChange={(e) => setTitle(e.target.value)} />
          </div>
          <div className="grid gap-3 w-full">
            <Label htmlFor="price">Price</Label>
            <Input id="price" type="number" value={price} onChange={(e) => setPrice(e.target.value)} />
          </div>
        </div>

        <div className="flex flex-row gap-4">
          <div className="grid gap-3 w-full">
            <Label htmlFor="category">Category</Label>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-full">
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
          <div className="grid gap-3 w-full">
            <Label htmlFor="photo">Photo</Label>
            <Input id="photo" type="file" accept="image/*" onChange={handlePhotoChange} />
          </div>
        </div>

        <div className="grid gap-3 w-full">
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button onClick={handleSubmit} disabled={uploading || submitting}>
            {uploading || submitting ? "Saving..." : "Update"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
