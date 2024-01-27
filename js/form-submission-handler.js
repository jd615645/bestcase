"use strict";function validEmail(e){return/^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i.test(e)}function validateHuman(e){if(e)return console.log("Robot Detected!"),!0;console.log("Welcome Human!")}function getFormData(){var e=document.getElementById("gform"),o=e.elements,t=Object.keys(o).map(function(e){return void 0!==o[e].name?o[e].name:0<o[e].length?o[e].item(0).name:void 0}).filter(function(e,t,n){return n.indexOf(e)==t&&e}),a={};return t.forEach(function(e){a[e]=o[e].value;var t="";if("checkbox"===o[e].type)t=t+o[e].checked+", ",a[e]=t.slice(0,-2);else if(o[e].length)for(var n=0;n<o[e].length;n++)o[e].item(n).checked&&(t=t+o[e].item(n).value+", ",a[e]=t.slice(0,-2))}),a.formDataNameOrder=JSON.stringify(t),a.formGoogleSheetName=e.dataset.sheet||"responses",a.formGoogleSendEmail=e.dataset.email||"",a}function handleFormSubmit(e){e.preventDefault();var t=getFormData();if(!validEmail(t.email))return!(document.getElementById("email-invalid").style.display="block");var e=e.target.action,n=new XMLHttpRequest,e=(n.open("POST",e),n.setRequestHeader("Content-Type","application/x-www-form-urlencoded"),n.onreadystatechange=function(){document.getElementById("gform").style.display="none",document.getElementById("thankyou_message").style.display="block"},Object.keys(t).map(function(e){return encodeURIComponent(e)+"="+encodeURIComponent(t[e])}).join("&"));n.send(e)}function loaded(){document.getElementById("gform").addEventListener("submit",handleFormSubmit,!1)}document.addEventListener("DOMContentLoaded",loaded,!1);