function myFunction() {
    // Get the text field
    var copyText = document.getElementById("myInput");
  
    // Select the text field
    copyText.select();
    copyText.setSelectionRange(0, 99999); // For mobile devices
  
    // Copy the text inside the text field
    navigator.clipboard.writeText(copyText.value);
    
    // Alert the copied text
    // alert("Copied the text: " + copyText.value);
}

function copyText() {
    /* Get the text field */
    var copyText = document.querySelector("#myInput");
  
    /* Select the text field */
    copyText.select();
  
    /* Copy the text inside the text field */
    document.execCommand("copy");
  
    /* Alert the copied text */
    alert("Copied the text: " + copyText.value);
}

///--------not working-----///

// function myFunction(htmlElement){
//     if(!htmlElement){
//         return;
//     }
//     let elementText=htmlElement.innerText;
//     let inputElement=document.createElement('input');
//     inputElement.setAttribute('value',elementText);
//     document.body.appendChild(inputElement);
//     inputElement.select();
//     document.execCommand('copy', false, null);
//     inputElement.parentNode.removeChild(inputElement);
// }
// document.getElementById("copy-text-btn").addEventListener("click", function() {
//     myFunction(document.querySelector("#myInput"));
    
//   });

// const el=document.getElementById("#copy-text-btn");


// function myFunction(){
//     if (e.target.closest("#myInput")) {
//       const copytext =e.target.closest("#myInput").parentElement.parentElement.lastElementChild.innerText;
//       const textArea = document.createElement("textarea");
//       textArea.setAttribute("readonly", "");
//       textArea.style.position = "absolute";
//       textArea.value = copytext;
//       document.body.appendChild(textArea);
//       textArea.select();
//       document.execCommand("copy");
//       textArea.classList.add("hidden");
//     }
//   };