function t(t,e){if(0===arguments.length||!t)return"空";const n=e||"{y}-{m}-{d} {h}:{i}:{s}";let s;"object"==typeof t?s=t:("string"==typeof t&&(t=/^[0-9]+$/.test(t)?parseInt(t):t.replace(new RegExp(/-/gm),"/")),"number"==typeof t&&10===t.toString().length&&(t*=1e3),s=new Date(t));const o={y:s.getFullYear(),m:s.getMonth()+1,d:s.getDate(),h:s.getHours(),i:s.getMinutes(),s:s.getSeconds(),a:s.getDay()},r=n.replace(/{([ymdhisa])+}/g,((t,e)=>{const n=o[e];return"a"===e?["日","一","二","三","四","五","六"][n]:n.toString().padStart(2,"0")}));return r}function e(t){const e=t.split("?").slice(1).join("&").split("&"),n={};return e.forEach((t=>{const e=t.split("=");n[e[0]]=e.slice(1).join("=")})),n}export{e as g,t as p};