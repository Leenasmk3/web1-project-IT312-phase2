// ====== requestService.js  ======

// Get the form and cancel button from the page
const requestForm = document.querySelector('.request-form');
const cancelButton = document.querySelector('.form-btn.btn-cancel');

// Create a section to show the requests that have been added
const requestsDisplayArea = document.createElement('div');
requestsDisplayArea.id = 'requests-list';
requestsDisplayArea.innerHTML = '<h2>Requests Added (Session Only):</h2>';
requestsDisplayArea.style.marginTop = '30px';
requestsDisplayArea.style.borderTop = '1px solid #ccc';
requestsDisplayArea.style.paddingTop = '20px';

// Store all the requests added during this session
let pendingRequests = [];

// Set up the date rules - requests must be at least 7 days in the future
const TODAY = new Date();
const MINIMUM_DAYS = 7; 
const MINIMUM_DUE_DATE = new Date(TODAY);
MINIMUM_DUE_DATE.setDate(TODAY.getDate() + MINIMUM_DAYS);

// Check if the form is filled out correctly
function validateForm(event) {
    event.preventDefault(); // Stop the form from submitting normally
    
    // Get all the form fields
    const customerNameInput = document.getElementById('customer-name');
    const serviceSelect = document.getElementById('service-select');
    const dueDateInput = document.getElementById('due-date');
    const requestDescriptionInput = document.getElementById('request-description');
    
    // Get the values from the form
    const customerName = customerNameInput.value.trim();
    const serviceValue = serviceSelect.value;
    const dueDateValue = new Date(dueDateInput.value);
    const description = requestDescriptionInput.value.trim();

    // Keep track of any errors we find
    let errors = [];

    // Make sure a service was selected
    if (serviceValue === "") {
        errors.push("Please select a service from the list.");
        serviceSelect.style.border = '2px solid red'; 
    } else {
        serviceSelect.style.border = '';
    }

    // Check if the name is valid (full name with space, no numbers or weird symbols)
    if (customerName.length < 5 || !customerName.includes(' ') || customerName.match(/[0-9?!@]/)) {
        errors.push("The Name must be a full name (contain space) and must not include numbers, '?', '!', or '@' symbols.");
        customerNameInput.style.border = '2px solid red';
    } else {
        customerNameInput.style.border = '';
    }
    
    // Make sure the due date is at least 7 days away
    if (dueDateInput.value) {
        if (dueDateValue < MINIMUM_DUE_DATE) {
            const minDateString = MINIMUM_DUE_DATE.toLocaleDateString('en-US');
            errors.push(`Please select a date at least 7 days from now (${minDateString}).`);
            dueDateInput.style.border = '2px solid red';
        } else {
            dueDateInput.style.border = '';
        }
    } else {
        errors.push("Due Date field is empty.");
        dueDateInput.style.border = '2px solid red';
    }

    // Make sure the description is long enough
    if (description.length < 20) {
        errors.push(`The request description is too short. It must be at least 20 characters (Current: ${description.length}).`);
        requestDescriptionInput.style.border = '2px solid red';
    } else {
        requestDescriptionInput.style.border = '';
    }

    // If there are errors, show them to the user
    if (errors.length > 0) {
        alert("Validation Failed!\n\n- " + errors.join("\n- "));
    } else {
        // Everything looks good! Ask the user what they want to do next
        const confirmationMessage = `Request for ${customerName} has been successfully submitted. Do you want to stay on this page to add another request or return to the dashboard?`;
        
        const stayOnPage = confirm(confirmationMessage);

        if (stayOnPage) {
            // User wants to add another request
            
            // Get the service name that was selected
            const serviceName = serviceSelect.options[serviceSelect.selectedIndex].text;
            
            // Save this request
            const newRequest = {
                service: serviceName,
                customer: customerName,
                dueDate: dueDateInput.value,
                description: description
            };
            pendingRequests.push(newRequest);
            
            // Show all the requests that have been added
            displayPendingRequests();
            
            // Clear the form so they can add another
            requestForm.reset();
            
        } else {
            // User wants to go back to the dashboard
            window.location.href = 'customer-dashboard.html'; 
        }
    }
}

// Show all the requests that have been added this session
function displayPendingRequests() {
    const mainElement = document.querySelector('main');
    // Add the requests section to the page if it's not there yet
    if (!document.getElementById('requests-list')) {
        const requestContainer = document.querySelector('.request-container');
        mainElement.insertBefore(requestsDisplayArea, requestContainer.nextSibling); 
    }

    // Build the HTML to show all requests
    let content = '<h2>Requests Added (Session Only):</h2>';
    if (pendingRequests.length === 0) {
        content += '<p>No pending requests.</p>';
    } else {
        // Loop through each request and create a card for it
        pendingRequests.forEach((req, index) => {
            content += `
                <div class="pending-request" style="border: 1px dashed #0056b3; padding: 15px; margin-bottom: 10px; border-radius: 5px;">
                    <h3>Request #${index + 1} - ${req.service}</h3>
                    <p><strong>Customer:</strong> ${req.customer}</p>
                    <p><strong>Due Date:</strong> ${req.dueDate}</p>
                    <p><strong>Description:</strong> ${req.description.substring(0, 20)}...</p>
                </div>
            `;
        });
    }
    requestsDisplayArea.innerHTML = content;
}

// Handle the cancel button - go back if the user confirms
function handleCancelAndGoBack() {
    const confirmCancel = confirm("Are you sure you want to cancel the request and go back to the previous page?");
    
    if (confirmCancel) {
        window.history.back();
    }
}

// Connect the functions to the buttons
requestForm.addEventListener('submit', validateForm);

if (cancelButton) {
    cancelButton.addEventListener('click', handleCancelAndGoBack);
}