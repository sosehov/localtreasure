import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

import { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAuth } from "../contexts/AuthContext";

import { format, isBefore, startOfDay } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export function EditEventsDialog({
  open,
  onOpenChange,
  defaultValues,
  fetchEvents,
}) {
  const { user, makeAuthenticatedRequest } = useAuth();

  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const [title, setTitle] = useState("");
  const [address, setAddress] = useState("");
  const [description, setDescription] = useState("");
  const [startTime, setStartTime] = useState("10:30");
  const [endTime, setEndTime] = useState("22:30");
  const [date, setDate] = useState("");

  useEffect(() => {
    if (defaultValues) {
      setTitle(defaultValues.title || "");
      setAddress(defaultValues.address || "");
      setDescription(defaultValues.description || "");
      setSelectedCategory(defaultValues.category_id || "");
      setStartTime(defaultValues.start_time || null);
      setEndTime(defaultValues.end_time || null);
      setDate(defaultValues.date || null);
    }
  }, [defaultValues]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await makeAuthenticatedRequest(
          `/api/users/categories`,
        );

        if (!response.ok) {
          throw new Error("Failed to fetch categories");
        }
        const data = await response.json();
        setCategories(data.categories);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  const handleSubmit = async () => {
    setSubmitting(true);

    console.log("creating..");

    if (!selectedCategory) {
      alert("Please select a category.");
      return;
    }

    const payload = {
      user_id: user.id,
      title,
      description,
      address,
      start_time: startTime,
      end_time: endTime,
      date,
      category_id: selectedCategory,
      event_id: defaultValues.event_id,
    };

    try {
      const res = await makeAuthenticatedRequest(
        `/api/user-events/updateEvent`,
        {
          method: "POST",
          body: JSON.stringify(payload),
        },
      );

      if (!res.ok) throw new Error("Failed to create event");
      console.log("Event created!");
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);

      fetchEvents();
      setTitle("");
      setDescription("");
      setStartTime(null);
      setEndTime(null);
      setDate(null);
      setSelectedCategory(null);

      onOpenChange(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <form>
        <DialogContent className="sm:max-w-[625px] bg-white">
          <DialogHeader>
            <DialogTitle>Edit Event</DialogTitle>
          </DialogHeader>
          <div className="flex flex-row gap-4">
            <div className="grid gap-3 w-full">
              <Label htmlFor="name-1">Name</Label>
              <Input
                id="name-1"
                name="name"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className="grid gap-3 w-full">
              <Label htmlFor="price-1">Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    data-empty={!date}
                    className="data-[empty=true]:text-muted-foreground w-[280px] justify-start text-left font-normal"
                  >
                    <CalendarIcon />
                    {date ? format(date, "PPP") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>

                <PopoverContent className="w-auto p-0 bg-white">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    disabled={(date) =>
                      isBefore(startOfDay(date), startOfDay(new Date()))
                    }
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>

          <div className="flex flex-row gap-4">
            <div className="flex flex-col gap-3 w-full">
              <Label htmlFor="start-time-picker" className="px-1">
                Start Time
              </Label>
              <Input
                type="time"
                id="start-time-picker"
                step="60"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                className="bg-background appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
              />
            </div>

            <div className="flex flex-col gap-3 w-full">
              <Label htmlFor="end-time-picker" className="px-1">
                End Time
              </Label>
              <Input
                type="time"
                id="end-time-picker"
                step="60"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                className="bg-background appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
              />
            </div>
          </div>

          <div className="flex flex-row gap-4">
            <div className="grid gap-3 w-full">
              <Label htmlFor="category-1">Category</Label>
              <Select
                value={selectedCategory}
                onValueChange={setSelectedCategory}
              >
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
          </div>

          <div className="flex flex-row gap-4">
            <div className="grid gap-3 w-full">
              <Label htmlFor="address-1">Address</Label>
              <Input
                id="address-1"
                name="address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>
          </div>

          <div className="grid gap-3 w-full">
            <Label htmlFor="description-1">Description</Label>
            <Textarea
              id="description-1"
              name="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit" disabled={submitting} onClick={handleSubmit}>
              {submitting ? "Saving..." : "Edit"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
}
