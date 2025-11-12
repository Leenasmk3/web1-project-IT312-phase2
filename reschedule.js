// ====== reschedule.js (لصفحة لوحة تحكم العميل - الميزة الإضافية) ======

// 1. تحديد العناصر الثابتة
const rescheduleLinks = document.querySelectorAll('.active-reschedule'); // روابط إعادة الجدولة النشطة
const rescheduleModal = document.getElementById('rescheduleModal');
const modalClose = document.querySelector('.modal-close');
const rescheduleForm = document.querySelector('.reschedule-form');
const newDateInput = document.getElementById('new_date');

// متغير لتخزين مرجع البطاقة التي يتم تعديلها حالياً
let currentServiceCard = null; 

// ====== وظيفة فتح وإغلاق النافذة المنبثقة (Modal) ======

// 1. فتح النافذة المنبثقة وحفظ البطاقة الحالية
rescheduleLinks.forEach(link => {
    link.addEventListener('click', (event) => {
        event.preventDefault(); 
        
        // حفظ البطاقة الحالية عند فتح المودال
        currentServiceCard = event.target.closest('.request-card'); 
        
        rescheduleModal.style.display = 'flex'; 
        rescheduleModal.style.visibility = 'visible'; 
    });
});

// 2. إغلاق النافذة المنبثقة ومسح المرجع
modalClose.addEventListener('click', (event) => {
    event.preventDefault();
    rescheduleModal.style.display = 'none';
    rescheduleModal.style.visibility = 'hidden';
    currentServiceCard = null; // مسح مرجع البطاقة عند الإغلاق
});


// ====== دالة التحقق من التاريخ والتأكيد وتحديث DOM ======

function validateAndConfirmReschedule(event) {
    event.preventDefault(); 

    const newDateValue = new Date(newDateInput.value);
    const today = new Date();
    // لضمان المقارنة على مستوى اليوم
    today.setHours(0, 0, 0, 0); 
    
    let errorMessage = "";

    // التحقق من أن التاريخ الجديد ليس تاريخًا سابقًا
    if (newDateInput.value === "") {
        errorMessage = "Please select a new date.";
        newDateInput.style.border = '2px solid red';
    } else if (newDateValue <= today) {
        errorMessage = "The new reschedule date must be a future date.";
        newDateInput.style.border = '2px solid red';
    } else {
        newDateInput.style.border = '';
    }

    if (errorMessage) {
        alert("Reschedule Failed! " + errorMessage);
        return; 
    }
    
    // إذا كان التاريخ صالحًا:
    
    // 1. تحديد اسم الخدمة
    const serviceName = currentServiceCard ? 
        currentServiceCard.querySelector('p:first-of-type').textContent.replace('Service Name:', '').trim() : 
        "The Selected Service";

    // 2. تحديث التاريخ في عنصر HTML الخاص بالبطاقة
    if (currentServiceCard) {
        // العثور على العنصر الذي يحتوي على التاريخ (هو ثاني عنصر <p> في البطاقة)
        const dateElement = currentServiceCard.querySelectorAll('p')[1]; 
        
        // تنسيق التاريخ الجديد لتحديثه في الواجهة
        // نستخدم toLocaleDateString لتنسيق التاريخ بشكل محلي ومفهوم
        const formattedNewDate = new Date(newDateInput.value).toLocaleDateString('en-GB'); 
        
        // تحديث محتوى الـ HTML للتاريخ الجديد
        dateElement.innerHTML = `<span>Date of Request:</span>${formattedNewDate}`;
    }
    
    // 3. عرض رسالة التأكيد
    const confirmationMessage = `The service "${serviceName}" has been successfully rescheduled to ${newDateInput.value}. This change is pending provider approval.`;
    alert(confirmationMessage);
    
    // 4. إغلاق النافذة المنبثقة ومسح النموذج بعد النجاح
    rescheduleForm.reset();
    rescheduleModal.style.display = 'none';
    rescheduleModal.style.visibility = 'hidden';
    currentServiceCard = null; 
}


// ====== ربط الدوال بأحداث DOM ======
rescheduleForm.addEventListener('submit', validateAndConfirmReschedule);