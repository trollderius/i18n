
//log
var log = localStorage.getItem("log");
document.getElementById("lateral").innerHTML = log;

var translationTable = document.getElementById("translationTable");
if (translationTable) {
//PERSISTENT INPUTS
    window.onbeforeunload = function () {
        if (window.saving) {
            return;
        }
        var inputs = translationTable.getElementsByTagName("input");
        for (var i = 0; i < inputs.length; i++) {
            var id = inputs[i].getAttribute("name");
            localStorage.setItem("persistent_" + id, inputs[i].value);
        }
    };

    window.onload = function () {
        var inputs = translationTable.getElementsByTagName("input");

        for (var i = 0; i < inputs.length; i++) {
            var nameAttribute = inputs[i].getAttribute("name");
            if (!nameAttribute) {
                continue;
            }
            var value = localStorage.getItem("persistent_" + nameAttribute);
            if (value && inputs[i].value != value) {
                inputs[i].value = value;
                inputs[i].classList.add('changed');
            }
        }
    };

//changed css
    var inputs = translationTable.getElementsByTagName('input');
    for (var i = 0; i < inputs.length; i++) {
        inputs[i].addEventListener('keyup', function (e) {
            if (this.value != this.getAttribute("originalValue")) {
                this.classList.add('changed');
            } else {
                this.classList.remove('changed');
            }
        });
    }

//grow language
    var ths = translationTable.getElementsByTagName("thead")[0].getElementsByTagName("th");
    var cellWidth = window.getComputedStyle(ths[0]).width;
    for (var i = 0; i < ths.length; i++) {
        ths[i].width = cellWidth;
        resizeTableEvent(ths, i);
    }
    function resizeTableEvent(th, i) {
        th[i].getElementsByTagName("h4")[0].onclick = function () {
            for (var n = 0; n < th.length; n++) {
                th[n].width = "1px";
            }
            th[i].width = "999px";
        };
    }

//ON SAVE
    var myForm = document.getElementById('saveForm');
    document.getElementById('saveForm').onsubmit = function () {
        removePersistentValues();
        window.saving = true;

        var allInputs = document.getElementById('saveForm').getElementsByTagName("tbody")[0].getElementsByTagName('input');
        var input;

        for (var i = 0; i < allInputs.length; i++) {
            var input = allInputs[i];
            if (input.getAttribute("class").indexOf("changed") == -1) {
                input.setAttribute('name', '');
            } else {
                console.log(input.value + " != " + input.getAttribute("originalvalue"));
            }
        }
    };

//CLICK OUTSIDE TABLE
    document.addEventListener("click", function (e) {
        var level = 0;
        for (var element = e.target; element; element = element.parentNode) {
            if (element.id === 'translationTable') {
                return;
            }
            level++;
        }
        console.log("outside");
        for (var i = 0; i < ths.length; i++) {
            ths[i].width = cellWidth;
        }
    });

//SHOW ALL - SHOW HIDDEN
    document.getElementById("showButton").onclick = function () {
        if ("show" == this.getAttribute("mode")) {
            this.setAttribute("mode", "");
            this.value = "Show All";
            hideAll();
        } else {
            this.setAttribute("mode", "show");
            this.value = "Show pending only";
            showAll();
        }
    };
}

//on upload
var uploadButton = document.getElementById("uploadButton");
if (uploadButton) {
    document.getElementById("uploadButton").onclick = function () {
        removePersistentValues();
    };
}
        