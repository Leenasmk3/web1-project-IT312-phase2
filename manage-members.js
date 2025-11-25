
// DELETE STAFF MEMBERS


// When the delete form is submitted...
document.getElementById("deleteForm").onsubmit = function (e) {
    e.preventDefault(); // Prevents page reload on submit

    // Get all checkboxes that are selected
    const selectedMembers = document.querySelectorAll('input[name="member"]:checked');

    // If no staff member is selected, show a warning
    if (selectedMembers.length === 0) {
        alert("Please select at least one staff member to delete.");
        return;
    }

    // Ask the user for confirmation before deleting
    const confirmDelete = confirm("Are you sure you want to delete the selected staff member(s)?");
    if (!confirmDelete) return;

    // Loop through all selected checkboxes
    // Remove the entire list row that contains the staff member
    selectedMembers.forEach(cb => {
        const row = cb.closest(".member-row"); // Finds the parent <li>
        if (row) {
            row.remove(); // Removes the staff member from the page
        }
    });
};




// ADD NEW STAFF MEMBER


// When the add form is submitted...
document.getElementById("addForm").onsubmit = function (e) {
    e.preventDefault(); // Prevent page reload

    // Read all field values from the form
    const name   = document.getElementById("newName").value.trim();
    const email  = document.getElementById("newEmail").value.trim();
    const dob    = document.getElementById("newDob").value;
    const skills = document.getElementById("newSkills").value.trim();

    // Simple validation: Name + Email MUST be filled
    if (!name || !email) {
        alert("Name and Email are required fields.");
        return;
    }

    // Select the staff list inside the delete form
    const staffList = document.querySelector("#deleteForm ul");

    // Create a new staff member row (same structure as the existing ones)
    const li = document.createElement("li");
    li.classList.add("member-row");

    li.innerHTML = `
        <label class="checkbox">
            <input type="checkbox" name="member" value="${name}">
            <span class="fake"></span>
        </label>

        <div class="avatar">
            <!-- Default placeholder image for newly added staff -->
            <img src="images/default.jpg" alt="${name} photo">
        </div>

        <div class="member-name">
            <h3><a href="#" style="color: black;">${name}</a></h3>
        </div>
    `;

    // Add the new staff entry to the top list
    staffList.appendChild(li);

    // Confirm to the user
    alert("New staff member added successfully!");

    // Clear all form fields after adding
    document.getElementById("newName").value = "";
    document.getElementById("newEmail").value = "";
    document.getElementById("newDob").value = "";
    document.getElementById("newSkills").value = "";
    document.getElementById("newExpertise").value = "";
    document.getElementById("newEducation").value = "";
};

