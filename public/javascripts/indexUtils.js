
function removePersistentValues() {
    for (var key in localStorage) {
        if (key.match(/^persistent_/)) {
            localStorage.removeItem(key);
            var name = key.split("persistent_")[1];
            var input = document.querySelectorAll('[name="' + name + '"]')[0];
            if (input) {
                input.value = input.getAttribute("originalvalue") || "";
            }
        }
    }
}

function showAll() {
    var trs = document.getElementById("translationTable").getElementsByTagName("tbody")[0].getElementsByTagName("tr");
    for (var i = 0; i < trs.length; i++) {
        trs[i].style.display = "table-row";
    }
}

hideAll();
function hideAll() {
    //again
    var trs = document.getElementById("translationTable").getElementsByTagName("tbody")[0].getElementsByTagName("tr");
    for (var i = 0; i < trs.length; i++) {
        trs[i].style.display = "none";
    }

    var diferencials = document.getElementsByClassName("dif");
    if (!diferencials.length) {
        notify("all translations done !");
        document.getElementById("showButton").style.display = "none";
        showAll();
        return;
    }
    //show inputs
    console.log("pending inputs: " + diferencials.length);
    for (var i = 0; i < diferencials.length; i++) {
        var tr = diferencials[i].parentNode;
        tr.style.display = "table-row";
        var previous = tr.previousSibling;
        previous.style.display = "table-row";
    }
    //if all showing
    var someComplete = false;
    var rows = document.getElementsByClassName("keyRow");
    for (var i = 0; i < rows.length; i++) {
        if ("none" == rows[i].style.display) {
            someComplete = true;
            break;
        }
    }
    if (!someComplete) {
//        document.getElementById("showButton").style.display = "none";
        document.getElementById("showButton").setAttribute("disabled", "disabled");
    }
}

function notify(text) {
    document.getElementById("notification").innerHTML = text;
}

function indexInParent(node) {
    var children = node.parentNode.childNodes;
    var num = 0;
    for (var i = 0; i < children.length; i++) {
        if (children[i] == node)
            return num;
        if (children[i].nodeType == 1)
            num++;
    }
    return -1;
}
