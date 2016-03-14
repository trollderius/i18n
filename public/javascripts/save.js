
var storageLog = localStorage.getItem("log");
console.log(localStorage);
if (!storageLog) {
    storageLog = "";
}
var newLog = document.getElementById("log").innerHTML;
localStorage.setItem("log", storageLog + newLog);
