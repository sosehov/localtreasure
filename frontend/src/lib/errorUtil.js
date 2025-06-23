export function checkEventFields(title, startTime, endTime, date, description, address, selectedCategory) {
  const isEmpty = (value) => value === "" || value == null;

  const newErrors = {};

  if (isEmpty(title)) newErrors.title = true;
  if (isEmpty(startTime)) newErrors.startTime = true;
  if (isEmpty(endTime)) newErrors.endTime = true;
  if (isEmpty(date)) newErrors.date = true;
  if (isEmpty(description)) newErrors.description = true;
  if (isEmpty(address)) newErrors.address = true;
  if (isEmpty(selectedCategory)) newErrors.selectedCategory = true;

  return newErrors;
}


export function checkSalesFields(title, description, selectedCategory, price, photoUrl) {
  const isEmpty = (value) => value === "" || value == null;

  const newErrors = {};

  if (isEmpty(title)) newErrors.title = true;
  if (isEmpty(description)) newErrors.description = true;
  if (isEmpty(selectedCategory)) newErrors.selectedCategory = true;
  if (isEmpty(price)) newErrors.price = true;
  if (isEmpty(photoUrl)) newErrors.photoUrl = true;
  
  return newErrors;
}