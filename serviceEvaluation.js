// ====== serviceEvaluation.js ======

const evaluationForm = document.querySelector('.evaluation-form');
const serviceSelect = document.getElementById('service-select');
const feedbackTextarea = document.getElementById('feedback');
const dashboardURL = 'customer-dashboard.html'; 

// دالة للحصول على قيمة التقييم المختارة
function getSelectedRating() {
    const selectedRadio = document.querySelector('input[name="rating"]:checked');
    return selectedRadio ? parseInt(selectedRadio.value) : null;
}

function handleEvaluationSubmit(event) {
    event.preventDefault(); 
    
    const selectedService = serviceSelect.value;
    const ratingValue = getSelectedRating();
    const feedbackValue = feedbackTextarea.value.trim();

    let errors = [];

    // 1. التحقق من اختيار الخدمة (didn't select a service)
    if (selectedService === "") {
        errors.push("Please choose a service from the list.");
        serviceSelect.style.border = '1px solid red';
    } else {
        serviceSelect.style.border = '';
    }

    // 2. التحقق من إضافة تقييم (didn't add a rating)
    if (ratingValue === null) {
        errors.push("Please select a star rating (1 to 5).");
        document.querySelector('.rating-group').style.border = '1px solid red';
    } else {
        document.querySelector('.rating-group').style.border = '';
    }

    // 3. التحقق من إضافة ملاحظات (didn't add feedback)
    if (feedbackValue.length < 5) {
        errors.push("Please provide detailed feedback.");
        feedbackTextarea.style.border = '1px solid red';
    } else {
        feedbackTextarea.style.border = '';
    }


    // ====== التعامل مع النتائج ======
    
    if (errors.length > 0) {
        // Pop up an alert explaining what is missing
        alert("Evaluation Submission Failed!\n\n- " + errors.join("\n- "));
        return; 
    }
    
    // إذا كان النموذج صالحًا:
    let resultMessage = "";
    
    // التحقق من التقييم: (نعتبر 4 و 5 نجوم تقييم جيد)
    if (ratingValue >= 4) {
        // إذا كان تقييمًا جيدًا: display a thank you message
        resultMessage = "Thank you! We appreciate your excellent feedback. Your satisfaction is our priority.";
    } else {
        // إذا كان تقييمًا غير جيد: display an apology message
        resultMessage = "We apologize that your experience was not satisfactory. We value your feedback and will use it to improve our service immediately.";
    }
    
    // عرض رسالة النتيجة
    alert(resultMessage);

    // نقل العميل إلى لوحة التحكم (Transfer the customer to the dashboard)
    window.location.href = dashboardURL;
}

// ربط دالة الإرسال بحدث الـ Submit
evaluationForm.addEventListener('submit', handleEvaluationSubmit);