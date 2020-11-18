const { ipcRenderer } = require('electron');
const Spin = require("./spin.umd");


function openPath(id){
  ipcRenderer.send("open", id);};
function getValue(){
    var elem = document.getElementById("list");
    elem.innerHTML = "";
    var result_block = document.getElementById("result_block");
    var div = document.createElement("div");
    result_block.innerHTML = '<div class="d-flex justify-content-center">\n<div class="spinner-border" style="width: 3rem; height: 3rem;" role="status">\n<span class="sr-only">Loading...</span>\n</div>\n</div>';
ipcRenderer.send('asynchronous-message', document.getElementById('target').value);
ipcRenderer.on('asynchronous-reply', (event, arg) => {
   if(arg.length){ 
    result_block.innerHTML = "";
    var val = document.createElement("li");
    val.innerHTML = `<a id="${arg}" onclick="openPath(this.id)">${arg}</a>`;
    elem.appendChild(val);
   };
  });

}
