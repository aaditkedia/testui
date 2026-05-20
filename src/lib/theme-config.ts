/**
 * Plain (non-"use client") theme constants so the server layout can import the
 * init script as a real string (a "use client" module would hand the server a
 * client-reference proxy instead of the value).
 */
export const THEME_STORAGE_KEY = "theme";

/**
 * Runs before paint to set the `.dark` class from stored preference, preventing
 * a flash of the wrong theme. Defaults to light (the brand default) unless the
 * visitor has explicitly chosen dark. Rendered once in <body>.
 */
export const themeInitScript = `(function(){try{var t=localStorage.getItem('${THEME_STORAGE_KEY}')==='dark'?'dark':'light';if(t==='dark'){document.documentElement.classList.add('dark');}document.documentElement.style.colorScheme=t;}catch(e){}})();`;
