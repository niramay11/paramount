// Temporary palette preview — remove once a final palette is chosen.
// ?theme=2|5|8|mix applies a palette (remembered for this browser),
// ?theme=current returns to the production colors.

export const THEMES = ["2", "5", "8", "mix"] as const;
export const THEME_STORAGE_KEY = "paramount-theme-preview";

// Runs in <head> before first paint so there is no flash of the default colors.
export const THEME_SCRIPT = `(function(){try{
var ok=${JSON.stringify(THEMES)},k=${JSON.stringify(THEME_STORAGE_KEY)};
var p=new URLSearchParams(location.search).get("theme");
if(p==="current"){localStorage.removeItem(k);}
else if(p&&ok.indexOf(p)>-1){localStorage.setItem(k,p);}
var t=p==="current"?null:(p&&ok.indexOf(p)>-1?p:localStorage.getItem(k));
if(t&&ok.indexOf(t)>-1)document.documentElement.setAttribute("data-theme",t);
}catch(e){}})();`;
