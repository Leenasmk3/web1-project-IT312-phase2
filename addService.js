
document.addEventListener("DOMContentLoaded", function () {
  
  const form = document.querySelector(".addService-form");

  form.addEventListener("submit", function (e) {
    e.preventDefault(); 

    // Get form values
    const name = form.querySelector("input[name='name']").value.trim();
    const price = form.querySelector("input[name='Price']").value.trim();
    const description = form.querySelector("textarea[name='message']").value.trim();
    const photoInput = form.querySelector("input[name='photo']");
    
  
    // VALIDATION
 

    // Check for empty fields
    if (!name || !price || !description) {
      alert(" Please fill in all required fields!");
      return;
    }

    // Name must not start with a number
    if (/^[0-9]/.test(name)) {
      alert(" Name cannot start with a number!!");
      return;
    }

    // Price must be a valid number
if (isNaN(price)) {
  alert("Price must be a valid number!");
  return;
}

// Price cannot be negative or zero
if (Number(price) <= 0) {
  alert("Price can't be negative!!");
  return;
}


   
    // SAVE TO LOCAL STORAGE
   

    // Load old services (if any)
    let services = JSON.parse(localStorage.getItem("services")) || [];

    // Convert photo to a stored filename
    let photoName = photoInput.files.length > 0 
      ? photoInput.files[0].name 
      : "No image";

    // Create new service object
    const newService = {
      name: name,
      price: price,
      description: description,
      photo: photoName
    };

    // Add new service to the array
    services.push(newService);

    // Save updated data
    localStorage.setItem("services", JSON.stringify(services));

    // Success message
    alert(`Service "${name}" has been added successfully!`);

    // Clear form
    form.reset();
  });
});
