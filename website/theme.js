function setTheme(t){document.documentElement.classList.remove('light','dark');document.documentElement.classList.add(t);localStorage.setItem('theme',t)}
function toggleTheme(){setTheme(document.documentElement.classList.contains('dark')?'light':'dark')}
const saved=localStorage.getItem('theme');if(saved){setTheme(saved)}else if(window.matchMedia('(prefers-color-scheme: dark)').matches){setTheme('dark')}else{setTheme('light')}
document.addEventListener('DOMContentLoaded',()=>{const b=document.getElementById('themeToggle');if(b)b.addEventListener('click',toggleTheme)});
