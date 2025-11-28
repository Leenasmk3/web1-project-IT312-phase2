document.addEventListener("DOMContentLoaded", function () {
  var form = document.querySelector(".addService-form");

  form.addEventListener("submit", function (e) {
    e.preventDefault(); 
 
    // get fields
let name = form.querySelector("input[name='name']").value.trim();
let price = form.querySelector("input[name='Price']").value.trim();
let photoInput = form.querySelector("input[name='photo']");
let description = form.querySelector("textarea[name='message']").value.trim();


// Collect missing fields
let missing = [];
if (!name) missing.push("Name");
if (!price) missing.push("Price");
if (!description) missing.push("Description");

//alert missing field
    var photoSelected = photoInput && photoInput.files && photoInput.files.length > 0;
    if (!photoSelected) missing.push("Photo");

    if (missing.length > 0) {
      var plural = missing.length > 1 ? "fields are" : "field is";
      alert("The following required " + plural + " missing:\n\n- " + missing.join("\n- "));
      return;  // stop form
    }

    // Using RegEx to check if name starts with number
    if (/^[0-9]/.test(name)) {
      alert("Name cannot start with a number!");
      return;
    }

    
    if (isNaN(price)) {
      alert("Price must be a valid number!");
      return;
    }

    if (Number(price) <= 0) {
      alert("Price can't be negative!");
      return;
    }

   
    if (photoInput.files.length > 0) {
      var file = photoInput.files[0];
      
      // Check file size
      if (file.size > 2 * 1024 * 1024) {
        alert("Image size should be less than 2MB!");
        return;
      }

      // Convert image FileReader
      var reader = new FileReader();
      reader.onload = function(e) {
        saveService(name, price, description, e.target.result);
      };
      reader.readAsDataURL(file);
    } else {
      // No photo selected
      saveService(name, price, description, null);
    }
  });

  function saveService(name, price, description, photoData) {
    var services = JSON.parse(localStorage.getItem("services")) || [];

    // Create new service object 
    var newService = {
      name: name,
      price: price,
      description: description,
      photo: photoData
    };

    // Add new service to the array 
    services.push(newService);

    localStorage.setItem("services", JSON.stringify(services));

   
    alert("Service \"" + name + "\" has been added successfully!");

    // Clear form and redirect
    form.reset();
    setTimeout(function() {
      window.location.href = "ServiceProvider.html";
    }, 1000);
  }
});
