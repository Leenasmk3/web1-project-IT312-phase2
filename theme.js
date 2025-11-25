const toggle = document.getElementById("theme-toggle");
const themeLink = document.getElementById("theme-style");

// تحميل الثيم من LocalStorage
if (localStorage.getItem("theme") === "dark") {
    themeLink.href = "style-dark.css";
    if (toggle) toggle.checked = true;
}

// تغيير الثيم بدون أي تعقيد
if (toggle) {
    toggle.onchange = function() {

        if (toggle.checked === true) {
            themeLink.href = "style-dark.css";
            localStorage.setItem("theme", "dark");
        } 

        else {
            themeLink.href = "style-light.css";
            localStorage.setItem("theme", "light");
        }

    };
}