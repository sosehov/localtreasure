import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogDescription,
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
import { checkEventFields } from "@/lib/errorUtil";


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

  const [errors, setErrors] = useState({});


  useEffect(() => {
    if (defaultValues) {
      setTitle(defaultValues.title || "");
      setAddress(defaultValues.address || "");
      setDescription(defaultValues.description || "");
      setSelectedCategory(defaultValues.category_id || "");
      setStartTime(defaultValues.start_time || "");
      setEndTime(defaultValues.end_time || "");
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

    const newErrors = checkEventFields(
      title,
      startTime,
      endTime,
      date,
      description,
      address,
      selectedCategory,
    );

    console.log(newErrors);
    setErrors(newErrors);

    if (Object.values(newErrors).some((val) => val)) {
      setSubmitting(false);
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
      setStartTime("");
      setEndTime("");
      setDate(null);
      setSelectedCategory("");

      onOpenChange(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange} >
      <form>
        <DialogContent className="sm:max-w-[625px] bg-white" aria-describedby={undefined}>
          <DialogHeader>
            <DialogTitle>Edit Event</DialogTitle>
          </DialogHeader>
          <div className="flex flex-row gap-4">
            <div className="grid gap-3 w-full">
              {errors.title ? (
                <Label htmlFor="name-1" className=" text-[#cb251f]">
                  Title is required
                </Label>
              ) : (
                <Label htmlFor="name-1">Title</Label>
              )}
              <Input
                id="name-1"
                name="name"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className={cn(errors.title ? "border-[#cb251f]" : "")}
              />
            </div>
            <div className="grid gap-3 w-full">
              {errors.date ? (
                <Label htmlFor="date-1" className=" text-[#cb251f]">
                  Date is required
                </Label>
              ) : (
                <Label htmlFor="date-1">Date</Label>
              )}
              <Popover>
                <PopoverTrigger asChild className={cn(errors.date ? "border-[#cb251f]" : "")}>
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
              {errors.startTime ? (
                <Label htmlFor="start-time-picker" className=" text-[#cb251f]">
                  {" "}
                  Start Time is required
                </Label>
              ) : (
                <Label htmlFor="start-time-picker"> Start Time</Label>
              )}
              <Input
                type="time"
                id="start-time-picker"
                step="60"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                className={cn(
                  "bg-background appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none",
                  errors.startTime ? "border-[#cb251f]" : "",
                )}
              />
            </div>

            <div className="flex flex-col gap-3 w-full">
              {errors.endTime ? (
                <Label htmlFor="end-time-picker" className=" text-[#cb251f]">
                  {" "}
                  End Time is required
                </Label>
              ) : (
                <Label htmlFor="end-time-picker"> End Time</Label>
              )}
              <Input
                type="time"
                id="end-time-picker"
                step="60"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                className={cn(
                  "bg-background appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none",
                  errors.startTime ? "border-[#cb251f]" : "",
                )}
              />
            </div>
          </div>

          <div className="flex flex-row gap-4">
            <div className="grid gap-3 w-full">
              {errors.selectedCategory ? (
                <Label htmlFor="category-1" className=" text-[#cb251f]">
                  {" "}
                  Category is required
                </Label>
              ) : (
                <Label htmlFor="category-1"> Category</Label>
              )}
              <Select
                value={selectedCategory}
                onValueChange={setSelectedCategory}
              >
                <SelectTrigger id="category-select" className={cn(
                  "w-full",
                  errors.selectedCategory ? "border-[#cb251f]" : "",
                )}>
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
              {errors.address ? (
                <Label htmlFor="address-1" className=" text-[#cb251f]">
                  {" "}
                  Address is required
                </Label>
              ) : (
                <Label htmlFor="address-1"> Address</Label>
              )}
              <Input
                id="address-1"
                name="address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className={cn(errors.address ? "border-[#cb251f]" : "")}
              />
            </div>
          </div>

          <div className="grid gap-3 w-full">
            {errors.description ? (
              <Label htmlFor="description-1" className=" text-[#cb251f]">
                {" "}
                Description is required
              </Label>
            ) : (
              <Label htmlFor="description-1"> Description</Label>
            )}
            <Textarea
              id="description-1"
              name="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className={cn(errors.description ? "border-[#cb251f]" : "")}
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
