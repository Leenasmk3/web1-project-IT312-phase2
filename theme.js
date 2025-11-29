
// JavaScript Theme Toggle

const toggle = document.getElementById("theme-toggle");
const themeLink = document.getElementById("theme-style");


let savedTheme = localStorage.getItem("theme");

switch (savedTheme) {
    case "dark":
	
        themeLink.href = "style-dark.css";
        if (toggle) toggle.checked = true;
        break;

    case "light":
	
        themeLink.href = "style-light.css";
        break;

    default:
	
        themeLink.href = "style-light.css";
        break;
}


if (toggle) {
    toggle.onchange = function () {

      
        if (toggle.checked) {
            themeLink.href = "style-dark.css";
            localStorage.setItem("theme", "dark");
        }

        
        else {
            themeLink.href = "style-light.css";
            localStorage.setItem("theme", "light");
        }
    };
}