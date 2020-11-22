const { ipcRenderer } = require('electron');
const { get } = require('systeminformation');



function openFile(id){
  ipcRenderer.send("open", id);};
function openPath(id){
    ipcRenderer.send("open_path", id);};
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
    val.className = "nav-item dropdown";
    val.innerHTML = `<a class="nav-link dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">${arg}</a>\n<div class="dropdown-menu">\n<a class="dropdown-item" id="${arg}" onclick="openFile(this.id)">Open</a>\n<a class="dropdown-item" id="${arg}" onclick="openPath(this.id)">Open path</a>\n</div>`;
    elem.appendChild(val);
   };
  });
}
$('body').keyup(function(event) {
  if(event.key=="Enter") {getValue();}});