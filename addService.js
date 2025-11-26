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
    if (!name || !price || !description) {
      alert("Please fill in all required fields!");
      return;
    }

    if (/^[0-9]/.test(name)) {
      alert("Name cannot start with a number!!");
      return;
    }

    if (isNaN(price)) {
      alert("Price must be a valid number!");
      return;
    }

    if (Number(price) <= 0) {
      alert("Price can't be negative!!");
      return;
    }

    // Handle photo upload
    if (photoInput.files.length > 0) {
      const file = photoInput.files[0];
      
      // Check file size
      if (file.size > 2 * 1024 * 1024) {
        alert("Image size should be less than 2MB!");
        return;
      }

      // Convert image to Data URL
      const reader = new FileReader();
      reader.onload = function(e) {
        // Save to localStorage after image is loaded
        saveService(name, price, description, e.target.result);
      };
      reader.readAsDataURL(file);
    } else {
      // No photo selected
      saveService(name, price, description, null);
    }
  });

  function saveService(name, price, description, photoData) {
    // Load old services
    let services = JSON.parse(localStorage.getItem("services")) || [];

    // Create new service object
    const newService = {
      name: name,
      price: price,
      description: description,
      photo: photoData // Store the actual image data
    };

    // Add new service to the array
    services.push(newService);

    // Save updated data
    localStorage.setItem("services", JSON.stringify(services));

    // Success message
    alert(`Service "${name}" has been added successfully!`);

    // Clear form and redirect
    form.reset();
    setTimeout(() => {
      window.location.href = "ServiceProvider.html";
    }, 1000);
  }
});

