// ====== requestService.js  ======

// 1. تحديد العناصر الثابتة
const requestForm = document.querySelector('.request-form');
const cancelButton = document.querySelector('.form-btn.btn-cancel');

// 2. إنشاء وتجهيز الحاوية التي ستعرض الطلبات المؤقتة (هذا هو الجزء الذي كان به خطأ)
// يجب إنشاء العنصر قبل تعيين خصائصه
const requestsDisplayArea = document.createElement('div');
requestsDisplayArea.id = 'requests-list';
requestsDisplayArea.innerHTML = '<h2>Requests Added (Session Only):</h2>';
requestsDisplayArea.style.marginTop = '30px';
requestsDisplayArea.style.borderTop = '1px solid #ccc';
requestsDisplayArea.style.paddingTop = '20px';

// قائمة لتخزين الطلبات الجديدة مؤقتاً في الجلسة الحالية
let pendingRequests = [];

// التاريخ الحالي (لتحقق من تاريخ الاستحقاق)
const TODAY = new Date();
const MINIMUM_DAYS = 7; 
const MINIMUM_DUE_DATE = new Date(TODAY);
MINIMUM_DUE_DATE.setDate(TODAY.getDate() + MINIMUM_DAYS);


// ====== دالة التحقق والإرسال (validateForm) ======
function validateForm(event) {
    event.preventDefault(); 
    
    // الحصول على قيم الحقول
    const customerNameInput = document.getElementById('customer-name');
    const serviceSelect = document.getElementById('service-select');
    const dueDateInput = document.getElementById('due-date');
    const requestDescriptionInput = document.getElementById('request-description');
    
    const customerName = customerNameInput.value.trim();
    const serviceValue = serviceSelect.value;
    const dueDateValue = new Date(dueDateInput.value);
    const description = requestDescriptionInput.value.trim();

    let errors = [];

    // 1. التحقق من اختيار الخدمة (No service selected)
    if (serviceValue === "") {
        errors.push("Please select a service from the list.");
        serviceSelect.style.border = '2px solid red'; // تم تغيير 1px إلى 2px لتكون واضحة
    } else {
        serviceSelect.style.border = '';
    }

    // 2. التحقق من صحة الاسم
    if (customerName.length < 5 || !customerName.includes(' ') || customerName.match(/[0-9?!@]/)) {
        errors.push("The Name must be a full name (contain space) and must not include numbers, '?', '!', or '@' symbols.");
        customerNameInput.style.border = '2px solid red';
    } else {
        customerNameInput.style.border = '';
    }
    
    // 3. التحقق من تاريخ الاستحقاق
    if (dueDateInput.value) {
        if (dueDateValue < MINIMUM_DUE_DATE) {
            const minDateString = MINIMUM_DUE_DATE.toLocaleDateString('en-US');
            errors.push(`Due date is too soon. Please select a date at least 7 days from now (${minDateString}).`);
            dueDateInput.style.border = '2px solid red';
        } else {
            dueDateInput.style.border = '';
        }
    } else {
        errors.push("Due Date field is empty.");
        dueDateInput.style.border = '2px solid red';
    }


    // 4. التحقق من وصف الطلب
    if (description.length < 100) {
        errors.push(`The request description is too short. It must be at least 100 characters (Current: ${description.length}).`);
        requestDescriptionInput.style.border = '2px solid red';
    } else {
        requestDescriptionInput.style.border = '';
    }

    // ====== التعامل مع الأخطاء أو النجاح ======
    
    if (errors.length > 0) {
        alert("Validation Failed!\n\n- " + errors.join("\n- "));
    } else {
        const confirmationMessage = `Request for ${customerName} has been successfully submitted. Do you want to stay on this page to add another request or return to the dashboard?`;
        
        const stayOnPage = confirm(confirmationMessage);

        if (stayOnPage) {
            // If the customer selects to stay at this page:
            const serviceName = serviceSelect.options[serviceSelect.selectedIndex].text;
            
            // تخزين الطلب مؤقتاً
            const newRequest = {
                service: serviceName,
                customer: customerName,
                dueDate: dueDateInput.value,
                description: description
            };
            pendingRequests.push(newRequest);
            
            // عرض الطلب على الصفحة
            displayPendingRequests();
            
            // مسح النموذج للاستعداد لطلب جديد
            requestForm.reset();
            
        } else {
            // If the customer selects to leave the page, then return the customer to the dashboard.
            window.location.href = 'customer-dashboard.html'; 
        }
    }
}

// ====== دالة عرض الطلبات المؤقتة ======
function displayPendingRequests() {
    const mainElement = document.querySelector('main');
    if (!document.getElementById('requests-list')) {
        const requestContainer = document.querySelector('.request-container');
        // إدراج حاوية العرض أسفل حاوية النموذج
        mainElement.insertBefore(requestsDisplayArea, requestContainer.nextSibling); 
    }

    let content = '<h2>Requests Added (Session Only):</h2>';
    if (pendingRequests.length === 0) {
        content += '<p>No pending requests.</p>';
    } else {
        pendingRequests.forEach((req, index) => {
            content += `
                <div class="pending-request" style="border: 1px dashed #0056b3; padding: 15px; margin-bottom: 10px; border-radius: 5px;">
                    <h3>Request #${index + 1} - ${req.service}</h3>
                    <p><strong>Customer:</strong> ${req.customer}</p>
                    <p><strong>Due Date:</strong> ${req.dueDate}</p>
                    <p><strong>Description:</strong> ${req.description.substring(0, 150)}...</p>
                </div>
            `;
        });
    }
    requestsDisplayArea.innerHTML = content;
}

// ====== دالة العودة للصفحة السابقة (زر الإلغاء) ======
function handleCancelAndGoBack() {
    // عرض رسالة تأكيد بسيطة قبل المغادرة
    const confirmCancel = confirm("Are you sure you want to cancel the request and go back to the previous page?");
    
    if (confirmCancel) {
        // استخدام دالة history.back() للعودة للصفحة السابقة
        window.history.back();
    }
}


// ====== ربط الدوال بأحداث DOM ======
requestForm.addEventListener('submit', validateForm);

if (cancelButton) {
    cancelButton.addEventListener('click', handleCancelAndGoBack);
}